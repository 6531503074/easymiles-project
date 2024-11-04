<template>
  <div class="app-container">
    <!-- Header Section -->
    <Header />

    <div class="content">
      <!-- Sidebar Section -->
      <aside class="sidebar">
        <div class="filter-section">
          <h3>Type</h3>
          <ul>
            <li v-for="(item, index) in types" :key="index">
              <label>
                <input type="checkbox" v-model="selectedTypes" :value="item.name" />
                {{ item.name }} ({{ item.count }})
              </label>
            </li>
          </ul>
        </div>

        <div class="filter-section">
          <h3>Capacity</h3>
          <ul>
            <li v-for="(capacity, index) in capacities" :key="index">
              <label>
                <input type="checkbox" v-model="selectedCapacities" :value="capacity.name" />
                {{ capacity.name }} ({{ capacity.count }})
              </label>
            </li>
          </ul>
        </div>

        <div class="filter-section">
          <h3>Price</h3>
          <input type="range" min="0" max="100" v-model="maxPrice" />
          <p>Max: ${{ maxPrice.toFixed(2) }}</p>
        </div>
      </aside>

      <!-- Main Content Section -->
      <div class="main-content">
        <section class="search-section">
          <div class="search-card">
            <h4>Pick-Up</h4>
            <select v-model="pickupCity">
              <option value="">Select your city</option>
              <option value="new-york">New York</option>
              <option value="los-angeles">Los Angeles</option>
              <option value="chicago">Chicago</option>
              <option value="houston">Houston</option>
              <option value="phoenix">Phoenix</option>
            </select>
            <input type="date" v-model="pickupDate" />
            <input type="time" v-model="pickupTime" />
          </div>
          <button class="swap-btn" @click="swapValues">↔</button>
          <div class="search-card">
            <h4>Drop-Off</h4>
            <select v-model="dropoffCity">
              <option value="">Select your city</option>
              <option value="new-york">New York</option>
              <option value="los-angeles">Los Angeles</option>
              <option value="chicago">Chicago</option>
              <option value="houston">Houston</option>
              <option value="phoenix">Phoenix</option>
            </select>
            <input type="date" v-model="dropoffDate" />
            <input type="time" v-model="dropoffTime" />
          </div>
        </section>

        <!-- Car Grid -->
        <div class="car-grid">
          <div v-for="car in cars" :key="car.id" class="car-card">
            <img :src="car.image" alt="Car Image" />
            <div class="car-info">
              <div class="car-header">
                <h4>{{ car.name }}</h4>
                <button class="favorite-btn">❤️</button>
              </div>
              <p>{{ car.type }}</p>
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
        <button class="show-more">Show more car</button>
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
      types: [
        { name: 'Sport', count: 10 },
        { name: 'SUV', count: 12 },
        { name: 'MPV', count: 16 },
        { name: 'Sedan', count: 20 },
        { name: 'Coupe', count: 14 },
        { name: 'Hatchback', count: 14 },
      ],
      capacities: [
        { name: '2 Person', count: 10 },
        { name: '4 Person', count: 12 },
        { name: '6 Person', count: 14 },
        { name: '8 or More', count: 16 },
      ],
      selectedTypes: [],
      selectedCapacities: [],
      maxPrice: 100,
      cars: [
        { id: 1, name: 'Koenigsegg', type: 'Sport', price: 99, capacity: 90, transmission: 'Manual', seats: 2, image: 'car1.jpg' },
        { id: 2, name: 'Nissan GT-R', type: 'Sport', price: 80, capacity: 80, transmission: 'Manual', seats: 2, image: 'car2.jpg' },
        // Add more car objects as needed
      ],
    };
  },
  methods: {
    formatCurrency(value) {
      return `$${value.toFixed(2)}`;
    },
    swapValues() {
      const tempCity = this.pickupCity;
      const tempDate = this.pickupDate;
      const tempTime = this.pickupTime;
      
      this.pickupCity = this.dropoffCity;
      this.pickupDate = this.dropoffDate;
      this.pickupTime = this.dropoffTime;
      
      this.dropoffCity = tempCity;
      this.dropoffDate = tempDate;
      this.dropoffTime = tempTime;
    }
  },
};
</script>

<style scoped>
.app-container {
  font-family: Arial, sans-serif;
  color: #f0f0f0;
  background-color: #121212;
}

.content {
  display: flex;
}

.sidebar {
  width: 200px;
  padding: 20px;
  background-color: #1f1f1f;
  border-right: 1px solid #333; 
}

.main-content {
  flex: 1;
  padding: 20px;
  color: #f0f0f0;
}

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

.search-card select,
.search-card input {
  background-color: #1e1e1e;
  color: #ffffff;
  border: 1px solid #3e3e3e;
  padding: 8px;
  border-radius: 5px;
  margin-right: 10px;
  cursor: pointer;
}

.swap-btn {
  background-color: #2b2bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
} 

.car-grid {
  display: flex;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 50px;
}

.car-card {
  background-color: #1e1e1e;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;
  padding: 15px;
}

.car-card:hover {
  transform: scale(1.05);
}

.car-card img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-bottom: 1px solid #333;
}

.car-info {
  padding: 10px 0;
}

.car-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.favorite-btn {
  background: none;
  border: none;
  color: #ff4d4d;
  font-size: 1.2em;
  cursor: pointer;
}

.car-details {
  display: flex;
  justify-content: space-between;
  color: #888;
  font-size: 0.9em;
}

.car-price {
  font-size: 1.1em;
  margin-top: 5px;
}

.rent-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
}

.show-more {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 1em;
  border: none;
  background-color: #2b2bff;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
}
</style>
