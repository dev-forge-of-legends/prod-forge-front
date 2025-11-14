import React from "react";

interface Props {
  title: string;
  right?: React.ReactNode;
  children: React.ReactNode;
  titleClassName?: string;
  bodyClassName?: string;
  headerDivider?: boolean;
}

export const Panel: React.FC<Props> = ({
  title,
  right,
  children,
  titleClassName,
}) => (
  <section className="rounded-2xl h-full flex flex-col glass-border p-6 ">
    <header className="flex items-center justify-between py-2 rounded-t-2xl ">
      <h3
        className={`text-[18px] sm:[font-size:var(--size-heading)]  font-vastagoSemiBold leading-none text-white truncate ${
          titleClassName || ""
        }`}
      >
        {title}
      </h3>
      {right}
    </header>
    <div className="rounded-b-2xl flex-1 ">{children}</div>
  </section>
);
