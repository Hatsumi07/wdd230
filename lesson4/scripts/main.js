const chaptersList = document.getElementById("list");
const favChapter = document.getElementById("chapter");
const add = document.getElementById("addChapter");

add.addEventListener('click', addChapter);
function addChapter() {
    const newList = document.createElement("li");
    const newBtn = document.createElement("button");
    const textNode = document.createTextNode(favChapter.value);
    const btnTxt = document.createTextNode("❌");
    newList.appendChild(textNode);
    chaptersList.appendChild(newList);
    newBtn.appendChild(btnTxt);
    newList.appendChild(newBtn);
    newBtn.addEventListener('click', popChapter);
};
function popChapter () {
    const parent = this.parentNode;
    parent.remove();
}