import axios from "axios";
export default defineEventHandler(async (event) => {
  console.log(event.method);
  if (event.method === "POST") {
    try {
      const data = await readBody(event);

      let res = await axios.post(
        "https://super-admin-server.vercel.app/user/signin",
        {
          method: "POST",
          body: data,
        }
      );
      setCookie(event, "token", res.data.token);
      console.log(res.data);
      return res.data;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  if (event.method === "GET") {
    try {
      let res = await axios.get("https://super-admin-server.vercel.app/user");
      console.log(res.data);
      return res.data;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
});
