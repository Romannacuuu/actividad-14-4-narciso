FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install

RUN npm install -g typescript ts-node

COPY . .

EXPOSE 3001

CMD ["npm", "start"]