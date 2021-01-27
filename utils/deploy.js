//
// This file is for easy setup of the project.
// It's recommended to add this in a special file, so it's not mixed up with other code.
//

/** Key of the property to save the development ID */
const DEPLOYMENT_ID_KEY = 'deploymentId'

/**
 * Deploys this script. Notice that you should setup the deployment information into the projects' manifest.
 *
 * If this script was already deployed with another tool, it will get deployed again and will have a different URL.
 *
 * Requires scopes:
 *  - https://www.googleapis.com/auth/script.external_request
 *  - https://www.googleapis.com/auth/script.projects
 *  - https://www.googleapis.com/auth/script.deployments
 */
function deploy() {
  const properties = PropertiesService.getScriptProperties()
  const version = newVersion_()
  
  const deploymentId = properties.getProperty(DEPLOYMENT_ID_KEY)
  if (!deploymentId) {
    console.log(`Creating new deployment to version ${version.versionNumber}`)
    const deployment = newDeploy_(version.versionNumber)
    properties.setProperty(DEPLOYMENT_ID_KEY, deployment.deploymentId)
  } else {
    console.log(`Updating deployment to version ${version.versionNumber}`)
    updateDeploy_(deploymentId, version.versionNumber)
  }
}

/**
 * Makes a new version
 */
function newVersion_() {
  const response = UrlFetchApp.fetch(
    `https://script.googleapis.com/v1/projects/${ScriptApp.getScriptId()}/versions`,
    {
      method: 'POST',
      muteHttpExceptions: true,
      headers: {
        'Authorization': `Bearer ${ScriptApp.getOAuthToken()}`
      },
    },
  )
  return parseResponse_(response)
}

/**
 * Makes a new deployment
 */
function newDeploy_(versionNumber) {
  const response = UrlFetchApp.fetch(
    `https://script.googleapis.com/v1/projects/${ScriptApp.getScriptId()}/deployments`,
    {
      method: 'POST',
      payload: JSON.stringify({ versionNumber }),
      contentType: 'application/json; charset=utf-8',
      headers: {
        'Authorization': `Bearer ${ScriptApp.getOAuthToken()}`
      },
      muteHttpExceptions: true,
    },
  )
  return parseResponse_(response)
}

/**
 * Redeploys an existing deployment, updating the version
 */
function updateDeploy_(deploymentId, versionNumber) {
  const response = UrlFetchApp.fetch(
    `https://script.googleapis.com/v1/projects/${ScriptApp.getScriptId()}/deployments/${deploymentId}`,
    {
      method: 'PUT',
      payload: JSON.stringify({
        deploymentConfig: {
          versionNumber
        }
      }),
      contentType: 'application/json; charset=utf-8',
      headers: {
        'Authorization': `Bearer ${ScriptApp.getOAuthToken()}`
      },
      muteHttpExceptions: true,
    },
  )
  return parseResponse_(response)
}

/**
 * Helper function to parse a fetch's JSON response. Handles errors.
 *
 * @param {UrlFetchApp.HTTPResponse} response to parse
 * @returns {Object} Parsed JSON response
 */
function parseResponse_(response) {
  const result = response.getContentText()
  const code = response.getResponseCode()
  if (code < 200 || code >= 400) {
    throw result
  }
  return JSON.parse(result)
}
