// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

contract ThirdTube {
    uint256 public currentVideoId;
    uint256 public currentTipId;

    struct Video {
        uint256 id;
        string title;
        string description;
        string category;
        string location;
        string thumbnailHash;
        string videoHash;
        address owner;
        uint256 tipAmount;
        uint256 createdAt;
    }

    struct Tip {
        uint256 id;
        uint256 videoId;
        uint256 amount;
        address from;
    }

    mapping(uint256 => Video) public videos;
    mapping(uint256 => mapping(uint256 => Tip)) public tips;

    event VideoAdded(
        uint256 id,
        string title,
        string description,
        string category,
        string location,
        string thumbnailHash,
        string videoHash,
        address owner,
        uint256 createdAt
    );

    event VideoTipped(
        uint256 id,
        uint256 videoId,
        uint256 amount,
        address from
    );

    function addVideo(
        string memory _title,
        string memory _description,
        string memory _category,
        string memory _location,
        string memory _thumbnailHash,
        string memory _videoHash
    ) external {
        require(bytes(_videoHash).length > 0, "Video hash cannot be empty");
        require(
            bytes(_thumbnailHash).length > 0,
            "Thumbnail hash cannot be empty"
        );
        require(bytes(_title).length > 0, "Title cannot be empty");
        videos[currentVideoId] = Video(
            currentVideoId,
            _title,
            _description,
            _category,
            _location,
            _thumbnailHash,
            _videoHash,
            msg.sender,
            0,
            block.timestamp
        );
        emit VideoAdded(
            currentVideoId,
            _title,
            _description,
            _category,
            _location,
            _thumbnailHash,
            _videoHash,
            msg.sender,
            block.timestamp
        );
        currentVideoId++;
    }

    function tipVideo(uint256 _videoId, uint256 _amount) external payable {
        address videoOwner = videos[_videoId].owner;
        require(videoOwner != address(0), "Video does not exist");
        require(videoOwner != msg.sender, "You cannot tip your own video");
        require(_amount > 0, "Tip amount must be greater than 0");
        require(msg.value == _amount, "Tip amount must match value");
        videos[_videoId].tipAmount += _amount;
        tips[_videoId][currentTipId] = Tip(
            currentTipId,
            _videoId,
            _amount,
            msg.sender
        );
        payable(videoOwner).transfer(_amount);
        emit VideoTipped(currentTipId, _videoId, _amount, msg.sender);
        currentTipId++;
    }
}
