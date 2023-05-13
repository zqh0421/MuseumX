//当前用户
export async function current(token) {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'token': token
    },

  }

  try {
    const response = await fetch(
      'http://101.200.148.39:3599/api/controller/all/user/current',
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