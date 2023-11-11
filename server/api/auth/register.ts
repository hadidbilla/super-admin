import axios from "axios";
export default defineEventHandler(async (event)=> {
  console.log(event.method)
  if (event.method === 'POST') {
    try {
      const data = await readBody(event);

      let res = await axios.post('http://localhost:6000/user/signup',{
        method:"POST",
        body: data
      })
    } catch (e) {
      throw e;
    }
  }
})