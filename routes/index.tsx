/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { Head } from "https://deno.land/x/fresh@1.0.2/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import convert from "https://esm.sh/xml-js";
import GalleryItem from "../components/GalleryItem.tsx";

export interface DeviantArtGalleryItem {
  title: {
    _text: string;
  };
  link: {
    _text: string;
  };
  guid: {
    _attributes: {
      isPermaLink: string;
    };
    _text: string;
  };
  pubDate: {
    _text: string;
  };
  "media:title": {
    _attributes: {
      type: string;
    };
    _text: string;
  };
  "media:keywords": Record<string, unknown>;
  "media:rating": { _text: string };
  "media:category": { _attributes: { label: string }; _text: string };
  "media:credit": [
    { _attributes: Record<string, unknown>; _text: string },
    {
      _attributes: Record<string, unknown>;
      _text: string;
    },
  ];
  "media:copyright": {
    _attributes: { url: string };
    _text: string;
  };
  "media:description": {
    _attributes: { type: string };
    _text: string;
  };
  "media:thumbnail": [
    { _attributes: Record<string, unknown> },
    { _attributes: Record<string, unknown> },
    { _attributes: Record<string, unknown> },
  ];
  "media:content": {
    _attributes: {
      url: string;
      height: string;
      width: string;
      medium: string;
    };
  };
  description: {
    _text: string;
  };
}

export const handler: Handlers<Array<DeviantArtGalleryItem>> = {
  async GET(_, ctx) {
    const resp = await fetch(
      `https://backend.deviantart.com/rss.xml?type=deviation&q=by%3Aemsartgallery22+sort%3Atime+meta%3Aall`,
    );
    const data = JSON.parse(
      convert.xml2json(await resp.text(), { compact: true, spaces: 4 }),
    ).rss.channel.item;
    return ctx.render(data);
  },
};

function Hero() {
  return (
    <section
      class={tw`w-full flex flex-wrap-reverse gap-x-[100px] gap-y-[20px] justify-center items-center`}
    >
      <h1 class={tw`text-center text-5xl lg:text-7xl`}>
        Em's Art Gallery
      </h1>
      <img
        class={tw`rounded-full w-[150px] lg:w-[300px]`}
        src="/hero.jpg"
        alt="em"
      />
    </section>
  );
}

function Gallery(
  { artGalleryItems }: { artGalleryItems: Array<DeviantArtGalleryItem> },
) {
  return (
    <section
      class={tw`w-full flex flex-wrap gap-8 justify-center items-center my-16`}
    >
      {artGalleryItems.map((item) => {
        return <GalleryItem item={item} />;
      })}
    </section>
  );
}

export default function Home(props: PageProps<Array<DeviantArtGalleryItem>>) {
  return (
    <div class={tw`p-4 mx-auto max-w-screen-2xl h-screen`}>
      <Head>
        <title>
          em's art 👩‍🎨
        </title>
        <meta name="description" content="em's art artist page" />
        <link href="/styles.css" rel="stylesheet" />
      </Head>
      <Hero />
      <Gallery artGalleryItems={props.data} />
    </div>
  );
}
