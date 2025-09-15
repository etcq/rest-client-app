import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import codegen from 'postman-code-generators';
import { Request } from 'postman-collection';
import { useEffect, useState, type JSX } from 'react';
import { Box, MenuItem, Select, Typography } from '@mui/material';
import type { IRequestData } from '@interfaces';

const LANGUAGES = [
  { label: 'JavaScript (Fetch)', language: 'javascript', variant: 'fetch' },
  { label: 'JavaScript (XHR)', language: 'javascript', variant: 'xhr' },
  { label: 'cURL', language: 'curl', variant: 'curl' },
  { label: 'NodeJS (Native)', language: 'nodejs', variant: 'Native' },
  { label: 'Python (requests)', language: 'python', variant: 'requests' },
  { label: 'Java (OkHttp)', language: 'java', variant: 'OkHttp' },
  { label: 'C# (HttpClient)', language: 'csharp', variant: 'HttpClient' },
  { label: 'Go (Native)', language: 'go', variant: 'Native' },
];

export const GeneratedCode = ({ url, method, body, headers }: IRequestData): JSX.Element => {
  const [snippets, setSnippets] = useState<Record<string, string>>({});
  const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGES[0].label);

  useEffect((): void => {
    if (!url) {
      setSnippets({});
      return;
    }

    const sdkRequest = new Request({
      url,
      method,
      headers: Object.entries(headers).map(([key, value]) => ({ key, value })),
      body: {
        mode: 'raw',
        raw: body,
      },
    });

    LANGUAGES.map(({ language, variant }): void => {
      codegen.convert(language, variant, sdkRequest, {}, (error: Error | null, snippet: string | null): void => {
        const snippetKey = `${language}-${variant}`;
        if (!error && snippet) {
          setSnippets((prev) => ({ ...prev, [snippetKey]: snippet }));
        } else {
          setSnippets((prevSnippets) => ({ ...prevSnippets, [snippetKey]: 'Error generating code.' }));
        }
      });
    });
  }, [method, url, body, headers]);

  if (!url) {
    return (
      <Box sx={{ mt: 2 }}>
        <Typography color="text.secondary">Not enough details to generate code. Please provide a valid URL.</Typography>
      </Box>
    );
  }

  const selectedLang = LANGUAGES.find((lang): boolean => lang.label === selectedLanguage);
  const selectedSnippet = selectedLang ? snippets[`${selectedLang.language}-${selectedLang.variant}`] : '';

  return (
    <Box>
      <Box sx={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <Typography>Language</Typography>
        <Select
          value={selectedLanguage}
          onChange={(event): void => setSelectedLanguage(event.target.value)}
          size={'small'}
        >
          {LANGUAGES.map(
            (language): JSX.Element => (
              <MenuItem key={language.label} value={language.label}>
                {language.label}
              </MenuItem>
            )
          )}
        </Select>
      </Box>
      <Box>
        <SyntaxHighlighter language={selectedLang?.language} style={materialDark}>
          {selectedSnippet || 'Generating...'}
        </SyntaxHighlighter>
      </Box>
    </Box>
  );
};
