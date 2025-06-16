FROM nginx:1.25-alpine

# Remove default Nginx configuration
RUN rm /etc/nginx/conf.d/default.conf


EXPOSE 80
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]
