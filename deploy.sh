#!/bin/bash

./updateCountrySet.py
git add -A
git commit -m "auto deployed"
git push
