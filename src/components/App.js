import React from 'react';
import { projectStorage } from '../services/firebase';
import { ref, getDownloadURL } from "firebase/storage";
import Error from './Error';

class App extends React.Component {

    state = { url: '', errorMessage: '' };

    downloadFile(){

        // Create a reference with an initial file path and name
        const pathReference = ref(projectStorage, 'pdf/examplePDF.pdf');  
        
        
        getDownloadURL(pathReference)
            .then((url) => {
                this.state.setState({ url: url });
                this.state.setState({ errorMessage: '' });
            })
            .catch((error) => {
                // A full list of error codes is available at
                switch (error.code) {
                case 'storage/object-not-found':
                    this.state.setState({ errorMessage: 'File does not exist'});
                    break;
                case 'storage/unauthorized':
                    this.state.setState({ errorMessage: 'User does not have permission to access the object'});
                    break;
                default:
                    this.state.setState({ errorMessage: 'Unknown error occurred, inspect the server response'});
                    break;
                }
            });

    }

    render() {
        return (
            <div class="ui grid">
                <div class="eight wide column"></div>
                <div class="eight wide column">
                    <div class="ui message">
                        <div class="header" style={{paddingBottom: "20px"}}>
                            <h1>
                                Download your document
                            </h1>
                        </div>
                        <div class="ui action input">
                            <input type="text" placeholder="Search..."></input>
                            <button class="ui primary button" onClick={this.downloadFile}>Download</button>
                        </div>
                    </div>
                    {this.state.errorMessage != '' ? <Error message={this.state.errorMessage}></Error> : ''}
                </div>
            </div>
        );
      }
}

export default App;