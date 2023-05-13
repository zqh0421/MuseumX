//用户发布的帖子
export async function myrelease() {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'token' : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ7XG4gICAgXCJpZFwiOiAzLFxuICAgIFwidXNlckFjY291bnRcIjogXCIxMjM0NTY3ODkwXCIsXG4gICAgXCJwYXNzd29yZFwiOiBcImVkOTk0MWZhOTBmZTg0NWE0MTA1ZGU5MWQ4YjNkNWNlXCIsXG4gICAgXCJjcmVhdGVUaW1lXCI6IDE2ODM3Nzc0OTgwMDAsXG4gICAgXCJ1cGRhdGVUaW1lXCI6IDE2ODM3Nzc0OTgwMDAsXG4gICAgXCJpc0RlbGV0ZVwiOiAwXG59IiwiaWF0IjoxNjgzOTAzMTMwLCJleHAiOjE2ODM5MDY3MzB9.zpPvhTZbTaZ4cIatsbYYoGLXm19k76N3UxhBTaVjn0bsaB9KXYRZcp0UcfnfyienMBM-mb6idR_Dc27o4iY-lQ'
      },
    }
  
    try {
      const response = await fetch(
        `http://101.200.148.39:3599/api/controller/mood/my.do`,
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