import { Link } from '@/i18n/navigation';
import { Container, Box, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import { layoutConfig } from '@/constants';
const githubNames = ['turik777', 'aQafresca', 'etcq'];

const github = 'https://github.com/';
const school = 'https://rs.school/';

export const Footer = () => {
  return (
    <Container
      sx={{
        borderTop: '1px solid #e0e0e0',
        pt: 1,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 5,
        bottom: 0,
        height: layoutConfig.footerHeight,
      }}
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
        {githubNames.map((name) => (
          <Link href={`${github}${name}`} target="_blank" key={name}>
            <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
              <GitHubIcon sx={{ fontSize: 'small' }} />
              <span>{name}</span>
            </Box>
          </Link>
        ))}
      </Box>
      <Typography variant="h5" width={200} sx={{ textAlign: 'center' }}>
        {new Date().getFullYear()}
      </Typography>
      <Box width={200} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Link href={school}>
          <Image src={'/images/rsschool.png'} alt="School logo" width={40} height={40} />
        </Link>
      </Box>
    </Container>
  );
};
