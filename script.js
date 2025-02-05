document.getElementById("yesButton").addEventListener("click", function() {
    document.getElementById("response").textContent = "Yay! I Love You! ❤️";
    document.getElementById("response").classList.remove("hidden");
    document.querySelector(".buttons").style.display = "none";
});

document.getElementById("noButton").addEventListener("mouseover", function() {
    let x = Math.random() * (window.innerWidth - 100);
    let y = Math.random() * (window.innerHeight - 50);
    this.style.left = `${x}px`;
    this.style.top = `${y}px`;
});
