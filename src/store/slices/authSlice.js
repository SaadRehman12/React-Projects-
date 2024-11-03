import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

import { auth, db, storage } from "../../config/config";
import { collection, doc, getDoc, getDocs, query, setDoc } from "firebase/firestore/lite";
import { onAuthStateChanged } from "firebase/auth/cordova";


export const Signup = createAsyncThunk(
    "auth/Signup",
    async (post, { rejectWithValue }) => {
      try {
        let imageUrl = null;
        if (post.profileImage) {
          const imageRef = ref(storage, `images/${post.profileImage.name}`);
          const snapshot = await uploadBytes(imageRef, post.profileImage);
          imageUrl = await getDownloadURL(snapshot.ref);
          console.log("Image uploaded successfully:", imageUrl);
        }
  
        const userCredential = await createUserWithEmailAndPassword(auth, post.email, post.password);
        console.log("User credential:", userCredential);
        
        let userDetail = {
          name: post.name,
          userName: post.userName,
          profileImageUrl: imageUrl, // Save the image URL instead of file
          email: post.email,
          uid: userCredential.user.uid,
        };
        
        await setDoc(doc(db, "users", userCredential.user.uid), userDetail);
        return userDetail;
      } catch (error) {
        console.log("Error during signup:", error);
        return rejectWithValue(error.message); // Return error to Redux if failure
      }
    }
  );
  export const login = createAsyncThunk(
    'Users/login',
    async(user) => {
        try {
            console.log(user);
            const userCredential = await signInWithEmailAndPassword(auth, user.email, user.password);

            
            const docSnap = await getDoc(doc(db, 'users', userCredential.user.uid));
            const dbuser = docSnap.data(); 
            console.log(dbuser);
            return dbuser; 
        } catch (error) {
            console.error("Error during login:", error);
            throw new Error(error.message);
        }
    }
);
export const Signout = createAsyncThunk(
    'auth/Signout',
    async () => {
        try {
            await signOut(auth)
            return true
        } catch (error) {
            console.log(error);
        }
    }
)

export const currentUser = createAsyncThunk(
    "auth/currentUser",
    async (setLoading, store)=>{
        try {
            setLoading(true)
            onAuthStateChanged(auth,async(user) => {
                console.log("currentUser",user);
                if (user) {
                  const uid = user.uid;
                  const docSnap = await getDoc(doc(db, "users",uid))
                  const dbUser = docSnap?.data()
                  console.log(dbUser);
                  store.dispatch(setUser(dbUser))
                  console.log("dbUser",dbUser);
                  setLoading(false)
                } else{
                    setLoading(false)
                }
              });
              return 
        } catch (error) {
            setLoading(false)
            console.log(error);
            
        }
         
    }
  )
  export const  getUsers = createAsyncThunk(
    "users/getUsers",
    async () => {
        try {
            const collectionRef = collection(db, "users");
            const queryRef = query(collectionRef);
            const docs = await getDocs(queryRef);
      
            let data = [];
            docs.forEach((doc) => {
              data.push({ id: doc.id, ...doc.data() });  
            });
      console.log("nots",data);
            return data;
        } catch (error) {
            console.log(error);
        }
    }
)
const initialState={
    user : null,
    userNotes : []
}
export const authSlice = createSlice({
    name : "users",
    initialState,
    reducers:{
        setUser : (state,action)=>{
            console.log("state",action);
            state.user = action.payload
           }
    },
    extraReducers : (builder)=>{
        builder.addCase(Signup.fulfilled,(state,action)=>{
            state.user = action.payload
        })
        builder.addCase(login.fulfilled,(state,action)=>{
            state.user = action.payload
        })
        builder.addCase(Signout.fulfilled,(state,action)=>{
            console.log('action in signout',action.payload);
            state.user = null
        });
        builder.addCase(getUsers.fulfilled,(state,action)=>{
            state.userNotes = action.payload
        })
    }
})
export const {setUser} = authSlice.actions
export default authSlice.reducer