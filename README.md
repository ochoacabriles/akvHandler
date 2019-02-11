Small package to retrieve a secret from Azure Key Vault. The environment where this package will be used needs to have permissions to read Azure Key Vault Secrets in the specified account.

The function returns a Promise which resolves to the value of the secret, or rejects to the err object.

Usage:
Run this command:
`npm install --save akv_handler`

In your code:
```js
var akvhandler = require('akvhandler')

akvhandler.getSecret(keyVaultName, secretName)
  .then((secretValue) => {
    console.log({secretValue})
  })
  .catch((err) => {
    console.log({err})
  })
  ```

`keyVaultName` is the name given to the Azure Key Vault.
`secretName` is the name of the secret with the version in this format: `my_secret/version` (to get the version, go to Azure Portal, then to the Key Vault and then to Secrets)
