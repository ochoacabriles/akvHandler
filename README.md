Small package to retrieve a secret from Azure Key Vault. The environment where this package will be used needs to have permissions to read Azure Key Vault Secrets in the specified account.

The function returns a Promise which resolves to the value of the secret, or rejects to the err object.

Usage:
Run this command:
npm install --save akvhandler

In the code:
var akvhandler = require('akvhandler')

akvhandler.getSecret(keyVaultName, secretName)
  .then((secretValue) => {
    console.log({secretValue})
  })
  .catch((err) => {
    console.log({err})
  })