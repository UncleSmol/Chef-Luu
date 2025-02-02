

//Hamburger Toggle Function
export const hamburgerToggle = () => {
	// Elements for navigation toggle
	const hamburgerMenu = document.getElementById("hamburgerMenu");
	const hamSpans = document.querySelectorAll(".__ham-span");
	const navItems = document.querySelectorAll(".__nav-item");
	const mobileNav = document.querySelector(".__mobile-nav");
	const menuNavOverlay = document.querySelector(".__menu-nav"); // Overlay element

	// Function to reset navigation (hide everything)
	const resetNavigation = () => {
		hamSpans.forEach((span) => span.classList.remove("active"));
		navItems.forEach((item) => item.classList.remove("shown"));
		mobileNav.classList.remove("shown");
	};

	if (hamburgerMenu) {
		// Toggle navigation classes on hamburger menu click
		hamburgerMenu.addEventListener("click", () => {
			hamSpans.forEach((span) => span.classList.toggle("active"));
			navItems.forEach((item) => item.classList.toggle("shown"));
			mobileNav.classList.toggle("shown");
		});
	}

	// If overlay exists, clicking it will reset the navigation
	if (menuNavOverlay) {
		menuNavOverlay.addEventListener("click", resetNavigation);
	}
};




