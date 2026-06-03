import { Animated, StyleSheet, View } from "react-native";
import { useEffect, useRef } from "react";

import { colors } from "../styles/theme";

const nodes = [
  { left: "8%", top: "16%", size: 7 },
  { left: "28%", top: "10%", size: 4 },
  { left: "58%", top: "18%", size: 6 },
  { left: "84%", top: "12%", size: 5 },
  { left: "18%", top: "38%", size: 5 },
  { left: "46%", top: "34%", size: 8 },
  { left: "76%", top: "42%", size: 5 },
  { left: "10%", top: "68%", size: 6 },
  { left: "38%", top: "74%", size: 4 },
  { left: "68%", top: "70%", size: 7 },
  { left: "90%", top: "82%", size: 4 }
];

const links = [
  { left: "10%", top: "20%", width: "24%", rotate: "-15deg" },
  { left: "32%", top: "17%", width: "30%", rotate: "12deg" },
  { left: "60%", top: "20%", width: "28%", rotate: "-10deg" },
  { left: "18%", top: "42%", width: "30%", rotate: "-6deg" },
  { left: "48%", top: "39%", width: "30%", rotate: "14deg" },
  { left: "12%", top: "70%", width: "30%", rotate: "10deg" },
  { left: "40%", top: "73%", width: "32%", rotate: "-7deg" },
  { left: "70%", top: "76%", width: "24%", rotate: "18deg" },
  { left: "28%", top: "25%", width: "35%", rotate: "64deg" },
  { left: "62%", top: "24%", width: "35%", rotate: "74deg" }
];

const pulses = [
  { left: "12%", top: "20%", delay: 0 },
  { left: "45%", top: "34%", delay: 450 },
  { left: "72%", top: "41%", delay: 900 },
  { left: "34%", top: "73%", delay: 1200 }
];

export default function NeuralBackground() {
  const drift = useRef(new Animated.Value(0)).current;
  const pulseValues = useRef(pulses.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(drift, {
          duration: 4200,
          toValue: 1,
          useNativeDriver: true
        }),
        Animated.timing(drift, {
          duration: 4200,
          toValue: 0,
          useNativeDriver: true
        })
      ])
    ).start();

    pulseValues.forEach((value, index) => {
      Animated.loop(
        Animated.sequence([
          Animated.delay(pulses[index].delay),
          Animated.timing(value, {
            duration: 1700,
            toValue: 1,
            useNativeDriver: true
          }),
          Animated.timing(value, {
            duration: 0,
            toValue: 0,
            useNativeDriver: true
          })
        ])
      ).start();
    });
  }, [drift, pulseValues]);

  const translateY = drift.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 18]
  });

  const translateX = drift.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -10]
  });

  return (
    <View pointerEvents="none" style={styles.background}>
      <Animated.View style={[styles.network, { transform: [{ translateX }, { translateY }] }]}>
        {links.map((link, index) => (
          <View
            key={`link-${index}`}
            style={[
              styles.link,
              {
                left: link.left,
                top: link.top,
                transform: [{ rotate: link.rotate }],
                width: link.width
              }
            ]}
          />
        ))}
        {nodes.map((node, index) => (
          <View
            key={`node-${index}`}
            style={[
              styles.node,
              {
                height: node.size,
                left: node.left,
                top: node.top,
                width: node.size
              }
            ]}
          />
        ))}
        {pulses.map((pulse, index) => {
          const scale = pulseValues[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0.4, 2.8]
          });
          const opacity = pulseValues[index].interpolate({
            inputRange: [0, 0.35, 1],
            outputRange: [0, 0.4, 0]
          });

          return (
            <Animated.View
              key={`pulse-${index}`}
              style={[
                styles.pulse,
                {
                  left: pulse.left,
                  opacity,
                  top: pulse.top,
                  transform: [{ scale }]
                }
              ]}
            />
          );
        })}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.background,
    overflow: "hidden"
  },
  link: {
    backgroundColor: colors.primary,
    height: 1,
    opacity: 0.18,
    position: "absolute",
    transformOrigin: "left center"
  },
  network: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.95
  },
  node: {
    backgroundColor: colors.primarySoft,
    borderColor: colors.primary,
    borderRadius: 999,
    borderWidth: 1,
    opacity: 0.72,
    position: "absolute"
  },
  pulse: {
    backgroundColor: colors.primary,
    borderRadius: 22,
    height: 44,
    marginLeft: -22,
    marginTop: -22,
    position: "absolute",
    width: 44
  }
});
