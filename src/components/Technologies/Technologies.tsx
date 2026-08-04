import styled, { keyframes } from 'styled-components';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  FaReact,
  FaJs,
  FaNodeJs,
  FaGitAlt,
  FaGithub,
  FaFigma,
} from 'react-icons/fa';
import {
  SiTypescript,
  SiStyledcomponents,
  SiFirebase,
  SiSupabase,
  SiNextdotjs,
} from 'react-icons/si';

const Section = styled.section`
  padding: 5rem 0;
  background: ${({ theme }) => theme.colors.background};
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding: 4rem 0;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  padding: 0 2rem;
`;

const SectionLabel = styled.p`
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: 0.75rem;
`;

const Heading = styled.h2`
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  font-weight: 800;
  letter-spacing: -1px;
  color: ${({ theme }) => theme.colors.text};
`;

/* --- marquee --- */

const marquee = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
`;

const MarqueeViewport = styled.div`
  width: 100%;
  overflow: hidden;
  -webkit-mask-image: linear-gradient(
    to right,
    transparent 0,
    #000 5%,
    #000 95%,
    transparent 100%
  );
  mask-image: linear-gradient(
    to right,
    transparent 0,
    #000 5%,
    #000 95%,
    transparent 100%
  );
`;

const MarqueeTrack = styled.div<{ $duration: number }>`
  display: flex;
  width: max-content;
  gap: 3rem;
  animation: ${marquee} ${({ $duration }) => $duration}s linear infinite;

  &:hover {
    animation-play-state: paused;
  }
`;

const TechItem = styled.div`
  flex: 0 0 auto;
  width: 90px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.625rem;
  cursor: default;
`;

const TechIcon = styled.div<{ $color: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.25rem;
  color: ${({ $color }) => $color};
  transition: transform 0.25s ease;

  ${TechItem}:hover & {
    transform: translateY(-6px) scale(1.1);
  }
`;

const TechName = styled.span`
  font-size: 0.78rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  line-height: 1.3;
`;

const technologies = [
  { name: 'React', icon: <FaReact />, color: '#61DAFB' },
  { name: 'Next.js', icon: <SiNextdotjs />, color: '#000000' },
  { name: 'TypeScript', icon: <SiTypescript />, color: '#3178C6' },
  { name: 'JavaScript', icon: <FaJs />, color: '#F7DF1E' },
  { name: 'Node.js', icon: <FaNodeJs />, color: '#339933' },
  { name: 'Styled Comp.', icon: <SiStyledcomponents />, color: '#DB7093' },
  { name: 'Git', icon: <FaGitAlt />, color: '#F05032' },
  { name: 'GitHub', icon: <FaGithub />, color: '#181717' },
  { name: 'Figma', icon: <FaFigma />, color: '#F24E1E' },
  { name: 'Firebase', icon: <SiFirebase />, color: '#FFCA28' },
  { name: 'Supabase', icon: <SiSupabase />, color: '#3ECF8E' },
];

// duplicate the list so the loop is seamless (translateX(-50%) lands exactly
// on the start of the second copy)
const loopedTechnologies = [...technologies, ...technologies];

export default function Technologies() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <Section>
      <Header>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          ref={ref}
        >
          <SectionLabel>Tech Stack</SectionLabel>
          <Heading>Technologies I Work With</Heading>
        </motion.div>
      </Header>

      <MarqueeViewport>
        <MarqueeTrack $duration={25}>
          {loopedTechnologies.map((tech, i) => (
            <TechItem key={`${tech.name}-${i}`}>
              <TechIcon $color={tech.color}>{tech.icon}</TechIcon>
              <TechName>{tech.name}</TechName>
            </TechItem>
          ))}
        </MarqueeTrack>
      </MarqueeViewport>
    </Section>
  );
}