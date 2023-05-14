//对帖子发表评论
export async function publishComment(content, mid) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
        'token':'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ7XG4gICAgXCJpZFwiOiAyOSxcbiAgICBcInVzZXJBY2NvdW50XCI6IFwiWmhhbmdzYW5cIixcbiAgICBcInBhc3N3b3JkXCI6IFwiMDVjODA2ZTFlZjM5NzFjZWU2NWUwNmM4NWQyYWU3NzNcIixcbiAgICBcImNyZWF0ZVRpbWVcIjogMTY4Mzk5MjYyMTAwMCxcbiAgICBcInVwZGF0ZVRpbWVcIjogMTY4Mzk5MjYyMTAwMCxcbiAgICBcImlzRGVsZXRlXCI6IDBcbn0iLCJpYXQiOjE2ODM5OTI2OTAsImV4cCI6MTY4NDAyODY5MH0.kqQvWYoQGmauWceajbPWSIOAr83TwK7pyrasQGTEro1Z0TjiK72i8WbuR8hZxzJ_gIz0ZquIgBze2BD3MAZbdw',
      },
      body: JSON.stringify({
        content: content,
        mid: mid
      })
    }
  
    try {
      const response = await fetch(
        `http://101.200.148.39:3599/api/controller/moodcomment/save.do?content=${content}&mid=${mid}`,
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