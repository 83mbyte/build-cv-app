// Fonts used to style PDF

import { Spectral, Platypi, Recursive, Ysabeau, Mali, Inconsolata, } from "next/font/google";

const inconsolata = Inconsolata({
    weight: ['300', '400', '500', '600'],
    subsets: ['latin'],
});

const spectral = Spectral({
    weight: ['300', '400', '500', '600'],
    subsets: ['latin', 'cyrillic'],
    preload: false,
});

const platypi = Platypi({
    weight: ['300', '400', '500', '600'],
    subsets: ['latin'],
    preload: false,
});

const recursive = Recursive({
    weight: ['300', '400', '500', '600'],
    subsets: ['cyrillic-ext', 'latin'],
    preload: false,
});

const ysabeau = Ysabeau({
    weight: ['300', '400', '500', '600'],
    subsets: ['latin', 'cyrillic'],
    preload: false,
});

const mali = Mali({
    weight: ['300', '400', '500', '600'],
    subsets: ['latin'],
    preload: false,
});


export { spectral, platypi, recursive, ysabeau, mali, inconsolata }

export const fontsFamilyPDF = {
    heading: 'Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
    body: 'Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
    spectral: 'Spectral',
    platypi: 'Platypi',
    recursive: 'Recursive',
    ysabeau: 'Ysabeau',
    mali: 'Mali',
    inconsolata: 'Inconsolata'
}