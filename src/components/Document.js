import React, {useState} from 'react';
import { projectStorage, downloadUrl } from '../services/firebase';
import Banner from './Banner';
import DownloadButton from './DownloadButton';

const Document = () => {
    const [document, setDocument] = useState('');
    const [url, setUrl] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const onInputChange = event => {
        setDocument(event.target.value);
    };

    const downloadFile = () => {
        
        downloadUrl(document)
            .then((documentUrl) => {
                setUrl(documentUrl);
                setDocument('');
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
            <div className="header" style={{paddingBottom: "20px"}}>
                <h1>
                    Download your document
                </h1>
            </div>
            <div className="ui action input">
                <input
                    type="text"
                    value={document}
                    onChange={onInputChange}
                    placeholder="Search...">

                </input>
                <button className="ui primary button" onClick={downloadFile}>Download</button>
            </div>
            { url === '' && errorMessage === ''
                ? ''
                : <>
                    {errorMessage !== ''
                        ? <Banner title={'Error'} message={errorMessage} style={{color: "rgb(200,50,50)", backgroundColor: "rgb(256,200,200)"}}></Banner>
                        : <DownloadButton url={url}></DownloadButton>
                    }
                </>
            }
        </div>
    )
}

export default Document;