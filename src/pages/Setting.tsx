import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonMenuButton,
  IonTabBar,
  IonTabs,
  IonTabButton,
  IonRouterOutlet,
  IonIcon,
  IonLabel,
} from "@ionic/react";
import React from "react";
import { Redirect, Route } from "react-router";
import Tab1 from "./Tab1";
import Tab2 from "./Tab2";
import { atCircle, triangle } from "ionicons/icons";

const Settings: React.FC = () => {
  return (
    <IonTabs>
      <IonTabBar slot="bottom">
        <IonTabButton tab="tab1" href="*/app/settings/tab1">
          <IonIcon icon={triangle}/>
          <IonLabel>Tab1</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab2" href="*/app/settings/tab2">
        <IonIcon icon={atCircle}/>
          <IonLabel>Tab2</IonLabel>
        </IonTabButton>
      </IonTabBar>
      <IonRouterOutlet>
        <Route exact path={"*/app/settings/tab1"} component={Tab1} />
        <Route exact path={"*/app/settings/tab2"} component={Tab2} />
        <Route exact path={"*/app/settings"}>
          <Redirect to={"*/app/settings/tab1"} />
        </Route>
      </IonRouterOutlet>
    </IonTabs>
  );
};

export default Settings;

/*

<IonPage>
      <IonHeader>
        <IonToolbar color="success">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen scrollY={false}>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large" color="success">
              Settings
            </IonTitle>
          </IonToolbar>
        </IonHeader>
      </IonContent>
    </IonPage>

*/
