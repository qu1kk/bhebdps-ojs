// Базовый класс
class PrintEditionItem {
  constructor(name, releaseDate, pagesCount) {
    this.name = name;
    this.releaseDate = releaseDate;
    this.pagesCount = pagesCount;
    this.state = 100; // Обрати внимание: тут сработает наш сеттер!
    this.type = null;
  }

  // Метод улучшения состояния
  fix() {
    this.state = this.state * 1.5; // Сеттер сам не даст числу стать больше 100
  }

  // Сеттер
  set state(newState) {
    if (newState < 0) {
      this._state = 0;
    } else if (newState > 100) {
      this._state = 100;
    } else {
      this._state = newState;
    }
  }

  // Геттер
  get state() {
    return this._state;
  }
}

// Класс Журнал
class Magazine extends PrintEditionItem {
  constructor(name, releaseDate, pagesCount) {
    super(name, releaseDate, pagesCount);
    this.type = 'magazine';
  }
}

// Базовый класс Книга
class Book extends PrintEditionItem {
  constructor(author, name, releaseDate, pagesCount) {
    super(name, releaseDate, pagesCount);
    this.author = author;
    this.type = 'book';
  }
}

// Класс Роман
class NovelBook extends Book {
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount);
    this.type = 'novel';
  }
}

// Класс Фантастика
class FantasticBook extends Book {
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount);
    this.type = 'fantastic';
  }
}

// Класс Детектив
class DetectiveBook extends Book {
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount);
    this.type = 'detective';
  }
}

class Library {
  constructor(name) {
    this.name = name;
    this.books = [];
  }

  // Метод добавления книги
  addBook(book) {
    if (book.state > 30) {
      this.books.push(book);
    }
  }

  findBookBy(type, value) {
    const foundBook = this.books.find((item) => item[type] === value);
    
    return foundBook || null;
  }

  giveBookByName(bookName) {
    const bookIndex = this.books.findIndex((item) => item.name === bookName);

    if (bookIndex !== -1) {
      const givenBook = this.books.splice(bookIndex, 1)[0];
      return givenBook;
    }
    
    // Если книга не найдена
    return null;
  }
}

// ====== ТЕСТОВЫЙ СЦЕНАРИЙ ======
console.log("--- Начало тестирования библиотеки ---");

const library = new Library("Библиотека имени Ленина");

library.addBook(new DetectiveBook("Артур Конан Дойл", "Полное собрание повестей и рассказов о Шерлоке Холмсе в одном томе", 2019, 1008));
library.addBook(new FantasticBook("Аркадий и Борис Стругацкие", "Пикник на обочине", 1972, 168));
library.addBook(new NovelBook("Герберт Уэллс", "Машина времени", 1895, 138));
library.addBook(new Magazine("Мурзилка", 1924, 60));

let oldBook = library.findBookBy("releaseDate", 1919);
if (!oldBook) {
  console.log("Книга 1919 года не найдена. Создаем и добавляем...");
  library.addBook(new NovelBook("Кто-то", "Старая книга", 1919, 300));
}

console.log("Количество книг до выдачи: " + library.books.length);
let requestedBook = library.giveBookByName("Машина времени");
console.log("Количество книг после выдачи: " + library.books.length);

console.log("Состояние выданной книги до повреждения: " + requestedBook.state);
requestedBook.state = 10;
console.log("Состояние выданной книги после повреждения: " + requestedBook.state);

requestedBook.fix();
console.log("Состояние выданной книги после ремонта (fix): " + requestedBook.state);

library.addBook(requestedBook);
console.log("Количество книг после попытки возврата: " + library.books.length);

console.log("--- Конец тестирования ---");