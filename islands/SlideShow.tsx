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
          "background-image":
            `linear-gradient(rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.5) 10%, rgba(0,0,0,0.5) 90%, rgba(0,0,0,0.8) 100%), url(${
              items[index]["media:content"]._attributes.url
            });`,
          "text-shadow": "0 0 10px #000",
        })
      }`}
    >
      <h1
        class={tw`text-2xl sm:text-5xl lg:text-7xl xl:text-8xl text-white`}
      >
        {items[index]["media:title"]._text}
      </h1>
    </div>
  );
}
