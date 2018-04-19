#!/usr/bin/env bash

echo "Running pre push hook"
./scripts/run-tests.bash

# $? stores exit value of the last command
if [ $? -ne 0 ]; then
	echo ""
	echo "---------------------------"
	echo "All tests must pass before push!"
	echo ""
 	exit 1
else echo "All tests passed, proceed to pushing..."
fi
