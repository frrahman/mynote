/**
 * @copyright codewithFajarrahman 2024
 */

"use strict";

const addEventOnElements = function ($elements, eventType, callback) {
  $elements.forEach(($element) =>
    $element.addEventListener(eventType, callback)
  );
};

/**
 * generates a greeting mesage based onthe current hoiur of the day
 * @param {number} currentHour - the current hour (0-23) to deterwine the appropriate greeting.
 * @returns {string} A greeting message with a salutaion corresponding to the time of day
 */

const getGreetingMsg = function (currentHour) {
  const /**{string} */ greeting =
      currentHour < 5
        ? "Night 😴"
        : currentHour < 12
        ? "Morning 😘"
        : currentHour < 15
        ? "Noon 😎"
        : currentHour < 17
        ? "Afternoon 🤩"
        : currentHour < 20
        ? "Evening 🥱"
        : "Night 😪";

  return `Good ${greeting} `;
};

let /**{HTMLElement | Undefined} */ $lastActiveNavItem;

/***
 * activates a navigation item by adding the "active" class and deactivates the previously activate item.
 */
const activeNotebook = function () {
  $lastActiveNavItem?.classList.remove("active");
  this.classList.add("active"); //this: $navItem
  $lastActiveNavItem = this; //this: $navItem
};

/**
 * makes a DOM element editable by setting the "contenteditable" attribute to true and focusing on it.
 * @param {HTMLElement} $element -the DOM element to make editable
 */
const makeElemEditable = function ($element) {
  $element.setAttribute("contenteditable", true);
  $element.focus();
};

/**
 * Generates a unique ID based on the current timestamp.
 * @returns {string} A string representation of the current timestamp.
 */
const generateID = function () {
  return new Date().getTime().toString();
};

/**
 * finds a notebook in database by its ID.
 *
 * @param {object} db - the database containing the notebooks.
 * @param {string} notebookId - the ID of the notebook to find.
 * @returns {Object | undefined} the found notebook object, or undefined if not found.
 */
const findNotebook = function (db, notebookId) {
  return db.notebooks.find((notebook) => notebook.id == notebookId);
};

/**
 * Finds the index of a notebook in an array of notebooks based on its ID
 *
 * @param {object} db - the object containing an array of notebooks.
 * @param {string} notebookId - the ID of the notebook to find.
 * @returns {number} the index of the found notebook, or -1 if not found.
 */
const findNotebookIndex = function (db, notebookId) {
  return db.notebooks.findIndex((item) => item.id == notebookId);
};

/**
 * convert a timestamp in milliseconds to a human-readable relative time string.
 *
 * @param {Number} millisecond - the timestamp in milliseconds to convert.
 * @returns {string} A string representing the relative time (e.g., "Just now," "5 min ago," "3 hours ago," "2 days ago")
 */
const getRelativeTime = function (milliseconds) {
  const /** {Number}*/ currentTime = new Date().getTime();

  const /**{Number} */ minute = Math.floor(
      (currentTime - milliseconds) / 1000 / 60
    );
  const /**{Number} */ hour = Math.floor(minute / 60);
  const /**{Number} */ day = Math.floor(hour / 24);

  return minute < 1
    ? "Just now"
    : minute < 60
    ? `${minute} min ago`
    : hour < 24
    ? `${hour} hour ago`
    : `${day} day ago`;
};

/**
 * finds a specific note by its ID within a database of notebooks and their notes.
 *
 * @param {Object} db - the database containing notebooks and notes .
 * @param {String} noteId - the ID of the note to find
 * @returns {Object | undefined} the found note object, or undefined if not found.
 */
const findNote = (db, noteId) => {
  let note;
  for (const notebook of db.notebooks) {
    note = notebook.notes.find((note) => note.id == noteId);
    if (note) break;
  }
  return note;
};

/**
 * finds the index of a note in a notebook's array of notes based on its ID
 *
 * @param {Object} notebook - The notebook object containing an array of notes.
 * @param {String} noteId - the ID of the note to find.
 * @returns {number} - the index of the found note, or -1 if not found.
 */
const findNoteIndex = function (notebook, noteId) {
  return notebook.notes.findIndex((note) => note.id == noteId);
};

export {
  addEventOnElements,
  getGreetingMsg,
  activeNotebook,
  makeElemEditable,
  generateID,
  findNotebook,
  findNotebookIndex,
  getRelativeTime,
  findNote,
  findNoteIndex,
};
