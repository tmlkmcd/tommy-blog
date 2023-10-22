import classNames from "classnames";
import * as React from "react";
import { ChevronDownIcon } from "~/icons/Chevron";

interface Props {
  onlyAllowOneOpenAtATime?: boolean;
  items: {
    label: React.ReactNode;
    bodyText: React.ReactNode;
    identifier: string;
  }[];
  className?: string;
  onQuestionOpen?: (questionIdentifier: string) => unknown;
}

export const AccordionMenu: React.FC<Props> = ({
  onlyAllowOneOpenAtATime = false,
  items,
  className,
  onQuestionOpen = () => null,
}) => {
  const [open, setOpen] = React.useState<Set<string>>(() => new Set());

  const toggle = (index: number): void => {
    const { identifier } = items[index];
    const startingClosed = !open.has(identifier);
    if (startingClosed) {
      onQuestionOpen(identifier);

      if (onlyAllowOneOpenAtATime) {
        setOpen(new Set([identifier]));
      } else {
        setOpen(new Set([...open, identifier]));
      }
    } else {
      setOpen(new Set([...open].filter((i) => i !== identifier)));
    }
  };

  return (
    <div className={className}>
      {items.map(({ identifier, ...props }, i) => (
        <AccordionItem
          {...props}
          isOpen={open.has(identifier)}
          toggle={() => toggle(i)}
          key={identifier}
        />
      ))}
    </div>
  );
};

const AccordionItem: React.FC<{
  label: React.ReactNode;
  bodyText: React.ReactNode;
  isOpen: boolean;
  toggle: () => void;
}> = ({ label, bodyText, isOpen, toggle }) => {
  return (
    <section
      className={classNames(
        "border-grey-10 flex flex-col border-b p-4 text-left last:border-0",
        isOpen && "bg-grey-3"
      )}
    >
      <button
        onClick={() => toggle()}
        className="flex w-full items-center justify-between text-left"
      >
        {label}
        <span
          className={classNames(
            "p-2 transition duration-300 motion-reduce:transition-none",
            isOpen && "rotate-180"
          )}
        >
          <ChevronDownIcon size="sm" />
        </span>
      </button>
      <div
        className={classNames(
          "overflow-hidden transition-[line-height,opacity,margin] duration-300 motion-reduce:transition-none",
          "text-base",
          isOpen
            ? "mt-2 leading-normal opacity-100"
            : "mt-0 leading-[0] opacity-0"
        )}
      >
        {bodyText}
      </div>
    </section>
  );
};
