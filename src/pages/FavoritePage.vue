<template>
    
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      favoriteCars: [
        {
          id: 1,
          name: "Koenigsegg",
          type: "Sport",
          price: 99,
          fuel: 90,
          transmission: "Manual",
          seats: 2,
          image: "/path/to/koenigsegg.jpg",
        },
        // Add more cars as needed
      ],
      recommendedCars: [
        {
          id: 4,
          name: "All New Rush",
          type: "SUV",
          price: 72,
          fuel: 90,
          transmission: "Manual",
          seats: 6,
          image: "/path/to/rush.jpg",
        },
        // Add more cars as needed
      ],
      showMoreButton: true, // Toggle for "Show more cars" button
    };
  },
  methods: {
    loadMoreCars() {
      // Logic to load more cars
      this.showMoreButton = false; // Hide button when all cars are loaded
    },
    toggleFavorite(car) {
      car.favorite = !car.favorite;
    },
  },
};
</script>

<style scoped>
.container {
  background-color: #121212;
  color: #ffffff;
  padding: 16px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.section-title {
  font-size: 1.125rem;
  font-weight: 600;
}

.view-all-button {
  color: #3563e9; 
  font-weight: 500;
  cursor: pointer;
  background: none; 
  border: none; 
  padding: 0; 
  font-size: 1rem; 
}

.view-all-button:hover {
  text-decoration: none; 
  opacity: 0.8; 
}

.car-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.car-card {
  background-color: #333333;
  padding: 16px;
  border-radius: 8px;
  text-align: center;
  transition: transform 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

.car-card:hover {
  transform: scale(1.05);
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

.favorite-btn.filled-heart {
  opacity: 1;
}

.card-details {
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
  background-color: #3563e9;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  margin-top: 8px;
  font-weight: 600;
  cursor: pointer;
}

.show-more-button { 
  margin-top: 100px;
  width: 10%;
  background-color: #3563e9;
  color: white;
  padding: 12px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  margin-left: 45%;
  margin-bottom: 20px
}
</style>
