import React, { useEffect, useState } from 'react';
import { fetchHtmlContent } from '@pywebflow/api/src/html';

const InjectedHtml: React.FC = () => {
  const [htmlContents, setHtmlContents] = useState<string[]>([]);

  useEffect(() => {
    const fetchContent = async () => {
      const contents = await fetchHtmlContent();
      setHtmlContents(contents);
    };

    fetchContent();
  }, []);

  return (
    <div className="injected-html-container">
      {htmlContents.map((htmlContent, index) => (
        <div
          key={index}
          className="injected-html"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      ))}
    </div>
  );
};

export default InjectedHtml;
