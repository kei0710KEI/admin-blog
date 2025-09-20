import { useState } from "react";

interface TruncatedParagraphProps {
  text: string;
  wordLimit: number;
}

const TruncatedParagraph = ({ text, wordLimit }: TruncatedParagraphProps) => {
  const [isTruncated, setIsTruncated] = useState(true);

  const toggleTruncate = () => {
    setIsTruncated(!isTruncated);
  };

  const truncatedText = isTruncated
    ? text.split(" ").slice(0, wordLimit).join(" ") + "..."
    : text;

  return <p onClick={toggleTruncate}>{truncatedText}</p>;
};

export default TruncatedParagraph;
