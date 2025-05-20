import React from "react";

export const SearchInput = ({ search, onChangeText, onPressEnter }) => {
  return (
    <div className="w-[567px] h-[80px]  rounded-[48px] bg-[#FFFFFF] flex justify-start items-center gap-[24px] absolute mb-[1000px] ">
      <i className="fa-solid fa-magnifying-glass text-[24px] ml-[24px] opacity-40"></i>
      <input
        className="text-[20px] font-[700] outline-none w-[450px]"
        type="search"
        value={search}
        placeholder="Search for a city"
        onChange={onChangeText}
        onKeyDown={(e) => {
          onPressEnter(e);
        }}
      ></input>
    </div>
  );
};
