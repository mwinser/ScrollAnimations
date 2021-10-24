const button = document.querySelector(".cta")
const header = document.querySelector("header")
const parallaxImage = document.querySelector(".parallax-image")
const innerHeight = window.innerHeight
const imageHeight = parallaxImage.getBoundingClientRect().height


const slideContainer = document.querySelector(".slideshow-container")
var leftSlide = document.querySelector(".left")
var centerSlide = document.querySelector(".center")
var rightSlide = document.querySelector(".right")

const allSlides = [leftSlide, centerSlide, rightSlide]
const slideClasses = ["left-start", "left", "center", "right", "right-start"]
const slideImages = [
    "https://images.unsplash.com/photo-1544551763-8dd44758c2dd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1534447677768-be436bb09401?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1528855275993-0f4a23fedd62?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
]
var isSliding = false



window.addEventListener('scroll', (e)=> {
    
    if(header.getBoundingClientRect().y == 0){
        button.classList.remove("cta-stuck")
    } else {
        button.classList.add("cta-stuck")
    }

    //console.log(parallaxImage.getBoundingClientRect().bottom)
    if (parallaxImage.getBoundingClientRect().top - innerHeight < 0){
        var scrollRatio = (100 * (1 - (parallaxImage.getBoundingClientRect().bottom / (3*(innerHeight + imageHeight))))) - 35
        parallaxImage.style.backgroundPositionY = scrollRatio + "%"
    }
})


function AddSlideEvents() {
    //remove event listeners via clone
    allSlides.map((slide, i)=>{
        slide.addEventListener('click', (e)=>HandleClick(e))
        slide.style.backgroundImage = "url('"+slideImages[i]+"')"
    })

}
AddSlideEvents()

function HandleClick(e){
    if (!isSliding) {
        isSliding = true
        if (e.target.classList.contains(("left"))){ //move slides right
            
            //clone offscreen slide and add appropriate class
            var offscreenSlide = slideContainer.children[2].cloneNode(true);         //clone offscreen slide
            offscreenSlide.classList.replace("right","left-start");                  //change class
            offscreenSlide.addEventListener('click', (e)=>HandleClick(e));           //re-add event listener
            slideContainer.insertBefore(offscreenSlide,slideContainer.children[0]);  //append to other side
            
            //change class of each slide
            setTimeout(()=>{
                [...slideContainer.children].map((child, i)=>{
                    child.classList.replace(slideClasses[i], slideClasses[i+1])
                })
            },5)
            //delay delete offscreenSlide
            setTimeout(()=>{
                slideContainer.children[3].remove()
                isSliding = false
            }, 500)

        } else if(e.target.classList.contains(("right"))){ //move slides left
            //clone offscreen slide and add appropriate class
            var offscreenSlide = slideContainer.children[0].cloneNode(true);         //clone offscreen slide
            offscreenSlide.classList.replace("left","right-start");                  //change class
            offscreenSlide.addEventListener('click', (e)=>HandleClick(e));           //re-add event listener
            slideContainer.appendChild(offscreenSlide);                              //append to other side
            
            //change class of each slide
            setTimeout(()=>{
                [...slideContainer.children].map((child, i)=>{
                    child.classList.replace(slideClasses[i+1], slideClasses[i])
                })
            },5)
            //delay delete offscreenSlide
            setTimeout(()=>{
                slideContainer.children[0].remove()
                isSliding = false
            }, 500)
        } else {
            isSliding = false
        }
    }   
}

