import { expect, describe, it, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { renderResponseBody } from '@/utils/render-response-body';
import type { JSX, ClassAttributes, ImgHTMLAttributes } from 'react';

vi.mock('next/image', () => ({
  __esModule: true,
  default: (
    props: JSX.IntrinsicAttributes & ClassAttributes<HTMLImageElement> & ImgHTMLAttributes<HTMLImageElement>
  ) => <img {...props} />,
}));

const mockTranslation = vi.fn((key: string) => {
  if (key === 'unsupportedContentType') {
    return 'Unsupported Content Type';
  }
  return key;
});

describe('renderResponseBody', () => {
  beforeEach(() => {
    mockTranslation.mockClear();
  });

  it('should render a text message when body is null', () => {
    render(renderResponseBody(null, mockTranslation));
    expect(screen.getByText('Unsupported Content Type')).toBeInTheDocument();
  });

  it('should render an image when body is a blob URL string', () => {
    const blobUrl = 'blob:http://localhost:3000/12345';
    render(renderResponseBody(blobUrl, mockTranslation));

    const image = screen.getByRole('img', { name: 'Response image' });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', blobUrl);
    expect(image).toHaveAttribute('width', '300');
    expect(image).toHaveAttribute('height', '200');
  });

  it('should render the body as plain text when it is a simple string', () => {
    const plainText = 'This is a plain text response.';
    render(renderResponseBody(plainText, mockTranslation));

    const typography = screen.getByText(plainText);
    expect(typography).toBeInTheDocument();
    expect(typography.tagName).toBe('PRE');
  });

  it('should render the body as a highlighted JSON object', () => {
    const jsonBody = {
      user: {
        id: 1,
        name: 'John Doe',
      },
    };
    render(renderResponseBody(jsonBody, mockTranslation));

    const codeElement = screen.getByText(/John Doe/);
    expect(codeElement).toBeInTheDocument();
    expect(codeElement).toHaveClass('token');
  });
});
