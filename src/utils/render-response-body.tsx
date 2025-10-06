import { Typography } from '@mui/material';
import Image from 'next/image';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import type { JSX } from 'react';

export const renderResponseBody = (body: string | object | null, t: (key: string) => string): JSX.Element => {
  if (body === null) {
    return <Typography>{t('unsupportedContentType')}</Typography>;
  }

  if (typeof body === 'string') {
    if (body.startsWith('blob:')) {
      return <Image src={body} alt="Response image" width={300} height={200} />;
    }
    return <Typography component="pre">{body}</Typography>;
  }

  return (
    <SyntaxHighlighter language="json" style={materialDark}>
      {JSON.stringify(body, null, 2)}
    </SyntaxHighlighter>
  );
};
