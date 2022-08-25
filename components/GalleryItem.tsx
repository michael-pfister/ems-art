/** @jsx h */
import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import { tw } from "@twind";
import { css } from "twind/css";
import { DeviantArtGalleryItem } from "../routes/index.tsx";
import { DOMParser } from "https://esm.sh/@xmldom/xmldom";

export default function GalleryItem({ item }: { item: DeviantArtGalleryItem }) {
  return (
    <img
      class={tw`rounded shadow-2xl ${
        css({
          "transition": "0.2s ease-in-out",
          "&:hover": { "transform": "scale(1.05)" },
        })
      }`}
      src={item["media:thumbnail"][2]._attributes.url}
      alt={`artwork called ${item.title._text}`}
    />
  );
}
