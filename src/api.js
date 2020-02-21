let rapidAPIHeaders = {
    "x-rapidapi-host": "microsoft-azure-translation-v1.p.rapidapi.com",
    "x-rapidapi-key": process.env.REACT_APP_RAPIDAPI_KEY
}

let parseXml;
// create xml parsing functions
// the next if/else block is from the following thread
// https://stackoverflow.com/questions/649614/xml-parsing-of-a-variable-string-in-javascript
if (typeof window.DOMParser != "undefined") {
    parseXml = function(content) {
        return ( new window.DOMParser() ).parseFromString(content, "text/xml");
    };
} else if (typeof window.ActiveXObject != "undefined" &&
        new window.ActiveXObject("Microsoft.XMLDOM")) {
    parseXml = function(content) {
        let xmlDoc = new window.ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async = "false";
        xmlDoc.loadXML(content);
        return xmlDoc;
    };
} else {
    throw new Error("No XML parser found");
}

export default {
    Translate: {
        // Speak endpoints. Returns the url of the local audio file
        textToSpeech: (encoded, target) => {
            return fetch(`https://microsoft-azure-translation-v1.p.rapidapi.com/Speak?text=${encoded}&language=${target}`, {
                "method": "GET",
                "headers": rapidAPIHeaders
            })
            .then(response => response.blob())
            .then(blob => {
                return URL.createObjectURL(blob);
            })
        },
        // Get Speak Language Options endpoint. Returns a list of strings
        getSpeakLanguages: () => {
            return fetch("https://microsoft-azure-translation-v1.p.rapidapi.com/GetLanguagesForSpeak", {
                "method": "GET",
                "headers": rapidAPIHeaders
            })
            .then(response => response.text()) // convert response to text
            .then(text => {
                // creates XML document
                let document = parseXml(text)

                // creates array from HTMLCollection object
                let stringElementArray = Array.from(document.getElementsByTagName('string'))

                // extracts innerHTML value from string tag object
                let languages = stringElementArray.map(string => string.innerHTML)
                return languages
            })
        },
        // Translate endpoint. Returns the translated text as a string
        translateToText: (encoded, target) => {
            return fetch(`https://microsoft-azure-translation-v1.p.rapidapi.com/translate?from=en&to=${target}&text=${encoded}`, {
                "method": "GET",
                "headers": rapidAPIHeaders
            })
            .then(response => response.text())
            .then(text => {
                let document = parseXml(text)
                let stringElementArray = document.getElementsByTagName('string')
                return stringElementArray[0].innerHTML
            })
            .catch(err => {
                console.log(err);
            });
        }
    }
}