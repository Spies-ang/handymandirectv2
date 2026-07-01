// Central site configuration for content-driven sections.

export interface ReviewPlatform {
  platform: string;
  rating: string;
  count: string;
  excerpts: string[];
  badgeColor: string;
  logo: string;
  link: string;
}

const sharedExcerpts = [
  "Within 20 minutes two contractors contacted me, and the first came out to assess and quote. Professional, quick and easy to deal with. Would recommend.",
  "Quick response after posting my query. Price was exceptional, service was superb, workmanship was excellent. Very happy with the results.",
  "The team at HandymanDirect are extremely professional and always eager to help. The website is easy to work with and reliable.",
  "A great and professional platform to get the right contractors for anything around your home. Punctual and willing to go the extra mile.",
];

export const reviewPlatforms: ReviewPlatform[] = [
  {
    platform: "HandymanDirect",
    rating: "5.0 / 5",
    count: "Verified customer reviews",
    excerpts: sharedExcerpts,
    badgeColor: "hsl(145 63% 42%)",
    logo: "H",
    link: "#",
  },
  {
    platform: "Hello Peter",
    rating: "5.0 / 5",
    count: "Verified customer reviews",
    excerpts: sharedExcerpts,
    badgeColor: "#EE1B24",
    logo: "H",
    link: "https://www.hellopeter.com/handyman-direct",
  },
  {
    platform: "Google",
    rating: "5.0 / 5",
    count: "Verified customer reviews",
    excerpts: sharedExcerpts,
    badgeColor: "#4285F4",
    logo: "G",
    link: "https://share.google/Qg36252eHBRWcUEbL",
  },
  {
    platform: "Trustpilot",
    rating: "5.0 / 5",
    count: "58 reviews",
    excerpts: sharedExcerpts,
    badgeColor: "#00B67A",
    logo: "T",
    link: "#",
  },
  {
    platform: "Facebook",
    rating: "5.0 / 5",
    count: "Verified customer reviews",
    excerpts: sharedExcerpts,
    badgeColor: "#1877F2",
    logo: "f",
    link: "#",
  },
];
