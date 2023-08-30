window.addEventListener('DOMContentLoaded', () => {
    /* =======Tabs========= */

    const tabs = document.querySelectorAll(".our-services__button");
    const tabsContents = document.querySelectorAll(".our-services__content");
    const tabsList = document.querySelector(".our-services__buttons");

    function hideTabContent() {
        tabsContents.forEach(item => {
            item.style.display = 'none';
            item.classList.remove('right-to-left');
        });

        tabs.forEach(item => {
            item.classList.remove('tab-active');
            item.classList.remove('fade-in');
        });
    }

    function showTabContent(i = 0) {
        tabsContents[i].style.display = 'flex';
        tabsContents[i].classList.add('right-to-left');
        tabs[i].classList.add('tab-active', 'fade-in');
    }

    hideTabContent();
    showTabContent();

    tabsList.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target.classList.contains('our-services__button')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    /* ==============Our works============= */

   const cardsData = {
    'graphic-design': {
            images: ['./images/graphic-design/graphic-design4.jpg', 
                     './images/graphic-design/graphic-design5.jpg',
                     './images/graphic-design/graphic-design6.jpg',
                     './images/graphic-design/graphic-design7.jpg',
                     './images/graphic-design/graphic-design8.jpg',
                     './images/graphic-design/graphic-design9.jpg',
                    ],
        },
    'web-design': {
            images: ['./images/web-design/web-design4.jpg',
                     './images/web-design/web-design5.jpg',
                     './images/web-design/web-design6.jpg',
                     './images/web-design/web-design7.jpg',
                     './images/web-design/web-design8.jpg',
                     './images/web-design/web-design9.jpg',
                    ],
        },
    'landing-pages': {
            images: ['./images/landing-page/landing-page4.jpg',
                     './images/landing-page/landing-page5.jpg',
                     './images/landing-page/landing-page6.jpg',
                     './images/landing-page/landing-page7.jpg',
                     './images/landing-page/landing-page8.jpg',
                     './images/landing-page/landing-page9.jpg',
                    ],
        },
        'wordpress': {
            images: ['./images/wordpress/wordpress4.jpg',
                     './images/wordpress/wordpress5.jpg',
                     './images/wordpress/wordpress6.jpg',
                     './images/wordpress/wordpress7.jpg',
                     './images/wordpress/wordpress8.jpg',
                     './images/wordpress/wordpress9.jpg',
                    ],
        },
    };

    const buttonsMenu = document.querySelector('.our-work__buttons');
    const categoryWrap = document.querySelector('.our-work__body');
    const loadMoreButton = document.querySelector('.our-work__load-more');
    let cardsCount = 0;
    let totalCurrentCards = 0;
    let totalCards = 0;
    let allCardsLoaded = false;

    for (const category in cardsData) {
        if (cardsData.hasOwnProperty(category)) {
            totalCards += cardsData[category].images.length;
        }
    }

    const categoryFilter = (categoryKey) => {
        categoryWrap.querySelectorAll('.card-work').forEach(item => {
            if (categoryKey !== item.getAttribute('data-content') && categoryKey !== 'all') {
                item.style.display = 'none';
            } else {
                item.style.display = 'block';
                item.classList.add('fade-in');
            }
        });
    };

    const setActiveButton = (button) => {
        buttonsMenu.querySelectorAll('.our-work__button').forEach(btn => {
            btn.classList.remove('category-active');
        });
        button.classList.add('category-active');
    };

    const createCards = () => {
        const currentCategory = buttonsMenu.querySelector('.category-active').getAttribute('data-category');
        let categoryImages = null;
        if (currentCategory === 'all') {
            for (const category in cardsData) {
                categoryImages = cardsData[category].images.slice(cardsCount, cardsCount + 3);
                categoryImages.forEach(imageSrc => {
                    categoryWrap.insertAdjacentHTML('beforeend', `
                        <div class="our-work__card card-work fade-in" data-content="${category}">
                            <div class="card-work__image">
                                <img src="${imageSrc}">
                            </div>
                            <div class="card-work__info">
                                <div class="card-work__links">
                                    <a href="#" class="card-work__link show-more">
                                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                d="M13.913 2.72817L12.0948 0.891285C11.2902 0.0808612 9.98303 0.0759142 9.17679 0.882615L7.1592 2.89256C6.35159 3.69885 6.34816 5.01032 7.15049 5.82074L8.3035 4.68897C8.18676 4.32836 8.3304 3.9153 8.61591 3.62946L9.89948 2.35187C10.3061 1.94624 10.9584 1.94913 11.3595 2.35434L12.4513 3.45805C12.8528 3.86283 12.851 4.51713 12.4469 4.92318L11.1634 6.20241C10.8918 6.47296 10.4461 6.62168 10.1002 6.52626L8.97092 7.65887C9.77451 8.47177 11.0803 8.47466 11.8889 7.66837L13.9039 5.65924C14.7141 4.85254 14.7166 3.53983 13.913 2.72817ZM6.52612 10.0918C6.6219 10.4441 6.46856 10.8997 6.19091 11.1777L4.99226 12.3752C4.58072 12.7845 3.91594 12.7833 3.5067 12.369L2.39296 11.2475C1.98464 10.8349 1.98727 10.1633 2.39823 9.75473L3.59802 8.55769C3.8903 8.26607 4.31042 8.12025 4.6771 8.24375L5.83352 7.0715C5.01492 6.2462 3.68248 6.24207 2.86058 7.06324L0.915182 9.0042C0.0922462 9.8266 0.0883532 11.1629 0.906495 11.9886L2.75815 13.8618C3.57594 14.6846 4.90722 14.6912 5.7311 13.8701L7.67647 11.9287C8.49851 11.1054 8.50238 9.77166 7.68552 8.9443L6.52612 10.0918ZM6.25786 9.56307C5.98011 9.84189 5.53425 9.84105 5.26178 9.55812C4.98791 9.27434 4.99008 8.82039 5.26611 8.53993L8.59073 5.16109C8.86678 4.88227 9.31172 4.88311 9.58511 5.16398C9.86046 5.44569 9.85875 5.90088 9.58168 6.18299L6.25786 9.56307Z"
                                                fill="#1FDAB5" />
                                        </svg>
                                    </a>
                                    <a href="#" class="card-work__link follow-link"></a>
                                </div>
                                <h3 class="card-work__header">creative design</h3>
                                <div class="card-work__category">Web Design</div>
                            </div>
                        </div>
                    `);
                });
               totalCurrentCards += 3; 
            }
            cardsCount += 3;
            
            if (totalCurrentCards >= totalCards) {
                allCardsLoaded = true;
                loadMoreButton.style.display = 'none';
                return;
            }
              
        } 
    };

    buttonsMenu.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('our-work__button')) {

            categoryKey = target.getAttribute('data-category');

            if (categoryKey !== 'all' || allCardsLoaded === true) {
                loadMoreButton.style.display = 'none';
            } else {
                loadMoreButton.style.display = 'flex';
            }

            categoryFilter(categoryKey);
            setActiveButton(target);
        }
    });

    loadMoreButton.addEventListener('click', () => {
        const loader = document.querySelector('.our-work__loader-wrap');

        loadMoreButton.style.display = 'none';
        loader.style.display = 'block';

        setTimeout(() => {
            loader.style.display = 'none';
            loadMoreButton.style.display = 'flex';
            createCards();
        }, 1000);

    });


/* ==============reviews============= */

const reviewsBack = document.querySelector('.reviews-back');
const reviewsNext = document.querySelector('.reviews-next');
const previewItems = document.querySelectorAll('.reviews__image-item');
const reviewsContent = document.querySelectorAll('.reviews__content');
let activeSlideIndex = 0;

    function showSlide(index) {
        reviewsContent.forEach((slide, i) => {
            if (i === index) {
                slide.style.display = 'flex';
                slide.classList.add('up-down');
            } else {
                slide.style.display = 'none';
                slide.classList.remove('up-down');
            }
        });

        previewItems.forEach(item => {
            item.parentElement.classList.remove('avatar-active');
        });
        previewItems[index].parentElement.classList.add('avatar-active');
    };

    reviewsBack.addEventListener('click', () => {
        activeSlideIndex = (activeSlideIndex - 1 + reviewsContent.length) % reviewsContent.length;
        showSlide(activeSlideIndex);
    });

    reviewsNext.addEventListener('click', () => {
        activeSlideIndex = (activeSlideIndex + 1) % reviewsContent.length;
        showSlide(activeSlideIndex);
    });

    previewItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            activeSlideIndex = index;
            showSlide(activeSlideIndex);
        });
    });

    showSlide(activeSlideIndex);


    /* ==============Gallery============= */

    const galleryImages = [
        './images/gallery/image-19.jpg',
        './images/gallery/image-20.jpg',
        './images/gallery/image-21.jpg',
        './images/gallery/image-22.jpg',
        './images/gallery/image-23.jpg',
        './images/gallery/image-24.jpg',
        './images/gallery/image-25.jpg',
        './images/gallery/image-26.jpg',
        './images/gallery/image-27.jpg',
        './images/gallery/image-28.jpg',
        './images/gallery/image-29.jpg',
        './images/gallery/image-30.jpg',
        './images/gallery/image-31.jpg',
        './images/gallery/image-32.jpg',
        './images/gallery/image-33.jpg',
    ];


    const galleryBody = document.querySelector('.gallery__body');
    const galleryLoadMore = document.querySelector('.gallery__load-more');

    let imageCount = 0;
    let getImages = null;

    const addImages = () => {

        getImages = galleryImages.slice(imageCount, imageCount + 6);
        getImages.forEach(imageSrc => {
            galleryBody.insertAdjacentHTML('beforeend', `
                <div class="gallery__item">
                    <img src="${imageSrc}" alt="gallery-img">
                </div>
            `);
        });
        imageCount += 6;

        if (imageCount >= galleryImages.length) {
            galleryLoadMore.style.display = 'none';
            return;
        }
    };

    galleryLoadMore.addEventListener('click', () => {
        const loader = document.querySelector('.gallery__loader-wrap');

        galleryLoadMore.style.display = 'none';
        loader.style.display = 'flex';

        setTimeout(() => {
            loader.style.display = 'none';
            galleryLoadMore.style.display = 'flex';
            addImages();
        }, 1000)
    });
    

    
});
