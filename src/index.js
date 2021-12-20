let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  

  postToyReq()
  patchToyLikes()
  renderToy()

function renderToy(toy){
  let card = document.createElement('div')
  card.className = 'card'
  card.innerHTML = `
  <h2>${toy.name}</h2>
  <img src="${toy_image_url}" class="toy-avatar" />
  <p>${toy.likes} Likes</p>
  <button class="like-btn" id=${toy_id}">Like ❤️</button>
</div>
  `

  card.querySelector('#like-btn').addEventListener('click', () => {
    toy.likes += 1
    card.querySelector('p').textContent = toy.likes
  })
}

const newToyForm = () => {
  const toyForm = document.querySelector('.add-toy-form')
  toyForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const newToyName = e.target.name.value
    const newToyImage = e.target.image.value

    const newToyObj = {
      name: newToyName,
      image: newToyImage,
      likes: 0
    }
    renderToy(newToyObj)
  
  })
}
newToyForm()

const getToys = () => {
  fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(toys => toys.forEach(toy => renderToy(toy)))
}
getToys()

function postToyReq(newToyObj){
  
  fetch('http://localhost:3000/toys',{
    method: 'POST',
    headers:
{
  "Content-Type": "application/json",
  Accept: "application/json"
},

body: JSON.stringify({
  "name": "Jessie",
  "image": "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
  "likes": 0
})
    .then(res => res.json())
    .then(toy => toy.forEach(toy =>renderToy(toy)))
})

function patchToyLikes(newToyObj){
  fetch('http://localhost:3000/toys/:id',{
  method: 'PATCH',
   headers:
{
 "Content-Type": "application/json",
  Accept: "application/json"
},

  body: JSON.stringify({
  "likes": newNumberOfLikes
})
})


}

};
  })
})
