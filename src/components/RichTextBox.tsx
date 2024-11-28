import React from "react";

interface RichTextBlock {
  type: string;
  children: Array<RichTextChild>;
  level?: number; // Для заголовков
  format?: string; // Для списков
  image?: {
    url: string;
    alternativeText?: string;
    caption?: string;
  };
}

interface RichTextChild {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
  type?: string;
  url?: string;
  children?: Array<RichTextChild>;
}

interface RichTextProps {
  blocks: RichTextBlock[];
}

const RichTextBox: React.FC<RichTextProps> = ({ blocks }) => {
  const renderChild = (child: RichTextChild, index: number) => {
    if (child.bold) {
      return <strong key={index}>{child.text}</strong>;
    }
    if (child.italic) {
      return <em key={index}>{child.text}</em>;
    }
    if (child.underline) {
      return <u key={index}>{child.text}</u>;
    }
    if (child.strikethrough) {
      return <s key={index}>{child.text}</s>;
    }
    if (child.code) {
      return (
        <code key={index} className="bg-gray-200 px-1 rounded">
          {child.text}
        </code>
      );
    }
    if (child.type === "link") {
      return (
        <a
          key={index}
          href={child.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          {child.children?.map((linkChild, linkChildIndex) =>
            renderChild(linkChild, linkChildIndex)
          )}
        </a>
      );
    }
    return child.text;
  };

  const renderBlock = (block: RichTextBlock, index: number) => {
    switch (block.type) {
      case "paragraph":
        return (
          <p key={index}>
            {block.children.map((child, childIndex) =>
              renderChild(child, childIndex)
            )}
          </p>
        );
      case "heading":
        const HeadingTag = `h${block.level || 1}` as keyof JSX.IntrinsicElements;
        const headingClass =
          block.level === 1
            ? "text-3xl font-bold mt-4 mb-2"
            : block.level === 2
              ? "text-2xl font-semibold mt-3 mb-2"
              : "text-xl font-medium mt-2 mb-2"; // Уровень 3 или ниже
        return (
          <HeadingTag key={index} className={headingClass}>
            {block.children.map((child, childIndex) =>
              renderChild(child, childIndex)
            )}
          </HeadingTag>
        );
      case "list": {
        const ListTag = block.format === "ordered" ? "ol" : "ul"; // Определяем, какой тег использовать
        const listClass =
          block.format === "ordered" ? "list-decimal pl-6 mb-4" : "list-disc pl-6 mb-4"; // Разные классы для маркированного и нумерованного списка

        return (
          <ListTag key={index} className={listClass}>
            {block.children.map((item, itemIndex) => (
              <li key={itemIndex} className="mb-2">
                {item.children.map((child, childIndex) =>
                  renderChild(child, childIndex)
                )}
              </li>
            ))}
          </ListTag>
        );
      }

      case "quote":
        return (
          <blockquote key={index}>
            {block.children.map((child, childIndex) =>
              renderChild(child, childIndex)
            )}
          </blockquote>
        );
      case "code":
        return (
          <pre key={index} className="bg-gray-100 p-4 rounded">
            <code>{block.children.map((child) => child.text).join("")}</code>
          </pre>
        );
      case "image":
        return (
          <div key={index} className="my-4">
            <img
              src={block.image?.url || ""}
              alt={block.image?.alternativeText || ""}
              className="rounded-lg"
              style={{ maxWidth: "100%" }}
            />
            {block.image?.caption && (
              <p className="text-sm text-gray-600 mt-2">{block.image.caption}</p>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return <>{blocks.map((block, index) => renderBlock(block, index))}</>;
};

export default RichTextBox;
