import fb from 'firebase'

function uploadImage (image, key) {
  const storageRef = fb.storage().ref()
  const imageExt = image.name.slice(image.name.lastIndexOf('.'))
  const fileDataRef = storageRef.child(`ads/${key}.${imageExt}`)
  return fileDataRef.put(image)
    .then(snapshot => {
      return snapshot.ref.getDownloadURL()
        .then(downloadUrl => {
          return downloadUrl
        })
        .catch(error => {
          throw error
        })
    })
}

export default uploadImage
