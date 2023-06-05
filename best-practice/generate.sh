#!/usr/bin/env bash

set -e

DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

if ! command -v deno &> /dev/null
then
    echo "Deno could not be found. Please install Deno from https://deno.com/manual/getting_started/installation."
    exit 1
fi

deno check "$DIR/index.ts"
deno fmt "$DIR/*.ts"
deno run --allow-read --allow-write "${DIR}/index.ts"
