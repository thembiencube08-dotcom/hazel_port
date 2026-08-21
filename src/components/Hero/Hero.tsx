import { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, ArrowUpRight, X } from 'lucide-react';
import { containerVariants, itemVariants } from '../../utils/motion';
import profileImg from '../../assets/kpp_optimized.png';

/* ─── Outer shell ─── */
const Section = styled.section`
  height: 100dvh;
  min-height: 600px;
  background: ${({ theme }) => theme.colors.background};
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  align-items: stretch;
`;

/* Rotating side label */
const SideLabel = styled.div`
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  position: absolute;
  left: 1.5rem;
  top: 50%;
  translate: 0 -50%;
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
  display: flex;
  align-items: center;
  gap: 0.75rem;
  user-select: none;

  &::before {
    content: '';
    display: block;
    width: 1px;
    height: 40px;
    background: ${({ theme }) => theme.colors.border};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) { display: none; }
`;

/* Main content grid */
const Grid = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  width: 100%;
  padding: clamp(5.5rem, 12vh, 7rem) 2.5rem clamp(2rem, 6vh, 4rem) 5rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(1.5rem, 4vh, 3rem);
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    padding: clamp(5.5rem, 12vh, 7rem) 1.5rem clamp(2rem, 6vh, 4rem);
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: clamp(5rem, 10vh, 6rem) 1.5rem clamp(1.5rem, 5vh, 3rem);
  }
`;

const Left = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: clamp(0.875rem, 2vh, 1.375rem);
`;

const Greeting = styled.p`
  font-size: 1.0625rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const HeroName = styled.h1`
  font-size: clamp(2.5rem, 5vw + 1vh, 5.25rem);
  font-weight: 800;
  line-height: 1.0;
  letter-spacing: -2.5px;
  color: ${({ theme }) => theme.colors.text};

  .accent { color: ${({ theme }) => theme.colors.accent}; }
`;

const Role = styled.p`
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`;



const Bio = styled.p`
  font-size: 0.9375rem;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 420px;
`;

const BtnRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.875rem;
  flex-wrap: wrap;
`;

const PrimaryBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.625rem;
  background: ${({ theme }) => theme.colors.accent};
  color: #fff;
  font-size: 0.875rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all 0.22s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.accentDark};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.accent};
  }
  svg { transition: transform 0.18s ease; }
  &:hover svg { transform: translateY(-2px); }
`;

const GhostBtn = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.75rem 1.25rem;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.875rem;
  font-weight: 600;
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all 0.22s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.accent};
  }
`;

/* ─── CV Modal ─── */
const Backdrop = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(4px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
`;

const ModalBox = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius['3xl']};
  box-shadow: 0 25px 80px rgba(0,0,0,0.5);
  max-width: 680px;
  width: 100%;
  max-height: 90dvh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const ModalTitle = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

const CloseBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textMuted};
  display: flex;
  align-items: center;
  padding: 0.25rem;
  border-radius: 50%;
  transition: color 0.18s ease, background 0.18s ease;
  &:hover { color: ${({ theme }) => theme.colors.text}; background: ${({ theme }) => theme.colors.border}; }
`;

const ModalBody = styled.div`
  overflow-y: auto;
  flex: 1;
  padding: 1.5rem;
  display: flex;
  justify-content: center;
`;

const CVImage = styled.img`
  width: 100%;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: 0 4px 20px rgba(0,0,0,0.2);
  object-fit: contain;
`;

const ModalFooter = styled.div`
  padding: 1rem 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: flex-end;
`;

const DownloadBtn = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: ${({ theme }) => theme.colors.accent};
  color: #fff;
  font-size: 0.875rem;
  font-weight: 600;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all 0.22s ease;
  text-decoration: none;
  &:hover {
    background: ${({ theme }) => theme.colors.accentDark};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.accent};
  }
`;

/* Right hero image area */
const Right = styled(motion.div)`
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  height: 100%;
  max-height: 70dvh;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) { display: none; }
`;

const HeroImgBg = styled.div`
  position: absolute;
  top: 5%;
  left: 50%;
  translate: -50% 0;
  width: 70%;
  height: 85%;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.accentGreenLight};
  z-index: 0;
`;

const HeroImgFrame = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 460px;
  height: 100%;
  aspect-ratio: 3/4;
  border-radius: ${({ theme }) => theme.borderRadius['3xl']};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.surface};
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

/* Actual profile image */
const HeroImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  display: block;
`;

const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
  e.preventDefault();
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
};

const CV_IMAGE = '/images/Thembelihle_Ncube-CV.png';

export default function Hero() {
  const [cvOpen, setCvOpen] = useState(false);

  return (
    <>
      <Section id="home">
        <SideLabel>Coding Tomorrow. Today.</SideLabel>

        <Grid>
          <Left variants={containerVariants} initial="hidden" animate="visible">
            <motion.div variants={itemVariants} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <Greeting>Hello, I'm</Greeting>
              <HeroName>
                THEMBELIHLE<br />
                <span className="accent">Ncube</span>
              </HeroName>
              <Role>Full Stack Developer</Role>
            </motion.div>

            <Bio as={motion.p} variants={itemVariants}>
              Software Developer passionate about creating fast, responsive, and accessible web applications. I combine clean code with thoughtful design to build digital experiences that solve real-world problems.
            </Bio>

            <BtnRow as={motion.div} variants={itemVariants}>
              <PrimaryBtn onClick={() => setCvOpen(true)}>
                Download CV <Download size={15} />
              </PrimaryBtn>
              <GhostBtn href="#about" onClick={(e) => go(e, '#about')}>
                About Me <ArrowUpRight size={14} />
              </GhostBtn>
            </BtnRow>
          </Left>

          <Right
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <HeroImgBg />
            <HeroImgFrame>
              <HeroImg src={profileImg} alt="Thembelihle Ncube" />
            </HeroImgFrame>
          </Right>
        </Grid>
      </Section>

      {/* CV Preview Modal */}
      <AnimatePresence>
        {cvOpen && (
          <Backdrop
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCvOpen(false)}
          >
            <ModalBox
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
              onClick={(e) => e.stopPropagation()}
            >
              <ModalHeader>
                <ModalTitle>Thembelihle Ncube — CV</ModalTitle>
                <CloseBtn onClick={() => setCvOpen(false)} aria-label="Close">
                  <X size={18} />
                </CloseBtn>
              </ModalHeader>

              <ModalBody>
                <CVImage src={CV_IMAGE} alt="Thembelihle Ncube CV" />
              </ModalBody>

              <ModalFooter>
                <DownloadBtn href={CV_IMAGE} download="Thembelihle_Ncube_CV.png">
                  <Download size={15} /> Download CV
                </DownloadBtn>
              </ModalFooter>
            </ModalBox>
          </Backdrop>
        )}
      </AnimatePresence>
    </>
  );
}