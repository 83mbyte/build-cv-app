import { getStorage, ref, listAll, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { app } from '../__firebase/firebaseConf';

export const storageAPI = {

    //upload
    uploadImageFile: (user, file, ext) => {
        const storage = getStorage(app);
        const imageRef = ref(storage, `users/${user}/user${ext}`);

        return uploadBytes(imageRef, file)
            .then((snapshot) => {
                console.log('uploaded..');
                return getDownloadURL(imageRef)
                    .then((url) => {
                        console.log('URL: ', url);
                        return { url, ext }
                    })
            })
    },

    //get 
    getImageFile: (user) => {
        const storage = getStorage(app);
        const userStorageRef = ref(storage, `users/${user.userId}`);

        return listAll(userStorageRef)
            .then((resp) => {
                if (resp.items && resp.items[0]) {
                    const path = resp.items[0]._location.path_;
                    return path
                }
                else { return null }

            })
            .then(async (path) => {
                if (path) {
                    const fileRef = ref(storage, path);
                    return getDownloadURL(fileRef)
                        .then(url => {
                            let ext = (path).match(/(?=.)+(.png|.jpg|.jpeg)$/g)[0];
                            return { url, ext }
                        }).catch(err => err)
                }
            })
            .catch((error) => {
                // Uh-oh, an error occurred!
                console.log('got error: ', error)
                return error
            });
    },

    //delete file
    deleteImageFile: (user, ext) => {

        const storage = getStorage(app);
        const userImageRef = ref(storage, `users/${user.userId}/user${ext}`);

        return deleteObject(userImageRef)
            .then(() => {
                return 'success'
            })
            .catch((error) => {
                // Uh-oh, an error occurred!
                return error.message
            });
    },
}