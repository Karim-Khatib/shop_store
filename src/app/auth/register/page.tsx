import React from "react";
import RegisterFormComponent from "./RegisterFormComponent";

export default function Register() {
  return (
    <div className="w-full">
      <RegisterFormComponent isFromAdmin={false} />
    </div>
  );
}
