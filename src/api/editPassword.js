export async function editPassword(token, newPassword, userAccount, userPassword) {
  const formData = new FormData()
  formData.append('newPassword', newPassword)
  formData.append('userAccount', userAccount)
  formData.append('userPassword', userPassword)
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
      'token': token,
    },
    body: formData
  }

  try {
    const response = await fetch(
      'http://101.200.148.39:3599/api/controller/all/user/updatePassword',
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