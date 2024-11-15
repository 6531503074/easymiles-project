<template class="Help">
    <div class="Help-page">
        <Header />

        <div class="box-container">
        </div>
        <img :src="getImageUrl(this.avatar)" alt="Profile" class="avatar" />
        <h1 class="name">{{ user.firstName + " " + lastName }}</h1>
        <div class="line">
            <button class="select-button">
                <font-awesome-icon :icon="['fas', 'pen-to-square']" class="icon" />
                <h2>Edit profile</h2>
            </button>
            <button class="select-button">
                <font-awesome-icon :icon="['fas', 'lock']" class="icon" />
                <h2>Security</h2>
            </button>
            <button class="select-button-active">
                <font-awesome-icon :icon="['fas', 'circle-question']" class="icon-active" />
                <h2>Help</h2>
            </button>
        </div>
        <div class="contact">
            <h2>contact Us</h2>
        </div>
        <div class="text">
            <ul>Any question or remarks? Just write us a message!</ul>
        </div>
        <div class="contact-box">
            <div class="info-container">
                <h1>Contact Information</h1>
                <p class="info-text">Say something to start a live chat!</p>
                <div class="info-item">
                    <font-awesome-icon :icon="['fas', 'phone']" class="info-icon" />
                    <ul class="info-text">: 000-000-0000</ul>
                </div>
                <div class="info-item">
                    <font-awesome-icon :icon="['fas', 'envelope']" class="info-icon" />
                    <ul class="info-text">: easymiles@gmail.com</ul>
                </div>
                <div class="info-item">
                    <font-awesome-icon :icon="['fas', 'location-dot']" class="info-icon" />
                    <ul class="info-text">: 132 Dartmouth Street Boston, Massachusetts 02156 United States</ul>
                </div>
                <div class="info-under">
                    <font-awesome-icon :icon="['fas', 'circle-question']" class="info-icon-under-left" />
                    <font-awesome-icon :icon="['fas', 'circle-question']" class="info-icon-under-center" />
                    <font-awesome-icon :icon="['fas', 'circle-question']" class="info-icon-under-right" />
                </div>
            </div>
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

.contact {
    font-size: 28px;
    display: flex;
    justify-content: center;
    font-family: 'Poppins', sans-serif;
    color: #ffffff;
}

.text {
    display: flex;
    justify-content: center;
    font-family: 'Poppins', sans-serif;
    color: #ffffff;
    font-size: 20px;
    border-bottom: 2px solid #474646;
}

.contact-box {
    margin: 70px auto;
    border-radius: 10px;
    display: flex;
    padding: 50px;
    max-width: 850px;
    height: 550px;
    width: 100%;
    background-color: #000000;
}

.info-container {
    margin: 10px auto;
    border-radius: 10px;
    padding: 50px;
    color: #ffffff;
    background-color: #00000000;
    max-width: 1000px;
}

.info-item {
    padding-top: 50px;
    display: flex;
    align-items: center;
}

.info-icon {
    font-size: 1.5rem;
    margin-right: 8px;
}

.info-text {
    font-size: 20px;
    list-style: none;
    padding-left: 15px;
    margin: 0;
}

.info-under {
    padding-top: 100px;
    display: flex;
}

.info-icon-under-center {
    margin: auto;
    font-size: 2rem;
}

.info-icon-under-right {
    margin-right: 210px;
    font-size: 2rem;
}

.info-icon-under-left {
    margin-left: 210px;
    font-size: 2rem;
}
</style>