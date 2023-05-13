//收藏
export async function collect(id) {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'token':'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ7XG4gICAgXCJpZFwiOiAyOSxcbiAgICBcInVzZXJBY2NvdW50XCI6IFwiWmhhbmdzYW5cIixcbiAgICBcInBhc3N3b3JkXCI6IFwiMDVjODA2ZTFlZjM5NzFjZWU2NWUwNmM4NWQyYWU3NzNcIixcbiAgICBcImNyZWF0ZVRpbWVcIjogMTY4Mzk5MjYyMTAwMCxcbiAgICBcInVwZGF0ZVRpbWVcIjogMTY4Mzk5MjYyMTAwMCxcbiAgICBcImlzRGVsZXRlXCI6IDBcbn0iLCJpYXQiOjE2ODM5OTI2OTAsImV4cCI6MTY4NDAyODY5MH0.kqQvWYoQGmauWceajbPWSIOAr83TwK7pyrasQGTEro1Z0TjiK72i8WbuR8hZxzJ_gIz0ZquIgBze2BD3MAZbdw',
      },
    }
  
    try {
      const response = await fetch(
        `http://101.200.148.39:3599/api/controller/artifactFavorite/save.do?artifactId=${id}`,
        options
      )
      if (response.ok) {  //请求成功,使用 ===
        console.log('Request successful')
      } else {
        console.log('Request failed')
      }
      const data = await response.json()
      console.log(data)
      return data       // 返回请求到的数据
    } catch (err) {
      console.log(err)
    }
  }