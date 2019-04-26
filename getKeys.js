const rp = require('request-promise')

// Function to get Oauth token to authenticate in Azure Key Vault
function retrieveToken () {
  return new Promise( (resolve, reject) => {
    var tokenOptions = {
      method: 'GET',
      headers: {
        'Metadata': true
      },
      uri: 'http://169.254.169.254/metadata/identity/oauth2/token?api-version=2018-02-01&resource=https%3A%2F%2Fvault.azure.net',
      resolveWithFullResponse: true
    }
    rp(tokenOptions) 
      .then((responseToken) => {
        var parsedResponse = JSON.parse(responseToken.body)
        var token = parsedResponse.access_token
        resolve(token)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/*
  Function to retrieve a secret from Azure Key Vault
  Receives the token and the name of the secret wiht its version (secret/version) as parameters
*/
function retrieveSecret (token, secretName, keyVaultName) {
  return new Promise ((resolve, reject) => {
    var passwordOptions = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      },
      uri: 'https://' + keyVaultName + '.vault.azure.net/secrets/' + secretName + '?api-version=2016-10-01',
      resolveWithFullResponse: true
    }
    rp(passwordOptions)
      .then((responseKey) => {
        var keyObject = JSON.parse(responseKey.body)
        var key = keyObject.value
        resolve(key)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

module.exports.getSecrets = (keyVaultName, secretsArray) => {
  return new Promise(async (resolve, reject) => {
    try {
      var token = await retrieveToken()
      const promises = secretsArray.map(retrieveSecret(token, secretName, keyVaultName))
      retrievedSecrets = await Promise.all(promises)
      resolve(retrieveSecrets)
    } catch(err) {
      reject(err)
    }
  })
}