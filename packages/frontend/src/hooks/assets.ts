import { loadAssets } from '@pywebflow/api/src/filepaths.ts';

// Function to inject CSS dynamically
export const injectCSS = (href: string): void => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  document.head.appendChild(link);
};

// Function to inject JavaScript dynamically
export const injectJS = (src: string): void => {
  const script = document.createElement('script');
  script.type = 'module';
  script.src = src;
  document.body.appendChild(script);
};

// Function to prefetch files before loading
export const prefetchFile = (
  href: string,
  asType: 'script' | 'style',
): void => {
  const prefetchLink = document.createElement('link');
  prefetchLink.rel = 'prefetch';
  prefetchLink.href = href;
  prefetchLink.as = asType;
  document.head.appendChild(prefetchLink);
};

// Type definition for assets response
interface AssetsResponse {
  css?: string[];
  js?: string[];
}

// Function to load and inject assets dynamically
export const loadAndInjectAssets = async (): Promise<void> => {
  try {
    const assets: AssetsResponse = (await loadAssets()) || {}; // Ensure a valid object is returned

    const cssFiles = assets.css ?? []; // Default to an empty array if undefined
    const jsFiles = assets.js ?? []; // Default to an empty array if undefined

    cssFiles.forEach((href: string) => {
      prefetchFile(href, 'style');
      injectCSS(href);
    });

    jsFiles.forEach((src: string) => {
      prefetchFile(src, 'script');
      injectJS(src);
    });
  } catch (error) {
    console.error('Error loading assets:', error);
  }
};
