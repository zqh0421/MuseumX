//详情页接口
// export async function getMore(id) {
//   const options = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       id: id
//     })
//   }
//   try {
//     const response = await fetch(
//       'http://101.200.148.39:3458/api/controller/artifact/getArtifactById',
//       options
//     )
//     if (response.ok) {
//       console.log('Request successful')
//     }
//     const data = await response.json()
//     console.log(data)
//     return data
//   } catch (err) {
//     console.log(err)
//   }
// }
//getMore(16)
//收藏功能接口
export async function Collect(id) {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    //   body: JSON.stringify({
    //     artifactId:id
    //   })
  }
  try {
    const response = await fetch(
      `http://101.200.148.39:3599/api/controller/artifactFavorite/save.do?artifactId=${id}`,
      options
    )
    if (response.ok) {
      console.log('Request Collect successful')
    }
    const data = await response.json()
    // console.log(data)
    return data
  } catch (err) {
    console.log(err)
  }
}
//首页文物展示接口
export async function Show(page, size) {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    // body: JSON.stringify({
    //   page:page,
    //   size:size
    // })
  }
  try {
    const response = await fetch(
      `http://101.200.148.39:3599/api/appartifact/all.do?page=${page}&size=${size}`,
      options
    )
    if (response.ok) {
      console.log('Request successful')
    }
    const data = await response.json()
    console.log(data)
    return data
  } catch (err) {
    console.log(err)
  }
}
Show(1, 15)
