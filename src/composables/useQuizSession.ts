import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { quizEngine, type QuizSession } from '@/lib/quiz/engine'

export function useQuizSession() {
    const router = useRouter()
    const route = useRoute()

    // Состояние квиза
    const session = ref<QuizSession | null>(null)
    const currentQuestionIndex = ref(0)
    const selectedAnswerIndex = ref<number | null>(null)
    const userScore = ref(0)
    const showAnswer = ref(false)
    const totalTime = ref(30) // общее время на вопрос
    const timeLeft = ref(30) // оставшееся время
    const timer = ref<ReturnType<typeof setInterval> | null>(null)

    // Вычисляемые свойства
    const currentQuestion = computed(() => {
        return session.value?.items[currentQuestionIndex.value] || null
    })

    // Инициализация сессии
    const initializeSession = () => {
        // Проверяем наличие seed в URL параметрах
        const seedFromUrl = route.query.seed as string

        if (seedFromUrl) {
            // Восстанавливаем сессию из seed
            session.value = quizEngine.decodeSessionSeed(seedFromUrl)
        } else {
            // Создаем новую сессию
            session.value = quizEngine.createSession()
            // Добавляем seed в URL для возможности восстановления
            router.replace({
                query: { seed: quizEngine.createSessionSeed(session.value) }
            })
        }

        startTimer()
    }

    // Запуск таймера
    const startTimer = () => {
        timeLeft.value = totalTime.value
        timer.value = setInterval(() => {
            timeLeft.value--
            if (timeLeft.value <= 0) {
                // Время вышло, останавливаем таймер и показываем ответы
                stopTimer()
                showAnswer.value = true
            }
        }, 1000)
    }

    // Остановка таймера  
    const stopTimer = () => {
        if (timer.value) {
            clearInterval(timer.value)
            timer.value = null
        }
    }

    // Выбор ответа
    const selectAnswer = (answerIndex: number) => {
        if (showAnswer.value || !session.value) return

        selectedAnswerIndex.value = answerIndex
        showAnswer.value = true
        stopTimer()

        // Проверяем правильность ответа и начисляем очки
        const isCorrect = quizEngine.checkAnswer(currentQuestionIndex.value, answerIndex, session.value)
        if (isCorrect) {
            const reward = quizEngine.getReward(currentQuestionIndex.value, session.value)
            userScore.value += reward
        }
    }

    // Переход к следующему вопросу
    const next = () => {
        if (!session.value) return

        stopTimer()

        if (currentQuestionIndex.value < session.value.items.length - 1) {
            // Переходим к следующему вопросу
            currentQuestionIndex.value++
            selectedAnswerIndex.value = null
            showAnswer.value = false
            startTimer()
        } else {
            // Квиз завершен, возвращаемся на стартовый экран с результатами
            router.push({
                name: 'start-screen',
                query: {
                    completed: 'true',
                    score: userScore.value.toString(),
                    total: session.value.totalReward.toString()
                }
            })
        }
    }


    // Lifecycle hooks
    onMounted(() => {
        initializeSession()
    })

    onUnmounted(() => {
        stopTimer()
    })

    return {
        // State
        session,
        currentQuestion,
        currentQuestionIndex,
        selectedAnswerIndex,
        userScore,
        showAnswer,
        totalTime,
        timeLeft,

        // Actions
        selectAnswer,
        next
    }
}
