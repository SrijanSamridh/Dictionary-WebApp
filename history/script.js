const word = document.getElementById("word");
const meaning = document.getElementById("meaning");
const btn = document.getElementById("btnSubmit");
const tableBody = document.getElementById("tableBody");
const inputSearch = document.getElementById("inputSearch");

let boxInformation = JSON.parse(localStorage.getItem("boxInformation")) || [];
let currentIndex = 0;

if (localStorage.getItem("boxInformation") !== null) {
  boxInformation = JSON.parse(localStorage.getItem("boxInformation"));
  displayBox();
}

btn.addEventListener("click", function () {
  if (currentIndex === 0) {
    let wordObject = {
      word: word.value,
      meaning: meaning.value,
    };
    boxInformation.push(wordObject);
  } else {
    updateData();
  }
  localStorage.setItem("boxInformation", JSON.stringify(boxInformation));
  displayBox();
});

inputSearch.addEventListener("keyup", function () {
  let term = "";
  for (let i = 0; i < boxInformation.length; i++) {
    if (
      boxInformation[i].word
        .toLowerCase()
        .includes(inputSearch.value.toLowerCase())
    ) {
      term += `<tr><td>${i + 1}</td><td>${boxInformation[i].word}</td><td><i>${
        boxInformation[i].meaning
      }</i></td><td><i class="material-icons action-btn delete-btn" onclick="deleteData(${i})">delete</i><i class="fas fa-edit action-btn edit-btn" onclick="updateData(${i})"></i></td></tr>`;
    }
  }
  tableBody.innerHTML = term;
});

function displayBox() {
  let term = "";
  for (let i = 0; i < boxInformation.length; i++) {
    term += `<tr><td>${i + 1}</td><td>${boxInformation[i].word}</td><td><i>${
      boxInformation[i].meaning
    }</i></td><td><i class="material-icons action-btn delete-btn" onclick="deleteData(${i})">delete</i><i class="fas fa-edit action-btn edit-btn" onclick="getData(${i})"></i></td></tr>`;
  }
  tableBody.innerHTML = term;
}

function deleteData(index) {
  boxInformation.splice(index, 1);
  localStorage.setItem("boxInformation", JSON.stringify(boxInformation));
  displayBox();
}

function getData(index) {
  currentIndex = index;
  word.value = boxInformation[currentIndex].word;
  meaning.value = boxInformation[currentIndex].meaning;
}

function updateData() {
  boxInformation[currentIndex].word = word.value;
  boxInformation[currentIndex].meaning = meaning.value;
}

const clearBtn = document.getElementById("clearBtn");
clearBtn.addEventListener("click", function () {
  localStorage.removeItem('boxInformation');
});