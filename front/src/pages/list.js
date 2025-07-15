import './styles.css';

// This page renders the user list page with sorting, pagination, and logout functionality.
export async function renderList(container) {
    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;

    let page = 1;
    let sort = 'username';
    let order = 'asc';

    container.innerHTML = `
  <h1 style="
    font-family: Arial, sans-serif;
    color: #333;
    text-align: center;
    margin-bottom: 20px;
  ">User List</h1>

  <div style="
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 20px;
    font-family: Arial, sans-serif;
    font-size: 14px;
    align-items: center;
  ">
    <span>Sort by:</span>
    <select id="sort-field" style="
      padding: 6px 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 14px;
    ">
      <option value="username">Username</option>
      <option value="first_name">First Name</option>
      <option value="birthdate">Birthdate</option>
    </select>
    <select id="sort-order" style="
      padding: 6px 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 14px;
    ">
      <option value="asc">↑ Ascending</option>
      <option value="desc">↓ Descending</option>
    </select>
  </div>

  <div id="user-list" style="
    max-width: 600px;
    margin: 0 auto 30px;
    font-family: Arial, sans-serif;
  "></div>

  <div id="pagination" style="
    display: flex;
    justify-content: center;
    gap: 5px;
    margin-bottom: 30px;
  "></div>

  <div style="text-align: center; margin-bottom: 20px;">
    <a href="#/add" style="
      text-decoration: none;
      background-color: #28a745;
      color: white;
      padding: 10px 15px;
      border-radius: 5px;
      font-weight: bold;
      transition: background-color 0.3s;
      margin-right: 10px;
    " onmouseover="this.style.backgroundColor='#218838'" onmouseout="this.style.backgroundColor='#28a745'">Add new user</a>

    <button id="logout" style="
      padding: 10px 15px;
      background-color: #dc3545;
      color: white;
      border: none;
      border-radius: 5px;
      font-size: 14px;
      font-weight: bold;
      cursor: pointer;
      transition: background-color 0.3s;
    " onmouseover="this.style.backgroundColor='#c82333'" onmouseout="this.style.backgroundColor='#dc3545'">Logout</button>
  </div>
`;


    document.getElementById('logout').onclick = async () => {
        const confirmed = confirm('Are you sure you want to logout?');
        if (!confirmed) return;

        try {
            const res = await fetch('http://localhost:8000/auth', {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });

            if (!res.ok) {
                const err = await res.json();
                alert(err.error || 'Logout failed');
                return;
            }
        } catch (err) {
            console.error(err);
        }

        localStorage.removeItem('user');
        location.hash = '#/login';
    };

    document.getElementById('sort-field').onchange = (e) => {
        sort = e.target.value;
        loadUsers();
    };

    document.getElementById('sort-order').onchange = (e) => {
        order = e.target.value;
        loadUsers();
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    async function loadUsers() {
        const res = await fetch(
            `http://localhost:8000/users?page=${page}&limit=5&sort=${sort}&order=${order}`,
            {
                headers: {
                    Authorization: user ? `Bearer ${user.token}` : '',
                },
            }
        );

        const {users, totalPages} = await res.json();

        document.getElementById('user-list').innerHTML = `
  <ul style="
    list-style: none;
    padding: 0;
    margin: 0 auto;
    max-width: 600px;
    font-family: Arial, sans-serif;
  ">
    ${users
            .map(
                (u) => `
      <li style="
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 16px;
        border-bottom: 1px solid #eee;
      ">
        <div>
          <div style="font-weight: bold;">${u.username}</div>
          <div style="color: #555;">${u.first_name || ''} ${u.last_name || ''}</div>
          <div style="font-size: 13px; color: #777;">${formatDate(u.birthdate)}</div>
        </div>
        <div>
          <a href="#/user?id=${u._id}" style="
            color: #007bff;
            text-decoration: none;
            margin-right: 10px;
            font-size: 14px;
          " onmouseover="this.style.textDecoration='underline'" onmouseout="this.style.textDecoration='none'">View</a>
          <a href="#/edit?id=${u._id}" style="
            color: #ffc107;
            text-decoration: none;
            font-size: 14px;
          " onmouseover="this.style.textDecoration='underline'" onmouseout="this.style.textDecoration='none'">Edit</a>
        </div>
      </li>
    `
            )
            .join('')}
  </ul>
`;

        const pagination = document.getElementById('pagination');
        pagination.innerHTML = '';
        for (let i = 1; i <= totalPages; i++) {
            const btn = document.createElement('button');
            btn.textContent = i;
            btn.disabled = i === page;
            btn.onclick = () => {
                page = i;
                loadUsers();
            };
            pagination.appendChild(btn);
        }
    }

    await loadUsers();
}
