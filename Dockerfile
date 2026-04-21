FROM node:18-alpine
WORKDIR /app
COPY LDZ_SEO/package*.json ./
RUN npm install --legacy-peer-deps
COPY LDZ_SEO/ .
RUN npm run build
RUN npm install -g serve
EXPOSE 3000
CMD ["node", "server/index.js"]
