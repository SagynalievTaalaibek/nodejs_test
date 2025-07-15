# Project

The repository contains two main modules:

- `/back` — backend built with Node.js using MongoDB
- `/front` — frontend built with Vite using vanilla JavaScript and CSS

---

## Installation and Running

### 1. MongoDB Installation

1. Install and run MongoDB locally.
2. The connection string is configured as:

mongodb://localhost:55000/users

Make sure MongoDB is listening on port `55000` or change the port in the configuration file `/back/config/config.js` accordingly.

### 2. Backend (`/back`)

1. Navigate to the `/back` directory:
```bash
cd back

```

2. Install dependencies:
```bash
npm install
```

3. Run the command to create users:
```bash
npm run seed
```

4. Start the server:
```bash
npm run dev
```


### 3. Frontend (/front)
1. Navigate to the /front directory:

```bash
cd front
```

2. Install dependencies:
```bash
npm install
```

3. Open in your browser the address that Vite outputs, usually:
http://localhost:5173









