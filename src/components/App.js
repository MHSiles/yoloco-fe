import Document from "./Document";
import Wallet from "./Wallet";

const App = () => {

    return (
        <div>
            <div className="ui message">
                <h1 className="header" style={{marginLeft: "0px"}}>
                Crypto Portfolio Risk Calculator
                </h1>
            </div>
            <div className="ui grid">
                <div className="eight wide column">
                    <Wallet></Wallet>
                </div>
                <div className="eight wide column">
                    <Document></Document>
                </div>
            </div>
        </div>
    )

};

export default App;