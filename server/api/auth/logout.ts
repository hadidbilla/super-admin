export default defineEventHandler(async (event)=>{
  //logout
  if(event.method === 'POST'){
    try {
      setCookie(event, 'token', '')
      return {message:"logout"}
    } catch (e) {
      throw e;
    }
  }
})