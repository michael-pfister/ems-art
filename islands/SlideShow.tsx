/** @jsx h */
import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import { tw } from "@twind";
import { css } from "twind/css";
import { DeviantArtGalleryItem } from "../routes/index.tsx";

export default function SlideShow(
  { items }: { items: Array<DeviantArtGalleryItem> },
) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let intervalIndex = 0;

    setInterval(() => {
      intervalIndex + 1 === items.length
        ? (intervalIndex = 0)
        : intervalIndex++;
      setIndex(intervalIndex);
    }, 10000);
  }, []);

  return (
    <div
      class={tw`w-full h-full flex flex-wrap justify-center content-center overflow-hidden bg-cover bg-center bg-no-repeat ${
        css({
          "background-image": `url(${
            items[index]["media:content"]._attributes.url
          });`,
          "filter": "brightness(0.2)",
        })
      }`}
    >
    </div>
  );
}
