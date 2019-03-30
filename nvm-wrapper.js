const shell = require('shelljs')

const isExecutable = () => !!shell.which('nvm')

const list = () => shell
  .exec('nvm list', { silent: true })
  .stdout
  .split('\n')
  .reduce((acc, curr) => {
    if (curr.length) acc.push(curr.replace(/^[*\s]+([\d.]+).*/g, 'v$1'))
    return acc
  }, [])

const use = (version) => shell.exec(`nvm use ${version}`)

const install = (version) => shell.exec(`nvm install ${version}`)

const nvmrc = () => {
  return shell.test('-f', '.nvmrc')
    ? shell.head({ '-n': 1 }, '.nvmrc').stdout.trim()
    : null
}

const has = (version) => list().includes(version)

module.exports = {
  isExecutable,
  list,
  use,
  install,
  nvmrc,
  has
}
