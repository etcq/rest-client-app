'use client';

import { Box, Typography, TextField, Button } from '@mui/material';
import { useState, useEffect, type JSX } from 'react';
import { METHODS, TABS } from '@constants';
import { useTranslations } from 'next-intl';
import SelectField from '@/components/methods-select';
import HeadersRow from '@/components/headers-row';
import useRequestStore from '@store/use-request.store';
import { useFetchClient } from '@hooks/use-fetch-client';
import { renderResponseBody } from '@utils/render-response-body';
import { isValidUrl } from '@utils/url-validation';
import { GeneratedCode } from '@/components/generated-code';
import { encodeRequestToUrl, decodeUrlToRequest } from '@utils/url-route';
import { useRouter, useSearchParams } from 'next/navigation';
import { convertHeadersArrayToObject } from '@utils/headers';

const tabs: { id: string; label: string }[] = [
  { id: TABS.HEADERS, label: 'Headers' },
  { id: TABS.BODY, label: 'Body' },
  { id: TABS.CODE, label: 'Generated Code' },
];

type TActiveTab = 'headers' | 'body' | 'code';

export default function RestfulClient(): JSX.Element {
  const [method, setMethod] = useState<METHODS>(METHODS.GET);
  const [activeTab, setActiveTab] = useState<TActiveTab>('headers');
  const [url, setUrl] = useState<string>('');
  const [body, setBody] = useState<string>('');

  const router = useRouter();
  const searchParams = useSearchParams();

  const headers = useRequestStore((state) => state.headers);
  const addHeader = useRequestStore((state) => state.addHeader);
  const setHeaders = useRequestStore((state) => state.setHeaders);

  const { response, loading, sendRequest } = useFetchClient();

  const t = useTranslations('restfulPage');

  const headersObject = convertHeadersArrayToObject(headers);

  const urlError: boolean = url.length > 0 && !isValidUrl(url);

  const handleSend = async (): Promise<void> => {
    if (!isValidUrl(url)) return;

    void sendRequest(url, method, headersObject, body);

    const routeUrl = encodeRequestToUrl({
      url,
      method,
      body,
      headers: headersObject,
    });
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

  return (
    <Box sx={{ width: '100%' }}>
      <Typography>{t('title')}</Typography>
      <Box sx={{ display: 'flex', gap: '1' }}>
        <SelectField value={method} onChange={(event): void => setMethod(event.target.value as METHODS)} />
        <TextField
          placeholder={t('placeholders.url')}
          value={url}
          onChange={(event): void => setUrl(event.target.value)}
          error={urlError}
          helperText={urlError ? 'incorrect url' : ' '}
        ></TextField>
        <Button variant="contained" disabled={!isValidUrl(url)} onClick={handleSend}>
          {loading ? 'Loading...' : t('labels.buttons.send')}
        </Button>
      </Box>
      <Box>
        {tabs.map(
          (tab): JSX.Element => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'contained' : 'outlined'}
              onClick={(): void => setActiveTab(tab.id as TActiveTab)}
            >
              {tab.label}
            </Button>
          )
        )}
      </Box>
      {activeTab === TABS.HEADERS && (
        <Box>
          <Typography>Headers</Typography>
          <Button variant={'outlined'} onClick={addHeader}>
            add header
          </Button>
          {headers.map(
            (header): JSX.Element => (
              <HeadersRow key={header.id} header={header} />
            )
          )}
        </Box>
      )}
      {activeTab === TABS.BODY && (
        <Box>
          <Typography>Body</Typography>
          <TextField
            multiline
            minRows={'6'}
            fullWidth
            placeholder={t('placeholders.body')}
            value={body}
            onChange={(event): void => setBody(event.target.value)}
          ></TextField>
        </Box>
      )}
      {activeTab === TABS.CODE && (
        <Box>
          <Typography>Generated Code</Typography>
          <GeneratedCode url={url} method={method} body={body} headers={headersObject} />
        </Box>
      )}
      <Box>
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
