const loader = document.getElementById('loader');
const items = document.getElementById('items');

const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://students.netoservices.ru/nestjs-backend/slow-get-courses');

// Показываем лоадер при старте
loader.classList.add('loader_active');

xhr.addEventListener('readystatechange', () => {
  if (xhr.readyState === xhr.DONE && xhr.status === 200) {
    const data = JSON.parse(xhr.responseText);
    const valute = data.response.Valute;
    
    // Очищаем лоадер
    loader.classList.remove('loader_active');
    
    // Добавляем валюты
    for (let key in valute) {
      const item = valute[key];
      items.innerHTML += `
        <div class="item">
          <div class="item__code">${item.CharCode}</div>
          <div class="item__value">${item.Value}</div>
          <div class="item__currency">руб.</div>
        </div>
      `;
    }
  }
});

xhr.send();