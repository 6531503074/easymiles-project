<!-- Header.vue -->
<template>
  <header class="header">
    <div>
      <a href="/home">
        <img class="logo" src="@/assets/logo.png" alt="EasyMiles" style="width: 220px;" />
      </a>
      <div class="input-container">
        <font-awesome-icon :icon="['fas', 'magnifying-glass']" style="color: #E0E0E0;" />
        <input type="text" placeholder="Search something here..." class="search-bar" />
      </div>
    </div>
    <nav class="nav-icons" style="color: white;">
      <!-- <a href="/favorite">
        <font-awesome-icon :icon="['fas', 'heart']" class="icon" />
      </a> -->
      <!-- Notification Icon -->
      <div class="notification-container" @click.stop="toggleNotificationMenu">
        <font-awesome-icon :icon="['fas', 'bell']" class="icon" />
        <span v-if="hasUnreadNotifications" class="notification-dot"></span>
        <div v-if="showNotificationMenu" class="notification-menu" @click.stop>
          <h4>Notifications</h4>
          <ul>
            <li v-for="(notification, index) in notifications" :key="index">
              <img :src="getImageUrl(notification.notification_car_image)" @error="onImageError" alt="Car Image"
                class="notification-car-img" />
              <div>
                {{ notification.message }}
              </div>
              <span class="time">{{ formatDateTime(notification.timestamp) }}</span>
            </li>
            <li v-if="notifications.length === 0">No notifications</li>
          </ul>
        </div>
      </div>

      <!-- Avatar and Dropdown Container -->
      <div class="avatar-container" @click.stop="toggleMenu">
        <img :src="getImageUrl(this.avatar)" alt="Avatar" @error="onImageError" class="avatar" />
        <div v-if="showMenu" class="dropdown-menu" @click.stop>
          <div class="profile-info">
            <img :src="getImageUrl(this.avatar)" alt="Profile" class="profile-avatar" />
            <h3>{{ userName }}</h3>
          </div>
          <hr />
          <div class="menu-item" @click="goToCard">
            <font-awesome-icon :icon="['fas', 'gear']" /> Setting
          </div>
          <div class="menu-item" @click="goToHistory">
            <font-awesome-icon :icon="['fas', 'history']" /> History
          </div>
          <div class="menu-item" @click="logout">
            <font-awesome-icon :icon="['fas', 'sign-out-alt']" /> Logout
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>


<script>
import axios from 'axios';

export default {
  data() {
    return {
      showMenu: false,
      userName: '',
      email: '',
      userDId: '',
      avatar: '',
      showNotificationMenu: false,
      notifications: [],
    };
  },
  computed: {
    hasUnreadNotifications() {
      return this.notifications.some(notification => !notification.read);
    },
    sortedNotifications() {
      return this.notifications.slice().sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    },
  },
  watch: {
    notifications: {
      handler(newVal) {
        // Check if there are any unread notifications
        this.hasUnreadNotifications = newVal.some(notification => !notification.read);
      },
      immediate: true,
      deep: true,
    },
  },
  async mounted() {
    const token = localStorage.getItem("jwt");
    if (token) {
      try {

        // Fetch user details
        const userResponse = await axios.get(`http://localhost:1337/api/users/me?populate=*`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.userName = userResponse.data.username;
        this.email = userResponse.data.email;
        this.userDId = userResponse.data.documentId;
        this.avatar = userResponse.data.profilePicture.url;

      } catch (error) {
        console.error("Error fetching data from Strapi:", error);
      }
    } else {
      console.warn("No JWT token found. Please log in first.");
    }
    await this.fetchNotifications();
    this.startNotificationPolling();
    document.addEventListener('click', this.handleOutsideClick);
  },
  beforeDestroy() {
    // Clear the polling interval when component is destroyed
    document.removeEventListener('click', this.handleOutsideClick);
    clearInterval(this.notificationInterval);
  },
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    toggleNotificationMenu() {
      this.showNotificationMenu = !this.showNotificationMenu;
      if (this.showNotificationMenu) {
        this.markAllAsRead();
      }
    },
    logout() {
      localStorage.removeItem("jwt");
      this.$router.push('/');
    },
    getImageUrl(path) {
      return path ? `${import.meta.env.VITE_STRAPI_URL}${path}` : 'https://via.placeholder.com/150';
    },
    onImageError(event) {
      event.target.src = 'https://www.gravatar.com/avatar/?d=mp';
    },
    goToCard() {
      this.$router.push('/card');
    },
    goToHistory() {
      this.$router.push('/HistoryPage');
    },
    async fetchNotifications() {
      const token = localStorage.getItem("jwt");
      // console.log(this.userDId);
      try {
        const response = await axios.get(`http://localhost:1337/api/notifications?filters[users_permissions_user][documentId][$eq]=${this.userDId}&populate[users_permissions_user][populate]=profilePicture&populate[car][populate]=model_image`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.notifications = response.data.data.map(notification => {
          const carImageUrl = notification.car
            ? notification.car.model_image.url
            : 'https://www.gravatar.com/avatar/?d=mp';

          return {
            ...notification.attributes,
            id: notification.id,
            documentId: notification.documentId,
            message: notification.message,
            timestamp: notification.timestamp,
            read: notification.read,
            notification_car_image: carImageUrl,
          };
        });
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    },
    startNotificationPolling() {
      // Poll for new notifications every 30 seconds
      this.notificationInterval = setInterval(this.fetchNotifications, 1000);
      this.fetchNotifications(); // Initial fetch
    },
    async markAllAsRead() {
      const token = localStorage.getItem("jwt");
      try {
        const unreadNotifications = this.notifications.filter(notification => !notification.read);

        // Update each unread notification to mark it as read
        const updatePromises = unreadNotifications.map(notification =>
          axios.put(`http://localhost:1337/api/notifications/${notification.documentId}`, {
            data: { read: true },
          }, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        );

        await Promise.all(updatePromises);

        // Update local state
        this.notifications.forEach(notification => {
          notification.read = true;
        });
      } catch (error) {
        console.error("Error marking notifications as read:", error);
      }
    },
    formatDateTime(timestamp) {
      return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date(timestamp));
    },
    handleOutsideClick(event) {
      const notificationContainer = this.$el.querySelector('.notification-container');
      const avatarContainer = this.$el.querySelector('.avatar-container');

      if (
        notificationContainer && !notificationContainer.contains(event.target) &&
        avatarContainer && !avatarContainer.contains(event.target)
      ) {
        this.showMenu = false;
        this.showNotificationMenu = false;
      }
    },
  },
};
</script>

<style scoped>
.header {
  max-height: 120px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 50px;
  border-bottom: 1px solid #2e2e2e;
}

.logo {
  margin-right: 50px;
  width: 220px;
}

.header div {
  display: flex;
  align-items: center;
}

.input-container {
  display: flex;
  align-items: center;
  background-color: #1e1e1e;
  border-radius: 25px;
  padding: 10px 20px;
  border: 1px solid #3e3e3e;
}

.search-bar {
  background: none;
  border: none;
  outline: none;
  color: #e0e0e0;
  padding: 0 10px;
  width: 300px;
  font-size: 16px;
}

.nav-icons {
  display: flex;
  gap: 20px;
}

.nav-icons .icon {
  font-size: 25px;
  border: 1px solid gray;
  border-radius: 50%;
  padding: 10px;
  cursor: pointer;
  color: #E0E0E0;
}

/* Avatar and Dropdown Container */
.avatar-container {
  position: relative;
  cursor: pointer;
}

.avatar {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid gray;
  padding: 5px;
}

/* Dropdown Menu Styling */
.dropdown-menu {
  position: absolute;
  display: flex;
  flex-direction: column;
  padding: 10px;
  top: 100%;
  /* Place it directly below the avatar */
  right: 0;
  width: 220px;
  margin-top: 10px;
  /* Space between avatar and dropdown */
  background-color: #1e1e1e;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  color: #e0e0e0;
  z-index: 1000;
  overflow: hidden;
}

.profile-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-top: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #3e3e3e;
}

.profile-info h3 {
  color: #e0e0e0;
  margin: 0;
  font-size: 18px;
}

.profile-avatar {
  width: 75px;
  height: 75px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 15px;
  border: 2px solid #3e3e3e;
}

.menu-item {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding-top: 15px;
  padding-bottom: 15px;
  width: 100%;
  font-size: 16px;
  color: #e0e0e0;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.menu-item:hover {
  background-color: #333333;
}

.menu-item font-awesome-icon {
  margin-right: 10px;
  color: #a0a0a0;
}

hr {
  border: none;
  border-top: 1px solid #3e3e3e;
  margin: 0;
}

/* Notification Styling */
.notification-container {
  position: relative;
  cursor: pointer;
}

.notification-dot {
  position: absolute;
  top: 0;
  right: 0;
  width: 10px;
  height: 10px;
  background-color: red;
  border-radius: 50%;
  border: 1px solid #121212;
}

.notification-menu {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 10px;
  background-color: #1e1e1e;
  color: #e0e0e0;
  padding: 10px;
  border-radius: 8px;
  width: 500px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  scrollbar-width: thin;
  scrollbar-color: #888 #444;
  overflow-y: auto;
}

.notification-menu h4 {
  margin: 0 0 10px;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
}

.notification-menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 150px;
  overflow-y: auto;
}

.notification-menu li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #333;
}

.notification-menu div {
  flex: 1;
  margin-right: 10px;
}

.notification-menu li:last-child {
  border-bottom: none;
}

.notification-menu li:hover {
  background-color: #333;
}

.notification-menu .time {
  font-size: 0.8em;
  color: #aaa;
}

.notification-car-img {
  width: 50px;
  height: 50px;
  object-fit: fit;
  object-position: top;
  border-radius: 50%;
  margin-right: 10px;
}
</style>