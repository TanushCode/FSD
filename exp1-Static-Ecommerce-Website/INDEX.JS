const searchInput = document.getElementById('searchInput');
const lineupSelect = document.getElementById('lineupSelect');
const productCards = document.querySelectorAll('.product');
const countLabel = document.querySelector('[data-count]');
const scrollButtons = document.querySelectorAll('[data-scroll]');

const filterProducts = () => {
    const query = searchInput.value.trim().toLowerCase();
    const lineup = lineupSelect.value;
    let visible = 0;

    productCards.forEach((card) => {
        const matchesName = card.dataset.name.toLowerCase().includes(query);
        const matchesLineup = lineup === 'all' || card.dataset.lineup === lineup;
        const show = matchesName && matchesLineup;
        card.style.display = show ? 'block' : 'none';
        if (show) visible += 1;
    });

    countLabel.textContent = visible;
};

searchInput.addEventListener('input', filterProducts);
lineupSelect.addEventListener('change', filterProducts);

scrollButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const section = document.getElementById(button.dataset.scroll);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

filterProducts();