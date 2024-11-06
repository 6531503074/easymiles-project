<!-- CategoryPage.vue -->
<template>
  <div class="app-container">
    <Header />
    <div class="content">
      <!-- Sidebar Section -->
      <aside class="sidebar">
        <!-- Type Filter -->
        <div class="filter-section">
          <h3>Type</h3>
          <ul>
            <li v-for="(item, index) in types" :key="index">
              <label>
                <input
                  type="checkbox"
                  v-model="selectedTypes"
                  :value="item"
                  @change="filterCars"
                />
                {{ item }}
              </label>
            </li>
          </ul>
        </div>

        <!-- Capacity Filter -->
        <div class="filter-section">
          <h3>Capacity</h3>
          <ul>
            <li v-for="(capacity, index) in capacities" :key="index">
              <label>
                <input
                  type="checkbox"
                  v-model="selectedCapacities"
                  :value="capacity"
                  @change="filterCars"
                />
                {{ capacity }} People
              </label>
            </li>
          </ul>
        </div>

        <!-- Price Filter -->
        <div class="filter-section">
          <h3>Price</h3>
          <input
            type="range"
            min="20"
            max="350"
            v-model="maxPrice"
            @input="filterCars"
          />
          <p>Max: ${{ maxPrice }}</p>
        </div>
      </aside>

      <!-- Main Content Section -->
      <div class="main-content">
        <!-- Car Grid -->
        <div class="car-grid">
          <CarCard v-for="car in filteredCars" :key="car.id" :car="car" />
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>




<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import CarCard from '@/components/CarCard.vue';
import axios from 'axios';

export default {
  components: {
    Header,
    Footer,
    CarCard,
  },
  data() {
    return {
      cars: [],          // All cars fetched from the backend
      types: ["Sport", "SUV", "MPV", "Sedan", "Coupe", "Hatchback"],
      capacities: [2, 4, 6, 8], // Representing people capacity
      selectedTypes: [],
      selectedCapacities: [],
      maxPrice: 350, // Set max price initially to the upper limit
    };
  },
  computed: {
    // Filtered cars based on selected filters
    filteredCars() {
      return this.cars.filter((car) => {
        // Type Filter
        const typeMatch = this.selectedTypes.length
          ? this.selectedTypes.includes(car.model_type)
          : true;

        // Capacity Filter
        const capacityMatch = this.selectedCapacities.length
          ? this.selectedCapacities.includes(car.capacity)
          : true;

        // Price Filter
        const priceMatch = car.pricePerDay <= this.maxPrice;

        return typeMatch && capacityMatch && priceMatch;
      });
    },
    // Dynamic display count based on screen size
    displayCount() {
      const containerWidth = window.innerWidth;
      const cardWidth = 250; // Estimated width of each card
      const gapWidth = 20; // Estimated gap between cards
      return Math.floor(containerWidth / (cardWidth + gapWidth)) * 2; // Calculate cars per row
    },
  },
  mounted() {
    this.fetchCarData();
    window.addEventListener('resize', this.updateDisplayCount); // Update display on resize
    this.updateDisplayCount();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.updateDisplayCount);
  },
  methods: {
    async fetchCarData() {
      try {
        const response = await axios.get('http://localhost:1337/api/cars?populate=*');
        // Assuming response.data.data has car objects with the expected structure
        this.cars = response.data.data;
      } catch (error) {
        console.error("Error fetching car data:", error);
      }
    },
    filterCars() {
      // Triggered when filters change to ensure filteredCars updates in real-time
    },
    updateDisplayCount() {
      this.filterCars(); // Refresh the filtered cars when display count changes
    },
  },
  watch: {
    selectedTypes: 'filterCars',
    selectedCapacities: 'filterCars',
    maxPrice: 'filterCars',
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
  width: 250px;
  padding: 20px;
  background-color: #1f1f1f;
  border-right: 1px solid #333;
}

.filter-section {
  margin-bottom: 20px;
}

.filter-section h3 {
  font-size: 16px;
  color: #e0e0e0;
  margin-bottom: 10px;
}

.filter-section ul {
  list-style: none;
  padding: 0;
}

.filter-section label {
  display: flex;
  align-items: center;
  color: #e0e0e0;
}

.filter-section input[type="checkbox"] {
  margin-right: 10px;
}

.main-content {
  flex: 1;
  padding: 20px;
}

.car-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}
</style>

