<template class="Help">
    <div class="Help-page">
        <Header />
        <div class="box-container">
            <font-awesome-icon :icon="['fas', 'circle-user']" class="usericon" />
        </div>
        <h1 class="name">Names List</h1>
        <div class="line">
            <div class="select-button">
                <font-awesome-icon :icon="['fas', 'pen-to-square']" class="icon" />
                <h2>Edit profile</h2>
            </div>
            <div class="select-button">
                <font-awesome-icon :icon="['fas', 'lock']" class="icon" />
                <h2>Security</h2>
            </div>
            <div class="select-button">
                <font-awesome-icon :icon="['fas', 'circle-question']" class="icon" />
                <h2>Help</h2>
            </div>
        </div>
        <div class="contact">
            <h2>contact Us</h2>
        </div>
        <div class="text">
            <ul>Any question or remarks? Just write us a message!</ul>
        </div>

        <div class="contact-box">
            <div class="info-container">
                <h1 >Contact Information</h1>
                <p class="info-text">Say something to start a live chat!</p>
                <div class="info-item">
                    <font-awesome-icon :icon="['fas', 'phone']" class="info-icon" />
                    <ul class="info-text">: 000-000-0000</ul>
                </div>
                <div class="info-item">
                    <font-awesome-icon :icon="['fas', 'envelope']" class="info-icon" />
                    <ul class="info-text">: demo@gmail.com</ul>
                </div>
                <div class="info-item">
                    <font-awesome-icon :icon="['fas', 'location-dot']" class="info-icon" />
                    <ul class="info-text">: 132 Dartmouth Street Boston, Massachusetts 02156 United States</ul>
                </div>
                <div class="info-under">
                    <font-awesome-icon :icon="['fas', 'circle-question']" class="info-icon" />
                    <font-awesome-icon :icon="['fas', 'circle-question']" class="info-icon" />
                    <font-awesome-icon :icon="['fas', 'circle-question']" class="info-icon" />
                </div>
            </div>
        </div>

        <Footer />
    </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default {
    components: {
        Header,
        Footer,
    },
    data() {
        return {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
        };
    },
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

.usericon {
    position: absolute;
    top: 340px;
    left: 100px;
    font-size: 180px;
    padding: 50px;
    color: #ffffff;
}

.name {
    padding: 150px;
    font-size: 35px;
    margin-left: 200px;
    margin-top: -130px;
    font-family: 'Poppins', sans-serif;
    color: #ffffff;
}

.select-button {
    font-family: 'Poppins', sans-serif;
    color: #ffffff;
    display: flex;
    align-items: center;
    gap: 1rem;
    /* Adds space between icon and text */
    padding: 2.2rem;
    font-size: 1rem;
    cursor: pointer;
}

.icon {
    color: #ffffff;
    font-size: 1.4rem;
    /* Adjust icon size */
}

.line {
    margin-top: -120px;
    margin-left: 100px;
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
    max-width: 1200px;
    height: 550px;
    width: 100%;
    background-color: #ffffff;
}

.info-container {
    border-radius: 10px;
    padding: 50px;
    color: #ffffff;
    background-color: #000000;
    max-width: 400px;
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

.info-under{
    gap: 15px;
    padding-top: 100px;
    display: flex;
}
</style>
