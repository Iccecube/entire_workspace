# 🗂️ AssetFlow - IT Asset Management System

<div align="center">

  <p>
    <strong>A comprehensive web application for managing IT assets efficiently</strong>
  </p>
  
  <p>
    <img src="https://img.shields.io/badge/Servoy-Developer-orange?style=for-the-badge&logo=servoy&logoColor=white" alt="Servoy" />
    <img src="https://img.shields.io/badge/PostgreSQL-14-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
    <img src="https://img.shields.io/badge/Chart.js-Visualization-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white" alt="Chart.js" />
    <img src="https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  </p>

</div>

<br>

---

## 🎯 Overview

<table>
<tr>
<td width="50%">

### 🎨 Frontend
- **Framework:** Servoy Web Client
- **UI Components:** Data Grid, Charts
- **Visualization:** Chart.js
- **Forms:** Dashboard, Assets, Employees, Assignments

</td>
<td width="50%">

### ⚙️ Backend
- **Platform:** Servoy Developer
- **Database:** PostgreSQL 14
- **ORM:** Servoy Data Foundation
- **Business Logic:** JavaScript Methods

</td>
</tr>
</table>

---

## ✨ Key Features

<div align="center">

| Feature | Description |
|---------|-------------|
| 📊 **Real-time Dashboard** | Live KPIs with Chart.js visualizations |
| 💼 **Complete Asset CRUD** | Full Create, Read, Update, Delete operations |
| 🔄 **Status Workflow** | 4-state tracking (Stock, Assigned, Repair, Retired) |
| 👥 **Employee Management** | Track assignments and possessions |
| 📈 **Interactive Charts** | Pie charts & bar charts for analytics |
| 🔍 **Advanced Filtering** | Multi-criteria search and sorting |
| 📱 **Responsive Design** | Optimized for all screen sizes |
| 🎨 **Conditional Formatting** | Color-coded status indicators |

</div>

---

## 🧰 Tech Stack

<div align="center">

### Core Technologies
<p>
  <img src="https://img.shields.io/badge/Servoy-Developer-orange?style=flat-square&logo=servoy" alt="Servoy" />
  <img src="https://img.shields.io/badge/PostgreSQL-14-blue?style=flat-square&logo=postgresql" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/JavaScript-ES6+-yellow?style=flat-square&logo=javascript" alt="JavaScript" />
  <img src="https://img.shields.io/badge/Chart.js-3.x-red?style=flat-square&logo=chartdotjs" alt="Chart.js" />
</p>

### Development Tools
<p>
  <img src="https://img.shields.io/badge/Notion-Documentation-black?style=flat-square&logo=notion" alt="Notion" />
  <img src="https://img.shields.io/badge/Trello-Kanban-blue?style=flat-square&logo=trello" alt="Trello" />
  <img src="https://img.shields.io/badge/Git-Version_Control-orange?style=flat-square&logo=git" alt="Git" />
</p>

</div>

---

## 🏗️ Project Architecture

The architecture follows Servoy's best practices for maintainability and scalability.

### 📂 Application Structure

```text
AssetFlow/
├── forms/
│   ├── dashboard           # Main dashboard with KPIs
│   ├── assets              # Asset management form
│   ├── employees           # Employee management form
│   └── assignments         # Assignments tracking form
├── relations/
│   ├── assets_to_assignments
│   ├── employees_to_assignments
│   └── assets_to_history
├── methods/
│   ├── crud/               # Create, Read, Update, Delete
│   ├── validation/         # Business rules
│   ├── charts/             # Chart.js integration
│   └── utils/              # Helper functions
├── valueLists/
│   ├── status_list         # Asset statuses
│   ├── type_list           # Hardware/Software
│   └── category_list       # Asset categories
└── database/
    ├── assets              # 11 fields
    ├── employees           # 4 fields
    └── assignments         # 5 fields
```

---

## 📦 Installation & Setup

### 1️⃣ Prerequisites

- ✅ Servoy Developer installed
- ✅ PostgreSQL 14 or higher
- ✅ Java Development Kit (JDK) 11+

### 2️⃣ Database Setup

**Create Database Instance:**
```bash
psql -U postgres -c "CREATE DATABASE assetflowdb;"
```

**Create Database User:**
```bash
psql -U postgres -c "CREATE ROLE assetflow_user WITH LOGIN PASSWORD 'your_password';"
psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE assetflowdb TO assetflow_user;"
```

**Grant Schema Permissions:**
```bash
psql -U postgres -d assetflowdb -c "GRANT ALL PRIVILEGES ON SCHEMA public TO assetflow_user;"
psql -U postgres -d assetflowdb -c "GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO assetflow_user;"
```

### 3️⃣ Servoy Configuration

**Configure Database Connection:**
- Host: `localhost`
- Port: `5432` (or `5433` if modified)
- Database: `assetflowdb`
- User: `assetflow_user`
- Password: `your_password`

**Import Solution:**
1. Open Servoy Developer
2. Import AssetFlow solution package
3. Configure database connection in Resources
4. Synchronize database tables

### 4️⃣ Run Application

```bash
# Select AssetFlow solution in Servoy
# Click "Run in Test Client" or "Run in Smart Client"
```

<div align="center">

| Client Type | Description |
|-------------|-------------|
| 🌐 **Web Client** | Browser-based interface |
| 💻 **Smart Client** | Desktop application |
| 📱 **Mobile** | Mobile-optimized views |

</div>

---

## 🗄️ Database Schema

<details>
<summary><b>📋 View Database Structure</b></summary>

### Table: `assets`

| Column | Type | Description |
|--------|------|-------------|
| `asset_id` | Integer (PK) | Unique identifier |
| `name` | Varchar(100) | Asset name |
| `type` | Varchar(20) | Hardware or Software |
| `tag_number` | Varchar(50) | Barcode/License key |
| `status` | Varchar(20) | Current status |
| `total_seats` | Integer | Licenses (SW) or 1 (HW) |
| `purchase_date` | Date | Purchase date |
| `expiration_date` | Date | License expiry (SW only) |
| `cost` | Decimal | Total cost |

### Table: `employees`

| Column | Type | Description |
|--------|------|-------------|
| `employee_id` | Integer (PK) | Unique identifier |
| `name` | Varchar(100) | Employee name |
| `email` | Varchar(100) | Email address |
| `is_active` | Integer | 1=Active, 0=Inactive |

### Table: `assignments`

| Column | Type | Description |
|--------|------|-------------|
| `assignment_id` | Integer (PK) | Unique identifier |
| `asset_id` | Integer (FK) | Link to assets |
| `employee_id` | Integer (FK) | Link to employees |
| `assigned_date` | Datetime | Assignment date |
| `returned_date` | Datetime | NULL if active |

**Relationships:** 1:N between `assets`/`employees` and `assignments`

</details>

---

## 🎮 Usage Guide

### Quick Start

1. **Initial Setup**
   - Add employees to the system
   - Import or create asset records
   - Configure asset categories

2. **Asset Workflow**
   ```
   Purchase → In Stock → Assign to Employee → (Repair if needed) → Retire
   ```

3. **Common Tasks**

<div align="center">

| Task | Steps |
|------|-------|
| 🆕 **Add Asset** | Assets → + Add Asset → Fill details → Save |
| 👤 **Assign Asset** | Assets → Select → Assign → Choose Employee |
| 🔧 **Report Issue** | Assets → Select → Report Issue → Add Description |
| 📊 **View Dashboard** | Home → View KPIs and Charts |
| 🔍 **Search Assets** | Assets → Search field → Enter criteria |

</div>

### Status Indicators

| Status | Color | Icon | Description |
|--------|-------|------|-------------|
| **In Stock** | 🟢 Green | ✓ | Available in inventory |
| **Assigned** | 🔵 Blue | 👤 | Currently in use |
| **Repair** | 🟠 Orange | 🔧 | Under maintenance |
| **Retired** | ⚫ Gray | ✕ | Decommissioned |

---

## 🔧 Technical Challenges & Solutions

<details>
<summary><b>💡 View Resolved Issues</b></summary>

### 1. Foundset Context Error
**Issue:** `"Access to Foundset not initialized"` when deleting from Data Grid

**Solution:**
```javascript
// ❌ Wrong
foundset.deleteRecord();

// ✅ Correct
record.foundset.deleteRecord(record);
```

### 2. Chart.js Compatibility
**Issue:** Chart.js rejects Java objects (Long, BigDecimal)

**Solution:**
```javascript
// Convert Java types to JavaScript primitives
labelsArray.push("" + dataset.getValue(i, 1));  // String conversion
dataArray.push(1 * dataset.getValue(i, 2));     // Number conversion
```

### 3. Event Handling
**Issue:** Search only triggers after clicking elsewhere

**Solution:**
```javascript
// Use onAction (Enter key) instead of onDataChange (blur)
function onSearchAction() {
    // Search executes immediately
}
```

### 4. PostgreSQL Port Conflict
**Issue:** Multiple PostgreSQL versions on same system

**Solution:**
```bash
# Edit postgresql.conf
port = 5433

# Restart service
brew services restart postgresql
```

### 5. Default Values
**Issue:** `is_active` field not initialized to 1

**Solution:**
```javascript
// Set default on record creation
function onNewRecord() {
    record.is_active = 1;
}
```

</details>

---

## 🚀 Roadmap

### Planned Features

- [ ] **Audit History** - Implement `asset_history` table for complete action logging
- [ ] **Notification System** - Email alerts for expiring licenses (30 days warning)
- [ ] **Reports & Export** - PDF/Excel generation for inventory reports
- [ ] **Budget Management** - Track spending and forecast expenses by department
- [ ] **Approval Workflow** - Multi-level approval for asset requests
- [ ] **Advanced Search** - Global multi-field intelligent search
- [ ] **Mobile App** - Native mobile application for iOS/Android
- [ ] **API Integration** - REST API for third-party integrations

---

## 📈 Project Management

This project was developed using agile methodologies:

<div align="center">

| Tool | Purpose |
|------|---------|
| 📝 **Notion** | Documentation, requirements, knowledge base |
| 📊 **Trello** | Kanban board for task tracking and sprints |
| 🎯 **Git** | Version control and collaboration |

</div>

### Development Workflow

```
Backlog → Conception → To Do → Doing → Testing → Done
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

<div align="center">

Distributed under the **MIT License**. See `LICENSE` for more information.

</div>

---

## 👨‍💻 Author

<div align="center">

**Omar Ignammas**

[![LinkedIn](https://img.shields.io/badge/-LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/omar-ignammas)
[![GitHub](https://img.shields.io/badge/-GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/omarignammas)
[![Portfolio](https://img.shields.io/badge/-Portfolio-FF5722?style=for-the-badge&logo=google-chrome&logoColor=white)](https://ignmas.me)

</div>

---

## 🙏 Acknowledgments

- **Servoy Community** - Excellent documentation and support
- **PostgreSQL Team** - Robust and reliable database engine
- **Chart.js Team** - Powerful visualization library
- **Mentor/Supervisor** - Guidance and valuable feedback throughout development

---

<div align="center">

### ⭐️ Star this repository if you find it helpful!

**Built with ❤️ using Servoy**

<img src="https://raw.githubusercontent.com/Trilokia/Trilokia/379277808c61ef204768a61bbc5d25bc7798ccf1/bottom_header.svg" width="100%" />

</div>
