#!/bin/bash

current="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd -P )"
cd "$current"

gtime -vp node ../sync.js 	1>/dev/null 2> ../test/sync.txt
gtime -vp node ../async.js 	1>/dev/null 2> ../test/async.txt
gtime -vp node ../pipe.js 	1>/dev/null 2> ../test/pipe.txt
NODE_DEBUG=stream node ../pipe.js 1>/dev/null 2> ../test/debuglog.txt
# TODO: investigate high context switches in pipe 
# https://github.com/nodejs/node/issues/6379