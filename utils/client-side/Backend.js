/**
 * Object that has the backend public functions handlers.
 * This handlers return a Promise, which can be used with async/await.
 * 
 * Example:
 * ```javascript
 * async doSomething() {
 *   const response = await Backend.backendFunction()
 *   console.log(response)
 * }
 * ```
 */
const Backend = (function(){
  const Backend = {}
  document.addEventListener('DOMContentLoaded', () => {
    Object.defineProperties(
      Backend,
      Object.fromEntries(
        Object.entries(google.script.run)
          .filter(([_, f]) => !f.name)
          .map(([name, _]) => ([name, {
            value(...args) {
              // the new async function
              return new Promise((resolve, reject) => {
                google.script.run
                  .withSuccessHandler(resolve)
                  .withFailureHandler(reject)
                  [name](...args)
              })
            },
            writable: false,
            configurable: false,
            enumerable: true,
          }]))
      )
    )
  })
  return Backend
})();
