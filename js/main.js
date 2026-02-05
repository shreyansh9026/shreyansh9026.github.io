const menubtn= document.getElementById('menu-btn')
const closebtn= document.getElementById('close-btn')
const menu =document.querySelector('nav .container ul')
const resue=document.getElementById("resume-link-2")
// close


menubtn.addEventListener('click',()=>{
    menu.style.display="block";
    menubtn.style.display="none";
    closebtn.style.display ="inline-block"
})
// hide
closebtn.addEventListener('click',()=>{
    menu.style.display="none";
    menubtn.style.display="inline-block";
    closebtn.style.display ="none"
})

const navitems = menu.querySelectorAll('li');
const changeactive =()=>{
    navitems.forEach(item=>{
        const link =item.querySelector('a');
      
            link.classList.remove('active');
        
    
    })
}
navitems.forEach(item=>{
    const link =item.querySelector('a');
    link.addEventListener('click', ()=>{
        changeactive()
        link.classList.add('active');
    })

})

// read more

const readmorebtn= document.querySelector('.read-more')
const readmoreContent= document.querySelector('.read-more-content')

readmorebtn.addEventListener('click', ()=>{
    readmoreContent.classList.toggle('show-content')
    if(readmoreContent.classList.contains('show-content')){
        readmorebtn.textContent ="Show less"
    }else{
        readmorebtn.textContent ="Show more"
    }
});


// box shadow

window.addEventListener('scroll',()=>{
    document.querySelector('nav').classList.toggle('show-box-shadow', window.scrollY > 100)
})

// resume seen
resue.addEventListener("click",(e)=>{
    e.preventDefault();     
    resume()
})
function resume(){
    window.open("/resources/Rajneesh_Yadav_Resume.pdf","_blank")
  }

  console.log(projects)
