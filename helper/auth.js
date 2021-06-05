import cookie from "js-cookie";

//set cookie
export const setToken = (key, value) => {
  if (process.browser) {
    cookie.set(key, value, {
      expires: 7,
    });
  }
};

//get cookie

export const getToken = (key) => {
  if (process.browser) {
    return cookie.get(key);
  }
};

export const setUser = (user) => {
  if (process.browser) {
    localStorage.setItem("user", JSON.stringify(user));
  }
};

export const getUser = (user) => {
  if (process.browser) {
   return JSON.parse(localStorage.getItem("user"));
  }
};

//remove cookie
export const deleteToken = (key) => {
  if (process.browser) {
    cookie.remove(key);
    cookie.remove("httptoken")
  }
};

export const authenticate = (data, next) => {
  setToken("token", data.token);
  next();
};
