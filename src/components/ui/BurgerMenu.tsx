import React from "react";

interface CheckboxProps {
  isOpen: boolean;
  toggle: () => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ isOpen, toggle }) => {
  return (
    <button onClick={toggle} 
        className="flex flex-col gap-2 w-8 lg:hidden"
        aria-label="Toggle mobile menu"
    >
      <div className={`bg-primary rounded-2xl h-[3px] w-1/2 bg-black duration-500 ${isOpen ? "rotate-[225deg] origin-right -translate-x-[12px] -translate-y-[1px]" : ""}`} />
      <div className={`bg-primary rounded-2xl h-[3px] w-full bg-black duration-500 ${isOpen ? "-rotate-45" : ""}`} />
      <div className={`bg-primary rounded-2xl h-[3px] w-1/2 bg-black duration-500 place-self-end ${isOpen ? "rotate-[225deg] origin-left translate-x-[12px] translate-y-[1px]" : ""}`} />
    </button>
  );
};

export default Checkbox;