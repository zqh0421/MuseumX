//发表文物评论
export async function publishArtifactComment(token, id, content) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      token: token
    },
    body: JSON.stringify({
      artifactId: id,
      content: content
    })
  }

  try {
    const response = await fetch(
      `http://101.200.148.39:3599/api/controller/Artifactcomment/save.do`,
      options
    )
    if (response.ok) {
      //请求成功,使用 ===
      console.log('Request successful')
    } else {
      console.log('Request failed')
    }
    const data = await response.json()
    console.log(data)
    return data // 返回请求到的数据
  } catch (err) {
    console.log(err)
  }
}
