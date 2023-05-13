//帖子发表评论
export async function publishPostComment(content, mid) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: content,
        mid : mid
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