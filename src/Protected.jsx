import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Protected = (props) => {
  const { Component } = props;
  const navigate = useNavigate();
  useEffect(() => {
    let token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
    }
  });
  return (
    <div>
      <Component />
    </div>
  );
};

export default Protected;
