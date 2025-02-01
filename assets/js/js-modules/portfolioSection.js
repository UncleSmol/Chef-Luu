// Image Gallery Module
export const initializeGallery = () => {
	// Create modal elements
	const modal = document.createElement("div");
	modal.className = "__modal";

	const modalContent = document.createElement("div");
	modalContent.className = "__modal-content";

	const modalImage = document.createElement("img");

	const closeButton = document.createElement("span");
	closeButton.className = "__modal-close";
	closeButton.innerHTML = "×";

	// Construct modal
	modalContent.appendChild(modalImage);
	modal.appendChild(modalContent);
	modal.appendChild(closeButton);
	document.body.appendChild(modal);

	// Get all gallery images
	const galleryImages = document.querySelectorAll(".__image-grid img");

	// Add click event to each image
	galleryImages.forEach((image) => {
		image.addEventListener("click", () => {
			modalImage.src = image.src;
			modal.classList.add("active");
			document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
		});
	});

	// Close modal functions
	const closeModal = () => {
		modal.classList.remove("active");
		document.body.style.overflow = ""; // Restore scrolling
	};

	// Close on button click
	closeButton.addEventListener("click", closeModal);

	// Close on outside click
	modal.addEventListener("click", (e) => {
		if (e.target === modal) {
			closeModal();
		}
	});

	// Close on escape key
	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape" && modal.classList.contains("active")) {
			closeModal();
		}
	});

	// Add swipe functionality for mobile
	let touchStartX = 0;
	let touchEndX = 0;

	modal.addEventListener(
		"touchstart",
		(e) => {
			touchStartX = e.changedTouches[0].screenX;
		},
		false
	);

	modal.addEventListener(
		"touchend",
		(e) => {
			touchEndX = e.changedTouches[0].screenX;
			if (Math.abs(touchStartX - touchEndX) > 50) {
				// Minimum swipe distance
				closeModal();
			}
		},
		false
	);

	// Add loading state
	galleryImages.forEach((image) => {
		image.addEventListener("load", () => {
			image.classList.add("loaded");
		});
	});

	// Lazy loading implementation
	const lazyLoad = () => {
		const imageObserver = new IntersectionObserver((entries, observer) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					const img = entry.target;
					img.src = img.dataset.src;
					img.classList.add("fade-in");
					observer.unobserve(img);
				}
			});
		});

		galleryImages.forEach((img) => {
			imageObserver.observe(img);
		});
	};

	// Initialize lazy loading if supported
	if ("IntersectionObserver" in window) {
		lazyLoad();
	}

	// Add smooth animation when opening/closing modal
	modal.addEventListener("transitionend", () => {
		if (!modal.classList.contains("active")) {
			modalImage.src = "";
		}
	});

	// Prevent image dragging
	modalImage.addEventListener("dragstart", (e) => {
		e.preventDefault();
	});

	// Add zoom functionality
	let scale = 1;
	let panning = false;
	let pointX = 0;
	let pointY = 0;
	let start = { x: 0, y: 0 };

	modalContent.addEventListener("mousedown", (e) => {
		e.preventDefault();
		start = { x: e.clientX - pointX, y: e.clientY - pointY };
		panning = true;
	});

	modalContent.addEventListener("mouseup", () => {
		panning = false;
	});

	modalContent.addEventListener("mousemove", (e) => {
		e.preventDefault();
		if (!panning) return;
		pointX = e.clientX - start.x;
		pointY = e.clientY - start.y;
		modalImage.style.transform = `translate(${pointX}px, ${pointY}px) scale(${scale})`;
	});

	modalContent.addEventListener("wheel", (e) => {
		e.preventDefault();
		const xs = (e.clientX - pointX) / scale;
		const ys = (e.clientY - pointY) / scale;
		const delta = -Math.sign(e.deltaY) * 0.2;
		scale = Math.min(Math.max(1, scale + delta), 3);
		pointX = e.clientX - xs * scale;
		pointY = e.clientY - ys * scale;
		modalImage.style.transform = `translate(${pointX}px, ${pointY}px) scale(${scale})`;
	});

	// Reset zoom and position when closing modal
	closeButton.addEventListener("click", () => {
		scale = 1;
		pointX = 0;
		pointY = 0;
		modalImage.style.transform = "";
	});
};
