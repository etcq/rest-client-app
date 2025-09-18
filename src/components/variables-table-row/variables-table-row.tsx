import { TableRow, TableCell, Button } from '@mui/material';
import React from 'react';

interface IVariablesTableRowProps {
  variableKey: string;
  value: string;
  onDelete: (key: string) => void;
}

export const VariablesTableRow = ({ variableKey, value, onDelete }: IVariablesTableRowProps) => {
  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell align="center">{`{{${variableKey}}}`}</TableCell>
      <TableCell align="center">{value}</TableCell>
      <TableCell align="center">
        <Button variant="outlined" color="error" onClick={() => onDelete(variableKey)}>
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
};
