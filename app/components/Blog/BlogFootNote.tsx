import * as React from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";
import { RichText } from "~/components/contentful/RichText";
import { useFootnotes } from "~/components/Blog/FootNoteProvider";

interface Props {
  id: string;
}

interface Handle {
  scroll: () => Promise<void>;
}

export const BlogFootNote: React.FC<Props> = (props) => {
  const footNote = React.useRef<Handle>(null);
  const inTextRef = React.useRef<HTMLButtonElement>(null);

  const note = useFootnotes(props.id);
  if (!note) return null;

  const goBack = () => {
    inTextRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <span>
      <button
        onClick={() => footNote.current?.scroll()}
        ref={inTextRef}
        className=""
      >
        <sup
          className={classNames(
            "duration-3000 text-sapphireSplendour-700 underline transition"
          )}
        >
          {note.index}
        </sup>
      </button>
      <Note goBack={goBack} ref={footNote} index={note.index} {...props}>
        {note && <RichText node={note.text} />}
      </Note>
    </span>
  );
};

const NoteBody: React.ForwardRefRenderFunction<
  Handle,
  React.PropsWithChildren<Props & { goBack: () => void; index: number }>
> = (props, forwardedRef) => {
  const { index, goBack, children } = props;
  const wrapper = React.useRef<HTMLDivElement>(null);
  const [footNoteWrapper, setFootNoteWrapper] = React.useState<HTMLElement>();
  const [showBg, setShowBg] = React.useState(false);

  React.useEffect(() => {
    setFootNoteWrapper(
      () => document.getElementById("footnotes") as HTMLElement
    );
  }, []);

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
        "text-sm",
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
