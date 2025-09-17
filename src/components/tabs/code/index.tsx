import { Box } from '@mui/material';
import { GeneratedCode } from '@/components/generated-code';
import type { METHODS } from '@constants';

interface CodeTabProps {
  url: string;
  method: METHODS;
  body: string;
  headers: IHeaderObject;
}

export interface IHeaderObject {
  [key: string]: string;
}

export default function CodeTab({ url, method, body, headers }: CodeTabProps) {
  return (
    <Box>
      <GeneratedCode url={url} method={method} body={body} headers={headers} />
    </Box>
  );
}
