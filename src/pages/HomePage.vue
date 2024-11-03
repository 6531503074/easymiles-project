<template>
  <div class="home-page">
    <header class="header">
      <div>
        <img src="@/assets/logo.png" alt="EasyMiles" style="width: 220px;" />
        <div class="input-container">
          <font-awesome-icon :icon="['fas', 'magnifying-glass']" style="color: #E0E0E0;" />
          <input type="text" placeholder="Search something here..." class="search-bar" />
        </div>
      </div>
      <nav class="nav-icons" style="color: white;">
        <font-awesome-icon :icon="['fas', 'heart']" class="icon"/>
        <font-awesome-icon :icon="['fas', 'cart-shopping']" class="icon"/>
        <font-awesome-icon :icon="['fas', 'gear']" class="icon"/>
        <font-awesome-icon :icon="['fas', 'user']" class="icon"/>
      </nav>
    </header>

    <section class="hero-section">
      <div class="hero-card">
        <div>
          <h2>The Best Platform for Car Rental</h2>
          <p>Ease of doing a car rental safely and reliably. Of course, at a low price.</p>
          <button class="btn-rental">Rental Car</button>
        </div>
        <img src="@/assets/car1.png" alt="Car Image" />
      </div>
      <div class="hero-card">
        <div>
          <h2>Easy way to rent a car at a low price</h2>
          <p>Providing cheap car rental services and safe and comfortable facilities.</p>
          <button class="btn-rental">Rental Car</button>
        </div>
        <img src="@/assets/car2.png" alt="Car Image" />
      </div>
    </section>

    <section class="search-section">
      <div class="search-card">
        <h4>Pick-Up</h4>
        <select>
          <option>Select your city</option>
        </select>
        <input type="date" />
        <input type="time" />
      </div>
      <button class="swap-btn">↔</button>
      <div class="search-card">
        <h4>Drop-Off</h4>
        <select>
          <option>Select your city</option>
        </select>
        <input type="date" />
        <input type="time" />
      </div>
    </section>

    <section class="popular-cars">
      <h3>Popular Car</h3>
      <div class="car-grid">
        <CarCard v-for="car in popularCars" :key="car.id" :car="car" />
      </div>
    </section>

    <section class="recommended-cars">
      <h3>Recommendation Car</h3>
      <div class="car-grid">
        <CarCard v-for="car in recommendedCars" :key="car.id" :car="car" />
      </div>
      <button class="show-more-btn">Show more car</button>
    </section>

    <footer class="footer">
      <div class="footer-info">
        <h4>EasyMiles</h4>
        <p>Our vision is to provide convenience and help increase your sales business.</p>
      </div>
      <div class="footer-links">
        <div class="links-section">
          <h5>About</h5>
          <ul>
            <li>How it works</li>
            <li>Featured</li>
            <li>Partnership</li>
            <li>Business Relation</li>
          </ul>
        </div>
        <div class="links-section">
          <h5>Community</h5>
          <ul>
            <li>Events</li>
            <li>Blog</li>
            <li>Podcast</li>
            <li>Invite a friend</li>
          </ul>
        </div>
        <div class="links-section">
          <h5>Socials</h5>
          <ul>
            <li>Discord</li>
            <li>Instagram</li>
            <li>Twitter</li>
            <li>Facebook</li>
          </ul>
        </div>
      </div>
      <p class="footer-legal">©2024 EasyMiles. All rights reserved | Privacy & Policy | Terms & Condition</p>
    </footer>
  </div>
</template>

<script>
import CarCard from '@/components/CarCard.vue'; // Import the CarCard component

export default {
  components: {
    CarCard,
  },
  data() {
    return {
      popularCars: [
        // Add your car data for popular cars
      ],
      recommendedCars: [
        // Add your car data for recommended cars
      ],
    };
  },
};
</script>

<style scoped>
/* Main Page Styles */
.home-page {
  font-family: 'Poppins', sans-serif;
  background-color: #121212;
  color: #ffffff;
}

/* Header */
.header {
  max-height: 120px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 50px;
  border-bottom: 1px solid #2e2e2e;
}

.nav-icons .icon {
  font-size: 25px;
  border: 1px solid gray;
  border-radius: 50%;
  padding: 10px;
  cursor: pointer;
  color: #E0E0E0;
}

.header img {
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

/* Hero Section */
.hero-section {
  display: flex;
  gap: 30px;
  padding: 40px 50px;
}

.hero-card {
  flex: 1;
  background-color: #2b2bff;
  border-radius: 10px;
  padding: 30px;
  display: flex;
  justify-content: space-between;
  color: #fff;
  overflow: hidden;
}

.hero-card img {
  width: 450px;
  height: 200px;
  object-fit: cover;
  object-position: top;
}

.hero-card h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

.hero-card p {
  font-size: 16px;
  color: #e0e0e0;
}

.btn-rental {
  background-color: #00aaff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

/* Search Section */
.search-section {
  display: flex;
  gap: 20px;
  padding: 20px 50px;
  border-radius: 10px;
  align-items: center;
}

.search-card {
  flex: 1;
  color: #e0e0e0;
  background-color: #1c1c1c;
  padding: 20px;
  border-radius: 10px;
  font-size: large;
}

.search-card h4 {
  margin-bottom: 5px;
  margin-top: 5px;
}

.search-card input[type="date"]::webkit-calendar-picker-indicator,
.search-card input[type="time"]::webkit-calendar-picker-indicator {
  filter: invert(1);
}

.search-card select,
.search-card input {
  background-color: #1e1e1e;
  color: #ffffff;
  border: 1px solid #3e3e3e;
  padding: 8px;
  border-radius: 5px;
  margin-right: 10px;
}

.swap-btn {
  background-color: #2b2bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

/* Car Cards Section */
.popular-cars,
.recommended-cars {
  padding: 30px 50px;
}

.car-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.show-more-btn {
  background-color: #2b2bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin: 20px auto;
  display: block;
}

/* Footer */
.footer {
  display: flex;
  justify-content: space-between;
  padding: 30px 50px;
  background-color: #1c1c1c;
  color: #e0e0e0;
  font-size: 14px;
}

.footer-info h4 {
  font-size: 18px;
  margin-bottom: 10px;
}

.footer-links {
  display: flex;
  gap: 50px;
}

.links-section h5 {
  font-size: 16px;
  margin-bottom: 10px;
}

.footer-legal {
  text-align: center;
  margin-top: 20px;
  color: #666;
}
</style>