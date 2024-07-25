import { IonPage, IonContent, IonIcon, IonButton, IonText } from "@ionic/react";
import React from "react";
import { ContainerProps } from "../Types/types";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Intro.css";

const SwiperButtonNext = ({ children,className }: any) => {
  const swiper = useSwiper();
  return <IonButton color="dark" className={className} onClick={() => swiper.slideNext()}>{children}</IonButton>;
};

const SwiperButtonPrev = ({ children,className }: any) => {
  const swiper = useSwiper();
  return <IonButton color="dark" className={className} onClick={() => swiper.slidePrev()}>{children}</IonButton>;
};

const Intro: React.FC<ContainerProps> = ({onFinish}) => {
  return (
    <IonPage>
      <IonContent>
        <Swiper>
          <SwiperSlide>
            <IonText color='danger'>Slide one</IonText>
            <SwiperButtonNext className='next'> → </SwiperButtonNext>
          </SwiperSlide>
          <SwiperSlide>
            <SwiperButtonPrev className='prev'> ← </SwiperButtonPrev>
            <IonText color='warning'>Slide Two</IonText>
            <SwiperButtonNext className='next'> → </SwiperButtonNext>
          </SwiperSlide>
          <SwiperSlide>
            <SwiperButtonPrev className='prev'> ← </SwiperButtonPrev>
            <IonText color='secondary'>Slide Three</IonText>
            <IonButton className="finishBtn" onClick={onFinish} color='success' children='Finish'/>
          </SwiperSlide>
        </Swiper>
      </IonContent>
    </IonPage>
  );
};

export default Intro;
