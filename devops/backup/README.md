# Backups

### Postgres
- Creates full database dump
- Uploads dump to S3
##### Params
Params are set via environment variables
###### Postgres
- `DB_HOST` - default `localhost`
- `DB_PORT` - default `5432`
- `PG_USER` - default `postgres` 
- `PG_PASS` - default `password`
###### Mongo
- `URI` - mongo connection uri
###### S3
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `S3_HOST`, eg: `ams3.digitaloceanspaces.com`
- `S3_BUCKET`, eg: `s3://siz-storage/pg_backup/`
- `ARCHIVE_NAME`. default `mongo-backup` for MongoDB and `pg-backup` for Postgres
#### Usage
###### Postgres
`docker build -t pg-backup:latest -f backup_postgres.Dockerfile .`
```shell script
docker run --rm \
    -e DB_HOST=host.docker.internal \ 
    -e PG_PASS=password \ 
    -e S3_BUCKET=s3://siz-storage/pg_backup/ \
    -e AWS_ACCESS_KEY_ID=MY_ID \
    -e AWS_SECRET_ACCESS_KEY=MY_SECRET \
pg-backup
```
###### Mongo
`docker build -t mongo-backup:latest -f backup_mongo.Dockerfile .`
```shell script
docker run --rm \
    -e URI=mongodb://dbuser:secretpassword@host.docker.internal:27017/?authSource=admin \
    -e S3_BUCKET=s3://siz-storage/mongo_backup/ \
    -e AWS_ACCESS_KEY_ID=MY_ID \
    -e AWS_SECRET_ACCESS_KEY=MY_SECRET \
mongo-backup
```
