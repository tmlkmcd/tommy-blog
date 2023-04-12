import * as React from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";

interface Props {
  index: number;
}

interface Handle {
  scroll: () => Promise<void>;
}

export const FootNote: React.FC<React.PropsWithChildren<Props>> = (props) => {
  const footNote = React.useRef<Handle>(null);
  const inTextRef = React.useRef<HTMLButtonElement>(null);

  return (
    <span>
      <button onClick={() => footNote.current?.scroll()} ref={inTextRef}>
        <sup>{props.index}</sup>
      </button>
      <Note {...props} inTextRef={inTextRef} ref={footNote} />
    </span>
  );
};

const NoteBody: React.ForwardRefRenderFunction<
  Handle,
  React.PropsWithChildren<
    Props & { inTextRef: React.RefObject<HTMLButtonElement> }
  >
> = (props, forwardedRef) => {
  const { index, inTextRef, children } = props;
  const wrapper = React.useRef<HTMLDivElement>(null);
  const [footNoteWrapper, setFootNoteWrapper] = React.useState<HTMLElement>();
  const [showBg, setShowBg] = React.useState(false);

  React.useEffect(() => {
    setFootNoteWrapper(
      () => document.getElementById("footnotes") as HTMLElement
    );
  }, []);

  const goBack = async () => {
    inTextRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scroll = async () => {
    setShowBg(true);
    wrapper.current?.scrollIntoView({ behavior: "smooth" });
    await new Promise((res) => setTimeout(res, 5000));
    setShowBg(false);
  };

  React.useImperativeHandle(forwardedRef, () => ({ scroll }));

  if (!footNoteWrapper) return null;

  return ReactDOM.createPortal(
    <div
      className={classNames(
        "duration-3000 mx-1 flex items-start gap-2 rounded bg-opacity-40 p-1 transition",
        "text-xs",
        showBg && "bg-pasta-100"
      )}
      ref={wrapper}
    >
      <button
        onClick={goBack}
        className="text-iceColdStare-900 hover:text-iceColdStare-800"
      >
        ^{index}
      </button>
      {children}
    </div>,
    footNoteWrapper
  );
};

const Note = React.forwardRef(NoteBody);
