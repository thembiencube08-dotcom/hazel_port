import styled from 'styled-components';
import { GitBranch, Link, Mail } from 'lucide-react';

const FooterEl = styled.footer`
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding: 3rem 2rem 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding: 2.5rem 1.5rem 1.5rem;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const TopRow = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr;
  gap: 3rem;
  padding-bottom: 2.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  margin-bottom: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const BrandCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
`;

const Logo = styled.span`
  font-size: 1.375rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: -0.5px;

  span {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const Tagline = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
  max-width: 240px;
`;

const EmailLink = styled.a`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.accent};
  font-weight: 500;
  transition: opacity 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.375rem;

  &:hover {
    opacity: 0.75;
  }
`;

const SocialRow = styled.div`
  display: flex;
  gap: 0.625rem;
  margin-top: 0.25rem;
`;

const SocialLink = styled.a`
  width: 36px;
  height: 36px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.accentLight};
    color: ${({ theme }) => theme.colors.accent};
    border-color: ${({ theme }) => theme.colors.accent};
    transform: translateY(-2px);
  }
`;

const NavCol = styled.div``;

const ColTitle = styled.h4`
  font-size: 0.825rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 1rem;
`;

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
`;

const NavItem = styled.li`
  a {
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    font-weight: 500;
    transition: color 0.2s ease;

    &:hover {
      color: ${({ theme }) => theme.colors.accent};
    }
  }
`;

const BottomRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Copyright = styled.p`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textMuted};
  display: flex;
  align-items: center;
  gap: 0.3rem;

  svg {
    color: ${({ theme }) => theme.colors.accent};
  }
`;



const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href === '#') { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <FooterEl>
      <Container>
        <TopRow>
          <BrandCol>
            <Logo>T<span>.</span>Ncube</Logo>
            <Tagline>
              Software Developer crafting modern web experiences with clean code and great design.
            </Tagline>
            <EmailLink href="mailto:thembiencube08@email.com">
              <Mail size={14} />
              thembiencube08@email.com
            </EmailLink>
            <SocialRow>
              <SocialLink href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <GitBranch size={15} />
              </SocialLink>
              <SocialLink href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Link size={15} />
              </SocialLink>
              <SocialLink href="mailto:thembiencube08@email.com" aria-label="Email">
                <Mail size={15} />
              </SocialLink>
            </SocialRow>
          </BrandCol>

          <NavCol>
            <ColTitle>Navigation</ColTitle>
            <NavList>
              {navLinks.map((link) => (
                <NavItem key={link.label}>
                  <a href={link.href} onClick={(e) => handleClick(e, link.href)}>
                    {link.label}
                  </a>
                </NavItem>
              ))}
            </NavList>
          </NavCol>

          <NavCol>
            <ColTitle>Services</ColTitle>
            <NavList>
              {['Web Development', 'UI/UX Design', 'React Apps', 'API Integration', 'Consulting'].map((s) => (
                <NavItem key={s}><a href="#">{s}</a></NavItem>
              ))}
            </NavList>
          </NavCol>
        </TopRow>

        <BottomRow>
          <Copyright>
            © {new Date().getFullYear()} Thembelihle Ncube 
          </Copyright>
        </BottomRow>
      </Container>
    </FooterEl>
  );
}
