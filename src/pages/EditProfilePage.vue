<template class="Edit">
    <div class="EditProfile-page">
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
  max-width: 15000px; /* Controls the maximum width of the box */
  padding: 150px; /* Adds space inside the box */
  background-color: #474646; /* Background color of the box */
}

.usericon{
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
    gap: 1rem; /* Adds space between icon and text */
    padding: 2.2rem;
    font-size: 1rem;
    cursor: pointer;
}

.icon {
    color: #ffffff;
    font-size: 1.4rem; /* Adjust icon size */
}

.line{
    margin-top: -120px;
    margin-left: 100px;
    display: flex;
}
</style>