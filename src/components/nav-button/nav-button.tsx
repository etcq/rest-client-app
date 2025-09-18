import { Button } from '@mui/material';
import { Link } from '@i18n/navigation';
import type { SessionStatus } from '@interfaces';

interface INavButton {
  status?: SessionStatus;
  text: string;
  path: string;
  onClick?: () => void;
}

export const NavButton = ({ status, text, path, onClick }: INavButton) => {
  const content = onClick ? text : <Link href={path}>{text}</Link>;
  return (
    <Button
      sx={{ color: '#fff' }}
      loading={status === 'loading'}
      data-testid={`header-btn-${path.slice(1)}`}
      onClick={onClick}
      variant="outlined"
    >
      {content}
    </Button>
  );
};
