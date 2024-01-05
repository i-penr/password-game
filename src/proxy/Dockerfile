FROM oven/bun:latest

WORKDIR /usr/src/app

COPY ./src/proxy/ ./

EXPOSE 3001

CMD ["bun", "/usr/src/app/server.js"]