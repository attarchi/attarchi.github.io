import { type FooterContent } from '../Footer';

interface FooterProps {
  content: FooterContent;
}

export function Footer({ content }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer role="contentinfo" data-testid="footer-mock">
      <div data-testid="footer-container">
        <div data-testid="footer-content">
          <div data-testid="footer-copyright">
            <h3>{content.copyright.title}</h3>
            <p>© {currentYear} {content.copyright.companyName}. All rights reserved.</p>
            <p>{content.copyright.showcaseMessage}</p>
          </div>
          <div data-testid="footer-repository">
            <h3>{content.repository.title}</h3>
            <a href={content.repository.url} aria-label="GitHub Repository">
              {content.repository.text}
            </a>
          </div>
          <div data-testid="footer-license">
            <h3>{content.license.title}</h3>
            <p>Released under the {content.license.name}</p>
            <p>{content.license.description}</p>
          </div>
        </div>
        <div>
          <p>{content.buildInfo}</p>
        </div>
      </div>
    </footer>
  );
} 