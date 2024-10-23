// src/services/tokenDecoder.js
import { jwtDecode } from "jwt-decode";

export const decodeToken = (token) => {
  try {
    const decoded = jwtDecode(token);
    // console.log("Decoded token:", decoded);
    return {
      name: decoded[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
      ],
      email:
        decoded[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
        ],
      role: decoded[
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
      ],
      userId: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"],
      jti: decoded.jti,
      exp: decoded.exp,
      iss: decoded.iss,
      aud: decoded.aud,
    };
  } catch (error) {
    console.error("Token không hợp lệ:", error);
    return null;
  }
};
