import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const contentDir = join(process.cwd(), 'content');

export type Address = {
  street: string;
  city: string;
  state: string;
  zip: string;
};

export type HoursRow = {
  days: string;
  time: string;
};

export type Site = {
  shopName: string;
  tagline: string;
  headline: string;
  phone: string;
  email: string;
  address: Address;
  hours: HoursRow[];
  social: {
    facebook?: string;
    instagram?: string;
  };
  seo: {
    title: string;
    description: string;
  };
  mapUrl: string;
  mapEmbedUrl: string;
  /** Optional Wolof Teacher translation demo embed (not live agent chat). */
  chatWidget?: {
    enabled?: boolean;
    scriptSrc: string;
    siteKey: string;
    pack?: string;
    defaultTarget?: string;
    position?: string;
  };
  /** Crisp live-chat widget (agent inbox). */
  crisp?: {
    enabled?: boolean;
    websiteId: string;
  };
};

export type Service = {
  name: string;
  description: string;
  price?: string;
};

export type ServicesContent = {
  intro: string;
  items: Service[];
};

export type GalleryImage = {
  file: string;
  caption: string;
};

export type GalleryContent = {
  intro: string;
  images: GalleryImage[];
};

function readText(filename: string): string {
  try {
    return readFileSync(join(contentDir, filename), 'utf-8');
  } catch {
    throw new Error(
      `Could not read content/${filename}. Make sure the file exists in the content folder.`,
    );
  }
}

function readJson<T>(filename: string): T {
  const raw = readText(filename);
  try {
    return JSON.parse(raw) as T;
  } catch {
    throw new Error(
      `content/${filename} is not valid JSON. Check for missing commas or quotes. See CONTENT.md.`,
    );
  }
}

/** Turn simple about.md into HTML (paragraphs + **bold**). */
function markdownToHtml(markdown: string): string {
  return markdown
    .trim()
    .split(/\n\n+/)
    .map((block) => {
      const withBreaks = block
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n/g, '<br />');
      return `<p>${withBreaks}</p>`;
    })
    .join('\n');
}

export function getSite(): Site {
  const site = readJson<Site>('site.json');
  if (!site.shopName || !site.phone || !site.address?.street) {
    throw new Error(
      'content/site.json is missing shopName, phone, or address.street. See CONTENT.md.',
    );
  }
  return site;
}

export function getServices(): ServicesContent {
  const services = readJson<ServicesContent>('services.json');
  if (!Array.isArray(services.items)) {
    throw new Error(
      'content/services.json needs an "items" list. Copy a block from CONTENT.md.',
    );
  }
  for (const [index, item] of services.items.entries()) {
    if (!item?.name || !item?.description) {
      throw new Error(
        `content/services.json item #${index + 1} needs both "name" and "description".`,
      );
    }
  }
  return services;
}

export function getAboutHtml(): string {
  return markdownToHtml(readText('about.md'));
}

export function getGallery(): GalleryContent {
  const gallery = readJson<GalleryContent>('gallery.json');
  if (!Array.isArray(gallery.images)) {
    throw new Error('content/gallery.json needs an "images" list. See CONTENT.md.');
  }
  return gallery;
}

export function formatAddress(address: Address): string {
  return `${address.street}, ${address.city}, ${address.state} ${address.zip}`;
}

export function phoneHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, '')}`;
}
