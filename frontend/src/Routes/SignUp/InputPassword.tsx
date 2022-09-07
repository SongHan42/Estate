import React from "react";

type PropsType = {
  text: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

function InputPassword({ text, onChange }: PropsType) {
  const checkText = () => {
    return "";
  };
  return (
    <div className="w-full mt-2">
      <p className="text-xl pb-2">{text}</p>
      <div className="flex place-content-between">
        <input
          type="password"
          className="bg-[#d9d9d9] w-72 p-2"
          onChange={onChange}
        ></input>
      </div>
      <p className="text-rose-500">{checkText()}</p>
    </div>
  );
}

export default InputPassword;
