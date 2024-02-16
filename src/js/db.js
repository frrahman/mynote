/**
 * @copyright codewithFajarrahman 2024
 */

"use strict";

/**
 * Import module
 */
import {
  generateID,
  findNotebook,
  findNotebookIndex,
  findNote,
  findNoteIndex,
} from "./utils.js";

// DB Object
let /**{Object} */ notekeeperDB = {};

/**
 * Initializes a local databse . if the data exists in local storage, it is loaded;
 * otherwise , a new empty databse structure is created and stored.
 */
const initDB = function () {
  const /**{JSON | undefined} */ db = localStorage.getItem("notekeeperDB");

  if (db) {
    notekeeperDB = JSON.parse(db);
  } else {
    notekeeperDB.notebooks = [];
    localStorage.setItem("notekeeperDB", JSON.stringify(notekeeperDB));
  }
};

initDB();

/**
 * reads and loads the localstorage data in to the glabal variable
 "notekeeperDB".
 */

const readDB = function () {
  notekeeperDB = JSON.parse(localStorage.getItem("notekeeperDB"));
};

/**
 * writes the current state of the global variable "notekeeperDB" to local storage
 */
const writeDB = function () {
  localStorage.setItem("notekeeperDB", JSON.stringify(notekeeperDB));
};

/**
 * collection of fuvntion for performing CRUD (create, READ, UPDATE , DELETE) operations on database.
 * the database state is managed using global variables and local storage.
 *
 * @namespace
 * @property {Object} get - fucntion for retrieving data from the database .
 * @property {Object} post - function for adding data to the database.
 * @property {Object} Update - functions for updatiing data in the dtabase
 * @property {Object} delete - function for deleting data from the database
 */
export const db = {
  post: {
    /**
     * Adds a new notebook to the database
     *
     * @function
     * @param {string} name - the name of the new notebook.
     * @returns {object} the newly created notebook object
     */
    notebook(name) {
      readDB();

      const /**{Object} */ notebookData = {
          id: generateID(),
          name,
          notes: [],
        };

      notekeeperDB.notebooks.push(notebookData);

      writeDB();

      return notebookData;
    },

    /**
     * Adds a new note to a specified notebook in the database.
     *
     * @function
     * @param {string} notebookId - The ID of the notebook to add the note to.
     * @param {object} object - the note object to add.
     * @returns {Object} the newly created note object.
     */
    note(notebookId, object) {
      readDB();

      const /**{Object} */ notebook = findNotebook(notekeeperDB, notebookId);

      const /**{Object} */ noteData = {
          id: generateID(),
          notebookId,
          ...object,
          postedOn: new Date().getTime(),
        };

      notebook.notes.unshift(noteData);

      writeDB();

      return noteData;
    },
  },

  get: {
    /**
     * retrieves all notebooks from the database
     *
     * @function
     * @returns {Array<Object>} An array of notebook objects.
     */
    notebook() {
      readDB();

      return notekeeperDB.notebooks;
    },

    /**
     * Retrieves all notes within a specified notebook.
     *
     * @function
     * @param {string} notebookId - the ID of the notebook to retrieve notes from
     * @returns {Array<Object>} An array of note objects.
     */
    note(notebookId) {
      readDB();

      const /**{Object} */ notebook = findNotebook(notekeeperDB, notebookId);
      return notebook.notes;
    },
  },

  update: {
    /**
     * updates the name of a notebook in the database
     *
     * @function
     * @param {String} notebookId - the ID of the notebook to update.
     * @param {String} name - the new name for the notebook.
     * @returns {Object} the updated notebook object.
     */

    notebook(notebookId, name) {
      readDB();

      const /**{object} */ notebook = findNotebook(notekeeperDB, notebookId);
      notebook.name = name;

      writeDB();

      return notebook;
    },

    /**
     *
     * @function
     * @param {string} noteId - The ID of the note to update.
     * @param {Object} object - The updated data for the note.
     * @returns {object} The updated note object.
     */
    note(noteId, object) {
      readDB();

      const /**{Object} */ oldNote = findNote(notekeeperDB, noteId);
      const /**{Object} */ newNote = Object.assign(oldNote, object);

      writeDB();

      return newNote;
    },
  },

  delete: {
    /**
     * Deletes a notebook from the database
     *
     * @function
     * @param {string} notebookId - the ID of the notebook to delete
     */
    notebook(notebookId) {
      readDB();

      const /**{Number} */ notebookIndex = findNotebookIndex(
          notekeeperDB,
          notebookId
        );

      notekeeperDB.notebooks.splice(notebookIndex, 1);

      writeDB();
    },

    /**
     * Deletes a note from a specified notebook in the database.
     *
     * @function
     * @param {string} notebookId - The ID of the notebook containing the note to delete.
     * @param {string} noteId - The ID of the note to delete .
     * @returns {Array<Object>} An array of remaining notes in the notebook.
     */
    note(notebookId, noteId) {
      readDB();

      const /**{Object} */ notebook = findNotebook(notekeeperDB, notebookId);
      const /** {Number} */ noteIndex = findNoteIndex(notebook, noteId);

      notebook.notes.splice(noteIndex, 1);

      writeDB();

      return notebook.notes;
    },
  },
};
