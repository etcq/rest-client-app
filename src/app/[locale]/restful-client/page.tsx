'use client';

import { Box, Typography, TextField, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { METHODS, TABS } from '@constants';
import { useTranslations } from 'next-intl';
import SelectField from '@/components/methods-select';
import useRequestStore from '@store/use-request.store';
import { useFetchClient } from '@hooks/use-fetch-client';
import { encodeRequestToUrl, decodeUrlToRequest } from '@utils/url-route';
import { isValidUrl } from '@utils/url-validation';
import { convertHeadersArrayToObject } from '@utils/headers';
import { useRouter, useSearchParams } from 'next/navigation';
import { renderResponseBody } from '@utils/render-response-body';
import TabContainer, { type ITabItem } from '@/components/tabs/container';
import HeadersTab from '@/components/tabs/headers/insex';
import BodyTab from '@/components/tabs/body';
import CodeTab from '@/components/tabs/code';

export default function RestfulClient() {
  const [method, setMethod] = useState<METHODS>(METHODS.GET);
  const [url, setUrl] = useState<string>('');
  const [body, setBody] = useState<string>('');

  const router = useRouter();
  const searchParams = useSearchParams();

  const { headers, addHeader, setHeaders } = useRequestStore((state) => state);
  const { response, loading, sendRequest } = useFetchClient();
  const t = useTranslations('restfulPage');

  const headersObject = convertHeadersArrayToObject(headers);
  const urlError = url.length > 0 && !isValidUrl(url);

  const handleSend = async () => {
    if (!isValidUrl(url)) return;
    void sendRequest(url, method, headersObject, body);
    const routeUrl = encodeRequestToUrl({ url, method, body, headers: headersObject });
    router.push(routeUrl);
  };

  useEffect(() => {
    const decodedRequest = decodeUrlToRequest(searchParams.toString());

    if (decodedRequest.url) {
      setUrl(decodedRequest.url);
      setMethod(decodedRequest.method as METHODS);
      setBody(decodedRequest.body ?? '');

      const newHeaders = Object.entries(decodedRequest.headers ?? {}).map(([key, value], index) => ({
        id: index.toString(),
        key,
        value,
      }));
      setHeaders(newHeaders);
    } else {
      setUrl('');
      setMethod(METHODS.GET);
      setBody('');
      setHeaders([{ id: crypto.randomUUID(), key: '', value: '' }]);
    }
  }, [searchParams, setHeaders]);

  const tabItems: ITabItem[] = [
    {
      id: TABS.HEADERS,
      label: t('labels.tabs.headers'),
      content: <HeadersTab headers={headers} addHeader={addHeader} />,
    },
    {
      id: TABS.BODY,
      label: t('labels.tabs.body'),
      content: <BodyTab body={body} setBody={setBody} placeholder={t('placeholders.body')} />,
    },
    {
      id: TABS.CODE,
      label: t('labels.tabs.code'),
      content: <CodeTab url={url} method={method} body={body} headers={headersObject} />,
    },
  ];

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', minHeight: '100%', gap: '10px' }}>
      <Box sx={{ display: 'flex', gap: '10px', mx: 'auto', width: '100%', maxWidth: '800px', mt: '30px' }}>
        <SelectField value={method} onChange={(e) => setMethod(e.target.value as METHODS)} />
        <TextField
          size="small"
          fullWidth
          placeholder={t('placeholders.url')}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          error={urlError}
          helperText={urlError ? t('errors.incorrectUrl') : ' '}
          sx={{ maxWidth: '600px' }}
        />
        <Button variant="contained" disabled={!isValidUrl(url)} onClick={handleSend} sx={{ maxHeight: '40px' }}>
          {loading ? 'Loading...' : t('labels.buttons.send')}
        </Button>
      </Box>

      <TabContainer tabs={tabItems} />

      <Box sx={{ mt: 'auto', maxHeight: '34vh', overflow: 'auto', mb: '5px' }}>
        {response.status !== undefined && (
          <>
            <Typography>Status: {response.status}</Typography>
            {response.body !== undefined && renderResponseBody(response.body, t)}
          </>
        )}
      </Box>
    </Box>
  );
}
