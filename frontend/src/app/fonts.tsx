import { Inter, Open_Sans, Poppins, Montserrat, Noto_Sans } from 'next/font/google';

const inter = Inter({ weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],subsets: ['latin']  });
const openSans = Open_Sans({ weight: [ '300', '400', '500', '600', '700', '800'] ,subsets: ['latin']});
const poppins = Poppins({ weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],subsets: ['latin'] });
const montserrat = Montserrat({ weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] ,subsets: ['latin']});
const notoSans = Noto_Sans({ weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] ,subsets: ['latin']});


export { inter, openSans, poppins, montserrat, notoSans };
