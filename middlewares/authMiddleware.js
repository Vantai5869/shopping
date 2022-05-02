const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
	const authHeader = req.header('Authorization')
	const token = authHeader && authHeader.split(' ')[1].replace(/['"]+/g, '')
	if (!token)
		return res
			.status(401)
			.json({ message: 'Vui lòng đăng nhập' })

	try {
		const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
		 req.user = decoded
		next()
        return 
	} catch (error) {
		return res.status(403).json({  message: 'Invalid token' })
	}
}

module.exports = authMiddleware