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

(() => {
    document.querySelectorAll("[data-project]").forEach((item) =>{
        if(item.tagName === "BUTTON") return;

        item.addEventListener("keydown", (event) => {
            if (event.key !== "Enter" && event.key !== " ") return;

            event.preventDefault();
            item.click();
        });
    });
    window.Portfolio.updateProjectCount?.();
})();

(()=>{
    const projectData = {
        genmatrix: {
            kicker: "RESPONSIBLE AI x CYBERSAFETY",
            title: "GenMatrix",
            summary: "A multi-level 2D platformer designed to help younger players explore responsible AI use and online safety through interactive gameplay.",
            question: "How can a cybersecurity and AI lesson feel like a game first, instead of a worksheet wearing a game costume?",
            build: "I served as lead programmer, developing gameplay system across multiple levels in Godot and coordinating technical development with the project's desinger.",
            outcome: "The project earned 1st Place in Game Design at the 2026 Fulton County Student Technology Competition, 3rd Place at the Georgia Student Technology Competition, and was presented at the MIT Global AI in Education Summit.",
            tools: ["Godot", "GDScript", "Game Design", "Cyber Education"]
        },
        cybergame: {
            kicker: "SECURITY FOR NON-TECHNICAL USERS",
            title: "3D Cybersecurity Awareness Game",
            summary: "An interactive senior directed-study project focused on everyday cybersecurity risks for people without technical backgrounds.",
            question: "Can realistic choices - not just warning text - help people recognize risky situations before they happen in real life?",
            build: "I am designing scenarios around suspicious USB devices, QR-code phishing, tailgating, fake IT calls, personal-data collection, and physical security while learning Godot 3D, scene architecture, dialogue systems, and collision-based interaction.",
            outcome: "The project is ongoing and functions as both an educational game and a structured way for me to deepen my 3D development and human-centered cybersecurity skills.",
            tools: ["Godot 3D", "GDScript", "Dialogue Systems", "Security Awareness"]
        },
        finportly: {
            kicker: "FINANCIAL LITERACY x WEB",
            title: "Finportly",
            summary: "A tool designed to turn user-provided financial information into clearer personal financial reports.",
            question: "How can budgeting and financial-health information feels less intimidating for students and beginning users?",
            build: "I designed the reporting experience around simple inputs, understandable outputs, and a lightweight interface rather than financial jargon.",
            outcome: "Finportly become an experiment in translating financial concepts into a more approachable digital tool.",
            tools: ["Web Development", "Financial Literacy", "UI/UX"]
        },
        fridgelet: {
            kicker: "WEB INTERACTION x STORYTELLING",
            title: "Fridgelet",
            summary: "An interactive digital refrigerator where users open the frige, explore dishes, and listen to recipe readings.",
            question: "How can a familiar object - a refrigerator - become the interface for a playful web experience?",
            build: "I combined JavaScript interaction, illustration, interface design, and audio so the experience feels more like exploring an object than reading a standard recipe page.",
            outcome: "The result pushed me to think beyond pages and buttons and treat the browser as a space for playful interaction.",
            tools: ["JavaScript", "HTML/CSS", "Illustration", "Audio"]
        },
        truthlens: {
            kicker: "HACKATHON BUILD",
            title: "TruthLens",
            summary: "A collaborative technology project built during the 2026 GreenCode Hakathon under a limited build window.",
            question: "What can a team realistically design, build, debug, and explain when the clock is part of the problem?",
            build: "I contributed to development, problem solving, team collaboration, and presentation while adapting quickly to a short hackathon timeline.",
            outcome: "The project received GreenCode's best Newcomer Award.",
            tools: ["Hackathon", "Rapid Prototyping", "Team Development"]
        },
        biopay: {
            kicker: "BIOMETRICS x FINTECH",
            title: "BioPay",
            summary: "A biometric financial-technology prototype combining fingerprint hardware, embedded systems, and Python-based similarity search.",
            question: "What would it look like to connect a physical biometric signal to a simple payment while thinking carefully about matching and system flow?",
            build: "Our team combined an ESP32-based fingerprint workflow with Python and FAISS-based similarity-search concepts, then developed the project into a competition pitch.",
            outcome: "BioPay advanced as a finalist team in the Fiserv high school fintech competition.",
            tools: ["Python", "ESP32", "FAISS", "Fintech"]
        },
        birthday: {
            kicker: "LANGUAGE x INTERACTION",
            title: "Multilingual Birthday Wheel",
            summary: "A personalized spinning-wheel website with birthday messages and audio in multiple language.",
            question: "How can I turn a simple birthday message into something more personal, playful, and connected to language?",
            build: "I combined JavaScript interactions, a spinning-wheel interface, multilingual writing, and recorded audio into one personalized web gift.",
            outcome: "It became one of my favorite examples of code being useful simply because it can make someone smile.",
            tools: ["JavaScript", "Web Audio", "Multilingual Design"]

        }
    };
    //here
    const modal = document.querySelector("#project-modal");
    let lastFocused = null;

    const openModal = (key) => {
        const project = projectData[key];
        if (!project || !modal) return;

        lastFocused = document.activeElement;

        document.querySelector("#modal-kicker").textContent = project.kicker;
        document.querySelector("#modal-title").textContent = project.title;
        document.querySelector("#modal-summary").textContent = project.summary;
        document.querySelector("#modal-question").textContent = project.question;
        document.querySelector("#modal-build").textContent = project-build;
        document.querySelector("#modal-outcome").textContent = project.outcome;

        const tools = document.querySelector("#modal-tools");
        tools.innerHTML = "";

        project.tools.forEach((tool) =>{
            const tag = document.createElement("span");
            tag.textContent = tool;
            tools.appendChild(tag);
        });
        //here
        modal.classList.add
    }
})();