import { NextResponse } from 'next/server';
import type { IRequestData } from '@interfaces';

export async function POST(req: Request) {
  try {
    const data: IRequestData = await req.json();

    const headersObject: Record<string, string> = {};
    data.headers.forEach(({ key, value }) => {
      if (key) headersObject[key] = value;
    });

    const fetchOptions: RequestInit = {
      method: data.method,
      headers: headersObject,
      body: ['GET', 'HEAD'].includes(data.method.toUpperCase()) ? undefined : data.body,
    };

    const res = await fetch(data.url, fetchOptions);

    const contentType = res.headers.get('content-type') || '';
    let responseBody;

    if (contentType.includes('application/json')) {
      responseBody = await res.json();
    } else {
      responseBody = await res.text();
    }

    return NextResponse.json({ status: res.status, body: responseBody });
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
