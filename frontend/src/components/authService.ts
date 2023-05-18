const decodeToken = (token) => {
    try {
      const tokenParts = token.split(".");
      const encodedPayload = tokenParts[1];
      const decodedPayload = JSON.parse(atob(encodedPayload));
      return decodedPayload;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };
  
  const checkLoggedIn = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = decodeToken(token);
      return !!decodedToken;
    }
    return false;
  };
  
  const getEmail = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = decodeToken(token);
      return decodedToken?.Email || null;
    }
    return null;
  };

  const getName = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = decodeToken(token);
      return decodedToken?.FirstName + " " + decodedToken?.LastName  || null;
    }
    return null;
  };
  
  const getRole = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = decodeToken(token);
      return decodedToken?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || "User";
    }
    return null;
  };
  
  const getUserData = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = decodeToken(token);
      return decodedToken;
    }
    return null;
  }
  export { checkLoggedIn, getEmail, getRole, getName, getUserData };