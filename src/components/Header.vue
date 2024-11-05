<!-- Header.vue -->
<template>
  <header class="header">
    <div>
      <a href="/home">
        <img src="@/assets/logo.png" alt="EasyMiles" style="width: 220px;" />
      </a>
      <div class="input-container">
        <font-awesome-icon :icon="['fas', 'magnifying-glass']" style="color: #E0E0E0;" />
        <input type="text" placeholder="Search something here..." class="search-bar" />
      </div>
    </div>
    <nav class="nav-icons" style="color: white;">
      <a href="/favorite">
        <font-awesome-icon :icon="['fas', 'heart']" class="icon" />
      </a>
      <font-awesome-icon :icon="['fas', 'bell']" class="icon" />
      <font-awesome-icon :icon="['fas', 'gear']" class="icon" />
      <font-awesome-icon :icon="['fas', 'user']" class="icon" />
    </nav>
  </header>
</template>

<script>
export default {};
</script>

<style scoped>
.header {
  max-height: 120px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 50px;
  border-bottom: 1px solid #2e2e2e;
}

.header img {
  margin-right: 50px;
  width: 220px;
}

.header div {
  display: flex;
  align-items: center;
}

.input-container {
  display: flex;
  align-items: center;
  background-color: #1e1e1e;
  border-radius: 25px;
  padding: 10px 20px;
  border: 1px solid #3e3e3e;
}

.search-bar {
  background: none;
  border: none;
  outline: none;
  color: #e0e0e0;
  padding: 0 10px;
  width: 300px;
  font-size: 16px;
}

.nav-icons {
  display: flex;
  gap: 20px;
}

.nav-icons .icon {
  font-size: 25px;
  border: 1px solid gray;
  border-radius: 50%;
  padding: 10px;
  cursor: pointer;
  color: #E0E0E0;
}
</style>