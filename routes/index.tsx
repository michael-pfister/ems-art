/** @jsx h */
import { Fragment, h } from "preact";
import { tw } from "@twind";
import { css } from "twind/css";
import { Head } from "https://deno.land/x/fresh@1.0.2/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import convert from "https://esm.sh/xml-js";
import SlideShow from "../islands/SlideShow.tsx";
import Gallery from "../islands/Gallery.tsx";
import ContactForm from "../islands/ContactForm.tsx";

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
      class={tw`w-full h-[200px] flex flex-wrap-reverse gap-16 justify-center items-center`}
    >
      <h1
        class={tw`w-full text-left text-white text-5xl sm:text-6xl md:text-7xl px-8 font-bold ${
          css({ "text-shadow": "0 0 10px #000;" })
        }`}
      >
        Em's Art Gallery
      </h1>
    </section>
  );
}

function Slider({ items }: { items: Array<DeviantArtGalleryItem> }) {
  return (
    <section class={tw`w-full h-[200px] absolute top-0 -z-20`}>
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
      class={tw`w-full flex flex-wrap justify-evenly items-center gap-8 pr-8 pl-16 py-16 lg:py-32`}
    >
      <div class={tw`w-[500px] border p-8`}>
        <img
          class={tw`w-[75px] lg:w-[100px] rounded-full absolute translate-[-70px] lg:translate-[-90px]`}
          src="/profile.jpg"
          alt="Em"
        />
        <p>
          „ If wandered relation no surprise of screened doubtful. Overcame no
          insisted ye of trifling husbands. Or dissimilar companions friendship
          impossible at diminution. Did yourself carriage learning she man its
          replying. “
        </p>
        <br />
        <p class={tw`w-full text-right text-gray-500`}>
          <i>~ Em</i>
        </p>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section
      class={tw`w-full px-4 py-16 flex flex-wrap justify-evenly items-center gap-8`}
    >
      <div>
        <h1 class={tw`text-4xl mb-6`}>Let's Talk!</h1>
        <p class={tw`max-w-[500px]`}>
          Terminated resolution no am frequently collecting insensible he do
          appearance. Projection invitation affronting admiration if no on or.
        </p>
        <img class={tw`w-full`} src="/full_inbox.svg" alt="mail box" />
      </div>
      <ContactForm />
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
      <header class={tw`${css({"box-shadow": "0 5px 20px 10px rgba(0, 0, 0, 0.5);"})}`}>
        <Hero />
      </header>
      <main>
        <Slider
          items={props.data.sort(function () {
            return 0.5 - Math.random();
          }).slice(0, 3)}
        />{" "}
        {/* first 3 items from shuffeled array */}
        <GallerySection artGalleryItems={props.data} />
        <AboutMe />
        <Contact />
      </main>
      <footer class={tw`border-t text-xl p-8 flex justify-center gap-16`}>
          <a rel="noopener" href="https://www.tiktok.com/@chantistuff" target="_blank">TikTok</a>
          <a rel="noopener" href="https://www.instagram.com/em.laaa/" target="_blank">Instagram</a>
      </footer>
    </Fragment>
  );
}
