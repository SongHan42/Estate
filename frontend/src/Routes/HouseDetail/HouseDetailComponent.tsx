import React from "react";

function HouseDetailComponent() {
  const onChange = (e) => {
    console.log(e.target.value);
  };
  return (
    <div>
      <p>수압이 강한가요?</p>
      <select onChange={onChange}>
        {[1, 2, 3, 4, 5].map((idx) => (
          <option key={idx} value={idx}>
            {idx}
          </option>
        ))}
      </select>
    </div>
  );
}

export default HouseDetailComponent;
