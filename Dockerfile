FROM --platform=linux/amd64 node:16-alpine

WORKDIR /app

COPY ./client/package.json ./client/

RUN npm install --prefix client

COPY ./client-admin/package.json ./client-admin/

RUN npm install --prefix client-admin

COPY ./server/package.json ./server/

RUN npm install --prefix server

COPY . .

RUN npm run build:all

EXPOSE 8080

CMD ["npm", "start", "--prefix", "server"]
