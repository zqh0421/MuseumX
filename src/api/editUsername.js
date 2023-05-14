
export async function editUsername(token, newAccount, userAccount, userPassword){
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'token': token
      },
      body:'newAccount=newAccount1&userAccount=userAccount&userPassword=userPassword&userPassword=userPassword'
      // body: JSON.stringify({
      //   'newAccount': newAccount,
      //   'userAccount': userAccount,
      //   'userPassword': userPassword
      // })
    }
    try {
       const response = await fetch(
      'http://101.200.148.39:3599/api/controller/all/user/updateAccount',
      //'http://101.200.148.39:3599/api/all/user/login',
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
