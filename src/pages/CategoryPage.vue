<template>
    <div class="app-container">
      <!-- Header Section -->
      <header class="header">
        <div class="logo">EasyMiles</div>
        <input type="text" placeholder="Search something here" class="search-bar" />
        <div class="icons">
          <span class="icon">❤</span>
          <span class="icon">👤</span>
        </div>
      </header>
  
      <div class="content">
        <!-- Sidebar Section -->
        <aside class="sidebar">
          <div class="filter-section">
            <h3>Type</h3>
            <ul>
              <li>Sport (10)</li>
              <li>SUV (12)</li>
              <li>MPV (16)</li>
              <li>Sedan (20)</li>
              <li>Coupe (14)</li>
              <li>Hatchback (14)</li>
            </ul>
          </div>
          <div class="filter-section">
            <h3>Capacity</h3>
            <ul>
              <li>2 Person</li>
              <li>4 Person</li>
              <li>6 Person</li>
              <li>8 or More</li>
            </ul>
          </div>
          <div class="filter-section">
            <h3>Price</h3>
            <input type="range" min="0" max="100" />
            <p>Max: $100.00</p>
          </div>
        </aside>
  
        <!-- Main Content Section -->
        <div class="main-content">
          <!-- Search Filters -->
          <div class="search-filters">
            <div class="filter">
              <select><option>Select Location</option></select>
              <input type="date" placeholder="Select Date" />
              <input type="time" placeholder="Select Time" />
            </div>
            <button class="sort-button">Sort</button>
          </div>
  
          <!-- Car Grid -->
          <div class="car-grid">
            <div v-for="car in cars" :key="car.id" class="car-card">
              <img :src="car.image" alt="Car Image" />
              <div class="car-info">
                <h4>{{ car.name }}</h4>
                <p>{{ car.type }}</p>
                <p>{{ formatCurrency(car.price) }} / day</p>
                <button class="rent-button">Rent Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Footer Section -->
      <footer class="footer">
        <div>©2024 EasyMiles. All rights reserved</div>
        <div>
          <a href="#">Privacy & Policy</a> | <a href="#">Terms & Conditions</a>
        </div>
      </footer>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        cars: [
          { id: 1, name: 'Koenigsegg', type: 'Sport', price: 99, image: 'car1.jpg' },
          { id: 2, name: 'Nissan GT-R', type: 'Sport', price: 80, image: 'car2.jpg' },
          { id: 3, name: 'Rolls-Royce', type: 'Sport', price: 96, image: 'car3.jpg' },
          { id: 4, name: 'All New Rush', type: 'SUV', price: 72, image: 'car4.jpg' },
          { id: 5, name: 'CR - V', type: 'SUV', price: 80, image: 'car5.jpg' },
          { id: 6, name: 'All New Terios', type: 'SUV', price: 74, image: 'car6.jpg' },
          { id: 7, name: 'MG ZX Exclusive', type: 'Hatchback', price: 76, image: 'car7.jpg' },
          { id: 8, name: 'New MGZS', type: 'SUV', price: 80, image: 'car8.jpg' },
        ]
      }
    },
    methods: {
      formatCurrency(value) {
        return `$${value.toFixed(2)}`;
      }
    }
  }
  </script>
  
  <style scoped>
  .app-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: #1e1e1e;
    color: #ffffff;
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    background-color: #333;
    align-items: center;
  }
  
  .logo {
    font-size: 1.5rem;
    color: #4a90e2;
  }
  
  .search-bar {
    flex-grow: 1;
    margin: 0 1rem;
    padding: 0.5rem;
    border-radius: 4px;
    border: none;
  }
  
  .icons .icon {
    margin-left: 1rem;
    cursor: pointer;
  }
  
  .content {
    display: flex;
    flex-grow: 1;
  }
  
  .sidebar {
    width: 250px;
    background-color: #333;
    padding: 1rem;
    color: #fff;
  }
  
  .filter-section h3 {
    margin-top: 1rem;
    font-size: 1.1rem;
  }
  
  .filter-section ul {
    list-style: none;
    padding: 0;
    margin: 0.5rem 0;
  }
  
  .filter-section li {
    margin: 0.3rem 0;
  }
  
  .filter-section input[type="range"] {
    width: 100%;
  }
  
  .main-content {
    padding: 1rem;
    flex-grow: 1;
  }
  
  .search-filters {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
  }
  
  .car-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
  }
  
  .car-card {
    background-color: #444;
    padding: 1rem;
    border-radius: 8px;
    text-align: center;
    color: #fff;
  }
  
  .car-card img {
    width: 100%;
    height: auto;
    border-radius: 4px;
  }
  
  .car-info h4 {
    margin: 0.5rem 0;
  }
  
  .rent-button {
    background-color: #4a90e2;
    color: #fff;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .footer {
    background-color: #222;
    color: #fff;
    padding: 1rem;
    text-align: center;
  }
  
  .footer a {
    color: #4a90e2;
    text-decoration: none;
  }
  </style>
  