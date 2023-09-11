export default class notesView {
    constructor(root, { onNoteSelect, onNoteAdd, onNoteEdit, onNoteDelete} = {}) {
        this.root = root;
        this.onNoteSelect = onNoteSelect;
        this.onNoteAdd = onNoteAdd;
        this.onNoteEdit = onNoteEdit;
        this.onNoteDelete = onNoteDelete;
        this.root.innerHTML = `
        <section class="notes__sidebar">
            <button class="notes__add" type="button">Add Note</button>
            <section class="notes__list"></section>
        </section>
            <section class="notes__preview">
            <input class="notes__title" type="text" placeholder="Note title">
            <textarea class="notes__body" name="" id="" cols="30" rows="10">Take note</textarea>
        </section>
        `;

        const addNoteButton = this.root.querySelector(".notes__add");
        const inputTitle = this.root.querySelector(".notes__title");
        const inputBody = this.root.querySelector(".notes__body");

        addNoteButton.addEventListener("click", () => {
            this.onNoteAdd();
        });

        [inputTitle, inputBody].map(inputField => {
            inputField.addEventListener("blur", () => {
                const updatedTitle = inputTitle.value.trim();
                const updatedBody = inputBody.value.trim();

                this.onNoteEdit(updatedTitle, updatedBody);
            });
        });

        // console.log(this._createListItemHTML(300, "Hey", "sup", new Date()));

        this.updateNotePreviewVisibility(false);
    }

    _createListItemHTML(id, title, body, updated){

        // if (500 < screenWidth < 811) {
        //     const screenWidth = document.body;
        //     const smallBodyHeight = document.querySelectorAll(".notes__small-body");
        // } else {
        //     const MAX_BODY_LENGTH = 60;
        // }

        const MAX_BODY_LENGTH = 50;
        
        return `
            <section class="notes__list-item" data-note-id="${id}">
                <section class="notes__small-title">${title}</section>
                <section class="notes__small-body">
                    ${body.substring(0, MAX_BODY_LENGTH)}
                    ${body.length > MAX_BODY_LENGTH ? "..." : ""}
                </section>
                <section class="notes__small-updated">
                    ${updated.toLocaleString(
                        undefined, {dateStyle: "full", timeStyle: "short"})}
                </section>
            </section>
        `;
    }

    updateNotesList(notes) {
        const notesListContainer = this.root.querySelector(".notes__list");

        // Emptying the list first
        notesListContainer.innerHTML = "";

        // Rebuilds the list
        for (const note of notes) {
            const html = this._createListItemHTML(
                note.id, note.title, note.body, new Date(note.updated));

                notesListContainer.insertAdjacentHTML("beforeend", html);
        }

        // Select/Delete events for the list
        notesListContainer.querySelectorAll(".notes__list-item").forEach(noteListItem => {
            noteListItem.addEventListener("click", () => {
                this.onNoteSelect(noteListItem.dataset.noteId);
            });

            noteListItem.addEventListener("dblclick", () => {
                const areYouSure = confirm("Are you sure you want to delete this note?");

                if (areYouSure) {
                    this.onNoteDelete(noteListItem.dataset.noteId);
                }
            });
        });
    }

    updateActiveNote(note) {
        this.root.querySelector(".notes__title").value = note.title;
        this.root.querySelector(".notes__body").value = note.body;

        this.root.querySelectorAll(".notes__list-item").forEach(noteListItem => {
            noteListItem.classList.remove("notes__list-item--selected");
        });

        this.root.querySelector(`.notes__list-item[data-note-id="${note.id}"]`).classList.add("notes__list-item--selected");
    }

    updateNotePreviewVisibility(visible){
        this.root.querySelector(
            ".notes__preview").style.visibility = visible ? "visible" : "hidden";
    }
}