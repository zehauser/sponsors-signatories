#!/bin/bash

./updateCountrySet.py
git add -A
MSG=$@
if [ -z "$MSG" ] 
then
    MSG="auto deployed"
fi

git commit -m "$MSG"	
git push
