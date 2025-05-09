import React from "react";
import Image from "next/image";
import TextTitle from "@/components/ui/TextTitle";
import LoginForm from "./LoginForm";

function LoginPage() {
  return (
    <>
      <Image
        priority={true}
        className="pr-5 pl-5"
        src={"@/assets/BigLogo.png"}
        width={200}
        height={200}
        alt="logo"
      />
      <TextTitle title="Welcome Back" />
      <LoginForm />
    </>
  );
}

export default LoginPage;
