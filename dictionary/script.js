const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");

const btn = document.getElementById("search-btn");

btn.addEventListener("click", () => {
    let inpWord = document.getElementById("inp-word").value.trim();
    console.log(inpWord.value);
    if(!inpWord) {
      result.innerHTML = `
          <p class="word-error">
          Please enter a word to be searched!
          </p>`;
      redirectToIndex();
    }
    else{
      fetch(`${url}${inpWord}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        result.innerHTML = `
          <div class="word">
              <h3>${inpWord}</h3>
              <button onclick="playSound()" id="speak">
              <i class="fa-solid fa-volume-high" style="color: #b18cfe"></i>
              </button>
          </div>
          <div class="details">
              <p>${data[0].meanings[0].partOfSpeech}</p>
              <p>${data[0].phonetic}</p>
          </div>
          <p class="word-meaning">
              ${data[0].meanings[0].definitions[0].definition}
          </p>
          <p class="word-example">
              ${data[0].meanings[0].definitions[0].example || " "}
          </p>`;
        // check if sound is available
        if (data[0].phonetics[0].audio) {
          sound.setAttribute("src", `${data[0].phonetics[0].audio}`);
        } else {
          // if sound is not available hide the sound button
          document.getElementById("speak").style.display = "none";
        }
        console.log(sound);
      })
      .catch(() => {
        result.innerHTML = `
          <div class="word">
              <h3>${inpWord}</h3>
          </div>
          <div class="details">
              <p>Not Found</p>
          </div>
          <p class="word-meaning">
              No meaning found
          </p>
          <p class="word-example">
              No example found
          </p>`;
      });
    }
  });
  
  

function playSound() {
  sound.play();
}