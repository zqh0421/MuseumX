export async function EditUsername(content) {
    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        body: JSON.stringify({
          newAccount: newAccount,
          userAccount: userAccount,
          userPassword: userPassword
        })
      }

      try {
        const response = await fetch(
          'http://101.200.148.39:3599/api/controller/mood/add.do',
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