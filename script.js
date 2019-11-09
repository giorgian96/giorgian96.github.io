const navbar = document.querySelector('nav');
const sticky = navbar.offsetTop;

function fixNav() {
    if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky")
        navbar.style.width = navbar.parentElement.offsetWidth + 'px';
        document.body.style.paddingTop = navbar.offsetHeight + 'px';
    } else {
        navbar.classList.remove("sticky");
        navbar.removeAttribute('style');
        document.body.removeAttribute('style');
    }
}

window.addEventListener('scroll', fixNav);