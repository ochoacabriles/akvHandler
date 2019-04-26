Small package to retrieve a secret from Azure Key Vault. The environment where this package will be used needs to have permissions to read Azure Key Vault Secrets in the specified account.

The function returns a Promise which resolves to an array of objects contenting the secret name and value for each one, or rejects to the err object.

This is the form of the response object:

```js
[{
  name: secretName,
  value: secretValue
}, ...]
```

Usage:
Run this command:
`npm install --save akv_handler`

In your code:
```js
var akvHandler = require('akv_handler')

akvHandler.getSecret(keyVaultName, secretsArray)
  .then((secretsAray) => {
    console.log({secretsArray})
  })
  .catch((err) => {
    console.log({err})
  })
  ```

`keyVaultName` is the name given to the Azure Key Vault.
`secretName` is the name of the secret with the version in this format: `my_secret/version` (to get the version, go to Azure Portal, then to the Key Vault and then to Secrets)
