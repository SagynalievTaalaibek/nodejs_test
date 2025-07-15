// This page renders login form.

export function renderLogin(container) {
    container.innerHTML = `
  <h1 style="
    font-family: Arial, sans-serif;
    text-align: center;
    color: #333;
    margin-bottom: 20px;
  ">Admin Login</h1>
  <form id="login-form" style="
    display: flex;
    flex-direction: column;
    max-width: 320px;
    margin: 0 auto;
    gap: 15px;
  ">
    <input 
      name="username" 
      placeholder="Username" 
      required 
      style="
        padding: 10px;
        font-size: 16px;
        border: 1.5px solid #ccc;
        border-radius: 5px;
        outline: none;
        transition: border-color 0.3s;
      "
      onfocus="this.style.borderColor='#007BFF'"
      onblur="this.style.borderColor='#ccc'"
    />
    <input 
      name="password" 
      type="password" 
      placeholder="Password" 
      required 
      style="
        padding: 10px;
        font-size: 16px;
        border: 1.5px solid #ccc;
        border-radius: 5px;
        outline: none;
        transition: border-color 0.3s;
      "
      onfocus="this.style.borderColor='#007BFF'"
      onblur="this.style.borderColor='#ccc'"
    />
    <button type="submit" style="
      padding: 12px;
      font-size: 16px;
      background-color: #007BFF;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s;
    " 
    onmouseover="this.style.backgroundColor='#0056b3'" 
    onmouseout="this.style.backgroundColor='#007BFF'"
    >Login</button>
  </form>
`;


    document.getElementById('login-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const form = e.target;

        const body = {
            username: form.username.value,
            password: form.password.value,
        };

        try {
            const res = await fetch('http://localhost:8000/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            if (!res.ok) {
                const err = await res.json();
                alert(err.error || 'Login failed');
                return;
            }

            const {user} = await res.json();
            console.log(user);

            localStorage.setItem('user', JSON.stringify(user));
            window.location.hash = '#/list';
        } catch (err) {
            alert('Server error');
        }
    });
}
