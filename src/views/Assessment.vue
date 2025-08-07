<template>
  <div class="assessment-container">
    <el-card shadow="hover" class="assessment-card">
      <template #header>
        <div class="assessment-header">
          <h2 class="section-title">
            <el-icon><component :is="sectionIcon" /></el-icon>
            {{ sectionTitle }}
          </h2>
          <el-tag v-if="isCompleted" type="success">已完成</el-tag>
        </div>
      </template>

      <div class="assessment-content">
        <p class="coming-soon">此评价模块正在开发中...</p>
        <el-alert
          title="开发说明"
          description="Assessment 组件将包含具体的评价问题和表单。由于原始数据文件很大，这里展示的是框架结构。"
          type="info"
          show-icon
          :closable="false"
        />
      </div>

      <div class="assessment-actions">
        <el-row :gutter="20" justify="center">
          <el-col :span="8">
            <el-button size="large" @click="goBack">
              <el-icon><Back /></el-icon>
              返回首页
            </el-button>
          </el-col>
          <el-col :span="8">
            <el-button type="primary" size="large" @click="saveAndGoBack">
              <el-icon><Check /></el-icon>
              保存并返回
            </el-button>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAssessmentStore } from '@/stores/assessment'
import { ElMessage } from 'element-plus'
import { 
  Star, 
  Tools, 
  Setting, 
  Warning, 
  Location,
  Back,
  Check
} from '@element-plus/icons-vue'

const props = defineProps({
  section: {
    type: String,
    required: true
  }
})

const route = useRoute()
const router = useRouter()
const assessmentStore = useAssessmentStore()

const sectionConfig = {
  '1': { title: '第三方破坏', icon: Star },
  '2': { title: '腐蚀', icon: Tools },
  '3': { title: '设计因素', icon: Setting },
  '4': { title: '误操作', icon: Warning },
  '5': { title: '泄露分/人口分', icon: Location }
}

const sectionTitle = computed(() => sectionConfig[props.section]?.title || '未知评价项目')
const sectionIcon = computed(() => sectionConfig[props.section]?.icon || Star)
const isCompleted = computed(() => assessmentStore.sections[props.section]?.completed)

const goBack = () => {
  router.push('/dashboard')
}

const saveAndGoBack = () => {
  // Mark this section as completed
  assessmentStore.setSectionCompleted(props.section, true)
  ElMessage.success('评价已保存')
  router.push('/dashboard')
}
</script>

<style scoped>
.assessment-container {
  max-width: 1000px;
  margin: 0 auto;
}

.assessment-card {
  border-radius: 12px;
}

.assessment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.section-title {
  color: #409EFF;
  font-size: 24px;
  font-weight: 600;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.assessment-content {
  min-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.coming-soon {
  font-size: 18px;
  color: #909399;
  margin-bottom: 30px;
}

.assessment-actions {
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid #EBEEF5;
}

@media (max-width: 768px) {
  .section-title {
    font-size: 20px;
  }
  
  .assessment-header {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }
}
</style>