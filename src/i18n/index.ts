import { createI18n } from 'vue-i18n'
import zhCN from '@/locales/zh-CN.json'
import zhTW from '@/locales/zh-TW.json'
import en from '@/locales/en.json'

const messages = {
  'zh-CN': zhCN,
  'zh-TW': zhTW,
  'en': en
}

const i18n = createI18n({
  legacy: false,
  locale: 'zh-CN',
  fallbackLocale: 'zh-CN',
  messages
})

export default i18n