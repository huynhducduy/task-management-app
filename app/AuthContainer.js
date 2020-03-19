import { createContainer } from "unstated-next";
import React, { useState } from "react";

export default createContainer(function(initialState = false) {
    let [isLoggedIn, setLoggedIn] = useState(initialState);
    return { isLoggedIn, setLoggedIn };
});
