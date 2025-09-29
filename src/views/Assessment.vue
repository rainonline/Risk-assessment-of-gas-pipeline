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
            <div v-if="!sectionList || sectionList.length === 0" class="coming-soon">
              <p>当前评价项暂无题目数据。</p>
              <p>请返回仪表盘选择其他评价项或确认数据已加载。</p>
            </div>

            <div v-else class="questions-wrapper">
              <el-form label-position="top" class="questions-form">
                <div v-for="(group, gIndex) in sectionList" :key="gIndex" class="question-group">
                  <el-card shadow="never" class="group-card">
                    <template #header>
                      <div class="group-header">
                        <strong>{{ group.title }}</strong>
                      </div>
                    </template>

                    <div class="group-body">
                      <div v-for="q in group.list" :key="q.id" class="question-item">
                        <el-form-item :label="q.question">
                          <el-radio-group v-model="localAnswers[q.id]" @change="onAnswerChange(q.id, $event)">
                            <el-radio v-for="(ans, idx) in q.answers" :key="idx" :label="ans.value">
                              {{ ans.answer }}
                            </el-radio>
                          </el-radio-group>
                        </el-form-item>
                      </div>
                    </div>
                  </el-card>
                </div>
              </el-form>
            </div>
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
import { computed, reactive, onMounted } from 'vue'
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
import { questionsData } from '@/stores/questionsData'

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

// Local reactive answers bound to the form. Keys are question ids.
const localAnswers = reactive({})

const sectionKey = computed(() => `data${props.section}`)
const sectionList = computed(() => questionsData[sectionKey.value] || [])
const sectionDataTitle = computed(() => questionsData[`${sectionKey.value}-title`] || sectionConfig[props.section]?.title)

// Populate localAnswers from store on mount
onMounted(() => {
  sectionList.value.forEach(group => {
    group.list.forEach(q => {
      const stored = assessmentStore.getAnswerById(q.id)
      if (stored !== null && stored !== undefined) {
        localAnswers[q.id] = stored
      } else if (localAnswers[q.id] === undefined) {
        // initialize to null to keep reactivity
        localAnswers[q.id] = null
      }
    })
  })
})

const getAllQuestionIds = () => {
  const ids = []
  sectionList.value.forEach(group => group.list.forEach(q => ids.push(q.id)))
  return ids
}

const isAllAnswered = computed(() => {
  const ids = getAllQuestionIds()
  return ids.length > 0 && ids.every(id => localAnswers[id] !== null && localAnswers[id] !== undefined)
})

const onAnswerChange = (questionId, value) => {
  // ensure reactive update and persist to store
  localAnswers[questionId] = value
  assessmentStore.setAnswer(questionId, value)
}

const goBack = () => {
  router.push('/dashboard')
}

const saveAndGoBack = () => {
  // Persist any remaining local answers to store
  Object.keys(localAnswers).forEach(k => {
    const id = Number(k)
    assessmentStore.setAnswer(id, localAnswers[id])
  })

  if (!isAllAnswered.value) {
    ElMessage.warning('还有题目未作答，已保存当前作答，返回后可继续完成')
  } else {
    assessmentStore.setSectionCompleted(props.section, true)
    ElMessage.success('评价已保存并标记为完成')
  }

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
  justify-content: flex-start;
  align-items: stretch;
  text-align: left;
}

.coming-soon {
  font-size: 18px;
  color: #909399;
  margin: 12px 0 20px 0;
}

.assessment-actions {
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid #EBEEF5;
}

/* Questions layout */
.questions-wrapper {
  width: 100%;
}

.questions-form {
  width: 100%;
}

.group-card {
  margin-bottom: 14px;
}

.question-item {
  padding: 8px 0;
}

/* Make action buttons full width on small screens */
@media (max-width: 600px) {
  .assessment-card {
    border-radius: 8px;
  }

  .assessment-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .assessment-actions {
    margin-top: 20px;
  }

  .assessment-actions .el-button {
    width: 100%;
    margin-bottom: 8px;
  }
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