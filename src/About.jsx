import { useEffect } from 'react';
import Content from './Content';

const About = () => {
  useEffect(() => {
    document.title = "About | Heidi Slojewski";
  }, []);

  return (
    <Content
      title="Hi! I'm Heidi"
      projectPath="about"
      projectAmount={8}
    />
  );
};

export default About;
