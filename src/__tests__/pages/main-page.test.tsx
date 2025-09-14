import { expect, describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import messagesEn from '../../../messages/en.json';
import messagesRu from '../../../messages/ru.json';
import MainPage from '@/app/[locale]/(main)/page';
import { MainMenu } from '@/components';

describe('Main page', () => {
  it('Main page should be rendered and have include components', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messagesEn}>
        <MainPage />
      </NextIntlClientProvider>
    );
    expect(screen.getByText(/welcome/i)).toBeInTheDocument();
    expect(screen.getByText(/The development team/i)).toBeInTheDocument();
    expect(screen.getByTestId('main-menu')).toBeInTheDocument();
  });
  it('If localization is set to ru, the title should change', () => {
    render(
      <NextIntlClientProvider locale="ru" messages={messagesRu}>
        <MainPage />
      </NextIntlClientProvider>
    );
    expect(screen.queryByText(/welcome/i)).not.toBeInTheDocument();
    expect(screen.getByText(/добро пожаловать/i)).toBeInTheDocument();
  });
  it('If user unauth, should be unauth menu', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messagesEn}>
        <MainMenu isAuth={false} />
      </NextIntlClientProvider>
    );
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
  });
  it('If user auth, should be auth menu', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messagesEn}>
        <MainMenu isAuth={true} />
      </NextIntlClientProvider>
    );
    expect(screen.queryByRole('button', { name: /sign in/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /sign up/i })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /variables/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /rest client/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /history/i })).toBeInTheDocument();
  });
});
