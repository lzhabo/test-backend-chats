FROM postgres:13-alpine
# bash
RUN apk add --no-cache bash
# s3cmd
RUN apk add --no-cache py-pip ca-certificates && pip install s3cmd

COPY ./backup_postgres.sh /home/root/
#Copying script file
USER root

CMD ["/bin/bash", "-c" , "cd /home/root && ./backup_postgres.sh"]
