// Stacked skill cards: data-pos is each card's distance from the front (0 = front).
// The page accent hue follows the front card (card i has hue 85 + i * 45, matching stack-card.css).
const stack = document.querySelector<HTMLElement>('.stack-cards');

if (stack) {
  const cards = Array.from(stack.querySelectorAll<HTMLElement>('article'));
  let front = 0;
  let steps = 0; // keeps counting up so the page hue always turns forward

  const render = () => {
    cards.forEach((card, i) => {
      card.dataset.pos = String((i - front + cards.length) % cards.length);
    });
    document.documentElement.style.setProperty('--accent-hue', String(85 + steps * 45));
  };

  cards.forEach((card, i) => {
    card.style.setProperty('--i', String(i));
    card.querySelector('.next')?.addEventListener('click', () => {
      front = (front + 1) % cards.length;
      steps++;
      render();
    });
  });

  render();
}
