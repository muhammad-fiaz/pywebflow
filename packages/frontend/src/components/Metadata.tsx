import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import getMetadata, { Metadata } from '../api/metadata';
const MetaData: React.FC = () => {
  const [metadata, setMetadata] = useState<Metadata>({
    title: 'PyWebflow',
    description: 'Webflow application',
  });

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const data = await getMetadata();
        setMetadata((prevMetadata) => ({
          ...prevMetadata,
          ...data,
        }));
      } catch (error) {
        console.error('Failed to fetch metadata:', error);
      }
    };

    fetchMetadata();
  }, []);

  return (
    <Helmet>
      <title>{metadata.title}</title>
      {metadata.description && (
        <meta name="description" content={metadata.description} />
      )}
      {metadata.keywords && (
        <meta name="keywords" content={metadata.keywords} />
      )}
      {metadata.author && <meta name="author" content={metadata.author} />}
      {metadata.viewport && (
        <meta name="viewport" content={metadata.viewport} />
      )}
      {metadata.charset && <meta charSet={metadata.charset} />}
      {metadata.robots && <meta name="robots" content={metadata.robots} />}
      {metadata.canonical && <link rel="canonical" href={metadata.canonical} />}
      {metadata.ogTitle && (
        <meta property="og:title" content={metadata.ogTitle} />
      )}
      {metadata.ogDescription && (
        <meta property="og:description" content={metadata.ogDescription} />
      )}
      {metadata.ogUrl && <meta property="og:url" content={metadata.ogUrl} />}
      {metadata.ogImage && (
        <meta property="og:image" content={metadata.ogImage} />
      )}
    </Helmet>
  );
};

export default MetaData;
