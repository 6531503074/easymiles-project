<template>
  <div id="app" class="app-container">
    <!-- Header Section -->
    <Header />

    <div class="main-content">
      <!-- Sidebar Section -->
      <aside class="sidebar">
        <section class="filter-group">
          <h3>Type</h3>
          <ul>
            <li><input type="checkbox" /> Sport (10)</li>
            <li><input type="checkbox" /> SUV (12)</li>
            <li><input type="checkbox" /> MPV (16)</li>
            <li><input type="checkbox" /> Sedan (20)</li>
            <li><input type="checkbox" /> Coupe (14)</li>
            <li><input type="checkbox" /> Hatchback (14)</li>
          </ul>
        </section>
        <section class="filter-group">
          <h3>Capacity</h3>
          <ul>
            <li><input type="checkbox" /> 2 Person (10)</li>
            <li><input type="checkbox" /> 4 Person (14)</li>
            <li><input type="checkbox" /> 6 Person (12)</li>
            <li><input type="checkbox" /> 8 or More (16)</li>
          </ul>
        </section>
        <section class="filter-group">
          <h3>Price</h3>
          <input type="range" min="0" max="100" />
          <span>Max: $100.00</span>
        </section>
      </aside>

      <!-- Main Content Section -->
      <div class="content">
        <!-- Car Details Section -->
        <div class="car-details-container">
          <div class="car-highlight">
            <img src="https://via.placeholder.com/400" alt="Car image" class="main-car-image"/>
            <div class="car-thumbnails">
              <img src="https://via.placeholder.com/100" alt="Thumbnail" />
              <img src="https://via.placeholder.com/100" alt="Thumbnail" />
              <img src="https://via.placeholder.com/100" alt="Thumbnail" />
            </div>
          </div>
          <div class="car-info">
            <h2>Nissan GT - R</h2>
            <p class="car-description">Sports car with the best design and acceleration</p>
            <div class="price-section">
              <span class="car-price">$80.00/day</span>
              <span class="original-price">$100.00</span>
            </div>
            <button class="rent-button">Rent Now</button>
            <ul class="car-specs">
              <li><strong>Type Car:</strong> Sport</li>
              <li><strong>Steering:</strong> Manual</li>
              <li><strong>Capacity:</strong> 2 Person</li>
              <li><strong>Fuel:</strong> Gasoline, 70L</li>
            </ul>
          </div>
        </div>

        <!-- Reviews Section -->
        <div class="reviews-section">
  <div class="reviews-header">
    <h3>Reviews</h3>
    <span class="review-count">13</span>
  </div>
  <div class="review">
    <img src="https://via.placeholder.com/50" alt="Reviewer image" class="reviewer-img" />
    <div class="review-content">
      <div class="review-header">
        <h4>Alex Stanton</h4>
        <span class="reviewer-title">CEO at Bukalapak</span>
      </div>
      <p class="review-text">
        We are very happy with the service from the EasyMiles App. EasyMiles has a low price and also a large variety of cars with good and comfortable facilities. In addition, the service provided by the officers is also very friendly and very polite.
      </p>
      <div class="review-footer">
        <span class="review-date">21 July 2022</span>
        <div class="review-rating">⭐⭐⭐⭐☆</div>
      </div>
    </div>
  </div>
  <div class="review">
    <img src="https://via.placeholder.com/50" alt="Reviewer image" class="reviewer-img" />
    <div class="review-content">
      <div class="review-header">
        <h4>Skylar Dias</h4>
        <span class="reviewer-title">CEO at Amazon</span>
      </div>
      <p class="review-text">
        We are greatly helped by the services of the EasyMiles Application. EasyMiles has low prices and also a wide variety of cars with good and comfortable facilities. In addition, the service provided by the officers is also very friendly and very polite.
      </p>
      <div class="review-footer">
        <span class="review-date">20 July 2022</span>
        <div class="review-rating">⭐⭐⭐⭐⭐</div>
      </div>
    </div>
  </div>
  <button class="show-all">
    Show All <span class="arrow">▼</span>
  </button>
</div>

        <!-- Recent Car Section styled similar to the category page -->
        <section>
          <h3>Recent Car <span class="view-all">View All</span></h3>
          <div class="car-grid">
            <div class="car-card" v-for="car in recentCars" :key="car.id">
              <img :src="car.image" alt="Car Image" />
              <div class="car-info">
                <div class="car-header">
                  <h4>{{ car.name }}</h4>
                  <button class="favorite-btn" @click="toggleFavorite(car)" :class="{ 'filled-heart': car.favorite }">
                    <span v-if="car.favorite">❤️</span>
                    <span v-else>🤍</span>
                  </button>
                </div>
                <p class="car-type">{{ car.type }}</p>
                <div class="car-details">
                  <span>🚗 {{ car.capacity }}L</span>
                  <span>⚙️ {{ car.transmission }}</span>
                  <span>👥 {{ car.seats }} People</span>
                </div>
                <p class="car-price">{{ formatCurrency(car.price) }} / day</p>
                <button class="rent-button">Rent Now</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>

    <!-- Footer Section -->
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
      recentCars: [
        { id: 1, name: 'Koenigsegg', type: 'Sport', price: 99, capacity: 90, transmission: 'Manual', seats: 2, image: 'https://via.placeholder.com/200', favorite: false },
        { id: 2, name: 'Nissan GT - R', type: 'Sport', price: 80, capacity: 80, transmission: 'Manual', seats: 2, image: 'https://via.placeholder.com/200', favorite: false },
        { id: 3, name: 'Rolls-Royce', type: 'Luxury', price: 96, capacity: 70, transmission: 'Automatic', seats: 4, image: 'https://via.placeholder.com/200', favorite: false },
      ],
    };
  },
  methods: {
    formatCurrency(value) {
      return `$${value.toFixed(2)}`;
    },
    toggleFavorite(car) {
      car.favorite = !car.favorite;
    },
  },
};
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #1a1a1a;
  color: #fff;
}

.main-content {
  display: flex;
  flex: 1;
}

.sidebar {
  width: 250px;
  background-color: #2b2b2b;
  padding: 20px;
  color: #cfcfcf;
  border-right: 1px solid #333;
}

.filter-group h3 {
  color: #fff;
  font-weight: bold;
  margin-bottom: 10px;
}

.content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

.car-details-container {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  background-color: #333333;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

.car-highlight img.main-car-image {
  width: 100%;
  max-width: 400px;
  border-radius: 10px;
}

.car-thumbnails img {   
  width: 100px;
  border-radius: 20px;
  margin-top: 10px;
  cursor: pointer;
  padding: 20px;
  margin-right: 10px;
}

.car-info {
  flex: 1;
}

.price-section {
  display: flex;
  align-items: center;
  gap: 10px;
}

.car-price {
  font-size: 1.5em;
  color: #00bfff;
}

.original-price {
  font-size: 1.2em;
  color: #888;
  text-decoration: line-through;
}

.rent-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 10px;
}

.reviews-section {
  background-color: #333333;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  margin-bottom: 20px;
}

.reviews-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
}

.reviews-header h3 {
  margin: 0;
  font-size: 1.5em;
  color: #fff;
}

.review-count {
  background-color: #007bff;
  color: #fff;
  border-radius: 5px;
  padding: 4px 8px;
  font-weight: bold;
  font-size: 0.9em;
}

.review {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
}

.reviewer-img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

.review-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.review-header h4 {
  margin: 0;
  color: #fff;
  font-size: 1.1em;
}

.reviewer-title {
  color: #aaa;
  font-size: 0.9em;
  margin-top: 2px;
}

.review-text {
  color: #ddd;
  font-size: 0.95em;
  margin: 10px 0;
  line-height: 1.4;
}

.review-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85em;
  color: #aaa;
}

.review-date {
  color: #888;
}

.review-rating {
  color: #ffdd57;
  font-size: 1.2em;
}

.show-all {
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  font-size: 0.95em;
  text-align: center;
  display: block;
  margin: 10px auto;
}

.show-all .arrow {
  font-size: 1em;
  color: #007bff;
}

.car-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.car-card {
  background-color: #444;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;
}

.car-card:hover {
  transform: scale(1.05);
}

.car-card img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-bottom: 1px solid #333;
  margin-bottom: 10px;
  border-radius: 8px 8px 0 0;
}

.car-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.favorite-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2em;
  opacity: 0.7;
  transition: opacity 0.3s ease;
}

.favorite-btn.filled-heart {
  color: #ff4d4d;
}

.car-details {
  display: flex;
  justify-content: space-around;
  color: #888;
  font-size: 0.9em;
  margin: 10px 0;
}

.car-type {
  color: #aaa;
  font-weight: bold;
}

.view-all {
  font-size: 0.9em;
  color: #007bff;
  cursor: pointer;
}
</style>
