#!/bin/bash

while true;
do varib=`inotifywait -r -e close_write .`
clear
echo "NODELINT\n----\n"
echo $varib

done;
