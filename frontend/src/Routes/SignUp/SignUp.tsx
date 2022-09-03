import React, { useState } from "react";
import InputComponent from "./InputComponent";
import axios from "axios";
import InputPassword from "./InputPassword";
import Button from "../../Components/Button";
import { useNavigate } from "react-router";

export enum Check {
  START,
  DUP,
  NOT_DUP,
}

function SignUp() {
  const [id, setId] = useState("");
  const [checkId, setCheckId] = useState<Check>(Check.START);
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [email, setEmail] = useState("");
  const [checkEmail, setCheckEmail] = useState<Check>(Check.START);
  const [nickname, setNickname] = useState("");
  const [checkNickname, setCheckNickname] = useState<Check>(Check.START);
  const navigate = useNavigate();

  const onChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckId(Check.START);
    setId(e.target.value);
  };

  const onCheckId = () => {
    if (id.length < 4) return alert("아이디가 너무 짧습니다.");

    axios
      .get(process.env.REACT_APP_API_URL + "user/id/" + id)
      .then((res) => {
        if (res.data.isSuccess) {
          setCheckId(Check.NOT_DUP);
        }
      })
      .catch(() => {
        setCheckId(Check.DUP);
      });
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
    setCheckEmail(Check.START);
    setEmail(e.target.value);
  };

  const onCheckEmail = async () => {
    if (email.length < 4) return alert("이메일이 너무 짧습니다.");

    axios
      .get(process.env.REACT_APP_API_URL + "user/email/" + email)
      .then((res) => {
        if (res.data.isSuccess) {
          setCheckEmail(Check.NOT_DUP);
        }
      })
      .catch(() => {
        setCheckEmail(Check.DUP);
      });
  };

  const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckNickname(Check.START);
    setNickname(e.target.value);
  };

  const onCheckNickname = async () => {
    if (nickname.length < 4) return alert("닉네임이 너무 짧습니다.");

    axios
      .get(process.env.REACT_APP_API_URL + "user/nickname/" + nickname)
      .then((res) => {
        if (res.data.isSuccess) {
          setCheckNickname(Check.NOT_DUP);
        }
      })
      .catch(() => {
        setCheckNickname(Check.DUP);
      });
  };

  const onSignUp = () => {
    if (checkId !== Check.NOT_DUP) {
      return alert("아이디 중복확인을 해주세요.");
    }
    if (password.length < 4) {
      return alert("비밀번호 길이가 너무 짧습니다.");
    }
    if (password !== checkPassword) {
      return alert("비밀번호를 확인해주세요.");
    }
    if (checkEmail !== Check.NOT_DUP) {
      return alert("이메일 중복확인을 해주세요.");
    }
    if (checkNickname !== Check.NOT_DUP) {
      return alert("닉네임 중복확인을 해주세요.");
    }

    axios
      .post(process.env.REACT_APP_API_URL + "user", {
        user_id: id,
        password,
        email,
        nickname,
      })
      .then(() => {
        navigate("/house");
      })
      .catch(() => {
        return alert("실패!");
      });
  };

  return (
    <div>
      <h1 className="text-4xl pb-4">회원가입</h1>

      <InputComponent
        text="아이디"
        check={checkId}
        input={id}
        onClick={onCheckId}
        onChange={onChangeId}
      />
      <InputPassword text={"비밀번호"} onChange={onChangePassword} />
      <InputPassword text={"비밀번호 확인"} onChange={onChangeCheckPassword} />
      <p className="w-full text-left text-rose-500">{passowrdCheckText()}</p>
      <InputComponent
        text="이메일"
        check={checkEmail}
        input={email}
        onClick={onCheckEmail}
        onChange={onChangeEmail}
      />
      <InputComponent
        text="닉네임"
        check={checkNickname}
        input={nickname}
        onClick={onCheckNickname}
        onChange={onChangeNickname}
      />
      <Button text={"회원가입"} onClick={onSignUp} />
    </div>
  );
}

export default SignUp;
