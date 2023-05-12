//发表评论
export async function publishComment(username, password) {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'token':'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ7XG4gICAgXCJpZFwiOiA3LFxuICAgIFwidXNlckFjY291bnRcIjogXCJ1c2VyMVwiLFxuICAgIFwicGFzc3dvcmRcIjogXCJkYmEzYjgxMDVmY2EwMGE4YTgxZmM3MzJlNzFlMDFhYVwiLFxuICAgIFwiY3JlYXRlVGltZVwiOiAxNjgzODU1ODU3MDAwLFxuICAgIFwidXBkYXRlVGltZVwiOiAxNjgzODU1ODU3MDAwLFxuICAgIFwiaXNEZWxldGVcIjogMFxufSIsImlhdCI6MTY4Mzg1NTkyNywiZXhwIjoxNjgzODU5NTI3fQ.BmNZuaZlvnhPVBoeFD63LyyC9qkbK09aNpLULuVY7gqD5v3J6JQ2ln69Wh7XqgUBFU3p76l-v-Bj7yU_R9Lfxg',
      },
    }
  
    try {
      const response = await fetch(
        `http://101.200.148.39:3599/api/moodcomment/all.do?userAccount=${username}&userPassword=${password}`,
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