import type { Project } from './types'
const projects: Project[] = [
  {
    id: 'template-registry',
    title: 'Template registry',
    category: 'identity',
    tags: ['templates', 'registry', '版型'],
    description: {
      'en-US': 'Each template exports its own layout and pages through one shared registry.',
      'zh-TW': '透過共用 registry 載入版型，各版型各自實作 layout、pages 與 styles。',
    },
  },
  {
    id: 'server-configuration',
    title: 'Server configuration',
    category: 'identity',
    tags: ['cookie', 'SSR', '設定'],
    description: {
      'en-US': 'Validate SiteConfig on the server and read its cookie for the initial render.',
      'zh-TW': '在伺服器驗證 SiteConfig，首次渲染就讀取 cookie 套用版型配置。',
    },
  },
  {
    id: 'shared-favorites',
    title: 'Shared favorites',
    category: 'digital',
    tags: ['zustand', 'localStorage', '收藏'],
    description: {
      'en-US': 'Share a Zustand store across templates and persist favorites in this browser.',
      'zh-TW': '各版型共用 Zustand store，收藏透過 localStorage 保留在瀏覽器。',
    },
  },
  {
    id: 'url-filters',
    title: 'URL filters',
    category: 'digital',
    tags: ['search', 'URL', '搜尋'],
    description: {
      'en-US': 'Keep search and category filters in the URL for reloads and shareable links.',
      'zh-TW': '搜尋與分類保存在 URL，重新整理或分享連結都能保留條件。',
    },
  },
  {
    id: 'theme-tokens',
    title: 'Theme tokens',
    category: 'experiment',
    tags: ['tailwind', 'CSS', '配色'],
    description: {
      'en-US': 'Use Tailwind CSS 4 and semantic CSS variables for palettes and light or dark mode.',
      'zh-TW': '使用 Tailwind CSS 4 與語意 CSS 變數切換配色、明暗模式及自訂強調色。',
    },
  },
  {
    id: 'locale-routing',
    title: 'Locale routing',
    category: 'experiment',
    tags: ['i18n', 'locale', '語系'],
    description: {
      'en-US': 'Use explicit URLs, saved preferences, and browser language to resolve the locale.',
      'zh-TW': '依網址、已儲存偏好與瀏覽器語言決定語系，示範繁體中文與英文。',
    },
  },
]
/** Local examples of this project's implemented frontend capabilities. */
export async function getProjects(): Promise<Project[]> {
  return projects
}
