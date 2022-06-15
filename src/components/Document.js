import React, {useState} from 'react';
import { projectStorage } from '../services/firebase';
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import Error from './Error';
import DownLoadButton from './DownloadButton';

const Document = () => {
    const [document, setDocument] = useState('');
    const [url, setUrl] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const onInputChange = event => {
        setDocument(event.target.value);
    };

    const uploadFile = () => {
        // Create a reference to 'images/mountains.jpg'
        const storageRef = ref(projectStorage, 'pdf/mountains.jpg');

        // 'file' comes from the Blob or File API
        // uploadBytes(storageRef, file).then((snapshot) => {
        //     console.log('Uploaded a blob or file!');
        // });


    }

    const downloadFile = () => {
        // Create a reference with an initial file path and name
        const pathReference = ref(projectStorage, `pdf/${document}.pdf`);  


        setDocument('');
        
        
        getDownloadURL(pathReference)
            .then((documentUrl) => {
                setUrl(documentUrl);
                setErrorMessage('');
            })
            .catch((error) => {
                // A full list of error codes is available at
                switch (error.code) {
                case 'storage/object-not-found':
                    setErrorMessage('File does not exist');
                    break;
                case 'storage/unauthorized':
                    setErrorMessage('User does not have permission to access the object');
                    break;
                default:
                    setErrorMessage('Unknown error occurred, inspect the server response');
                    break;
                }
            });
    }

    return (
        <div>
            <div class="ui message">
                <div class="header" style={{paddingBottom: "20px"}}>
                    <h1>
                        Download your document
                    </h1>
                </div>
                <div class="ui action input">
                    <input
                        type="text"
                        value={document}
                        onChange={onInputChange}
                        placeholder="Search...">
    
                    </input>
                    <button class="ui primary button" onClick={downloadFile}>Download</button>
                </div>
            </div>
            { url === '' && errorMessage === ''
                ? ''
                : <>
                    {errorMessage !== ''
                        ? <Error message={errorMessage}></Error>
                        : <DownLoadButton url={url}></DownLoadButton>
                    }
                </>
            }
        </div>
    )
}

export default Document;