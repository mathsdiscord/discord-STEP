#!/bin/sh
# DSC*.jpg W580i*.jpg
for file in 019*
do
 new=`echo $file | cut -c 2-`
 mv $file $new
done