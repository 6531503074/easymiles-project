<template class="Edit">
  <div class="EditProfile-page">
    <Header />
    <div class="box-container">
    </div>
    <img :src="getImageUrl(this.avatar)" alt="Profile" class="avatar" />
    <h1 class="name">{{ firstName+" "+ lastName }}</h1>
    <div class="line">
      <button class="select-button-active">
        <font-awesome-icon :icon="['fas', 'pen-to-square']" class="icon-active" />
        <h2>Edit profile</h2>
      </button>
      <button class="select-button">
        <font-awesome-icon :icon="['fas', 'lock']" class="icon" />
        <h2>Security</h2>
      </button>
      <button class="select-button">
        <font-awesome-icon :icon="['fas', 'circle-question']" class="icon" />
        <h2>Help</h2>
      </button>
    </div>
    <div class="formprofile">
      <form @submit.prevent="saveProfile">
        <div class="form-group">
          <div class="input-container">
            <label for="firstName">First Name:</label>
            <input type="text" v-model="user.firstName" id="firstName" required>
          </div>
          <div class="input-container">
            <label for="lastName">Last Name:</label>
            <input type="text" v-model="user.lastName" id="lastName" required>
          </div>
        </div>
        <div class="input-container">
          <label for="email">Email:</label>
          <input type="email" v-model="user.email" id="email" required>
        </div>
        <div class="input-container">
          <label for="address">Address:</label>
          <input type="text" v-model="user.address" id="address" required>
        </div>
        <div class="input-container">
          <label for="contact">Contact:</label>
          <input type="text" v-model="user.contact" id="contact" required>
        </div>
        <div class="input-container">
          <label for="password">Password:</label>
          <input type="password" v-model="user.password" id="password" required>
        </div>
        <div class="button-container">
          <button type="button" @click="cancelEdit" class="cancel-button">Cancel</button>
          <button type="submit" class="save-button">Save</button>
        </div>
      </form>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import axios from 'axios';

export default {
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      user: {
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        contact: '',
        password: '',
        avatar:'',
      },
      originalUser: {} // เก็บข้อมูลเดิมเพื่อใช้เมื่อกด Cancel
    };
  },
  // computed: {
  //   fullName() {
  //     return `${this.firstName} ${this.lastName}`;
  //   }
  // },
  mounted() {
    this.fetchUserProfile(); // ดึงข้อมูลผู้ใช้เมื่อหน้าโหลด
  },
  methods: {
    getImageUrl(path) {
      return path ? `${import.meta.env.VITE_STRAPI_URL}${path}` : 'car.png';
    },
    async fetchUserProfile() {
      try {
        const token = localStorage.getItem('jwt'); // ดึง Token จาก localStorage
        const response = await axios.get('http://localhost:1337/api/users/me?populate=*', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        // ตั้งค่าข้อมูลผู้ใช้ที่ได้จากคำขอ
        const userData = response.data;
        this.user.firstName = userData.firstName;
        this.user.lastName = userData.lastName;
        this.user.email = userData.email;
        this.user.address = userData.address;
        this.user.contact = userData.contact;
        
        this.firstName = userData.firstName;
        this.lastName = userData.lastName;
        this.avatar = userData.profilePicture.url;

        console.log(response.data)

      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    },
    async saveProfile() {
      try {
        const token = localStorage.getItem('jwt'); // ดึง Token จาก localStorage
        const updateData = {
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          email: this.user.email,
          address: this.user.address,
          contact: this.user.contact,
        };

        if (this.user.password) {
          updateData.password = this.user.password;
        }

        await axios.put('http://localhost:1337/api/users/me', updateData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        alert('Profile updated successfully!');
        this.user.password = ''; // ล้างฟิลด์รหัสผ่านหลังการบันทึก
        // อัปเดต originalUser ด้วยข้อมูลใหม่
        this.originalUser = { ...this.user };
      } catch (error) {
        console.error('Error updating profile:', error);
        alert('Failed to update profile.');
      }
    },
    cancelEdit() {
      // คืนค่าฟิลด์ข้อมูลกลับไปเป็นค่าเดิมที่เก็บไว้ใน originalUser
      this.user = { ...this.originalUser, password: '' };
    }
  }
};
</script>

<style scoped>
.home-page {
  font-family: 'Poppins', sans-serif;
  background-color: #121212;
  color: #ffffff;
}

.box-container {
  max-width: 15000px;
  /* Controls the maximum width of the box */
  padding: 150px;
  /* Adds space inside the box */
  background-color: #474646;
  /* Background color of the box */
}

.avatar {
  margin-top: -5rem;
  margin-left: 5rem;
  width: 250px; /* กำหนดขนาดภาพ */
  height: 250px;
  display: flex;
  object-fit: cover;
}

.name {
  padding: 150px;
  font-size: 35px;
  margin-left: 200px;
  margin-top: -280px;
  font-family: 'Poppins', sans-serif;
  color: #ffffff;
}

.select-button {
  border: #ffffff00;
  background-color: #47464600;
  font-family: 'Poppins', sans-serif;
  color: #ffffff;
  display: flex;
  align-items: center;
  gap: 1rem;
  /* Adds space between icon and text */
  padding: 2.2rem;
  cursor: pointer;
}

.select-button-active {
  border: #ffffff00;
  background-color: #47464600;
  font-family: 'Poppins', sans-serif;
  color: #ffbb00;
  display: flex;
  align-items: center;
  gap: 1rem;
  /* Adds space between icon and text */
  padding: 2.2rem;
  cursor: pointer;
}

.icon {
  color: #ffffff;
  font-size: 1.4rem;
  /* Adjust icon size */
}

.icon-active {
  color: #ffbb00;
  font-size: 1.4rem;
  /* Adjust icon size */
}

.line {
  margin-top: -50px;
  margin-left: 100px;
  margin-bottom: -40px;
  display: flex;
}

.formprofile {
  display: flex;
  justify-content: center;
  margin: 70px auto;
  width: 100%;
  padding: 20px;
}

.form-group {
  display: flex;
  justify-content: space-between;
  gap: 15px;
}

.input-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  width: 100%;
}

label {
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 5px;
  color: #ffffff;
}

input[type="text"],
input[type="email"],
input[type="password"] {
  margin-bottom: 1.5rem;
  margin-right: 7rem;
  padding: 10px;
  border: 1px solid #ffffff;
  border-radius: 4px;
  background-color: #00000000;
  color: #ffffff;
  font-size: 1.5rem;
}

.button-container {
  display: flex;
  margin-top: 2rem;
}

.cancel-button {
  background-color: #f0f0f0;
  font-size: 1.5rem;
  margin-right: 1.5rem;
  background-color: #ffffff;
  color: #000;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.save-button {
  font-size: 1.5rem;
  background-color: #007bff;
  color: #ffffff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.cancel-button:hover {
  background-color: #f0f0f0;
}

.save-button:hover {
  background-color: #0056b3;
}

</style>