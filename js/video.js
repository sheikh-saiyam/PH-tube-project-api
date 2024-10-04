const loadCatagories = () => {
   fetch(" https://openapi.programming-hero.com/api/phero-tube/categories")
   .then((res) => res.json())
   .then((data) => displayCatagories(data.categories))
   .catch((error) => console.log(error))
}

const loadCatagoriesVideo = (id) => {
  // fetch 
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then((res) => res.json())
        .then((data) => {
          removeActiveClass();
          const activeBtn = document.getElementById(`btn-${id}`);
          activeBtn.classList.add("active")
          displayVideo(data.category);
        })
        .catch((error) => console.log(error))
}

// for remove active btn color 
const removeActiveClass = () => {
  const buttons  =  document.getElementsByClassName('active-class');
  for (let btn of buttons) {
    btn.classList.remove("active")
  }
}
const displayCatagories = (Catagories) => {
   const categoryNav = document.getElementById('category-nav')    
   Catagories.forEach((item) => {
        // console.log(item)
        const buttonContainer = document.createElement('div');
        buttonContainer.innerHTML = `
        <button id="btn-${item.category_id}" class="btn active-class" onclick="loadCatagoriesVideo(${item.category_id})" >${item.category}</button>
        `
        categoryNav.append(buttonContainer)
   });
}
loadCatagories()

// loading videos

const loadVideo = (searchText = " " ) => {
        fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
        .then((res) => res.json())
        .then((data) => displayVideo(data.videos))
        .catch((error) => console.log(error))
}

const displayVideo = (videos) => {
        const videosSection = document.getElementById('videos') 
        videosSection.innerHTML = "" ; 
        
        if(videos.length == 0 ) {
          videosSection.classList.remove('grid')
          videosSection.innerHTML = `
          <div class="min-h-[300px] flex flex-col gap-5 justify-center items-center">
          <img src="./assets/icon.png" />
          <h1 class="text-3xl font-bold text-center" >Oops!! Sorry, There is no <br> content here</h1>
          </div>
          ` ;  
          return
        }
        else {
          videosSection.classList.add('grid')
        }
        videos.forEach((video) => {
            // console.log(video)
             const card = document.createElement('div');
             card.classList = " card card-compact ";
             card.innerHTML = `
               <figure>
                 <img class="h-[200px] w-full "
                   src="${video.thumbnail}" />
               </figure>
               <div class="py-4 flex gap-2">
               <div>
                 <img class="h-10 w-10 rounded-full" src="${video.authors[0].profile_picture}}" />
               </div>
               <div>
                 <h2 class="card-title">${video.title}</h2>
                 <p>${video.authors[0].profile_name}</p>
                 <p>${video.others.views} Views</p>
                 <div class="py-2">
                 <button onclick="loadDisplayDetails('${video.video_id}')" class="btn btn-active btn-sm btn-ghost" >Details</button>
                 </div>
               </div>
               </div>
             `;
     
             videosSection.append(card)
        });
}

const loadDisplayDetails = async (videoId) => {
  // console.log(videoId);
  const url =`https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`
  const res = await fetch(url);
  const data = await res.json();
  displayDetails(data.video);
}

const displayDetails = (video) => {
  // console.log(video);
  const modalContent = document.getElementById('modal-content');
  modalContent.innerHTML = `
  <img class=" w-full " src="${video.thumbnail}" />
  <div class="pt-4 flex gap-3 items-center">
   <img class="h-10 w-10 rounded-full" src="${video.authors[0].profile_picture}}" />
   <p class="font-semibold ">${video.authors[0].profile_name}</p>
  </div>
  <h2 class="font-bold text-2xl py-4">Title- ${video.title}</h2>
  <p class=""><span class="card-title">Description:</span> ${video.description}</p>
  `
  document.getElementById('my_modal_1').showModal()
}


// search bar 
document.getElementById('search-bar').addEventListener('keyup',(e)=> {
  loadVideo(e.target.value)
})
document.getElementById('close-btn').addEventListener('click',()=> {
  window.location.reload();
})

loadVideo()
