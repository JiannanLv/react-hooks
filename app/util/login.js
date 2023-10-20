// import jwtDecode from 'jwt-decode';
import crypto from "crypto";
import { AUTH } from "@/constants/api";
import DomUtils from "@/utils/domUtils";
import location from "@/utils/location";

export default (username, password) =>
  fetch(AUTH.token, {
    method: "POST",
    body: JSON.stringify({
      username,
      password: crypto.createHash("md5").update(password).digest("hex"),
    }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      const { code, message, result } = res;

      if (code == -1) {
        DomUtils.showMessage(message, "登录失败");
      } else if (code == 0) {
        const token = result.token;

        localStorage.setItem("token", token);

        setTimeout(() => {
          const nextPathname = localStorage.getItem("nextPathname");

          if (nextPathname) {
            localStorage.removeItem("nextPathname");
            location.to(nextPathname);
          } else {
            location.toApps();
          }
        }, 150);
      }
    });
