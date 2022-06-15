import React, {useState} from 'react';
import axios from 'axios';
import { projectStorage } from '../services/firebase';
import { ref } from "firebase/storage";


const Wallet = () => {

    const [address, setAddress] = useState('');
    const [listOfWallets, setListOfWallets] = useState([]);

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

    const handleSubmit = () => {
        console.log(address)
        console.log(listOfWallets)

        const postData = {
            listOfWallets: listOfWallets
        }
        axios.post('https://jsonplaceholder.typicode.com/posts', {postData}).then(res => {
            console.log(res)
            console.log(res.data)
        }) 
    }

    return (
        <div className='ui grid'>
            <div class="sixteen wide column">
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
            </div>
        </div>

    );

}

export default Wallet;