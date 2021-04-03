#!/bin/bash

cd /home/root
date1=$(date +%Y-%m-%dT%H:%M:%S)
mkdir mongo-backup

ARCHIVE_NAME=${ARCHIVE_NAME:=mongo-backup}
S3_HOST=${S3_HOST:=ams3.digitaloceanspaces.com}

file_name="${ARCHIVE_NAME}_"$date1".gz"
mongodump --uri $URI --archive --gzip | cat > $file_name
echo $(ls)
notification_msg="Mongo-Backup-failed"
filesize=$(stat -c %s $file_name)
mfs=250
if [[ "$filesize" -gt "$mfs" ]]; then
# Uploading to s3
s3cmd --access_key $AWS_ACCESS_KEY_ID \
      --secret_key $AWS_SECRET_ACCESS_KEY \
      --host $S3_HOST \
      --host-bucket "%(bucket)s.${S3_HOST}" \
       put $file_name $S3_BUCKET
notification_msg="Mongo-Backup-was-successful"
fi
echo $notification_msg
