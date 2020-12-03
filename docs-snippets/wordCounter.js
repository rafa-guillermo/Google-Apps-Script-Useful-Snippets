/**
 * Returns number of words in a given Document
 * @param  {String} docId    - A Google Docs File ID
 * @return {Number} count    - number of words in given Document
 */
 function countWords(docId) {
  let doc = DocumentApp.openById(docId)().getBody().getText();
  let count = (doc.match(/\b\S+\b/g) || []).length;
  return count;
}
