const input_box = document.getElementById("inputbox");
const submit = document.getElementById("submit");
const typedw = document.getElementById("word");
const synonym = document.getElementById("synon");
const definition = document.getElementById("defi");
const speak = document.getElementById("speaker");

async function getdefinition() {
    const check = input_box.value.trim();
    input_box.value=""

    if(check === "")
    {
        alert("please enter a word")
        return
    }

    let url=`https://api.dictionaryapi.dev/api/v2/entries/en/${check}`

    try{

        let response=await fetch(url)
        let data=await response.json()
        console.log(data)
       
        if(!data || data.title === "No Definitions Found")
        {
            alert("Word not found! please try another word.")
            return
        }

        typedw.textContent=data[0].word
        definition.textContent=data[0].meanings[0].definitions[0].definition
        let synonymsList = data[0].meanings[0].definitions[0].synonyms;
        synonym.textContent = synonymsList.length > 0 ? synonymsList.join(", ") : "None";


        speak.onclick = () => speakWord(data[0].word)
        
    }
    catch(error)
    {
        alert("Error fetching details please try again!")
        console.error(error)
    }

}

function speakWord(word)
{
    let speech = new SpeechSynthesisUtterance(word)
    speech.lang= "en-US"
    speechSynthesis.speak(speech)
}


submit.addEventListener("click",getdefinition)