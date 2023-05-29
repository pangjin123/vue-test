import { boot } from 'quasar/wrappers';
import axios from 'axios';
import Config from "../../config";
import { Notify } from "quasar";
import { LoadingBar } from "quasar";

function intercepterRes(name, isDev = false) {
  return function (response) {
    let { data, status } = response;

    if (isDev) {
      console.log("AJAX", name, status, data);
    }

    try {
      if(status && status !== 200) {  //자료형 변환 없이 같은지 확인
        let message = `${name} AJAX Error : ${status}`;
        try{
          Notify.create({ type: "negative", message: message });
          LoadingBar.increment(50);   //LoadinBar 연동중 상태 표시
          LoadingBar.setDefaults({
            color: "purple",
            size: "5px",
            position: "bottom",
          });
        } catch(error) {}
        throw new Error(`${name} AJAX Error: ${status}`);
      }

      try {
        if(data.status != 200) {  //자료형을 일치시킨 후 비교
          LoadingBar.increment(50);
          LoadingBar.setDefaults({
            color: "green",
            size: "5px",
            position: "bottom",
          });
          console.log("data.message", data.message);
          Notify.create({
            type: "negative",
            message: data.message,
          });
        } else {
          LoadingBar.increment(50);
          LoadingBar.setDefaults({
            color: "blue",
            size: "5px",
            position: "top",
          });
        }
        return data;
      }catch(error) { //오류가 발생할 시
        if(isDev) { //isDev로 개발중일때만 로그 볼수 있게 처리
          console.error(error);
        }
      }
    } catch(error) {
      if(isDev) {
        console.error(error);
      }
      return false;
    }
  };
}

const isDev = process.env.NODE_ENV == "development";
const config = isDev ? Config.development : Config.production;  //전역설정하여 외부파일에서 접근가능
// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ baseURL: config.API_SERVER, withCredentials: true });
api.interceptors.response.use(intercepterRes("api", isDev));

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api, axios };
