help () {
    echo 'There are 3 available options:'
    echo
    echo '-h (required) -- connection uri'
    echo '-d            -- database name; if not set - all database will be dumped'
    echo '-o            -- additional options for mongodump command; wrap in double quotas all the options'
}

if [ $1 == '--help' ]
 then
    help
    exit
fi

uri_check=0

while getopts :h:p:f:d:o: option
  do
    case "${option}"
        in
        h) URI=${OPTARG}; uri_check=1;;
        d) DBNAME=${OPTARG};;
        o) OPTIONS=${OPTARG};;
        p) PORT=${OPTARG};;
        :)
            echo "Option $option has to be set"
            help
            exit
            ;;
        esac
done


if [[ $uri_check == 0 ]]
then
    echo "-h option must be set"
    help
    exit
fi

HOST=${HOST:-"localhost"}
PORT=${PORT:-27017}
OPTIONS=${OPTIONS:-""}
if [ -n DBNAME ]
 then DB="--db=$DBNAME"
 else DB=""
fi

docker run --rm mongo /bin/bash -c "mongodump --uri $URI --archive --gzip $DB $OPTIONS" | \
   cat > dump_${DBNAME}_$(date '+%d-%m-%Y_%H-%M-%S').gz
