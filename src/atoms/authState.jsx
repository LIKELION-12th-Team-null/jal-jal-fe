import { atom } from "recoil";

export const authState = atom({
  key: "authState", // 상태의 고유 키
  default: {
    isLoggedIn: false,
    accessToken: null,
  },
});
