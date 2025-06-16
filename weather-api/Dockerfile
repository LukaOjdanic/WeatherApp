FROM node:18-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# The port your Node.js app will listen on *inside* the container
EXPOSE 3000 

CMD ["node", "index.js"]
