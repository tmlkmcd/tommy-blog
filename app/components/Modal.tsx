import * as React from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";

type ModalWindow = {
  element: React.ReactNode;
  tag: string;
  isDismissing?: boolean;
};

interface ModalContext {
  addModal: (modal: ModalWindow) => void;
  popModal: (tag?: string) => void;
}

const Context = React.createContext<ModalContext | null>(null);

const ANIMATION_DURATION = 300;

export const ModalProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [modals, setModals] = React.useState<ModalWindow[]>([]);

  const addModal = React.useCallback((modal: ModalWindow) => {
    setModals((prev) => [...prev, modal]);
  }, []);

  const popModal = React.useCallback(
    async (tag?: string) => {
      const modalToRemove = tag
        ? modals.find((modal) => modal.tag === tag)
        : modals[modals.length - 1];

      if (!modalToRemove) return;

      await removeModal(modalToRemove);

      setModals((currentModals) => {
        return currentModals.filter(({ tag }) => tag !== modalToRemove.tag);
      });
    },
    [modals]
  );

  const removeModal = (modal: ModalWindow) => {
    setModals((currentModals) => {
      return currentModals.map((existingModal) => {
        if (existingModal.tag === modal.tag) {
          return {
            ...modal,
            isDismissing: true,
          };
        }
        return existingModal;
      });
    });
    return new Promise((res) => {
      setTimeout(res, ANIMATION_DURATION);
    });
  };

  const value = {
    addModal,
    popModal,
  };

  return (
    <Context.Provider value={value}>
      {children}
      {modals.map(({ isDismissing, tag, element }) => (
        <ModalComponent
          isDismissing={isDismissing}
          key={tag}
          onDismiss={() => popModal(tag)}
        >
          {element}
        </ModalComponent>
      ))}
    </Context.Provider>
  );
};

const ModalComponent: React.FC<
  React.PropsWithChildren<{ isDismissing?: boolean; onDismiss: () => void }>
> = ({ isDismissing = false, onDismiss, children }) => {
  return ReactDOM.createPortal(
    <div
      className={classNames(
        "fixed top-0 left-0 z-50 flex h-screen h-full w-screen items-center justify-center overflow-auto bg-black bg-opacity-60",
        isDismissing ? "animate-fade-out" : "animate-fade-in"
      )}
    >
      <button
        className="absolute top-0 left-0 z-50 m-0 h-screen w-screen p-4 p-0"
        onClick={onDismiss}
      />
      <div
        className="z-[51] max-h-[80%] w-min max-w-[80%] cursor-default rounded-2xl bg-white object-contain p-4"
        onClick={(ev) => ev.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.getElementById("modal-root") as HTMLElement
  );
};

export const useModal = () => {
  const context = React.useContext(Context);

  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }

  return context;
};
