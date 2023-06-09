//登录
export async function login(username, password) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userAccount: username,
      userPassword: password
    })
  }

  try {
    const response = await fetch(
      'http://101.200.148.39:3599/api/controller/all/user/login',
      options
    )
    if (response.ok) {
      console.log('Request login successful')
    } else {
      if (response.status === '1') console.log('wrong username')
      else if (response.err === '2') console.log('wrong password')
      else console.log('Request login failed')
    }
    const data = await response.json()
    // console.log(data)
    return data
  } catch (err) {
    console.log(err)
  }
}
//注册
export async function register(checkpassword, username, password) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      checkPassword: checkpassword,
      userAccount: username,
      userPassword: password
    })
  }

  try {
    const response = await fetch(
      // 'http://101.200.148.39:3458/api/controller/adminUser/register',
      'http://101.200.148.39:3599/api/controller/all/user/register',
      options
    )
    if (response.ok) {
      console.log('Request register successful')
    } else {
      if (response.err === '3') console.log('the username alreadly exists')
      else console.log('Request register failed')
    }
    const data = await response.json()
    // console.log(data)
    return data
  } catch (err) {
    console.log(err)
  }
}

//   login("1234","1234")
