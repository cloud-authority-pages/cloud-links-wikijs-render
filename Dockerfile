FROM node:20-alpine
WORKDIR /app
RUN npm init -y && npm install express marked
COPY wiki.js .
ENV PORT=3000
EXPOSE 3000
CMD ["node", "wiki.js"]
