'use client'

import { Provider } from 'react-redux';
import store from './redux/store';
import Header from './components/Header';
import './globals.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <html lang="en">
              <body>
                <Header />
                <main>{children}</main>
              </body>
            </html>
    </Provider>
     
  );
}
