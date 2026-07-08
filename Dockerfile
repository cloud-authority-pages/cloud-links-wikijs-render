FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
ENV PLATFORM_NAME="Cloud Links Wiki"
ENV PLATFORM_COLOR="#1e3a5f"
ENV PLATFORM_ACCENT="#1976d2"
ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "server.js"]
