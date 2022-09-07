import React, { useState } from "react";
import Button from "../../Components/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Cookies } from "react-cookie";

function SignIn() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [text, setText] = useState("");
  const cookies = new Cookies();
  const navigate = useNavigate();

  const onChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onSignIn = () => {
    if (id.length === 0) return setText("아이디를 입력해주세요");
    if (password.length === 0) return setText("비밀번호를 입력해주세요");

    axios
      .post(process.env.REACT_APP_API_URL + "auth/login", {
        user_id: id,
        password,
      })
      .then((res) => {
        cookies.set("token", res.data.token);
        if (res.data.isFirstLogin) navigate("/importance");
        else navigate("/House");
      })
      .catch(() => {
        setText("일치하는 사용자가 없습니다.");
      });
  };

  return (
    <div>
      <h1 className="h-40 text-4xl">부동산 체크리스트</h1>
      <div className="w-full p-2">아이디</div>
      <input className="w-full p-2" onChange={onChangeId}></input>
      <div className="w-full p-2">비밀번호</div>
      <input
        type="password"
        className="w-full p-2"
        onChange={onChangePassword}
      ></input>
      <p className="h-2 text-rose-500">{text}</p>
      <div className="flex w-full pt-6">
        <div className="w-full p-2">
          <Button text="로그인" onClick={onSignIn} />
        </div>
        <Link className="w-full p-2" to="/SignUp">
          <Button text="회원가입" />
        </Link>
      </div>
    </div>
  );
}

export default SignIn;
