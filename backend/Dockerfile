# use the official Bun image
# see all the versions at https://hub.docker.com/r/oven/bun/tags

FROM oven/bun:latest

WORKDIR /app

RUN apt-get update -y && apt-get install -y openssl

COPY package.json bun.lock* ./
RUN bun install --frozen-lockfile

COPY . .

RUN bunx prisma generate

EXPOSE 5001

CMD ["bun", "start"]
