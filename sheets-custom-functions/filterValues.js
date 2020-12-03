// USAGE: =LISTFILTER(RangeToFilter, ListOfItemsToFilter)
// Example: =LISTFILTER(A2:A,B2:B)
// Function in context: https://stackoverflow.com/a/63848446/11551468

/**
 * Takes in two ranges, A and B, and returns array C where
 * C contains values from A with the values from B removed
 * @param  {String[][]} rangeToFilter   - A Google Sheets Column Range 
 * @param  {String[][]} itemsToFilter   - A Google Sheets Column Range containing values to filter out of rangeToFilter
 * @return {String[][]} filteredList    - 2D array of values taken from rangeToFilter with values from itemsToFilter removed
 */
function LISTFILTER(rangeToFilter, itemsToFilter) {
  rangeToFilter = rangeToFilter.flat();
  itemsToFilter = itemsToFilter.flat();
  var filteredList = [];
  rangeToFilter.forEach(function(item) {
    if (!itemsToFilter.includes(item)) {
      filteredList.push(item);
    }
  });
  return filteredList;
}
