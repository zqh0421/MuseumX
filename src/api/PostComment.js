//获取帖子评论
export async function postComment(mid) {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type':'application/x-www-form-urlencoded',
      },
    }
  
    try {
      const response = await fetch(
        `http://101.200.148.39:3599/api/moodcomment/all.do?mid=${mid}`,
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