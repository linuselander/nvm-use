#!/usr/bin/env node
const { hasNvm, useVersion, getRequestedVersion } = require('./')
const silent = process.argv.includes('-s') || process.argv.includes('--silent')
const requestedVersion = getRequestedVersion()
const currentVersion = process.version

if(hasNvm() && requestedVersion !== null) {
  useVersion(requestedVersion, silent, () => process.exitCode = 1)
}
