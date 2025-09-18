'use client';

import { Box, Typography, TextField, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { METHODS, TABS } from '@constants';
import { useTranslations } from 'next-intl';
import SelectField from '@/components/methods-select';
import useRequestStore from '@store/use-request.store';
import { encodeRequestToUrl, decodeUrlToRequest } from '@utils/url-route';
import { isValidUrl } from '@utils/url-validation';
import { renderResponseBody } from '@utils/render-response-body';
import TabContainer, { type ITabItem } from '@/components/tabs/container';
import HeadersTab from '@/components/tabs/headers';
import BodyTab from '@/components/tabs/body';
import CodeTab from '@/components/tabs/code';
import { useLocale } from 'next-intl';
import { usePathname, useSearchParams } from 'next/navigation';
import useRequestHistoryStore from '@store/request-history';

export default function RestfulClient() {
  const [method, setMethod] = useState<METHODS>(METHODS.GET);
  const [url, setUrl] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState<{ status?: number; body?: string } | null>(null);

  const locale = useLocale();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { headers, setHeaders } = useRequestStore((state) => state);
  const addRequest = useRequestHistoryStore((state) => state.addRequest);

  const t = useTranslations('restfulPage');
  const urlError = url.length > 0 && !isValidUrl(url);

  const handleSend = async () => {
    if (!isValidUrl(url)) return;

    const requestData = { method, url, body, headers };
    const path = encodeRequestToUrl(requestData);

    const startTime = performance.now();
    try {
      setLoading(true);
      const res = await fetch('/api/proxy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData),
      });

      const data = await res.json();
      setResponseData(data);
      window.history.pushState({}, '', `/${locale}/restful-client${path}`);

      const duration = performance.now() - startTime;
      const requestSize = new Blob([JSON.stringify(requestData)]).size;
      const responseSize = new Blob([JSON.stringify(data)]).size;

      addRequest({
        id: crypto.randomUUID(),
        timestamp: new Date(),
        method,
        url,
        requestSize,
        responseSize,
        status: data.status,
        duration,
      });
    } catch (error) {
      const duration = performance.now() - startTime;
      const requestSize = new Blob([JSON.stringify(requestData)]).size;

      addRequest({
        id: crypto.randomUUID(),
        timestamp: new Date(),
        method,
        url,
        requestSize,
        responseSize: 0,
        error: String(error),
        duration,
      });

      setResponseData({ body: String(error) });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!pathname) return;

    const basePath = `/${locale}/restful-client`;

    let pathAfterClient = pathname.startsWith(basePath) ? pathname.slice(basePath.length) : '';

    if (pathAfterClient.startsWith('/')) pathAfterClient = pathAfterClient.slice(1);

    const search = searchParams.toString();
    const decodedRequest = decodeUrlToRequest(pathAfterClient + (search ? `?${search}` : ''));

    if (decodedRequest.url) {
      setUrl(decodedRequest.url);
      setMethod(decodedRequest.method ? (decodedRequest.method as METHODS) : METHODS.GET);
      setBody(decodedRequest.body ?? '');

      const newHeaders = decodedRequest.headers?.length
        ? decodedRequest.headers
        : [{ id: crypto.randomUUID(), key: '', value: '' }];

      setHeaders(newHeaders);
    } else {
      setUrl('');
      setMethod(METHODS.GET);
      setBody('');
      setHeaders([{ id: crypto.randomUUID(), key: '', value: '' }]);
    }
  }, [searchParams, pathname, locale, setHeaders]);

  const tabItems: ITabItem[] = [
    {
      id: TABS.HEADERS,
      label: t('labels.tabs.headers'),
      content: <HeadersTab />,
    },
    {
      id: TABS.BODY,
      label: t('labels.tabs.body'),
      content: <BodyTab body={body} setBody={setBody} placeholder={t('placeholders.body')} />,
    },
    {
      id: TABS.CODE,
      label: t('labels.tabs.code'),
      content: <CodeTab url={url} method={method} body={body} headers={headers} />,
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
        {responseData?.status !== undefined && (
          <>
            <Typography>Status: {responseData.status}</Typography>
            {responseData.body !== undefined && renderResponseBody(responseData.body, t)}
          </>
        )}
      </Box>
    </Box>
  );
}
