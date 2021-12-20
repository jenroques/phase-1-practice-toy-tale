let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  toggleForm()
  getToys()
  newToyForm()
});

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
    postToyReq(newToyObj)
  })
}

const getToys = () => {
  fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(toys => toys.forEach(toy => renderToy(toy)))
}

function postToyReq(newToyObj){
  
  fetch('http://localhost:3000/toys',{
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body:JSON.stringify(newToyObj)
})
}

const renderToy = (toy) => {
  const toycard = document.createElement('div')
  toycard.className = "card"

  const toyName = document.createElement('h2')
  toyName.innerText = toy.name 
  toycard.append(toyName)

  const toyImage = document.createElement('img')
  toyImage.src = toy.image 
  toyImage.className="toy-avatar"

  const toyLikes = document.createElement('p')
  toyLikes.innerText = `${toy.likes} Likes`

  const likeBtn = document.createElement('button')
  likeBtn.innerText = `Like <3`
  likeBtn.className = 'like-btn'
  likeBtn.id = toy.id


  //const toyButton = document.createElement 
 
  const  toyCollection = document.querySelector('#toy-collection')
  
  toyCollection.append(toycard, toyImage, toyLikes, likeBtn)
}

const toggleForm = () => {
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
  });
}

