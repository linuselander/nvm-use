# Use .nvmrc on Windows

On \*nix systems the Node Version Manager [nvm](https://github.com/creationix/nvm) can make use of a .nvmrc in the project folder and automatically use the appropriate version of Node.  
The Windows implementation of a Node version Manager [nvm-windows](https://github.com/coreybutler/nvm-windows) does not implement that functionality.

## nvm-use

nvm-use is a small wrapper for nvm for use in npm scripts.  

### Requirements

[nvm-windows](https://github.com/coreybutler/nvm-windows) must be installed for
nvm-use to perform any actions. If you are running your npm script from another
system nvm-use will simply exit with 0 and your npm script will continue.

### Setup

Create a .nvmrc in the project root
```bash
node --version > .nvmrc
```

And prepend your scripts in package.json with nvm-use
```js
{
  //...
  "scripts": {
    "start": "nvm-use && ..."
  }
  //...
}
```

