
var pagina = 0;
var maxImg = "";
var maxPag = "";
var fotos = '';
var TotalFotos;

function gatos(){
  pagina = 1;
    var xhr = new XMLHttpRequest();
    document.getElementById("res").innerHTML = '';
    xhr.open("GET", "https://api.thecatapi.com/v1/images/search?api_key=d34ac1ef-a539-4ed2-931d-993dad1ca3af&category_ids="+categoriasInput.value+'&breed_ids='+razasInput.value+'&limit=100', true);
    xhr.send();
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            var datos = JSON.parse(xhr.responseText);
            maxImg = xhr.getResponseHeader("Pagination-Count");
            document.getElementById("pagTot").innerHTML = xhr.getResponseHeader("Pagination-Count");
            TotalFotos = xhr.getResponseHeader("Pagination-Count");
            fotos = datos;
            paginar();
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
        }else {
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

  //Sacamos el numero de paginas totales
  totalPaginas = () =>{

    var h = TotalFotos/document.getElementById("num").value;
    h = Math.ceil(h);
    return h;
  }

function paginar(){
  var numeros = document.getElementById('num').value;
  var mostrado = numeros*pagina;
  document.getElementById("paginaAct").innerHTML = pagina+"/"+totalPaginas();
  maxPag = (maxImg/numeros).toFixed(0) + 1;

  if(pagina == totalPaginas()){
    document.getElementById('sig').style.display = 'none';
  }else{
    document.getElementById('sig').style.display = 'inline-block';
  }
  if(pagina == 1){
     document.getElementById('ant').style.display = 'none';
  }else{
    document.getElementById('ant').style.display = 'inline-block';
  }

  document.getElementById('res').innerHTML = '';

  for( let i = mostrado-numeros; i < mostrado; i++){
    let imag = "<img class='galeria__img' src='"+fotos[i]["url"]+"'>";
    document.getElementById('res').innerHTML += imag;

  }

}

function pagAnt(){
  pagina -=  1;
  paginar()
}
function pagSig(){
  pagina += 1;
  paginar();
}