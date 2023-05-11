//文物收藏数量
export async function collect_number(id) {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'token':'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ7XG4gICAgXCJpZFwiOiA0LFxuICAgIFwidXNlckFjY291bnRcIjogXCJ0ZXN0MVwiLFxuICAgIFwicGFzc3dvcmRcIjogXCIwNWM4MDZlMWVmMzk3MWNlZTY1ZTA2Yzg1ZDJhZTc3M1wiLFxuICAgIFwiY3JlYXRlVGltZVwiOiAxNjgzNzk3OTIwMDAwLFxuICAgIFwidXBkYXRlVGltZVwiOiAxNjgzNzk3OTIwMDAwLFxuICAgIFwiaXNEZWxldGVcIjogMFxufSIsImlhdCI6MTY4MzgwODI5NiwiZXhwIjoxNjgzODExODk2fQ.-X6ck4dLuXHTNvCdtbiykUGhXnd5PLv6NZ2fesDY2qiV7FuSYBrJwhIIHg_miQ8kgni5wGnv_BpWEUDWDrQ2HA',
      },
      body: JSON.stringify({
        artifactId: id,
      })
    }
  
    try {
      const response = await fetch(
        'http://101.200.148.39:3599/api/controller/artifactFavorite/collects.do',
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