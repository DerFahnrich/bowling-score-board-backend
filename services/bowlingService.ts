import { INewFrame, IFrame, IScoreBoardDataDto } from "../interfaces";

export const calculate = (newFrame: INewFrame): IScoreBoardDataDto => {
  const previousFrames = newFrame.previousFrames;

  if (previousFrames.length > 0) {
    const currentFrame = newFrame.frame;
    const previousFrame = previousFrames.pop()!;

    if (previousFrame.strike || previousFrame.spare) {
      const updatedPreviousFrame = calculatePreviousFrame(previousFrame, currentFrame);

      previousFrames.push(updatedPreviousFrame);
      return calculateFrame(newFrame);
    }

    previousFrames.push(previousFrame);
  }

  return calculateFrame(newFrame);
};

export const calculateFrame = (newFrame: INewFrame): IScoreBoardDataDto => {
  const roll1 = newFrame.frame.roll1;
  const roll2 = newFrame.frame.roll2;
  const previousFrames = newFrame.previousFrames;
  const frame = newFrame.frame;
  const accumulatedPoints = previousFrames[previousFrames.length - 1]?.points;

  if (roll1 === 10) {
    frame.strike = true;
    frame.points = accumulatedPoints;
    previousFrames.push(frame);
    return { previousFrames };
  }

  if (roll1 + roll2 === 10) {
    frame.spare = true;
    frame.points = accumulatedPoints;
    previousFrames.push(frame);
    return { previousFrames };
  }

  frame.points = accumulatedPoints
    ? accumulatedPoints + roll1 + roll2
    : roll1 + roll2;
  previousFrames.push(frame);

  return { previousFrames };
};

export const calculatePreviousFrame = (previousFrame: IFrame, currentFrame: IFrame): IFrame => {
  let points = previousFrame.points ? previousFrame.points : 0;

  if (previousFrame.strike) {
    if (currentFrame.spare) {
      points! += 20;
      return { ...previousFrame, points };
    }

    points! += 10 + currentFrame.roll1 + currentFrame.roll2;
    return { ...previousFrame, points };
  }

  // If not strike, then the previousFrame is a spare. Since this method only gets invoked in those cases.
  if (currentFrame.strike) {
    points! += 20;
    return { ...previousFrame, points };
  }

  points! += 10 + currentFrame.roll1;
  return { ...previousFrame, points };
};
