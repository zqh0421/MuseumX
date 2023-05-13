//文物发表评论
export async function publishComment(artifactId, content) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'token':'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ7XG4gICAgXCJpZFwiOiAxMixcbiAgICBcInVzZXJBY2NvdW50XCI6IFwidXNlcjJcIixcbiAgICBcInBhc3N3b3JkXCI6IFwiMDVjODA2ZTFlZjM5NzFjZWU2NWUwNmM4NWQyYWU3NzNcIixcbiAgICBcImNyZWF0ZVRpbWVcIjogMTY4MzkwMDMxMTAwMCxcbiAgICBcInVwZGF0ZVRpbWVcIjogMTY4MzkwMDMxMTAwMCxcbiAgICBcImlzRGVsZXRlXCI6IDBcbn0iLCJpYXQiOjE2ODM5MDY2MDksImV4cCI6MTY4MzkxMDIwOX0.sDA3RfchJ9oeUCY9oqNeAwHXK1H5O6rjR_4emzSQif_zrL2Id7tyGXDdbjxgSzjQCynrXCFEduNEV0zQMieeTA'
      },
      body: JSON.stringify({
        artifactId: artifactId,
        content: content
      })
    }
  
    try {
      const response = await fetch(
        'http://101.200.148.39:3599/api/controller/Artifactcomment/save.do',
        options
      )
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