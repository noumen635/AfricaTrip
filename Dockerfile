FROM nginx:alpine
EXPOSE 80
# RUN npm install
COPY . /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]