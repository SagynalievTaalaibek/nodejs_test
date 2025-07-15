import './style.css';
import { router } from './router.js';

document.addEventListener('DOMContentLoaded', () => {
    router();
    window.addEventListener('hashchange', router);
});
