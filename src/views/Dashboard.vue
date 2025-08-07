<template>
  <div class="dashboard-container">
    <!-- Simulation mode alert -->
    <el-alert
      v-if="assessmentStore.isSimulationMode"
      title="模拟模式"
      description="已经进入模拟模式，此模式下计算结果不为真，仅供体验软件流程用"
      type="warning"
      show-icon
      :closable="false"
      class="simulation-alert"
    />

    <div class="dashboard-content">
      <el-card shadow="hover" class="main-card">
        <template #header>
          <div class="card-header">
            <h2 class="pipeline-title">
              <el-icon><Connection /></el-icon>
              {{ assessmentStore.pipelineName || '未命名管道' }} - 风险评价
            </h2>
          </div>
        </template>

        <div class="assessment-grid">
          <el-row :gutter="20">
            <el-col :xs="24" :sm="12" :md="8" v-for="section in sections" :key="section.id">
              <el-card 
                :class="['section-card', { 'completed': assessmentStore.sections[section.id]?.completed }]"
                shadow="hover"
                @click="goToAssessment(section.id)"
              >
                <div class="section-content">
                  <div class="section-icon">
                    <el-icon :size="32">
                      <component :is="section.icon" />
                    </el-icon>
                  </div>
                  <h3 class="section-title">{{ section.title }}</h3>
                  <div class="section-status">
                    <el-tag 
                      v-if="assessmentStore.sections[section.id]?.completed" 
                      type="success" 
                      size="small"
                    >
                      已完成
                    </el-tag>
                    <el-tag v-else type="info" size="small">待评价</el-tag>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>

        <el-divider />

        <div class="action-buttons">
          <el-row :gutter="20" justify="center">
            <el-col :xs="24" :sm="8" :md="6">
              <el-button 
                type="success" 
                size="large" 
                :disabled="!assessmentStore.allSectionsCompleted"
                @click="generateResults"
                class="action-btn"
              >
                <el-icon><DocumentChecked /></el-icon>
                计算生成
              </el-button>
            </el-col>
            <el-col :xs="24" :sm="8" :md="6">
              <el-button 
                type="warning" 
                size="large" 
                @click="enterSimulationMode"
                class="action-btn"
                :disabled="assessmentStore.isSimulationMode"
              >
                <el-icon><Monitor /></el-icon>
                模拟模式
              </el-button>
            </el-col>
            <el-col :xs="24" :sm="8" :md="6">
              <el-button 
                size="large" 
                @click="goBack"
                class="action-btn"
              >
                <el-icon><Back /></el-icon>
                返回首页
              </el-button>
            </el-col>
          </el-row>
        </div>

        <!-- Progress indicator -->
        <div class="progress-section" v-if="completedCount > 0">
          <el-divider content-position="center">评价进度</el-divider>
          <el-progress 
            :percentage="progressPercentage" 
            :status="progressPercentage === 100 ? 'success' : 'active'"
            :stroke-width="8"
            class="progress-bar"
          >
            <template #default="{ percentage }">
              <span class="percentage-text">{{ percentage }}%</span>
            </template>
          </el-progress>
          <p class="progress-text">已完成 {{ completedCount }}/{{ totalSections }} 个评价项目</p>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAssessmentStore } from '@/stores/assessment'
import { ElMessage, ElMessageBox } from 'element-plus'
import { 
  Connection, 
  Star, 
  Tools, 
  Setting, 
  Warning, 
  Location,
  DocumentChecked,
  Monitor,
  Back
} from '@element-plus/icons-vue'

const router = useRouter()
const assessmentStore = useAssessmentStore()

const sections = [
  { id: '1', title: '第三方破坏', icon: Star },
  { id: '2', title: '腐蚀', icon: Tools },
  { id: '3', title: '设计因素', icon: Setting },
  { id: '4', title: '误操作', icon: Warning },
  { id: '5', title: '泄露分/人口分', icon: Location }
]

const totalSections = computed(() => sections.length)
const completedCount = computed(() => 
  Object.values(assessmentStore.sections).filter(section => section.completed).length
)
const progressPercentage = computed(() => 
  Math.round((completedCount.value / totalSections.value) * 100)
)

const goToAssessment = (sectionId) => {
  router.push(`/assessment/${sectionId}`)
}

const generateResults = async () => {
  try {
    // Here we would normally calculate the results based on answers
    ElMessage.success('正在生成评价结果...')
    // Simulate calculation
    await new Promise(resolve => setTimeout(resolve, 1000))
    router.push('/results')
  } catch (error) {
    ElMessage.error('生成结果时出错')
  }
}

const enterSimulationMode = async () => {
  try {
    await ElMessageBox.confirm(
      '进入模拟模式将自动填充所有评价项目，计算结果仅供参考。是否继续？',
      '确认进入模拟模式',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )
    
    assessmentStore.setSimulationMode(true)
    // Auto-complete all sections in simulation mode
    sections.forEach(section => {
      assessmentStore.setSectionCompleted(section.id, true)
    })
    ElMessage.success('已进入模拟模式')
  } catch {
    // User cancelled
  }
}

const goBack = () => {
  router.push('/')
}
</script>

<style scoped>
.dashboard-container {
  max-width: 1200px;
  margin: 0 auto;
}

.simulation-alert {
  margin-bottom: 20px;
}

.dashboard-content {
  padding: 0;
}

.main-card {
  border-radius: 12px;
}

.card-header {
  text-align: center;
}

.pipeline-title {
  color: #409EFF;
  font-size: 24px;
  font-weight: 600;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.assessment-grid {
  margin: 30px 0;
}

.section-card {
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 8px;
  margin-bottom: 20px;
  min-height: 160px;
}

.section-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.section-card.completed {
  border-color: #67C23A;
  background: linear-gradient(135deg, #f0f9ff 0%, #e6f7ff 100%);
}

.section-content {
  text-align: center;
  padding: 20px 10px;
}

.section-icon {
  color: #409EFF;
  margin-bottom: 15px;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: #303133;
  margin: 0 0 15px 0;
}

.section-status {
  margin-top: 10px;
}

.action-buttons {
  margin: 30px 0;
}

.action-btn {
  width: 100%;
  height: 50px;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 10px;
}

.progress-section {
  margin-top: 40px;
}

.progress-bar {
  margin: 20px 0;
}

.percentage-text {
  font-size: 14px;
  font-weight: 600;
}

.progress-text {
  text-align: center;
  color: #606266;
  font-size: 14px;
  margin: 10px 0 0 0;
}

@media (max-width: 768px) {
  .pipeline-title {
    font-size: 20px;
  }
  
  .section-card {
    margin-bottom: 15px;
  }
  
  .assessment-grid {
    margin: 20px 0;
  }
}
</style>