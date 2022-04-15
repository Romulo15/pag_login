function Enviar() {
  var nome = document.getElementById("nome");
  var idade = document.getElementById("bday");
  var endereco = document.getElementById("cep");
}

function getAddres() {}

function getAge() {
  var age = document.getElementById("bday").value;

  console.log(age);
  if (age.length == 10) {
    if (isValidDate(age)) {
      age = calcAge(age);
    }
  }
  document.getElementById("idade").value = age;
}

function calcAge(dateString) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var month = today.getMonth() - birthDate.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

function isValidDate(bday) {
  var today = new Date();
  var thisYear = today.getFullYear();
  var date = new Date(bday);
  var year = date.getFullYear();
  var adult = thisYear - year;
  if (thisYear < year || adult < 18) {
    return false;
  }
  return true;
}

function getAddress() {
    var endereco = document.getElementById("cep").value;
    console.log(endereco.length);
    if(endereco.length == 8 ){
        console.log("Deu certo");
    Promise.resolve(fetchAddress(endereco)).then(
    function (value) {
      console.log(value); // "Success"
      document.getElementById("endereco").value = value;
    },
    function (value) {}
  );
    }

}

function fetchAddress(endereco) {
    var requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  
  return fetch(`http://viacep.com.br/ws/${endereco}/json/`, requestOptions)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      if (typeof result === "object") {
        return result.logradouro;
      }
    })
    .catch((error) => console.log("error", error));
}
