FROM node:14 as builder
RUN mkdir -p /home/node/app/node_modules && \
         chown -R node:node /home/node/app
ADD . /home/node/app
WORKDIR /home/node/app
RUN yarn install && \
        yarn build


FROM nginx:1.19.1-alpine
COPY --from=0 /home/node/app/build/ /usr/share/nginx/html
EXPOSE 3000
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copy .env file and shell script to container
WORKDIR /usr/share/nginx/html
COPY ./env-to-config.sh .
COPY .env .
# Add bash
RUN apk add --no-cache bash

# Make our shell script executable
RUN chmod +x env-to-config.sh

# Save env variables as js file and Start Nginx server
CMD ["/bin/bash", "-c", "/usr/share/nginx/html/env-to-config.sh && nginx -g \"daemon off;\""]
