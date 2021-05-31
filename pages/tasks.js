import React, { useEffect, useRef, useState } from "react";
import Tasks from "../components/Tasks";
import AuthWrapper from "../components/AuthWrapper";

const tasks = () => {
  return <Tasks />;
};

export default AuthWrapper(tasks);

// opt: String!
// img: String
// opts: [optionInput]!
// valid: String!
// cat: String!
// force: Boolean
