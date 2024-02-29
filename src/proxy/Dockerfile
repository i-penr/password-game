FROM oven/bun:latest

WORKDIR /usr/src/app

COPY ./src/proxy/ ./

EXPOSE 3001

CMD ["bun", "--watch", "/usr/src/app/server.js"]