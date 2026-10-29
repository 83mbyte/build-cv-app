// Fonts used to style PDF

import { Spectral, Platypi, Recursive, Ysabeau, Mali, Inconsolata, } from "next/font/google";

const inconsolata = Inconsolata({
    weight: ['300', '400', '500', '600'],
    subsets: ['latin', 'latin-ext', 'vietnamese'],
});

const spectral = Spectral({
    weight: ['300', '400', '500', '600'],
    subsets: ['cyrillic', 'cyrillic-ext', 'latin', 'latin-ext', 'vietnamese'],
    preload: false,
});

const platypi = Platypi({
    weight: ['300', '400', '500', '600'],
    subsets: ['latin', 'latin-ext', 'vietnamese'],
    preload: false,
});

const recursive = Recursive({
    weight: ['300', '400', '500', '600'],
    subsets: ['cyrillic-ext', 'latin', 'latin-ext', 'vietnamese'],
    preload: false,
});

const ysabeau = Ysabeau({
    weight: ['300', '400', '500', '600'],
    subsets: ['cyrillic', 'cyrillic-ext', 'greek', 'latin', 'latin-ext', 'vietnamese'],
    preload: false,
});

const mali = Mali({
    weight: ['300', '400', '500', '600'],
    subsets: ['latin', 'latin-ext', 'thai', 'vietnamese'],
    preload: false,
});


export { spectral, platypi, recursive, ysabeau, mali, inconsolata }

export const fontsFamilyPDF = {
    heading: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    body: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    spectral: 'Spectral, Georgia, "Times New Roman", serif',
    platypi: 'Platypi, Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif',
    recursive: 'Recursive, Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif',
    ysabeau: 'Ysabeau, Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif',
    mali: 'Mali, "Comic Sans MS", cursive, Inter, sans-serif',
    inconsolata: 'Inconsolata, "Courier New", Courier, monospace'
}