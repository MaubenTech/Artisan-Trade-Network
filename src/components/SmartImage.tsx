import * as _ from "lodash";
import React, { useEffect, useState } from "react";
import { Image, Animated, StyleSheet, View, Platform } from "react-native";
import { BlurView } from "expo-blur";
import * as FileSystem from "expo-file-system";
// import { BlurView, FileSystem } from "expo";
import SHA1 from "crypto-js/sha1";
import { StyleProp, ViewStyle } from "react-native";

interface SmartImageProps {
	style?: StyleProp<ViewStyle>;
	preview?: string;
	uri: string;
}

const propsToCopy = ["borderRadius", "borderBottomLeftRadius", "borderBottomRightRadius", "borderTopLeftRadius", "borderTopRightRadius"];

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

const SmartImage: React.FC<SmartImageProps> = ({ style, preview, uri }) => {
	const [currentUri, setCurrentUri] = useState<string>(uri);
	const [intensity] = useState(new Animated.Value(100));

	useEffect(() => {
		const fetchImage = async () => {
			const entry = await getCacheEntry(uri);
			if (!entry.exists) {
				if (preview) {
					setCurrentUri(preview);
				}
				if (uri.startsWith("file://")) {
					await FileSystem.copyAsync({ from: uri, to: entry.path });
				} else {
					await FileSystem.downloadAsync(uri, entry.path);
				}
			}
			setCurrentUri(entry.path);
		};

		fetchImage();
	}, [uri, preview]);

	const onLoadEnd = (uri: string) => {
		if (!uri.startsWith("data:")) {
			Animated.timing(intensity, {
				duration: 300,
				toValue: 0,
				useNativeDriver: Platform.OS === "ios",
			}).start();
		}
	};

	const computedStyle = [StyleSheet.absoluteFill, _.pickBy(StyleSheet.flatten(style), (_, key) => propsToCopy.includes(key))];

	return (
		<View style={style}>
			{currentUri && <Image source={{ uri: currentUri }} resizeMode="cover" style={computedStyle} onLoadEnd={() => onLoadEnd(currentUri)} />}
			{Platform.OS === "ios" && <AnimatedBlurView tint="default" style={computedStyle} intensity={intensity} />}
		</View>
	);
};

export default SmartImage;

const getCacheEntry = async (uri: string): Promise<{ exists: boolean; path: string }> => {
	const ext = uri.substring(uri.lastIndexOf("."), uri.includes("?") ? uri.indexOf("?") : undefined);
	const path = FileSystem.cacheDirectory + SHA1(uri) + ext;
	const info = await FileSystem.getInfoAsync(path);
	return { exists: info.exists, path };
};
