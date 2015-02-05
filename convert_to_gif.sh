#!/bin/bash

cd "./temp_videos/"

ffmpeg -i $1 -vf scale=320:-1 -t 10 -r 10 output.gif

