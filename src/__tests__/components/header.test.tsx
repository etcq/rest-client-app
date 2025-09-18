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
    expect(screen.getAllByTestId('header-btn-login')).toHaveLength(2);
    expect(screen.getAllByTestId('header-btn-registration')).toHaveLength(2);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });
  it('If the locale is RU, the text in the header should be translated for child components', () => {
    render(
      <NextIntlClientProvider locale="ru" messages={messagesRu}>
        <Header />
      </NextIntlClientProvider>
    );
    expect(screen.getAllByTestId('header-btn-login')[0]).toHaveTextContent('Войти');
    expect(screen.getAllByTestId('header-btn-registration')[0]).toHaveTextContent('Зарегестрироваться');
    expect(screen.getByRole('combobox')).toHaveTextContent('RU');
  });
});
