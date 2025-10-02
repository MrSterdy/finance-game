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

/**
 * Получает дату в формате YYYY-MM-DD
 * @param date - дата (если не указана, используется текущая)
 * @returns дата в формате YYYY-MM-DD
 */
export function getDateString(date: Date = new Date()): string {
    return date.toISOString().split('T')[0]
}

/**
 * Проверяет, была ли дата вчера
 * @param dateString - дата в формате YYYY-MM-DD
 * @returns true если дата была вчера
 */
export function isYesterday(dateString: string): boolean {
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    return getDateString(yesterday) === dateString
}

/**
 * Проверяет, является ли дата сегодняшней
 * @param dateString - дата в формате YYYY-MM-DD
 * @returns true если дата сегодня
 */
export function isToday(dateString: string): boolean {
    return getDateString() === dateString
}

/**
 * Получает даты последних 7 дней (включая сегодня)
 * @returns массив дат в формате YYYY-MM-DD
 */
export function getLastWeekDates(): string[] {
    const dates: string[] = []
    const today = new Date()

    for (let i = 6; i >= 0; i--) {
        const date = new Date(today)
        date.setDate(date.getDate() - i)
        dates.push(getDateString(date))
    }

    return dates
}

/**
 * Получает название дня недели по индексу
 * @param dayIndex - индекс дня (0 = воскресенье, 1 = понедельник, ...)
 * @returns сокращённое название дня
 */
export function getDayName(dayIndex: number): string {
    const days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
    return days[dayIndex]
}

/**
 * Получает название месяца по индексу
 * @param monthIndex - индекс месяца (0 = январь, 1 = февраль, ...)
 * @returns сокращённое название месяца
 */
export function getMonthName(monthIndex: number): string {
    const months = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']
    return months[monthIndex]
}

/**
 * Проверяет, находится ли дата в текущей неделе
 * @param dateString - дата в формате YYYY-MM-DD
 * @returns true если дата в текущей неделе (последние 7 дней)
 */
export function isInCurrentWeek(dateString: string): boolean {
    const date = new Date(dateString)
    const today = new Date()
    const weekAgo = new Date(today)
    weekAgo.setDate(weekAgo.getDate() - 6) // 7 дней включая сегодня

    // Сбрасываем время для корректного сравнения дат
    date.setHours(0, 0, 0, 0)
    weekAgo.setHours(0, 0, 0, 0)
    today.setHours(23, 59, 59, 999)

    return date >= weekAgo && date <= today
}

/**
 * Проверяет, находится ли дата в текущем месяце
 * @param dateString - дата в формате YYYY-MM-DD
 * @returns true если дата в текущем месяце
 */
export function isInCurrentMonth(dateString: string): boolean {
    const date = new Date(dateString)
    const today = new Date()

    return date.getFullYear() === today.getFullYear() &&
        date.getMonth() === today.getMonth()
}