import './styles.css';

// It renders a form to input user details and handles submitting the data to the server.
export function renderAdd(container) {
    container.innerHTML = `
    <h1>Add User</h1>
    <form id="add-form">
      <input name="username" placeholder="Username" required />
      <input name="password" type="password" placeholder="Password" required />
      <input name="first_name" placeholder="First name" required />
      <input name="last_name" placeholder="Last name"  required/>
      <select name="gender">
        <option value="">Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <input name="birthdate" type="date" required/>
      <button type="submit" class="btn-create">Create</button>
    </form>
    <a href="#/list">← Back</a>
  `;

    document.getElementById('add-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const form = e.target;
        const user = JSON.parse(localStorage.getItem('user'));

        const data = {
            username: form.username.value,
            password: form.password.value,
            first_name: form.first_name.value,
            last_name: form.last_name.value,
            gender: form.gender.value,
            birthdate: form.birthdate.value,
        };

        const res = await fetch('http://localhost:8000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify(data),
        });

        if (res.ok) {
            alert('User created');
            location.hash = '#/list';
        } else {
            alert('Failed to create user');
        }
    });
}
