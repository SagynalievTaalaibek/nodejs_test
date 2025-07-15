export async function renderEdit(container) {
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

    const userData = await res.json();

    container.innerHTML = `
    <h1>Edit User</h1>
    <form id="edit-form">
      <input name="username" placeholder="Username" value="${userData.username}" required />
      <input name="password" type="password" placeholder="New password (optional)" />
      <input name="first_name" placeholder="First name" value="${userData.first_name || ''}" />
      <input name="last_name" placeholder="Last name" value="${userData.last_name || ''}" />
      <select name="gender">
        <option value="">Gender</option>
        <option value="male" ${userData.gender === 'male' ? 'selected' : ''}>Male</option>
        <option value="female" ${userData.gender === 'female' ? 'selected' : ''}>Female</option>
      </select>
      <input name="birthdate" type="date" value="${userData.birthdate?.slice(0, 10) || ''}" />
      <button type="submit">Update</button>
    </form>
    <a href="#/list">← Back</a>
  `;

    document.getElementById('edit-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const form = e.target;

        const updated = {
            username: form.username.value,
            first_name: form.first_name.value,
            last_name: form.last_name.value,
            gender: form.gender.value,
            birthdate: form.birthdate.value,
        };

        if (form.password.value) {
            updated.password = form.password.value;
        }


        const updateRes = await fetch(`http://localhost:8000/users/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify(updated),
        });

        if (updateRes.ok) {
            alert('User updated');
            location.hash = '#/list';
        } else {
            const {error} = await updateRes.json();
            alert(error);
        }
    });
}
