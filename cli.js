#!/usr/bin/env node
const {use, nvmrc, has} = require('./')

const silent = process.argv.includes('-s') || process.argv.includes('--silent')
const requested = nvmrc()

if(requested !== null) {
    use(requested, silent, () => process.exitCode = 1)
}
