FROM oven/bun:latest

WORKDIR /usr/src/app

COPY package*.json ./
COPY bun.lockb ./

RUN bun install

COPY . .

EXPOSE 3001

CMD ["bun", "start"]