#!/bin/bash

cd "./temp_videos/"

file=".gif"

ffmpeg -ss $startTime -i $filename -vf scale=$res:-1 -t $endTime -r 60 $output

