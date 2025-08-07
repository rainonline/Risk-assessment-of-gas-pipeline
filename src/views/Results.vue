<template>
  <div class="results-container">
    <el-card shadow="hover" class="results-card">
      <template #header>
        <div class="results-header">
          <h2 class="results-title">
            <el-icon><DocumentChecked /></el-icon>
            {{ assessmentStore.pipelineName }} - 风险评价结果
          </h2>
        </div>
      </template>

      <div class="results-content">
        <div class="summary-section">
          <el-row :gutter="20">
            <el-col :xs="24" :sm="8">
              <el-statistic title="评价项目" :value="totalSections" suffix="项" />
            </el-col>
            <el-col :xs="24" :sm="8">
              <el-statistic title="完成项目" :value="completedSections" suffix="项" />
            </el-col>
            <el-col :xs="24" :sm="8">
              <el-statistic 
                title="完成率" 
                :value="completionRate" 
                suffix="%" 
                :value-style="{ color: completionRate === 100 ? '#67C23A' : '#E6A23C' }"
              />
            </el-col>
          </el-row>
        </div>

        <el-divider />

        <div class="detailed-results">
          <h3 class="section-title">详细评价结果</h3>
          
          <el-alert
            v-if="assessmentStore.isSimulationMode"
            title="模拟模式结果"
            description="当前为模拟模式，结果仅供参考"
            type="warning"
            show-icon
            :closable="false"
            class="simulation-warning"
          />

          <div class="results-grid">
            <el-row :gutter="20">
              <el-col :xs="24" :md="12" v-for="(section, id) in assessmentStore.sections" :key="id">
                <el-card class="result-item" shadow="hover">
                  <div class="result-content">
                    <div class="result-header">
                      <h4 class="result-title">{{ section.title }}</h4>
                      <el-tag 
                        :type="section.completed ? 'success' : 'info'"
                        size="small"
                      >
                        {{ section.completed ? '已完成' : '未完成' }}
                      </el-tag>
                    </div>
                    <div class="result-score">
                      <el-progress
                        :percentage="section.completed ? getRandomScore() : 0"
                        :status="section.completed ? 'success' : 'exception'"
                        :stroke-width="6"
                      />
                      <p class="score-text">
                        {{ section.completed ? '风险等级: 中等' : '未评价' }}
                      </p>
                    </div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </div>
        </div>

        <el-divider />

        <div class="overall-assessment">
          <h3 class="section-title">综合风险评价</h3>
          <div class="overall-score">
            <el-result
              :icon="overallIcon"
              :title="overallTitle"
              :sub-title="overallSubtitle"
            >
              <template #extra>
                <div class="risk-level">
                  <el-tag :type="overallTagType" size="large">
                    {{ overallRiskLevel }}
                  </el-tag>
                </div>
              </template>
            </el-result>
          </div>
        </div>
      </div>

      <div class="results-actions">
        <el-row :gutter="20" justify="center">
          <el-col :xs="24" :sm="8">
            <el-button size="large" @click="goBack">
              <el-icon><Back /></el-icon>
              返回首页
            </el-button>
          </el-col>
          <el-col :xs="24" :sm="8">
            <el-button type="primary" size="large" @click="exportResults">
              <el-icon><Download /></el-icon>
              导出结果
            </el-button>
          </el-col>
          <el-col :xs="24" :sm="8">
            <el-button type="success" size="large" @click="printResults">
              <el-icon><Printer /></el-icon>
              打印报告
            </el-button>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAssessmentStore } from '@/stores/assessment'
import { ElMessage } from 'element-plus'
import { 
  DocumentChecked,
  Back,
  Download,
  Printer,
  SuccessFilled,
  WarningFilled,
  CircleCloseFilled
} from '@element-plus/icons-vue'

const router = useRouter()
const assessmentStore = useAssessmentStore()

const totalSections = computed(() => Object.keys(assessmentStore.sections).length)
const completedSections = computed(() => 
  Object.values(assessmentStore.sections).filter(section => section.completed).length
)
const completionRate = computed(() => 
  Math.round((completedSections.value / totalSections.value) * 100)
)

const overallIcon = computed(() => {
  if (completionRate.value === 100) return SuccessFilled
  if (completionRate.value >= 60) return WarningFilled
  return CircleCloseFilled
})

const overallTitle = computed(() => {
  if (completionRate.value === 100) return '风险评价完成'
  if (completionRate.value >= 60) return '风险评价部分完成'
  return '风险评价未完成'
})

const overallSubtitle = computed(() => {
  if (completionRate.value === 100) return '所有评价项目已完成，可以查看完整的风险评价结果'
  return `还有 ${totalSections.value - completedSections.value} 个项目待完成`
})

const overallRiskLevel = computed(() => {
  if (completionRate.value === 100) return '中等风险'
  if (completionRate.value >= 60) return '部分评价'
  return '评价不完整'
})

const overallTagType = computed(() => {
  if (completionRate.value === 100) return 'warning'
  if (completionRate.value >= 60) return 'info'
  return 'danger'
})

const getRandomScore = () => {
  return Math.floor(Math.random() * 30) + 60 // Random score between 60-90
}

const goBack = () => {
  router.push('/dashboard')
}

const exportResults = () => {
  ElMessage.success('导出功能开发中...')
}

const printResults = () => {
  ElMessage.success('打印功能开发中...')
}
</script>

<style scoped>
.results-container {
  max-width: 1200px;
  margin: 0 auto;
}

.results-card {
  border-radius: 12px;
}

.results-header {
  text-align: center;
}

.results-title {
  color: #409EFF;
  font-size: 24px;
  font-weight: 600;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.results-content {
  padding: 20px 0;
}

.summary-section {
  margin-bottom: 30px;
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 20px;
  text-align: center;
}

.simulation-warning {
  margin-bottom: 20px;
}

.results-grid {
  margin: 20px 0;
}

.result-item {
  margin-bottom: 20px;
  border-radius: 8px;
}

.result-content {
  padding: 15px;
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.result-title {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
  margin: 0;
}

.result-score {
  margin-top: 15px;
}

.score-text {
  text-align: center;
  color: #606266;
  font-size: 14px;
  margin: 10px 0 0 0;
}

.overall-assessment {
  margin: 40px 0;
  text-align: center;
}

.overall-score {
  margin: 20px 0;
}

.risk-level {
  margin-top: 20px;
}

.results-actions {
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid #EBEEF5;
}

:deep(.el-statistic__content) {
  text-align: center;
}

:deep(.el-result__title) {
  font-size: 20px;
  margin-top: 15px;
}

@media (max-width: 768px) {
  .results-title {
    font-size: 20px;
  }
  
  .result-header {
    flex-direction: column;
    gap: 10px;
    text-align: center;
  }
}
</style>