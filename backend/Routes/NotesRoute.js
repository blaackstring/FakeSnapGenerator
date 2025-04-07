import express from 'express';
import { SendNote } from '../Controllers/SendNoteController.js';
import { authmiddleware } from '../middleware/authmiddleware.js';
import { getAllNotes } from '../Controllers/getAllNotes.js';



const Notesrouter=express.Router(); //help in builing sepreate route without creating new express Instance



Notesrouter.post('/SendNote',authmiddleware,SendNote);
Notesrouter.get('/Getnotes/:id',authmiddleware,getAllNotes);



export default Notesrouter;