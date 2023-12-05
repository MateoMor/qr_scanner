import React from 'react'
import { View } from 'react-native'
import Button from './Button'

function ButtomBottomPad({image, saveImage, takePicture, setImage}) {
  return (
    <View>
        {image ? (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 50,
            }}
          >
            <Button
              title={"Retake picture"}
              icon={"retweet"}
              onPress={() => setImage(null)}
            />
            <Button title={"Save"} icon="check" onPress={saveImage} />
          </View>
        ) : (
          <Button
            title={"Take a picture"}
            icon={"camera" /*Icono del botón*/}
            onPress={takePicture}
          />
        )}
      </View>
  )
}

export default ButtomBottomPad