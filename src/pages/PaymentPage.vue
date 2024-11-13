<template>
  <div class="payment-page">
    <!-- Header Section -->
    <Header />

    <div class="content-wrapper">
      <!-- Main Content Area -->
      <div class="main-content">
        <!-- Billing Info Section -->
        <div class="section billing-info">
          <h3>Billing Info <span>Step 1 of 4</span></h3>
          <p>Please enter your billing info</p>
          <div class="input-group-billing">
            <div class="input-field-billing">
              <label for="name">Name</label>
              <input id="name" v-model="billingInfo.name" placeholder="Your name" />
            </div>
            <div class="input-field-billing">
              <label for="phone">Phone Number</label>
              <input id="phone" v-model="billingInfo.phone" placeholder="Phone number" />
            </div>
            <div class="input-field-billing">
              <label for="address">Address</label>
              <input id="address" v-model="billingInfo.address" placeholder="Address" />
            </div>
            <div class="input-field-billing">
              <label for="city">Town / City</label>
              <input id="city" v-model="billingInfo.city" placeholder="Town / City" />
            </div>
          </div>

        </div>

        <!-- Rental Info Section -->
        <div class="section rental-info">
          <h3>Rental Info <span>Step 2 of 4</span></h3>
          <p class="rental-info-message">Please select your rental date</p>
          <div class="input-group-rental">
            <div class="select-loc">
              <label>Pick-Up</label>
              <div>
                <select v-model="rentalInfo.pickupLocation">
                  <option value="">Select your city</option>
                  <option value="MFU D1">MFU D1</option>
                  <option value="MFU E3">MFU E3</option>
                  <option value="MFU M-SQUARE">MFU M-SQUARE</option>
                </select>
                <input v-model="rentalInfo.pickupDate" type="date" />
                <input v-model="rentalInfo.pickupTime" type="time" />
              </div>
            </div>
            <div class="select-loc">
              <label>Drop-Off</label>
              <div>
                <select v-model="rentalInfo.dropoffLocation">
                  <option value="">Select your city</option>
                  <option value="MFU D1">MFU D1</option>
                  <option value="MFU E3">MFU E3</option>
                  <option value="MFU M-SQUARE">MFU M-SQUARE</option>
                </select>
                <input v-model="rentalInfo.dropoffDate" type="date" />
                <input v-model="rentalInfo.dropoffTime" type="time" />
              </div>
            </div>
          </div>
          <p v-if="!isTimeValid" class="error-message">Drop-off date and time must be after pick-up date and time.</p>
        </div>

        <!-- Payment Method Section -->
        <div class="section payment-method">
          <h3>Payment Method <span>Step 3 of 4</span></h3>
          <p>Please enter your payment method</p>
          <div class="payment-header">
            <input type="radio" id="credit" value="Credit Card" v-model="paymentInfo.method" />
            <label for="credit">Credit Card</label>
            <input type="radio" id="paypal" value="PayPal" v-model="paymentInfo.method" />
            <label for="paypal">PayPal</label>
          </div>

          <div v-if="paymentInfo.method === 'Credit Card'" class="input-group-credit">
            <div class="input-field-credit">
              <label for="cardNumber">Card Number</label>
              <input id="cardNumber" v-model="paymentInfo.cardNumber" placeholder="Card number" />
            </div>
            <div class="input-field-credit">
              <label for="expirationDate">Expiration Date</label>
              <input id="expirationDate" v-model="paymentInfo.expirationDate" placeholder="Expiration Date (MM/YY)" />
            </div>
            <div class="input-field-credit">
              <label for="cardHolder">Card Holder</label>
              <input id="cardHolder" v-model="paymentInfo.cardHolder" placeholder="Card holder" />
            </div>
            <div class="input-field-credit">
              <label for="cvc">CVC</label>
              <input id="cvc" v-model="paymentInfo.cvc" placeholder="CVC" />
            </div>
          </div>
        </div>


        <!-- Confirmation Section -->
        <div class="section confirmation">
          <h3>Confirmation <span>Step 4 of 4</span></h3>
          <p class="confirmation-message">We are getting to the end. Just a few clicks and your rental is ready!</p>
          <div>
            <input type="checkbox" v-model="confirmation.marketingConsent" />
            <label>I agree with sending marketing and newsletter emails.</label>
          </div>
          <div>
            <input type="checkbox" v-model="confirmation.termsConsent" />
            <label>I agree with terms and conditions.</label>
          </div>
          <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
          <button @click="submitPayment" >Rent Now</button>
        </div>
      </div>

      <!-- Rental Summary Sidebar -->
      <div class="sidebar">
        <div class="section rental-summary">
          <h3>Rental Summary</h3>
          <p>Prices may change depending on the rental length and car model.</p>
          <div v-if="car" class="car-info">
            <img :src="getCarImage(car.model_image?.url)" alt="Car image" />
            <div class="car-summary-head">
              <h4>{{ car.model_brand }} - {{ car.model }}</h4>
              <div class="rating">
                <span v-html="starRating"></span> {{ reviewsCount }} Reviewer
              </div>
            </div>
            <div class="price-summary">
              <p>Price per day: ${{ car.pricePerDay }}</p>
              <p>Days: {{ rentalDays }}</p>
              <p>Subtotal: ${{ car.pricePerDay * rentalDays }}</p>
              <p>Tax(7%): ${{ calculateTax }}</p>
              <div class="total-price-summary">
                <div>
                  <h3>Total Rental Price</h3>
                  <p>Overall price and includes rental discount</p>
                </div>
                <h3 class="rentalPrice">${{ calculateTotalRentalPrice }}</h3>
              </div>
            </div>
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
import axios from 'axios';

export default {
  components: {
    Header,
    Footer,
  },
  props: ['id'],
  data() {
    return {
      car: null,
      totalPrice: 0,
      billingInfo: {
        name: '',
        phone: '',
        address: '',
        city: '',
      },
      rentalInfo: {
        pickupLocation: '',
        pickupDate: '',
        pickupTime: '',
        dropoffLocation: '',
        dropoffDate: '',
        dropoffTime: '',
      },
      paymentInfo: {
        method: 'Credit Card',
        cardNumber: '',
        expirationDate: '',
        cardHolder: '',
        cvc: '',
      },
      confirmation: {
        marketingConsent: false,
        termsConsent: false,
      },
      rentalDays: 0,
      reviews: [],
      reviewsCount: 0,
      averageRating: 0,
      errorMessage: '',
    };
  },
  computed: {
    starRating() {
      return '⭐'.repeat(Math.round(this.averageRating));
    },
    calculateTax() {
      return (this.car.pricePerDay * this.rentalDays * 0.07).toFixed(2);
    },
    calculateTotalRentalPrice() {
      const pricePerDay = this.car?.pricePerDay || 0;
      const subtotal = pricePerDay * this.rentalDays;
      const tax = subtotal * 0.07; // Assuming 7% tax
      this.totalPrice = (subtotal + tax).toFixed(2);
      return (subtotal + tax).toFixed(2);
    },
    isTimeValid() {
      const { pickupDate, pickupTime, dropoffDate, dropoffTime } = this.rentalInfo;
      
      // Ensure all date and time fields are filled
      if (!pickupDate || !pickupTime || !dropoffDate || !dropoffTime) return true;
      
      const pickupDateTime = new Date(`${pickupDate}T${pickupTime}`);
      const dropoffDateTime = new Date(`${dropoffDate}T${dropoffTime}`);
      
      return dropoffDateTime > pickupDateTime;
    },
  },
  watch: {
    'rentalInfo.pickupDate': 'calculateRentalDays',
    'rentalInfo.dropoffDate': 'calculateRentalDays',
  },
  async mounted() {
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
    // Fetch car details by documentId
    await this.fetchCarDetails();
    await this.fetchReviews();
  },
  methods: {
    async fetchCarDetails() {
      try {
        const response = await axios.get(`http://localhost:1337/api/cars/${this.id}?populate=*`);
        this.car = response.data.data;
      } catch (error) {
        console.error("Error fetching car details:", error);
      }
    },
    async fetchReviews() {
      const token = localStorage.getItem("jwt");
      // console.log(token);
      try {
        const reviewresponse = await axios.get(`http://localhost:1337/api/reviews?filters[car][id][$eq]=${this.car.id}&populate[users_permissions_user][populate]=profilePicture&populate=car`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.reviews = reviewresponse.data.data.map((review) => ({
          ...review.attributes,
          id: review.id,
          rating: review.rating,
        }));

        // Calculate average rating and total reviews count
        this.reviewsCount = this.reviews.length;
        if (this.reviewsCount > 0) {
          const totalRating = this.reviews.reduce((acc, review) => acc + review.rating, 0);
          this.averageRating = totalRating / this.reviewsCount;
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    },
    calculateRentalDays() {
      if (this.rentalInfo.pickupDate && this.rentalInfo.dropoffDate) {
        const pickup = new Date(this.rentalInfo.pickupDate);
        const dropoff = new Date(this.rentalInfo.dropoffDate);
        this.rentalDays = Math.max((dropoff - pickup) / (1000 * 60 * 60 * 24), 1);
      }
    },
    formatTimeToStrapi(time) {
      const date = new Date(`1970-01-01T${time}`);
      return date.toISOString().slice(11, -1); // HH:mm:ss.000
    },
    async submitPayment() {
      const token = localStorage.getItem("jwt");
      if (!this.confirmation.marketingConsent || !this.confirmation.termsConsent) {
        this.errorMessage = "Please agree to both terms to proceed with the rental.";
        return;
      }
      if (!this.isTimeValid) {
        this.errorMessage = "Please select a valid drop-off date and time after the pick-up time.";
        return;
      }
      this.errorMessage = '';
      const formattedPickupTime = this.formatTimeToStrapi(this.rentalInfo.pickupTime);
      const formattedDropoffTime = this.formatTimeToStrapi(this.rentalInfo.dropoffTime);
      try {
        const paymentData = {
          data: {
            method: this.paymentInfo.method,
            payment_status: "Complete",
            totalPrice: this.totalPrice,
            transactionDate: new Date().toISOString(),
            cardNumber: this.paymentInfo.cardNumber,
            expirationDate: this.paymentInfo.expirationDate,
            cvc: this.paymentInfo.cvc,
            pickupLocation: this.rentalInfo.pickupLocation,
            pickupDate: this.rentalInfo.pickupDate,
            pickupTime: formattedPickupTime,
            dropoffLocation: this.rentalInfo.dropoffLocation,
            dropoffDate: this.rentalInfo.dropoffDate,
            dropoffTime: formattedDropoffTime,
            users_permissions_user: this.userDId,
            car: this.id,
            booking_status: "Pending",
          },
        };

        await axios.post("http://localhost:1337/api/payments", paymentData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert("Payment submitted successfully!");
        await axios.post("http://localhost:1337/api/notifications", {
          data: {
            message: `The new ${this.car.model_brand} - ${this.car.model} has been rented.`,
            timestamp: new Date().toISOString(),
            users_permissions_user: this.userDId,
            car: this.id,
          },
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.$router.push("/home");
      } catch (error) {
        console.error("Error submitting payment:", error);
        alert("There was an error with your payment.");
      }
    },
    getCarImage(path) {
      return path ? `${import.meta.env.VITE_STRAPI_URL}${path}` : '/path/to/default-image.jpg';
    },
  },
};
</script>

<style scoped>
.payment-page {
  display: flex;
  flex-direction: column;
  background-color: #121212;
  color: #ffffff;
}

.content-wrapper {
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 20px;
  padding: 20px;
}

.main-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.sidebar {
  width: 100%;
}

.section {
  padding: 20px;
  background-color: #1f1f1f;
  border-radius: 10px;
}

.input-group-credit {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.input-field-credit {
  margin-top: 15px;
  display: flex;
  flex-direction: column;
}

.input-field-credit label {
  margin-bottom: 5px;
  font-size: 0.9em;
  color: #ffffff;
}

.input-field-credit input {
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #333;
  color: #fff;
}

.input-group-rental {
  display: flex;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.select-loc {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.input-group-rental label {
  margin-top: 5px;
  font-size: 0.9em;
  color: #ffffff;
}

.input-group-rental div {
  display: flex;
  gap: 15px;
}

.input-group-rental input {
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #333;
  color: #fff;
}

.input-group-billing {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.input-field-billing {
  display: flex;
  flex-direction: column;
}

.input-field-billing label {
  margin-bottom: 5px;
  font-size: 0.9em;
  color: #ffffff;
}

.input-field-billing input {
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #333;
  color: #fff;
}


input,
select {
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #333;
  color: #fff;
}

h3 {
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  margin-bottom: 10px;
}

.billing-info p,
.rental-info .rental-info-message,
.payment-method p,
.confirmation .confirmation-message {
  color: #aaa;
  font-size: 0.9rem;
  margin-top: -5px;
}

.confirmation label {
  color: #ffffff;
}

.payment-method input[type="radio"] {
  margin-right: 5px;
}

.payment-header label {
  color: #ffffff;
  margin-right: 10px;
}

.confirmation input[type="checkbox"] {
  margin-right: 10px;
}

.confirmation button {
  padding: 10px 20px;
  background-color: #1e90ff;
  color: #fff;
  border: none;
  border-radius: 5px;
  margin-top: 15px;
  cursor: pointer;
}

.rental-summary .car-info img {
  width: 100%;
  border-radius: 5px;
}

.rental-summary .rating {
  color: #ffa500;
}

.rental-summary button {
  margin-top: 10px;
  background: #333;
  border: none;
  color: #fff;
  padding: 5px 10px;
  border-radius: 5px;
}

.price-summary {
  border-top: 1px solid #333;
  padding-top: 10px;
}

.total-price-summary p {
  font-size: 0.8rem;
  color: #aaa;
  margin: -10px 0;
}

.total-price-summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: -10px;
}

.rentalPrice {
  font-size: 2rem;
}

.car-summary-head {
  display: flex;
  gap: 10px;
  align-items: center;
}

.error-message {
  color: red;
  font-size: 0.9em;
  margin-top: 10px;
}
</style>
