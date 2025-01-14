#! /bin/bash

# set -oex
# node exporter
# OpenTelemetry (ETL)
# CAdvisor


timestamp=$(date +%Y%m%d%H%M%S)
cores=$(nproc --all)

printf "Memory\t\tDisk\t\tCPU\n"
end=$((SECONDS+3600))
while [ $SECONDS -lt $end ]; do
MEMORY=$(free -m | awk 'NR==2{printf "%.2f", $3*100/$2 }')
DISK=$(df -h | awk '$NF=="/"{printf "%.2f", $5}')
CPU=$(top -bn1 | grep load | awk '{printf "%.2f", $(NF-2)}')

exceeded() {
    [ "$(echo "$1 > 80" | bc)" -eq 1 ] 
}

if exceeded $MEMORY || exceeded $DISK || exceeded $CPU; then
echo $CPU;
fi

echo -e "$MEMORY%\t\t$DISK%\t\t$CPU%"
sleep 1
done