import { loadAssets } from '@pywebflow/api/src/filepaths.ts';

// Function to inject assets dynamically
export const injectAssets = async (): Promise<void> => {
  try {
    const assets = await loadAssets();

    if (!assets || typeof assets !== 'object') {
      console.error('Invalid assets data:', assets);
      return;
    }

    const cssFiles = Array.isArray(assets.css) ? assets.css.filter(Boolean) : [];
    const jsFiles = Array.isArray(assets.js) ? assets.js.filter(Boolean) : [];

    // Inject CSS files
    cssFiles.forEach((href: string) => {
      if (!document.querySelector(`link[href="${href}"]`)) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        document.head.appendChild(link);
        console.log(`Injected CSS: ${href}`);
      }
    });

    // Inject JS files
    jsFiles.forEach((src: string) => {
      if (!document.querySelector(`script[src="${src}"]`)) {
        const script = document.createElement('script');
        script.type = 'module';
        script.src = src;
        script.defer = true; // Prevent blocking page load
        document.body.appendChild(script);
        console.log(`Injected JS: ${src}`);
      }
    });

  } catch (error) {
    console.error('Error loading assets:', error);
  }
};
