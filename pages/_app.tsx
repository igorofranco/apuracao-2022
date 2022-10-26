import React from 'react';
import type { AppProps } from 'next/app';
import 'css-reset-and-normalize/scss/reset-and-normalize.scss';
import 'css-reset-and-normalize/scss/button-reset.scss';
import 'css-reset-and-normalize/scss/link-reset.scss';

export default function App ({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
