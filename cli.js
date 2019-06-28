#!/usr/bin/env node
const { nvm, use, nvmrc } = require('./')
const silent = process.argv.includes('-s') || process.argv.includes('--silent')
const requestedVersion = nvmrc.read()

if(nvm && requestedVersion !== null) {
  use(requestedVersion, silent, () => process.exitCode = 1)
}
