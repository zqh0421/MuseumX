export async function post(token, formData) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
      'token': token
    },
    body: formData
  }
  try {
    const response = await fetch(
      'http://101.200.148.39:3599/api/controller/mood/add.do',
      options
    )
    if (response.ok) {
      console.log('Request successful')
    } else {
      console.log('Request failed')
    }
    const data = await response.json()
    console.log(data)
    return data
  } catch (err) {
    console.log(err)
  }
  try {
  //   const result = await DocumentPicker.pick({
  //     type: [DocumentPicker.types.allFiles]
  //   })
  //   console.log(result.uri)
  //   const formData = new FormData()
  //   formData.append('file', {
  //     uri: result.uri
  //   })
  //   const response = await fetch('http://101.200.148.39:3599/api/file', {
  //     method: 'POST',
  //     body: formData
  //   })
  //   const data = await response.json()
  //   console.log(data)
  // } catch (err) {
  //   if (DocumentPicker.isCancel(err)) {
  //     // User cancelled the picker?
  //   } else {
  //     // Error occurred
  //     console.log(err)
  //   }
  }catch(error){
    console.log(error)
  }
}