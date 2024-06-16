import { Video, Channel, Tip } from "../types";
import {
  VideoAddedLog,
  VideoTippedLog
} from "../types/abi-interfaces/ThirdTube";
import assert from "assert";

export async function handleVideoAdded(log: VideoAddedLog): Promise<void> {
  assert(log.args, "No log.args");
  logger.info("Handling video added event");
  let channel = await Channel.get(log.args.owner);
  if (!channel) {
    channel = Channel.create({
      id: log.args.owner,
      owner: log.args.owner,
      createdAt: log.block.timestamp
    });
    await channel.save();
  }
  const video = Video.create({
    id: log.args.id.toString()!,
    title: log.args.title,
    description: log.args.description,
    category: log.args.category,
    location: log.args.location,
    thumbnailHash: log.args.thumbnailHash,
    videoHash: log.args.videoHash,
    channelId: log.args.owner,
    tipAmount: BigInt(0),
    createdAt: log.block.timestamp
  });
  await video.save();
}

export async function handleVideoTipped(log: VideoTippedLog): Promise<void> {
  assert(log.args, "No log.args");
  logger.info("Handling video tipped event");
  const video = await Video.get(log.args.videoId.toString());
  if (video) {
    video.tipAmount =
      BigInt(video.tipAmount.toString()) + BigInt(log.args.amount.toString());
    await video.save();
  }
  const tip = Tip.create({
    id: log.args.videoId.toString() + "-" + log.args.id.toString(),
    videoId: log.args.videoId.toString(),
    amount: BigInt(log.args.amount.toString()),
    from: log.args.from,
    createdAt: log.block.timestamp
  });
  await tip.save();
}
