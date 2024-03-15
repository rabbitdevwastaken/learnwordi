"use client";
import { useRef } from "react";
import PhonePreview from "../_components/phone-preview";
import { api } from "~/trpc/react";
import html2canvas from "html2canvas";

export default function Wallpaper() {
  const wordsList = api.word.getSelected.useQuery();
  const phoneMockupRef = useRef<HTMLDivElement | null>(null);

  if (!wordsList.data) {
    return <div>Loading...</div>;
  }

  function getScreenshotOfElement(
    element: HTMLElement,
    width?: number,
    height?: number,
  ) {
    return html2canvas(element, {
      width: width,
      height: height,
      useCORS: true,
      allowTaint: false,
    });
  }

  const onDownload = async (element: HTMLElement | null) => {
    if (element) {
      const canvas = await getScreenshotOfElement(element);
      const link = document.createElement("a");
      link.download = "wallpaper.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    }
  };

  const formattedWordsList = wordsList.data.reduce<Word[]>((acc, word) => {
    const existingWord = acc.find((w) => w.name === word.word.name);
    if (existingWord && word.definition.definition) {
      existingWord.definitions.push(word.definition.definition);
    } else {
      acc.push({
        id: word.word.id,
        name: word.word.name,
        definition: word.word.definition,
        definitions: word.definition.definition
          ? [word.definition.definition]
          : [],
        selected: word.word.selected,
      });
    }
    return acc;
  }, []);

  return (
    <div className="mx-auto flex max-w-96 flex-col items-center  gap-4">
      <button
        className="btn btn-primary"
        onClick={() => onDownload(phoneMockupRef.current)}
      >
        Download Wallpaper
      </button>
      <PhonePreview
        selectedWordsList={formattedWordsList}
        imageRef={phoneMockupRef}
      />
    </div>
  );
}
