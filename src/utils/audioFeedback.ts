// Audio feedback system using native Web Audio API (zero external assets needed)

class SoundSystem {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    try {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
      return this.ctx;
    } catch {
      return null;
    }
  }

  // Crisp, satisfying modern click / pop for interactive buttons & links
  playClickable() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Modern tactile bubble pop (A5 to A4 quick drop)
      osc.type = 'sine';
      osc.frequency.setValueAtTime(840, now);
      osc.frequency.exponentialRampToValueAtTime(420, now + 0.04);

      gain.gain.setValueAtTime(0.14, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch {
      // Audio playback silently caught if restricted
    }
  }

  // Soft, subtle wooden / earthen tap for non-clickable background areas
  playNonClickable() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Soft low-frequency earthen thud / tap
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(170, now);
      osc.frequency.exponentialRampToValueAtTime(75, now + 0.045);

      gain.gain.setValueAtTime(0.045, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.055);
    } catch {
      // Audio playback silently caught
    }
  }
}

export const soundManager = new SoundSystem();

// Helper to determine if an element or its ancestor is interactive
export function isElementClickable(target: EventTarget | null): boolean {
  if (!target || !(target instanceof HTMLElement)) return false;

  const clickableSelector = [
    'button',
    'a',
    'input',
    'select',
    'textarea',
    '[role="button"]',
    '[role="link"]',
    '[role="tab"]',
    '[role="checkbox"]',
    '[role="menuitem"]',
    '[onclick]',
    '.cursor-pointer',
    'summary',
    'label'
  ].join(',');

  if (target.closest(clickableSelector)) return true;

  try {
    const style = window.getComputedStyle(target);
    if (style.cursor === 'pointer') return true;
  } catch {
    // ignore
  }

  return false;
}

