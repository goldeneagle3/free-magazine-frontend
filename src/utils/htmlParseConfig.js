import parse from "html-react-parser";

const htmlParseConfig = {
  replace: (domNode) => {
    if (domNode.attribs && domNode.attribs.class === "remove") {
      return <></>;
    }
  },
};

export const parseHtmlText = (text) => {
  return parse(text, htmlParseConfig);
};
