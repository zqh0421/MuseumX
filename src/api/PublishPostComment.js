//对帖子发表评论
export async function publishComment(token, content, id) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
        'token': token
      },
      body: JSON.stringify({
        content: content,
        mid: id
      })
    }
  
    try {
      const response = await fetch(
        'http://101.200.148.39:3599/api/controller/moodcomment/save.do',
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