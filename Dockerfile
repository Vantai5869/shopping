FROM node:14.18.0 as dependencies
WORKDIR /dtk
COPY package.json ./
RUN npm install
COPY . .

EXPOSE 5000
CMD ["npm", "start"]
