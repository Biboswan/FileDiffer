![Build status](https://github.com/Biboswan/filediffer-cli/workflows/Build%20and%20Deploy/badge.svg)


## filediffer-cli

A command line tool to compare files.

## Environment

Node >=10.16.0

## Installation

The CLI can be installed as an  [npm module](https://www.npmjs.com/package/filediffer-cli):

    npm install -g filediffer-cli
    or
    yarn global add filediffer-cli

## Usage

    filediffer --help
    filediffer byline --file1={filepath1} --file2={filepath2}
    
    export BASE_PATH='BASE_PATH'
    filediffer byline --file1={filepath1} --file2={filepath2}
