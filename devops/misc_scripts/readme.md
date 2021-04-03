## Mongo backup scripts
Scripts use docker to run. If you need to backup/restore local database use `host.docker.internal` instead of `localhost`
## Examples
#### Backup
`./backup_mongo_cmd.sh -d calculator -h mongodb://dbuser:secretpassword@host.docker.internal:27017/calculator?authSource=admin`
#### Restore
`./restore_mongo_cmd.sh -f dump_calculator_19-10-2020_16-40-04.gz -h mongodb://dbuser:secretpassword@host.docker.internal:27017/calculator?authSource=admin`
