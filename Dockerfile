FROM debian:alpine
RUN apt-get update && apt-get install nodejs npm nginx -y
RUN npm install
EXPOSE 80