/** @jsx h */
import { h } from "preact";
import { StateUpdater, useEffect, useState } from "preact/hooks";
import { tw } from "@twind";
import { css } from "twind/css";
import { DeviantArtGalleryItem } from "../routes/index.tsx";
import GalleryItem from "../components/GalleryItem.tsx";

export default function Gallery(
  { artGalleryItems }: { artGalleryItems: Array<DeviantArtGalleryItem> },
) {
  const [index, setIndex] = useState(0);
  const [openGalleryItem, setOpenGalleryItem]: [
    DeviantArtGalleryItem | undefined,
    StateUpdater<DeviantArtGalleryItem | undefined>,
  ] = useState();

  if (openGalleryItem) {
    return (
      <div
        class={tw`w-full flex flex-wrap justify-evenly items-center sm:py-16`}
      >
        <img
          class={tw`w-full sm:w-[600px] rounded shadow-2xl`}
          src={openGalleryItem["media:content"]._attributes.url}
          alt={openGalleryItem["media:title"]._text}
        />
        <div class={tw`flex justify-center`}>
          <div class={tw`p-8 max-w-[500px] xl:max-w-[600px] children:mb-8`}>
            <button
              onClick={() => {
                setOpenGalleryItem(undefined);
              }}
              aria-label="return to gallery"
            >
              <img class={tw`w-8`} src="/back.svg" alt="return to gallery" />
            </button>
            <h1 class={tw`text-2xl md:text-3xl xl:text-4xl`}>
              {openGalleryItem["media:title"]._text}
            </h1>
            <p
              dangerouslySetInnerHTML={{
                __html: openGalleryItem["media:description"]._text,
              }}
            />
            <br />
            <a
              class={tw`p-4 ${"bg-dark-brown"} text-white`}
              href={openGalleryItem.link._text}
              target="_blank"
            >
              buy on Deviantart
            </a>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div class={tw`w-full py-16 lg:py-32 flex flex-wrap justify-center`}>
        <div
          class={tw`w-full flex flex-wrap gap-8 justify-center items-center mx-[50px]`}
        >
          {artGalleryItems.slice(index, index + 4).map((item) => {
            return (
              <button
                onClick={() => {
                  setOpenGalleryItem(item);
                }}
                aria-label={`open gallery item ${item["media:title"]._text}`}
              >
                <GalleryItem item={item} />
              </button>
            );
          })}
        </div>
        {artGalleryItems.length > 5 && (
          <div class={tw`mt-16 p-4 flex gap-16`}>
            {index > 4 && (
              <button
                class={tw`p-4 border rounded ${"bg-dark-brown"}`}
                onClick={() => {
                  setIndex(index - 5);
                }}
              >
                <img
                  class={tw`rotate-180 w-8 ${
                    css({ "filter": "invert(100%);" })
                  }`}
                  src="/next.svg"
                  alt="previous 5 artworks"
                />
              </button>
            )}
            {artGalleryItems.length > index + 5 && (
              <button
                class={tw`p-4 border rounded ${"bg-dark-brown"}`}
                onClick={() => {
                  setIndex(index + 5);
                }}
              >
                <img
                  class={tw`w-8 ${css({ "filter": "invert(100%);" })}`}
                  src="/next.svg"
                  alt="next 5 artworks"
                />
              </button>
            )}
          </div>
        )}
      </div>
    );
  }
}
