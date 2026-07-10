"use client";

import { SectionTitle } from "@/components/ui/section";
import { useState } from "react";

export function HomeTitle() {
  const [time] = useState(new Date().getHours());

  const title =
    time >= 17
      ? "Good Evening"
      : time >= 12
        ? "Good Afternoon"
        : time >= 6
          ? "Good Morning"
          : "Late night?";

  return <SectionTitle>{title}</SectionTitle>;
}
