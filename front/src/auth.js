export async function requireAdmin() {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
        window.location.hash = '#/login';
        return null;
    }

    const user = JSON.parse(userStr);

    const res = await fetch('http://localhost:8000/auth/me', {
        headers: { Authorization: `Bearer ${user.token}` },
    });

    console.log(res)

    if (!res.ok) {
        localStorage.removeItem('user');
        window.location.hash = '#/login';
        return null;
    }

    const me = await res.json();
    if (me.role !== 'admin') {
        alert('Access denied');
        window.location.hash = '#/login';
        return null;
    }

    return me;
}
