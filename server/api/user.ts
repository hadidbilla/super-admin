import axios from "axios";
export default defineEventHandler(async (event)=>{
  console.log(event.method)
  if(event.method === 'POST'){
      try {
        const data = await readBody(event);

        let res = await axios.post('http://localhost:6000/user/signin',{
          method:"POST",
          body: data
        })
        setCookie(event, 'token', res.data.token)
        console.log(res.data);
        return res.data
      } catch (e) {
        console.log(e)
        throw e;
      }
  }
})