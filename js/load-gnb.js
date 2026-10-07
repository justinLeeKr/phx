document.addEventListener('DOMContentLoaded', async () => {
    const includes = [
        { selector: '[data-gnb]', path: './includes/gnb.html', name: 'GNB' },
        { selector: '[data-footer]', path: './includes/footer.html', name: 'Footer' }
    ];

    const results = await Promise.all(includes.map(async ({ selector, path, name }) => {
        const mount = document.querySelector(selector);
        if (!mount) return { name, loaded: false };

        try {
            const response = await fetch(path);
            if (!response.ok) throw new Error(`${name} load failed: ${response.status}`);

            mount.insertAdjacentHTML('beforebegin', await response.text());
            mount.remove();
            return { name, loaded: true };
        } catch (error) {
            console.error(error);
            return { name, loaded: false };
        }
    }));

    if (results.some(({ name, loaded }) => name === 'GNB' && loaded)) {
        const $header = jQuery('#header');
        theme.StickyHeader.initialize($header, {
            wrapper: $header,
            headerBody: $header.find('.header-body')
        });
        theme.Nav.initialize($header.find('#mainNav'));
    }
});