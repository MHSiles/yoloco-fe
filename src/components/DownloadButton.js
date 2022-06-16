

const DownloadButton = props => {

    return (
        <a 
            className="ui primary button"
            href={props.url}
            target="_blank">
                <i className="download icon"></i>
                Download Risk Report
        </a>
    );
}

export default DownloadButton;