import { defineStore } from "pinia";

import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore/lite";
import { db } from "../firebaseConfig";

import { auth } from "../firebaseConfig";

import { nanoid } from "nanoid";
import router from "../router";


export const useDatabaseStore = defineStore('database', {
    state: () => ({
        documents: [],

        LoadingDoc: false,

        Loading: false //Loading sencillo
    }),   

    actions: {

        async getUrl( id ) {
            try {
                const docRef = doc(db, 'urls', id) 
                const DocSpan = await getDoc(docRef) 
                if (!DocSpan.exists()) {
                    /* throw new Error("Este documento no existe") */

                    return false
                }
                
                return DocSpan.data().name

            } catch (error) {
                console.log(error.message)

                return false
            }
            finally {

            }
        },

        async getUrls() {
            /* if(this.documents.length !== 0)
                return */
                
            this.LoadingDoc = true

            try {
                /* const q = query(collection(db, 'urls'), where("user", "==", "YF0lArbSM6cew1Dx9r4lnjLcOf53")) */
                const q = query(collection(db, 'urls'), 
                where("user", "==", auth.currentUser.uid))

                const querySnapShot = await getDocs(q)
                querySnapShot.forEach( doc => {
                    //console.log(doc.id, doc.data())
                    this.documents.push({
                        Id: doc.id,
                        ...doc.data()
                    })
                })
            } catch (error) {
                console.log(error)
            }
            finally {
                this.LoadingDoc = false
            }
        },

        async AddUrls(name) {
            this.Loading = true

            try {
                const objectDoc = {
                    name: name,
                    short: nanoid(6),
                    user: auth.currentUser.uid
                }
                //const docRef = await addDoc(collection(db, "urls"), objectDoc)

                const docRef = await setDoc(doc(db, "urls", objectDoc.short), objectDoc)

                /* console.log(docRef.id) */
                this.documents.push({
                    ...objectDoc,
                    /* id: docRef.id */

                    id: objectDoc.short,
                })
            } catch (error) {
                console.log(error.code)
                return error.code
            }
            finally{
                this.Loading = false
            }
        },

        async LeerUrl (id) {
            try {
                const docRef = doc(db, 'urls', id) //Referencia del id
                const DocSpan = await getDoc(docRef) //Referencia del doc unico ya tiene
                //el id

                //Doble Seguridad
                if (!DocSpan.exists()) {
                    throw new Error("Este documento no existe")
                }
                if (DocSpan.data().user !== auth.currentUser.uid) {
                    throw new Error("Este documento no le pertenece")
                }

                return DocSpan.data().name

            } catch (error) {
                console.log(error.message)
            }
            finally {

            }
        },

        async ActualizarUrl( id, name ) {
            this.Loading = true

            try {
                const docRef = doc(db, 'urls', id)
                const DocSpan = await getDoc(docRef) 
                if (!DocSpan.exists()) {
                    throw new Error("Este documento no existe")
                }
                if (DocSpan.data().user !== auth.currentUser.uid) {
                    throw new Error("Este documento no le pertenece")
                }
                await updateDoc(docRef, {
                    name: name
                })
    
                this.documents = this.documents.map(item => item.Id === id ? ({...item, name: name}) : item)
                router.push("/")

            } catch (error) {
                console.log(error.message)
                return error.message
            }
            finally {
                this.Loading = false
            }
            
        },

        async EliminarUrl (id) {
            this.Loading = true
            try {
                const docRef = doc(db, 'urls', id)

                const DocSpan = await getDoc(docRef) 
                if (!DocSpan.exists()) {
                    throw new Error("Este documento no existe")
                }
                if (DocSpan.data().user !== auth.currentUser.uid) {
                    throw new Error("Este documento no le pertenece")
                }

                await deleteDoc(docRef)
                this.documents = this.documents.filter( (item) => item.Id !== id)
            } catch (error) {
                //console.log(error.code)
                return error.message
            }
            finally {
                this.Loading = false
            }
        } 
    }
})