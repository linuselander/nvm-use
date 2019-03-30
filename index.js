const nvm = require('./nvm-wrapper')
const Confirm = require('prompt-confirm')

const confirmAction = (question, callback) => {
  new Confirm(question)
    .ask(accepted => {
      callback(accepted)
    })
}

const install = (version, silent, callback) => {
  if(silent) {
    nvm.install(version)
    return;
  }
  console.log('Required version is NOT installed.')
  confirmAction(`Do you want to install ${version}?`, (accepted) => {
    if(accepted) nvm.install(version)
    callback(accepted)
  })
}

const useVersion = (version, silent, onAborted) => {
  if(version === process.version) return;

  if (!nvm.has(version)) {
    install(version, silent, (accepted) => accepted ? useVersion(version, silent, onAborted) : onAborted())
  }
  else if (silent) {
    nvm.use(version)
    return;
  }
  else {
    console.log('Required version IS installed, but currently NOT in use.')
    confirmAction(`Do you want to use ${version}?`, (accepted) => accepted ? nvm.use(version) : onAborted())
  }

}

module.exports = {
  hasNvm: nvm.isExecutable,
  getRequestedVersion: nvm.nvmrc,
  useVersion
}
