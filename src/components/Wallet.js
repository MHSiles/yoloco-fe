import React, {useState} from 'react';
import axios from 'axios';
import { projectStorage } from '../services/firebase';
import { ref } from "firebase/storage";
import Banner from './Banner';
import DownLoadButton from './DownloadButton';


const Wallet = () => {

    const [address, setAddress] = useState('');
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

    const uploadFile = () => {
        // Create a reference to 'images/mountains.jpg'
        const storageRef = ref(projectStorage, 'pdf/mountains.jpg');

        // 'file' comes from the Blob or File API
        // uploadBytes(storageRef, file).then((snapshot) => {
        //     console.log('Uploaded a blob or file!');
        // });

    }

    const handleSubmit = async () => {
        console.log(address)
        console.log(listOfWallets)

        const postData = {
            listOfWallets: listOfWallets
        }
        await axios.get(`http://localhost:5000?walletId=${listOfWallets[0]}`, {postData}).then(res => {
            console.log(res);
            setSuccess(res.status === 200 ? true : false);
        }) 
    }

    return (
        <div className='ui grid'>
            <div className="sixteen wide column">
                <div className="ui form" style={{marginRight: "10%", marginLeft: "10%"}}>
                    <div className="field">
                        <label>Add a Wallet</label>
                        <input type="text" value={address} placeholder="Wallet Address" onChange={handleTextChange}></input>
                    </div>
                    <div className="ui black bottom attached button" tabIndex="0"  onClick={handleAdd}>Add</div>
                

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
                        ? <DownLoadButton url={"https://firebasestorage.googleapis.com/v0/b/yoloco-cbd6b.appspot.com/o/pdf%2FPortfolioAnalysisR3.pdf?alt=media&token=2a07ce0f-262f-4c62-9000-80d8648453e5"}></DownLoadButton>
                        : ''
                    }
            </div>
        </div>

    );

}

export default Wallet;