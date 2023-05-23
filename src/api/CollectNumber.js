//文物收藏数量
export async function collectNumber(token, id) {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      token: token
    }
  }

  try {
    const response = await fetch(
      `http://101.200.148.39:3599/api/controller/artifactFavorite/collects.do?artifaceID=${id}`,
      options
    )
    if (response.ok) {
      console.log('Request collectNumber successful')
    } else {
      console.log('Request collectNumber failed')
    }
    const data = await response.json()
    // console.log(data)
    return data
  } catch (err) {
    console.log(err)
  }
}
