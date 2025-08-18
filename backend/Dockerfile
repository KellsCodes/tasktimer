# use the official Bun image
# see all the versions at https://hub.docker.com/r/oven/bun/tags

FROM oven/bun:latest

WORKDIR /app

COPY package.json ./
RUN bun install --frozen-lockfile

COPY . .

EXPOSE 3000

CMD ["bun", "run", "server.js"]
