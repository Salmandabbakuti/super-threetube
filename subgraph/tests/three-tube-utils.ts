import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import { VideoAdded, VideoTipped } from "../generated/ThreeTube/ThreeTube"

export function createVideoAddedEvent(
  id: BigInt,
  title: string,
  description: string,
  category: string,
  location: string,
  thumbnailHash: string,
  videoHash: string,
  owner: Address,
  createdAt: BigInt
): VideoAdded {
  let videoAddedEvent = changetype<VideoAdded>(newMockEvent())

  videoAddedEvent.parameters = new Array()

  videoAddedEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  videoAddedEvent.parameters.push(
    new ethereum.EventParam("title", ethereum.Value.fromString(title))
  )
  videoAddedEvent.parameters.push(
    new ethereum.EventParam(
      "description",
      ethereum.Value.fromString(description)
    )
  )
  videoAddedEvent.parameters.push(
    new ethereum.EventParam("category", ethereum.Value.fromString(category))
  )
  videoAddedEvent.parameters.push(
    new ethereum.EventParam("location", ethereum.Value.fromString(location))
  )
  videoAddedEvent.parameters.push(
    new ethereum.EventParam(
      "thumbnailHash",
      ethereum.Value.fromString(thumbnailHash)
    )
  )
  videoAddedEvent.parameters.push(
    new ethereum.EventParam("videoHash", ethereum.Value.fromString(videoHash))
  )
  videoAddedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  videoAddedEvent.parameters.push(
    new ethereum.EventParam(
      "createdAt",
      ethereum.Value.fromUnsignedBigInt(createdAt)
    )
  )

  return videoAddedEvent
}

export function createVideoTippedEvent(
  id: BigInt,
  videoId: BigInt,
  amount: BigInt,
  from: Address
): VideoTipped {
  let videoTippedEvent = changetype<VideoTipped>(newMockEvent())

  videoTippedEvent.parameters = new Array()

  videoTippedEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  videoTippedEvent.parameters.push(
    new ethereum.EventParam(
      "videoId",
      ethereum.Value.fromUnsignedBigInt(videoId)
    )
  )
  videoTippedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  videoTippedEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )

  return videoTippedEvent
}
