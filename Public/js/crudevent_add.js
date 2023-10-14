// Function used to add a new items to the list
function add(e){
  console.log(e.target)
  element = e.target
  var target = element.getAttribute('name')
  var selected_zone
  var input_value
  var nodes
  var id_tab
  var newChildType
  switch (target){
    case 'optionImage':
      selected_zone = document.getElementById("addedimages")
      input_value = document.getElementById("images")
      newChildType = "img"
      break
    case 'optionArtist':
      selected_zone = document.getElementById("addedartists")
      input_value = document.getElementById("artists")
      newChildType = "p"
      break
    case 'optionPlace':
      selected_zone = document.getElementById("addedplaces")
      input_value = document.getElementById("places")
      newChildType = "p"
      break
  }
  id_tab = ""
  nodes = selected_zone.childNodes
  const value = element.id
  const id = element.value
  var exist = false
  for (let i = 1; i < nodes.length; i++){
    if (nodes[i].id == id){
      exist = true
    }
  }
  if (!exist){
    var newChild = document.createElement(newChildType)
    switch (target){
      case 'optionImage':
        newChild.src = value
        break
      case 'optionArtist':
        newChild.innerHTML = value
        break
      case 'optionPlace':
        newChild.innerHTML = value
        break
    }
    newChild.id = id
    switch (target){
      case 'optionImage':
        newChild.style.height = "100px"
        newChild.style.width = "100px"
        break
      case 'optionArtist':
        newChild.style.color = "black"
        newChild.style.border = "solid black 2px"
        break
      case 'optionPlace':
        newChild.style.color = "black"
        newChild.style.border = "solid black 2px"
        break 
    }
    newChild.addEventListener('mouseenter', (event) => {
      document.body.style.cursor = "pointer"
      event.target.style.opacity = 0.5
    })
    newChild.addEventListener('mouseleave', (event) => {
      document.body.style.cursor = "default"
      event.target.style.opacity = 1
    })
    newChild.addEventListener('click', (event) => {
      event.target.remove()
      switch (target){
        case 'optionImage':
          var selected_zone = document.getElementById("addedimages")
          break
        case 'optionArtist':
          var selected_zone = document.getElementById("addedartists")
          break
        case 'optionPlace':
          var selected_zone = document.getElementById("addedplaces")
          break
      }
      var nodes = selected_zone.childNodes
      var id_tab = ""
      for (let i = 1; i < nodes.length; i++){
        if (nodes[i].id != undefined){
          if (id_tab == ""){
            id_tab += nodes[i].id
          }
          else {
            id_tab += "," + nodes[i].id
          }
        }
      }
      input_value.value = id_tab
    })
    selected_zone.appendChild(newChild)
    for (let i = 1; i < nodes.length; i++){
      if (nodes[i].id != undefined){
        if (id_tab == ""){
          id_tab += nodes[i].id
        }
        else {
          id_tab += "," + nodes[i].id
        }
      }
    }
    input_value.value = id_tab
  }
  var defaultoption = document.getElementById(target)
  defaultoption.selected = "0"
}