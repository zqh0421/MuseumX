//输入帖子id,给帖子点赞
export async function postLike(id) {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        //加token
      },
    }
  
    try {
      const response = await fetch(
        `http://101.200.148.39:3599/api/controller/moodlike/save.do?mid=${id}`,
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