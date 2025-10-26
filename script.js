document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const themeToggle = document.getElementById('theme-toggle');
    const menuButton = document.getElementById('menu-button');
    const sidebar = document.getElementById('sidebar');
    const closeMenuButton = document.getElementById('sidebar-close-btn');
    const overlay = document.getElementById('overlay');
    const searchInput = document.getElementById('card-search-input');
    const filterButtons = document.querySelectorAll('.category-filters .filter-btn');
    const sidebarLinks = document.querySelectorAll('.sidebar .nav-list a');

    // Tools data
    const tools = [
        {
            name: 'Word Counter',
            description: 'Count words, characters, and paragraphs in your text',
            category: 'text',
            file: 'word-counter.html'
        },
        {
            name: 'Character Counter',
            description: 'Count characters with or without spaces',
            category: 'text',
            file: 'character-counter.html'
        },
        {
            name: 'Case Converter',
            description: 'Convert text to uppercase, lowercase, title case',
            category: 'text',
            file: 'case-converter.html'
        },
        {
            name: 'Remove Spaces',
            description: 'Remove extra spaces from your text',
            category: 'text',
            file: 'remove-spaces.html'
        },
        {
            name: 'Reverse Text',
            description: 'Reverse your text string',
            category: 'text',
            file: 'reverse-text.html'
        },
        {
            name: 'Base64 Encoder',
            description: 'Encode and decode Base64 strings',
            category: 'conversion',
            file: 'base64-encoder.html'
        },
        {
            name: 'URL Encoder',
            description: 'Encode and decode URLs',
            category: 'conversion',
            file: 'url-encoder.html'
        },
        {
            name: 'JSON Formatter',
            description: 'Format and validate JSON data',
            category: 'conversion',
            file: 'json-formatter.html'
        },
        {
            name: 'HTML Encoder',
            description: 'Encode and decode HTML entities',
            category: 'conversion',
            file: 'html-encoder.html'
        },
        {
            name: 'Number Converter',
            description: 'Convert between different number systems',
            category: 'conversion',
            file: 'number-converter.html'
        },
        {
            name: 'QR Generator',
            description: 'Generate QR codes from text',
            category: 'utility',
            file: 'qr-generator.html'
        },
        {
            name: 'QR Scanner',
            description: 'Scan QR codes from images',
            category: 'utility',
            file: 'qr-scanner.html'
        },
        {
            name: 'Password Generator',
            description: 'Generate secure passwords',
            category: 'utility',
            file: 'password-generator.html'
        },
        {
            name: 'Age Calculator',
            description: 'Calculate age and time differences',
            category: 'utility',
            file: 'age-calculator.html'
        },
        {
            name: 'Unit Converter',
            description: 'Convert between different units',
            category: 'utility',
            file: 'unit-converter.html'
        },
        {
            name: 'Calculator',
            description: 'Basic arithmetic calculator',
            category: 'utility',
            file: 'calculator.html'
        },
        {
            name: 'Stopwatch',
            description: 'Track time with start, stop, and lap features',
            category: 'utility',
            file: 'stopwatch.html'
        },
        {
            name: 'Timer',
            description: 'Countdown timer with alerts',
            category: 'utility',
            file: 'timer.html'
        },
        {
            name: 'Random Number',
            description: 'Generate random numbers in a range',
            category: 'utility',
            file: 'random-number.html'
        },
        {
            name: 'Notes App',
            description: 'Save and manage your notes locally',
            category: 'utility',
            file: 'notes-app.html'
        }
    ];

    // Theme management
    function setTheme(theme) {
        body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        themeToggle.checked = (theme === 'dark');
    }
    themeToggle.addEventListener('change', () => setTheme(themeToggle.checked ? 'dark' : 'light'));
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);

    // Sidebar management
    function openSidebar() { 
        sidebar.classList.add('active'); 
        overlay.classList.add('active'); 
    }
    function closeSidebar() { 
        sidebar.classList.remove('active'); 
        overlay.classList.remove('active'); 
    }
    menuButton.addEventListener('click', openSidebar);
    closeMenuButton.addEventListener('click', closeSidebar);
    overlay.addEventListener('click', closeSidebar);

    // Render tools
    function renderTools(toolsToRender) {
        const toolsGrid = document.getElementById('toolsGrid');
        toolsGrid.innerHTML = '';

        toolsToRender.forEach(tool => {
            const toolCard = document.createElement('a');
            toolCard.className = 'tool-card';
            toolCard.href = `tools/${tool.file}`;
            toolCard.setAttribute('data-category', tool.category);
            toolCard.innerHTML = `
                <h4>${tool.name}</h4>
                <p class="category">${tool.category}</p>
                <p class="description">${tool.description}</p>
                <span class="visit-link">Visit Tool <i class='bx bx-right-arrow-alt'></i></span>
            `;
            toolsGrid.appendChild(toolCard);
        });
    }

    // Update category counts
    function updateCategoryCounts() {
        const textCount = tools.filter(tool => tool.category === 'text').length;
        const conversionCount = tools.filter(tool => tool.category === 'conversion').length;
        const utilityCount = tools.filter(tool => tool.category === 'utility').length;
        
        document.getElementById('count-all').textContent = tools.length;
        document.getElementById('count-text').textContent = textCount;
        document.getElementById('count-conversion').textContent = conversionCount;
        document.getElementById('count-utility').textContent = utilityCount;
    }

    // Filter and search functionality
    function filterAndSearchCards() {
        const searchTerm = searchInput.value.toLowerCase();
        const activeFilter = document.querySelector('.category-filters .filter-btn.active').getAttribute('data-filter');
        
        const filteredTools = tools.filter(tool => {
            const categoryMatch = (activeFilter === 'all' || activeFilter === tool.category);
            const searchMatch = tool.name.toLowerCase().includes(searchTerm) || 
                              tool.description.toLowerCase().includes(searchTerm) ||
                              tool.category.toLowerCase().includes(searchTerm);
            return categoryMatch && searchMatch;
        });
        
        renderTools(filteredTools);
    }

    // Filter button functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filterAndSearchCards();
        });
    });

    // Sidebar category links
    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = link.getAttribute('data-category');
            // About page link
document.querySelector('a[data-category="about"]').addEventListener('click', function(e) {
    e.preventDefault();
    window.location.href = "about.html"; // open About page
});
            
            // Update active states
            sidebarLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Update filter buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            const targetButton = document.querySelector(`[data-filter="${category}"]`);
            if (targetButton) {
                targetButton.classList.add('active');
            }
            
            filterAndSearchCards();
            closeSidebar();
        });
    });

    // Search functionality
    searchInput.addEventListener('input', filterAndSearchCards);

    // Initialize
    updateCategoryCounts();
    renderTools(tools);
});
