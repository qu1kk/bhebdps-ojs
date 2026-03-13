class AlarmClock {
  constructor() {
    this.alarmCollection = []; // Коллекция звонков
    this.intervalId = null;    // ID таймера
  }

  // Добавление нового звонка
  addClock(time, callback) {
    if (!time || !callback) {
      throw new Error('Отсутствуют обязательные аргументы');
    }

    // Проверка на дубликат времени
    if (this.alarmCollection.some(alarm => alarm.time === time)) {
      console.warn('Уже присутствует звонок на это же время');
    }

    // Добавляем объект звонка в массив
    this.alarmCollection.push({
      time,
      callback,
      canCall: true // Можно ли запустить звонок
    });
  }

  // Удаление звонков по времени
  removeClock(time) {
    this.alarmCollection = this.alarmCollection.filter(alarm => alarm.time !== time);
  }

  // Получение текущего времени в формате HH:MM
  getCurrentFormattedTime() {
    const now = new Date();
    // Добавляем ноль в начало, если число меньше 10 (например, "09")
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  // Запуск будильника
  start() {
    // Если интервал уже запущен, ничего не делаем
    if (this.intervalId) {
      return;
    }

    // Создаем интервал, который работает каждую секунду (1000 мс)
    this.intervalId = setInterval(() => {
      const currentTime = this.getCurrentFormattedTime();

      this.alarmCollection.forEach(alarm => {
        // Если время совпало и звонок еще не вызывался в эту минуту
        if (alarm.time === currentTime && alarm.canCall) {
          alarm.canCall = false; // Помечаем, что вызвали (чтобы не звонил каждую секунду в течение этой минуты)
          alarm.callback();      // Выполняем действие
        }
      });
    }, 1000);
  }

  // Остановка будильника
  stop() {
    clearInterval(this.intervalId); // Удаляем интервал из памяти
    this.intervalId = null;         // Сбрасываем ID
  }

  // Сброс возможности запуска всех звонков
  resetAllCalls() {
    this.alarmCollection.forEach(alarm => {
      alarm.canCall = true;
    });
  }

  // Полная очистка будильника
  clearAlarms() {
    this.stop();
    this.alarmCollection = [];
  }
}