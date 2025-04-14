"use client";
import { HeroUIProvider } from "@heroui/react";
import React, { useState } from "react";

export default function HeroUiProvider({ children }: any) {

  return <HeroUIProvider >{children}</HeroUIProvider>;
}
