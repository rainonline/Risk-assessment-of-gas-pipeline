<template>
  <div class="header">
    <div class="header-content">
      <div class="logo-section">
        <img src="@/assets/img/logo.png" alt="Logo" class="logo" />
        <h1 class="title">燃气管道风险评价程序</h1>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.header {
  background-color: #23262E;
  height: 60px;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header-content {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.logo-section {
  display: flex;
  align-items: center;
}

.logo {
  height: 40px;
  width: auto;
  margin-right: 15px;
}

.title {
  color: #ffffff;
  font-size: 22px;
  font-weight: 500;
  margin: 0;
}

@media (max-width: 768px) {
  .title {
    font-size: 18px;
  }
  
  .logo {
    height: 35px;
  }
}
</style>