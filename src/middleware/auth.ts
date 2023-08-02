export { default } from "next-auth/middleware";

export const config = {
  // matcher: ["/((?!register|api|login).*)"],
  // TODO: ↑にログインしていないと見られないpathを指定する
};
