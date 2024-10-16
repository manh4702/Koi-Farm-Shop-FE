export const setAuthToken = (token) => {
    localStorage.setItem('authToken', token);
  };
  
  export const getAuthToken = () => {
    return localStorage.getItem('authToken');
  };
  
  export const removeAuthToken = () => {
    localStorage.removeItem('authToken');
  };
  
  export const setUserRole = (role) => {
    localStorage.setItem('userRole', role);
  };
  
  export const getUserRole = () => {
    return localStorage.getItem('userRole');
  };
  
  export const removeUserRole = () => {
    localStorage.removeItem('userRole');
  };