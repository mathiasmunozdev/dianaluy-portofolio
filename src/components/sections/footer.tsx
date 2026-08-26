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
      <div className="relative mx-band h-[756px] overflow-hidden rounded-lg bg-secondary">
        {/* Escenario fijo de 1878px centrado, como en el hero */}
        <div className="absolute left-1/2 top-0 h-full w-[1878px] -translate-x-1/2">
          <Image
            src="/images/decor/band-blobs-footer.svg"
            alt=""
            width={1878}
            height={756}
            className="absolute inset-0 size-full"
          />

          <p className="relative pt-[180px] text-center font-display text-display font-bold">
            {t.footer.thanksLine1}
            <br />
            {t.footer.thanksLine2}
          </p>

          <Image
            src="/icons/flower.svg"
            alt=""
            width={96}
            height={96}
            className="absolute left-[545px] top-[301px]"
          />
          <Image
            src="/icons/sparkle-footer.svg"
            alt=""
            width={54}
            height={54}
            className="absolute left-[calc(50%+271px)] top-[353px]"
          />

          <ul className="absolute inset-x-0 top-[465px] flex items-center justify-center gap-3 font-body text-contact">
            <li className="flex h-10 items-center gap-2 rounded-full bg-white/80 px-4">
              <Image src="/icons/phone.png" alt="" width={16} height={16} />
              <a href={contact.whatsapp} target="_blank" rel="noreferrer" className="underline">
                {contact.phoneDisplay}
              </a>
            </li>
            <li className="flex h-10 items-center gap-2 rounded-full bg-white/80 px-4">
              <Image src="/icons/inbox.png" alt="" width={19} height={19} />
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </li>
            <li className="flex h-10 items-center gap-2 rounded-full bg-white/80 px-4">
              <Image src="/icons/linkedin.svg" alt="" width={18} height={18} />
              <a href={contact.linkedin} target="_blank" rel="noreferrer" className="underline">
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
