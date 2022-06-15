const Banner = props => {

    return (
        <div className="ui message" style={props.style}>
            <div className="content">
                <div className="header">{props.title}</div>
                <p>
                    {props.message}
                </p>
            </div>
        </div>
    );
};

export default Banner;