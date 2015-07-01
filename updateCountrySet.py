#!/usr/bin/env python

import subprocess

INFILE = 'countrySet.csv'
OUTFILE = 'countrySet.js'

subprocess.call(['mac2unix', INFILE])

with open(INFILE) as f:
    fileLines = f.readlines()

outstring = 'var countrySet = ['
for line in fileLines:
    outstring += '['
    for name in line.split(','):
        if name[-1:] == '\n':
            name = name[:-1]
        outstring += '"' + name + '",'
    outstring = outstring[:-1]
    outstring += '],'
outstring = outstring[:-1]
outstring += "]"

with open(OUTFILE, 'w') as f:
    f.write(outstring)
