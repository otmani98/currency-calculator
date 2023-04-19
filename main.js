//stoping form from submitting
form = document.forms[0];
form.onsubmit = function (e) {
  e.preventDefault();
};

// Function to Get data from API
async function getData() {
  const data = fetch(
    "https://api.currencyfreaks.com/v2.0/rates/latest?apikey=28ee693e0ead4cb38bd17f60ee4426a2"
  );
  return data;
}

getData()
  .then((data) => {
    return data.json();
  })
  //make options for currency
  .then((result) => {
    let fromcurrency = document.getElementById("fromcurrency");
    let tocurrency = document.getElementById("tocurrency");
    let arrayCurrency = Object.keys(result.rates).sort().slice(1);

    for (let i = 0; i < arrayCurrency.length; i++) {
      let option = document.createElement("option");
      option.append(arrayCurrency[i]);
      option.value = arrayCurrency[i];
      fromcurrency.appendChild(option);
    }

    for (let i = 0; i < arrayCurrency.length; i++) {
      let option = document.createElement("option");
      option.append(arrayCurrency[i]);
      option.value = arrayCurrency[i];
      tocurrency.appendChild(option);
    }

    //return default value for tocurrency
    fromcurrency.addEventListener("change", function (e) {
      if (tocurrency.value === fromcurrency.value) {
        tocurrency.childNodes[1].selected = true;
      }
    });

    //return default value for fromcurrency
    tocurrency.addEventListener("change", function (e) {
      if (tocurrency.value === fromcurrency.value) {
        fromcurrency.childNodes[1].selected = true;
      }
    });

    //reverse choosen currency
    document.querySelectorAll("button")[0].onclick = function () {
      let stash = tocurrency.value;
      tocurrency.value = fromcurrency.value;
      fromcurrency.value = stash;
    };

    return result;
  })
  //take input and calc and send the result
  .then((result) => {
    let input = document.getElementById("inputc");
    let resultdiv = document.getElementById("result");
    let fromcurrency = document.getElementById("fromcurrency");
    let tocurrency = document.getElementById("tocurrency");
    let button = document.querySelectorAll("button")[1];
    button.onclick = function () {
      if (input.value.length > 0) {
        if (fromcurrency.value === "select" || tocurrency.value === "select") {
          resultdiv.innerHTML = "First Choose The Currency";
        } else {
          let stage01 = input.value / result.rates[fromcurrency.value];
          let stage02 = stage01 * result.rates[tocurrency.value];
          resultdiv.innerHTML = stage02.toFixed(4);
        }
      } else {
        resultdiv.innerHTML = "First Put The Value ._.";
      }
    };
  });
