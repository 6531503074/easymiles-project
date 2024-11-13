<template>
    <div class="history-page">
        <Header />

        <div class="main-content">
            <h2>History</h2>
            <div class="in-progress-section">
                <h3>In Progress</h3>
                <div v-if="inProgressHistory.length === 0" class="no-history">
                    No rentals in progress.
                </div>
                <div class="history-item" v-for="payment in inProgressHistory" :key="payment.id">
                    <img :src="getCarImage(payment.model_image)" alt="Car image" class="car-image" />
                    <div class="car-info">
                        <h3>{{ payment.model_brand }} - {{ payment.model }}</h3>
                        <p>{{ payment.model_type }}</p>
                        <p>Rental ref #: {{ payment.id }}</p>
                        <p>Payment: {{ payment.payment_status }}</p>
                        <p>Booking: {{ payment.booking_status }}</p>
                    </div>
                    <div class="rental-info">
                        <div>
                            <p>{{ formatDate(payment.transactionDate) }}</p>
                            <p>${{ payment.totalPrice.toFixed(2) }}</p>
                            <p>Pickup: {{ payment.pickupLocation }} on {{ payment.pickupDate }} at {{ payment.pickupTime
                                }}</p>
                            <p>Drop-off: {{ payment.dropoffLocation }} on {{ payment.dropoffDate }} at {{
                                payment.dropoffTime }}</p>
                        </div>
                        <button @click="cancelBooking(payment.documentId, payment.carDid, payment.model_brand, payment.model)" class="cancel-button">Cancel Booking</button>
                    </div>
                </div>
            </div>

            <div class="history-section">
                <h3>Completed</h3>
                <div v-if="completedHistory.length === 0" class="no-history">
                    No rental history available.
                </div>
                <div class="history-item" v-for="payment in completedHistory" :key="payment.id">
                    <img :src="getCarImage(payment.model_image)" alt="Car image" class="car-image" />
                    <div class="car-info">
                        <h3>{{ payment.model_brand }} - {{ payment.model }}</h3>
                        <p>{{ payment.model_type }}</p>
                        <p>Rental ref #: {{ payment.id }}</p>
                        <p>Payment: {{ payment.payment_status }}</p>
                        <p>Booking: {{ payment.booking_status }}</p>
                    </div>
                    <div class="rental-info">
                        <div>
                            <p>{{ formatDate(payment.transactionDate) }}</p>
                            <p>${{ payment.totalPrice.toFixed(2) }}</p>
                            <p>Pickup: {{ payment.pickupLocation }} on {{ payment.pickupDate }} at {{ payment.pickupTime
                                }}</p>
                            <p>Drop-off: {{ payment.dropoffLocation }} on {{ payment.dropoffDate }} at {{
                                payment.dropoffTime }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <Footer />
    </div>
</template>

<script>
import axios from 'axios';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default {
    components: {
        Header,
        Footer,
    },
    data() {
        return {
            history: [],
            userDId: '',
            car_model: '',
            car_model_brand: '',
            carDid: '',
        };
    },
    computed: {
        inProgressHistory() {
            return this.history.filter(payment => payment.booking_status === 'Pending');
        },
        completedHistory() {
            return this.history.filter(payment => payment.booking_status !== 'Pending');
        },
    },
    methods: {
        async fetchPaymentHistory() {
            const token = localStorage.getItem('jwt'); // Ensure JWT token is stored
            try {
                const response = await axios.get(`http://localhost:1337/api/payments?filters[users_permissions_user][documentId][$eq]=${this.userDId}&populate[car][populate]=model_image&populate=users_permissions_user`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                this.history = response.data.data.map(payment => ({
                    ...payment.attributes,
                    id: payment.id,
                    documentId: payment.documentId,
                    model_image: payment.car.model_image.url,
                    model_brand: payment.car.model_brand,
                    model: payment.car.model,
                    model_type: payment.car.model_type,
                    carDid: payment.car.documentId,
                    transactionDate: payment.transactionDate,
                    totalPrice: payment.totalPrice,
                    payment_status: payment.payment_status,
                    booking_status: payment.booking_status,
                    pickupLocation: payment.pickupLocation,
                    dropoffLocation: payment.dropoffLocation,
                    pickupDate: payment.pickupDate,
                    dropoffDate: payment.dropoffDate,
                    pickupTime: payment.pickupTime,
                    dropoffTime: payment.dropoffTime,
                }));

                // Check and update booking status based on payment status and time
                this.checkAndUpdateBookingStatus();
            } catch (error) {
                console.error("Error fetching payment history:", error);
            }
        },
        async checkAndUpdateBookingStatus() {
            const token = localStorage.getItem('jwt');
            const currentTime = new Date();
            const updatePromises = [];

            this.history.forEach(payment => {
                const pickupDateTime = new Date(`${payment.pickupDate}T${payment.pickupTime}`);

                if (currentTime > pickupDateTime) {
                    if (payment.payment_status === 'Pending' || payment.payment_status === 'Failed') {
                        payment.booking_status = 'Failed';
                    } else if (payment.payment_status === 'Complete') {
                        payment.booking_status = 'Complete';
                    }

                    // Send update to the API if booking status changed
                    if (payment.booking_status !== 'Pending') {
                        updatePromises.push(
                            axios.put(`http://localhost:1337/api/payments/${payment.documentId}`, {
                                data: { booking_status: payment.booking_status },
                            }, {
                                headers: { Authorization: `Bearer ${token}` },
                            })
                        );
                    }
                }
            });

            // Await all updates
            await Promise.all(updatePromises);
        },
        async cancelBooking(paymentId, carDid, car_model_brand, car_model) {
            const token = localStorage.getItem('jwt');
            try {
                await axios.put(`http://localhost:1337/api/payments/${paymentId}`, {
                    data: { booking_status: 'Cancel' },
                }, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                await axios.post("http://localhost:1337/api/notifications", {
                    data: {
                        message: `Booking ${car_model_brand} - ${car_model} has been canceled.`,
                        timestamp: new Date().toISOString(),
                        users_permissions_user: this.userDId,
                        car: carDid,
                    },
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                alert('Booking canceled successfully!');
                this.fetchPaymentHistory(); // Refresh the history after cancellation
            } catch (error) {
                console.error("Error canceling booking:", error);
                alert('There was an error canceling the booking.');
            }
        },
        getCarImage(path) {
            return path ? `${import.meta.env.VITE_STRAPI_URL}${path}` : 'default-car-image.jpg';
        },
        formatDate(dateString) {
            return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
        },
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
        this.fetchPaymentHistory();
    },
};
</script>

<style scoped>
.history-page {
    background-color: #121212;
    color: #ffffff;
    padding: 20px;
}

.main-content {
    padding: 20px;
}

.in-progress-section,
.history-section {
    margin-top: 20px;
}

.history-item {
    display: flex;
    align-items: flex-start;
    padding: 15px;
    border-bottom: 1px solid #333;
    gap: 15px;
}

.car-image {
    width: 100px;
    height: 60px;
    object-fit: cover;
    border-radius: 5px;
}

.car-info {
    flex-grow: 1;
}

.car-info h3 {
    margin: 0;
    font-size: 1.2em;
    color: #ffffff;
}

.car-info p {
    margin: 4px 0;
    color: #b0b0b0;
}

.rental-info {
    text-align: right;
    font-size: 0.9em;
    color: #c0c0c0;
}

.rental-info p {
    margin: 5px 0;
}

.no-history {
    text-align: center;
    color: #888;
    padding: 20px;
}

.cancel-button {
    margin-top: 10px;
    padding: 5px 10px;
    background-color: #ff4d4d;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 0.9em;
}

.cancel-button:hover {
    background-color: #d93b3b;
}
</style>
