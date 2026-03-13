export const GITHUB_PROFILE_URL = "https://github.com/laninh-tech";
export const LINKEDIN_PROFILE_URL = "https://www.linkedin.com/in/laninh-tech";

export type ContactItem = {
  label: string;
  value: string;
  href: string;
  external?: boolean;
};

export const CONTACT_ITEMS: ContactItem[] = [
  {
    label: "Email",
    value: "lwanih.work@gmail.com",
    href: "mailto:lwanih.work@gmail.com",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/laninh-tech",
    href: LINKEDIN_PROFILE_URL,
    external: true,
  },
  {
    label: "GitHub",
    value: "github.com/laninh-tech",
    href: GITHUB_PROFILE_URL,
    external: true,
  },
  {
    label: "Phone",
    value: "0878 500 607",
    href: "tel:0878500607",
  },
];
