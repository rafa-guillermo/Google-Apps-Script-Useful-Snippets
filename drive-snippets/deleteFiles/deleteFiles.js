/**
 * Permanently delete the files in a drive folder (non recursive) using bulk API.
 *
 * WARNING: This utility does **NOT** move the files to the trash, it parmanently deletes them.
 *
 * This code requires you to use the V8 runtime and to add the following scopes to your project manifest file:
 *   - https://www.googleapis.com/auth/drive
 *   - https://www.googleapis.com/auth/script.external_request
 * 
 * You may copy the declarations from `appsscript.json`.
 *
 * Read about bulk in GAS:
 *   - https://developers.google.com/apps-script/guides/services/advanced
 *   - https://developers.google.com/drive/api/v3/batch
 * 
 * 
 * @param {Folder} folder Folder containing the files to delete.
 * @callback filter Callback to filter the files.
 */
async function deleteFiles(folder, filter = () => true) {
  const bulkLimit = 100 // Drive has a limit of 100 requests per bulk
  const files = folder.getFiles()

  let bulk = []
  const promises = []
  while (files.hasNext()) {
    const file = files.next()
    if (filter(file)) {
      bulk.push(file)
    }

    // Limit of requests per bulk reached
    if (bulk.length === bulkLimit) {
      promises.push(sendBulk_(bulk))
      bulk = []
    }
  }

  // Send bulk with the remaining requests
  if (bulk.length > 0) {
    promises.push(sendBulk_(bulk))
  }

  await Promise.all(promises)
}


/// Sends a bulk request deleting all the files
const sendBulk_ = makeAsync(function (files) {
  const boundary = 'batch_manual_delete_multi_files_boundary'
  let payload = ''
  for (let i = 0; i < files.length; i++) {
    const id = files[i].getId()

    // Generate HTTP request to be added in the bulk payload
    payload += `--${boundary}\r\n`
    payload += `Content-Type: application/http\r\n`
    payload += `Content-ID: ${i}\r\n`
    payload += `\r\n`
    payload += `DELETE  /drive/v3/files/${id}\r\n`
    payload += `\r\n`
  }

  // Add the closing boundary
  payload += `--${boundary}--\r\n`

  // Multipart request with all the DELETE requests inside
  const options = {
    method: 'post',
    contentType: `multipart/mixed; boundary=${boundary}`,
    payload: Utilities.newBlob(payload).getBytes(),
    headers: {
      'Authorization': `Bearer ${ScriptApp.getOAuthToken()}`
    },
    muteHttpExceptions: true
  };

  // Do the actual request to the backend and log the response
  const res = UrlFetchApp.fetch('https://www.googleapis.com/batch/drive/v3', options).getContentText()
  Logger.log(res)
})



/*
 * EXAMPLES
 */

// Remove all files from root.
async function usageExample1() {
  await deleteFiles(DriveApp.getRootFolder())
}


// Remove all files from a folder having its ID.
async function usageExample2() {
  await deleteFiles(DriveApp.getFolderById('xxx'))
}


// Remove all files named "File to remove" from the root folder.
async function usageExample3() {
  await deleteFiles(DriveApp.getRootFolder(), file => file.getName() === 'File to remove');
}



/*
 * UTILITY FUNCTIONS
 */

/// Makes a function asynchronous
function makeAsync(func) {
  return function () {
    const that = this
    const args = arguments
    return new Promise((resolve, reject) => {
      try {
        resolve(func.apply(that, args))
      } catch (e) {
        reject(e)
      }
    })
  }
}
