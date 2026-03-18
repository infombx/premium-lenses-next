import aiBlueImg from 'figma:asset/46eeb3acb000d1d9c67849839d8bb58826ad7cf0.png';
import angelesFeGrayImg from 'figma:asset/9df734578fd00850cfca82d6e2baf4d4f6c82c72.png';
import aiBrownImg from 'figma:asset/1395f0e8bb30a5bd0b8890dd8e066c3b9af16c30.png';
import amazonBrownImg from 'figma:asset/6bad5898c7dc648aded9f21c9357d84cf35c7c7e.png';
import amazonBlueImg from 'figma:asset/f838456e849b96362d57362433420570e70bbf52.png';
import amazonGreenImg from 'figma:asset/5c61885e8eda927fa62849171643a7230f66f7c8.png';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  features: string[];
  specs?: {
    dia?: string;
    bc?: string;
    pieces?: string;
    duration?: string;
    material?: string;
    waterContent?: string;
    madeIn?: string;
  };
}

export const products: Product[] = [
  {
    id: 1,
    name: 'AI Blue',
    price: 25,
    image: aiBlueImg,
    category: 'COLORED SHADES',
    description: 'Premium colored contact lenses with stunning AI Blue shade. Perfect for transforming your look with natural-looking enhancement.',
    features: [
      'DIA size: 14.2mm',
      'B.C: 8.7mm',
      '2 pieces (1 pair) in 1 box, stored in separate blister',
      '1 Year',
      'Hydrogel Lens',
      'Water Content: 40%',
      'Made in Korea'
    ],
    specs: {
      dia: '14.2mm',
      bc: '8.7mm',
      pieces: '2 pieces (1 pair) in 1 box, stored in separate blister',
      duration: '1 Year',
      material: 'Hydrogel Lens',
      waterContent: '40%',
      madeIn: 'Korea'
    }
  },
  {
    id: 2,
    name: 'Angeles Fe Gray',
    price: 28,
    image: angelesFeGrayImg,
    category: 'COLORED SHADES',
    description: 'Premium colored contact lenses with stunning Angeles Fe Gray shade. Perfect for transforming your look with natural-looking enhancement.',
    features: [
      'DIA size: 14.5mm',
      'B.C: 8.8mm',
      '2 pieces (1 pair) in 1 box, stored in a separate blister',
      '1 Year',
      'Hydrogel Lens',
      'Water Content: 40%',
      'Made in Korea'
    ],
    specs: {
      dia: '14.5mm',
      bc: '8.8mm',
      pieces: '2 pieces (1 pair) in 1 box, stored in a separate blister',
      duration: '1 Year',
      material: 'Hydrogel Lens',
      waterContent: '40%',
      madeIn: 'Korea'
    }
  },
  {
    id: 3,
    name: 'AI Brown',
    price: 25,
    image: aiBrownImg,
    category: 'COLORED SHADES',
    description: 'Premium colored contact lenses with stunning AI Brown shade. Perfect for transforming your look with natural-looking enhancement.',
    features: [
      'DIA size: 14.2mm',
      'B.C: 8.7mm',
      '2 pieces (1 pair) in 1 box, stored in separate blister',
      '1 Year',
      'Hydrogel Lens',
      'Water Content: 40%',
      'Made in Korea'
    ],
    specs: {
      dia: '14.2mm',
      bc: '8.7mm',
      pieces: '2 pieces (1 pair) in 1 box, stored in separate blister',
      duration: '1 Year',
      material: 'Hydrogel Lens',
      waterContent: '40%',
      madeIn: 'Korea'
    }
  },
  {
    id: 4,
    name: 'Amazon Brown',
    price: 28,
    image: amazonBrownImg,
    category: 'COLORED SHADES',
    description: 'Premium colored contact lenses with stunning Amazon Brown shade. Perfect for transforming your look with natural-looking enhancement.',
    features: [
      'DIA size: 14.0mm',
      'B.C: 8.6mm',
      '2 pieces (1 pair) in 1 box, stored in a separate blister',
      '1 Year',
      'Hydrogel Lens',
      'Water Content: 40%',
      'Made in Korea'
    ],
    specs: {
      dia: '14.0mm',
      bc: '8.6mm',
      pieces: '2 pieces (1 pair) in 1 box, stored in a separate blister',
      duration: '1 Year',
      material: 'Hydrogel Lens',
      waterContent: '40%',
      madeIn: 'Korea'
    }
  },
  {
    id: 5,
    name: 'Amazon Blue',
    price: 28,
    image: amazonBlueImg,
    category: 'COLORED SHADES',
    description: 'Premium colored contact lenses with stunning Amazon Blue shade. Perfect for transforming your look with natural-looking enhancement.',
    features: [
      'DIA size: 14.0mm',
      'B.C: 8.6mm',
      '2 pieces (1 pair) in 1 box, stored in a separate blister',
      '1 Year',
      'Hydrogel Lens',
      'Water Content: 40%',
      'Made in Korea'
    ],
    specs: {
      dia: '14.0mm',
      bc: '8.6mm',
      pieces: '2 pieces (1 pair) in 1 box, stored in a separate blister',
      duration: '1 Year',
      material: 'Hydrogel Lens',
      waterContent: '40%',
      madeIn: 'Korea'
    }
  },
  {
    id: 6,
    name: 'Amazon Green',
    price: 28,
    image: amazonGreenImg,
    category: 'COLORED SHADES',
    description: 'Premium colored contact lenses with stunning Amazon Green shade. Perfect for transforming your look with natural-looking enhancement.',
    features: [
      'DIA size: 14.0mm',
      'B.C: 8.6mm',
      '2 pieces (1 pair) in 1 box, stored in a separate blister',
      '1 Year',
      'Hydrogel Lens',
      'Water Content: 40%',
      'Made in Korea'
    ],
    specs: {
      dia: '14.0mm',
      bc: '8.6mm',
      pieces: '2 pieces (1 pair) in 1 box, stored in a separate blister',
      duration: '1 Year',
      material: 'Hydrogel Lens',
      waterContent: '40%',
      madeIn: 'Korea'
    }
  }
];

export const categories = [
  'ALL ITEMS',
  'COLORED SHADES',
  'PRESCRIBED SHADES',
  'SOLUTIONS'
];