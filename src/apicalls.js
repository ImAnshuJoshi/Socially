import axios from "axios";

export const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post("http://localhost:8800/api/auth/login", userCredential);
    console.log("hi2");
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    console.log("hi3");
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};