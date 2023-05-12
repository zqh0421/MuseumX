//用户自己点赞的帖子
export async function mylike() {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: JSON.stringify({
        
      })
    }
  
    try {
      const response = await fetch(
        `http://101.200.148.39:3599/api/moodlike/save.do`,
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