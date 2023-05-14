//文物
export async function getCategory(page, size) {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }

  try {
    const response = await fetch(
      `http://101.200.148.39:3599/api/category/all.do?page=${page}&size=${size}`,
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
