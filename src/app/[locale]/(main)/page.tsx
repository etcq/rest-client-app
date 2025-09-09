import { MainMenu } from '@components';
import { Avatar, Box, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import React from 'react';
import { github, teamPersonsInfo } from '@/constants';

const avatarEndpoint = '.png?size=50';

export default function Home() {
  const t = useTranslations('MainPage');
  const isAuth = false;
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        alignItems: 'center',
        height: '100%',
        justifyContent: 'center',
      }}
    >
      <Typography variant="h1" sx={{ mb: 4, textAlign: 'center', fontWeight: 700 }}>
        {isAuth ? t('titleAuth') : t('titleUnauth')}
      </Typography>
      <Box sx={{ my: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography width={600}>{t('description')}</Typography>
        <Typography sx={{ mt: 4 }} variant="h4">
          {t('createdBy')}
        </Typography>
        <List sx={{ width: '100%', maxWidth: 300 }}>
          {teamPersonsInfo.map((person, index) => (
            <Box key={person.githubName}>
              {index !== 0 && <Divider />}
              <ListItem>
                <ListItemAvatar>
                  <Avatar alt={person.githubName} src={`${github}${person.githubName}${avatarEndpoint}`} />
                </ListItemAvatar>
                <ListItemText primary={person.fullName} secondary={person.githubName} />
              </ListItem>
            </Box>
          ))}
        </List>
      </Box>
      <MainMenu isAuth={isAuth} />
    </Box>
  );
}
