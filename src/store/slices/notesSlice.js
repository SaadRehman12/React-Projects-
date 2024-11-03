import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../../config/config";
import { addDoc, collection, deleteDoc, doc, getDocs,  query, updateDoc } from "firebase/firestore/lite";
import { v4 as uuidv4 } from 'uuid';
export const createNote = createAsyncThunk(
    "notes/createNote",
    async (notedata) => {
        try {
            const data = {
                noteId: uuidv4(),
                userId: notedata.userId,
                title: notedata.title,
                content: notedata.content,
                category: notedata.category, 
                createdAt: new Date(),
                createdBy: notedata.userId,
                lastEditedBy: notedata.userId,
                lastEditedAt: new Date(),
            };

            const collectionRef = collection(db, "notes");
            const response = await addDoc(collectionRef, data);
            return response.id; 
        } catch (error) {
            console.error("Error adding note:", error);
        }
    }
);
export const  getNotes = createAsyncThunk(
    "notes/getNots",
    async () => {
        try {
            const collectionRef = collection(db, "notes");
            const queryRef = query(collectionRef);
            const docs = await getDocs(queryRef);
      
            let notes = [];
            docs.forEach((doc) => {
              notes.push({ id: doc.id, ...doc.data() });  
            });
      console.log("notsuu",notes);
            return notes;
        } catch (error) {
            console.log(error);
        }
    }
)
export const deleteNotes = createAsyncThunk("feed/deletePost",
    async (id) => {
        try {
            const docRef = doc(db, "notes", id)
            await deleteDoc(docRef)
            return id
        } catch (error) {
            console.log("error", error);

        }
    }
)
export const updateNote = createAsyncThunk(
    "notes/updateNote",
    async (note) => {
        try {
            console.log("ffwetewtt",note);
            const docRef = doc(db, "notes", note.id);
            await updateDoc(docRef, {
                title: note.title,
                content: note.content,
                category:note.category
            });
          
            return { id: note.id, ...note };
        } catch (error) {
            console.error("Error updating post:", error);
            throw error;
        }
    }
);
const initialState ={
    note:[],
}
export const notesSlice = createSlice({
    name : "notes",
    initialState,
    reducers :{

    },
    extraReducers: (builder)=>{
        builder.addCase(createNote.fulfilled,(state,action)=>{
            state.note.push(action.payload)
        })
        builder.addCase(getNotes.fulfilled,(state,action)=>{
            state.note = action.payload
        })
        builder.addCase(deleteNotes.fulfilled,(state,action)=>{
            state.note = state.note.filter((post) => post.id !== action.payload)
        })
        builder.addCase(updateNote.fulfilled, (state, action) => {
            const index = state.note.findIndex(note => note.id === action.payload.id);
            if (index !== -1) {
                state.note[index] = { ...state.note[index], ...action.payload };
            }
        });
    }
})
export default notesSlice.reducer