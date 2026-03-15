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
      <div className={`bg-foreground rounded-full h-[2px] w-1/2 duration-300 ${isOpen ? "rotate-[225deg] origin-right -translate-x-[12px] -translate-y-[1px]" : ""}`} />
      <div className={`bg-foreground rounded-full h-[2px] w-full duration-300 ${isOpen ? "-rotate-45" : ""}`} />
      <div className={`bg-foreground rounded-full h-[2px] w-1/2 duration-300 place-self-end ${isOpen ? "rotate-[225deg] origin-left translate-x-[12px] translate-y-[1px]" : ""}`} />
    </button>
  );
};

export default Checkbox;