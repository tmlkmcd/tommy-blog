import * as React from "react";
import { CrossIcon } from "~/icons/CrossIcon";
import { useModal } from "~/components/Modal";

export const CONFIRM_MODAL_TAG = "confirm-modal";

interface Props {
  flavour?: "success" | "warning" | "danger";
  headerText: string;
  bodyText: string;
  onConfirm: () => void;
}

export const Confirm: React.FC<Props> = ({
  headerText,
  bodyText,
  onConfirm,
}) => {
  const { popModal } = useModal();
  const die = () => popModal(CONFIRM_MODAL_TAG);

  return (
    <div className="w-full space-y-4">
      <section className="flex items-center gap-2">
        <h1 className="grow text-lg font-bold">{headerText}</h1>
        <button
          onClick={die}
          className="info btn solid sm rounded-full compact"
        >
          <CrossIcon size="sm" />
        </button>
      </section>
      <div className="flex flex-col gap-4">
        <span>{bodyText}</span>
        <section className="flex gap-4">
          <button className="success btn solid flex-1" onClick={onConfirm}>
            Ok
          </button>
          <button className="warn btn flex-1 outline" onClick={die}>
            Cancel
          </button>
        </section>
      </div>
    </div>
  );
};
