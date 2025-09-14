'use client';

import useLocalStorage from '@/hooks/use-local-storage';
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
import VariablesTableRow from '../variables-table-row/variables-table-row';

export const VariablesTable = () => {
  const { getVariables, addVariable, deleteVariable } = useLocalStorage();
  const variables = getVariables();

  const handleAddVariable = (formData: FormData) => {
    if (formData.get('key') && formData.get('value')) {
      const key = formData.get('key')?.toString() || '';
      const value = formData.get('value')?.toString() || '';
      addVariable({ [key]: value });
    }
  };

  return (
    <Container>
      <TableContainer component={Paper} sx={{ maxWidth: 600, mx: 'auto' }}>
        <Table sx={{ minWidth: 300 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Variables Key</TableCell>
              <TableCell align="center">Variables Value</TableCell>
              <TableCell align="center">Controls</TableCell>
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
        <TextField id="outlined-basic" label="Key" variant="outlined" name="key" required />
        <TextField id="outlined-basic" label="Value" variant="outlined" name="value" required />
        <Button variant="contained" type="submit">
          Add
        </Button>
      </Box>
    </Container>
  );
};
