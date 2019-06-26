const shell = require('shelljs')

const src = '$NVM_DIR/nvm.sh'
const cmd = 'nvm'

const isExecutable = cmd => !!shell.which(cmd)

const isFunction = (src, cmd) => !!shell.exec(`. ${src} && type ${cmd} 2> /dev/null | grep function$`, {silent:true}).stdout

const nvm = ((src, cmd) => {
  if (isExecutable(cmd)) return cmd;
  if (isFunction(src, cmd)) return `. ${src} && ${cmd}`;
  return null;
})(src, cmd)

const isCommand = () => !!nvm

const list = () => shell
  .exec(`${nvm} list`, { silent: true })
  .stdout
  .split('\n')
  .reduce((acc, curr) => {
    if (curr.length) acc.push(curr.replace(/^[*\s]+([\d.]+).*/g, 'v$1'))
    return acc
  }, [])

const use = (version) => shell.exec(`${nvm} use ${version}`)

const install = (version) => shell.exec(`${nvm} install ${version}`)

const versionNumber = (input) => /^v\d{1,2}\.\d{1,2}\.\d{1,2}$/.test(input) ? input : null 

const nvmrc = () => {
  return shell.test('-f', '.nvmrc')
    ? versionNumber(shell.head({ '-n': 1 }, '.nvmrc').stdout.trim())
    : null
}

const has = (version) => list().includes(version)

module.exports = {
  isCommand,
  list,
  use,
  install,
  nvmrc,
  has
}
