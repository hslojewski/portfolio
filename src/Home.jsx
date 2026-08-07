import { useEffect } from 'react';
import Content from './Content';

const Home = () => {
  useEffect(() => {
    document.title = "Heidi Slojewski | Web Developer & Product Manager";
  }, []);

  return (
    <Content
      projectPath="home"
      title="Heidi Slojewski"
      titleAlignment="center"
    />
  );
};

export default Home;
