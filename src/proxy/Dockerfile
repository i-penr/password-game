FROM oven/bun:latest

WORKDIR /usr/src/app

COPY package*.json ./

RUN bun install

COPY . .

EXPOSE 3001

CMD ["bun", "start"]