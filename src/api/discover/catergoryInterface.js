// 分类展示
export async function Show_category(page, size) {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    }
  
    try {
      const response = await fetch(
        `http://101.200.148.39:3599/api/category/all.do?page=${page}&size=${size}`,
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

  