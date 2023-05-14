// 以图搜图
export async function searchPhoto(formData) {
  try {
    const response = await fetch('http://101.200.148.39:3599/api/file?Content-Type=multipart/form-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      body: formData
    })
    const data = await response.json()
    console.log(data)
    return data
  } catch (err) {
    console.log(err)
  }
}

// 关键词搜索
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
  try {
    const response = await fetch(
      'http://101.200.148.39:3599/api/artifact/searchArtifact',
      options
    )
    if (response.ok) {
      console.log('Request keysearch successful')
    }
    const data = response.json()
    console.log(data)
    return data
  } catch (err) {
    console.log(err)
  }
}