//最新
export async function allNew(page, size) {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
  try {
    const response = await fetch(
      `http://101.200.148.39:3599/api/mood/allbytime.do?page=${page}&size=${size}`,
      options
    )
    // console.log("response: ")
    // console.log(response)
    if (response.ok) {
      console.log('Request allNew successful')
    } else {
      console.log('Request allNew failed')
    }
    const data = await response.json()
    // console.log(data)
    return data
  } catch (err) {
    console.log(err)
  }
}
