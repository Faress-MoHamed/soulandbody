"use client";

import * as React from "react";
import { Search, Check } from "lucide-react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";

export interface SearchOption {
  title: string;
  subTitle?: string;
  Icon: string;
  LinkUrl: string;
}

interface SearchSelectProps {
  placeholder?: string;
  options: SearchOption[];
  value?: string;
  onChange?: (value: string) => void;
  onSelect?: (option: SearchOption) => void;
  className?: string;
}

export function SearchSelect({
  placeholder,
  options,
  value,
  onChange,
  onSelect,
  className,
}: SearchSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");

  const filteredOptions = React.useMemo(() => {
    if (!searchValue) return options;
  
    const searchLower = searchValue.toLowerCase();
    return options.filter((option) => {
      const titleMatch = option.title.toLowerCase().includes(searchLower);
      const subTitleMatch = option.subTitle 
        ? option.subTitle.toLowerCase().includes(searchLower) 
        : false;
      return titleMatch || subTitleMatch;
    });
  }, [options, searchValue]);
  const selectedOption = React.useMemo(
    () => options.find((option) => option.LinkUrl === value),
    [options, value]
  );

  const handleSelect = (option: SearchOption) => {
    onChange?.(option.LinkUrl);
    onSelect?.(option);
    setSearchValue("");
    setOpen(false);
  };

  return (
    <div className="relative text-black lg:block hidden">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "w-full justify-between pr-9 min-w-[360px] h-[46px] max-[720px] rounded-[16px] lg:w-1/3 bg-[#007DFC1A] border-none placeholder:text-black text-left font-normal",
              className
            )}>
            ابحث هنا
            <Search className="absolute right-3 top-3.5 h-4 w-4 text-black" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[360px] p-0">
          <div className="p-2">
            <Input
              placeholder={`Search ...`}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="h-9"
            />
          </div>
          <div className="max-h-[300px] overflow-y-auto">
            {filteredOptions.length === 0 ? (
              <div className="py-6 text-center text-sm text-muted-foreground">
                No results found.
              </div>
            ) : (
              <div className="p-1">
                {filteredOptions.map((option) => (
                  <Link
                    key={option.LinkUrl}
                    href={option.LinkUrl}
                    className={cn(
                      "relative flex items-center gap-3 cursor-pointer select-none rounded-sm px-2 py-2 outline-none hover:bg-accent hover:text-accent-foreground",
                      value === option.LinkUrl &&
                        "bg-accent text-accent-foreground"
                    )}
                    onClick={() => handleSelect(option)}>
                    <div className="flex-shrink-0 h-10 w-10 relative">
                      <Image
                        src={option.Icon || "/placeholder.svg"}
                        alt={option.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium">{option.title}</span>
                      <span className="text-xs text-muted-foreground">
                        {option.subTitle}
                      </span>
                    </div>
                    {value === option.LinkUrl && (
                      <Check className="ml-auto h-4 w-4 flex-shrink-0" />
                    )}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
