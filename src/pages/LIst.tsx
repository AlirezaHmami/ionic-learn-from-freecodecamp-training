import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonMenuButton,
  useIonViewWillEnter,
  IonButton,
  IonIcon,
  IonSearchbar,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonItem,
  IonLabel,
  IonAvatar,
  IonImg,
  IonChip,
  useIonAlert,
  useIonToast,
  IonRefresher,
  IonRefresherContent,
  IonSkeletonText,
  IonModal,
  IonFab,
  IonFabButton,
  IonSegment,
  IonSegmentButton,
  IonDatetime,
} from "@ionic/react";
import {
  add,
  chevronBack,
  trash,
} from "ionicons/icons";
import React, { useRef, useState } from "react";
import './List.css';

const LIst: React.FC = () => {
  const [users, setUsers] = useState<any[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showAlert] = useIonAlert();
  const [showToast] = useIonToast();
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const modal = useRef<HTMLIonModalElement>(null);
  const cardModal = useRef<HTMLIonModalElement>(null);
  const [isOPEN, setisOPEN] = useState(false);
  const [activeSegment, setActiveSegment] = useState<any>("details");

  useIonViewWillEnter(() => {
    getUsers();
  });

  const getUsers = async () => {
    setLoading(true); // Set loading to true before fetch
    setError(null); // Clear any previous errors

    try {
      const data = await fetch("https://randomuser.me/api?results=10");
      const usersdata = await data.json();
      setUsers(usersdata.results); // Access results array from response
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to load users. Please try again.");
    } finally {
      setLoading(false); // Set loading to false after fetch (success or error)
    }
  };

  const refreshHandler = async (event: any) => {
    await getUsers();
    event.detail.complete();
  };

  const clearListHandler = () => {
    showAlert({
      header: "Confrim to clear list",
      message: "Are you sure you want to clear the list?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
        },
        {
          text: "Confirm",
          role: "confirm",
          handler: () => {
            setUsers([]);
            showToast({
              message: "List cleared successfully",
              duration: 2000,
              position: "bottom",
              color: "secondary",
              buttons: [{ text: "close", role: "cancel" }],
            });
          },
        },
      ],
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="success">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonButtons
            slot="end"
            class="ion-padding-end"
            onClick={clearListHandler}
          >
            <IonIcon slot="icon-only" icon={trash} />
          </IonButtons>
          <IonTitle>List</IonTitle>
        </IonToolbar>
        <IonToolbar color="success">
          <IonSearchbar />
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={refreshHandler}>
          <IonRefresherContent />
        </IonRefresher>
        {/* Display loading indicator */}
        {loading &&
          [...Array(10)].map((_, index) => (
            <IonCard key={index}>
              <IonCardContent className="ion-none-padding">
                <IonItem lines="none">
                  <IonAvatar slot="start">
                    <IonSkeletonText />
                  </IonAvatar>
                  <IonLabel>
                    <IonSkeletonText animated style={{ width: "150px" }} />
                    <p>
                      <IonSkeletonText />
                    </p>
                  </IonLabel>
                  <IonChip slot="end" color="medium">
                    <IonSkeletonText />
                  </IonChip>
                </IonItem>
              </IonCardContent>
            </IonCard>
          ))}
        {/* end Display loading indicator */}
        {/* Display error message */}
        {error && <div className="error">{error}</div>}
        {/* end Display error message */}
        {users && (
          <>
            {/* Your code to display users goes here */}
            {users.map((user, index) => (
              <IonCard key={index} onClick={() => setSelectedUser(user)}>
                <IonCardHeader>Item {index} </IonCardHeader>
                <IonCardContent className="ion-none-padding">
                  <IonItem lines="none">
                    <IonAvatar slot="start">
                      <IonImg src={user.picture.thumbnail} />
                    </IonAvatar>
                    <IonLabel>
                      <h1>
                        {user.name.first} {user.name.last}
                      </h1>
                      <p>{user.email}</p>
                    </IonLabel>
                    <IonChip slot="end" color="medium">
                      {user.nat}
                    </IonChip>
                  </IonItem>
                </IonCardContent>
              </IonCard>
            ))}
          </>
        )}
      </IonContent>
      <IonModal
        ref={modal}
        isOpen={!!selectedUser}
        breakpoints={[0, 0.5, 0.85]}
        initialBreakpoint={0.85}
        onDidDismiss={() => setSelectedUser(null)}
      >
        <IonHeader>
          <IonToolbar color="medium">
            <IonButtons slot="start">
              <IonButton
                slot="start"
                onClick={() => {
                  setSelectedUser(null);
                  modal.current?.dismiss();
                }}
              >
                <IonIcon slot="icon-only" icon={chevronBack} />
              </IonButton>
              <IonTitle>
                {selectedUser?.name.first} {selectedUser?.name.last}
              </IonTitle>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonToolbar color="light">
          <IonSegment
            value={activeSegment.value}
            onIonChange={(e) => setActiveSegment(e.detail.value)}
          >
            <IonSegmentButton value="details">
              <IonLabel>Details</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="calendar">
              <IonLabel>Calendar</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
        <IonContent>
          {activeSegment === "details" ? (
            <h1>
              {selectedUser?.name.first} {selectedUser?.name.last}
            </h1>
          ) : (
            <h1>
              <IonDatetime />
            </h1>
          )}
        </IonContent>
      </IonModal>

      <IonModal
        ref={cardModal}
        isOpen={isOPEN}
        breakpoints={[0, 0.5, 0.85]}
        initialBreakpoint={0.85}
        onDidDismiss={() => setisOPEN(false)}
      >
        <IonHeader>
          <IonToolbar color="danger">
            <IonButtons slot="start">
              <IonButton
                slot="start"
                onClick={() => {
                  setisOPEN(false);
                  modal.current?.dismiss();
                }}
              >
                <IonIcon slot="icon-only" icon={chevronBack} />
              </IonButton>
              <IonTitle>Card Modal</IonTitle>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>SHEEET!</IonContent>
      </IonModal>

      <IonFab
        vertical="bottom"
        horizontal="end"
        slot="fixed"
        onClick={() => setisOPEN(true)}
      >
        <IonFabButton color="success">
          <IonIcon icon={add} />
        </IonFabButton>
      </IonFab>
    </IonPage>
  );
};

export default LIst;
