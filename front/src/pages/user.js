export async function renderUser(container) {
    const params = new URLSearchParams(window.location.hash.split('?')[1]);
    const id = params.get('id');
    const user = JSON.parse(localStorage.getItem('user'));

    const res = await fetch(`http://localhost:8000/users/${id}`, {
        headers: {
            Authorization: `Bearer ${user.token}`,
        },
    });

    if (!res.ok) {
        container.innerHTML = `<p>User not found</p>`;
        return;
    }

    const u = await res.json();

    container.innerHTML = `
    <h1>User Details</h1>
    <p><strong>Username:</strong> ${u.username}</p>
    <p><strong>First Name:</strong> ${u.first_name || ''}</p>
    <p><strong>Last Name:</strong> ${u.last_name || ''}</p>
    <p><strong>Gender:</strong> ${u.gender || ''}</p>
    <p><strong>Birthdate:</strong> ${u.birthdate?.slice(0, 10) || ''}</p>

    <button id="delete-user" style="color: red">Delete</button>
    <a href="#/list">← Back</a>
  `;

    document.getElementById('delete-user').onclick = async () => {
        const confirmed = confirm('Are you sure you want to delete this user?');
        if (!confirmed) return;

        const delRes = await fetch(`http://localhost:8000/users/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });

        if (delRes.ok) {
            alert('User deleted');
            location.hash = '#/list';
        } else {
            alert('Failed to delete user');
        }
    };
}
