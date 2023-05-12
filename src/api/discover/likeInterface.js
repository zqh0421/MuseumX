// 为动态点赞
export async function like(mid) {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'token':'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ7XG4gICAgXCJpZFwiOiAzLFxuICAgIFwidXNlckFjY291bnRcIjogXCIxMjM0NTY3ODkwXCIsXG4gICAgXCJwYXNzd29yZFwiOiBcImVkOTk0MWZhOTBmZTg0NWE0MTA1ZGU5MWQ4YjNkNWNlXCIsXG4gICAgXCJjcmVhdGVUaW1lXCI6IDE2ODM3Nzc0OTgwMDAsXG4gICAgXCJ1cGRhdGVUaW1lXCI6IDE2ODM3Nzc0OTgwMDAsXG4gICAgXCJpc0RlbGV0ZVwiOiAwXG59IiwiaWF0IjoxNjgzOTA3NjYwLCJleHAiOjE2ODM5MTEyNjB9.fzgMVhiQNYxVwHHpZMe0n15B3CHaSUG5HmVzOTrt2PF8aI14lU_KbOLCKXypaN84Hf0QRNnhJkxMsDNaG6c9GA'
      },
      // body: JSON.stringify({
      //   'mid': mid
      // })
    }
  
    try {
      const response = await fetch(
        `http://101.200.148.39:3599/api/controller/moodlike/save.do?mid=${mid}`,
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
  