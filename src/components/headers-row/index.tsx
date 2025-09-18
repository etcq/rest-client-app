import { Box, TextField } from '@mui/material';
import { useTranslations } from 'next-intl';
import type { IHeader } from '@interfaces';
import useRequestStore from '@store/use-request.store';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

export interface IHeadersRowProps {
  header: IHeader;
}

const HeadersRow = ({ header }: IHeadersRowProps) => {
  const t = useTranslations('restfulPage');
  const { updateHeader, removeHeader } = useRequestStore();
  return (
    <Box sx={{ display: 'flex', gap: '5px', alignItems: 'center', mb: '5px' }}>
      <TextField
        size={'small'}
        value={header.key}
        placeholder={t('placeholders.headers.key')}
        onChange={(event) => updateHeader(header.id, event.target.value, header.value)}
      ></TextField>
      <TextField
        size={'small'}
        value={header.value}
        placeholder={t('placeholders.headers.value')}
        onChange={(event) => updateHeader(header.id, header.key, event.target.value)}
      ></TextField>
      <DeleteForeverOutlinedIcon sx={{ ml: '10px', cursor: 'pointer' }} onClick={() => removeHeader(header.id)} />
    </Box>
  );
};

export default HeadersRow;
