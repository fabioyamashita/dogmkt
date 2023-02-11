### Multi Stage Build ###

### Stage 1 - Get source and generate build ###
FROM node:latest AS ng-builder
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build

### Stage 2 - Upload source to NGINX server with then angular app ###
FROM nginx
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=ng-builder /app/dist/front-end /usr/share/nginx/html

EXPOSE 80