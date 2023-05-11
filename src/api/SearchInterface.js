import DocumentPicker from 'react-native-document-picker'
//以图搜图
export async function pickDocument() {
  try {
    const result = await DocumentPicker.pick({
      type: [DocumentPicker.types.allFiles],
    })
    console.log(
      result.uri,
    )
    const formData = new FormData()
    formData.append('file', {
      uri: result.uri,
    })
    const response = await fetch('http://101.200.148.39:3599/api/file', {
      method: 'POST',
      body: formData,
    })
    const data = await response.json()
    //跳转到搜索结果页？
    console.log(data)
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
    // User cancelled the picker?
    } else {
    // Error occurred
      console.log(err)
    }
  }
}
//关键词搜索
export async function KeySearch(currPage,keyword,pageSize){
  const Item = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      currPage:currPage,
      Keyword:keyword,
      pageSize:pageSize,
    })
  }
  const response = await fetch('http://101.200.148.39:3599/api/artifact/searchArtifact',Item )
  if (response.ok) {
    console.log('Request successful')
  }
  const data=response.json()
  //跳转到搜索结果页？
  return data
}

//KeySearch('青花瓷')

//热门榜
export async function HotList(){
  const response = await fetch('api')
  if (response.ok) {
    console.log('Request successful')
  }
  const data=response.json()
  return data
}