import { Box } from '@mui/material';
import { useState } from 'react';
import type { JSX } from 'react';
import Tabs from '@/components/tabs/tab';

export interface ITabItem {
  id: string;
  label: string;
  content: JSX.Element;
}
interface ITabContainerProps {
  tabs: ITabItem[];
  defaultActiveTab?: string;
}

export default function TabContainer({ tabs, defaultActiveTab }: ITabContainerProps): JSX.Element {
  const [activeTab, setActiveTab] = useState<string>(defaultActiveTab ?? tabs[0].id);
  const activeContent = tabs.find((tab) => tab.id === activeTab)?.content;

  return (
    <Box>
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      <Box sx={{ overflow: 'auto', maxHeight: '30vh', mt: 1 }}>{activeContent}</Box>
    </Box>
  );
}
