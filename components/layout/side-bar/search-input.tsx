"use client";

import { useEffect, useState } from "react";

import useDebounce from "@/hooks/use-debounce";
import { useSearch } from "@/model/use-search";

import { Input } from "../../ui/input";

export default function SearchInput() {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value, 300);
  const { text, onTextChange } = useSearch((state) => ({
    text: state.text,
    onTextChange: state.onTextChange,
  }));

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value ?? "");
  };

  useEffect(() => {
    onTextChange(debouncedValue);
  }, [debouncedValue, onTextChange]);

  return (
    <div>
      <Input
        type="search"
        placeholder="포스팅 검색"
        value={value}
        autoFocus={false}
        onChange={handleTextChange}
        className="border-2 border-normalColor focus-visible:ring-0 text-pointColor focus-visible:border-pointColor"
      />
      <span className="text-sm">검색어 : {text}</span>
    </div>
  );
}
