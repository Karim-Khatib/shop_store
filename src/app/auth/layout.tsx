import React from "react";

export default function layout({ children }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <div className="w-screen h-full flex flex-row justify-center bg-neutral-100">
      <div className="flex flex-col w-96 min-h-screen h-full shadow-lg bg-neutral-0 items-center p-10">
        {children}
      </div>
    </div>
  );
}
