import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonMenuButton,
  CreateAnimation,
  IonButton,
  useIonViewDidEnter,
  Gesture,
  createGesture,
  GestureDetail,
} from "@ionic/react";
import React, { useRef } from "react";

const Tab2: React.FC = () => {
  const animationRef = useRef<CreateAnimation>(null);
  const elementRef = useRef<HTMLDivElement>(null);
  useIonViewDidEnter(() => {
    animationRef.current?.animation.play();
    const gesture : Gesture = createGesture({
      el: elementRef.current!,
      gestureName: "my-gesture",
      threshold: 0,
      onMove: (ev) => {
        onMoveHandler(ev);
      },
      onEnd: (ev) => {
        onEndHandler(ev);
      },
      onStart: (ev) => {
        onStartHandler(ev);
      }
    })
    gesture.enable();
  });

  const onMoveHandler = (detail: GestureDetail) => {
    const x = detail.currentX - detail.startX;
    const y = detail.currentY - detail.startY;
    elementRef.current!.style.transform = `translate(${x}px, ${y}px)`;
  };

  const onEndHandler = (detail: GestureDetail) => {
    elementRef.current!.style.transition = `500ms ease-out`;
    elementRef.current!.style.transform = `translate(0px, 0px)`;
  };

  const onStartHandler = (detail: GestureDetail) => {
    elementRef.current!.style.transition = `none`;
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="success">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Tab2</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent class="ion-padding" scrollY={false} scrollX={false}>
        <CreateAnimation
          ref={animationRef}
          duration={1000}
          iterations={Infinity}
          delay={1000}
          keyframes={[
            { offset: 0, transform: "scale(1)", opacity: "1" },
            { offset: 0.5, transform: "scale(1.5)", opacity: "0.5" },
            { offset: 1, transform: "scale(1)", opacity: "1" },
          ]}
        >
          <IonButton
            expand="block"
            color="success"
            children="Click me"
            onClick={() => {
              animationRef.current?.animation.stop();
            }}
          />
        </CreateAnimation>
        <div className="ion-margin-top" ref={elementRef} style={{width: "50px", height: "50px", backgroundColor: "red"}}>
          ...
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
