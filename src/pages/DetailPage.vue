<template>
    <div id="app" class="app-container">
      <!-- Header Section -->
      <header class="header">
        <div class="logo">EasyMiles</div>
        <input type="text" placeholder="Search something here" class="search-bar" />
        <div class="profile">
          <i class="icon icon-settings"></i>
          <i class="icon icon-user"></i>
        </div>
      </header>
  
      <div class="main-content">
        <!-- Sidebar Section -->
        <aside class="sidebar">
          <section class="filter-group">
            <h3>Type</h3>
            <ul>
              <li><input type="checkbox" /> Sport (10)</li>
              <li><input type="checkbox" /> SUV (12)</li>
              <!-- Add other types -->
            </ul>
          </section>
          <section class="filter-group">
            <h3>Capacity</h3>
            <ul>
              <li><input type="checkbox" /> 2 Person (10)</li>
              <li><input type="checkbox" /> 4 Person (14)</li>
              <!-- Add other capacities -->
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
          <div class="car-details">
            <div class="car-image">
              <img src="https://via.placeholder.com/400" alt="Car image" />
            </div>
            <div class="car-info">
              <h2>Nissan GT - R</h2>
              <p>Sports car with the best design and acceleration</p>
              <p>$80.00/day</p>
              <button>Rent Now</button>
            </div>
          </div>
  
          <!-- Car List Section -->
          <div class="car-list-section">
            <section>
              <h3>Recent Car</h3>
              <div class="car-list">
                <div class="car-card" v-for="car in recentCars" :key="car.id">
                  <img :src="car.image" alt="Car image" />
                  <h3>{{ car.name }}</h3>
                  <p>${{ car.price }}/day</p>
                  <button>Rent Now</button>
                </div>
              </div>
            </section>
  
            <section>
              <h3>Recommendation Car</h3>
              <div class="car-list">
                <div class="car-card" v-for="car in recommendedCars" :key="car.id">
                  <img :src="car.image" alt="Car image" />
                  <h3>{{ car.name }}</h3>
                  <p>${{ car.price }}/day</p>
                  <button>Rent Now</button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
  
      <!-- Footer Section -->
      <footer class="footer">
        <div>Our vision is to provide convenience and help increase your sales business.</div>
        <div class="footer-links">
          <a href="#">How it works</a>
          <a href="#">Featured</a>
          <!-- Add other links -->
        </div>
      </footer>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        recentCars: [
          { id: 1, name: "Koenigsegg", image: "https://via.placeholder.com/200", price: 99 },
          { id: 2, name: "Nissan GT - R", image: "https://via.placeholder.com/200", price: 80 },
          { id: 3, name: "Rolls-Royce", image: "https://via.placeholder.com/200", price: 96 },
        ],
        recommendedCars: [
          { id: 4, name: "All New Rush", image: "https://via.placeholder.com/200", price: 72 },
          { id: 5, name: "CR - V", image: "https://via.placeholder.com/200", price: 80 },
          { id: 6, name: "All New Terios", image: "https://via.placeholder.com/200", price: 74 },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  .app-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
    background-color: #333;
    color: #fff;
  }
  
  .search-bar {
    width: 50%;
    padding: 8px;
  }
  
  .profile .icon {
    margin-left: 20px;
  }
  
  .main-content {
    display: flex;
    flex: 1;
  }
  
  .sidebar {
    width: 200px;
    background-color: #222;
    padding: 20px;
    color: #fff;
  }
  
  .filter-group {
    margin-bottom: 20px;
  }
  
  .content {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
  }
  
  .car-details {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
  }
  
  .car-image img {
    width: 100%;
    max-width: 400px;
    border-radius: 10px;
  }
  
  .car-info {
    flex: 1;
  }
  
  .car-list-section {
    margin-top: 20px;
  }
  
  .car-list {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
  }
  
  .car-card {
    width: 200px;
    background-color: #fff;
    padding: 10px;
    border-radius: 8px;
    text-align: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .footer {
    padding: 20px;
    background-color: #333;
    color: #fff;
    display: flex;
    justify-content: space-between;
  }
  
  .footer-links a {
    margin-right: 15px;
    color: #fff;
    text-decoration: none;
  }
  </style>
  