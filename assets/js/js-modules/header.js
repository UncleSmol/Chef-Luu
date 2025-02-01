

//Hamburger Toggle Function
export const hamburgerToggle = () => {
	// Hamburger Menu Navigation System
	const hamburgerMenu = document.getElementById("hamburgerMenu");
	const hamSpan = document.querySelectorAll(".__ham-span");
	const navItems = document.querySelectorAll(".__nav-item");
	const mobileNav =document.querySelectorAll(".__mobile-nav");
    
	hamburgerMenu.addEventListener("click", () => {
        hamSpan.forEach((span) => span.classList.toggle("active"));
		navItems.forEach((item) => item.classList.toggle("shown"));
		mobileNav.classList.toggle("shown");
    });
}


