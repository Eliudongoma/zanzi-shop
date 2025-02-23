import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import { storage } from "../config/firebaseConfig";
import { Box, Button, Progress } from "@chakra-ui/react";
import imageCompression from "browser-image-compression";

interface Props {
  onUpload: (url: string) => void;
  id?: string;
}

const ImagePicker = ({ onUpload, id }: Props) => {
  const [image, setImage] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);

  const handleUpload = async () => {
    if (!image) return;

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 800,
      useWebWorker: true,
    };
    try {
      const compressedImage = await imageCompression(image, options);
      const storageRef = ref(
        storage,
        `images/${encodeURIComponent(image.name)}`
      );
      const uploadTask = uploadBytesResumable(storageRef, compressedImage);

      const unsubscribe = uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = snapshot.bytesTransferred / snapshot.totalBytes;
          setProgress(progress);
        },
        (error) => {
          console.error(error);
          setProgress(0);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            onUpload(downloadURL);
            setImage(null);
            setProgress(0);
          } catch (error) {
            console.error("Failed to get download URL", error);
          }
        }
      );
      return () => unsubscribe();
    } catch (error) {
      console.error("Image compression failed",error);
      setProgress(0);
    }
  };
  return (
    <div>
      <input
        type="file"
        accept="image/*"
        id={id}
        // style={{ display: "none" }}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if(file){
            setImage(file);
            setProgress(0);
          }
        }}
      />
      <Button onClick={handleUpload} disabled={!image || progress > 0}>
        {progress  > 0 ? 'Uploading...': 'Upload'}
      </Button>
      {progress > 0 && (
        <Box width="100%">
          <Progress.Root 
            value={progress} 
            size="sm" 
            colorScheme="blue"
            borderRadius="full"
            mb={2}  // Add margin bottom for spacing
          />
          <Box textAlign="center" fontSize="sm" color="gray.600">
            {progress.toFixed(1)}%
          </Box>
        </Box>
      )}
    </div>
  );
};

export default ImagePicker;
