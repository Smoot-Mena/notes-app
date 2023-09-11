export default class notesAPI {
	static getAllNotes() {
		const notes = JSON.parse(localStorage.getItem("notesapp-notes") || "[]");

		return notes.sort((a, b) => {
			return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
		});
	}

	static saveNote(noteRescued) {
		const notes = notesAPI.getAllNotes();
		const existingNote = notes.find(note => note.id == noteRescued.id);

		// Edit/Update existing notes
		if (existingNote) {
			existingNote.title = noteRescued.title;
			existingNote.body = noteRescued.body;
			existingNote.updated = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString();
		} else {
			noteRescued.id = Math.floor(Math.random() * 1000000);
			noteRescued.updated = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString();
			notes.push(noteRescued);
		}

		localStorage.setItem("notesapp-notes", JSON.stringify(notes));
	}

	static deleteNote(id) {
		const notes = notesAPI.getAllNotes();
		const newNotes = notes.filter(note => note.id != id);

		localStorage.setItem("notesapp-notes", JSON.stringify(newNotes));
	}
}