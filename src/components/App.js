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
import axios from 'axios';

class App extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            address : '',
            listOfWallets: [],
        }

        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
    }

    handleTextChange(e){
        this.setState({address : e.target.value})
    }
    handleAdd = () => {
        if (this.state.address != ""){
            this.setState({listOfWallets: [...this.state.listOfWallets, this.state.address]})
            //document.getElementById("text-input").reset();
            this.setState({address: ""})
            console.log(this.state.address)
            console.log(this.state.listOfWallets)
        }
        
        //reset text field

    }

    handleSubmit = () => {
        console.log(this.state.address)
        console.log(this.state.listOfWallets)

        const postData = {
            listOfWallets: this.state.listOfWallets
        }
        axios.post('https://jsonplaceholder.typicode.com/posts', {postData}).then(res => {
            console.log(res)
            console.log(res.data)
        }) 
    }

    getSubmitState(){
        return this.state.submitDisabled
    }

    render() {
        return (
            <div>
                <div className="ui message">
                    <h1 className="header" style={{marginLeft: "80px"}}>
                    Crypto Portfolio Risk Calculator
                    </h1>
                </div>

                <div className="ui form" style={{marginRight: "700px", marginLeft: "100px"}}>
                    <div class="field">
                        <label>Add a Wallet</label>
                        <input type="text" placeholder="Wallet Address" onChange={this.handleTextChange}></input>
                    </div>
                    <div class="ui black bottom attached button" tabindex="0"  onClick={this.handleAdd}>Add</div>
                

                    <table class="ui table">
                        <thead>
                            <tr>
                                <th>Wallets</th>
                            </tr>
                        </thead>
                        <tbody>

                            {this.state.listOfWallets.map((wallet,i) => {
                                return (
                                    <tr key={"wallet-" + i}>
                                        <input
                                        // type="text"
                                        value={wallet}
                                    />
                                    </tr>
                                );
                            })}

                        </tbody>
                    </table>
                    <div class="ui green bottom attached button" tabindex="0" onClick={this.handleSubmit}>Submit</div>

                </div>
                
            </div>

        );
      }
}

export default App;