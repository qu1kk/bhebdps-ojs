window.onload = function() {
    const menuLinks = Array.from(document.querySelectorAll('.menu__link'));

    menuLinks.forEach((link) => {
        link.onclick = function(event) {
            const menuItem = link.closest('.menu__item');
            const subMenu = menuItem.querySelector('.menu__sub');

            if (subMenu) {
                event.preventDefault(); 

                const activeMenus = Array.from(document.querySelectorAll('.menu_active'));
                activeMenus.forEach((activeMenu) => {
                    if (activeMenu !== subMenu) {
                        activeMenu.classList.remove('menu_active');
                    }
                });

                subMenu.classList.toggle('menu_active');
            }
        };
    });
};