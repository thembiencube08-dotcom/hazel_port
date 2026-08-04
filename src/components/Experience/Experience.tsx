import { useRef } from 'react';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';
import { Users, Award } from 'lucide-react';
import { fadeLeftVariants } from '../../utils/motion';

const Section = styled.section`
  padding: 6rem 2rem;
  background: #14161a;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding: 4rem 1.5rem;
  }
`;

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;
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
  font-size: clamp(1.875rem, 3.5vw, 2.75rem);
  font-weight: 800;
  letter-spacing: -1px;
  color: #fff;
`;

const Timeline = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const TimelineItem = styled(motion.div)`
  display: flex;
  gap: 1.75rem;
  padding-bottom: 2.5rem;
  position: relative;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: 1.25rem;
  }

  &:last-child {
    padding-bottom: 0;
  }

  /* Connector line: starts at the bottom edge of this item's icon,
     ends at the top edge of the next item's icon. Skips the last item. */
  &:not(:last-child)::after {
    content: '';
    position: absolute;
    left: 28px;
    top: 58px;
    bottom: 0;
    width: 2px;
    background: linear-gradient(
      to bottom,
      ${({ theme }) => theme.colors.accent},
      rgba(255, 255, 255, 0.15)
    );

    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
      left: 20px;
      top: 42px;
    }
  }

  /* Trailing tail below the last icon, fading out to suggest continuation */
  &:last-child::after {
    content: '';
    position: absolute;
    left: 28px;
    top: 58px;
    height: 48px;
    width: 2px;
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.15),
      transparent
    );

    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
      left: 20px;
      top: 42px;
    }
  }
`;

const IconWrapper = styled.div<{ $color: string }>`
  width: 58px;
  height: 58px;
  min-width: 58px;
  border-radius: 50%;
  background: ${({ $color }) => $color}25;
  border: 2px solid ${({ $color }) => $color}60;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ $color }) => $color};
  z-index: 1;
  transition: all 0.2s ease;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 42px;
    height: 42px;
    min-width: 42px;
  }
`;

const Card = styled.div`
  flex: 1;
  background: ${({ theme }) => theme.colors.backgroundCard};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius['2xl']};
  padding: 1.5rem;
  box-shadow: ${({ theme }) => theme.shadows.card};
  transition: all 0.25s ease;
  margin-top: 0.25rem;

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: ${({ theme }) => theme.shadows.cardHover};
    transform: translateY(-3px);
  }
`;

const CardTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.625rem;
  flex-wrap: wrap;
`;

const RoleTitle = styled.h3`
  font-size: 1.05rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

const Period = styled.span`
  font-size: 0.775rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.accent};
  background: ${({ theme }) => theme.colors.accentLight};
  padding: 0.25rem 0.75rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  white-space: nowrap;
`;

const OrgName = styled.p`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 0.625rem;
`;

const Description = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.65;
`;

const SkillChips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
  margin-top: 0.875rem;
`;

const Chip = styled.span`
  padding: 0.2rem 0.6rem;
  font-size: 0.725rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.full};
`;

const experiences = [
  {
    icon: Award,
    color: '#6C63FF',
    role: 'Certifications',
    org: 'FreeCodeCamp / Coursera',
    period: '2026',
    desc: 'Completed certifications in FreeCodeCamp and a Python crash course.',
    chips: ['Python', 'HTML', 'CSS'],
  },
  {
    icon: Users,
    color: '#EC4899',
    role: 'Volunteer Coding Instructor',
    org: 'Uncommon',
    period: '2026',
    desc: 'Teaching Scratch to children from the local community as part of a volunteer initiative under Uncommon. Introducing beginners to programming logic and computational thinking through hands-on, visual coding.',
    chips: ['Scratch', 'Mentorship'],
  },
];

const itemVariants = fadeLeftVariants(0.12, 0.5);

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <Section id="experience">
      <Container>
        <Header ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <SectionLabel>My Journey</SectionLabel>
            <Heading>Experience & Milestones</Heading>
          </motion.div>
        </Header>

        <Timeline>
          {experiences.map((exp, i) => (
            <TimelineItem
              key={exp.role}
              custom={i}
              variants={itemVariants}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              <IconWrapper $color={exp.color}>
                <exp.icon size={22} />
              </IconWrapper>
              <Card>
                <CardTop>
                  <RoleTitle>{exp.role}</RoleTitle>
                  <Period>{exp.period}</Period>
                </CardTop>
                <OrgName>{exp.org}</OrgName>
                <Description>{exp.desc}</Description>
                <SkillChips>
                  {exp.chips.map((c) => <Chip key={c}>{c}</Chip>)}
                </SkillChips>
              </Card>
            </TimelineItem>
          ))}
        </Timeline>
      </Container>
    </Section>
  );
}