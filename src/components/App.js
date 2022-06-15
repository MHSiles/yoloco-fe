import Document from "./Document";

const App = () => {

    return (
        <div class="ui grid">
            <div class="eight wide column"></div>
            <div class="eight wide column">
                <Document></Document>
            </div>
        </div>
    )

import React from 'react';
import React, {useState} from 'react';
import axios from 'axios';


const App = () => {

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
        <div>
            <div className="ui message">
                <h1 className="header" style={{marginLeft: "0px"}}>
                Crypto Portfolio Risk Calculator
                </h1>
            </div>

            <div className="ui form" style={{marginRight: "40%", marginLeft: "10%"}}>
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

    );

}

export default App;