const LocalStorage = (function () {
  var _service;
  function _getService() {
    if (!_service) {
      _service = this;
      return _service;
    }
    return _service;
  }
  function _setToken(tokenObj) {
    localStorage.setItem("access_token", tokenObj.accessToken);
    localStorage.setItem("refresh_token", tokenObj.refreshToken);
  }
  function _setUser(user) {
    console.log(user);
    localStorage.setItem("userId", user.id);
    localStorage.setItem("role", user.role);
    if (user.branch) {
      localStorage.setItem("branchId", user.branch.id);
    }
  }
  function _getUserId() {
    return localStorage.getItem("userId");
  }
  function _getUserRole() {
    return localStorage.getItem("role");
  }
  function _getStaffBranchId() {
    return localStorage.getItem("branchId");
  }
  function _getAccessToken() {
    return localStorage.getItem("access_token");
  }
  function _getRefreshToken() {
    return localStorage.getItem("refresh_token");
  }
  function _clearToken() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  }
  function _clear() {
    localStorage.clear();
  }
  return {
    getService: _getService,
    setToken: _setToken,
    getAccessToken: _getAccessToken,
    getRefreshToken: _getRefreshToken,
    clearToken: _clearToken,
    setUser: _setUser,
    getUserId: _getUserId,
    getUserRole: _getUserRole,
    getStaffBranchId: _getStaffBranchId,
    clear: _clear,
  };
})();

export default LocalStorage;
