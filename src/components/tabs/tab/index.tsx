import { Box, Button } from '@mui/material';
import type { JSX } from 'react';

interface ITab {
  id: string;
  label: string;
}
interface ITabsProps {
  tabs: ITab[];
  activeTab: string;
  onChange: (id: string) => void;
}

export default function Tabs({ tabs, activeTab, onChange }: ITabsProps): JSX.Element {
  return (
    <Box sx={{ display: 'flex', gap: '10px' }}>
      {tabs.map(
        (tab: ITab): JSX.Element => (
          <Button
            key={tab.id}
            size="small"
            variant={activeTab === tab.id ? 'contained' : 'outlined'}
            onClick={() => onChange(tab.id)}
            sx={{ border: 'none', borderBottom: '1px solid' }}
          >
            {tab.label}
          </Button>
        )
      )}
    </Box>
  );
}
