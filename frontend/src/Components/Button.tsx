import React from "react";

function Button({ text }: { text: string }) {
  return <button className="w-full bg-[#8785a2] p-2">{text}</button>;
}

export default Button;
