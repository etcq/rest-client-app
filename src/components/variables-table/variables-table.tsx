'use client';

import useVariablesStorage from '@/hooks/use-variables-storage';
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Container,
  Button,
  Box,
  TextField,
} from '@mui/material';
import { VariablesTableRow } from '@components';
import convertFormData from '@/utils/convert-formdata';
import { useTranslations } from 'next-intl';

const VariablesTable = () => {
  const { variables, addVariable, deleteVariable } = useVariablesStorage();
  const t = useTranslations('Variables');

  const handleAddVariable = (formData: FormData) => {
    const [key, value] = convertFormData(formData);
    addVariable({ [key]: value });
  };

  return (
    <Container>
      <TableContainer component={Paper} sx={{ maxWidth: 600, mx: 'auto' }}>
        <Table sx={{ minWidth: 300 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">{t('key')}</TableCell>
              <TableCell align="center">{t('value')}</TableCell>
              <TableCell align="center">{t('controls')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {variables &&
              Object.entries(variables).map(([key, value]) => (
                <VariablesTableRow key={key} variableKey={key} value={value} onDelete={deleteVariable} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        component="form"
        sx={{ display: 'flex', justifyContent: 'center', mt: 2, gap: 2, maxWidth: 700, mx: 'auto' }}
        action={handleAddVariable}
      >
        <TextField id="outlined-basic" label={t('key')} variant="outlined" name="key" required />
        <TextField id="outlined-basic" label={t('value')} variant="outlined" name="value" required />
        <Button variant="contained" type="submit">
          {t('add')}
        </Button>
      </Box>
    </Container>
  );
};

export default VariablesTable;
