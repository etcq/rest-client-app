import { expect, describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Header } from '@components';
import { NextIntlClientProvider } from 'next-intl';
import messages from '../../../messages/en.json';

describe('Header component', () => {
  it('renders the header with navigation links and logo image', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Header />
      </NextIntlClientProvider>
    );
    expect(screen.getByAltText('Logo')).toBeInTheDocument();
    expect(screen.getByTestId('header-btn-login')).toBeInTheDocument();
    expect(screen.getByTestId('header-btn-registration')).toBeInTheDocument();
  });
});
