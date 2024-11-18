import { atom } from "recoil";

export const authState = atom({
  key: "authState", // 고유 키
  default: {
    isLoggedIn: false,
    accessToken: null,
    userInfo: null, // 사용자 정보
  },
});
