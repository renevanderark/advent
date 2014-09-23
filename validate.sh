#!/bin/bash

iwatch -t ".*\.js$" -e modify -c "clear; /usr/local/bin/nodelint %f --config nodelint_conf.js; node %f" .
