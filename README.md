# that-babysitter-kata

Based on:  https://github.com/PillarTechnology/kata-babysitter

A simple Node/JS App designed to calculate a babysitters pay for a night of sitting. I used the Mocha and Chai as testing frameworks. 

# How to make it work
Download or clone repo

In order to install, run in bash terminal:

npm install
npm run test

# Background

This kata simulates a babysitter working and getting paid for one night.  The rules are pretty straight forward:

The babysitter 
- starts no earlier than 5:00PM
- leaves no later than 4:00AM
- gets paid $12/hour from start-time to bedtime
- gets paid $8/hour from bedtime to midnight
- gets paid $16/hour from midnight to end of job
- gets paid for full hours (no fractional hours)


# Feature
As a babysitter
In order to get paid for 1 night of work
I want to calculate my nightly charge
