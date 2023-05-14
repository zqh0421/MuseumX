export async function editUsername(token, newname, oldname, password) {
  console.log(token, newname, oldname, password)
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'token': token
    },
    body: JSON.stringify({
      newAccount: newname,
      userAccount: oldname,
      userPassword: password,
    })
  }

  try {
    const response = await fetch(
      'http://101.200.148.39:3599/api/controller/all/user/updateAccount',
      options
    )
    if (response.ok) {
      console.log('Request successful')
    } else {
      if (response.status === '1') console.log('wrong username')
      else if (response.err === '2') console.log('wrong password')
      else console.log('Request failed')
    }
    const data = await response.json()
    console.log(data)
    return data
  } catch (err) {
    console.log(err)
  }
}
