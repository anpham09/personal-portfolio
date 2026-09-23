window.Portfolio = window.Portfolio || {};
(()=>{
    const root = document.documentElement;
    const toggle = document.querySelector(".theme-toggle");
    const savedTheme = localStorage.getItem("an-portfolio-theme");

    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const startingTheme = savedTheme || systemTheme;
    root.dataset.theme = startingTheme;

    toggle?.addEventListener("click", ()=>{
        const nextTheme = root.dataset.theme === "dark"?"light":"dark";

        root.dataset.theme = nextTheme;
        localStorage.setItem("an-portfolio-theme", nextTheme);
    });
})();

(()=>{
    const items = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver((entries)=>{
        entries.forEach((entry)=>{
            if(!entry.isIntersecting) return;

            const delay = Number(entry.target.dataset.delay || 0);

            window.setTimeout(()=>{
                entry.target.classList.add("visible");
            },delay);
            observer.unobserve(entry.target);
        });

    },
    {threshold: 0.12});
    items.forEach((item)=> observer.observe(item));
})();

(() =>{
    const glow=document.querySelector(".cursor-glow");
    const progress = document.querySelector(".scroll-progress span");

    window.addEventListener("pointermove", (event)=>{
        if (!glow) return;

        glow.computedStyleMap.left = `${event.clientX}px`;
        glow.computedStyleMap.top = `${event.clientY}px`;
    });
    const updateProgress = () => {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        const amount=total>0 ? (window.scrollY/total) * 100 : 0;

        if (progress){
            progress.style.width = `${Math.min(amount,100)}%`;
        }
    };

    window.addEventListener("scroll", updateProgress, {
        passive: true 
    });
    updateProgress();
})();

(()=> {
    const filters = document.querySelectorAll(".filter");
    const counter = document.querySelector("#visible-project-count");

    const updateCount = ()=>{
        const visibleCards = [
            ...document.querySelectorAll(".project-card")
        ].filter((card)=> !card.classList.contains("hidden"));

        if (!counter) return;

        counter.textContent =
            `${visibleCards.length} ${visibleCards.length === 1 ? "project" : "projects"}`;
    };
    filters.forEach((button) => {
        button.addEventListener("click", () =>{
            filters.forEach((item) => item.classList.remove("active"));
            button.classList.add("active");

            const filter = button.dataset.filter;

            document.querySelectorAll(".project-card").forEach((card) =>{
                const categories = card.dataset.category.split(" ");
                const shouldShow = filter === "all" || categories.includes(filter);
                card.classList.toggle("hidden", !shouldShow);
            });
            updateCount();
        });
    });
    updateCount();

    window.Portfolio.updateProjectCount = updateCount;
})();

(() => {
    const navLinks = document.querySelectorAll(".desktop-nav a");

    const availableSections = [
        "work","story","experience","recognition","contact"
    ].map((id)=>document.getElementById(id)).filter(Boolean);

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry)=>{
                if(!entry.isIntersecting) return;

                navLinks.forEach((link)=>{
                    const matches = link.getAttribute("href") ===`#${entry.target.id}`;
                    link.classList.toggle("active", matches);
                });
            
            });
        },
        {rootMargin: "-30% 0px -60% 0px"}
    );

    availableSections.forEach((section)=> observer.observe(section));

    window.Portfolio.updateProjectCount?.();
})();

(() => {
    const cards = document.querySelectorAll(".project-card");

    cards.forEach((card) => {
        card.addEventListener("pointermove", (event) => {
            if(window.matchMedia("(pointer: coarse)").matches) return;

            const rect = card.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const rotateY = ((x/rect.width) - 0.5) * 2.5;
            const rotateX = ((y/rect.height) - 0.5) * -2.5;

            card.style.transform = `translateY(-4px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

        });

        card.addEventListener("pointerleave", ()=>{
            card.style.transform = "";
        });
    });

    window.Portfolio.updateProjectCount?.();
})();