const fontSize = {
  "4xl": "26px",
  "3xl": "24px",
  "2xl": "20px",
  xl: "18px",
  lg: "16px",
  md: "14px",
  sm: "12px",
  xs: "10px",
};

const fontWeight = {
  bold: 700,
  semiBold: 600,
  medium: 400,
};

export const semanticFontSize = {
  "top-headline-b": [
    fontSize["4xl"],
    { fontWeight: fontWeight["bold"], lineHeight: "32px" },
  ],
  "top-headline-sb": [
    fontSize["4xl"],
    { fontWeight: fontWeight["semiBold"], lineHeight: "32px" },
  ],
  "headline-b": [
    fontSize["3xl"],
    { fontWeight: fontWeight["bold"], lineHeight: "28px" },
  ],
  "headline-sb": [
    fontSize["3xl"],
    { fontWeight: fontWeight["semiBold"], lineHeight: "28px" },
  ],
  "sub-headline-b": [
    fontSize["2xl"],
    { fontWeight: fontWeight["bold"], lineHeight: "26px" },
  ],
  "sub-headline-sb": [
    fontSize["2xl"],
    { fontWeight: fontWeight["semiBold"], lineHeight: "26px" },
  ],
  "title-b": [
    fontSize["xl"],
    { fontWeight: fontWeight["bold"], lineHeight: "24px" },
  ],
  "title-sb": [
    fontSize["xl"],
    { fontWeight: fontWeight["semiBold"], lineHeight: "24px" },
  ],
  "semi-title-b": [
    fontSize["lg"],
    { fontWeight: fontWeight["bold"], lineHeight: "22px" },
  ],
  "semi-title-sb": [
    fontSize["lg"],
    { fontWeight: fontWeight["semiBold"], lineHeight: "22px" },
  ],
  "body-b": [
    fontSize["md"],
    { fontWeight: fontWeight["bold"], lineHeight: "18px" },
  ],
  "body-sb": [
    fontSize["md"],
    { fontWeight: fontWeight["semiBold"], lineHeight: "18px" },
  ],
  "body-m": [
    fontSize["md"],
    { fontWeight: fontWeight["medium"], lineHeight: "18px" },
  ],
  "body-r": [
    fontSize["md"],
    { fontWeight: fontWeight["medium"], lineHeight: "18px" },
  ],
  "caption-b": [
    fontSize["sm"],
    { fontWeight: fontWeight["bold"], lineHeight: "16px" },
  ],
  "caption-sb": [
    fontSize["sm"],
    { fontWeight: fontWeight["semiBold"], lineHeight: "16px" },
  ],
  "caption-m": [
    fontSize["sm"],
    { fontWeight: fontWeight["medium"], lineHeight: "16px" },
  ],
  "caption-r": [
    fontSize["sm"],
    { fontWeight: fontWeight["medium"], lineHeight: "16px" },
  ],
  "sub-caption": [
    fontSize["xs"],
    { fontWeight: fontWeight["medium"], lineHeight: "14px" },
  ],
  "korean-body-m": [
    fontSize["md"],
    { fontWeight: fontWeight["medium"], lineHeight: "18px" },
  ],
  "korean-caption-m": [
    fontSize["sm"],
    { fontWeight: fontWeight["medium"], lineHeight: "16px" },
  ],
};
