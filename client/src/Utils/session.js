import { getLocal } from "./storage";

export function isLogin() {
  return !!getLocal("sugsa");
}
