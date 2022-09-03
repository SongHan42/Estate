import React, { useState } from "react";
import InputComponent from "./InputComponent";
import axios from "axios";
import InputPassword from "./InputPassword";
import Button from "../../Components/Button";
import { useNavigate } from "react-router";

export enum Check {
  start,
  dup,
  notDup,
}

function SignUp() {
  const [id, setId] = useState("");
  const [checkId, setCheckId] = useState<Check>(Check.start);
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [email, setEmail] = useState("");
  const [checkEmail, setCheckEmail] = useState<Check>(Check.start);
  const [nickname, setNickname] = useState("");
  const [checkNickname, setCheckNickname] = useState<Check>(Check.start);
  const navigate = useNavigate();

  const onChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };

  const onCheckId = async () => {
    const data = await axios
      .get(process.env.REACT_APP_API_URL + "user/id/" + id)
      .then((data) => data.data);
    if (data.isSuccess) {
      setCheckId(Check.notDup);
    } else {
      setCheckId(Check.dup);
    }
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onChangeCheckPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckPassword(e.target.value);
  };

  const passowrdCheckText = () => {
    if (password.length < 4) {
      return "비밀번호가 너무 짧습니다.";
    }
    if (password !== checkPassword) {
      return "비밀번호가 일치하지 않습니다.";
    }
    return "사용가능한 비밀번호입니다.";
  };

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onCheckEmail = async () => {
    setCheckEmail(Check.dup);
    const data = await axios.get(
      process.env.REACT_APP_API_URL + "user/email/" + email,
    );
    console.log(data);
  };

  const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const onCheckNickname = async () => {
    setCheckNickname(Check.dup);
    const data = await axios.get(
      process.env.REACT_APP_API_URL + "user/nickname/" + nickname,
    );
    console.log(data);
  };

  const onSignUp = () => {
    if (checkId !== Check.notDup) {
      return alert("아이디 중복확인을 해주세요.");
    }
    if (password.length < 4) {
      return alert("비밀번호 길이가 너무 짧습니다.");
    }
    if (password !== checkPassword) {
      return alert("비밀번호를 확인해주세요.");
    }
    if (checkEmail !== Check.notDup) {
      return alert("이메일 중복확인을 해주세요.");
    }
    if (checkNickname !== Check.notDup) {
      return alert("닉네임 중복확인을 해주세요.");
    }

    navigate("/house");
  };

  return (
    <div>
      <h1 className="text-4xl pb-4">회원가입</h1>

      <InputComponent
        text="아이디"
        onClick={onCheckId}
        onChange={onChangeId}
        check={checkId}
      />
      <InputPassword text={"비밀번호"} onChange={onChangePassword} />
      <InputPassword text={"비밀번호 확인"} onChange={onChangeCheckPassword} />
      <p className="w-full text-left text-rose-500">{passowrdCheckText()}</p>
      <InputComponent
        text="이메일"
        onClick={onCheckEmail}
        onChange={onChangeEmail}
        check={checkEmail}
      />
      <InputComponent
        text="닉네임"
        onClick={onCheckNickname}
        onChange={onChangeNickname}
        check={checkNickname}
      />
      <Button text={"회원가입"} onClick={onSignUp} />
    </div>
  );
}

export default SignUp;
