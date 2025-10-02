import { useLocalStorage } from "@vueuse/core";
import { getDateString, isToday, isYesterday } from "@/lib/utils/date";

export interface GameResult {
    date: string; // YYYY-MM-DD
    score: number;
    totalReward: number;
    correctAnswers: number;
    totalQuestions: number;
    averageAnswerTime: number; // среднее время ответа в секундах
}

export const profile = useLocalStorage('finquiz:profile', {
    balance: 0,
    statistics: {
        gamesPlayed: [] as GameResult[],
        streak: 0,
        maxStreak: 0, // максимальный стрик за все время
    },
    lastJoinedAt: null as string | null,
    onboardingCompleted: false,
});

/**
 * Инициализирует профиль при входе в приложение
 * Проверяет актуальность streak и сбрасывает его если нужно
 */
export function initializeProfile() {
    const lastJoined = profile.value.lastJoinedAt;

    // Если это не первый вход и пользователь не заходил сегодня
    if (lastJoined && !isToday(lastJoined)) {
        // Если последний вход был НЕ вчера - сбрасываем streak
        if (!isYesterday(lastJoined)) {
            profile.value.statistics.streak = 0;
        }
        // Если был вчера - streak остается, он обновится при завершении игры
    }
}

/**
 * Обновляет статистику после завершения игры
 * @param score - набранный счет
 * @param totalReward - общее количество монет
 * @param correctAnswers - количество правильных ответов
 * @param totalQuestions - общее количество вопросов
 * @param averageAnswerTime - среднее время ответа в секундах
 */
export function updateGameStatistics(
    score: number,
    totalReward: number,
    correctAnswers: number,
    totalQuestions: number,
    averageAnswerTime: number
) {
    const today = getDateString();

    // Вычисляем новый streak
    const newStreak = calculateStreak(profile.value.lastJoinedAt, profile.value.statistics.streak);

    // Проверяем, была ли уже игра сегодня
    const todayGameIndex = profile.value.statistics.gamesPlayed.findIndex(
        game => game.date === today
    );

    const gameResult: GameResult = {
        date: today,
        score,
        totalReward,
        correctAnswers,
        totalQuestions,
        averageAnswerTime,
    };

    if (todayGameIndex !== -1) {
        // Вычитаем старый счет и добавляем новый
        const oldScore = profile.value.statistics.gamesPlayed[todayGameIndex].score;
        profile.value.balance = profile.value.balance - oldScore + score;

        // Обновляем результат сегодняшней игры
        profile.value.statistics.gamesPlayed[todayGameIndex] = gameResult;
    } else {
        // Добавляем новую игру и увеличиваем баланс
        profile.value.statistics.gamesPlayed.push(gameResult);
        profile.value.balance += score;
    }

    // Обновляем streak и дату последнего входа
    profile.value.statistics.streak = newStreak;
    profile.value.lastJoinedAt = today;

    // Обновляем максимальный стрик если текущий больше
    if (newStreak > profile.value.statistics.maxStreak) {
        profile.value.statistics.maxStreak = newStreak;
    }
}

/**
 * Вычисляет новое значение streak
 * @param lastJoinedAt - дата последнего входа в формате YYYY-MM-DD или null
 * @param currentStreak - текущее значение streak
 * @returns новое значение streak
 */
export function calculateStreak(lastJoinedAt: string | null, currentStreak: number): number {
    // Если пользователь играет впервые
    if (!lastJoinedAt) {
        return 1
    }

    // Если последняя игра была сегодня - streak не меняется
    if (isToday(lastJoinedAt)) {
        return currentStreak
    }

    // Если последняя игра была вчера - увеличиваем streak
    if (isYesterday(lastJoinedAt)) {
        return currentStreak + 1
    }

    // Если последняя игра была раньше вчера - сбрасываем streak
    return 1
}