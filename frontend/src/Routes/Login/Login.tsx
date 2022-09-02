import React from "react";
import Button from "../../Components/Button";

function Login() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <h1 className="h-40 text-4xl">부동산 체크리스트</h1>
      <div className="w-full p-2">아이디</div>
      <input className="w-full p-2"></input>
      <div className="w-full p-2">비밀번호</div>
      <input type="password" className="w-full p-2"></input>
      <div className="flex w-full pt-6">
        <a className="w-full p-2">
          <Button text="로그인" />
        </a>
        <a className="w-full p-2">
          <Button text="회원가입" />
        </a>
      </div>
    </div>
  );
}

export default Login;
