import type {
  Asset,
  Entry,
  RichTextContent,
  EntryFields,
  Sys,
} from "contentful";

export type ImageAsset = {
  caption: string;
  picture: Asset;
  imageType: string;
  imageTag: string;
};

export function isFootnote(
  content: EntryFields.RichText | RichTextContent
): boolean {
  return (
    ((content as RichTextContent).data.target?.sys as unknown as Sys)
      ?.contentType?.sys.id === "footnote"
  );
}

export function isInternalLink(
  content: EntryFields.RichText | RichTextContent
): boolean {
  return (
    ((content as RichTextContent).data.target?.sys as unknown as Sys)
      ?.contentType?.sys.id === "internalLink"
  );
}

export function isGhGist(
  content: EntryFields.RichText | RichTextContent
): boolean {
  return (
    ((content as RichTextContent).data.target?.sys as unknown as Sys)
      ?.contentType?.sys.id === "githubGist"
  );
}

export interface Banner {
  header: string;
  subtitle?: string;
  link?: string;
  images: Asset[];
  isInternal: boolean;
  imageAlignment: "Top" | "Bottom" | "Left" | "Right";
}

export interface BlogPost {
  id: number;
  title: string;
  blurb: string;
  slug: string;
  published: string;
  categories: Entry<Category>[];
  post: EntryFields.RichText;
  image: Asset;
  bannerImage: Asset;
  series?: Entry<Series>;
}

export interface ExtendedBlogPost extends BlogPost {
  updated?: string;
  footnotes?: string[];
}

export interface Category {
  id: number;
  name: string;
  image: Asset;
}

export interface Footnote {
  title: string;
  text: EntryFields.RichText;
  index?: number;
}

export interface InternalLink {
  inlineText: string;
  name: string;
  to?: string;
  blogPostReference?: Entry<BlogPost>;
}

export interface Paragraph {
  identifier: string;
  text: EntryFields.RichText;
  title: string;
}

export interface GithubGist {
  title: string;
  id: string;
  isBigCode: boolean;
  tooltip?: string;
}

export interface Series {
  name: string;
  description: string;
  numberOfPosts: number;
  slug: string;
  image: Asset;
}

export enum SkillCategory {
  FRONT_END = "Front End",
  BACK_END = "Back End",
  WEB_DEVELOPMENT = "Web Development",
  MOBILE_DEVELOPMENT = "Mobile Development",
  CLOUD_COMPUTING = "Cloud Computing",
  PROGRAMMING = "Programming",
  DATABASES = "Databases",
}

export interface CoreSkill {
  name: string;
  rating: number;
  skillCategory: SkillCategory;
}

export interface TruthAndLie {
  isReal: boolean;
  detail: string;
  explanation: string;
}

export interface Faq {
  question: string;
  answer: string;
}
