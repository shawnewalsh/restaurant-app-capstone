/* /context/userContext.js */

import React from "react";
// create user context with default value

// set backup default for isAuthenticated if none is provided in Provider 
const userContext = React.createContext({ userName: "" });
export default userContext;