//import DocumentPicker from 'react-native-document-picker'
//以图搜图
export async function pickDocument() {
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
//关键词搜索
export async function KeySearch(currPage, keyword, pageSize) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      currPage: currPage,
      keyword: keyword,
      pageSize: pageSize
    })
  }
  const response = await fetch(
    'http://101.200.148.39:3599/api/artifact/searchArtifact',
    options
  )
  if (response.ok) {
    console.log('Request keysearch successful')
  }
  const data = response.json()
  console.log(data)
  return response
}
//KeySearch(1,'jay',10)
//KeySearch('青花瓷')