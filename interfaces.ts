export interface IScoreBoardDataDto {
  previousFrames: IFrame[];
}

export interface INewFrame {
  frame: IFrame;
  previousFrames: IFrame[];
}

export interface IFrame {
  frameNumber: number;
  points?: number;
  roll1: number;
  roll2: number;
  strike?: boolean;
  spare?: boolean;
}
