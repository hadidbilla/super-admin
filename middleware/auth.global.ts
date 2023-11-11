export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie("token")
  // @ts-ignore
  // if (!token.value && (to.name !== "login" && to.name !== "signup")) {
  //   return navigateTo('/login');
  // }
})