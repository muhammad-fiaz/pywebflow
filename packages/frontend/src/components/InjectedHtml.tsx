import React, { useEffect, useState } from 'react';
import { fetchHtmlContent } from '@pywebflow/api/src/html';
import DOMPurify from 'dompurify';
import parse from 'html-react-parser';

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
    <div>
      {htmlContents.map((htmlContent, index) => (
        <div key={index}>
          {parse(DOMPurify.sanitize(htmlContent))}
        </div>
      ))}
    </div>
  );
};

export default InjectedHtml;