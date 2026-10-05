function setupTheme(){
    const button = document.querySelector(".theme-toggle");

    document.documentElement.dataset.theme = localStorage.getItem("theme") || "light";
    button.addEventListener("click", ()=>{
        const current = document.documentElement.dataset.theme;
        const next = current === "dark" ? "light" : "dark";
        document.documentElement.dataset.theme = next;
        localStorage.setItem("theme", next);
    });
}
setupTheme();

function revealAnimations(){const observer = new IntersectionObserver((entries)=>{
        entries.forEach((entry)=>{
            if(!entry.isIntersecting) return;

            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        });

    },
    {threshold: 0.12});
    document.querySelectorAll(".reveal").forEach((item)=>{
        observer.observe(item);
    })
}
revealAnimations();

function cursorFlow(){
    const glow=document.querySelector(".cursor-glow");

    if (!glow) return;

    window.addEventListener("pointermove", (event)=>{
        glow.style.left = `${event.clientX}px`;
        glow.style.top = `${event.clientY}px`;
    });
    
}
cursorFlow();

function scrollProgress(){
    const progress = document.querySelector(".scroll-progress span");

    if(!progress) return;

    function updateProgress(){
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        const percent =scrollable>0 ? (window.scrollY/scrollable) * 100 : 0;

        progress.style.width = `${Math.min(percent, 100)}%`;
    }
    window.addEventListener("scroll", updateProgress, {
        passive: true
    });
    updateProgress();
}
scrollProgress();

function projectFilters() {
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
};
projectFilters();

function navigation() {
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

};
navigation();

function cardTilt() {
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
};
cardTilt();



const originalText = "Copy email";
const copyButton = document.querySelector(".copy-email");

copyButton?.addEventListener("click", async()=>{
    const email = copyButton.dataset.email || "anpham.0992@gmail.com";

    try{
        await navigator.clipboard.writeText(email);
        copyButton.textContent = "Email copied";

        setTimeout(() => {
            copyButton.textContent = originalText;
        }, 3500);
    } catch {
        copyButton.textContent = "Couldn't copy";

        setTimeout(()=>{
            copyButton.textContent = originalText;
        }, 3500);
        
    }
});