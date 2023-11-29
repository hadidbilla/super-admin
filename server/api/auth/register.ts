import axios from "axios";
export default defineEventHandler(async (event) => {
  console.log(event.method);
  if (event.method === "POST") {
    try {
      const data = await readBody(event);
      console.log("data", data);
      let res = await axios.post("http://localhost:6000/user/signup", data);
      console.log(res);
      return { message: "user Registered" };
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
});
