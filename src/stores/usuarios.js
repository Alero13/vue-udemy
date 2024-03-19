import { defineStore } from "pinia";

import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../FirebaseConfig";

import Router  from "../router";

import { useDatabaseStore } from "../stores/database";
import { doc, getDoc, setDoc } from "firebase/firestore/lite";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const useUsuariosStore = defineStore("usuariosStore", {
    state: () => ({
        /* usuarioData: "Cesar1013@test.com", */
        usuarioData: null,
        loadingUser: false,
        loadingSession: false
    }),
   /*  getters: {
        Minuscula(state) {
            return state.usuarioData.toLowerCase();
        },
    }, */
    actions: {
        /* RegistrarUsuario(Nombre) {
            this.usuarioData = Nombre;
        }, */

        async RegistrarUsuario(Email, Password) {
            this.loadingUser = true

            try {
                const { user } =  await createUserWithEmailAndPassword( auth, Email, Password )
                /* console.log(user) */

                this.usuarioData = {
                    Email: user.email,
                    Uid: user.uid
                }

                Router.push('/')
            } catch (error) { 
                console.log(error.code)
                return error.code
            }
            finally {
                this.loadingUser = false
            }
        },

        async setUsuario(user) {
            try {
                const DocRef = doc(db, 'usuarios', user.uid)
                
                this.usuarioData = {
                    Email: user.email, 
                    Uid: user.uid, 
                    DisplayName: user.displayName, 
                    PhotoUrl: user.photoURL
                }
                
                await setDoc(DocRef, this.usuarioData)

                } catch (error) {
                    console.log(error)
                }
        },

        async LoguearUsuarios(Email, Password) {
            this.loadingUser = true

            try {
               const { user } = await signInWithEmailAndPassword( auth, Email, Password )
               //await signInWithEmailAndPassword( auth, Email, Password )

               await this.setUsuario(user)

                Router.push('/')
            } catch (error) {
              //  console.log(error.code)
                //return error.code
            }
            finally {
                this.loadingUser = false
            }
        },

        async LogOut () {
            const databaseStore = useDatabaseStore()
            databaseStore.$reset()
            
            try {
                Router.push('/Login')
                await signOut(auth)
                //this.usuarioData = null

            } catch (error) {
                console.log(error)
            }
        },

        async ActualizarImagen (Imagen) {
            try {
                console.log(Imagen)

                const storageRef = ref(storage, `${this.usuarioData.Uid}/Perfil`)
                await uploadBytes(storageRef, Imagen.originFileObj)
                const Photo = await getDownloadURL(storageRef)
                //console.log(Url)
                await updateProfile(auth.currentUser, {
                    photoURL : Photo  
                })

            } catch (error) {
                console.log(error)
                return error.code
            }
        },

        async ActualizarPerfil (displayName) {
            try {
                await updateProfile(auth.currentUser, {
                    displayName : displayName
                })
                this.setUsuario(auth.currentUser)
            } catch (error) {
                console.log(error.message)
                return error.message
            }
        },

        UsuarioActual() {
            return new Promise( (resolve, reject ) => {
                const unsuscribe = onAuthStateChanged(auth, async (user) => {
                    if (user) {

                        console.log(user)
                        //this.usuarioData = { Email: user.email, Uid: user.uid}

                        //await this.setUsuario(user)

                        this.usuarioData = {
                            Email: user.email, 
                            Uid: user.uid, 
                            DisplayName: user.displayName, 
                            PhotoUrl: user.photoURL
                        }

                    } else {
                        this.usuarioData = null
                        const databaseStore = useDatabaseStore()
                        databaseStore.$reset()
                    }
                    resolve(user)
                }, e => reject(e))
            })
            unsuscribe();
            
        }
    },
});