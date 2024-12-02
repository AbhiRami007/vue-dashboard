<template>
  <div class="container">
    <!-- Sticky Navigation Bar -->
    <div class="stickybar">
      <div class="stickybarContent">
        <i
          class="fa-solid fa-bars stickybar-icon"
          @click="toggleSidebar"
          aria-hidden="true"
        ></i>
        <h1>Dashboard</h1>
      </div>
    </div>
    <!-- Sidebar -->
    <div ref="sidebar" :class="['sidebar', { visible: sidebarVisible }]">
      <div class="sidebar-content">
        <router-link to="/dashboard" class="sidebar-link" @click="toggleSidebar"
          ><i class="fa-solid fa-house stickybar-icon" aria-hidden="true"></i
          >Home</router-link
        >
        <router-link to="/weather" class="sidebar-link" @click="toggleSidebar">
          <i class="fa-solid fa-cloud stickybar-icon" aria-hidden="true"></i
          >Weather</router-link
        >
        <router-link to="/news" class="sidebar-link" @click="toggleSidebar">
          <i class="fa-solid fa-newspaper stickybar-icon" aria-hidden="true"></i
          >News</router-link
        >
        <router-link to="/space" class="sidebar-link" @click="toggleSidebar">
          <i class="fa-solid fa-rocket stickybar-icon" aria-hidden="true"></i
          >NASA Space</router-link
        >
        <router-link to="/users" class="sidebar-link" @click="toggleSidebar">
          <i class="fa-solid fa-user stickybar-icon" aria-hidden="true"></i>All
          Users</router-link
        >
        <router-link to="/chart" class="sidebar-link" @click="toggleSidebar">
          <i class="fa-solid fa-chart-simple stickybar-icon" aria-hidden="true"></i>
          Data Chart</router-link
        >
        <router-link
          to="/logout"
          class="sidebar-link logout"
          @click="toggleSidebar"
        >
          <i
            class="fa-solid fa-right-from-bracket stickybar-icon"
            aria-hidden="true"
          ></i
          >Logout</router-link
        >
      </div>
    </div>

    <!-- Content -->
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sidebarVisible: false,
    };
  },
  methods: {
    toggleSidebar() {
      this.sidebarVisible = !this.sidebarVisible;
    },
    handleClickOutside(event) {
      if (this.$refs.sidebar && !this.$refs.sidebar.contains(event.target)) {
        this.sidebarVisible = false;
      }
    },
  },
  watch: {
    sidebarVisible(newVal) {
      if (newVal) {
        document.addEventListener("mousedown", this.handleClickOutside);
      } else {
        document.removeEventListener("mousedown", this.handleClickOutside);
      }
    },
  },
  // beforeDestroy() {
  //   document.removeEventListener("mousedown", this.handleClickOutside);
  // },
};
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: -250px;
  width: 250px;
  height: 100%;
  background-color: rgb(253, 253, 253);
  padding-top: 20px;
  transition: 0.3s ease-in-out;
  z-index: 1000;
}

.sidebar.visible {
  left: 0;
}

.sidebar-content {
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.sidebar-link {
  color: #0471f6;
  padding: 10px 15px;
  text-decoration: none;
  font-size: 18px;
  transition: 0.2s;
}

.sidebar-link:hover {
  background-color: #0471f6;
  color: white;
}

.sidebar-link .icon {
  margin-right: 10px;
  font-size: 1.2em; /* Adjust size as needed */
}

.stickybar {
  position: fixed;
  top: 0;
  width: 100%;
  left: -5px;
  background-color: #0471f6;
  color: white;
  padding: 10px 20px;
  z-index: 999;
}

.stickybarContent {
  display: flex;
  align-items: center;
}

.stickybar-icon {
  font-size: 24px;
  margin-right: 10px;
  cursor: pointer;
}

.content {
  margin-top: 50px;
  padding: 20px;
}
</style>
