const button = document.querySelector(".cta")
const header = document.querySelector("header")
window.addEventListener('scroll', (e)=> {
    
    if(header.getBoundingClientRect().y == 0){
        button.classList.remove("cta-stuck")
    } else {
        button.classList.add("cta-stuck")
    }
})


