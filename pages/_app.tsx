import { ConfigProvider } from 'antd';
import type { AppProps } from 'next/app';
import theme from '@/components/theme/themeConfig';
import "@/styles/globals.css";
import fa_IR from "antd/lib/locale/fa_IR";
import Main from "@/components/layout/layout";

const App = ({ Component, pageProps }: AppProps) => (
   <ConfigProvider  locale={fa_IR} direction="rtl" theme={theme}>
       <Main>
             <Component {...pageProps} />
       </Main>
   </ConfigProvider>
);

export default App;