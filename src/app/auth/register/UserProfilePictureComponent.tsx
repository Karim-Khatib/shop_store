"use client";
import { Avatar } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import React, { useCallback, useEffect } from "react";
import UserProfile from "@/assets/UserProfile.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
interface UserProfilePictureComponentProps {
  name?: string;
  value?: File;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function UserProfilePictureComponent({
  name,
  value,
  onChange,
}: UserProfilePictureComponentProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const [ImagePreview, setImagePreview] = React.useState<string | null>();
  // const [file, setFile] = React.useState<File | null>(null);
  const onClickChoseButton = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current?.click();
    }
  }, []);
  // useEffect(() => {
  //   if (!fileInputRef.current?.files?.item(0) && value) {
  //     const dataTransfer = new DataTransfer();
  //     dataTransfer.items.add(value);
  //     if (fileInputRef.current) {
  //       fileInputRef.current.files = dataTransfer.files;
  //     }
  //   }else{
  //     setImagePreview(null);
  //   }
  // }, [fileInputRef.current?.files?.item(0)]);
  useEffect(() => {
    if (value instanceof File) {
      const objectUrl = URL.createObjectURL(value);
      setImagePreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setImagePreview(null);
    }
  }, [value]);
  // const handleFileChange = useCallback(
  //   (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const file = e.target.files?.item(0);

  //     if (file) {
  //       setImagePreview(URL.createObjectURL(file));
  //     } else {
  //       // setFile(null);
  //       setImagePreview(null);
  //     }
  //   },
  //   []
  // );
  //
  useEffect(() => {
    return () => {
      if (ImagePreview) {
        URL.revokeObjectURL(ImagePreview);
      }
    };
  }, []);
  // useEffect(() => {

  //   return () => {
  //     if (ImagePreview) {
  //       URL.revokeObjectURL(ImagePreview);
  //     }
  //     setFile(null);
  //     setImagePreview(null);
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);


  return (
    <div className="flex flex-col items-center gap-4 mb-6">
      <Avatar className="w-32 h-32 border-2">
        <AvatarImage
          className="w-full h-full "
          alt="User Profile Picture"
          src={ImagePreview || UserProfile.src}
        />
      </Avatar>
      <Input
        // value={value}
        name={name}
        type="file"
        ref={fileInputRef}
        onChange={(e) => {
          // handleFileChange(e);
          onChange?.(e);
        }}
        accept=".png,.jpg,.jpeg"
        className="hidden"
      />
      <Button
        type="button"
        className="w-fit"
        onClick={() => {
          onClickChoseButton();
        }}
        variant={"outline"}
      >
        Chose Profile Picture
      </Button>
    </div>
  );
}
