import './ExploreContainer.css';

interface ContainerProps { }

const ExploreContainer: React.FC<ContainerProps> = () => {
  return (
    <div id="container">
      <h1 style={{fontWeight:900,color:"teal"}}>Hello App!</h1>
    </div>
  );
};

export default ExploreContainer;
