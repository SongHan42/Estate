import React from "react";

type PropsType = {
  text: string;
  style?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

function PinkButton({ style, text, onClick }: PropsType) {
  return (
    <button
      onClick={onClick}
      className={
        "rounded-3xl bg-[#FFE2E2] p-2 text-[#6B6B6B] rounded-lg" + style
      }
    >
      <p className="mx-5">{text}</p>
    </button>
  );
}

export default PinkButton;
