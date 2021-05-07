import React from "react";
import { Image, View } from "react-native";

const Filter = ({
  face: {
    bounds: {
      size: { width: faceWidth, height: faceHeight }
    },
    leftEyePosition,
    rightEyePosition,
    noseBasePosition
  },
  source
}) => {
  const glassesWidth = faceWidth * 3.5;
  const glassesHeight = faceHeight * 0.65;

  const transformAngle = (
    angleRad = Math.atan(
      (rightEyePosition.y - leftEyePosition.y) /
        (rightEyePosition.x - leftEyePosition.x)
    )
  ) => (angleRad * 180) / Math.PI;

  return (
    <View
      style={{
        position: "absolute",
        left: leftEyePosition.x - glassesWidth * 0.45,
        right: rightEyePosition.x - glassesWidth * 0.45,
        top: noseBasePosition.y - glassesHeight * 1.5
      }}
    >
      <Image
        source={source}
        style={{
          width: glassesWidth,
          height: glassesHeight,
          resizeMode: "contain",
          transform: [{ rotate: `${transformAngle()}deg` }]
        }}
      />
    </View>
  );
};

export default Filter;
