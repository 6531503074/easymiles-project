<template class="Security">
    <div class="Security-page">
        <Header />

        <div class="box-container">
        </div>
        <img :src="getImageUrl(this.avatar)" alt="Profile" class="avatar" />
        <h1 class="name">{{ user.firstName + " " + user.lastName }}</h1>
        <div class="line">
            <button class="select-button" @click="gotoEdit">
                <font-awesome-icon :icon="['fas', 'pen-to-square']" class="icon" />
                <h2>Edit profile</h2>
            </button>
            <button class="select-button-active" @click="gotoSecurity">
                <font-awesome-icon :icon="['fas', 'lock']" class="icon-active" />
                <h2>Security</h2>
            </button>
            <button class="select-button" @click="gotoHelp">
                <font-awesome-icon :icon="['fas', 'circle-question']" class="icon" />
                <h2>Help</h2>
            </button>
        </div>
        <div class="underline">
            <h2 class="Security">Security</h2>
        </div>
        <div>
            <h2 class="text">{{ "Sign-in Email : " + user.email }}</h2>
        </div>
        <div class="password">
            <h2 class="text">Password :</h2>
            <input type="password" v-model="user.password" id="password" class="custom-input" required>
            <button type="button" @click="cancelEdit" class="cancel-button">Cancel</button>
            <button type="submit" class="save-button">Save</button>

        </div>
        <div class="underline2">
            <h2 class="text">{{ "Contact : " + user.contact }}</h2>
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
                avatar: '',
            },
            originalUser: {} // เก็บข้อมูลเดิมเพื่อใช้เมื่อกด Cancel
        };
    },
    mounted() {
        this.fetchUserProfile(); // ดึงข้อมูลผู้ใช้เมื่อหน้าโหลด
    },
    methods: {
        gotoEdit() {
            this.$router.push('/EditProfilePage');
        },
        gotoSecurity() {
            this.$router.push('/SecurityPage');
        },
        gotoHelp() {
            this.$router.push('/HelpPage');
        },
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
                this.user.avatar = userData.profilePicture.url;

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
    width: 250px;
    /* กำหนดขนาดภาพ */
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

.Security {
    margin-bottom: 2.5rem;
    font-size: 26px;
    display: flex;
    margin-top: 2rem;
    margin-left: 8rem;
    font-family: 'Poppins', sans-serif;
    color: #ffffff;
}

.underline {
    margin-bottom: 3rem;
    display: flex;
    border-bottom: 2px solid #474646;
}

.underline2 {
    display: flex;
    border-bottom: 2px solid #474646;
}

.cancel-button {
    width: 150px;
    /* กำหนดความกว้างของปุ่ม */
    height: 50px;
    /* กำหนดความสูงของปุ่ม */
    background-color: #f0f0f0;
    font-size: 1.5rem;
    margin-right: 1.5rem;
    margin-left: -5rem;
    background-color: #ffffff;
    color: #000;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
}

.save-button {
    width: 150px;
    /* กำหนดความกว้างของปุ่ม */
    height: 50px;
    /* กำหนดความสูงของปุ่ม */
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

.text {
    margin-left: 12rem;
    margin-bottom: 4rem;
    color: #ffffff;
}

.password {
    display: flex;
}

.custom-input {
    margin-left: 1rem;
    width: 300px;
    /* กำหนดความกว้างของปุ่ม */
    height: 50px;
    /* กำหนดความสูงของปุ่ม */
    padding: 8px 12px;
    /* ระยะห่างภายในช่องกรอก */
    border: 1px solid #ccc;
    /* สีและความหนาของเส้นขอบ */
    border-radius: 5px;
    /* มุมโค้งของช่องกรอก */
    box-sizing: border-box;
    /* รวม padding กับ border ในความกว้าง */
}
</style>