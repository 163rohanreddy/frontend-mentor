const shareButton = document.getElementById("share-button-id");
const authorInfo = document.getElementById("author-info-id");
const shareOptionMobile = document.getElementById("share-options-mobile-id")
shareOptionMobile.style.display = "none";

function onShare() {
    const nScreenWidth = window.innerWidth;
    if (nScreenWidth < 768) {
        shareOptionMobile.style.display = "flex";
        authorInfo.style.display = "none";
    } else {
        shareButton.classList.toggle("show");
    }
}

function onShareBack() {
    shareOptionMobile.style.display = "none";
    authorInfo.style.display = "flex";
}

function onScreenResize() {
    onShareBack();
    shareButton.classList.remove("show");
}