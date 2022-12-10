import React from "react";
import {
    FacebookIcon,
    FacebookShareButton,
    TwitterShareButton,
    TwitterIcon,
    TumblrShareButton,
    TumblrIcon,
    PinterestShareButton,
    PinterestIcon,
} from "react-share";
import ModalWrap from "../../wrappers/ModalWrap";
import "./ShareList.scss";
const ShareList = () => {
    const shareUrl = "https://cinephilia-ig.netlify.app/filmlists";
    return (
        <div className="sharelist">
            <FacebookShareButton url={shareUrl}>
                <FacebookIcon round={true} className="icon" />
            </FacebookShareButton>
            <TwitterShareButton url={shareUrl}>
                <TwitterIcon round={true} className="icon" />
            </TwitterShareButton>
            <TumblrShareButton url={shareUrl}>
                <TumblrIcon round={true} className="icon" />
            </TumblrShareButton>
            <PinterestShareButton url={shareUrl}>
                <PinterestIcon round={true} className="icon" />
            </PinterestShareButton>
        </div>
    );
};

export default ModalWrap(ShareList, "Share List");
