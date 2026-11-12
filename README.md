# PriceWise-SA

PriceWise SA(prototype) — Essential Goods Price Comparison & Smart Basket Optimiser

**Compare • Plan • Save** — A full-stack web application designed to help consumers compare everyday product prices across multiple retail stores, plan monthly shopping budgets, and optimize basket costs.

About the Project

**PriceWise SA** addresses grocery inflation and price transparency by aggregating product pricing across competing supermarkets (generalized as Store 1, Store 2, and Store 3). Users can search items by name, brand, or category, view individual store price tags and data freshness timestamps, track historical trends through interactive charts, and run a **Smart Shopping Basket Optimiser** to discover whether buying everything from a single store or splitting purchases yields the lowest total cost.

Core Features
Multi-Field Product Search & Filtering:** Search items dynamically by product name, brand, or category with instant visual comparison badges.
Smart Basket Optimiser:** Evaluates your shopping list against store catalogs to present:
Single-Store Best:* The cheapest supermarket to buy your entire basket in one trip.
Multi-Store Optimized:* The absolute lowest cost achieved by splitting items across the cheapest stores.
Budget Option:* Tracks whether your basket stays within your user-defined monthly limit[cite: 1].
3-Store Price History Trends:** Interactive Chart.js modals that plot multi-month historical price movements simultaneously across all three stores[cite: 1].
Real-Time Budget Dashboard:** Monitors monthly budgets, spent amounts, remaining funds, and estimated multi-store savings dynamically as quantities change[cite: 1].
Data Freshness Indicators:** Displays timestamps for when individual store prices were last verified[cite: 1]. 
Button & Modal: Added an alert button next to each product in the catalog. Clicking it opens a quick prompt modal where users can type their target threshold price (e.g., R32.00).

Host:https://bongani112-pricewise-sa.vercel.app/

Tech Stack

* **Frontend:** HTML5, CSS3, Modern JavaScript (ES6+), Chart.js[cite: 1]
* **Backend API:** Node.js, Express[cite: 1]
* **Database:** PostgreSQL (Relational schema tracking products, retailers, and timestamped price history logs)[cite: 1]



 Project Repository Structure

```text
pricewise-sa/
├── frontend/             # Single-page prototype (index.html)
├── backend/              # Express REST API server (server.js)
├── database/             # Relational migration setup (schema.sql)
├── README.md             # Project documentation
└── .gitignore            # Ignored files (node_modules, .env)
