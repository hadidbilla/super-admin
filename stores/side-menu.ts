import { defineStore } from "pinia";
// @ts-ignore
import { Icon } from "@/base-components/Lucide/Lucide.vue";
import {
  CalendarIcon,
  FileIcon,
  FolderIcon,
  GrapeIcon,
  HomeIcon,
  UsersIcon,
} from "lucide-vue-next";

export interface Menu {
  icon: Icon;
  name: string;
  path?: string;
  subMenu?: Menu[];
  ignore?: boolean;
  customIcon?: string;
  permissions?: string[];
  current?: boolean;
}

export interface SideMenuState {
  menu: Menu[];
}

export const useSideMenuStore = defineStore("sideMenu", {
  state: (): SideMenuState => ({
    menu: [
      { name: "Dashboard", path: "/", icon: HomeIcon, current: true },
      { name: "User", path: "/user", icon: UsersIcon, current: false },
      { name: "Order", path: "/order", icon: FileIcon, current: false },
      // { name: 'Calendar', path: '/', icon: CalendarIcon, current: false },
      // { name: 'Documents', path: '/', icon: FileIcon, current: false },
      // { name: 'Reports', path: '/', icon: GrapeIcon, current: false },
    ],
  }),
  actions: {
    setCurrentMenu(menu: Menu) {
      this.menu.forEach((item) => {
        item.current = false;
      });
      menu.current = true;
    },
  },
});
