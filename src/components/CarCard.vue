<template>
  <div class="car-card" @click="goToDetailPage">
    <div>
      <div class="card-header">
        <h4>{{ car.model || 'Unknown Model' }}</h4>
        <span class="favorite-icon" style="color: gray; font-size: larger;">❤</span>
      </div>
      <p class="car-type">{{ car.model_type || 'Unknown Type' }}</p>
    </div>
    <img :src="getImageUrl(car.model_image?.url)" alt="Car Image" @error="onImageError" />

    <div class="car-card-bottom">
      <div class="car-details">
        <span>⛽{{ car.fuelcapacity || 'N/A' }}L</span>
        <span>⚙️{{ car.transmission || 'N/A' }}</span>
        <span>👤{{ car.capacity || 'N/A' }} People</span>
      </div>

      <div class="price">
        <p>{{ formatCurrency(car.pricePerDay || 0) }} / day</p>
        <p class="discounted-price" v-if="car.discountPrice">Before: {{ formatCurrency(car.discountPrice) }}</p>
      </div>

      <button class="rent-button" @click.stop="">Rent Now</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['car'],
  methods: {
    formatCurrency(value) {
      return `$${value.toFixed(2)}`;
    },
    getImageUrl(path) {
      return path ? `${import.meta.env.VITE_STRAPI_URL}${path}` : 'car.png';
    },
    onImageError(event) {
      event.target.src = 'car.png';
    },
    goToDetailPage() {
      // this.$router.push({ name: 'Detail', params: { id: this.car.documentId } });
      const url = `/detail/${this.car.documentId}`;
      window.location.href = url;
    },
  },
};
</script>

<style scoped>
.favorite-icon {
  cursor: pointer;
}

.car-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #333;
  border-radius: 8px;
  color: #fff;
  padding: 1rem;
  text-align: center;
  position: relative;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.car-card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.favorite-icon {
  cursor: pointer;
  color: #ff5a5f;
}

.car-type {
  color: #aaa;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  margin-top: -10px;
  text-align: left;
}

.car-card img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 0.5rem 0;
}

.car-details {
  display: flex;
  justify-content: space-between;
  color: #bbb;
  font-size: 0.9rem;
  margin: 0.5rem 0;
}

.price {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 0.5rem;
  align-items: center;
  margin: 0.5rem 0;
}

.discounted-price {
  text-decoration: line-through;
  color: #ff5a5f;
  font-size: 0.8rem;
}

.rent-button {
  background-color: #4a90e2;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
}

.rent-button:hover {
  background-color: #1a73e8;
}
</style>
