//最热
export async function discover(page, size) {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: JSON.stringify({
        page: page,
        size: size
      })
    }
    try{
        const response = await fetch (
            `http://101.200.148.39:3599/api/allbylikenum.do?page=${page}&size=${size}`,
            // options
        )
        console.log("response: ")
        console.log(response)
        if (response.ok) {
          console.log('Request successful')
        } else { 
            console.log('Request failed')
          }
        const data = await response.json()
        console.log(data)
        return data
    } catch (err) {
        console.log(err)
    }
}