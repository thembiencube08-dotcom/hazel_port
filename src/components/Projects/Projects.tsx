import {  useRef } from 'react';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';
import { GitBranch, ExternalLink } from 'lucide-react';
import { scaleUpVariants } from '../../utils/motion';

const Section = styled.section`
  padding: 6rem 2rem;
  background: ${({ theme }) => theme.colors.backgroundSecondary};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding: 4rem 1.5rem;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
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
  color: ${({ theme }) => theme.colors.text};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled(motion.article)`
  background: ${({ theme }) => theme.colors.backgroundCard};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius['2xl']};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.card};
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.cardHover};
    border-color: ${({ theme }) => theme.colors.accent};
    transform: translateY(-6px);
  }
`;

const CardImage = styled.div`
  height: 200px;
  overflow: hidden;
  position: relative;
  background: ${({ theme }) => theme.colors.surface};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.5s ease;
  }

  ${Card}:hover & img {
    transform: scale(1.06);
  }
`;

const CardBody = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 0.875rem;
`;

const CardTitle = styled.h3`
  font-size: 1.15rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: -0.3px;
`;

const CardDesc = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.65;
  flex: 1;
`;

const TechTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
`;

const TechTag = styled.span`
  padding: 0.25rem 0.625rem;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.725rem;
  font-weight: 600;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const CardActions = styled.div`
  display: flex;
  gap: 0.75rem;
  padding-top: 0.25rem;
`;

const ActionBtn = styled.a<{ $variant?: 'primary' | 'ghost' }>`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
  font-weight: 600;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  transition: all 0.2s ease;
  border: 1.5px solid ${({ theme, $variant }) =>
    $variant === 'primary' ? theme.colors.accent : theme.colors.border};
  background: ${({ theme, $variant }) =>
    $variant === 'primary' ? theme.colors.accent : 'transparent'};
  color: ${({ theme, $variant }) =>
    $variant === 'primary' ? '#fff' : theme.colors.textSecondary};

  &:hover {
    background: ${({ theme, $variant }) =>
      $variant === 'primary' ? theme.colors.accentDark : theme.colors.surface};
    color: ${({ theme, $variant }) =>
      $variant === 'primary' ? '#fff' : theme.colors.text};
    border-color: ${({ theme, $variant }) =>
      $variant === 'primary' ? theme.colors.accentDark : theme.colors.text};
    transform: translateY(-1px);
  }
`;

const ViewAllWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3rem;
`;



const projects = [
  {
    title: 'Popees Ecommerce Baby Website',
    description: 'Kidverse an e-commerce marketplace for kids products, connecting customers, suppliers, and delivery partners.',
    tech: [  'Node.js', 'Supabase', 'Next.js'],
    image: '/images/pope.png',
    demo: 'https://kidversee-lbw5.vercel.app/',
    repo: 'https://github.com/thembiencube08-dotcom/kidversee.git',
  },
  {
    title: 'Nedbank Website',
    description: "A multi-page banking website clone built in React and TypeScript, recreating Nedbank Zimbabwe's site across Home, Personal, Business, About, and Contact pages. Features a custom theme system with a full color-token palette, a department contact grid with an accordion-based collapsible section, and a CSS Grid industry mosaic layout on the homepage.",
    tech: ['React', 'Vite', 'Styled Comp.'],
    image: '/images/nedbank.png',
    demo: 'https://nedbank-eta.vercel.app/',
    repo: 'https://github.com/thembiencube08-dotcom/Nedbank.git',
  },
  {
    title: 'Furniro Website',
    description: 'Furniro is a sleek, modern e-commerce platform crafted to deliver an intuitive and visually engaging shopping experience for high-end home decor and furniture. Designed with clean aesthetics and modern UX principles, the platform bridges functional online shopping with immersive room inspiration.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    image: '/images/project-furniro.png',
    demo: 'https://custom-furniture-two.vercel.app/',
    repo: 'https://github.com/thembiencube08-dotcom/custom-furniture.git',
  },
  {
    title: 'Dwello',
    description: 'Dwello is a modern real estate platform designed to simplify how users search, compare, and rent or buy properties. Built with an emphasis on clarity and user experience, Dwello transforms complex property data into an intuitive, visual discovery process for home seekers.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    image: '/images/project-dwello.png',
    demo: 'https://real-estate-iota-umber.vercel.app/',
    repo: 'https://github.com/thembiencube08-dotcom/Real-Estate.git',
  },
  {
    title: 'Student Dashboard',
    description: 'An all-in-one web portal designed to help students track grades, organize weekly schedules, manage course assignments, and monitor academic performance through intuitive data visualizations and real-time task management.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    image: '/images/dash.png',
    demo: 'https://student-dashboard-five-sigma.vercel.app/',
    repo: 'https://github.com/thembiencube08-dotcom/student-dashboard.git',
  },
  {
    title: 'Weather App',
    description: 'A responsive weather application providing real-time conditions, hourly forecasts, and air quality metrics. Features interactive location search, geolocation integration, dynamic condition-based themes, and clean data visualizations.',
    tech: ['OpenWeatherMap', 'HTML', 'CSS', 'JavaScript'],
    image: '/images/calc.png',
    demo: 'https://weather-app-five-pearl-89.vercel.app/',
    repo: 'https://github.com/thembiencube08-dotcom/weather-app.git',
  },
];

const cardVariants = scaleUpVariants(0.12, 0.5);

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  

  return (
    <Section id="projects">
      <Container>
        <Header ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <SectionLabel>My Work</SectionLabel>
            <Heading>Featured Projects</Heading>
          </motion.div>
        </Header>

        <Grid>
          {projects.map((project, i) => (
            <Card
              key={project.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              <CardImage>
                <img src={project.image} alt={project.title} />
              </CardImage>
              <CardBody>
                <CardTitle>{project.title}</CardTitle>
                <CardDesc>{project.description}</CardDesc>
                <TechTags>
                  {project.tech.map((t) => (
                    <TechTag key={t}>{t}</TechTag>
                  ))}
                </TechTags>
                <CardActions>
                  <ActionBtn href={project.demo} target="_blank" $variant="primary">
                    <ExternalLink size={12} />
                    Live Demo
                  </ActionBtn>
                  <ActionBtn href={project.repo} target="_blank">
                    <GitBranch size={12} />
                    GitHub
                  </ActionBtn>
                </CardActions>
              </CardBody>
            </Card>
          ))}
        </Grid>

        <ViewAllWrapper>
          
        </ViewAllWrapper>
      </Container>
    </Section>
  );
}