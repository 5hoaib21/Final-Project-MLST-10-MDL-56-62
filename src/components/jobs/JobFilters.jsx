"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Select, Label, ListBox, TextField, InputGroup } from "@heroui/react";
import { Magnifier, Briefcase } from "@gravity-ui/icons";
import { FaLaptopCode } from "react-icons/fa";

export default function JobFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // বর্তমান URL থেকে ফিল্টারের ভ্যালুগুলো রিড করা
  const currentSearch = searchParams.get("search") || "";
  const currentType = searchParams.get("type") || "";
  const currentWorkplace = searchParams.get("workplace") || "all";

  // URL আপডেট করার ফাংশন
  const updateFilter = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="w-full max-w-7xl mx-auto mb-10 bg-[#121214] border border-zinc-800/50 p-4 rounded-[24px] flex flex-col md:flex-row items-end gap-4 shadow-xl">
      {/* ১. সার্চ টেক্সট ফিল্ড */}
      <div className="w-full md:flex-1">
        <TextField className="w-full">
          <Label className="text-zinc-400 text-xs font-medium mb-1.5 block px-1">
            Search Jobs
          </Label>
          <InputGroup className="bg-[#19191D] border border-zinc-800 rounded-xl focus-within:border-purple-500 transition-colors h-11 flex items-center">
            <InputGroup.Prefix className="pl-3.5 pr-1 flex items-center justify-center">
              <Magnifier className="w-4 h-4 text-zinc-500" />
            </InputGroup.Prefix>
            <InputGroup.Input
              value={currentSearch}
              placeholder="Search title, company or keywords..."
              className="bg-transparent text-zinc-100 text-sm placeholder-zinc-600 focus:outline-none w-full h-full px-2"
              onChange={(e) => updateFilter("search", e.target.value)}
            />
          </InputGroup>
        </TextField>
      </div>

      {/* ২. জব টাইপ ফিল্টার */}
      <div className="w-full md:w-[220px]">
        <Select
          onSelectionChange={(key) => updateFilter("type", key)}
          selectedKey={currentType}
        >
          <Label className="text-zinc-400 text-xs font-medium mb-1.5 block px-1">
            Job Type
          </Label>
          <Select.Trigger className="w-full bg-[#19191D] border border-zinc-800 rounded-xl text-zinc-200 text-sm h-11 px-3.5 flex items-center justify-between hover:border-zinc-700 transition-colors cursor-pointer">
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-purple-400" />
              <Select.Value placeholder="All Types" />
            </div>
            <Select.Indicator className="text-zinc-500 text-xs" />
          </Select.Trigger>
          <Select.Popover className="bg-[#19191D] border border-zinc-800 rounded-xl shadow-2xl mt-1 overflow-hidden min-w-[220px]">
            <ListBox className="p-1 text-zinc-200">
              <ListBox.Item
                id=""
                className="px-3 py-2 text-sm rounded-lg hover:bg-zinc-800 cursor-pointer flex items-center justify-between"
              >
                <Label className="cursor-pointer">All Types</Label>
              </ListBox.Item>
              <ListBox.Item
                id="full-time"
                className="px-3 py-2 text-sm rounded-lg hover:bg-zinc-800 cursor-pointer flex items-center justify-between"
              >
                <Label className="cursor-pointer">Full-Time</Label>
              </ListBox.Item>
              
              <ListBox.Item
                id="part-time"
                className="px-3 py-2 text-sm rounded-lg hover:bg-zinc-800 cursor-pointer flex items-center justify-between"
              >
                <Label className="cursor-pointer">Part-Time</Label>
              </ListBox.Item>

              {/* 👈 এখানে কন্ট্যাক্ট অপশনটি সুন্দরভাবে যোগ করে দেওয়া হলো */}
              <ListBox.Item
                id="contract"
                className="px-3 py-2 text-sm rounded-lg hover:bg-zinc-800 cursor-pointer flex items-center justify-between"
              >
                <Label className="cursor-pointer">Contract</Label>
              </ListBox.Item>
            </ListBox>
          </Select.Popover>
        </Select>
      </div>

      {/* ৩. ওয়ার্কপ্লেস মোড ফিল্টার */}
      <div className="w-full md:w-[220px]">
        <Select
          onSelectionChange={(key) => updateFilter("workplace", key)}
          selectedKey={currentWorkplace}
        >
          <Label className="text-zinc-400 text-xs font-medium mb-1.5 block px-1">
            Workplace
          </Label>
          <Select.Trigger className="w-full bg-[#19191D] border border-zinc-800 rounded-xl text-zinc-200 text-sm h-11 px-3.5 flex items-center justify-between hover:border-zinc-700 transition-colors cursor-pointer">
            <div className="flex items-center gap-2">
              <FaLaptopCode className="w-4 h-4 text-purple-400" />
              <Select.Value placeholder="All Modes" />
            </div>
            <Select.Indicator className="text-zinc-500 text-xs" />
          </Select.Trigger>
          <Select.Popover className="bg-[#19191D] border border-zinc-800 rounded-xl shadow-2xl mt-1 overflow-hidden min-w-[220px]">
            <ListBox className="p-1 text-zinc-200">
              <ListBox.Item
                id="all"
                className="px-3 py-2 text-sm rounded-lg hover:bg-zinc-800 cursor-pointer flex items-center justify-between"
              >
                <Label className="cursor-pointer">All Modes</Label>
              </ListBox.Item>
              <ListBox.Item
                id="remote"
                className="px-3 py-2 text-sm rounded-lg hover:bg-zinc-800 cursor-pointer flex items-center justify-between"
              >
                <Label className="cursor-pointer">Remote</Label>
              </ListBox.Item>
              <ListBox.Item
                id="onsite"
                className="px-3 py-2 text-sm rounded-lg hover:bg-zinc-800 cursor-pointer flex items-center justify-between"
              >
                <Label className="cursor-pointer">On-site</Label>
              </ListBox.Item>
            </ListBox>
          </Select.Popover>
        </Select>
      </div>
    </div>
  );
}