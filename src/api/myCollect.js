// 用户自己收藏的文物
export async function myCollect(token) {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      token: token
    }
  }

  try {
    const response = await fetch(
      'http://101.200.148.39:3599/api/controller/artifactFavorite/my.do',
      options
    )
    if (response.ok) {
      console.log('Request myCollect successful')
    } else {
      console.log('Request myCollect failed')
    }
    const data = await response.json()
    // console.log(data)
    return data
  } catch (err) {
    console.log(err)
  }
}
