# ----- Build Stage ------

FROM oven/bun:1 AS builder

WORKDIR /app

COPY package.json bun.lock* ./

# RUN bun install --frozen-lockfile
RUN bun install --frozen-lockfile

COPY . .

RUN bun run build

# ----- Production image -----
FROM oven/bun:1 AS runner
WORKDIR /app

# Copy only the built app and dependencies
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

CMD ["bun", "run", "start"]
# CMD ["bun", "run", "dev"]
