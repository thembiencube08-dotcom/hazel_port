import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { fadeUpVariants } from '../../utils/motion';

const Section = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

/* ─── Shared panel scaffolding ─── */
const Panel = styled.div`
  padding: 5rem 4rem;
  display: flex;
  flex-direction: column;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding: 4rem 2rem;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 3.5rem 1.5rem;
  }
`;

const LightPanel = styled(Panel)`
  background: ${({ theme }) => theme.colors.backgroundSecondary};
`;

const DarkPanel = styled(Panel)`
  background: #14161a;
`;

const TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2.5rem;
`;

const Eyebrow = styled.p<{ $inverted?: boolean }>`
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: ${({ $inverted }) => ($inverted ? 'rgba(255,255,255,0.55)' : '#2563EB')};
`;



const Heading = styled.h2<{ $inverted?: boolean }>`
  font-size: clamp(2.5rem, 6vw, 4.25rem);
  font-weight: 800;
  line-height: 1;
  letter-spacing: -1px;
  color: ${({ $inverted, theme }) => ($inverted ? '#fff' : theme.colors.text)};
  margin-bottom: 1.75rem;
`;



/* ─── Left panel: about text ─── */
const Bio = styled.p`
  font-size: 1rem;
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 1.25rem;
  max-width: 480px;
`;

/* ─── Right panel: strengths list ─── */
const StrengthList = styled.div`
  display: flex;
  flex-direction: column;
`;

const StrengthItem = styled(motion.div)`
  padding: 1.5rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.12);

  &:last-child {
    border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  }
`;

const StrengthTitle = styled.h3`
  font-size: 1.0625rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.375rem;
`;

const StrengthDesc = styled.p`
  font-size: 0.9rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.6);
  max-width: 420px;
`;

const strengths = [
  {
    title: 'Frontend Development',
    desc: 'Building responsive, accessible interfaces with React and TypeScript.',
  },
  {
    title: 'UI Engineering',
    desc: 'Crafting polished, reusable component systems with styled-components.',
  },
  {
    title: 'Backend & APIs',
    desc: 'Building Node.js and Express services with clean REST APIs.',
  },
  {
    title: 'Database Design',
    desc: 'Structuring and querying data with SQL and Supabase.',
  },
];

const fadeUp = fadeUpVariants(0.08, 0.5);

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <Section id="about" ref={ref}>
      <LightPanel
        as={motion.div}
        initial={{ opacity: 0, x: -30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <TopRow>
          <Eyebrow>About</Eyebrow>
         
        </TopRow>

        <Heading>About Me</Heading>
        

        <Bio>
          Hi! I'm Thembelihle, a junior full-stack developer focused on building clean,
          fast, and accessible web applications.
        </Bio>
        <Bio>
          I enjoy building modern interfaces, designing component systems, and connecting
          front-end experiences to solid back-end logic. My work spans React, TypeScript,
          Node.js, and SQL-based databases.
        </Bio>
        <Bio>
          I'm always improving my skills, exploring new tools, and building projects that
          help me grow as a developer.
        </Bio>
      </LightPanel>

      <DarkPanel
        as={motion.div}
        initial={{ opacity: 0, x: 30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
      >
        <TopRow>
          

        </TopRow>

        <Heading $inverted>Core Skills</Heading>
        

        <StrengthList>
          {strengths.map((s, i) => (
            <StrengthItem
              key={s.title}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              <StrengthTitle>{s.title}</StrengthTitle>
              <StrengthDesc>{s.desc}</StrengthDesc>
            </StrengthItem>
          ))}
        </StrengthList>
      </DarkPanel>
    </Section>
  );
}