export async function collect(token, id) {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      token: token
    }
  }

  try {
    const response = await fetch(
      `http://101.200.148.39:3599/api/controller/artifactFavorite/save.do?artifactId=${id}`,
      options
    )
    if (response.ok) {
      //请求成功,使用 ===
      console.log('Request successful')
    } else {
      console.log('Request failed')
    }
    const data = await response.json()
    console.log(data)
    return data // 返回请求到的数据
  } catch (err) {
    console.log(err)
  }
}
