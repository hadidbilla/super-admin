import axios from "axios";
import { CloudFog } from "lucide-vue-next";
export default defineEventHandler(async (event) => {
  //get single user
  if (event.method === "GET") {
    try {
      const { id } = event.context.params;
      console.log("id", id);
      let res = await axios.get(`http://localhost:6000/user/${id}`);
      console.log(res.data);
      return res.data;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
  //update user
  if (event.method === "PATCH") {
    try {
      const { id } = event.context.params;
      const data = await readBody(event);
      console.log("id", id);
      console.log("data", data);
      let res = await axios.patch(`http://localhost:6000/user/${id}`, data);

      console.log(res);
      return { message: "user updated" };
    } catch (e) {
      // console.log(e);
      throw e;
    }
  }

  //delete user

  if (event.method === "DELETE") {
    try {
      const { id } = event.context.params;
      console.log("id", id);
      let res = await axios.delete(`http://localhost:6000/user/${id}`);
      // console.log(res);
      return res.data;
    } catch (e) {
      // console.log(e);
      throw e;
    }
  }
});
