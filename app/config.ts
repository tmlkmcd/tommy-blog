let contentfulSpace;
let contentfulContentTypeBlog;
let contentfulContentTypeCategory;
let contentfulAccessToken;
let contentfulPreviewToken;

try {
  contentfulSpace = process.env.CONTENTFUL_SPACE;
  contentfulContentTypeBlog = process.env.CONTENTFUL_CONTENT_TYPE_BLOG;
  contentfulContentTypeCategory = process.env.CONTENTFUL_CONTENT_TYPE_CATEGORY;
  contentfulAccessToken = process.env.CONTENTFUL_TOKEN;
  contentfulPreviewToken = process.env.CONTENTFUL_PREVIEW_TOKEN;
} catch (err) {}

export const config = {
  contentfulSpace,
  contentfulContentTypeBlog,
  contentfulContentTypeCategory,
  contentfulAccessToken,
  contentfulPreviewToken,
};
