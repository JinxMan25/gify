#!/bin/bash

cd "./temp_videos/"

file=".gif"
output=$1$file
filename=$1

startTime=$2
endTime=$3

res=$4

ffmpeg -ss $startTime -i $filename -vf scale=$res:-1 -t $endTime -r 60 $output

