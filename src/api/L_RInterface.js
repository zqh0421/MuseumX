//登录
export async function login(username,password) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        //'Authorization':`Bearer ${apikey}`
      },
      body: JSON.stringify({
        "userAccount": username,
        "userPassword": password
      })
    };
  
    try {
      // fetch('http://101.200.148.39:3458/api/controller/adminUser/login', options)
      // .then(res => {
      //   console.log(res)
      //   res.json().then(data => {
      //     console.log(data)
      //   })
      // })

      const response = await fetch('http://101.200.148.39:3458/api/controller/adminUser/login', options);
      
      if(response.ok){
        console.log('Request successful');
      }else{
        if(response.err==='1'){
          alert('wrong username!');
        }else if(response.err==='2'){
          alert('wrong password!');
        }else
        console.log('Request failed'); 
      }

      const data= await response.json();
      console.log(data);

    } catch (err) {
      console.log(err);
    }
  }
  //注册
export async function register(checkPassword,username,password) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        //'Authorization':`Bearer ${apikey}`
      },
      body: JSON.stringify({
        "checkPassword":checkPassword,
        "userAccount":username,
        "userPassword":password
      })
    };
  
    try {
      const response = await fetch('http://101.200.148.39:3458/api/controller/adminUser/register', options);
      
      if(response.ok){
        console.log('Request successful');
      }else{
        if(response.err==='3'){
          alert('the username already exists!');
        }
        else
        console.log('Request failed');
      }
      const data= await response.json();
      console.log(data);
      
    } catch (err) {
      console.log(err);
    }
  }

  // login("123", "123")
  register("123","123","123")

async function register(checkPassword,username,password) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        //'Authorization':`Bearer ${apikey}`
      },
      body: JSON.stringify({
        "checkPassword":checkPassword,
        "userAccount":username,
        "userPassword":password
      })
    };
  
    try {
      const response = await fetch('http://101.200.148.39:3458/api/controller/adminUser/register', options);
      
      if(response.ok){
        console.log('Request successful');
      }else{
        if(response.err==='3'){
          alert('the username already exists!');
        }
        else
        console.log('Request failed');
      }
      const data= await response.json();
      console.log(data);
      
    } catch (err) {
      console.log(err);
    }
  }