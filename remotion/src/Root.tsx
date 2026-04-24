import { Composition } from "remotion";
import { FocobotDemo } from "./FocobotDemo";

export const RemotionRoot = () => {
  return (
    <Composition
      id="FocobotDemo"
      component={FocobotDemo}
      durationInFrames={450}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
