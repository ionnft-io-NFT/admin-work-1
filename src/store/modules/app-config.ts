import { AppConfigState } from '@/store/types'
import { defineStore } from 'pinia'

import defaultSetting from '@/setting'
import { LayoutMode, PageAnim, SideTheme, ThemeMode, DeviceType } from '../types'

import { useChangeMenuWidth } from '@/hooks/useMenuWidth'
useChangeMenuWidth(defaultSetting.sideWidth)

export function presistSettingInfo(setting: AppConfigState) {
  localStorage.setItem('setting-info', JSON.stringify(setting))
}

const useAppConfigStore = defineStore<string, AppConfigState>('app-config', {
  state: () => {
    return { ...defaultSetting }
  },
  getters: {
    getLayoutMode(state) {
      return state.layoutMode
    },
  },
  actions: {
    changeTheme(theme: ThemeMode) {
      this.theme = theme
    },
    changeLayoutMode(mode: LayoutMode) {
      this.layoutMode = mode
    },
    changeDevice(deviceType: DeviceType) {
      this.deviceType = deviceType
    },
    changeSideBarTheme(sideTheme: SideTheme) {
      this.sideTheme = sideTheme
    },
    changePageAnim(pageAnim: PageAnim) {
      this.pageAnim = pageAnim
    },
    changePrimaryColor(color: string) {
      this.themeColor = color
      presistSettingInfo(
        Object.assign(this.$state, {
          themeColor: color,
        })
      )
    },
    changeSideWith(sideWidth: number) {
      this.sideWidth = sideWidth
      const r = document.querySelector(':root') as HTMLElement
      r.style.setProperty('--menu-width', sideWidth + 'px')
    },
    toggleCollapse(isCollapse: boolean) {
      this.isCollapse = isCollapse
    },
  },
  presist: true,
})

export default useAppConfigStore
