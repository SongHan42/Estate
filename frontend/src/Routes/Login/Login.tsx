import React from "react";
import Button from "../../Components/Button";

function Login() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <h1 className="h-40 text-4xl">부동산 체크리스트</h1>
      <a className="w-10/12" href={process.env.REACT_APP_API_URL}>
        <Button text="카카오 로그인" />
      </a>
    </div>
  );
}

export default Login;
