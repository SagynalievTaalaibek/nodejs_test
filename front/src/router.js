import { requireAdmin } from './auth.js';
import { renderList } from './pages/list.js';
import { renderLogin } from './pages/login.js';
/*import { renderUser } from './pages/user.js';
import { renderAdd } from './pages/add.js';
import { renderEdit } from './pages/edit.js';*/

export async function router() {
    const app = document.getElementById('app');
    const hash = window.location.hash;

    if (hash.startsWith('#/login')) {
        renderLogin(app);
        return;
    }

    // Все остальные маршруты требуют авторизации
    const user = await requireAdmin();
    if (!user) return;

    if (hash.startsWith('#/list')) {
        renderList(app);
    } else (hash.startsWith('#/add'))
    {
        renderList(app);
    }
}
