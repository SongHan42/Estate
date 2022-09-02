import React from "react";

type PropsType = {
  text: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

function Button({ text, onClick }: PropsType) {
  return (
    <button onClick={onClick} className="w-full bg-[#8785a2] p-2 text-white">
      {text}
    </button>
  );
}

export default Button;
