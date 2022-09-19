import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import InputComponent from "../SignUp/InputComponent";
import Button from "../../Components/Button";
import InputPassword from "../SignUp/InputPassword";
import { customAxios } from "../../function/customAxios";

export enum Check {
  START,
  DUP,
  NOT_DUP,
}

function User() {
  const [nickname, setNickname] = useState("");
  const [newNickname, setNewNickname] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [checkNickname, setCheckNickname] = useState<Check>(Check.START);
  const [checkPassword, setCheckPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    customAxios.get("user").then((res) => {
      setNickname(res.data.nickname);
    });
  }, []);

  const onChangeNewNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckNickname(Check.START);
    setNewNickname(e.target.value);
  };

  const onChangeNewPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const onCheckNewNickname = async () => {
    if (newNickname.length < 4) return alert("닉네임이 너무 짧습니다.");

    axios
      .get(process.env.REACT_APP_API_URL + "user/nickname/" + newNickname)
      .then((res) => {
        if (res.data.isSuccess) {
          setCheckNickname(Check.NOT_DUP);
        }
      })
      .catch(() => {
        setCheckNickname(Check.DUP);
      });
  };

  const onChangeCheckPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckPassword(e.target.value);
  };

  const passowrdCheckText = () => {
    if (newPassword && newPassword.length < 4) {
      return "비밀번호가 너무 짧습니다.";
    }
    if (newPassword !== checkPassword) {
      return "비밀번호가 일치하지 않습니다.";
    }
    return "사용가능한 비밀번호입니다.";
  };

  const onClickUpdateUser = () => {
    if (checkNickname !== Check.NOT_DUP && checkNickname) {
      return alert("닉네임 중복 확인을 해주세요.");
    }
    if (newPassword && newPassword.length < 4) {
      return alert("비밀번호 길이가 너무 짧습니다.");
    }
    if (newPassword !== checkPassword) {
      return alert("비밀번호를 확인해주세요.");
    }

    customAxios
      .patch(process.env.REACT_APP_API_URL + "user", {
        newPassword,
        newNickname,
      })
      .then(() => {
        navigate("/"); //팝업띄우고 houselist로 가면 좋을듯?
      })
      .catch(() => {
        setCheckNickname(Check.START);
        return alert("중복 확인을 다시 해주세요!");
      });
  };

  return (
    <div>
      <h1 className="text-3xl mb-5">회원정보 수정</h1>
      <InputComponent
        text="닉네임"
        placeholder={nickname}
        check={checkNickname}
        input={newNickname}
        onClick={onCheckNewNickname}
        onChange={onChangeNewNickname}
      />
      <InputPassword text={"비밀번호"} onChange={onChangeNewPassword} />
      <InputPassword text={"비밀번호 확인"} onChange={onChangeCheckPassword} />
      <p className="w-full text-left text-rose-500">{passowrdCheckText()}</p>
      <Button text={"수정완료"} onClick={onClickUpdateUser} />
    </div>
  );
}

export default User;
