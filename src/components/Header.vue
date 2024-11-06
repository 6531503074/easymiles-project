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
      <a href="/favorite">
        <font-awesome-icon :icon="['fas', 'heart']" class="icon" />
      </a>
      <font-awesome-icon :icon="['fas', 'bell']" class="icon" />
      <img :src="getImageUrl(this.avatar)" alt="Avatar" @error="onImageError" @click="toggleMenu" class="avatar" />
      <div v-if="showMenu" class="dropdown-menu">
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
    </nav>
  </header>
</template>

<script>
import axios from 'axios';
// import VueJwtDecode from 'vue-jwt-decode';

export default {
  data() {
    return {
      showMenu: false,
      userName: '',
      email: '',
      userDId: '',
      avatar: '',
    };
  },
  async mounted() {
    const token = localStorage.getItem("jwt");
    if (token) {
      try {
        // const decoded = VueJwtDecode.decode(token);
        // const userId = decoded.id;

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
  },
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    logout() {
      localStorage.removeItem("jwt");
      this.$router.push('/');
    },
    getImageUrl(path) {
      return path ? `${import.meta.env.VITE_STRAPI_URL}${path}` : 'car.png';
    },
    onImageError(event) {
      event.target.src = 'car.png';
    },
    goToCard() {
      this.$router.push('/card');
    },
    goToHistory() {
      this.$router.push('/history');
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

.avatar {
  cursor: pointer;
  width: 25px; /* Match the font size of the icons */
  height: 25px; /* Match the font size of the icons */
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid gray; /* Match the border style of icons */
  padding: 10px; /* Match the padding of icons */
}


.dropdown-menu {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 120px;
  right: 20px;
  width: 220px;
  padding: 10px;
  background-color: #1e1e1e; /* Dark background */
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); /* Softer shadow */
  color: #e0e0e0; /* Light text for readability */
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
  border-bottom: 1px solid #3e3e3e; /* Subtle border between sections */
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
  border: 2px solid #3e3e3e; /* Matches the theme */
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
  background-color: #333333; /* Darken on hover */
}

.menu-item font-awesome-icon {
  margin-right: 10px;
  color: #a0a0a0; /* Icon color */
}

hr {
  border: none;
  border-top: 1px solid #3e3e3e; /* Divider line with theme color */
  margin: 0;
}

</style>