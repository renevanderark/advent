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
	if [ $? -ne "0" ]; then continue; fi

	echo
	echo "RUNNING BROWSERIFY on lib/client/app.js > scripts/main.js"
	browserify lib/client/app.js > scripts/main.js
	if [ $? -ne "0" ]
	then echo -e "\e[91mFAIL\e[39m"
	else echo -e "\e[92mSUCCESS\e[39m"
	fi
done
