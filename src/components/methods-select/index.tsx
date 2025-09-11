import type { SelectChangeEvent } from '@mui/material';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { METHODS } from '@constants';
import { useTranslations } from 'next-intl';
import type { JSX } from 'react';

interface ISelectFieldProps {
  value: METHODS;
  onChange: (event: SelectChangeEvent) => void;
}

export const SelectField = ({ value, onChange }: ISelectFieldProps): JSX.Element => {
  const t = useTranslations('restfulPage');

  return (
    <FormControl>
      <InputLabel id="methods">{t('labels.selects.method')}</InputLabel>
      <Select id="methods" value={value} label={'method'} onChange={onChange}>
        {Object.values(METHODS).map(
          (item): JSX.Element => (
            <MenuItem key={item} value={item}>
              {item.toUpperCase()}
            </MenuItem>
          )
        )}
      </Select>
    </FormControl>
  );
};

export default SelectField;
