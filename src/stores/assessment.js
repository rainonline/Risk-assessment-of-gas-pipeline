import { defineStore } from 'pinia'

export const useAssessmentStore = defineStore('assessment', {
  state: () => ({
    pipelineName: '',
    isSimulationMode: false,
    answers: {},
    sections: {
      '1': { title: '第三方破坏', completed: false },
      '2': { title: '腐蚀', completed: false },
      '3': { title: '设计因素', completed: false },
      '4': { title: '误操作', completed: false },
      '5': { title: '泄露分/人口分', completed: false }
    },
    results: null
  }),

  getters: {
    allSectionsCompleted: (state) => {
      return Object.values(state.sections).every(section => section.completed)
    },
    
    getAnswerById: (state) => (id) => {
      // Return the stored answer even if it's falsy (e.g., 0).
      return typeof state.answers[id] !== 'undefined' ? state.answers[id] : null
    }
  },

  actions: {
    setPipelineName(name) {
      this.pipelineName = name
    },

    setSimulationMode(enabled) {
      this.isSimulationMode = enabled
    },

    setAnswer(questionId, value) {
      this.answers[questionId] = value
    },

    setSectionCompleted(sectionId, completed = true) {
      if (this.sections[sectionId]) {
        this.sections[sectionId].completed = completed
      }
    },

    clearAnswers() {
      this.answers = {}
      Object.keys(this.sections).forEach(key => {
        this.sections[key].completed = false
      })
    },

    setResults(results) {
      this.results = results
    }
  }
})