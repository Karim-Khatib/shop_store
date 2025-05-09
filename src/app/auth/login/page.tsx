import React from "react";
import PageLogo from "@/assets/BigLogo.png";
import Image from "next/image";
import TextTitle from "@/components/ui/TextTitle";
import LoginForm from "./LoginForm";

function LoginPage() {
  return (
    <>
      <Image
        priority={true}
        className="pr-5 pl-5"
        src={PageLogo}
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
