const notesList = document.querySelector("#notesList");
const addNoteButton = document.querySelector("#add");
console.log(notesList);

function saveNotes() {
  const notes = Array.from(notesList.children)
    .map((note) => note.firstChild.innerHTML)
    .filter((html) => {
      const temp = document.createElement("div");
      temp.innerHTML = html;
      return temp.textContent.trim() !== "";
    });
  localStorage.setItem("notes", JSON.stringify(notes));
  console.log(notes);
}

function addNote(content) {
  const noteElement = document.createElement("li");
  const noteContainer = document.createElement("div");
  const noteLink = document.createElement("a");
  const h2 = document.createElement("h2");
  const p = document.createElement("p");
  const deleteBtn = document.createElement("button");

  h2.contentEditable = true;
  p.contentEditable = true;

  if (content) {
    const temp = document.createElement("div");
    temp.innerHTML = content;
    h2.innerHTML = temp.querySelector("h2")?.innerHTML || "";
    p.innerHTML = temp.querySelector("p")?.innerHTML || "";
  }

  h2.addEventListener("input", saveNotes);
  p.addEventListener("input", saveNotes);

  const top = document.createElement("div");
  top.classList.add("top");
  noteLink.appendChild(top);
  top.appendChild(h2);
  top.appendChild(deleteBtn);

  noteLink.appendChild(p);
  noteLink.classList.add("note");

  deleteBtn.textContent = "x";
  deleteBtn.className = "delete";
  deleteBtn.addEventListener("click", () => {
    noteElement.remove();
    saveNotes();
  });
  noteContainer.classList.add("noteContainer");
  noteContainer.appendChild(noteLink);

  noteElement.appendChild(noteContainer);
  notesList.appendChild(noteElement);
}

addNoteButton.addEventListener("click", () => {
  addNote();
});

function loadNotes() {
  const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
  savedNotes.forEach(addNote);
}
document.querySelector("#clearAll").addEventListener("click", () => {
  localStorage.removeItem("notes");
  notesList.innerHTML = "";
});
loadNotes();
