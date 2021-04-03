#!/bin/bash

cd /home/root
date1=$(date +%Y-%m-%dT%H:%M:%S)
mkdir pg-backup
DB_HOST=${DB_HOST:=localhost}
DB_PORT=${DB_PORT:=5432}
PG_USER=${PG_USER:=postgres}
PG_PASS=${PG_PASS:=password}

ARCHIVE_NAME=${ARCHIVE_NAME:=pg-backup}
S3_HOST=${S3_HOST:=ams3.digitaloceanspaces.com}

PGPASSWORD="$PG_PASS" pg_dumpall -h $DB_HOST -p $DB_PORT -U $PG_USER > pg-backup/postgres-db.tar
file_name="${ARCHIVE_NAME}_"$date1".tar.gz"

#Compressing backup file for upload
tar -zcvf $file_name pg-backup

notification_msg="Postgres-Backup-failed"
filesize=$(stat -c %s $file_name)
mfs=250
if [[ "$filesize" -gt "$mfs" ]]; then
# Uploading to s3
s3cmd --access_key $AWS_ACCESS_KEY_ID \
      --secret_key $AWS_SECRET_ACCESS_KEY \
      --host $S3_HOST \
      --host-bucket "%(bucket)s.${S3_HOST}" \
       put $file_name $S3_BUCKET
notification_msg="Postgres-Backup-was-successful"
fi
echo $notification_msg
