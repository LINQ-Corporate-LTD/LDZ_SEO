FROM node:18-alpine AS builder

WORKDIR /app

# Memory limit વધારો
ENV NODE_OPTIONS=--max-old-space-size=4096

COPY package*.json ./

# Legacy peer deps flag - react-scripts compatibility માટે
RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
