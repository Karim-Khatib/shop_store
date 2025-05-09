"use client";
import React, { useCallback, useState } from "react";
import { Input } from "../../components/ui/input";
import SearchIconComponent from "@/navbar/SearchIconComponent";
import { useRouter, useSearchParams } from "next/navigation";

export default function DashboardTableHeader({
  children,
  currentValue,
}: Readonly<{
  children?: React.ReactNode;
  currentValue?: string;
}>) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(currentValue??"");
  const handleSearch = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("search", search);
    router.push(`?${params.toString()}`);
  }, [search,router,searchParams]);
  return (
    <div className="flex flex-row gap-1.5 items-center">
      <Input
        className="w-2xs bg-neutral-50 rounded-[4px]"
        placeholder="Search By name and Email"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <SearchIconComponent onClick={handleSearch} className="hover:pointer-coarse hover:shadow-neutral-400" />
      {children}
    </div>
  );
}
