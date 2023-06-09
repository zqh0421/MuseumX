//最热
export async function allPopular(page, size) {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
  try {
    const response = await fetch(
      `http://101.200.148.39:3599/api/mood/allbylikenum.do?page=${page}&size=${size}`,
      options
    )
    // console.log("response: ")
    // console.log(response)
    if (response.ok) {
      console.log('Request allPopular successful')
    } else {
      console.log('Request allPopular failed')
    }
    const data = await response.json()
    //console.log(data)
    return data
  } catch (err) {
    console.log(err)
  }
}
