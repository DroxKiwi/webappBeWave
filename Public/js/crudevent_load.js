// This function is used to load 

var loaded = false
if (!loaded){
  load(document.getElementById("images"), document.getElementById("addedimages").childNodes, "")
  load(document.getElementById("artists"), document.getElementById("addedartists").childNodes, "")
  load(document.getElementById("places"), document.getElementById("addedplaces").childNodes, "")
  console.log("fully loaded")
  loaded = true
}
function load(input_value, nodes, id_tab){
  for (let i = 1; i < nodes.length; i++){
    if (nodes[i].id != undefined){
      if (id_tab == ""){
        id_tab += nodes[i].id
      }
      else {
        id_tab += "," + nodes[i].id
      }     
      switch (input_value.id){
        case ('images'):
          nodes[i].style.height = "100px"
          nodes[i].style.width = "100px"
          break
        case ('artists'):
          nodes[i].style.color = "black"
          nodes[i].style.border = "solid black 2px"
          break
        case ('places'):
          nodes[i].style.color = "black"
          nodes[i].style.border = "solid black 2px"
          break
      }
    }
  }
  input_value.value = id_tab
  for (let i = 0; i < nodes.length; i++){
    nodes[i].addEventListener('mouseenter', (event) => {
      document.body.style.cursor = "pointer"
      event.target.style.opacity = 0.5
    })
    nodes[i].addEventListener('mouseleave', (event) => {
      document.body.style.cursor = "default"
      event.target.style.opacity = 1
    })
    nodes[i].addEventListener('click', (event) => {
      event.target.remove()
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
  }
}