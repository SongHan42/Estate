import React, { useRef } from "react";

type PropsType = {
  imgUrl: string;
  setImgUrl?;
  setImgFile?;
};

function ImgButton({ imgUrl, setImgUrl, setImgFile }: PropsType) {
  const ref = useRef<HTMLInputElement>(null);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImgUrl(URL.createObjectURL(e.target.files[0]));
      setImgFile(e.target.files[0]);
    }
  };

  const onClick = () => {
    if (ref.current) ref.current.click();
  };

  return (
    <div>
      <button>
        <img src={imgUrl} alt="" className="m-auto w-2/4" onClick={onClick} />
        <input
          type="file"
          style={{ display: "none" }}
          ref={ref}
          onChange={onChange}
          accept={"image/png, image/jpeg"}
        />
      </button>
    </div>
  );
}

export default ImgButton;
