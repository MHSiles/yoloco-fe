import React, {useState} from 'react';
import axios from 'axios';
import { downloadUrl, projectStorage } from '../services/firebase';
import { ref, uploadString } from "firebase/storage";
import Banner from './Banner';
import DownloadButton from './DownloadButton';
const { REACT_APP_ENV } = process.env;


const Wallet = () => {

    const apiUrl = REACT_APP_ENV === 'prod'
        ? 'https://yoloco-be.herokuapp.com/'
        : 'http://localhost:5000';

    const [address, setAddress] = useState('');
    const [url, setUrl] = useState('');
    const [listOfWallets, setListOfWallets] = useState([]);
    const [success, setSuccess] = useState(false);

    const handleTextChange = (e) => {
        setAddress(e.target.value)
    }
    
    const handleAdd = () => {
        if (address !== ""){
            setListOfWallets([...listOfWallets, address]);
            setAddress('');
        }
    }

    const uploadFile = async (response, fileName) => {

        const mountainImagesRef = ref(projectStorage, `pdf/${fileName}.pdf`);

        uploadString(mountainImagesRef, response.data, 'base64').then((snapshot) => {
            downloadUrl(fileName)
                .then((documentUrl) => {
                    setUrl(documentUrl);
                    setSuccess(true);
                })
        });

    }

    const handleSubmit = async () => {

        let bodyFormData = new FormData();

        bodyFormData.append('listOfWallets', listOfWallets);

        const code = Math.floor(Math.random() * 1000)

        axios({
            method: "post",
            url: apiUrl,
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" },
          })
            .then(function (res) {
              //handle success
              uploadFile(res, `report-${code}`);
            })
            .catch(err => {
              //handle error
              console.log(err);
            });
        
    }

    const accountChangeHandler = (account) => {
        // Setting an address data
        console.log(account);
        setListOfWallets([...listOfWallets, account]);
    };

    const btnHandler = () => { // for metamask button
        // Asking if metamask is already present or not
        if (window.ethereum) {
          // res[0] for fetching a first wallet
          window.ethereum
            .request({ method: "eth_requestAccounts" })
            .then((res) => accountChangeHandler(res[0]));
        } else {
          alert("install metamask extension!!");
        }
      };

    return (
        <div className='ui grid'>
            <div className="sixteen wide column">
                <div className="ui form" style={{marginRight: "10%", marginLeft: "10%"}}>
                    <h3>Add your wallets</h3>
                    <div className='ui grid'>
                        <div className="eight wide column">
                            <div className="field">
                                <input type="text" value={address} placeholder="Wallet Address" onChange={handleTextChange}></input>
                            </div>
                        </div>
                        <div className="eight wide column">
                            <div className="ui black bottom attached button" tabIndex="0"  onClick={handleAdd}>Add</div>
                        </div>
                    </div>
                    <div className='ui grid'>
                        <div className="sixteen wide column">
                            <div className="ui orange bottom attached button" tabIndex="0"  onClick={btnHandler}>Link MetaMask</div>
                        </div>
                    </div>

                    <div class="ui divider"></div>
                    <div class="ui divider"></div>

                    <h3>Generate your report</h3>
                    <table className="ui table">
                        <thead>
                            <tr>
                                <th>Wallets</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listOfWallets.map((wallet,i) => {
                                return (
                                    <tr key={"wallet-" + i}>
                                        <td>{wallet}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <div className="ui green bottom attached button" tabIndex="0" onClick={handleSubmit}>Submit</div>
                </div>
                {success
                        ? <Banner title={'Success'} message={'The report is ready for download.'} style={{color: "rgb(50,200,50)", backgroundColor: "rgb(200,256,200)"}}></Banner>
                        : ''
                    }
                {success
                        ? <DownloadButton url={url}></DownloadButton>
                        : ''
                    }
                
            </div>
        </div>

    );

}

export default Wallet;