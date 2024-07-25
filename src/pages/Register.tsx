import React from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonCard,
  IonCardTitle,
  IonIcon,
  IonInput,
  IonButtons,
  IonBackButton,
  useIonRouter,
  IonGrid,
  IonCol,
  IonRow,
} from "@ionic/react";
import { checkmarkDoneSharp } from "ionicons/icons";
const Register: React.FC = () => {
  const router = useIonRouter();
  const doRegister = (event: any) => {
    event.preventDefault();
    console.log(event);
    router.goBack();
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="success">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen scrollY={false}>
        {/* <IonHeader collapse="condense">
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/" />
            </IonButtons>
            <IonTitle size="large" color="success">
              Register
            </IonTitle>
          </IonToolbar>
        </IonHeader> */}
        <IonGrid fixed>
          <IonRow class="ion-justify-content-center">
            <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
              <IonCard className="ion-padding">
                <IonCardTitle>
                  <form onSubmit={doRegister}>
                    {/* email input */}
                    <IonInput
                      type="email"
                      label="Email"
                      labelPlacement="floating"
                      color="success"
                      clearInput
                      placeholder="example@mail.com"
                      fill="outline"
                    ></IonInput>
                    {/* password input */}
                    <IonInput
                      className="ion-margin-top "
                      type="password"
                      label="Password"
                      labelPlacement="floating"
                      color="success"
                      clearInput
                      placeholder="Enter a strong password"
                      fill="outline"
                    ></IonInput>
                    {/* create account btn */}
                    <IonButton
                      expand="block"
                      className="ion-margin-top"
                      color="tertiary"
                      type="submit"
                      routerLink="/register"
                    >
                      Create my account
                      <IonIcon icon={checkmarkDoneSharp} slot="end" />
                    </IonButton>
                  </form>
                </IonCardTitle>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};
export default Register;
