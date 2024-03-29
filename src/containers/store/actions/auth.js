import axios from "axios";
import * as actionTypes from "./actionTypes";
import Notify from "../../../components/Toastify/Toastify";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};
export const auth = (email, password, name, isSignup) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      name: name,
      returnSecureToken: true,
    };
    let url = `${process.env.REACT_APP_SIGNUP_URL}`;
    if (!isSignup) {
      url = `${process.env.REACT_APP_SIGNIN_URL}`;
      axios
        .post(url, authData)
        .then((response) => {
          const expirationDate = new Date(
            new Date().getTime() + response.data.expiresIn * 1000
          );
          localStorage.setItem("token", response.data.idToken);
          localStorage.setItem("expirationDate", expirationDate);
          localStorage.setItem("userId", response.data.localId);
          dispatch(authSuccess(response.data.idToken, response.data.localId));
          dispatch(checkAuthTimeout(response.data.expiresIn));
          Notify("Sign in successful", "success");
        })
        .catch((error) => {
          Notify(
            error.response.data.error.message === "INVALID_PASSWORD"
              ? "Invalid Password"
              : "Invalid Email",
            "error"
          );
          dispatch(authFail(error.response.data.error));
        });
    } else if (isSignup) {
      axios
        .post(url, authData)
        .then((response) => {
          const expirationDate = new Date(
            new Date().getTime() + response.data.expiresIn * 1000
          );
          localStorage.setItem("token", response.data.idToken);
          localStorage.setItem("expirationDate", expirationDate);
          localStorage.setItem("userId", response.data.localId);
          localStorage.setItem("userName", authData.name);
          dispatch(authSuccess(response.data.idToken, response.data.localId));
          dispatch(checkAuthTimeout(response.data.expiresIn));
          Notify("Sign up successful", "success");
          axios.put(
            `${process.env.REACT_APP_FIREBASE_URL}${localStorage.getItem(
              "userId"
            )}.json`,
            { email: authData.email, name: authData.name }
          );
        })
        .catch((error) => {
          Notify(
            error.response.data.error.message === "EMAIL_EXISTS"
              ? "Email already exists"
              : "Password must be at least 6 characters",
            "error"
          );
          dispatch(authFail(error));
        });
    }
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem("userId");
        dispatch(authSuccess(token, userId));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
    return token;
  };
};
