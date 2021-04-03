FROM alpine:3.12
# bash
RUN apk add --no-cache bash
# s3cmd
RUN apk add --no-cache py-pip ca-certificates && pip install s3cmd
# mogotools
RUN apk add --no-cache mongodb-tools

COPY ./backup_mongo.sh /home/root/
RUN chmod +x /home/root/backup_mongo.sh
#Copying script file
USER root

CMD ["/bin/bash", "-c" , "cd /home/root && ./backup_mongo.sh"]
