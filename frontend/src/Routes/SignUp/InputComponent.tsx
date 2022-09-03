import React from "react";
import Button from "../../Components/Button";
import { Check } from "./SignUp";

type PropsType = {
  text: string;
  check: Check;
  input: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

function InputComponent({ text, check, input, onClick, onChange }: PropsType) {
  const checkText = () => {
    if (input.length < 4) return `${text}가 너무 짧습니다`;
    if (check === Check.START) return "중복 체크를 해주세요";
    else if (check === Check.DUP) return `중복된 ${text}입니다.`;
    else return `사용 가능한 ${text}입니다.`;
  };
  return (
    <div className="w-full">
      <p className="text-xl pb-2">{text}</p>
      <div className="flex place-content-between">
        <input className="bg-[#d9d9d9] w-72" onChange={onChange}></input>
        <div className="right-0">
          <Button onClick={onClick} text="중복확인" />
        </div>
      </div>
      <p className="text-rose-500">{checkText()}</p>
    </div>
  );
}

export default InputComponent;
