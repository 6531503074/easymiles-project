<template>
  <div id="app" class="app-container">
    <!-- Header Section -->
    <Header />

    <div class="main-content">
      <!-- Main Content Section -->
      <div class="content">
        <!-- Car Details Section -->
        <div class="car-details-container">
          <div v-if="car" class="car-highlight">
            <img :src="getCarImage(car.model_image?.url)" alt="Car image" class="main-car-image" />
            <div v-if="car.part_image && car.part_image.length > 0" class="car-thumbnails"
              :class="{ 'scrollable': car.part_image.length > 2 }">
              <img v-for="(image, index) in car.part_image" :src="getCarImage(image.url)" :key="index" alt="Thumbnail"
                @click="openImageModal(index)" class="thumbnail-image" />
            </div>
          </div>
          <div v-if="car" class="car-info">
            <h2>{{ car.model_brand }} - {{ car.model }}</h2>
            <p class="car-description">{{ car.description || 'No description available' }}</p>
            <div class="price-section">
              <span class="car-price">{{ formatCurrency(car.pricePerDay) }} / day</span>
              <span v-if="car.discountPrice" class="original-price">Before: {{ formatCurrency(car.discountPrice)
                }}</span>
            </div>
            <button class="rent-button" @click.stop="goToPaymentPage">Rent Now</button>
            <ul class="car-specs">
              <li><strong>Type Car:</strong> {{ car.model_type }}</li>
              <li><strong>Transmission:</strong> {{ car.transmission }}</li>
              <li><strong>Capacity:</strong> {{ car.capacity }} Person</li>
              <li><strong>Fuel:</strong> {{ car.fuelType }}, {{ car.fuelcapacity }}L</li>
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
            <img :src="getImageUrl(review.avatar)" alt="Profile" class="review-profile-avatar" />
            <div class="review-content">
              <div class="review-header">
                <h4>{{ review.name }}</h4>
                <span class="reviewer-title">{{ review.title }}</span>
              </div>
              <p class="review-text">{{ review.text }}</p>
              <div class="review-footer">
                <span class="review-date">{{ formatDate(review.date) }}</span>
                <div class="review-rating">{{ formatRating(review.rating) }}</div>
              </div>
            </div>
          </div>

        </div>

        <!-- Modal for Review Form -->
        <div v-if="isReviewModalOpen" class="modal-overlay" @click="closeReviewModal">
          <div class="modal-content" @click.stop>
            <h2>Write a Review</h2>
            <form @submit.prevent="addReview" class="review-form">
              <input v-model="newReview.title" type="text" placeholder="Your Title" required />
              <textarea v-model="newReview.text" placeholder="Write your review" required></textarea>
              <div class="rating-section">
                <label>Rating:</label>
                <select v-model="newReview.rating" required>
                  <option value="5">⭐⭐⭐⭐⭐</option>
                  <option value="4">⭐⭐⭐⭐</option>
                  <option value="3">⭐⭐⭐</option>
                  <option value="2">⭐⭐</option>
                  <option value="1">⭐</option>
                </select>
              </div>
              <button type="submit" class="submit-button">Submit Review</button>
              <button type="button" @click="closeReviewModal" class="cancel-button">Cancel</button>
            </form>
          </div>
        </div>

        <!-- Recent Car Section styled similar to the category page -->
        <section>
          <h3>Recent Cars</h3>
          <div class="car-grid">
            <CarCard v-for="car in recentCars" :key="car.id" :car="car" />
          </div>
        </section>

        <div v-if="isImageModalOpen" class="image-modal-overlay" @click="closeImageModal">
          <div class="image-modal-content" @click.stop>
            <button class="modal-nav left" @click="prevImage">❮</button>
            <img :src="getCarImage(currentImageUrl)" alt="Large view" class="large-image" />
            <button class="modal-nav right" @click="nextImage">❯</button>
            <button class="close-modal" @click="closeImageModal">✖</button>
          </div>
        </div>

      </div>
    </div>

    <!-- Footer Section -->
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import CarCard from '@/components/CarCard.vue';
import axios from 'axios';

export default {
  props: ['id'],
  components: {
    Header,
    Footer,
    CarCard,
  },
  data() {
    return {
      car: null,
      isImageModalOpen: false,
      currentImageIndex: 0,
      isReviewModalOpen: false,
      recentCars: [], // Initialize as empty
      reviews: [],
      newReview: {
        name: '',
        title: '',
        text: '',
        rating: '0'
      }
    };
  },
  computed: {
    currentImageUrl() {
      return this.car.part_image[this.currentImageIndex]?.url || '';
    }
  },
  methods: {
    goToPaymentPage() {
      this.$router.push({ name: 'Payment', params: { id: this.car.documentId } });
    },
    async fetchCarDetails() {
      try {
        const response = await axios.get(`http://localhost:1337/api/cars/${this.id}?populate=*`);
        this.car = response.data.data;
        console.log(this.car);

      } catch (error) {
        console.error("Error fetching car details:", error);
      }
    },
    async fetchReviews() {
      try {
        const token = localStorage.getItem("jwt");
        if (!token) {
          console.error("JWT token is missing.");
          return;
        }
        const response = await axios.get(`http://localhost:1337/api/reviews?filters[car][id][$eq]=${this.car.id}&populate[users_permissions_user][populate]=profilePicture&populate=car`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.reviews = response.data.data.map((review) => ({
          ...review.attributes,
          id: review.id,
          title: review.title,
          text: review.comment,
          rating: review.rating,
          date: review.date,
          name: review.users_permissions_user.username,
          avatar: review.users_permissions_user.profilePicture.url,

        }));
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    },
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Intl.DateTimeFormat('en-US', options).format(new Date(dateString));
    },
    formatRating(rating) {
      return '⭐'.repeat(rating);
    },
    formatCurrency(value) {
      return value ? `$${value.toFixed(2)}` : '$0.00';
    },
    getCarImage(path) {
      return path ? `${import.meta.env.VITE_STRAPI_URL}${path}` : '/path/to/default-image.jpg';
    },
    openImageModal(index) {
      this.currentImageIndex = index;
      this.isImageModalOpen = true;
    },
    closeImageModal() {
      this.isImageModalOpen = false;
    },
    prevImage() {
      if (this.currentImageIndex > 0) {
        this.currentImageIndex--;
      }
    },
    nextImage() {
      if (this.currentImageIndex < this.car.part_image.length - 1) {
        this.currentImageIndex++;
      }
    },
    getImageUrl(path) {
      return path ? `${import.meta.env.VITE_STRAPI_URL}${path}` : 'car.png';
    },
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
    async addReview() {
      try {
        const token = localStorage.getItem("jwt");
        if (!token) {
          console.error("JWT token is missing.");
          return;
        }

        const currentTimestamp = new Date().toISOString();
        const response = await axios.post(
          `http://localhost:1337/api/reviews`,
          {
            data: {
              title: this.newReview.title,
              comment: this.newReview.text,
              rating: parseInt(this.newReview.rating),
              car: this.id,
              users_permissions_user: this.userDId,
              date: currentTimestamp,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        this.newReview = { title: '', text: '', rating: 5 };
        this.isReviewModalOpen = false;
        await this.fetchReviews(); // Fetch reviews again to include the new one
      } catch (error) {
        console.error("Error submitting review:", error);
      }
    },

    async loadRecentCars() {
      const recentCarDocumentIds = JSON.parse(localStorage.getItem('recentCars')) || [];

      if (recentCarDocumentIds.length === 0) {
        return;
      }

      try {
        const carRequests = recentCarDocumentIds.map(documentId =>
          axios.get(`http://localhost:1337/api/cars?filters[documentId][$eq]=${documentId}&populate=*`)
        );

        const carResponses = await Promise.all(carRequests);
        this.recentCars = carResponses.map(response => response.data.data[0]).filter(car => car);

        console.log(this.recentCars);
      } catch (error) {
        console.error("Error loading recent cars:", error);
      }
    },

    // Call this function to update recent cars in localStorage whenever a car is selected
    updateRecentCars(carId) {
      let recentCarIds = JSON.parse(localStorage.getItem('recentCars')) || [];

      // Add carId to recentCarIds if it's not already in the array
      if (!recentCarIds.includes(carId)) {
        recentCarIds.unshift(carId); // Add the new car ID to the start of the array
        if (recentCarIds.length > 5) recentCarIds.pop(); // Keep only the latest 5 cars
      }

      // Save the updated list back to localStorage
      localStorage.setItem('recentCars', JSON.stringify(recentCarIds));
    }
  },
  async mounted() {
    console.log("Detail page mounted with ID:", this.id);
    this.updateRecentCars(this.id);
    const token = localStorage.getItem("jwt");
    if (token) {
      try {

        // Fetch user details
        const userResponse = await axios.get(`http://localhost:1337/api/users/me?populate=*`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.userName = userResponse.data.username;
        this.email = userResponse.data.email;
        this.userDId = userResponse.data.documentId;
        this.avatar = userResponse.data.profilePicture.url;

      } catch (error) {
        console.error("Error fetching data from Strapi:", error);
      }
    } else {
      console.warn("No JWT token found. Please log in first.");
    }
    await this.fetchCarDetails();
    await this.fetchReviews();
    this.loadRecentCars();
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

.review-profile-avatar {
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

/* .show-all {
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
} */

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

/* .view-all {
  font-size: 0.9em;
  color: #007bff;
  cursor: pointer;
} */

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

/* Scrollable thumbnails */
.car-thumbnails {
  display: flex;
  /* gap: 10px; */
  overflow-x: auto;
  padding: 10px 0;
  max-width: 300px;
  /* Adjust the width to control the number of visible images */
  scrollbar-width: thin;
}

.car-thumbnails::-webkit-scrollbar {
  height: 8px;
  /* Height of the scrollbar */
}

.car-thumbnails::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 4px;
}

.car-thumbnails::-webkit-scrollbar-track {
  background-color: #444;
}


.car-thumbnails.scrollable {
  scrollbar-width: thin;
  scrollbar-color: #888 #444;
}

.thumbnail-image {
  border: 0.1px solid white;
  width: 100px;
  margin-right: 10px;
  cursor: pointer;
}

/* Modal overlay */
.image-modal-overlay {
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

.image-modal-content {
  position: relative;
  max-width: 90%;
  max-height: 90%;
  display: flex;
  align-items: center;
  background-color: #222;
  border-radius: 8px;
  padding: 20px;
}

.large-image {
  max-width: 80vw;
  max-height: 80vh;
  border-radius: 8px;
}

.modal-nav {
  background: none;
  border: none;
  color: #fff;
  font-size: 2em;
  cursor: pointer;
  padding: 10px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
}

.modal-nav.left {
  left: 20px;
}

.modal-nav.right {
  right: 20px;
}

.close-modal {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: #fff;
  font-size: 1.5em;
  cursor: pointer;
}
</style>
