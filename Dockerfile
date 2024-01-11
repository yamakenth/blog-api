FROM --platform=linux/amd64 node:16-alpine

WORKDIR /app

COPY . .

RUN npm run build

EXPOSE 8080

CMD ["npm", "start", "--prefix", "server"]