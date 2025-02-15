import axios from 'axios';

export const loadAssets = async () => {
  try {
    const response = await axios.get('/api/filepaths');
    const { css = [], js = [], html = [] } = response.data;

    // Prefetch and inject CSS files
    if (css.length > 0) {
      css.forEach((href: string) => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = href;
        link.as = 'style';
        document.head.appendChild(link);

        const styleLink = document.createElement('link');
        styleLink.rel = 'stylesheet';
        styleLink.href = href;
        document.head.appendChild(styleLink);
      });
    }

    // Prefetch and inject JS files
    if (js.length > 0) {
      js.forEach((src: string) => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = src;
        link.as = 'script';
        document.head.appendChild(link);

        const script = document.createElement('script');
        script.type = 'module';
        script.src = src;
        document.body.appendChild(script);
      });
    }

    // Prefetch HTML files
    if (html.length > 0) {
      html.forEach((href: string) => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = href;
        link.as = 'document';
        document.head.appendChild(link);
      });
    }

  } catch (error) {
    console.error('Error loading assets:', error);
  }
};