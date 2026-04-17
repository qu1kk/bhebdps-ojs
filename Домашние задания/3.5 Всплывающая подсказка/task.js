const hasTooltip = document.querySelectorAll('.has-tooltip');

hasTooltip.forEach((link) => {
  link.onclick = (e) => {
    e.preventDefault();
    
    // Проверяем, есть ли уже подсказка у этой ссылки
    let tooltip = link.querySelector('.tooltip');
    
    if (tooltip) {
      tooltip.classList.toggle('tooltip_active');
    } else {
      // Создаем новую, если нет
      tooltip = document.createElement('div');
      tooltip.classList.add('tooltip', 'tooltip_active');
      tooltip.textContent = link.getAttribute('title');
      
      // Позиционирование
      tooltip.style.left = link.getBoundingClientRect().left + 'px';
      tooltip.style.top = link.getBoundingClientRect().bottom + 'px';
      
      link.appendChild(tooltip);
    }
  };
});