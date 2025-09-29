<template>
  <div class="footer">
    <div class="footer-content">
      <el-link 
        href="http://mefaculty.tongji.edu.cn/" 
        target="_blank"
        type="primary"
        class="footer-link"
      >
        同济大学机械与能源工程学院
      </el-link>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.footer {
  background-color: #ffffff;
  border-top: 1px solid #e4e7ed;
  padding: 20px 0;
  text-align: center;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.footer-link {
  font-size: 14px;
  text-decoration: none;
}

.footer-link:hover {
  text-decoration: underline;
}
</style>