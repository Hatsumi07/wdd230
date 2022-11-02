const chaptersList = document.getElementById("list");
const favChapter = document.getElementById("chapter");
const add = document.getElementById("addChapter");

add.addEventListener('click', addChapter);
function addChapter() {
    if (favChapter.value.split("").length <= 0) {
        document.getElementById("inputError").style.display = "block";
    } else {
        document.getElementById("inputError").style.display = "none";
        const newList = document.createElement("li");
        const newBtn = document.createElement("button");
        const textNode = document.createTextNode(favChapter.value);
        const btnTxt = document.createTextNode("❌");
        newList.appendChild(textNode);
        chaptersList.appendChild(newList);
        newBtn.appendChild(btnTxt);
        newBtn.setAttribute("aria-label", `close ${favChapter.value}`);
        newList.appendChild(newBtn);
        newBtn.addEventListener('click', popChapter);
    }
};
function popChapter () {
    const parent = this.parentNode;
    parent.remove();
}