# Install dependencies
FROM node:lts-alpine AS deps
WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

# Build the app
FROM node:lts-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG NEXT_PUBLIC_POSTHOG_KEY
ENV NEXT_PUBLIC_POSTHOG_KEY=$NEXT_PUBLIC_POSTHOG_KEY
ENV NODE_ENV=production

RUN npm run build

# Final production image
FROM node:lts-alpine AS runner
WORKDIR /app


COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD ["npm", "start"]