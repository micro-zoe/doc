import type { ThemeData } from '@vuepress/plugin-theme-data'
import type { Theme } from '@vuepress/core'
import { getDirname, path } from '@vuepress/utils'
import {
  defaultTheme,
  type DefaultThemePluginsOptions,
  DefaultThemeLocaleData
} from '@vuepress/theme-default'

const __dirname = getDirname(import.meta.url)

type DefaultThemeLocaleOptions = DefaultThemeData
type DefaultThemeData = ThemeData<MicroAppThemeLocaleData>

interface MicroAppThemeLocaleData extends DefaultThemeLocaleData {
  anchorToc?: string
}

interface MicroAppThemeOptions extends DefaultThemeLocaleOptions {
  themePlugins?: DefaultThemePluginsOptions
}

const MicroAppTheme = (options: MicroAppThemeOptions): Theme => {
  return {
    name: 'vuepress-theme-microapp',
    extends: defaultTheme(options),

    alias: {
      '@theme/NavbarItems.vue': path.resolve(
        __dirname,
        './components/NavbarItems.vue'
      )
    }
  }
}

export default MicroAppTheme
