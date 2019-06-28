const shell = require('shelljs')

const nvm = 'nvm'

const isExecutable = nvm => !!shell.which(nvm)

const cmd = (nvm => isExecutable(nvm) ? nvm : null)(nvm)

const list = () => shell
  .exec(`${cmd} list`, { silent: true })
  .stdout
  .split('\n')
  .reduce((acc, curr) => {
    if (curr.length) acc.push(curr.replace(/^[*\s]+([\d.]+).*/g, 'v$1'))
    return acc
  }, [])

const use = (version) => shell.exec(`${cmd} use ${version}`)

const install = (version) => shell.exec(`${cmd} install ${version}`)

const versionNumber = (input) => /^v\d{1,2}\.\d{1,2}\.\d{1,2}$/.test(input) ? input : null 

const nvmrc = () => {
  return shell.test('-f', '.nvmrc')
    ? versionNumber(shell.head({ '-n': 1 }, '.nvmrc').stdout.trim())
    : null
}

const has = (version) => list().includes(version)

module.exports = {
  isExecutable: !!cmd,
  list,
  use,
  install,
  nvmrc,
  has
}
