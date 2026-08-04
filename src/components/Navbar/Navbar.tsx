import { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps { isDark: boolean; toggleTheme: () => void; }

const Nav = styled(motion.header)<{ $scrolled: boolean }>`
  position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
  height: 68px;
  display: flex; align-items: center;
  padding: 0 2.5rem;
  transition: all 0.3s ease;

  ${({ $scrolled, theme }) => $scrolled && css`
    background: ${theme.colors.navBg};
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    border-bottom: 1px solid ${theme.colors.border};
    box-shadow: ${theme.shadows.sm};
  `}

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) { padding: 0 1.5rem; }
`;

const Inner = styled.div`
  max-width: 1280px; margin: 0 auto; width: 100%;
  display: flex; align-items: center; justify-content: space-between;
`;

const Logo = styled.a`
  display: flex; align-items: center; gap: 0.5rem;
  font-size: 1rem; font-weight: 700; color: ${({ theme }) => theme.colors.text};
  letter-spacing: -0.3px;

  span { color: ${({ theme }) => theme.colors.accent}; }

  &:hover { color: ${({ theme }) => theme.colors.accent}; }
`;

const LogoIcon = styled.div`
  width: 30px; height: 30px;
  border: 2px solid ${({ theme }) => theme.colors.accent};
  border-radius: 6px;
  display: flex; align-items: center; justify-content: center;
  font-size: 0.75rem; font-weight: 800; color: ${({ theme }) => theme.colors.accent};
`;

const Links = styled.nav`
  display: flex; align-items: center; gap: 0.25rem;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) { display: none; }
`;

const NavLink = styled.a<{ $active?: boolean }>`
  padding: 0.4rem 0.75rem;
  font-size: 0.8375rem; font-weight: 500;
  color: ${({ theme, $active }) => $active ? theme.colors.accent : theme.colors.textSecondary};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  transition: all 0.2s ease;
  position: relative;

  ${({ $active, theme }) => $active && css`
    &::after {
      content: '';
      position: absolute; bottom: 2px; left: 50%; transform: translateX(-50%);
      width: 16px; height: 2px;
      background: ${theme.colors.accent};
      border-radius: 2px;
    }
  `}

  &:hover { color: ${({ theme }) => theme.colors.text}; background: ${({ theme }) => theme.colors.surface}; }
`;

const Right = styled.div`
  display: flex; align-items: center; gap: 0.625rem;
`;

const ThemeBtn = styled.button`
  width: 36px; height: 36px; border-radius: ${({ theme }) => theme.borderRadius.full};
  display: flex; align-items: center; justify-content: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.backgroundCard};
  transition: all 0.2s ease;
  &:hover { color: ${({ theme }) => theme.colors.accent}; border-color: ${({ theme }) => theme.colors.accent}; }
`;

const TalkBtn = styled.a`
  display: flex; align-items: center; gap: 0.375rem;
  padding: 0.475rem 1.125rem;
  background: ${({ theme }) => theme.colors.accent};
  color: #fff; font-size: 0.825rem; font-weight: 600;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  transition: all 0.2s ease;
  &:hover { background: ${({ theme }) => theme.colors.accentDark}; transform: translateY(-1px); box-shadow: ${({ theme }) => theme.shadows.accent}; }
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) { display: none; }
`;

const MobileBtn = styled.button`
  display: none; width: 36px; height: 36px; border-radius: ${({ theme }) => theme.borderRadius.md};
  align-items: center; justify-content: center;
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.backgroundCard};
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) { display: flex; }
`;

const MobileMenu = styled(motion.div)`
  position: fixed; top: 68px; left: 0; right: 0; z-index: 999;
  background: ${({ theme }) => theme.colors.background};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding: 1rem 1.5rem 1.5rem;

  ul { display: flex; flex-direction: column; gap: 0.25rem; margin-bottom: 1rem; }
  li a {
    display: block; padding: 0.65rem 1rem;
    font-size: 0.9rem; font-weight: 500;
    color: ${({ theme }) => theme.colors.textSecondary};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    &:hover { color: ${({ theme }) => theme.colors.text}; background: ${({ theme }) => theme.colors.surface}; }
  }
`;

const MobileTalk = styled.a`
  display: flex; align-items: center; justify-content: center; gap: 0.5rem;
  padding: 0.75rem; background: ${({ theme }) => theme.colors.accent};
  color: #fff; font-weight: 600; border-radius: ${({ theme }) => theme.borderRadius.md};
`;

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#projects' },
  { label: 'My Journey', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ isDark, toggleTheme }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('#home');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault(); setActive(href); setOpen(false);
    if (href === '#home') { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Nav $scrolled={scrolled} initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
        <Inner>
          <Logo href="#" onClick={(e) => go(e, '#home')}>
            <LogoIcon>TN</LogoIcon>
            <span>THEMBELIHLE</span>&nbsp;NCUBE
          </Logo>

          <Links>
            {navItems.map(item => (
              <NavLink key={item.label} href={item.href} $active={active === item.href} onClick={(e) => go(e, item.href)}>
                {item.label}
              </NavLink>
            ))}
          </Links>

          <Right>
            <ThemeBtn onClick={toggleTheme} aria-label="Toggle theme">
              {isDark ? <Sun size={15} /> : <Moon size={15} />}
            </ThemeBtn>
            <TalkBtn href="#contact" onClick={(e) => go(e, '#contact')}>
              Let's Talk <ArrowUpRight size={13} />
            </TalkBtn>
            <MobileBtn onClick={() => setOpen(!open)} aria-label="Menu">
              {open ? <X size={18} /> : <Menu size={18} />}
            </MobileBtn>
          </Right>
        </Inner>
      </Nav>

      <AnimatePresence>
        {open && (
          <MobileMenu initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.18 }}>
            <ul>{navItems.map(item => <li key={item.label}><a href={item.href} onClick={(e) => go(e, item.href)}>{item.label}</a></li>)}</ul>
            <MobileTalk href="#contact" onClick={(e) => go(e, '#contact')}>Let's Talk <ArrowUpRight size={15} /></MobileTalk>
          </MobileMenu>
        )}
      </AnimatePresence>
    </>
  );
}
