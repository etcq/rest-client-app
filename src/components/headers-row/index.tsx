import { Box, TextField } from '@mui/material';
import { useTranslations } from 'next-intl';
import { RiDeleteBinLine } from 'react-icons/ri';
import type { IHeader } from '@store/use-request.store';
import useRequestStore from '@store/use-request.store';

export interface IHeadersRowProps {
  header: IHeader;
}

const HeadersRow = ({ header }: IHeadersRowProps) => {
  const t = useTranslations('restfulPage');
  const { updateHeader, removeHeader } = useRequestStore();
  return (
    <Box sx={{ display: 'flex', gap: '1' }}>
      <TextField
        placeholder={t('placeholders.headers.key')}
        onChange={(event) => updateHeader(header.id, event.target.value, header.value)}
      ></TextField>
      <TextField
        placeholder={t('placeholders.headers.value')}
        onChange={(event) => updateHeader(header.id, header.key, event.target.value)}
      ></TextField>
      <RiDeleteBinLine onClick={() => removeHeader(header.id)} />
    </Box>
  );
};

export default HeadersRow;
