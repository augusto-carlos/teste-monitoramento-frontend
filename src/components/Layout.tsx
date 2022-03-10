import React, { ReactNode } from 'react';
import Link from 'next/link';
import Head from 'next/head';

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = 'This is the default title' }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link href="/dist/output.css" rel="stylesheet" />
    </Head>

    {children}
    <footer className="px-5">
      <hr />
      <section>
        <p className="text-center my-4 text-slate-600">
          developed by{' '}
          <a
            href="https://github.com/augusto-carlos"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="font-bold text-zinc-800">Augusto da Silva</span>
          </a>
        </p>
      </section>
    </footer>
  </div>
);

export default Layout;
