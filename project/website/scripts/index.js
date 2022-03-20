window.addEventListener("scroll",function(){
    const body = document.querySelector('body');
 
    if(window.scrollY > 30) {
        if(!body.classList.contains('sticky')) {
            body.classList.add('sticky');
            setTimeout(function() {
                window.scrollTo({
                    top: 100,
                    left: 0,
                    behavior: 'smooth'
                  });
            }, 1500);
        }
    } else {
        body.classList.remove('sticky');
    }
    
})