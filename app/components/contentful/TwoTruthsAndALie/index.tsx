import * as React from "react";
import type { TruthAndLie } from "~/components/contentful/types";
import classNames from "classnames";
import { useCascadeAnimate } from "~/hooks/useCascadeAnimate";

interface Props {
  truthsAndLies: TruthAndLie[];
}

export const TwoTruthsAndALie: React.FC<Props> = ({ truthsAndLies }) => {
  const { animating } = useCascadeAnimate({ limit: 3 });

  return (
    <section>
      <h2>Two Truths and a Lie</h2>
      <section className="flex flex-col items-stretch gap-6 pt-2 md:flex-row">
        {truthsAndLies.map((truthAndLie, i) => (
          <Item
            key={truthAndLie.detail}
            truthAndLie={truthAndLie}
            fadeIn={animating > i}
          />
        ))}
      </section>
    </section>
  );
};

function Item({
  truthAndLie,
  fadeIn,
}: {
  truthAndLie: TruthAndLie;
  fadeIn: boolean;
}) {
  return (
    <button
      className={classNames(
        fadeIn
          ? "animate-slide-in-side-fancy"
          : "invisible translate-y-[1.5rem]",
        "flex flex-1 items-stretch rounded-xl bg-transparent transition",
        "flipCard-wrapper"
      )}
    >
      <div className="flipCard-inner-wrapper">
        <p className="flex items-center justify-center rounded-xl bg-pasta-200 p-4 text-lg opacity-80 shadow-casual">
          <span>{truthAndLie.detail}</span>
        </p>
        <p
          className={classNames(
            "flex flex-col items-center justify-center gap-4 rounded-xl p-4 opacity-80 shadow-casual",
            truthAndLie.isReal ? "bg-lightMint-500" : "bg-danger-400"
          )}
        >
          <span className="text-xl font-bold">
            {truthAndLie.isReal ? "True" : "False"}!
          </span>
          <span>{truthAndLie.explanation}</span>
        </p>
      </div>
    </button>
  );
}
