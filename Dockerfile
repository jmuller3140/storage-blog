# Build stage
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Pass build-time env vars using ARG
ARG GATSBY_POSTHOG_API_KEY
ENV GATSBY_POSTHOG_API_KEY=$GATSBY_POSTHOG_API_KEY
RUN npm run build

# Serve stage
FROM nginx:alpine
COPY --from=builder /app/public /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
