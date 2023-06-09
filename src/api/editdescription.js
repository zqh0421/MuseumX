export async function editdescription(newAccount, userAccount, userPassword) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
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
    if (response.ok) {
      console.log('Request successful')
    } else {
      if (response.err === '1') console.log('')
      else console.log('Request failed')
    }
    const data = await response.json()
    console.log(data)
    return data
  } catch (err) {
    console.log(err)
  }
}
