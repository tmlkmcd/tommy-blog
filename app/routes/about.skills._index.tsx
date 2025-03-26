import * as React from "react";
import { AboutPages, PageName } from "~/Pages";
import type { CoreSkill } from "~/data/contentful/types";
import { type LoaderFunctionArgs, useLoaderData } from "react-router";
import { useRootContext } from "~/RootContext";
import classNames from "classnames";
import { useCascadeAnimate } from "~/hooks/useCascadeAnimate";
import { contentfulClient } from "~/data/contentful/client";
import { getSkills } from "~/data/contentful/about";

export const handle = {
  about: AboutPages.SKILLSET,
};

export const loader: (
  args: LoaderFunctionArgs,
) => Promise<CoreSkill[]> = async ({ context, request }) => {
  const url = new URL(request.url);
  const token =
    url.searchParams.get("cf_token") ??
    (context.cloudflare.env.CONTENTFUL_TOKEN as string) ??
    null;
  const space = context.cloudflare.env.CONTENTFUL_SPACE as string;

  const client = contentfulClient({
    token,
    space,
    isPreview: !!url.searchParams.get("cf_token"),
  });

  const skills = await getSkills({
    client,
  });

  return skills.items.map(({ fields }) => fields);
};

export default function Index() {
  const { pushBreadcrumb } = useRootContext();
  const skills = useLoaderData<typeof loader>() as CoreSkill[];
  const { animating } = useCascadeAnimate({ limit: skills.length });

  React.useEffect(() => {
    pushBreadcrumb(PageName.About, true, true);
    pushBreadcrumb(PageName.AboutPages(handle.about));
  }, [pushBreadcrumb]);

  return (
    <section>
      <article className="grid grid-cols-1 gap-x-4 gap-y-1 lg:grid-cols-2 xl:grid-cols-3">
        {skills.map((skill, index) => (
          <CoreSkillComponent
            skill={skill}
            key={skill.order}
            className={classNames(
              animating <= index &&
                "invisible motion-safe:translate-y-[1.5rem]",
              animating > index &&
                "motion-safe:animate-fade-in-fancy motion-reduce:animate-fade-in",
            )}
          />
        ))}
      </article>
    </section>
  );
}

interface CoreSkillProps {
  skill: CoreSkill;
  className?: string;
}

function CoreSkillComponent({ skill, className }: CoreSkillProps) {
  const [fragment1, fragment2] = getFragmentText(skill.order);
  return (
    <div
      className={classNames(
        "flex flex-col gap-2 border-t-2 bg-opacity-40 px-4 py-2 text-left",
        className,
      )}
    >
      <h2 className="relative mb-4 text-lg font-bold">
        <span
          className={classNames(
            "relative inline-block",
            "before:border-b-red before:h-3 before:w-full before:opacity-30",
            "before:absolute before:bottom-1 before:left-2 before:z-[-1]",
            skill.order === 1 && "before:border-gradient-red",
            skill.order === 2 && "before:border-gradient-yellow",
            skill.order === 3 && "before:border-gradient-green",
            skill.order === 4 && "before:border-gradient-blue",
            skill.order === 5 && "before:border-gradient-purple",
          )}
        >
          {skill.name}
        </span>
      </h2>
      <span className="opacity-60">{fragment1}</span>
      <div className="flex gap-2">
        <div
          className={classNames(
            "mx-2 rounded-full px-0.5 opacity-60",
            skill.order === 1 && "border-gradient-red",
            skill.order === 2 && "border-gradient-yellow",
            skill.order === 3 && "border-gradient-green",
            skill.order === 4 && "border-gradient-blue",
            skill.order === 5 && "border-gradient-purple",
          )}
        />
        <div className="grow py-2">{skill.blurb}</div>
      </div>
      <span className="opacity-60">{fragment2}</span>
    </div>
  );
}

function getFragmentText(index: number): [React.ReactNode, React.ReactNode] {
  switch (index) {
    case 1:
      return ["<React.Fragment>", "</React.Fragment>"];
    case 2:
      return ["func greet() -> Void {", "}"];
    case 3:
      return ["Andante", "fine"];
    case 4:
      return ["<h3>", "</h3>"];
    case 5:
      return ["Say cheese!", "*click*"];
  }

  console.warn("getFragmentText: index not found");
  return ["", ""];
}
