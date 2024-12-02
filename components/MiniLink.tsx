"use client";

import { Link } from "@/navigation";

export const MiniLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <span
      className={
        "w-fit text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 px-2 rounded transition duration-300 relative"
      }
    >
      <Link href={href} className={"w-fit flex items-start gap-1"}>
        <div>
          <h1
            className={
              "flex flex-col sm:flex-row sm:items-center sm:gap-2 border-b-2"
            }
          >
            <span
              className={
                "flex items-center gap-0.5 font-sans font-bold text-sm"
              }
            >
              {children}
            </span>
          </h1>
        </div>
      </Link>
    </span>
  );
};
