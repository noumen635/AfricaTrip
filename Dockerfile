FROM nginx:alpine
EXPOSE 80
COPY . /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]