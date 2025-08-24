import { TipeaseCalculator } from '@/components/tipease-calculator';
import { Github, Linkedin, Instagram, Codepen, Mail } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow flex items-center justify-center bg-background p-4 sm:p-6 md:p-8">
        <TipeaseCalculator />
      </main>
      <footer className="bg-muted py-6">
        <div className="container mx-auto px-4 md:px-6 flex flex-col sm:flex-row items-center justify-between">
          <p className="text-sm text-muted-foreground mb-4 sm:mb-0">
            &copy; {new Date().getFullYear()} TipEase. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            <a href="https://www.instagram.com/girish_lade_/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
            </a>
            <a href="https://www.linkedin.com/in/girish-lade-075bba201/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
            </a>
            <a href="https://github.com/girishlade111" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
            </a>
            <a href="https://codepen.io/Girish-Lade-the-looper" target="_blank" rel="noopener noreferrer" aria-label="Codepen">
              <Codepen className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
            </a>
            <a href="mailto:girishlade111@gmail.com" aria-label="Email">
              <Mail className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
