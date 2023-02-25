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

RUN apt-get update && apt-get install -y npm
RUN npm install -g json-server
COPY db.json /app/db.json
COPY routes.json /app/routes.json

EXPOSE 80 3000

CMD ["sh", "-c", "json-server -H 0.0.0.0 --watch /app/db.json --routes /app/routes.json --port 3000 & nginx -g 'daemon off;'"]
