"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

type Props = {
  type: string;
  repo: string;
};

export const RepoTypeSelect: React.FC<Props> = ({ type, repo }) => {
  const [selectedType, setSelectedType] = useState(type);
  const router = useRouter();
  const onTypeSelected = (type: string) => {
    setSelectedType(type);
    router.push(`/github/${repo}/${type}`);
  };

  return (
    <ul className="menu w-full rounded-lg bg-base-200">
      <li>
        <a
          className={`menu-item ${selectedType === "commits" ? "active" : ""}`}
          onClick={() => onTypeSelected("commits")}
        >
          Commits
        </a>
      </li>
      <li>
        <a
          className={`menu-item ${selectedType === "pulls" ? "active" : ""}`}
          onClick={() => onTypeSelected("pulls")}
        >
          Pulls
        </a>
      </li>
    </ul>
  );
};
