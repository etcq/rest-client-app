import { expect, describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Header } from '@components';
import { NextIntlClientProvider } from 'next-intl';
import messagesEn from '../../../messages/en.json';
import messagesRu from '../../../messages/ru.json';

describe('Header component', () => {
  it('renders the header with navigation links, logo image and language selector', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messagesEn}>
        <Header />
      </NextIntlClientProvider>
    );
    expect(screen.getByAltText('Logo')).toBeInTheDocument();
    expect(screen.getByTestId('header-btn-login')).toBeInTheDocument();
    expect(screen.getByTestId('header-btn-registration')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });
  it('If the locale is RU, the text in the header should be translated for child components', () => {
    render(
      <NextIntlClientProvider locale="ru" messages={messagesRu}>
        <Header />
      </NextIntlClientProvider>
    );
    expect(screen.getByTestId('header-btn-login')).toHaveTextContent('Войти');
    expect(screen.getByTestId('header-btn-registration')).toHaveTextContent('Зарегестрироваться');
    expect(screen.getByRole('combobox')).toHaveTextContent('RU');
  });
});
