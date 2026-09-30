var swiper = new Swiper('.welcome__slider', {
    slidesPerView: 1,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});
var swiper = new Swiper('.listing-slider', {
    slidesPerView: 1,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

document.addEventListener('DOMContentLoaded', function () {
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
    infoBtn.addEventListener('click', function (e){
        e.preventDefault();
        if (info.classList.contains('open')){
            info.classList.remove('open')
        } else{
            info.classList.add('open')
        }

    })
});