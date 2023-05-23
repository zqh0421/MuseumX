//用户发布的帖子
export async function myrelease(token) {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      token: token
    }
  }
  try {
    const response = await fetch(
      'http://101.200.148.39:3599/api/controller/mood/my.do',
      options
    )
    if (response.ok) {
      console.log('Request myrelease successful')
    } else {
      console.log('Request myrelease failed')
    }
    const data = await response.json()
    // console.log(data)
    return data
  } catch (err) {
    console.log(err)
  }
}
