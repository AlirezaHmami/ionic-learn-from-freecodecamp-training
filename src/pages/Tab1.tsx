import { Camera , CameraResultType } from "@capacitor/camera";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonMenuButton,
  IonButton,
  IonImg,
} from "@ionic/react";
import React, { useState } from "react";

const Tab1: React.FC = () => {
  const [image, setImage] = useState("");
  const takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing:false,
      resultType: CameraResultType.Base64
    });
    const img = `data:image/jpeg;base64,${image.base64String}`;
    setImage(img);
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="success">
        <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Tab1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonButton expand="full" onClick={takePicture}>
          take a photo
        </IonButton>
        <IonImg src={image}></IonImg>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
