import DefaultTheme from 'vitepress/theme'
import PasswordGate from './PasswordGate.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout: PasswordGate
}
