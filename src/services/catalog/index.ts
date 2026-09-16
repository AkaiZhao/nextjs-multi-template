import type { Project } from './types'
const projects: Project[] = [
  {
    id: 'tidal-atlas',
    title: 'Tidal Atlas',
    category: 'digital',
    year: '2026',
    image: '/art/tidal.svg',
    tags: ['ocean', 'mapping', '海洋'],
    description: {
      'en-US': 'A quieter way to explore the rhythm of the coast.',
      'zh-TW': '用更安靜的方式，探索海岸與潮汐的節奏。',
    },
  },
  {
    id: 'common-ground',
    title: 'Common Ground',
    category: 'identity',
    year: '2026',
    image: '/art/ground.svg',
    tags: ['community', 'type', '社群'],
    description: {
      'en-US': 'A visual language for places that bring us together.',
      'zh-TW': '為讓人相聚的地方，打造共同的視覺語言。',
    },
  },
  {
    id: 'soft-signal',
    title: 'Soft Signal',
    category: 'experiment',
    year: '2026',
    image: '/art/signal.svg',
    tags: ['sound', 'motion', '聲音'],
    description: {
      'en-US': 'Making room for the shape of a sound.',
      'zh-TW': '讓聲音有形狀，也讓想像有空間。',
    },
  },
  {
    id: 'paper-trails',
    title: 'Paper Trails',
    category: 'digital',
    year: '2025',
    image: '/art/paper.svg',
    tags: ['reading', 'paper', '閱讀'],
    description: {
      'en-US': 'A reading journal for the thoughts between the lines.',
      'zh-TW': '把字裡行間的想法，收進閱讀日誌。',
    },
  },
  {
    id: 'still-life',
    title: 'Still / Life',
    category: 'identity',
    year: '2025',
    image: '/art/still.svg',
    tags: ['objects', 'space', '生活'],
    description: {
      'en-US': 'Everyday objects, seen from a different angle.',
      'zh-TW': '換一個角度，重新看見日常物件。',
    },
  },
  {
    id: 'after-hours',
    title: 'After Hours',
    category: 'experiment',
    year: '2025',
    image: '/art/hours.svg',
    tags: ['light', 'color', '光線'],
    description: {
      'en-US': 'An experiment in color after the city falls quiet.',
      'zh-TW': '城市安靜下來之後，一場關於色彩的實驗。',
    },
  },
]
/** Local adapter. A future HTTP adapter can preserve this domain return type. */
export async function getProjects(): Promise<Project[]> {
  return projects
}
