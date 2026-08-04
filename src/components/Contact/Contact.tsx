import { useRef, useState } from 'react';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';
import { Send, Mail, MapPin, Link, GitBranch } from 'lucide-react';

const Section = styled.section`
  padding: 6rem 2rem;
  background: ${({ theme }) => theme.colors.background};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding: 4rem 1.5rem;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: 5rem;
  align-items: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const SectionLabel = styled.p`
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};
`;

const Heading = styled.h2`
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  letter-spacing: -1.5px;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.05;
`;

const SubText = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.7;
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  margin-top: 0.5rem;
`;

const InfoRow = styled.a`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.9rem;
  font-weight: 500;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }

  svg {
    color: ${({ theme }) => theme.colors.accent};
    flex-shrink: 0;
  }
`;

const SocialRow = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 0.5rem;
`;

const SocialBtn = styled.a`
  width: 44px;
  height: 44px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
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
    transform: translateY(-3px);
    box-shadow: ${({ theme }) => theme.shadows.accent};
  }
`;

const Form = styled(motion.form)`
  background: ${({ theme }) => theme.colors.backgroundCard};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius['3xl']};
  padding: 2.5rem;
  box-shadow: ${({ theme }) => theme.shadows.card};
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 1.75rem;
  }
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
`;

const Label = styled.label`
  font-size: 0.825rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const inputStyles = `
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 0.9rem;
  font-family: inherit;
  border-radius: 12px;
  transition: all 0.2s ease;
  outline: none;
`;

const Input = styled.input`
  ${inputStyles}
  background: ${({ theme }) => theme.colors.surface};
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.accent};
    background: ${({ theme }) => theme.colors.background};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.accentLight};
  }
`;

const Textarea = styled.textarea`
  ${inputStyles}
  background: ${({ theme }) => theme.colors.surface};
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
  resize: vertical;
  min-height: 130px;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.accent};
    background: ${({ theme }) => theme.colors.background};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.accentLight};
  }
`;

const SubmitBtn = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.875rem 2rem;
  background: ${({ theme }) => theme.colors.accent};
  color: #fff;
  font-size: 0.95rem;
  font-weight: 600;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  transition: background 0.2s ease;
  margin-top: 0.25rem;

  &:hover {
    background: ${({ theme }) => theme.colors.accentDark};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const SuccessMsg = styled(motion.p)`
  text-align: center;
  color: ${({ theme }) => theme.colors.success};
  font-weight: 600;
  font-size: 0.9rem;
`;

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <Section id="contact">
      <Container ref={ref}>
        <Left>
          <motion.div
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <SectionLabel>Get in Touch</SectionLabel>
            <Heading>Let's Build Something Together</Heading>
            <SubText>
              Have a project in mind or want to collaborate? I'd love to hear from you.
              Whether it's a quick question or a long-term opportunity, my inbox is always open.
            </SubText>
            <ContactInfo>
              <InfoRow href="mailto:thembelihle@email.com">
                <Mail size={18} />
                thembiencube08@gmail.com
              </InfoRow>
              <InfoRow as="div">
                <MapPin size={18} />
                Zimbabwe
              </InfoRow>
            </ContactInfo>
            <SocialRow>
              <SocialBtn href="thembiencube08-dotcom" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <GitBranch size={18} />
              </SocialBtn>
              <SocialBtn href="www.linkedin.com/in/
thembelihle-hazel-ncube
" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Link size={18} />
              </SocialBtn>
              <SocialBtn href="mailto:thembiencube08@gmail.com" aria-label="Email">
                <Mail size={18} />
              </SocialBtn>
            </SocialRow>
          </motion.div>
        </Left>

        <Form
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          onSubmit={handleSubmit}
        >
          <FormRow>
            <Field>
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" type="text" placeholder="Your name" required />
            </Field>
            <Field>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="your@email.com" required />
            </Field>
          </FormRow>

          <Field>
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" name="subject" type="text" placeholder="What's this about?" required />
          </Field>

          <Field>
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Tell me about your project or idea..."
              required
            />
          </Field>

          {submitted ? (
            <SuccessMsg
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              ✓ Message sent! I'll get back to you soon.
            </SuccessMsg>
          ) : (
            <SubmitBtn
              type="submit"
              whileHover={{ scale: 1.02, boxShadow: '0 8px 32px rgba(108,99,255,0.35)' }}
              whileTap={{ scale: 0.98 }}
            >
              <Send size={16} />
              Send Message
            </SubmitBtn>
          )}
        </Form>
      </Container>
    </Section>
  );
}
