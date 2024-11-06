<template>
  <div id="app" class="app-container">
    <!-- Header Section -->
    <Header />

    <div class="main-content">
      <!-- Main Content Section -->
      <div class="content">
        <!-- Car Details Section -->
        <div class="car-details-container">
          <div class="car-highlight">
            <img src="https://via.placeholder.com/400" alt="Car image" class="main-car-image" />
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
            <span class="review-count">{{ reviews.length }}</span>
            <button @click="openReviewModal" class="write-review-button">Write a Review</button>
          </div>

          <!-- Existing Reviews -->
          <div v-for="review in reviews" :key="review.id" class="review">
            <img src="https://via.placeholder.com/50" alt="Reviewer image" class="reviewer-img" />
            <div class="review-content">
              <div class="review-header">
                <h4>{{ review.name }}</h4>
                <span class="reviewer-title">{{ review.title }}</span>
              </div>
              <p class="review-text">{{ review.text }}</p>
              <div class="review-footer">
                <span class="review-date">{{ review.date }}</span>
                <div class="review-rating">{{ review.rating }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal for Review Form -->
        <div v-if="isReviewModalOpen" class="modal-overlay" @click="closeReviewModal">
          <div class="modal-content" @click.stop>
            <h2>Write a Review</h2>
            <form @submit.prevent="addReview" class="review-form">
              <input v-model="newReview.name" type="text" placeholder="Your Name" required />
              <input v-model="newReview.title" type="text" placeholder="Your Title" required />
              <textarea v-model="newReview.text" placeholder="Write your review" required></textarea>
              <div class="rating-section">
                <label>Rating:</label>
                <select v-model="newReview.rating" required>
                  <option value="⭐⭐⭐⭐⭐">⭐⭐⭐⭐⭐</option>
                  <option value="⭐⭐⭐⭐">⭐⭐⭐⭐</option>
                  <option value="⭐⭐⭐">⭐⭐⭐</option>
                  <option value="⭐⭐">⭐⭐</option>
                  <option value="⭐">⭐</option>
                </select>
              </div>
              <button type="submit" class="submit-button">Submit Review</button>
              <button type="button" @click="closeReviewModal" class="cancel-button">Cancel</button>
            </form>
          </div>
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
                  <span> {{ car.capacity }}L</span>
                  <span> {{ car.transmission }}</span>
                  <span> {{ car.seats }} People</span>
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
      isReviewModalOpen: false,
      recentCars: [
        { id: 1, name: 'Koenigsegg', type: 'Sport', price: 99, capacity: 90, transmission: 'Manual', seats: 2, image: 'https://via.placeholder.com/200', favorite: false },
        { id: 2, name: 'Nissan GT - R', type: 'Sport', price: 80, capacity: 80, transmission: 'Manual', seats: 2, image: 'https://via.placeholder.com/200', favorite: false },
        { id: 3, name: 'Rolls-Royce', type: 'Luxury', price: 96, capacity: 70, transmission: 'Automatic', seats: 4, image: 'https://via.placeholder.com/200', favorite: false },
      ],
      reviews: [
      ],
      newReview: {
        name: '',
        title: '',
        text: '',
        rating: '⭐⭐⭐⭐⭐'
      }
    };
  },
  methods: {
    formatCurrency(value) {
      return `$${value.toFixed(2)}`;
    },
    toggleFavorite(car) {
      car.favorite = !car.favorite;
    },
    openReviewModal() {
      this.isReviewModalOpen = true;
    },
    closeReviewModal() {
      this.isReviewModalOpen = false;
    },
    addReview() {
      const newReview = {
        ...this.newReview,
        id: Date.now(),
        date: new Date().toLocaleDateString()
      };
      this.reviews.push(newReview);
      this.newReview = { name: '', title: '', text: '', rating: '⭐⭐⭐⭐⭐' }; // Reset form
      this.isReviewModalOpen = false; // Close modal after submission
    }
  },
};
</script>

<style scoped>

.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #1a1a1a00;
  color: #fff;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}


.modal-content {
  background-color: #292929;
  padding: 30px;
  border-radius: 15px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.6);
}


.write-review-button {
  margin-left: auto;
  padding: 8px 16px;
  background: linear-gradient(135deg, #1e90ff, #00b4d8);
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9em;
  transition: background 0.3s ease;
}

.cancel-button {
  background-color: #555;
  color: #f0f0f0;
  padding: 12px 25px;
  border: none;
  border-radius: 8px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.main-content {
  display: flex;
  flex: 1;
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
  color: #ffff;
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
  font-size: 1.8em;
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
  padding: 15px;
  background-color: #444;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s;
}

.review:hover {
  transform: scale(1.02);
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
  font-size: 1.2em;
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
  line-height: 1.;
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

.review-form {
  background: linear-gradient(135deg, #1B1B1B);
  padding: 30px;
  border-radius: 20px;
  margin: auto;
  transition: transform 0.3s ease;
}

.review-form h2 {
  font-size: 2em;
  font-weight: bold;
  color: #e0e0e0;
  text-align: center;
  margin-bottom: 25px;
}

.review-form input,
.review-form textarea,
.review-form select {
  width: 100%;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 15px;
  border: none;
  background-color: #444;
  color: #fff;
  font-size: 1.1em;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.review-form input:focus,
.review-form textarea:focus,
.review-form select:focus {
  border-color: #00b4d8;
  background-color: #2b2b2b;
}

.rating-section {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}


.rating-section label {
  color: #e0e0e0;
  font-weight: bold;
  margin-right: 10px;
  font-size: 1.1em;
}
  .submit-button {
    background-color: #1e90ff;
    color: #fff;
    padding: 12px 25px;
    border: none;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
    font-size: 1em;
    transition: background-color 0.3s ease;
    margin-right: 10px;
  }
.submit-button:hover {
  background-color: #0073e6;
}
.review-form button {
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
