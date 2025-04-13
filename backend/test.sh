#!/usr/bin/env sh

set -e

test1()
{
    curl -X POST \
        -H "Content-Type: application/json" \
        -d '{"name": "commrade-goad"}' \
        localhost:3000/api/set-session-name \
        --cookie-jar cookies.txt
    echo ""
}

test2()
{
    curl -X GET \
        localhost:3000/api/get-session-name \
        --cookie cookies.txt
    echo ""
}

echo -e " :: Use 'source test.sh' to use the test function manually. :: "
echo -e " :: Use './test.sh run-from-start' to start the test. :: "
echo -e " :: Use './test.sh run-from-start-noclear' to start the test. :: "
echo -e "   * test1 (POST set name)"
echo -e "   * test2 (GET get name)"

if [ -z "$1" ]; then exit; fi

if [ "$1" = "run-from-start" ]; then
    ./webrpl &
    sleep 0.2
    test1
    test2

    pkill webrpl
    rm ./cookies.txt
    rm ./db/sessions.db
fi

if [ "$1" = "run-from-start-noclear" ]; then
    ./webrpl &
    sleep 0.2
    test1
    test2

    pkill webrpl
fi
