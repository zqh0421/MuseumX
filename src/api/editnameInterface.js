//编辑用户名
export async function editnameInterface(token, newAccount, userAccount, userPassword) {
  console.log(token, newAccount, userAccount, userPassword)
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'token': token,
      },
      body: JSON.stringify({
        newAccount: newAccount,
        userAccount: userAccount,
        userPassword: userPassword
      })
    }
  
    try {
      const response = await fetch(
        'http://101.200.148.39:3599/api/controller/all/user/updateAccount',
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