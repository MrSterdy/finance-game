import { QUESTIONS } from '@/lib/quiz/questions'
import { CHARACTERS } from '@/lib/quiz/characters'

export interface QuestionItem {
    question: string
    options: {
        correctEntryIndex: number
        entries: string[]
        explanation: {
            paragraphs: string[]
            buttons: {
                title: string
                description: string
                icon: string
                url: string
            }[]
            links: {
                content: string
                url: string
            }[]
        }
    }
    reward: number
}

export interface CharacterItem {
    name: string
    avatarUrl: string
}

export interface QuizSessionItem {
    character: CharacterItem
    question: QuestionItem
    id: string
}

export interface QuizSession {
    id: string
    items: QuizSessionItem[]
    totalReward: number
    createdAt: Date
}

export class QuizEngine {
    private static instance: QuizEngine

    private constructor() { }

    static getInstance(): QuizEngine {
        if (!QuizEngine.instance) {
            QuizEngine.instance = new QuizEngine()
        }
        return QuizEngine.instance
    }

    /**
     * Создает новую сессию квиза с 5 уникальными персонажами и вопросами
     */
    createSession(): QuizSession {
        // Перемешиваем вопросы и персонажей для уникальности
        const shuffledQuestions = this.shuffleArray([...QUESTIONS])
        const shuffledCharacters = this.shuffleArray([...CHARACTERS])

        // Берем первые 5 элементов
        const selectedQuestions = shuffledQuestions.slice(0, 5)
        const selectedCharacters = shuffledCharacters.slice(0, 5)

        // Создаем элементы сессии
        const items: QuizSessionItem[] = selectedQuestions.map((question, index) => ({
            character: selectedCharacters[index],
            question,
            id: this.generateId()
        }))

        // Вычисляем общую награду
        const totalReward = items.reduce((sum, item) => sum + item.question.reward, 0)

        const session: QuizSession = {
            id: this.generateId(),
            items,
            totalReward,
            createdAt: new Date()
        }

        return session
    }

    /**
     * Создает seed для сессии - зашифрованную строку с данными
     */
    createSessionSeed(session?: QuizSession): string {
        const sessionData = session || this.createSession()

        // Создаем компактное представление сессии
        const seedData = {
            items: sessionData.items.map(item => ({
                c: CHARACTERS.findIndex(char => char.name === item.character.name), // character index
                q: QUESTIONS.findIndex(quest => quest.question === item.question.question) // question index
            })),
            id: sessionData.id,
            ts: sessionData.createdAt.getTime()
        }

        // Конвертируем в Base64
        const jsonString = JSON.stringify(seedData)
        const seed = btoa(jsonString)

        return seed
    }

    /**
     * Расшифровывает seed и восстанавливает сессию
     */
    decodeSessionSeed(seed: string): QuizSession {
        try {
            const jsonString = atob(seed)
            const seedData = JSON.parse(jsonString)

            // Восстанавливаем элементы сессии
            const items: QuizSessionItem[] = seedData.items.map((item: any) => ({
                character: CHARACTERS[item.c],
                question: QUESTIONS[item.q],
                id: this.generateId()
            }))

            // Вычисляем общую награду
            const totalReward = items.reduce((sum, item) => sum + item.question.reward, 0)

            return {
                id: seedData.id,
                items,
                totalReward,
                createdAt: new Date(seedData.ts)
            }
        } catch (error) {
            console.error('Ошибка при декодировании seed:', error)
            // В случае ошибки создаем новую сессию
            return this.createSession()
        }
    }

    /**
     * Проверяет правильность ответа
     */
    checkAnswer(questionIndex: number, selectedAnswerIndex: number, session: QuizSession): boolean {
        if (questionIndex < 0 || questionIndex >= session.items.length) {
            return false
        }

        const question = session.items[questionIndex].question
        return question.options.correctEntryIndex === selectedAnswerIndex
    }

    /**
     * Получает награду за правильный ответ
     */
    getReward(questionIndex: number, session: QuizSession): number {
        if (questionIndex < 0 || questionIndex >= session.items.length) {
            return 0
        }

        return session.items[questionIndex].question.reward
    }

    /**
     * Перемешивает массив (Fisher-Yates shuffle)
     */
    private shuffleArray<T>(array: T[]): T[] {
        const shuffled = [...array]
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
        }
        return shuffled
    }

    /**
     * Генерирует уникальный ID
     */
    private generateId(): string {
        return Math.random().toString(36).substr(2, 9) + Date.now().toString(36)
    }
}

// Экспортируем singleton instance
export const quizEngine = QuizEngine.getInstance()
