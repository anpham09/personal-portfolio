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