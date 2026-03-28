window.onload = function() {
    const rotators = Array.from(document.querySelectorAll('.rotator'));

    rotators.forEach((rotator) => {
        // Находим все фразы внутри текущего ротатора
        const cases = Array.from(rotator.querySelectorAll('.rotator__case'));
        
        let activeIndex = cases.findIndex(item => item.classList.contains('rotator__case_active'));
        
        cases[activeIndex].style.color = cases[activeIndex].dataset.color;

        // Функция, которая будет менять фразы
        function changeSlide() {
            cases[activeIndex].classList.remove('rotator__case_active');

            activeIndex = (activeIndex + 1) % cases.length;

            const nextCase = cases[activeIndex];

            nextCase.classList.add('rotator__case_active');

            // ПОВЫШЕННАЯ СЛОЖНОСТЬ: Меняем цвет
            // dataset.color берет значение из атрибута data-color в HTML
            nextCase.style.color = nextCase.dataset.color;

            const speed = parseInt(nextCase.dataset.speed);

            setTimeout(changeSlide, speed);
        }

        // Запускаем первый цикл смены. Скорость берем у текущего (первого) элемента
        const initialSpeed = parseInt(cases[activeIndex].dataset.speed);
        setTimeout(changeSlide, initialSpeed);
    });
};