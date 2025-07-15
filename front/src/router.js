import { requireAdmin } from './auth.js';
import { renderList } from './pages/list.js';
import { renderLogin } from './pages/login.js';
import { renderAdd } from './pages/add.js';
import { renderEdit } from './pages/edit.js';
import { renderUser } from './pages/user.js';

// Main router function to render pages based on URL hash.
export async function router() {
    const app = document.getElementById('app');
    const hash = window.location.hash;

    if (hash.startsWith('#/login')) {
        renderLogin(app);
        return;
    }

// Checks if user is an admin before allowing access to protected pages.
    const user = await requireAdmin();
    if (!user) return;

// Show login, user list, add, edit, and user detail pages.
    if (hash.startsWith('#/list')) {
        renderList(app);
    } else if (hash.startsWith('#/add')) {
        renderAdd(app);
    } else if (hash.startsWith('#/edit')) {
        renderEdit(app);
    }  else if (hash.startsWith('#/user')) {
        renderUser(app);
    } else {
        app.innerHTML = `
      <div style="
        text-align: center;
        font-family: Arial, sans-serif;
        padding: 40px;
      ">
        <h1>Добро пожаловать!</h1>
        <p>Выберите действие из меню или перейдите в <a href="#/list">список пользователей</a>.</p>
      </div>
    `;
    }
}
