import type { TemplateName } from './types'
import type { TemplateModule } from './view-types'
const loaders = {
  default: () => import('templates/default'),
  studio: () => import('templates/studio'),
} satisfies Record<TemplateName, () => Promise<TemplateModule>>
export async function createTemplate(name: TemplateName): Promise<TemplateModule> {
  return loaders[name]()
}
