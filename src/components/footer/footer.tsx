import { Link } from '@/i18n/navigation';
import { Container, Box, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import { layoutConfig } from '@/constants';
import { github, teamPersonsInfo } from '@/constants';

const school = 'https://rs.school/';

export const Footer = () => {
  return (
    <Container
      component="footer"
      sx={{
        borderTop: 1,
        borderColor: 'divider',
        bgcolor: '#0a0a0a',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 5,
        bottom: 0,
        height: layoutConfig.footerHeight,
        zIndex: 10,
        position: 'relative',
      }}
      data-testid="footer"
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: { sm: 2, xs: 0 },
          flexDirection: { xs: 'column', sm: 'row' },
        }}
        width={200}
      >
        {teamPersonsInfo.map((person) => (
          <Link
            href={`${github}${person.githubName}`}
            target="_blank"
            key={person.githubName}
            data-testid={`link-person`}
          >
            <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
              <GitHubIcon sx={{ fontSize: 'small' }} />
              <span>{person.githubName}</span>
            </Box>
          </Link>
        ))}
      </Box>
      <Typography variant="h5" width={200} sx={{ textAlign: 'center' }} data-testid="footer-year">
        {new Date().getFullYear()}
      </Typography>
      <Box width={200} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Link href={school} data-testid="school-link">
          <Image src={'/images/rsschool.png'} alt="School logo" width={40} height={40} />
        </Link>
      </Box>
    </Container>
  );
};
