import axios from 'axios';

export const loadAssets = async () => {
  try {
    const response = await axios.get('/api/filepaths');
    const { css = [], js = [], html = [] } = response.data;

    // Prefetch and inject CSS files
    if (css.length > 0) {
      css.forEach((href: string) => {
        // Prefetch CSS
        const prefetchLink = document.createElement('link');
        prefetchLink.rel = 'prefetch';
        prefetchLink.href = href;
        prefetchLink.as = 'style';
        document.head.appendChild(prefetchLink);

        // Inject CSS
        const styleLink = document.createElement('link');
        styleLink.rel = 'stylesheet';
        styleLink.href = href;
        document.head.appendChild(styleLink);
      });
    }

    // Prefetch and inject JS files
    if (js.length > 0) {
      js.forEach((src: string) => {
        // Prefetch JS
        const prefetchLink = document.createElement('link');
        prefetchLink.rel = 'prefetch';
        prefetchLink.href = src;
        prefetchLink.as = 'script';
        document.head.appendChild(prefetchLink);

        // Inject JS
        const script = document.createElement('script');
        script.type = 'module';
        script.src = src;
        document.body.appendChild(script);
      });
    }

    // Prefetch HTML files
    if (html.length > 0) {
      html.forEach((href: string) => {
        const prefetchLink = document.createElement('link');
        prefetchLink.rel = 'prefetch';
        prefetchLink.href = href;
        prefetchLink.as = 'document';
        document.head.appendChild(prefetchLink);
      });
    }

  } catch (error) {
    console.error('Error loading assets:', error);
  }
};