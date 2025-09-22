import { Box } from '@mui/material';
import { GeneratedCode } from '@/components/generated-code';
import type { IRequestData } from '@interfaces';

export default function CodeTab({ url, method, body, headers }: IRequestData) {
  return (
    <Box>
      <GeneratedCode url={url} method={method} body={body} headers={headers} />
    </Box>
  );
}
