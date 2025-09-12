import { expect, describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Footer } from '@components';
import { NextIntlClientProvider } from 'next-intl';
import messagesEn from '../../../messages/en.json';
import { teamPersonsInfo } from '@/constants';

describe('Footer component', () => {
  it('footer component should be rendered', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messagesEn}>
        <Footer />
      </NextIntlClientProvider>
    );
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
  it('footer should be contain school link and team persons link', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messagesEn}>
        <Footer />
      </NextIntlClientProvider>
    );
    const teamLinks = screen.getAllByTestId('link-person');
    const personsGithubName = teamPersonsInfo.map((person) => person.githubName);
    expect(screen.getByTestId('school-link')).toHaveAttribute('href', 'https://rs.school/');
    expect(teamLinks).toHaveLength(3);
    teamLinks.map((link) => {
      expect(personsGithubName).toContain(link.textContent);
    });
  });
  it('footer should be current year', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messagesEn}>
        <Footer />
      </NextIntlClientProvider>
    );
    const currentYear = new Date().getFullYear();
    expect(screen.getByTestId('footer-year')).toHaveTextContent(String(currentYear));
  });
});
