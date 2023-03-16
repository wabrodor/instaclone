import { useRecoilState } from "recoil";
import { modalState } from "@/atoms/modalAtom";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef, useState } from "react";
import { AiFillCamera } from "react-icons/ai";
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
  doc,
} from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { db, storage } from "../Firebase";
import styles from "@/styles/Modal.module.css";


export default function Modal({data}) {


  const [open, setOpen] = useRecoilState(modalState);
  const filePickerRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const captionRef = useRef(null);

  // function for reading image
  const addImage = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  // function for uploading image

  const uploadPost = async () => {
    if (loading) return;

    setLoading(true);

    const docRef = await addDoc(collection(db, "posts"), {
      userImg:data?.user.image,
      username: data?.user.name,
      caption: captionRef.current.value,
      timestamp: serverTimestamp(),
    });

    const imageRef = ref(storage, `posts/${docRef.id}/image`);
    await uploadString(imageRef, selectedFile, "data_url").then(
      async (snapshot) => {
        const DownloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "posts", docRef.id), {
          image: DownloadURL,
        });
      }
    );
    setOpen(false);
    setLoading(false);
    setSelectedFile(null);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className={styles.modal} onClose={setOpen}>
        <div className={styles.card}>
          <input
            type="file"
            accept="image/png, image/jpeg"
            hidden
            ref={filePickerRef}
            onChange={addImage}
          />

          <Transition.Child
            as={Fragment}
            enter="case-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className={styles.wrapper}>
              <div className={styles.content}>
                {selectedFile ? (
                  <img
                    className={styles.image}
                    src={selectedFile}
                    onClick={() => setSelectedFile(null)}
                  />
                ) : (
                  <>
                    <div
                      className={styles.icon}
                      onClick={() => filePickerRef?.current.click()}
                    >
                      <AiFillCamera />
                    </div>
                    <h2>Upload a photo</h2>
                  </>
                )}
              </div>

              <div className={styles.caption}>
                <input
                  type="text"
                  placeholder=" add your caption..."
                  ref={captionRef}
                />
              </div>
              <button
                className={styles.btn}
                disabled={!selectedFile}
                onClick={() => {
                  uploadPost();
                }}
              >
                {loading ? "uploading..." : "upload post"}
              </button>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
