# 🛍️ Fashion Ecommerce

A full-stack **Fashion Ecommerce Web Application** built with **Node.js, Express, MongoDB, and Next.js (React)**.  
This app allows users to browse fashion products, add them to their cart, and make purchases.

---

## 🔗 Live Demo
[Click here to view the project](https://fashion-ecommerce-lyart-six.vercel.app)

---
## 🚀 Features

### 👤 User Features
- User authentication (Sign up, Login, JWT-based session)
- Browse products by category, price, and search
- Add to cart & wishlist
- Checkout and place orders
- View order history
---

## 🏗️ Tech Stack

**Frontend**
- Next.js (React)
- TypeScript
- Tailwind CSS
- Zustand (State Management)

**Backend**
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- NodeMailer
- Cloudinary

---

## 📂 Project Structure

```

Fashion-Ecommerce/
│── backend/ # Express + MongoDB API
│ ├── src/
│ │ ├── controllers/ # Request handlers
│ │ │ ├── address-controller.js
│ │ │ ├── cart-controller.js
│ │ │ ├── customer-controller.js
│ │ │ ├── order-controller.js
│ │ │ ├── payment-controller.js
│ │ │ └── product-controller.js
│ │ ├── email_templates/
│ │ │ └── welcome.js
│ │ ├── middlewares/
│ │ │ ├── auth.js
│ │ │ └── multer.js
│ │ ├── models/
│ │ │ ├── address.js
│ │ │ ├── cart.js
│ │ │ ├── customer.js
│ │ │ ├── order.js
│ │ │ ├── payment.js
│ │ │ └── product.js
│ │ ├── routes/
│ │ │ ├── address_route.js
│ │ │ ├── cart_route.js
│ │ │ ├── customer_route.js
│ │ │ ├── order_route.js
│ │ │ ├── payment_route.js
│ │ │ └── product_route.js
│ │ └── services/
│ │ ├── cloudinary.js
│ │ ├── emails.js
│ │ └── sendemail.js
│ ├── app.js # Express app
│ └── server.js # Server entry point
│
│── frontend/ # Next.js + Tailwind App
│ ├── src/
│ │ ├── app/ # App Router
│ │ │ ├── favicon.ico
│ │ │ ├── globals.css
│ │ │ ├── layout.tsx
│ │ │ └── page.tsx
│ │ ├── about/page.tsx
│ │ ├── cart/page.tsx
│ │ ├── checkmail/page.tsx
│ │ ├── checkout/page.tsx
│ │ ├── contact/page.tsx
│ │ ├── fonts/
│ │ │ ├── GeistMonoVF.woff
│ │ │ └── GeistVF.woff
│ │ ├── forget/page.tsx
│ │ ├── form/page.tsx
│ │ ├── login/page.tsx
│ │ ├── product/page.tsx
│ │ ├── products/page.tsx
│ │ ├── productviewer/page.tsx
│ │ ├── profile/page.tsx
│ │ ├── reset-password/page.tsx
│ │ ├── signup/page.tsx
│ │ └── success/page.tsx
│ ├── components/
│ │ ├── homepage/
│ │ │ ├── featureSection.tsx
│ │ │ ├── heroSection.tsx
│ │ │ └── home.tsx
│ │ ├── productpage/
│ │ │ ├── allProducts.tsx
│ │ │ └── filters.tsx
│ │ └── UI/
│ │ ├── Carts.tsx
│ │ ├── EditProfile.tsx
│ │ ├── Footer.tsx
│ │ ├── Navbar.tsx
│ │ ├── Orderdetails.tsx
│ │ └── Orders.tsx
│ ├── hooks/
│ │ ├── useAuth.js
│ │ └── useCart.js
│ ├── networks/
│ │ ├── addressnetworks.ts
│ │ ├── cartnetworks.ts
│ │ ├── customernetworks.ts
│ │ ├── ordernetworks.ts
│ │ ├── paymentnetworks.ts
│ │ └── productnetworks.ts
│ └── service/
│ ├── help.ts
│ └── productstore.ts
│
│── package.json # Dependencies
│── README.md # Documentation

```
---

## 🚀 Deployment
-**Backend Part**
This project is deployed on **Render** for fast and easy hosting.  
Live app 👉 [https://render.com/](https://render.com)
-**FrontendPart**
This project is deployed on **Vercel** for fast and easy hosting.  
Live app 👉 [https://vercel.com/](https://vercel.com/)

---

## Application_Pages
**Home Page**

<img width="1900" height="981" alt="Screenshot 2025-08-24 212653" src="https://github.com/user-attachments/assets/d61c10f4-ffc6-4f33-883f-44863e352df6" />
<img width="1896" height="989" alt="Screenshot 2025-08-24 221211" src="https://github.com/user-attachments/assets/5a25fbd6-f6a4-44cc-a41a-bcd57bce7395" />
<img width="1893" height="980" alt="Screenshot 2025-08-24 221225" src="https://github.com/user-attachments/assets/ca1ef409-cb6f-480e-8769-8427e25e5ad3" />
<img width="1888" height="982" alt="Screenshot 2025-08-24 221240" src="https://github.com/user-attachments/assets/13394b33-3503-4c9b-a5de-4809c9ee9018" />
<img width="1892" height="507" alt="Screenshot 2025-08-24 221256" src="https://github.com/user-attachments/assets/eeb4e782-f576-46a1-aa9c-e579f17f80f4" />

---
**About and Contact Page**

---
<img width="1902" height="980" alt="Screenshot 2025-08-24 213530" src="https://github.com/user-attachments/assets/92e8d7e4-0fce-41ff-832c-2ae57945d4de" />

---
<img width="1904" height="978" alt="Screenshot 2025-08-24 213547" src="https://github.com/user-attachments/assets/d1f1cd0c-89f2-4156-ad01-da205dbefb9c" />

---

**Profile Page's**

<img width="1886" height="974" alt="Screenshot 2025-08-24 212810" src="https://github.com/user-attachments/assets/4e231d87-d47a-4d45-a8c8-9a20839f2caa" />
<img width="1891" height="966" alt="Screenshot 2025-08-24 213339" src="https://github.com/user-attachments/assets/ed007f08-db13-4eac-9652-6d540a6bbcbf" />
<img width="1896" height="988" alt="Screenshot 2025-08-24 212824" src="https://github.com/user-attachments/assets/6663d0df-3ebf-4247-b72c-02316785f744" />
<img width="1898" height="961" alt="Screenshot 2025-08-24 212942" src="https://github.com/user-attachments/assets/fd8fd91d-4fba-4278-a50b-364ebb3cd151" />

---

**Other Page's**

<img width="1859" height="989" alt="Screenshot 2025-08-24 212741" src="https://github.com/user-attachments/assets/6c61b6df-6b7c-45e6-bf58-a88aa169cb43" />
<img width="1902" height="991" alt="Screenshot 2025-08-24 213001" src="https://github.com/user-attachments/assets/367d0bed-60a2-4b56-9a3f-2509867b374e" />
<img width="1889" height="987" alt="Screenshot 2025-08-24 213014" src="https://github.com/user-attachments/assets/da3e2bd4-b59a-4c2a-8cbf-5cda2699f62f" />
<img width="1875" height="979" alt="Screenshot 2025-08-24 213141" src="https://github.com/user-attachments/assets/ac1207cb-629c-400a-a051-74f41ab9d514" />
<img width="1898" height="961" alt="Screenshot 2025-08-24 212942" src="https://github.com/user-attachments/assets/8306a86c-47c9-47f0-a4a0-6b2ac5acf7bb" />
<img width="1885" height="992" alt="Screenshot 2025-08-24 213037" src="https://github.com/user-attachments/assets/18a89002-5aee-4ee2-81c2-8b34974ea944" />
<img width="1913" height="993" alt="Screenshot 2025-08-24 213049" src="https://github.com/user-attachments/assets/d952f95a-0644-4e9d-9e64-db7e8f2941dd" />
<img width="1888" height="985" alt="Screenshot 2025-08-24 213225" src="https://github.com/user-attachments/assets/5b7eb673-43c1-4638-8bce-2ecf5eccb49c" />
<img width="1906" height="987" alt="Screenshot 2025-08-24 213303" src="https://github.com/user-attachments/assets/e99c3ed8-7fe4-4b6c-8698-b35b88609b66" />
<img width="1878" height="941" alt="Screenshot 2025-08-24 214053" src="https://github.com/user-attachments/assets/f4e310a9-589b-4767-85ca-0779edf20c45" />

## 👨‍💻 Author
- **Vikas Kurmi**  
- GitHub: [@vikaskurmi17560](https://github.com/vikaskurmi17560)
