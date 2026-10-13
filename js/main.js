if (document.querySelector('.welcome__slider')) {
    var swiper = new Swiper('.welcome__slider', {
        slidesPerView: 1,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
}
if (document.querySelector('.listing-slider')) {
    var swiper = new Swiper('.listing-slider', {
        slidesPerView: 1,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
}

document.addEventListener('DOMContentLoaded', function () {
    let menuItem = document.querySelectorAll('.menu__item');
    menuItem.forEach(function (btn){
        btn.addEventListener('click', function (){
            menuItem.forEach(function (item){ item.classList.remove('menu__item--active')})
            this.classList.add('menu__item--active');

        });
    })





    var listingPage = document.querySelector('.listing-page');
    var listingHero = document.querySelector('.listing__hero');
    var listingFeed = document.querySelector('.listing__feed');
    if (listingPage && listingHero && listingFeed) {
        var headerContent = document.querySelector('.header__content');
        var heroAway = false;
        var gesture = 0;
        var gestureTimer = 0;
        var lockUntil = 0;

        function measureListing() {
            if (headerContent) {
                var bar = Math.ceil(headerContent.getBoundingClientRect().bottom);
                if (bar > 0) {
                    listingPage.style.setProperty('--listing-bar', bar + 'px');
                }
            }
        }

        var openHero = listingHero.offsetHeight;
        if (openHero > 0) {
            listingPage.style.setProperty('--listing-hero', openHero + 'px');
        }

        function setHeroAway(next) {
            if (next === heroAway) {
                return;
            }
            heroAway = next;
            listingPage.classList.toggle('is-hero-away', next);
            gesture = 0;
            lockUntil = Date.now() + 520;
        }

        function onScrollIntent(delta, fromGesture) {
            if (!delta || document.querySelector('.modal.open')) {
                return;
            }
            if (!fromGesture && Date.now() < lockUntil) {
                return;
            }
            gesture += delta;
            clearTimeout(gestureTimer);
            gestureTimer = setTimeout(function () {
                gesture = 0;
            }, 180);
            if (gesture > 28) {
                setHeroAway(true);
            } else if (gesture < -28) {
                setHeroAway(false);
            }
        }

        measureListing();
        window.addEventListener('resize', measureListing);

        listingFeed.addEventListener('scroll', function () {
            var top = listingFeed.scrollTop;
            var delta = top - (listingFeed._lastTop || 0);
            listingFeed._lastTop = top;
            onScrollIntent(delta, false);
        }, { passive: true });

        listingPage.addEventListener('wheel', function (e) {
            onScrollIntent(e.deltaY, true);
            if (e.target.closest('.listing__hero')) {
                listingFeed.scrollTop += e.deltaY;
                e.preventDefault();
            } else if (e.deltaY < 0 && listingFeed.scrollTop <= 0) {
                e.preventDefault();
            }
        }, { passive: false });

        var touchY = 0;
        var touchX = 0;
        listingPage.addEventListener('touchstart', function (e) {
            touchY = e.touches[0].clientY;
            touchX = e.touches[0].clientX;
        }, { passive: true });
        listingPage.addEventListener('touchmove', function (e) {
            var y = e.touches[0].clientY;
            var x = e.touches[0].clientX;
            var deltaY = touchY - y;
            var deltaX = touchX - x;
            touchY = y;
            touchX = x;
            var onHero = e.target.closest('.listing__hero');
            if (onHero && Math.abs(deltaX) > Math.abs(deltaY)) {
                return;
            }
            onScrollIntent(deltaY, true);
            if (onHero) {
                listingFeed.scrollTop += deltaY;
                e.preventDefault();
            } else if (deltaY < 0 && listingFeed.scrollTop <= 0) {
                e.preventDefault();
            }
        }, { passive: false });
    }

    let lang = document.querySelectorAll('.btn__lang');
    lang.forEach( function (btn){
        btn.addEventListener('click', function (){
            lang.forEach( function (btn){
                btn.classList.remove('btn__lang--selected')
            })
            this.classList.add('btn__lang--selected')
        })
    })

    let infoBtn = document.querySelector('.btn__info');
    let info = document.querySelector('.product__features--info');
    if(infoBtn){
        infoBtn.addEventListener('click', function (e){
            e.preventDefault();
            if (info.classList.contains('open')){
                info.classList.remove('open')
            } else{
                info.classList.add('open')
            }

        });

    }


    let modificator = document.querySelectorAll('.modificator__item');
    if (modificator){
        modificator.forEach( function (btn) {
            btn.addEventListener('click', function (){
                this.classList.add('selected')
            })
        })
    }


    let modificatorDrink = document.querySelectorAll('.modificator__item--drink');
    if(modificatorDrink){
        modificatorDrink.forEach( function (btn) {
            btn.addEventListener('click', function (){
                modificatorDrink.forEach(function (item){item.classList.remove('selected')})
                this.classList.add('selected')
            })
        })

    }


    let modificatorCount = document.querySelectorAll('.modificator__count');
   if(modificatorCount){
       modificatorCount.forEach(function (btn){
           btn.addEventListener('click', function (e){
               e.stopPropagation();
               let count = this.innerText;
               count = parseInt(count) + 1;
               this.innerHTML = count;
           })
       })
   }


    let minus = document.querySelectorAll('.btn__minus');
   if (minus){
       minus.forEach(function (btn){
           btn.addEventListener('click', function (e){
               e.stopPropagation();
               this.parentElement.classList.remove('selected')
           })
       })
   }


    let size = document.querySelectorAll('.size');
    size.forEach(function (btn){
        btn.addEventListener('click', function (e){
            e.preventDefault();
            size.forEach(function (item){item.classList.remove('selected')})
            btn.classList.add('selected');
        })
    })

    let type = document.querySelectorAll('.btn__type');
    let tab= document.querySelectorAll('.modificator__list');
    type.forEach(function (btn){
        btn.addEventListener('click', function (e){
            type.forEach(function (item){item.classList.remove('selected')})
            tab.forEach(function (tab){tab.classList.remove('open')})
            let tabId = this.dataset.id;
            this.classList.add('selected');
            document.getElementById(tabId).classList.add('open')
        })
    })

    let modal = document.querySelector('#modal-allergy');
    let modalOpen = document.querySelector('.cart__allergic');
    let modalClose = document.querySelectorAll('.btn__close');
    let modalSets = document.querySelector('#modal-sets');
    let btnBurger = document.querySelector('.btn__burger');
    let modalMenu = document.querySelector('.modal--menu');
    let btn__cart = document.querySelector('.btn__cart');
    let btn__done = document.querySelector('.btn__done');
    let msgError = document.querySelector('.msg--error');

    if (btnBurger) {
        btnBurger.addEventListener('click', function (e) {
            e.preventDefault();
            modalMenu.classList.add('open')
        })
    }

    if (modal && modalOpen) {
        modalOpen.addEventListener('click', function (e){
                e.preventDefault();
                modal.classList.add('open')
            })

    }

    modalClose.forEach(function (btn){
        btn.addEventListener('click', function (e){
            e.preventDefault();
            if(modal){
                modal.classList.remove('open');
                
            }
            if(modalMenu){
                modalMenu.classList.remove('open');
            }
            if (modalSets) {
                modalSets.classList.remove('open');
            }
        })
    })
    if (btn__cart && modalSets) {
        btn__cart.addEventListener('click', function (e){
            e.preventDefault();
            modalSets.classList.add('open')
        })
    }
    if(btn__done){
        btn__done.addEventListener('click', function (){
            modal.classList.remove('open');
            msgError.classList.add('open');
            setTimeout(function (){
                msgError.classList.remove('open');
            }, 5000)
        })
    }
    let methods = document.querySelectorAll('.method');
    let changeTable = document.getElementById('change-table');
    let tableModal = document.getElementById('modal-table');
    if (methods.length && changeTable && tableModal) {
        let tableNumber = document.getElementById('table-number');
        let tableField = document.getElementById('table-field');
        let tableText = document.getElementById('table-text');
        let tableError = document.getElementById('table-error');
        let entry = '';

        function selectMethod(name) {
            methods.forEach(function (item) {
                item.classList.toggle('is-selected', item.dataset.method === name);
            });
            changeTable.classList.toggle('is-visible', name === 'table');
        }

        function renderEntry() {
            let hasError = tableField.classList.contains('is-error');
            if (!entry) {
                tableText.textContent = 'Номер стола';
                tableText.classList.add('is-placeholder');
                tableField.classList.remove('is-error');
                return;
            }
            tableText.textContent = entry;
            tableText.classList.remove('is-placeholder');
            if (hasError) {
                tableField.classList.add('is-error');
            }
        }

        function openTableModal() {
            entry = '';
            tableField.classList.remove('is-error');
            renderEntry();
            tableModal.classList.add('open');
        }

        function closeTableModal() {
            tableModal.classList.remove('open');
        }

        methods.forEach(function (btn) {
            btn.addEventListener('click', function () {
                selectMethod(this.dataset.method);
            });
        });

        changeTable.addEventListener('click', openTableModal);
        document.getElementById('table-close').addEventListener('click', closeTableModal);
        tableModal.addEventListener('click', function (e) {
            if (e.target === tableModal) {
                closeTableModal();
            }
        });

        let keypad = document.getElementById('keypad');
        if (keypad) {
            keypad.addEventListener('click', function (e) {
                let key = e.target.closest('[data-key]');
                if (!key) {
                    return;
                }
                tableField.classList.remove('is-error');
                if (key.dataset.key === 'back') {
                    entry = entry.slice(0, -1);
                } else if (entry.length < 3) {
                    entry += key.dataset.key;
                }
                renderEntry();
            });
        }

        document.getElementById('table-done').addEventListener('click', function () {
            let number = parseInt(entry, 10);
            if (!entry || number < 1 || number > 20) {
                if (entry) {
                    tableField.classList.add('is-error');
                    tableError.textContent = 'Такого стола нет';
                }
                return;
            }
            tableNumber.textContent = String(number);
            selectMethod('table');
            closeTableModal();
        });
    }

    let orderTabs = document.querySelectorAll('.order__tab');
    let orderList = document.getElementById('order-list');
    if (orderTabs.length && orderList) {
        let orders = {
            '413': {
                ready: false,
                status: 'Готовится',
                name: 'Стол',
                value: '2',
                text: 'Ожидайте свой заказ за столом',
                method: 'table',
                items: [
                    { name: 'Айс латте', extra: '+ миндальное молоко', img: 'img/product.png' },
                    { name: 'Шакшука', extra: '+ фета х2', img: 'img/Picture (7).png' },
                    { name: 'Завтрак - десерт', extra: '', img: 'img/ca992a66cc4ec2d5dc2be2f0e01143f9d80ed566.png' }
                ]
            },
            '416': {
                ready: true,
                status: 'Готов',
                name: 'Стойка',
                value: '2go',
                text: 'Заберите свой заказ на кассе',
                method: 'counter',
                items: [
                    { name: 'Лимонад малина мята', extra: '', img: 'img/0e1c9286cd63d062298ba1f60cda0ad4bf8073ff.jpg' }
                ]
            }
        };

        function goodsLabel(count) {
            let mod10 = count % 10;
            let mod100 = count % 100;
            if (mod10 === 1 && mod100 !== 11) {
                return count + ' товар';
            }
            if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) {
                return count + ' товара';
            }
            return count + ' товаров';
        }

        function selectOrder(id) {
            let order = orders[id];
            orderTabs.forEach(function (tab) {
                tab.classList.toggle('is-selected', tab.dataset.order === id);
            });
            document.getElementById('order-status').textContent = order.status;
            document.getElementById('order-method-name').textContent = order.name;
            document.getElementById('order-method-value').textContent = order.value;
            document.getElementById('order-method-text').textContent = order.text;
            // document.getElementById('icon-table').classList.toggle('is-hidden', order.method !== 'table');
            // document.getElementById('icon-counter').classList.toggle('is-hidden', order.method !== 'counter');
            document.getElementById('order-qty').textContent = goodsLabel(order.items.length);
            orderList.innerHTML = '';
            order.items.forEach(function (item) {
                let row = document.createElement('div');
                row.className = 'order-item';
                let extra = item.extra ? '<span>' + item.extra + '</span>' : '';
                row.innerHTML = '<img src="' + item.img + '" alt="">' +
                    '<div><h3>' + item.name + '</h3>' + extra + '</div>';
                orderList.appendChild(row);
            });
        }

        orderTabs.forEach(function (tab) {
            tab.addEventListener('click', function () {
                selectOrder(this.dataset.order);
            });
        });
        selectOrder('413');

        let receiptModal = document.getElementById('modal-receipt');
        let receiptEmail = document.getElementById('receipt-email');
        document.getElementById('send-receipt').addEventListener('click', function () {
            receiptEmail.value = '';
            receiptModal.classList.add('open');
            receiptEmail.focus();
        });
        document.getElementById('receipt-close').addEventListener('click', function () {
            receiptModal.classList.remove('open');
        });
        receiptModal.addEventListener('click', function (e) {
            if (e.target === receiptModal) {
                receiptModal.classList.remove('open');
            }
        });
        document.getElementById('receipt-done').addEventListener('click', function () {
            if (!receiptEmail.value.includes('@') || !receiptEmail.value.includes('.')) {
                receiptEmail.focus();
                return;
            }
            receiptModal.classList.remove('open');
        });


    }



});