<template>
  <div class="welcome-container">
    <div class="welcome-card">
      <el-card class="welcome-content" shadow="hover">
        <div class="card-header">
          <h2 class="welcome-title">
            <el-icon><House /></el-icon>
            欢迎使用燃气管道风险评价程序
          </h2>
        </div>
        
        <el-divider />
        
        <div class="instructions">
          <p class="instruction-text">本程序的使用说明如下：</p>
          <div class="steps">
            <el-steps direction="vertical" :active="0" finish-status="success">
              <el-step title="输入管道名称" description="请先输入任意您所评价管段的名称" />
              <el-step title="进入评价页面" description="点击下方的按钮进入主页" />
              <el-step title="完成风险评价" description="在主页点击子项按钮进入评价，完成所有风险因素选择" />
              <el-step title="生成评价结果" description="点击'计算生成'按钮生成查看该管段风险评价结果" />
            </el-steps>
          </div>
        </div>

        <el-divider />

        <div class="input-section">
          <el-form @submit.prevent="handleEnter" class="pipeline-form">
            <el-form-item label="管道名称" :rules="[{ required: true, message: '请输入管道名', trigger: 'blur' }]">
              <el-input
                v-model="pipelineName"
                placeholder="请输入管道名"
                size="large"
                clearable
                maxlength="50"
                show-word-limit
                :prefix-icon="Edit"
              />
            </el-form-item>
            <el-form-item>
              <el-button 
                type="primary" 
                size="large" 
                @click="handleEnter"
                :disabled="!pipelineName.trim()"
                class="enter-button"
              >
                <el-icon><Right /></el-icon>
                进入评价系统
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAssessmentStore } from '@/stores/assessment'
import { House, Edit, Right } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const router = useRouter()
const assessmentStore = useAssessmentStore()
const pipelineName = ref('')

const handleEnter = () => {
  const name = pipelineName.value.trim()
  if (!name) {
    ElMessage.warning('请先输入管道名')
    return
  }
  
  assessmentStore.setPipelineName(name)
  router.push('/dashboard')
}
</script>

<style scoped>
.welcome-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
  padding: 20px;
}

.welcome-card {
  width: 100%;
  max-width: 800px;
}

.welcome-content {
  border-radius: 12px;
}

.card-header {
  text-align: center;
  margin-bottom: 10px;
}

.welcome-title {
  color: #409EFF;
  font-size: 28px;
  font-weight: 600;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.instructions {
  margin: 30px 0;
}

.instruction-text {
  font-size: 16px;
  color: #606266;
  margin-bottom: 20px;
  text-align: center;
}

.steps {
  margin: 20px 0;
}

.input-section {
  margin-top: 30px;
}

.pipeline-form {
  text-align: center;
}

.enter-button {
  width: 200px;
  height: 50px;
  font-size: 16px;
  font-weight: 600;
}

:deep(.el-step__title) {
  font-size: 16px;
  font-weight: 500;
}

:deep(.el-step__description) {
  font-size: 14px;
}

@media (max-width: 768px) {
  .welcome-title {
    font-size: 24px;
  }
  
  .enter-button {
    width: 100%;
  }
  
  .welcome-container {
    padding: 10px;
  }
}
</style>