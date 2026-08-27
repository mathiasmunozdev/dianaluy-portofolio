"use client";

import Image from "next/image";
import { MarqueeBand } from "@/components/marquee-band";
import { useLocale } from "@/components/locale-provider";
import { profile } from "@/content/profile";

export function Footer() {
  const { t } = useLocale();
  const { contact } = profile;

  return (
    <footer id="contacto">
      <div className="relative mx-3 h-[600px] overflow-hidden rounded-lg bg-secondary sm:mx-band sm:h-[650px] lg:h-[756px]">
        {/* Escenario fijo de 1878px centrado, como en el hero */}
        <div className="absolute left-1/2 top-0 h-full w-full -translate-x-1/2 lg:w-[1878px]">
          <Image
            src="/images/decor/band-blobs-footer.svg"
            alt=""
            width={1878}
            height={756}
            className="absolute inset-0 size-full object-cover"
          />

          <p className="relative px-5 pt-24 text-center font-display text-[48px] font-bold leading-[0.98] tracking-[-1.5px] sm:pt-28 sm:text-[62px] lg:pt-[180px] lg:text-display lg:leading-[90px] lg:tracking-[-2.5703px]">
            {t.footer.thanksLine1}
            <br />
            {t.footer.thanksLine2}
          </p>

          <Image
            src="/icons/flower.svg"
            alt=""
            width={96}
            height={96}
            className="absolute left-[10%] top-[255px] size-14 sm:left-[18%] sm:top-[285px] sm:size-20 lg:left-[545px] lg:top-[301px] lg:size-24"
          />
          <Image
            src="/icons/sparkle-footer.svg"
            alt=""
            width={54}
            height={54}
            className="absolute right-[12%] top-[275px] size-9 sm:right-[20%] sm:top-[315px] sm:size-12 lg:left-[calc(50%+271px)] lg:right-auto lg:top-[353px] lg:size-[54px]"
          />

          <ul className="absolute inset-x-0 top-[355px] flex flex-col items-center justify-center gap-3 px-5 font-body text-[15px] sm:top-[405px] sm:text-base lg:top-[465px] lg:flex-row lg:px-0 lg:text-contact">
            <li className="flex min-h-11 w-full max-w-[340px] items-center justify-center gap-2 rounded-full bg-white/85 px-4 lg:h-10 lg:min-h-0 lg:w-auto">
              <Image src="/icons/phone.png" alt="" width={16} height={16} />
              <a href={contact.whatsapp} target="_blank" rel="noreferrer" className="underline">
                {contact.phoneDisplay}
              </a>
            </li>
            <li className="flex min-h-11 w-full max-w-[340px] items-center justify-center gap-2 rounded-full bg-white/85 px-4 lg:h-10 lg:min-h-0 lg:w-auto">
              <Image src="/icons/inbox.png" alt="" width={19} height={19} />
              <a href={`mailto:${contact.email}`} className="break-all">{contact.email}</a>
            </li>
            <li className="flex min-h-11 w-full max-w-[340px] items-center justify-center gap-2 rounded-full bg-white/85 px-4 lg:h-10 lg:min-h-0 lg:w-auto">
              <Image src="/icons/linkedin.svg" alt="" width={18} height={18} />
              <a href={contact.linkedin} target="_blank" rel="noreferrer" className="break-all underline">
                {contact.linkedinDisplay}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <MarqueeBand word="DIANA LUY" className="relative -mt-[18px]" />
    </footer>
  );
}
