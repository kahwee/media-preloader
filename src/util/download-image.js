export default function (request = {}) {
  let metadata = Object.assign({}, request, {
    success: false
  })
  return new Promise((resolve, reject) => {
    if (request.uri) {
      const img = new Image()
      img.onload = function () {
        metadata.asset = img
        metadata.success = true
        resolve(metadata)
      }
      img.onerror = function () {
        reject(metadata)
      }
      img.src = metadata.uri
    } else {
      reject(metadata)
    }
  })
}
