(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.PortfolioMedia = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  function createLoopController(video, onChange = () => {}, initial = {}) {
    let visible = false;
    let pageVisible = true;
    let loaded = false;
    let userPaused = false;
    let pendingInternalPauses = 0;
    let blocked = false;
    let request = 0;
    const preferences = { reducedMotion: false, saveData: false, globalPaused: false, ...initial };
    const report = () => onChange({ playing: !video.paused, blocked });
    const load = () => {
      if (loaded) return;
      for (const source of video.querySelectorAll('source[data-src]')) source.src = source.dataset.src;
      video.load();
      loaded = true;
    };
    const pause = () => {
      request++;
      if (!video.paused) {
        pendingInternalPauses++;
        video.pause();
      }
      report();
    };
    const play = async () => {
      load();
      const current = ++request;
      try {
        await video.play();
        if (current !== request) return;
        blocked = false;
      } catch (_) {
        if (current !== request) return;
        blocked = true;
      }
      report();
    };
    const sync = async () => {
      if (visible && pageVisible && !userPaused && !preferences.reducedMotion && !preferences.saveData && !preferences.globalPaused) {
        if (video.paused) await play();
      } else pause();
    };
    video.addEventListener('play', () => {
      // Media events are queued: an old play event must not undo a newer pause.
      if (!video.paused) { blocked = false; userPaused = false; }
      report();
    });
    video.addEventListener('pause', () => {
      if (pendingInternalPauses > 0) pendingInternalPauses--;
      else userPaused = true;
      report();
    });
    report();
    return {
      prepare: load,
      setVisible(value) { visible = value; return sync(); },
      setPageVisible(value) { pageVisible = value; return sync(); },
      setPreferences(next) { Object.assign(preferences, next); return sync(); },
      async toggle() {
        if (!video.paused) { userPaused = true; pause(); }
        else if (pageVisible) { userPaused = false; await play(); }
      },
    };
  }

  function init(document, window) {
    const zh = document.documentElement?.lang?.toLowerCase().startsWith('zh');
    const labels = zh
      ? { play: '播放动图', pause: '暂停动图', blocked: '请点击播放观看此片段。', enable: '开启动图', pauseAll: '暂停所有动图' }
      : { play: 'Play animation', pause: 'Pause animation', blocked: 'Press play to view this clip.', enable: 'Enable animations', pauseAll: 'Pause animations' };
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const storageKey = 'haowen-portfolio-pause-loops';
    let storedPreference = null;
    try { storedPreference = window.localStorage.getItem(storageKey); } catch (_) { /* Local preferences are optional. */ }
    let globalPaused = storedPreference === 'true' || mediaQuery.matches || !!window.navigator.connection?.saveData;
    let explicitAnimationOptIn = false;
    const globalButton = document.querySelector('[data-animation-toggle]');
    const options = () => ({ reducedMotion: mediaQuery.matches && !explicitAnimationOptIn, saveData: !!window.navigator.connection?.saveData && !explicitAnimationOptIn, globalPaused });
    const controllers = new Map();
    for (const video of document.querySelectorAll('[data-loop]')) {
      const button = document.querySelector(`[data-loop-toggle="${video.id}"]`);
      const status = video.closest('figure')?.querySelector('[data-media-status]');
      const controller = createLoopController(video, state => {
        if (button) {
          button.textContent = state.playing ? labels.pause : labels.play;
          button.setAttribute('aria-pressed', String(state.playing));
        }
        if (status) status.textContent = state.blocked ? labels.blocked : '';
      }, options());
      controller.setPageVisible(!document.hidden);
      controllers.set(video, controller);
      if (button) {
        button.hidden = false;
        button.addEventListener('click', () => controller.toggle());
      }
      // Clicking the native player is a deliberate request, including in reduced-motion mode.
      video.addEventListener('pointerdown', () => controller.prepare(), { once: true });
      video.addEventListener('keydown', event => {
        if (event.key === ' ' || event.key === 'Enter') controller.prepare();
      });
    }
    const updateButton = () => {
      if (!globalButton) return;
      globalButton.hidden = false;
      globalButton.textContent = globalPaused ? labels.enable : labels.pauseAll;
      globalButton.setAttribute('aria-pressed', String(globalPaused));
    };
    if (globalButton) globalButton.addEventListener('click', () => {
      globalPaused = !globalPaused;
      // An explicit opt-in applies to this visit, never silently to the next visit.
      explicitAnimationOptIn = !globalPaused;
      try { window.localStorage.setItem(storageKey, String(globalPaused)); } catch (_) { /* Private browsing may block storage. */ }
      for (const controller of controllers.values()) controller.setPreferences(options());
      updateButton();
    });
    updateButton();
    mediaQuery.addEventListener?.('change', () => {
      for (const controller of controllers.values()) controller.setPreferences(options());
    });
    if ('IntersectionObserver' in window) {
      const observer = new window.IntersectionObserver(entries => {
        for (const entry of entries) controllers.get(entry.target)?.setVisible(entry.isIntersecting && entry.intersectionRatio >= 0.2);
      }, { threshold: [0, 0.2] });
      for (const video of controllers.keys()) observer.observe(video);
    }
    // Without IntersectionObserver, keep the posters and explicit play controls.
    document.addEventListener('visibilitychange', () => {
      for (const controller of controllers.values()) controller.setPageVisible(!document.hidden);
      if (document.hidden) for (const video of document.querySelectorAll('video:not([data-loop])')) video.pause();
    });
  }
  return { createLoopController, init };
});

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  window.PortfolioMedia.init(document, window);
}
