function create (title,description,src) {
    const element = document.createElement("li")
    const container = document.getElementsByClassName("card_box")[0]
    element.className = "card_item"
    const titleElement = document.createElement("b")
    titleElement.className = "title"
    titleElement.textContent = title
    const desElement = document.createElement("p")
    desElement.textContent = description
    desElement.className = "description"
    const image = document.createElement("img")
    image.href = src
    image.className = "image"
    element.appendChild(image)
    element.appendChild(titleElement)
    element.appendChild(desElement)
    container.appendChild(element)
}

const inputTitle = document.getElementById("title")
const inputDescription = document.getElementById("description")
const inputSrc = document.getElementById("src")

const btnSave = document.getElementById("save")

btnSave.addEventListener("click",()=>create(inputTitle.value,inputDescription.value,inputSrc.value))
