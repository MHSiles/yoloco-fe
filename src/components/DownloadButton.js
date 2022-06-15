

const DownLoadButton = props => {

    return (
        <a 
            class="ui primary button"
            href={props.url}
            target="_blank">
                <i class="download icon"></i>
                Download Risk Report
        </a>
    );
}

export default DownLoadButton;