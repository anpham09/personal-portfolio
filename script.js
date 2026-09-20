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

