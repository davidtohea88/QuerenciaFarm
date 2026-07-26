        // ==========================================
        // PRELOADER LOGIC
        // ==========================================
        window.addEventListener('load', () => {
            const preloader = document.getElementById('preloader');
            setTimeout(() => {
                preloader.classList.add('loaded');
            }, 500); 
        });

        // --- Custom Cinematic Easing Navigation Transition ---
        const navBarHeight = document.getElementById('navbar').offsetHeight;
        const navLinks = document.getElementById('nav-links');
        const menuToggle = document.getElementById('mobile-menu');

        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }

                const targetId = this.getAttribute('href');
                if (targetId === '#') return; 
                
                const targetElement = document.querySelector(targetId);
                if (!targetElement) return;

                const elementTop = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const elementHeight = targetElement.offsetHeight;
                const windowHeight = window.innerHeight;
                
                let verticalOffset = (windowHeight - elementHeight) / 2;
                
                if (verticalOffset < navBarHeight) {
                    verticalOffset = navBarHeight + 20; 
                }

                const targetPosition = elementTop - verticalOffset;
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                
                const duration = 1200; 
                let startTime = null;

                function easeInOutQuart(t, b, c, d) {
                    t /= d / 2;
                    if (t < 1) return c / 2 * t * t * t * t + b;
                    t -= 2;
                    return -c / 2 * (t * t * t * t - 2) + b;
                }

                function animation(currentTime) {
                    if (startTime === null) startTime = currentTime;
                    const timeElapsed = currentTime - startTime;
                    const run = easeInOutQuart(timeElapsed, startPosition, distance, duration);
                    window.scrollTo(0, run);
                    
                    if (timeElapsed < duration) {
                        requestAnimationFrame(animation);
                    }
                }

                requestAnimationFrame(animation);
            });
        });

        // --- Navigation Scroll Effect & Back-to-Top Button Visibility ---
        const navbar = document.getElementById('navbar');
        const backToTopBtn = document.getElementById('back-to-top');

        window.addEventListener('scroll', () => {
            let scrollY = window.scrollY;
            
            // Navbar drop-shadow
            if (scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // Show "Scroll to Top" button only after scrolling down 500px
            if (backToTopBtn) {
                if (scrollY > 500) {
                    backToTopBtn.classList.add('show');
                } else {
                    backToTopBtn.classList.remove('show');
                }
            }
        });

        // --- Cinematic Scroll Reveal Effect ---
        const reveals = document.querySelectorAll('.reveal');
        const revealOptions = { threshold: 0.15, rootMargin: "0px 0px -50px 0px" };

        const revealOnScroll = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('active');
                observer.unobserve(entry.target); 
            });
        }, revealOptions);

        reveals.forEach(reveal => {
            revealOnScroll.observe(reveal);
        });

        // ==========================================
        // AUTO-LOADER LOOP: Cinematic "About" Slider
        // ==========================================
        const totalCinematicImages = 10; 
        
        const cinematicImages = [];
        for (let i = 1; i <= totalCinematicImages; i++) {
            cinematicImages.push(`Cinematic/${i}.jpg`);
        }

        const aboutSlider = document.getElementById('about-slider');
        const aboutSlides = [];
        const sliderDots = [];
        const slideDuration = 5500; 
        let currentAboutSlide = 0;
        let slideTimer;

        cinematicImages.forEach((imgSrc, index) => {
            const layer = document.createElement('div');
            layer.classList.add('slide-layer');
            if (index === 0) layer.classList.add('active');
            
            const imgElement = document.createElement('img');
            imgElement.src = imgSrc;
            imgElement.alt = "Cinematic landscape view";
            imgElement.loading = "lazy";
            
            layer.appendChild(imgElement);
            aboutSlider.appendChild(layer);
            aboutSlides.push(layer);
        });

        const prevBtn = document.createElement('div');
        prevBtn.className = 'slider-arrow slider-prev';
        prevBtn.innerHTML = '❮'; 
        
        const nextBtn = document.createElement('div');
        nextBtn.className = 'slider-arrow slider-next';
        nextBtn.innerHTML = '❯'; 
        
        const indicators = document.createElement('div');
        indicators.className = 'slider-indicators';
        
        cinematicImages.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = 'slider-dot';
            if (index === 0) dot.classList.add('active');
            
            dot.addEventListener('click', () => jumpToSlide(index));
            
            indicators.appendChild(dot);
            sliderDots.push(dot);
        });

        const progressContainer = document.createElement('div');
        progressContainer.className = 'slider-progress-container';
        const progressBar = document.createElement('div');
        progressBar.className = 'slider-progress-bar';
        progressContainer.appendChild(progressBar);

        aboutSlider.append(prevBtn, nextBtn, indicators, progressContainer);
        
        function updateSlider(newIndex) {
            aboutSlides[currentAboutSlide].classList.remove('active');
            sliderDots[currentAboutSlide].classList.remove('active');
            
            currentAboutSlide = newIndex;
            
            aboutSlides[currentAboutSlide].classList.add('active');
            sliderDots[currentAboutSlide].classList.add('active');
            
            resetTimer();
        }

        function nextAboutSlide() {
            updateSlider((currentAboutSlide + 1) % aboutSlides.length);
        }

        function prevAboutSlide() {
            updateSlider((currentAboutSlide - 1 + aboutSlides.length) % aboutSlides.length);
        }

        function jumpToSlide(index) {
            if (index !== currentAboutSlide) updateSlider(index);
        }

        function resetTimer() {
            clearInterval(slideTimer);
            
            progressBar.style.transition = 'none';
            progressBar.style.width = '0%';
            
            setTimeout(() => {
                progressBar.style.transition = `width ${slideDuration}ms linear`;
                progressBar.style.width = '100%';
            }, 50);

            slideTimer = setInterval(nextAboutSlide, slideDuration);
        }

        prevBtn.addEventListener('click', prevAboutSlide);
        nextBtn.addEventListener('click', nextAboutSlide);

        resetTimer(); 

        // ==========================================
        // SLIDER 3: Cinematic Filmstrip (Cabin Interior)
        // ==========================================
        const cabinInteriorImages = [
            'Cabin/1.jpg',
            'Cabin/2.jpg',
            'Cabin/3.jpg',
            'Cabin/4.jpg',
            'Cabin/5.jpg',
            'Cabin/6.jpg',
            'Cabin/7.jpg',
            'Cabin/8.jpg',
            'Cabin/9.jpg',
            'Cabin/10.jpg',
            'Cabin/11.jpg',
            'Cabin/12.jpg',
            'Cabin/13.jpg',
            'Cabin/14.jpg'
        ];

        const filmstripMain = document.getElementById('filmstrip-main');
        const filmstripThumbs = document.getElementById('filmstrip-thumbs');
        const mainLayers = [];
        const thumbElements = [];

        cabinInteriorImages.forEach((imgSrc, index) => {
            const layer = document.createElement('div');
            layer.className = 'filmstrip-layer';
            if (index === 0) layer.classList.add('active');
            
            const mainImg = document.createElement('img');
            mainImg.src = imgSrc;
            mainImg.alt = "Cabin interior detail";
            mainImg.loading = "lazy";
            
            layer.appendChild(mainImg);
            filmstripMain.appendChild(layer);
            mainLayers.push(layer);

            const thumb = document.createElement('div');
            thumb.className = 'filmstrip-thumb';
            if (index === 0) thumb.classList.add('active');
            
            const thumbImg = document.createElement('img');
            thumbImg.src = imgSrc;
            thumbImg.alt = "Thumbnail";
            thumbImg.loading = "lazy";
            
            thumb.appendChild(thumbImg);
            filmstripThumbs.appendChild(thumb);
            thumbElements.push(thumb);

            thumb.addEventListener('click', () => {
                mainLayers.forEach(l => l.classList.remove('active'));
                thumbElements.forEach(t => t.classList.remove('active'));
                
                mainLayers[index].classList.add('active');
                thumbElements[index].classList.add('active');
                
                thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            });
        });

        // ==========================================
        // GUEST REVIEWS AUTO-SLIDER LOGIC
        // ==========================================
        const reviewSlides = document.querySelectorAll('.review-slide');
        let currentReview = 0;

        if (reviewSlides.length > 0) {
            setInterval(() => {
                reviewSlides[currentReview].classList.remove('active');
                currentReview = (currentReview + 1) % reviewSlides.length;
                reviewSlides[currentReview].classList.add('active');
            }, 6000); 
        }

        // ==========================================
        // INTERACTIVE FAQ ACCORDION LOGIC
        // ==========================================
        const faqItems = document.querySelectorAll('.faq-item');

        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                faqItems.forEach(faq => {
                    faq.classList.remove('active');
                    faq.querySelector('.faq-icon').innerText = '+';
                });
                
                if (!isActive) {
                    item.classList.add('active');
                    item.querySelector('.faq-icon').innerText = '−';
                }
            });
        });

        // ==========================================
        // EXPANDED LIGHTBOX MODAL LOGIC (For Bento Grid)
        // ==========================================
        const bentoModal = document.getElementById("image-modal");
        const bentoModalImg = document.getElementById("modal-img");
        const closeBentoModal = document.querySelector(".close-modal");

        const bentoImages = document.querySelectorAll(".bento-grid img");

        bentoImages.forEach(img => {
            img.addEventListener("click", function() {
                bentoModal.classList.add("active");
                bentoModalImg.src = this.src; 
            });
        });

        closeBentoModal.addEventListener("click", () => {
            bentoModal.classList.remove("active");
        });

        bentoModal.addEventListener("click", (e) => {
            if (e.target !== bentoModalImg) {
                bentoModal.classList.remove("active");
            }
        });

        // ==========================================
        // EDITORIAL STORY MODAL (Gallery Cards)
        // ==========================================
        const storyData = {
            view: [
                { src: 'Cinematic/view-1.jpg', title: 'Misty Mornings', desc: 'Wake up to the gentle fog rolling over the lush green valleys of Wanagiri right outside your cabin window.' },
                { src: 'Cinematic/view-2.jpg', title: 'Golden Hour', desc: 'Watch the sunset paint the sky in hues of orange and soft pink from your private mountain terrace.' },
                { src: 'Cinematic/view-3.jpg', title: 'Misty Showers', desc: 'Watch the rain breathe life into the lush landscape while a cool, calming mist rolls through the trees, creating the perfect cozy escape from the everyday.' },
                { src: 'Cinematic/view-4.jpg', title: 'Starlit Sky', desc: 'Marvel at the endless sea of twinkling stars stretching across the clear night sky, giving you a front-row seat to nature`s breathtaking nighttime magic.' }
            ],
            atmosphere: [
                { src: 'Activities/gardening.jpg', title: 'Gardening', desc: 'Find grounding in planting fresh seeds, and savor the delight of plucking your very own harvest to enjoy at the peak of freshness.' },
                { src: 'Activities/picnic.jpg', title: 'Picnic', desc: 'Trade the dining room for the great outdoors and enjoy a delightful feast under the open sky, where the crisp fresh air sets the perfect stage for making memories.' },
                { src: 'Activities/bbq.jpg', title: 'BBQ', desc: 'Gather around the glowing grill as the sun dips below the horizon, sharing stories and savoring mouthwatering flavors while the first stars begin to emerge.' },
                { src: 'Activities/games.jpg', title: 'Games', desc: 'Unplug and spark some friendly competition with classic pastimes. Whether a board game or deck of cards, it’s the perfect recipe for making lighthearted memories.' },
                { src: 'Activities/bath-time.jpg', title: 'Bath Time', desc: 'Allow the warmth and soothing comfort of a luxurious soak to wash away the day. Immerse yourself in total calm and emerge feeling completely restored and refreshed.' },
                { src: 'Activities/fluff-time.jpg', title: 'Fluff Time', desc: 'There’s nothing like a gentle snuggle with a furry friend to fill your stay with warmth and pure happiness.' }
            ],
            activities: [
                { src: 'Activities/trekking.jpg', title: 'Waterfall Trekking', desc: 'Explore the hidden, moss-covered trails leading to untouched waterfalls just minutes from the farm.' },
                { src: 'Activities/ulun-temple.jpg', title: 'Ulun Danu Beratan Temple', desc: 'Take a serene, seeing a peaceful waters of Ulun Danu Beratan Temple.' },
                { src: 'Activities/buyan.jpg', title: 'Lake Buyan', desc: 'The iconic twin lakes of Bali - Buyan and Tambingan. Rent a traditional wooden canoe at dawn to watch the mist rise off the untouched, glassy waters. The profound quiet here offers the perfect natural acoustics to clear your mind, find new creative inspiration, or simply sit and absorb the stillness.' },
                { src: 'Activities/tambingan.jpg', title: 'Lake Tambingan', desc: 'The iconic twin lakes of Bali - Buyan and Tambingan. Rent a traditional wooden canoe at dawn to watch the mist rise off the untouched, glassy waters. The profound quiet here offers the perfect natural acoustics to clear your mind, find new creative inspiration, or simply sit and absorb the stillness.' },
                { src: 'Activities/botanical.jpg', title: 'Bali Botanical Garden', desc: 'Wander through towering centuries-old trees and vibrant orchid collections in Indonesia`s largest botanical garden. It is a vast, cinematic landscape perfect for a slow-paced picnic, a quiet afternoon of writing, or capturing breathtaking aerial perspectives of the highlands.' },
                { src: 'Activities/bike-park.jpg', title: 'Bali Bike Park', desc: 'For those seeking a pulse of adrenaline, these world-class downhill trails are woven directly into the lush forest landscape. Whether you are a beginner or a seasoned rider, experience the thrill of navigating raw, natural terrain under the dense jungle canopy.' },
                { src: 'Activities/pancasari.jpg', title: 'Pondok svd Pancasari', desc: 'Located in the neighboring agricultural village, this serene retreat center and its surroundings are famous for their crisp air and local strawberry farms. Take a mindful morning stroll, pick fresh fruit, and enjoy the slow, rhythmic pace of highland village life.' }
            ]
        };

        const storyModal = document.getElementById("story-modal");
        const closeStoryBtn = document.querySelector(".close-story");
        const storyImg = document.getElementById("story-img");
        const storyTitle = document.getElementById("story-title");
        const storyDesc = document.getElementById("story-desc");
        const storyCategoryLabel = document.getElementById("story-category-label");
        const storyIndicatorsContainer = document.getElementById("story-indicators");
        const btnPrevStory = document.getElementById("story-prev");
        const btnNextStory = document.getElementById("story-next");

        let currentStoryCategory = '';
        let currentStoryIndex = 0;

        document.querySelectorAll(".story-card").forEach(card => {
            card.addEventListener("click", function() {
                currentStoryCategory = this.getAttribute("data-story");
                currentStoryIndex = 0;
                
                storyModal.classList.add("active");
                renderStorySlide();
            });
        });

        function renderStorySlide() {
            const data = storyData[currentStoryCategory];
            const slide = data[currentStoryIndex];
            
            storyImg.src = slide.src;
            storyImg.onerror = function() { this.src = `https://placehold.co/600x800/EAE7E0/5A6B47?text=${slide.title}` };
            
            storyTitle.innerText = slide.title;
            storyDesc.innerText = slide.desc;
            
            let label = currentStoryCategory;
            if (label === 'view') label = "Our Cabin View";
            if (label === 'atmosphere') label = "Things To Do";
            if (label === 'activities') label = "Nearby Activities";
            storyCategoryLabel.innerText = label;

            storyIndicatorsContainer.innerHTML = '';
            data.forEach((_, idx) => {
                const bar = document.createElement("div");
                bar.className = "story-indicator-bar";
                if (idx === currentStoryIndex) bar.classList.add("active");
                storyIndicatorsContainer.appendChild(bar);
            });
        }

        btnNextStory.addEventListener("click", () => {
            const maxIndex = storyData[currentStoryCategory].length - 1;
            if (currentStoryIndex < maxIndex) {
                currentStoryIndex++;
                renderStorySlide();
            } else {
                storyModal.classList.remove("active");
            }
        });

        btnPrevStory.addEventListener("click", () => {
            if (currentStoryIndex > 0) {
                currentStoryIndex--;
                renderStorySlide();
            }
        });

        closeStoryBtn.addEventListener("click", () => {
            storyModal.classList.remove("active");
        });

        storyModal.addEventListener("click", (e) => {
            if (e.target === storyModal) {
                storyModal.classList.remove("active");
            }
        });

	// ==========================================
        // security part
        // ==========================================
	// Email Obfuscation
	const user = "hello";
	const domain = "querenciafarm.com";
	const emailElement = document.getElementById("secure-email");
	emailElement.innerHTML = `<a href="mailto:${user}@${domain}">${user}@${domain}</a>`;

	// Prevent right-click on images
	document.addEventListener('contextmenu', function(e) {
    	if (e.target.tagName === 'IMG') {
        	e.preventDefault();
    		}
	});
