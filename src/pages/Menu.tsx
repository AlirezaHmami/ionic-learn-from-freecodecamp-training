import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonMenu,
  IonRouterOutlet,
  IonItem,
  IonIcon,
  IonMenuToggle,
  IonSplitPane,
} from "@ionic/react";
import React from "react";
import { Redirect, Route } from "react-router";
import LIst from "./LIst";
import Settings from "./Setting";
import { home, logOut, settings } from "ionicons/icons";

const Menu: React.FC = () => {
  const paths = [
    { id: 1, name: "Home", url: "app/list", icon: home },
    { id: 2, name: "Settings", url: "app/settings", icon: settings },
  ];
  return (
    <IonPage>
       <IonSplitPane contentId="main" when='md'>
      <IonMenu contentId="main">
        <IonHeader>
          <IonToolbar color={"secondary"}>
            <IonTitle>Menu</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {paths.map((path) => (
            <IonMenuToggle key={path.id} autoHide={false}>
              <IonItem routerLink={path.url} routerDirection="none" detail={false}>
                {path.name}
                <IonIcon icon={path.icon} slot="end" />
              </IonItem>
            </IonMenuToggle>
          ))}
          <IonMenuToggle autoHide={false}>
              <IonItem routerLink='/' routerDirection="root" detail={false}>
                Log Out
                <IonIcon icon={logOut} slot="end" />
              </IonItem>
            </IonMenuToggle>
        </IonContent>
      </IonMenu>
      <IonRouterOutlet id="main">
        <Route exact path={"*/app/list"} component={LIst} />
        <Route exact path={"*/app/settings"} component={Settings} />
        <Route exact path={"*/app"}>
          <Redirect to={"*/app/list"} />
        </Route>
      </IonRouterOutlet>
      </IonSplitPane>
    </IonPage>
  );
};

export default Menu;
