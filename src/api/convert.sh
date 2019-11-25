#!/bin/bash
for f in ./"$dir"/*.js; do
    babel --plugins babel-plugin-flow-to-typescript $f -o ${f:0:-3}.ts
done
for dir in ./*/; do
        for f in ./"$dir"/*.js; do
                babel --plugins babel-plugin-flow-to-typescript $f -o ${f:0:-3}.ts
        done
done
