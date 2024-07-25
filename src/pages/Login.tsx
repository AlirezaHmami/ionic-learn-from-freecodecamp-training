import React, { useEffect, useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardTitle,
  IonInput,
  IonButton,
  IonIcon,
  useIonRouter,
  useIonLoading,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import { logIn, personCircle } from "ionicons/icons";
import "./Login.css";
import reactIcon from "../assets/react.svg";
import Intro from "../components/Intro";
import { Preferences } from "@capacitor/preferences";

const INTRO_KEY = "intro-seen";

const Login: React.FC = () => {
  const [introSeen, setIntroSeen] = useState<boolean>(false);
  useEffect(() => {
    const checkStorage = async () => {
      const seen = await Preferences.get({ key: INTRO_KEY });
      setIntroSeen(seen.value === "true");
    };
    checkStorage();
  }, []);
  const router = useIonRouter();
  const [present, dismiss] = useIonLoading();

  const doLogin = async (event: any) => {
    event.preventDefault();
    await present("loading...", 0, "circular");
    setTimeout(() => {
      dismiss();
      router.push("/app", "root");
    }, 2000);
  };
  const finishIntro = async () => {
    setIntroSeen(true);
    Preferences.set({ key: INTRO_KEY, value: "true" });
  };
  return (
    <>
      {!introSeen ? (
        <Intro onFinish={finishIntro} />
      ) : (
        <IonPage>
          <IonHeader>
            <IonToolbar color="success">
              <IonTitle>Login</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent fullscreen scrollY={false}>
            <IonHeader collapse="condense">
              <IonToolbar>
                <IonTitle size="large" color="success">
                  Login
                </IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonGrid fixed>
              <IonRow class="ion-justify-content-center">
                <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
                  <div className="ion-text-center">
                    <img
                      src={reactIcon}
                      alt="logo"
                      width={"50%"}
                      className="ion-margin-top"
                    />
                  </div>
                </IonCol>
              </IonRow>
              <IonRow class="ion-justify-content-center">
                <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
                  <IonCard className="ion-padding">
                    <IonCardTitle>
                      <form onSubmit={doLogin}>
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
                          className="ion-margin-top"
                          type="password"
                          label="Password"
                          labelPlacement="floating"
                          color="success"
                          clearInput
                          placeholder="Enter a strong password"
                          fill="outline"
                        ></IonInput>
                        {/* submit btn */}
                        <IonButton
                          expand="block"
                          className="ion-margin-top"
                          color="success"
                          type="submit"
                        >
                          Login
                          <IonIcon icon={logIn} slot="end" />
                        </IonButton>
                        {/* create account btn */}
                        <IonButton
                          expand="block"
                          className="ion-margin-top"
                          color="tertiary"
                          type="button"
                          routerLink="/register"
                        >
                          Create an account
                          <IonIcon icon={personCircle} slot="end" />
                        </IonButton>
                      </form>
                    </IonCardTitle>
                  </IonCard>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonContent>
        </IonPage>
      )}
    </>
  );
};
export default Login;
