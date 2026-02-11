# 🛒🇲🇦 Souq Darat - منصة التجارة المغربية

<div align="center">

![Souq Darat](idurar-crm-erp.svg)

**The Ultimate ERP & Marketplace Platform for Morocco**

منصة إدارة الأعمال والتجارة الإلكترونية للمقاولات المغربية

[![License](https://img.shields.io/badge/License-Fair--Code-blue.svg)](LICENSE)
![Forked from IDURAR](https://img.shields.io/badge/Forked%20from-IDURAR--ERP--CRM-8.2k%20stars-blue)

**English** | [العربية](README_AR.md) | [Français](README_FR.md)

</div>

---

## 🎯 About Souq Darat

**Souq Darat** is a comprehensive ERP (Enterprise Resource Planning) and Marketplace platform tailored specifically for the Moroccan market. Built as an enhanced fork of [IDURAR ERP/CRM](https://github.com/idurar/idurar-erp-crm) (8,200+ stars).

### 🇲🇦 Moroccan Features

| Feature | Description |
|---------|-------------|
| **DH Currency** | Full support for Moroccan Dirham (MAD/DHS) |
| **Phone Numbers** | Moroccan phone format (+212) validation |
| **CMI Payments** | Integrated CMI payment gateway |
| **Arabic/French** | Complete bilingual interface |
| **Moroccan VAT** | 20% VAT support with Moroccan tax rules |
| **City Database** | All Moroccan cities (Casablanca, Rabat, Marrakech, etc.) |

---

## ✨ Key Features

### ERP Module
- 📊 **Accounting** - Full double-entry accounting
- 🧾 **Invoicing** - Generate invoices in Arabic/French
- 📦 **Inventory Management** - Track stock across warehouses
- 👥 **CRM** - Customer relationship management
- 📈 **Sales** - Quotes, orders, deliveries
- 💰 **Purchases** - Suppliers and purchase orders

### E-Commerce
- 🛒 **Online Store** - Full e-commerce capabilities
- 🏪 **Multi-vendor** - Marketplace for multiple sellers
- 🛍️ **Product Catalog** - Categories, variants, inventory
- ⭐ **Reviews & Ratings** - Customer feedback
- 🚚 **Delivery Management** - Track deliveries

### Payment Gateway
- 💳 **CMI Integration** - Moroccan payment gateway
- 🏦 **Bank Transfers** - Offline payment support
- 💵 **Cash on Delivery** - Popular in Morocco

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB 6+
- MongoDB Atlas or local instance

### Installation

```bash
# Clone the repository
git clone https://github.com/Catalyst-thegoat/souq-darat.git
cd souq-darat

# Setup Backend
cd backend
cp .env.example .env
# Edit .env with your MongoDB connection string

npm install
npm run setup

# Setup Frontend (new terminal)
cd ../frontend
npm install
npm run dev
```

### Access Your Platform
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:8080
- **Admin Panel:** http://localhost:5173/admin

Default admin credentials created during setup.

---

## 📁 Project Structure

```
souq-darat/
├── backend/              # Express.js API
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   └── setup/
│   └── package.json
├── frontend/            # React + Vite + Ant Design
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   └── i18n/       # Arabic/French translations
│   └── package.json
├── doc/                 # Documentation
└── features/            # Feature specifications
```

---

## 🌐 Languages Supported

| Language | Status | RTL |
|----------|--------|-----|
| 🇲🇦 Arabic | ✅ Complete | ✅ Yes |
| 🇫🇷 French | ✅ Complete | ❌ No |
| 🇬🇧 English | ✅ Available | ❌ No |

---

## 💰 Moroccan Pricing Plans

| Plan | Price/Month | Features |
|------|-------------|----------|
| **Startup** | 299 MAD | Basic ERP, 5 users |
| **Business** | 799 MAD | Full ERP + E-commerce |
| **Enterprise** | 1999 MAD | Multi-branch, API access |

---

## 🔧 Configuration

### Environment Variables (Backend)

```env
# Server
PORT=8080
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb://localhost:27017/souq-darat

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d

# CMI Payment Gateway
CMI_MERCHANT_ID=your-merchant-id
CMI_SECRET_KEY=your-secret-key
CMI_API_URL=https://test.cmi.ma/payment

# Email (Resend)
RESEND_API_KEY=re_xxxxx

# File Storage (AWS S3 compatible)
AWS_ACCESS_KEY_ID=xxx
AWS_SECRET_ACCESS_KEY=xxx
AWS_REGION=eu-west-3
AWS_BUCKET=souq-darat-files
```

---

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **Redux Toolkit** - State management
- **JWT** - Authentication

### Frontend
- **React 18** - UIVite** - library
- ** Build tool
- **Ant Design 5** - UI component library
- **Redux Toolkit** - State management
- **React Router** - Navigation

### Integrations
- **CMI** - Moroccan payment gateway
- **AWS S3** - File storage
- **Resend** - Email delivery

---

## 📱 Screenshots

![Dashboard](image.png)

---

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md).

### Ways to Contribute:
- 🌐 Add more Moroccan cities
- 🗣️ Improve Arabic/French translations
- 💳 Add more payment gateways (CMI is priority)
- 📊 Add Moroccan tax reports
- 🐛 Fix bugs

---

## 📄 License

This project is licensed under the Fair-code License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **IDURAR Team** - For creating the amazing open-source ERP/CRM we forked
- **Open Source Community** - For continuous support
- **Moroccan Businesses** - For inspiring this project

---

## 📞 Support

- **Email:** hello@souq-darat.com
- **Website:** https://souq-darat.com
- **WhatsApp:** https://wa.me/212600000000

---

<div align="center">

**صُنع بحب للمقاولة المغربية** 🇲🇦

**Made with love for Moroccan businesses**

[Report Bug](https://github.com/Catalyst-thegoat/souq-darat/issues) | [Request Feature](https://github.com/Catalyst-thegoat/souq-darat/issues)

</div>
