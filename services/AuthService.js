
const db = require('./../models/index')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const saltRounds = 10;
const  dotenv  = require('dotenv')
const nodemailer = require('nodemailer')
const {
    google
  } = require('googleapis');
dotenv.config()

const register = async (req, res) => {

    try {
        const { fullName, email, password, phoneNumber, address, role } = req.body;
        const datauser = await db.User.findOne({ where: { email } });
        if (datauser) {
            return res.status(401).json({ message: "email của bạn đã tồn tại trong hệ thống" })
        }
        const hasspassword = await bcrypt.hash(password, saltRounds)
        const roleEmail = role ? role : 'user'
        await db.User.create({
            fullName,
            email,
            password: hasspassword,
            phoneNumber,
            address,
            role: roleEmail
        })

        return res.json({ message: "Tạo tài khoản thành công" })

    } catch (err) {
        return res.status(500).json({ message: error.message })
    }
}

const login = async (req, res) => {
    try {
        let { email, password } = req.body;
        const datauser = await db.User.findOne({ where: { email } });
        const idUser = datauser.id
        if (!datauser) {
            return res.status(401).json({ message: "email của bạn không tồn tại trong hệ thống" })
        }
        const passwordb = datauser.password
        const isMatch = await bcrypt.compare(password, passwordb)
        if (!isMatch)
            return res.status(401).json({ message: "mật khẩu  của bạn sai" })
        const accesstoken = createAccessToken({ email , idUser })
        const data = {
            token: accesstoken,
            role: datauser.role,
            fullName: datauser.fullName,
            email:datauser.email
        }
        return res.json({ message: data })

    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const forgotPassword  = async(req,res)=>{
   
    try {
        const {email} = req.body
        const datauser = await db.User.findOne({ where: { email } });
        const {  
            CLIENT_ID,
            CLIENT_SECRET,
            REDIRECT_URL,
            REFEST_TOKEN
        } = process.env
        if (!datauser) {
            return res.status(401).json({ message: "email của bạn không tồn tại trong hệ thống" })
        }
        const oAuth2Client = new google.auth.OAuth2(
            CLIENT_ID,
            CLIENT_SECRET,
            REDIRECT_URL
          );
          oAuth2Client.setCredentials({
            refresh_token: REFEST_TOKEN
          });
          google.options({
            auth: oAuth2Client
          });
          const accessToken = new Promise((resolve, reject) => {
            oAuth2Client.getAccessToken((err, token) => {
                if (err) console.log(err); // Handling the errors
                else resolve(token);
            });
          });
          const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'muadongyeuthuong3x@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFEST_TOKEN,
                accessToken: accessToken,
            },
          });
          const dataEmailAndIdEnCode = createAccessToken(email , datauser.id)
          var content = '';
          content +=  '<p>Click <a href="http://localhost:3000/forgotPassword' + dataEmailAndIdEnCode + '">here</a> to reset your password</p>';
          let mailOptions = {
            from: 'muadongyeuthuong3x@gmail.com',
            to: email,
            subject: 'Change the password Shopping',
            text: 'Change the password',
            html:content
        };
         await transport.sendMail(mailOptions);
        return res.json({ message: "Đã gửi link lấy lại mật khẩu của bạn qua email" })

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const createAccessToken = (email , id) =>{
    return jwt.sign({email ,id},process.env.ACCESS_TOKEN_SECRET, {expiresIn: '7d'})
}
module.exports = {
    register,
    login,
    forgotPassword 
};
