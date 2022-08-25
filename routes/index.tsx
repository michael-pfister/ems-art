/** @jsx h */
import { Fragment, h } from "preact";
import { tw } from "@twind";
import { Head } from "https://deno.land/x/fresh@1.0.2/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import convert from "https://esm.sh/xml-js";
import SlideShow from "../islands/SlideShow.tsx";
import Gallery from "../islands/Gallery.tsx";

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
    {
      _attributes: {
        url: string;
        height: string;
        width: string;
      };
    },
    {
      _attributes: {
        url: string;
        height: string;
        width: string;
      };
    },
    {
      _attributes: {
        url: string;
        height: string;
        width: string;
      };
    },
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
      class={tw`w-full flex flex-wrap-reverse gap-x-[100px] gap-y-[20px] justify-center items-center pt-8 pb-32 lg:pb-40`}
    >
      <div class={`w-full flex justify-center items-center`}>
        <img
          class={tw`w-[400px] lg:w-[600px] absolute -z-10 overflow-hidden`}
          src="/blob.svg"
          alt="artistic blob background"
        />
        <h1
          class={tw`text-center text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl px-8 font-bold`}
        >
          Em's Art Gallery
        </h1>
      </div>
      <img
        class={tw`w-[150px] lg:w-[300px]`}
        src="/abstract-painting.svg"
        alt="em"
      />
    </section>
  );
}

function Slider({ items }: { items: Array<DeviantArtGalleryItem> }) {
  return (
    <section class={tw`h-[400px] lg:h-[600px]`}>
      <SlideShow items={items} />
    </section>
  );
}

function GallerySection(
  { artGalleryItems }: { artGalleryItems: Array<DeviantArtGalleryItem> },
) {
  return (
    <section>
      <Gallery artGalleryItems={artGalleryItems.reverse()} />
    </section>
  );
}

function AboutMe() {
  return (
    <section
      class={tw`w-full flex flex-wrap justify-evenly items-center gap-8 p-8 lg:py-16 ${'bg-light-beige'}`}
    >
      <div class={tw`w-[500px]`}>
        <h1 class={tw`text-4xl mb-8`}>About Em</h1>
        <p>
          If wandered relation no surprise of screened doubtful. Overcame no
          insisted ye of trifling husbands. Might am order hours on found. Or
          dissimilar companions friendship impossible at diminution. Did
          yourself carriage learning she man its replying.

          <br />
          <br />

          Sister piqued living her you enable mrs off spirit really. Parish
          oppose repair is me misery. Quick may saw style after money mrs.
        </p>
      </div>
      <img
        class={tw`w-[250px] md:w-[300px] lg:w-[400px] rounded-full shadow-xl`}
        src="/profile.jpg"
        alt="Em"
      />
    </section>
  );
}

function Contact() {
  return (
    <section class={tw`w-full flex flex-wrap justify-evenly gap-8`}>
      <h1 class={tw`text-4xl`}>make this an email form</h1>
    </section>
  );
}

export default function Home(props: PageProps<Array<DeviantArtGalleryItem>>) {
  return (
    <Fragment>
      <Head>
        <title>
          em's art 👩‍🎨
        </title>
        <meta name="description" content="Em's art artist page and gallery." />
      </Head>
      <Hero />
      <Slider
        items={props.data.sort(function () {
          return 0.5 - Math.random();
        }).slice(0, 3)}
      />{" "}
      {/* first 3 items from shuffeled array */}
      <GallerySection artGalleryItems={props.data} />
      <AboutMe />
      <Contact />
    </Fragment>
  );
}
