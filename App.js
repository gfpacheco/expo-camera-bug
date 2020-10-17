import { Camera } from 'expo-camera';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';

export default function App() {
  const cameraRef = useRef();
  const [photo, setPhoto] = useState();
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  async function capture() {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({ exif: true });
      console.log(photo);
      setPhoto(photo);
    }
  }

  return (
    <View style={styles.flex}>
      <View style={styles.row}>
        <Camera ref={cameraRef} style={styles.flex} />
        <View style={styles.flex}>
          {photo && <Image style={styles.flex} source={{ uri: photo.uri }} />}
        </View>
      </View>
      <Button title="Capture" onPress={capture} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    height: '50%',
  },
  flex: {
    flex: 1,
  },
});
