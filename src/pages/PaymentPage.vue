<template>
    <div class="checkout-container">
      <!-- Header -->
      <Header />
  
      <!-- Main Content -->
      <div class="content">
        <!-- Billing Info Section -->
        <section class="billing-info section-box">
          <div class="section-header">
            <h2>Billing Info</h2>
            <p class="step-indicator">Step 1 of 4</p>
          </div>
          <p class="section-description">Please enter your billing info</p>
          <div class="form-row">
            <div class="form-group">
              <label>Name</label>
              <input type="text" placeholder="Your name" />
            </div>
            <div class="form-group">
              <label>Phone Number</label>
              <input type="text" placeholder="Phone number" />
            </div>
            <div class="form-group">
              <label>Address</label>
              <input type="text" placeholder="Address" />
            </div>
            <div class="form-group">
              <label>Town / City</label>
              <input type="text" placeholder="Town or city" />
            </div>
          </div>
        </section>
  
        <!-- Rental Info Section -->
        <section class="rental-info section-box">
          <div class="section-header">
            <h2>Rental Info</h2>
            <p class="step-indicator">Step 2 of 4</p>
          </div>
          <p class="section-description">Please select your rental date</p>
          <div class="form-group-group">
            <div class="form-group">
              <label>Pick-Up</label>
              <select>
                <option>Select your city</option>
              </select>
              <select>
                <option>Select your date</option>
              </select>
              <select>
                <option>Select your time</option>
              </select>
            </div>
            <div class="form-group">
              <label>Drop-Off</label>
              <select>
                <option>Select your city</option>
              </select>
              <select>
                <option>Select your date</option>
              </select>
              <select>
                <option>Select your time</option>
              </select>
            </div>
          </div>
        </section>
  
        <!-- Payment Method Section -->
        <section class="payment-info section-box">
          <div class="section-header">
            <h2>Payment Method</h2>
            <p class="step-indicator">Step 3 of 4</p>
          </div>
          <p class="section-description">Please enter your payment method</p>
          <div class="form-row">
            <div class="form-group">
              <label>Credit Card</label>
              <input type="text" placeholder="Card number" />
              <input type="text" placeholder="Expiration Date" />
              <input type="text" placeholder="Card Holder" />
              <input type="text" placeholder="CVC" />
            </div>
            <div class="form-group payment-options">
              <input type="radio" name="payment" /> PayPal
              <input type="radio" name="payment" /> Bitcoin
            </div>
          </div>
        </section>
  
        <!-- Confirmation Section -->
        <section class="confirmation section-box">
          <div class="section-header">
            <h2>Confirmation</h2>
            <p class="step-indicator">Step 4 of 4</p>
          </div>
          <p class="section-description">
            We are getting to the end. Just a few clicks and your rental is ready!
          </p>
          <div class="form-group">
            <input type="checkbox" /> I agree with sending marketing and newsletter emails. No spam, promised!
            <input type="checkbox" /> I agree with our terms and conditions and privacy policy.
          </div>
          <button class="rent-button">Rent Now</button>
          <div class="security-note">
            <span class="security-icon">🔒</span> All your data are safe
          </div>
        </section>
      </div>
  
      <!-- Footer -->
      <Footer />
    </div>
  </template>
  
  <script>
  import Header from "@/components/Header.vue";
  import Footer from "@/components/Footer.vue";
  
  export default {
    name: "CheckoutPage",
    components: {
      Header,
      Footer,
    },
  };
  </script>
  
  <style scoped>
  /* Main Container */
  .checkout-container {
    background: #1B1B1B;
    color: #D3D3D3;
    font-family: 'Plus Jakarta Sans', sans-serif;
    padding: 20px;
    max-width: 1200px;
    margin: auto;
  }
  
  /* Header */
  .header {
    position: relative;
    background: #1B1B1B;
  }
  
  /* Section Boxes */
  .section-box {
    background: #2E2E2E;
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 20px;
  }
  
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .step-indicator {
    font-size: 14px;
    color: #A0A0A0;
  }
  
  .section-description {
    font-size: 14px;
    color: #A0A0A0;
    margin-bottom: 20px;
  }
  
  /* Form Layout */
  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
  
  .form-group-group {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
  }
  
  label {
    font-weight: 600;
    color: #E0E0E0;
    margin-bottom: 5px;
  }
  
  input, select {
    background: #333333;
    color: #D3D3D3;
    padding: 12px;
    border: none;
    border-radius: 5px;
    font-size: 14px;
  }
  
  .payment-options {
    display: flex;
    gap: 20px;
  }
  
  /* Buttons */
  .rent-button {
    background-color: #3563E9;
    border: none;
    border-radius: 10px;
    color: #ffffff;
    padding: 10px 20px;
    font-weight: bold;
    font-size: 16px;
    margin-top: 20px;
    cursor: pointer;
    transition: background 0.3s;
  }
  
  .rent-button:hover {
    background-color: #2d54c9;
  }
  
  /* Security Note */
  .security-note {
    display: flex;
    align-items: center;
    margin-top: 15px;
    font-size: 14px;
    color: #A0A0A0;
  }
  
  .security-icon {
    background: #3563E9;
    color: #ffffff;
    border-radius: 50%;
    padding: 5px;
    margin-right: 10px;
  }
  
  /* Footer */
  .footer {
    background: #1B1B1B;
    color: #D3D3D3;
    text-align: center;
    padding: 20px;
    font-size: 14px;
  }
  </style>
  