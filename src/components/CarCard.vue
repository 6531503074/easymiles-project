<template>
    <div class="car-card">
      <img :src="car.image" alt="Car Image" />
      <div class="car-info">
        <h4>{{ car.name }}</h4>
        <p>{{ car.type }}</p>
        <p>{{ car.price | currency }} / day</p>
        <button class="rent-button">Rent Now</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['car'],
    filters: {
      currency(value) {
        return `$${value.toFixed(2)}`
      }
    }
  }
  </script>
  
  <style scoped>
  .car-card {
    background-color: #444;
    padding: 1rem;
    border-radius: 8px;
    text-align: center;
    color: #fff;
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
  </style>
  