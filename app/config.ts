let contentfulSpace;
let contentfulContentTypeBlog;
let contentfulContentTypeCategory;
let contentfulContentTypeDisplayPic;
let contentfulAccessToken;
let contentfulPreviewToken;

try {
  contentfulSpace = process.env.CONTENTFUL_SPACE;
  contentfulContentTypeBlog = process.env.CONTENTFUL_CONTENT_TYPE_BLOG;
  contentfulContentTypeCategory = process.env.CONTENTFUL_CONTENT_TYPE_CATEGORY;
  contentfulContentTypeDisplayPic =
    process.env.CONTENTFUL_CONTENT_TYPE_DISPLAY_PIC;
  contentfulAccessToken = process.env.CONTENTFUL_TOKEN;
  contentfulPreviewToken = process.env.CONTENTFUL_PREVIEW_TOKEN;
} catch (err) {}

export const config = {
  contentfulSpace,
  contentfulContentTypeBlog,
  contentfulContentTypeCategory,
  contentfulContentTypeDisplayPic,
  contentfulAccessToken,
  contentfulPreviewToken,
};
