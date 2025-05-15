let textarea = document.getElementById("inputfield");

textarea.addEventListener("input", function () {
    let text = textarea.value;

    let cleanedText = text.replace(/[0-9]/g, '');
    
    if (text !== cleanedText) {
        textarea.value = cleanedText;
    }
});
