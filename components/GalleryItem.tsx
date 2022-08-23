/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { DeviantArtGalleryItem } from "../routes/index.tsx";

export default function GalleryItem({ item }: { item: DeviantArtGalleryItem }) {
  return (
    <div
      class={tw`rounded border w-[250px] cursor-pointer shadow` +
        " galleryItem"}
    >
      <img
        class={tw`w-full rounded-t`}
        src={item["media:content"]._attributes.url}
        alt={`artwork called ${item.title._text}`}
      />
      <h2 class={tw`p-2 text-xl`}>{item["media:title"]._text}</h2>
    </div>
  );
}
