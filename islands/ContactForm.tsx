/** @jsx h */
import emailjs from "https://esm.sh/@emailjs/browser";
import { StateUpdater, useRef, useState } from "preact/hooks";
import { h } from "preact";
import { tw } from "@twind";
import { css } from "twind/css";

type FormState = "initialized" | "loading" | "submitted" | "error";

export default function ContactForm() {
  const form = useRef(null);
  const [formState, setFormState]: [FormState, StateUpdater<FormState>] =
    useState("initialized" as FormState);

  const sendEmail = (e: h.JSX.TargetedEvent<HTMLFormElement, Event>) => {
    e.preventDefault();
    setFormState("loading");

    emailjs.sendForm(
      "service_mnc952z",
      "template_ttibknb",
      form.current as unknown as HTMLFormElement,
      "STSd8sutE3l64jb-o",
    )
      .then(() => {
        setFormState("submitted");
      }).catch(() => {
        setFormState("error");
      });
  };

  return (
    <form
      class={tw`w-[500px] text-xl children:mb-4 children:w-full`}
      ref={form}
      onSubmit={sendEmail}
    >
      <input
        class={tw`p-4 border`}
        type="text"
        placeholder="Full Name"
        name="from_name"
        required
      />
      <br />
      <input
        class={tw`p-4 border`}
        placeholder="Your Email Address"
        type="email"
        name="reply_to"
        required
      />
      <br />
      <textarea
        class={tw`h-40 p-4 border`}
        placeholder="type message here ..."
        name="message"
        required
      />
      <br />
      <button
        class={tw`p-3 flex justify-center text-white cursor-pointer ${
          (() => {
            switch (formState) {
              case "initialized":
              case "loading":
                return "bg-dark-brown";
              case "submitted":
                return "bg-green-700";
              case "error":
                return "bg-red-600";
            }
          })()
        }`}
        type="submit"
        disabled={formState !== "initialized"}
      >
        {(() => {
          switch (formState) {
            case "initialized":
              return "Send";
            case "loading":
              return (
                <img
                  class={tw`w-7 animate-spin ${
                    css({ "filter": "invert(100%);" })
                  }`}
                  src="/loading.svg"
                  alt="loading"
                />
              );
            case "submitted":
              return "Success!";
            case "error":
              return "Oops! Something went wrong.";
          }
        })()}
      </button>
    </form>
  );
}
