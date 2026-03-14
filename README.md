# 🚖 Korsa

**Korsa** is a full-stack booking platform designed to modernize **intercity travel in Morocco**.  
It simplifies the process of finding and booking **grand taxis**, creating a digital bridge between passengers and drivers.

The goal of Korsa is to replace informal booking methods with a **simple, reliable, and transparent online experience**.

---

## 🌐 Live Demo


```
https://korsa-ma.vercel.app/
```

---

## ✨ Features

### 🚕 Smart Booking Flow
A smooth **multi-step booking interface** that allows users to:

- Select departure and destination cities  
- Choose travel date  
- Enter passenger information  
- Confirm booking  

### 💰 Dynamic Price Estimation
Users receive **instant price estimates** based on the selected route and number of passengers.

### 💺 Real-Time Seat Management
The platform tracks seat availability using a **Prisma + SQLite backend**, ensuring bookings update dynamically.

### 📩 Automated Notifications
Integrated **email confirmations** notify users after:

- Booking creation  
- Payment confirmation  

### ⭐ Reviews & Community
Passengers can leave **reviews and ratings**, helping build trust and maintain service quality.

---

## 🧰 Tech Stack

### Frontend
- **Framework:** Next.js (React)
- **Styling:** Tailwind CSS + shadcn/ui
- **Icons:** Lucide React

### Backend
- **Server:** Express (Node.js) with TypeScript
- **Database:** SQLite
- **ORM:** Prisma
- **Validation:** Zod

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/korsa.git
cd korsa
```

### 2. Install dependencies

Frontend:

```bash
npm install
```

Backend:

```bash
cd server
npm install
```

---

### 3. Setup the database

Initialize the database using Prisma:

```bash
npx prisma migrate dev
```

---

### 4. Run the project

Start the frontend:

```bash
npm run dev
```

Frontend runs on:

```
http://localhost:3000
```

Start the backend:

```bash
cd server
npm run dev
```

Backend runs on:

```
http://localhost:5000
```

---

## 📌 Project Vision

Korsa aims to bring **digital infrastructure to Morocco’s grand taxi ecosystem**, making intercity travel:

- Easier to access  
- More organized  
- More transparent for passengers  

---

## 👨‍💻 Author

**Ilyass Lhafi**  
Computer Science Student  
Developed as a modern solution for Moroccan transit.

