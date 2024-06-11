import { BigInt } from "@graphprotocol/graph-ts";
import {
  VideoAdded as VideoAddedEvent,
  VideoTipped as VideoTippedEvent
} from "../generated/ThreeTube/ThreeTube";
import { Video, Tip, Channel } from "../generated/schema";

export function handleVideoAdded(event: VideoAddedEvent): void {
  let video = new Video(event.params.id.toString());
  let channel = Channel.load(event.params.owner.toHex());
  if (!channel) {
    channel = new Channel(event.params.owner.toHex()); // create a new channel with address as Id of the video owner
    channel.owner = event.params.owner;
    channel.createdAt = event.block.timestamp;
    channel.save();
  }
  video.title = event.params.title;
  video.description = event.params.description;
  video.category = event.params.category;
  video.location = event.params.location;
  video.thumbnailHash = event.params.thumbnailHash;
  video.videoHash = event.params.videoHash;
  video.channel = event.params.owner.toHex();
  video.tipAmount = BigInt.fromI32(0);
  video.createdAt = event.params.createdAt;
  video.save();
}

export function handleVideoTipped(event: VideoTippedEvent): void {
  let video = Video.load(event.params.videoId.toString());
  if (video) {
    video.tipAmount = video.tipAmount.plus(event.params.amount);
    video.save();
  }
  let tip = new Tip(
    event.params.videoId.toString() + "-" + event.params.id.toString()
  );
  tip.video = event.params.id.toString();
  tip.amount = event.params.amount;
  tip.from = event.params.from;
  tip.createdAt = event.block.timestamp;
  tip.save();
}
