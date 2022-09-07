import React from "react";

type PropsType = {
  text: string;
  style?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

function Button({ style, text, onClick }: PropsType) {
  return (
    <button
      onClick={onClick}
      className={"w-full bg-[#8785a2] p-2 text-white " + style}
    >
      {text}
    </button>
  );
}

export default Button;
