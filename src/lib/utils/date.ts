/**
 * Форматирует время в секундах в формат MM:SS
 * @param seconds - количество секунд
 * @returns отформатированная строка времени
 */
export function formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

/**
 * Вычисляет прогресс в процентах
 * @param current - текущее значение
 * @param total - общее значение
 * @returns прогресс в процентах (0-100)
 */
export function calculateProgress(current: number, total: number): number {
    if (total <= 0) return 0
    return Math.max(0, Math.min(100, (current / total) * 100))
}
