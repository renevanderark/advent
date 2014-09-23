#!/bin/bash
clear
while true;
do path=`find lib test | grep .js$ | xargs inotifywait -r -q -e close_write | sed "s/\s.*$//g"`
test=`echo $path | sed "s/^lib/test/g"`
src=`echo $path | sed "s/^test/lib/g"`
clear
echo "NODELINT: $src AND $test"
nodelint $src
if [ $? -ne "0" ]; then continue; fi
nodelint $test
if [ $? -ne "0" ]; then continue; fi
echo
echo "NODEUNIT: $test"
nodeunit $test
done
