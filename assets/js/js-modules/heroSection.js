//Rive Animation Loader

document.addEventListener("DOMContentLoaded", () => {
	const riveInstance = new rive.Rive({
		src: "hero-animation.riv",
		canvas: document.getElementById("heroImgCanvas"),
		autoplay: true,
		stateMachine: "State Machine 1",
		onLoad: () => {
			riveInstance.play();
		},
	});
});
