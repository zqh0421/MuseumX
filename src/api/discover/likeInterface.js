// 为动态点赞
export async function like(token, mid) {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      token: token
    }
  }

  try {
    const response = await fetch(
      `http://101.200.148.39:3599/api/controller/moodlike/save.do?mid=${mid}`,
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
}
