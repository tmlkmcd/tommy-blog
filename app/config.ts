let contentfulSpace;
let contentfulContentType;
let contentfulAccessToken;
let contentfulPreviewToken;

try {
  contentfulSpace = process.env.CONTENTFUL_SPACE;
  contentfulContentType = process.env.CONTENTFUL_CONTENT_TYPE;
  contentfulAccessToken = process.env.CONTENTFUL_TOKEN;
  contentfulPreviewToken = process.env.CONTENTFUL_PREVIEW_TOKEN;
} catch (err) {}

export const config = {
  contentfulSpace,
  contentfulContentType,
  contentfulAccessToken,
  contentfulPreviewToken,
};
