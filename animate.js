const randomVar = document.getElementById('randomVar');
const backToTop= document.getElementById('topBtn');
const loading = document.querySelector('.loading');

/**Search adding */
const navSearch = document.getElementById('search-nav').classList;
const searchBtn = document.querySelector('.search');
const deleteSearch = document.getElementById('closeBtn')

/**Search eventlisenter */
searchBtn.addEventListener('click',()=>{
    navSearch.add('search-down');
   
})
deleteSearch.addEventListener('click',()=>{
    navSearch.remove('search-down');
   
})


//randomVar.innerHTML = `<input type="text" class="sending-input"> = ${Math.floor(Math.random()*10)+1} + ${Math.floor(Math.random()*10)+1}     `
const mobileNav= document.querySelector('.mobile').classList;
const toggleBtn = document.querySelector('.toggle-btn');
toggleBtn.addEventListener('click',()=>{
mobileNav.toggle('toggle');

})

window.addEventListener('scroll',scrollFunction);
function scrollFunction() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
      backToTop.style.transform = "translateX(0%)";
      backToTop.style.opacity=1;
      
    } else {
        backToTop.style.transform = "translateX(200%)";
        backToTop.style.opacity=0;
    }
  }

backToTop.addEventListener('click',(e)=>{
    
       window.scrollTo({

        top:0,
        behavior : 'smooth'
        
        });
      
    

});