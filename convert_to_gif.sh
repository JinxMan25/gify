#!/bin/bash


file=".gif"
output=$4$file
filename=$1

startTime=$2
endTime=$3


ffmpeg -ss $startTime -i $filename -vf scale=640:-1 -t $endTime -r 60 $output

