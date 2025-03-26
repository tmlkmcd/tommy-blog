import * as React from "react";
import classNames from "classnames";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const TextInput: React.FC<Props> = ({ label, ...props }) => {
  const id = React.useId();
  return (
    <label htmlFor={id} className="relative mx-5 inline-block">
      <input
        id={id}
        placeholder=" "
        className="peer success input bg-white p-2"
        {...props}
      />
      <span
        className={classNames(
          "pointer-events-none absolute bottom-0 left-0 top-0 flex items-center rounded p-2 opacity-50 transition-all duration-300",
          "peer-focus:-translate-x-0.5 peer-focus:-translate-y-3/4 peer-focus:scale-90 peer-focus:opacity-100"
        )}
      >
        {label}
      </span>
    </label>
  );
};
