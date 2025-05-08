import React from "react";
interface DangerTextProps {
  text: string|string[];
}
export default function DangerText({text}:DangerTextProps) {
  return <p className="text-red-500 text-[10px]">{text}</p>;
}
