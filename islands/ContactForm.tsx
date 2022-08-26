/** @jsx h */
import emailjs from 'https://esm.sh/@emailjs/browser';
import { useRef } from "preact/hooks";
import { h } from "preact";
import { tw } from "@twind";

export default function ContactForm() {
    const form = useRef(null);

    const sendEmail = (e: h.JSX.TargetedEvent<HTMLFormElement, Event>) => {
        e.preventDefault();

        emailjs.sendForm('service_mnc952z', 'template_ttibknb', form.current as unknown as HTMLFormElement, 'STSd8sutE3l64jb-o')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
    };

    return (
        <form class={tw`w-[500px] text-xl children:mb-4 children:w-full`} ref={form} onSubmit={sendEmail}>
            <input class={tw`p-4 border`} type="text" placeholder="Full Name" id="from_name" name="from_name" required/>
            <br />
            <input class={tw`p-4 border`} placeholder="Your Email Address" type="email" id="reply_to" name="reply_to" required/>
            <br />
            <textarea class={tw`h-40 p-4 border`} placeholder="type message here ..." id="message" name="message" required/>
            <br />
            <input class={tw`p-3 text-white cursor-pointer ${'bg-dark-brown'}`} type="submit" value="Send" />
        </form>
    );
}