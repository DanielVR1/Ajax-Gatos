
function gatos(){
    var numeros = document.getElementById("num").value;
    var xhr = new XMLHttpRequest();
    document.getElementById("res").innerHTML = '';
    xhr.open("GET", "https://api.thecatapi.com/v1/images/search?category_ids="+categoriasInput.value+'&breed_ids='+razasInput.value+'&limit='+numeros, true);
    xhr.send();
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            var datos = JSON.parse(xhr.responseText);
            for (let i = 0; i < numeros; i++){
                var html = '<img src="' + datos[i]["url"] + '" class="galeria__img">';
                document.getElementById("res").innerHTML += html;
            }
        }else{
            console.log("ERROR");
        }
    }
}
const urlCategorias ="https://api.thecatapi.com/v1/categories";
const urlRazas ="https://api.thecatapi.com/v1/breeds";
const categoriasInput = document.getElementById("categorias");
const razasInput = document.getElementById('razas');

var getJSON = function(url) {
    return new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open("get", url, true);
      xhr.responseType = "json";
      xhr.onload = function() {
        var status = xhr.status;
        if (status == 200) {
          resolve(xhr.response);
        } else {
          reject(status);
          console.log("ERROR");
        }
      };
      xhr.send();
    });
  };
  
  //CATEGORIAS
  getJSON(urlCategorias).then(
    function(data) {
      data.forEach(function(categoria) {
        option = document.createElement("option");
        option.setAttribute("value", categoria.id);
        option.innerHTML = categoria.name;
        categoriasInput.appendChild(option);
      });
    },
    function(status) {
      console.log("ERROR");
    }
  );

  //RAZAS
   getJSON(urlRazas).then(
    function(data) {
      data.forEach(function(raza) {
        option = document.createElement("option");
        option.setAttribute("value", raza.id);
        option.innerHTML = raza.name;
        razasInput.appendChild(option);
      });
    },
    function(status) {
      console.log("ERROR");
    }
  );
