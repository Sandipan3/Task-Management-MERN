const tokenUtil = {
  setLocalStorageToken: (tokenValue) => {
    localStorage.setItem("token", tokenValue);
  },
  getLocalStorageToken: () => {
    return localStorage.getItem("token");
  },
};

export default tokenUtil;
