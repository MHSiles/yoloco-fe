import React, {useState} from 'react';
import axios from 'axios';
import { downloadUrl, projectStorage } from '../services/firebase';
import { ref, uploadString } from "firebase/storage";
import Banner from './Banner';
import DownloadButton from './DownloadButton';


const Wallet = () => {

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
        const postData = {
            listOfWallets: listOfWallets
        }
        await axios.get(`https://yoloco-be.herokuapp.com/?walletId=${listOfWallets[0]}`, {postData}).then(res => {
            uploadFile(res, listOfWallets[0]); 
        }) 

        
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
                    <div className="field">
                        <label>Add a Wallet</label>
                        <input type="text" value={address} placeholder="Wallet Address" onChange={handleTextChange}></input>
                    </div>
                    <div className="ui black bottom attached button" tabIndex="0"  onClick={handleAdd}>Add</div>
                    <div className="ui orange bottom attached button" tabIndex="0"  onClick={btnHandler} style={{marginRight: "30%", marginLeft: "30%"}} >Link MetaMask</div>

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