import { GithubIcon, LinkedinIcon, MailIcon } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const socialLinks = [
  {
    href: "mailto:yooss2006@gmail.com",
    Icon: MailIcon,
    label: "Email",
  },
  {
    href: "https://github.com/yooss2006",
    Icon: GithubIcon,
    label: "Github",
    isExternal: true,
  },
  {
    href: "https://www.linkedin.com/in/%EC%88%9C%EC%83%81-%EC%9C%A0-a94482255/",
    Icon: LinkedinIcon,
    label: "Linkedin",
    isExternal: true,
  },
];

export default function SocialBox() {
  return (
    <TooltipProvider delayDuration={300}>
      <aside className="py-2 border-t-2 border-normalColor">
        <h2 className="sr-only">소셜 링크</h2>
        <nav>
          <ul className="w-48 mx-auto flex justify-between items-center">
            {socialLinks.map(({ href, Icon, label, isExternal }) => (
              <Tooltip key={href}>
                <TooltipTrigger asChild>
                  <li>
                    <a
                      href={href}
                      className="text-normalColor hover:text-pointColor transition-colors duration-300"
                      {...(isExternal && {
                        target: "_blank",
                        rel: "noopener noreferrer",
                      })}
                    >
                      <figure>
                        <Icon />
                        <figcaption className="sr-only">{label}</figcaption>
                      </figure>
                    </a>
                  </li>
                </TooltipTrigger>
                <TooltipContent className="bg-black text-white">
                  {label}
                </TooltipContent>
              </Tooltip>
            ))}
          </ul>
        </nav>
      </aside>
    </TooltipProvider>
  );
}
