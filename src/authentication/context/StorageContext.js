import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { storage, db, auth } from "../config/firebase.js";
import {
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import {
  doc,
  setDoc,
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { v4 } from "uuid";

const StorageContext = createContext();

export function StorageContextProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [galleryImageList, setGalleryImageList] = useState([]);
  const [aboutImage, setAboutImage] = useState(null);
  const [aboutText, setAboutText] = useState("");
  const galleryImageListRef = ref(storage, "images/gallery/");
  const aboutImageRef = ref(storage, "images/about/");
  const aboutTextRef = collection(db, "text");

  // Wrap functions inside the useMemo callback to prevent unnecessary re-renders
  const contextValue = useMemo(() => {
    // Function to upload image file to Firebase Storage for the gallery section
    const uploadGalleryImage = (imageUpload) => {
      if (imageUpload === null) return;
      const imageRef = ref(
        storage,
        `images/gallery/${imageUpload.name + v4()}`
      );
      return uploadBytes(imageRef, imageUpload)
        .then(() => {
          setUploadSuccess(true); // Set success state to true when uploaded
          // Reset uploadSuccess after 3 seconds
          setTimeout(() => {
            setUploadSuccess(false);
          }, 3000); // Adjust the duration as needed
        })
        .catch((error) => {
          console.log("Error uploading image:", error);
        });
    };

    // Function to delete a gallery section image file from Firebase Storage
    const deleteGalleryImage = async (imageUrl) => {
      if (imageUrl === null) return;
      try {
        // Find the reference to the image in Firebase Storage
        const imageRef = ref(storage, decodeURIComponent(imageUrl));

        // Delete the image from Firebase Storage
        await deleteObject(imageRef);

        setGalleryImageList((prevList) =>
          prevList.filter((url) => url !== imageUrl)
        );
      } catch (error) {
        console.error("Error deleting image:", error);
      }
    };

    // Function to upload an image file to Firebase Storage for the about section profile image
    // Bug to fix, I need to ensure that there's only one image file is stored in the about folder by removing the current file inside that folder and then uploading the new image file
    const uploadAboutImage = (imageUpload) => {
      if (imageUpload === null) return;
      const imageRef = ref(storage, `images/about/${imageUpload.name + v4()}`);
      return uploadBytes(imageRef, imageUpload)
        .then(() => {
          setUploadSuccess(true); // Set success state to true when uploaded
          // Reset uploadSuccess after 3 seconds
          setTimeout(() => {
            setUploadSuccess(false);
          }, 3000); // Adjust the duration as needed
        })
        .catch((error) => {
          console.log("Error uploading image:", error);
        });
    };

    // Function to delete an about section image file from Firebase Storage
    const deleteAboutImage = async (imageUrl) => {
      if (imageUrl === null) return;
      try {
        // Find the reference to the image in Firebase Storage
        const imageRef = ref(storage, decodeURIComponent(imageUrl));

        // Delete the image from Firebase Storage
        await deleteObject(imageRef);

        setAboutImage(null);
      } catch (error) {
        console.error("Error deleting image:", error);
      }
    };

    const updateAboutText = async (newAboutText) => {
      try {
        const currentUser = auth.currentUser;
        const textRef = doc(db, "text", currentUser.uid);
        await setDoc(textRef, { about: newAboutText });
      } catch (error) {
        console.log("Error updating about text:", error);
      }
    };

    return {
      isLoading,
      galleryImageList,
      aboutImage,
      uploadSuccess,
      aboutText,
      setAboutText,
      uploadGalleryImage,
      deleteGalleryImage,
      uploadAboutImage,
      deleteAboutImage,
      updateAboutText,
    };
  }, [galleryImageList, aboutImage, uploadSuccess, aboutText, isLoading]);

  // useEffect that renders the image file urls from Firebase Storage and stores it in array state variables called galleryImageList and aboutImage when there is a page refresh
  useEffect(() => {
    setIsLoading(true);
    // Retrieves and stores the image file urls using the galleryImageListRef and stores them into galleryImageList
    listAll(galleryImageListRef).then((response) => {
      const imagePromises = response.items.map((item) => getDownloadURL(item));
      Promise.all(imagePromises)
        .then((urls) => {
          setGalleryImageList(urls);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log("Error fetching image URLs:", error);
          setIsLoading(false);
        });
    });
    // Retrieves and stores the image file urls using the aboutImageRef and stores them into aboutImage
    // This should return only one image file for the about
    listAll(aboutImageRef)
      .then((response) => {
        const imagePromises = response.items.map((item) =>
          getDownloadURL(item)
        );
        Promise.all(imagePromises).then((url) => {
          setAboutImage(url);
          setIsLoading(false);
        });
      })
      .catch((error) => {
        console.log("Error fetching image URLs:", error);
        setIsLoading(false);
      });
  }, []);

  // useEffect that renders the image file urls from Firebase Storage and stores it in array state variables called galleryImageList and aboutImage when there is a successful image file upload
  useEffect(() => {
    setIsLoading(true);
    // Retrieves and stores the image file urls using the galleryImageListRef and stores them into galleryImageList
    listAll(galleryImageListRef).then((response) => {
      const imagePromises = response.items.map((item) => getDownloadURL(item));
      Promise.all(imagePromises)
        .then((urls) => {
          setGalleryImageList(urls);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log("Error fetching image URLs:", error);
          setIsLoading(false);
        });
    });
    // Retrieves and stores the image file urls using the aboutImageRef and stores them into aboutImage
    // This should return only one image file for the about
    listAll(aboutImageRef).then((response) => {
      const imagePromises = response.items.map((item) => getDownloadURL(item));
      Promise.all(imagePromises)
        .then((url) => {
          setAboutImage(url);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log("Error fetching image URLs:", error);
          setIsLoading(false);
        });
    });
    setIsLoading(false);
  }, [uploadSuccess]);

  // Function to listen for real-time updates of the about text
  const listenAboutText = (callback) => {
    // Retrieve the user's ID from Firebase Authentication
    const userId = auth.currentUser ? auth.currentUser.uid : null;

    if (!userId) {
      // Handle the case where the user is not authenticated
      return () => {}; // Return an empty unsubscribe function
    }

    const aboutTextQuery = query(aboutTextRef, where("userId", "==", userId));

    const unsubscribe = onSnapshot(aboutTextQuery, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added" || change.type === "modified") {
          // Handle added or modified document
          const aboutTextData = change.doc.data().about;
          callback(aboutTextData);
        }
        // You can also handle 'removed' if needed
      });
    });

    // Return the unsubscribe function to clean up the listener
    return unsubscribe;
  };

  // useEffect to listen to changes and update aboutText using listenAboutText method
  useEffect(() => {
    // Subscribe to updates and provide the callback function
    const unsubscribe = listenAboutText((newAboutText) => {
      // Update the aboutText state within the context
      setAboutText(newAboutText);
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  const readAboutText = async () => {
    try {
      const querySnapShot = await getDocs(collection(db, "text"));
      querySnapShot.forEach((doc) => {
        setAboutText(doc.data().about);
      });
      setIsLoading(false);
    } catch (error) {
      console.log("Error reading about text:", error);
      setIsLoading(false);
    }
  };

  // useEffect to fetch initial aboutText when the context is first created
  useEffect(() => {
    setIsLoading(true);
    readAboutText();
  }, []);

  return (
    <StorageContext.Provider value={contextValue}>
      {children}
    </StorageContext.Provider>
  );
}

export function useStorage() {
  return useContext(StorageContext);
}
