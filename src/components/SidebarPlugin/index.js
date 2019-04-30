import Sidebar from "./SideBar.vue";
import SidebarLink from "./SidebarLink";
import UserProfile from "./UserProfile";
import SidebarLinkGroup from "./SidebarLinkGroup";

const SidebarStore = {
  showSidebar: false,
  sidebarLinks: [],
  displaySidebar(value) {
    this.showSidebar = value;
  }
};

const SidebarPlugin = {
  install(Vue) {
    let app = new Vue({
      data: {
        sidebarStore: SidebarStore
      }
    });

    Vue.prototype.$sidebar = app.sidebarStore;
    Vue.component("side-bar", Sidebar);
    Vue.component("sidebar-link", SidebarLink);
    Vue.component("user-profile", UserProfile);
    Vue.component("sidebar-link-group", SidebarLinkGroup);
  }
};

export default SidebarPlugin;
