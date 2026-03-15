import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import Database from "better-sqlite3";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("bihar_bowl.db");

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'user', -- 'user', 'franchise_owner', 'admin'
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS branches (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    location TEXT NOT NULL,
    qr_code_url TEXT,
    owner_id INTEGER,
    FOREIGN KEY(owner_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS menu (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    price REAL NOT NULL,
    image_url TEXT,
    is_veg INTEGER DEFAULT 1
  );

  CREATE TABLE IF NOT EXISTS documents (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    category TEXT NOT NULL, -- 'brand', 'franchisor', 'franchisee', 'customer', 'payment', 'security'
    file_url TEXT,
    uploaded_by INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(uploaded_by) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS design_guides (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category TEXT NOT NULL, -- 'interior', 'kitchen', 'furniture', 'branding', 'menu', 'counter', 'packing', 'uniform', 'mithila'
    title TEXT NOT NULL,
    description TEXT,
    image_urls TEXT, -- JSON array of strings
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS franchisees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    location TEXT NOT NULL,
    contact TEXT,
    email TEXT,
    document_list TEXT, -- JSON array of strings
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS rules (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS franchise_applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    city TEXT NOT NULL,
    budget TEXT NOT NULL,
    message TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_name TEXT NOT NULL,
    rating INTEGER NOT NULL,
    comment TEXT,
    image_url TEXT,
    is_approved INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_name TEXT NOT NULL,
    customer_phone TEXT,
    items TEXT NOT NULL,
    total REAL NOT NULL,
    status TEXT DEFAULT 'pending', -- 'pending', 'accepted', 'preparing', 'out_for_delivery', 'delivered'
    payment_status TEXT DEFAULT 'pending', -- 'pending', 'paid'
    branch_id INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(branch_id) REFERENCES branches(id)
  );
`);

// Migration: Ensure customer_phone exists in orders table
try {
  db.prepare("SELECT customer_phone FROM orders LIMIT 1").get();
} catch (e) {
  try {
    db.exec("ALTER TABLE orders ADD COLUMN customer_phone TEXT");
  } catch (alterError) {
    console.log("Migration (customer_phone) skipped or failed:", alterError);
  }
}

// Seed initial data if empty
const userCount = db.prepare("SELECT COUNT(*) as count FROM users").get() as { count: number };
if (userCount.count === 0) {
  const insertUser = db.prepare("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)");
  insertUser.run("Admin User", "admin@biharbowl.com", "admin123", "admin");
  insertUser.run("Patna Branch Owner", "patna@biharbowl.com", "owner123", "franchise_owner");
  insertUser.run("Delhi Branch Owner", "delhi@biharbowl.com", "owner123", "franchise_owner");
  
  const insertBranch = db.prepare("INSERT INTO branches (name, location, qr_code_url, owner_id) VALUES (?, ?, ?, ?)");
  insertBranch.run("Patna Main", "Boring Road, Patna", "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=BiharBowlPatna", 2);
  insertBranch.run("Delhi South", "Saket, New Delhi", "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=BiharBowlDelhi", 3);
}

const menuCount = db.prepare("SELECT COUNT(*) as count FROM menu").get() as { count: number };
if (menuCount.count === 0) {
  const insert = db.prepare("INSERT INTO menu (name, category, description, price, image_url, is_veg) VALUES (?, ?, ?, ?, ?, ?)");
  // ==========================================================================
  // ADMIN TIP: HOW TO ADD NEW MENU ITEMS
  // 1. Add a new array to the 'seedData' below.
  // 2. Format: ["Item Name", "Category", "Description", Price, "/image_path.jpg", is_veg]
  // 3. Category can be: "Veg", "Non-Veg", "Drinks", "Dessert", etc.
  // 4. is_veg: 1 for Veg, 0 for Non-Veg.
  // ==========================================================================
  const seedData = [
    ["Classic Sattu Litti", "Veg", "Traditional roasted wheat balls stuffed with spiced sattu, served with chokha.", 120, "/menu1.jpg", 1],
    ["Desi Ghee Litti", "Veg", "Litti dipped in pure desi ghee for an authentic rich taste.", 150, "/menu2.jpg", 1],
    ["Paneer Litti", "Veg", "Litti stuffed with a mix of sattu and spiced paneer.", 180, "/menu3.png", 1],
    ["Mushroom Litti", "Veg", "Litti with a savory mushroom and sattu filling.", 190, "/menu_mushroom.png", 1],
    ["Corn & Cheese Litti", "Veg", "A modern twist with sweet corn and melted cheese.", 210, "/menu_corn_cheese.jpg", 1],
    ["Paneer Tikka Litti", "Veg", "Litti stuffed with smoky paneer tikka and spices.", 230, "/menu_paneer_tikka.png", 1],
    ["Mixed Veg Litti", "Veg", "Healthy litti stuffed with a medley of seasonal vegetables.", 160, "/menu_mixed_veg.jpg", 1],
    ["Chicken Keema Litti", "Non-Veg", "Litti stuffed with spicy chicken keema.", 220, "/menu_chicken_keema.jpg", 0],
    ["Mutton Litti", "Non-Veg", "Litti served with traditional Bihari mutton curry.", 350, "/menu_mutton.png", 0],
    ["Fish Litti", "Non-Veg", "Litti served with spicy mustard fish curry.", 320, "/menu_fish.png", 0],
    ["Egg Litti", "Non-Veg", "Litti with a spicy egg bhurji filling.", 180, "/menu_egg.png", 0],
    ["Chicken Curry Litti", "Non-Veg", "Classic litti served with home-style chicken curry.", 280, "/menu_chicken_curry.png", 0],
    ["Fish Fry Litti", "Non-Veg", "Litti served with crispy Bihari style fish fry.", 340, "/menu_fish_fry.png", 0],
    ["Egg Masala Litti", "Non-Veg", "Litti served with rich egg masala gravy.", 200, "/menu_egg_masala.png", 0],
    ["Chicken Fry Litti", "Non-Veg", "Litti served with spicy roasted chicken fry.", 300, "/menu_chicken_fry.png", 0],
    ["Sattu Sharbat", "Drinks", "Refreshing traditional drink made with sattu, lemon, and spices.", 60, "/drink_sattu.jpg", 1],
    ["Matka Lassi", "Drinks", "Thick creamy lassi served in a traditional clay pot.", 80, "/drink_lassi.jpg", 1],
    ["Masala Chai", "Drinks", "Traditional Indian tea with spices and ginger.", 40, "/drink_chai.jpg", 1],
    ["Aam Panna", "Drinks", "Tangy and sweet raw mango drink.", 70, "/drink_panna.jpg", 1],
    ["Jaljeera", "Drinks", "Cumin-based spicy and tangy refreshing drink.", 50, "/drink_jaljeera.jpg", 1],
    ["Bel Sharbat", "Drinks", "Healthy and cooling wood apple nectar.", 90, "/drink_bel.jpg", 1],
    ["Bihar Bowl Special Thali", "Combos", "A complete meal with 2 Litti, Chokha, Chutney, Salad, and a sweet.", 250, "/combo_thali.jpg", 1],
    ["Litti Platter", "Combos", "Assorted platter with 4 types of mini litti and various dips.", 320, "/combo_platter.png", 1],
    ["Sattu Paratha", "Veg", "Whole wheat flatbread stuffed with spiced sattu, served with curd and pickle.", 110, "/menu_sattu_paratha.jpg", 1],
    ["Dal Pitha", "Veg", "Steamed rice flour dumplings stuffed with spiced lentil paste.", 140, "/menu_dal_pitha.jpg", 1],
    ["Bihari Chicken Keema", "Non-Veg", "Minced chicken cooked with traditional Bihari spices and herbs.", 260, "/menu_chicken_keema.png", 0],
    ["Champaran Meat", "Non-Veg", "Slow-cooked mutton in an earthen pot with whole garlic and spices.", 450, "/menu_champaran_meat.jpg", 0]
  ];
  seedData.forEach(item => insert.run(...item));
}

// Update existing menu items to use local images if they are still using picsum
db.prepare("UPDATE menu SET image_url = ? WHERE name = ?").run("/menu1.jpg", "Classic Sattu Litti");
db.prepare("UPDATE menu SET image_url = ? WHERE name = ?").run("/menu2.jpg", "Desi Ghee Litti");
db.prepare("UPDATE menu SET image_url = ? WHERE name = ?").run("/menu3.png", "Paneer Litti");
db.prepare("UPDATE menu SET image_url = ? WHERE name = ?").run("/menu_chicken_curry.png", "Chicken Curry Litti");
db.prepare("UPDATE menu SET image_url = ? WHERE name = ?").run("/menu_chicken_fry.png", "Chicken Fry Litti");
db.prepare("UPDATE menu SET image_url = ? WHERE name = ?").run("/combo_platter.png", "Litti Platter");
db.prepare("UPDATE menu SET image_url = ? WHERE name = ?").run("/menu_mushroom.png", "Mushroom Litti");
db.prepare("UPDATE menu SET image_url = ? WHERE name = ?").run("/menu_corn_cheese.jpg", "Corn & Cheese Litti");
db.prepare("UPDATE menu SET image_url = ? WHERE name = ?").run("/menu_paneer_tikka.png", "Paneer Tikka Litti");
db.prepare("UPDATE menu SET image_url = ? WHERE name = ?").run("/menu_mixed_veg.jpg", "Mixed Veg Litti");
db.prepare("UPDATE menu SET image_url = ? WHERE name = ?").run("/menu_chicken_keema.jpg", "Chicken Keema Litti");
db.prepare("UPDATE menu SET image_url = ? WHERE name = ?").run("/menu_mutton.png", "Mutton Litti");
db.prepare("UPDATE menu SET image_url = ? WHERE name = ?").run("/menu_fish.png", "Fish Litti");
db.prepare("UPDATE menu SET image_url = ? WHERE name = ?").run("/menu_egg.png", "Egg Litti");
db.prepare("UPDATE menu SET image_url = ? WHERE name = ?").run("/menu_chicken_curry.jpg", "Chicken Curry Litti");
db.prepare("UPDATE menu SET image_url = ? WHERE name = ?").run("/menu_fish_fry.png", "Fish Fry Litti");
db.prepare("UPDATE menu SET image_url = ? WHERE name = ?").run("/menu_egg_masala.png", "Egg Masala Litti");
db.prepare("UPDATE menu SET image_url = ? WHERE name = ?").run("/menu_chicken_fry.jpg", "Chicken Fry Litti");
db.prepare("UPDATE menu SET image_url = ? WHERE name = ?").run("/drink_sattu.jpg", "Sattu Sharbat");
db.prepare("UPDATE menu SET image_url = ? WHERE name = ?").run("/drink_lassi.jpg", "Matka Lassi");
db.prepare("UPDATE menu SET image_url = ? WHERE name = ?").run("/drink_chai.jpg", "Masala Chai");
db.prepare("UPDATE menu SET image_url = ? WHERE name = ?").run("/drink_panna.jpg", "Aam Panna");
db.prepare("UPDATE menu SET image_url = ? WHERE name = ?").run("/drink_jaljeera.jpg", "Jaljeera");
db.prepare("UPDATE menu SET image_url = ? WHERE name = ?").run("/drink_bel.jpg", "Bel Sharbat");
db.prepare("UPDATE menu SET image_url = ? WHERE name = ?").run("/combo_thali.jpg", "Bihar Bowl Special Thali");
db.prepare("UPDATE menu SET image_url = ? WHERE name = ?").run("/combo_platter.jpg", "Litti Platter");

db.prepare("UPDATE design_guides SET image_urls = ? WHERE title = ?").run(JSON.stringify(["/design_int1.jpg", "/design_int2.jpg"]), "Rustic Mithila Interior");
db.prepare("UPDATE design_guides SET image_urls = ? WHERE title = ?").run(JSON.stringify(["/design_kit1.jpg", "/design_kit2.jpg"]), "Standard Kitchen Layout");
db.prepare("UPDATE design_guides SET image_urls = ? WHERE title = ?").run(JSON.stringify(["/design_uni1.jpg", "/design_uni2.jpg"]), "Staff Uniform Design");

const ruleCount = db.prepare("SELECT COUNT(*) as count FROM rules").get() as { count: number };
if (ruleCount.count === 0) {
  const insertRule = db.prepare("INSERT INTO rules (content) VALUES (?)");
  const rules = [
    "Maintain 100% hygiene in the kitchen at all times.",
    "Use only pure desi ghee for all Litti preparations.",
    "Sattu must be sourced from certified Bihar vendors.",
    "No smoking or alcohol consumption allowed within the premises.",
    "Staff must wear clean uniforms and hairnets during service.",
    "All customer feedback must be recorded and addressed within 24 hours.",
    "Standardized recipes must be followed strictly for consistency.",
    "Waste management protocols must be followed daily.",
    "Regular pest control must be conducted every month.",
    "Respect the cultural heritage of Bihar in all brand communications."
  ];
  rules.forEach(rule => insertRule.run(rule));
}

const docCount = db.prepare("SELECT COUNT(*) as count FROM documents").get() as { count: number };
if (docCount.count === 0) {
  const insertDoc = db.prepare("INSERT INTO documents (title, category, file_url) VALUES (?, ?, ?)");
  insertDoc.run("Brand Identity Guide", "brand", "https://example.com/brand-guide.pdf");
  insertDoc.run("Franchisor Agreement Template", "franchisor", "https://example.com/franchisor-agreement.pdf");
  insertDoc.run("Franchisee Operations Manual", "franchisee", "https://example.com/ops-manual.pdf");
}

const designCount = db.prepare("SELECT COUNT(*) as count FROM design_guides").get() as { count: number };
if (designCount.count === 0) {
  const insertDesign = db.prepare("INSERT INTO design_guides (category, title, description, image_urls) VALUES (?, ?, ?, ?)");
  insertDesign.run("interior", "Rustic Mithila Interior", "A blend of traditional Mithila art and modern rustic furniture.", JSON.stringify(["/design_int1.jpg", "/design_int2.jpg", "/design_placeholder1.jpg", "/design_placeholder2.jpg"]));
  insertDesign.run("kitchen", "Standard Kitchen Layout", "Optimized workflow for high-volume litti production.", JSON.stringify(["/design_kit1.jpg", "/design_kit2.jpg", "/design_placeholder3.jpg", "/design_placeholder4.jpg"]));
  insertDesign.run("furniture", "Furniture Placement", "Comfortable seating arrangements that maximize space and comfort.", JSON.stringify(["/design_placeholder1.jpg", "/design_placeholder2.jpg"]));
  insertDesign.run("branding", "Branding Board", "Our visual identity, colors, and typography guidelines.", JSON.stringify(["/design_placeholder3.jpg", "/design_placeholder4.jpg"]));
  insertDesign.run("menu", "Menu Item Design", "Visual presentation standards for our signature dishes.", JSON.stringify(["/design_placeholder1.jpg", "/design_placeholder2.jpg"]));
  insertDesign.run("counter", "Counter Layout", "Efficient POS and customer interaction area design.", JSON.stringify(["/design_placeholder3.jpg", "/design_placeholder4.jpg"]));
  insertDesign.run("packing", "Packing Design", "Eco-friendly and brand-consistent delivery packaging.", JSON.stringify(["/design_placeholder1.jpg", "/design_placeholder2.jpg"]));
  insertDesign.run("uniform", "Staff Uniform Design", "Traditional yet professional attire for our team.", JSON.stringify(["/design_uni1.jpg", "/design_uni2.jpg", "/design_placeholder3.jpg", "/design_placeholder4.jpg"]));
  insertDesign.run("mithila", "Rustic Mithila Theme", "The core aesthetic elements that define Bihar Bowl.", JSON.stringify(["/design_placeholder1.jpg", "/design_placeholder2.jpg"]));
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Auth Routes
  app.post("/api/auth/register", (req, res) => {
    const { name, email, password } = req.body;
    try {
      const stmt = db.prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
      const info = stmt.run(name, email, password);
      res.json({ success: true, user: { id: info.lastInsertRowid, name, email, role: 'user' } });
    } catch (e: any) {
      res.status(400).json({ success: false, message: "Email already exists" });
    }
  });

  app.post("/api/auth/login", (req, res) => {
    const { email, password } = req.body;
    const user = db.prepare("SELECT * FROM users WHERE email = ? AND password = ?").get(email, password) as any;
    if (user) {
      const branch = db.prepare("SELECT * FROM branches WHERE owner_id = ?").get(user.id) as any;
      res.json({ success: true, user: { id: user.id, name: user.name, email: user.email, role: user.role, branch_id: branch?.id } });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  });

  app.post("/api/auth/forgot-password", (req, res) => {
    const { email } = req.body;
    const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
    if (user) {
      res.json({ success: true, message: "Password reset link sent to your email (simulated)" });
    } else {
      res.status(404).json({ success: false, message: "Email not found" });
    }
  });

  // Branch Routes
  app.get("/api/branches", (req, res) => {
    const branches = db.prepare("SELECT * FROM branches").all();
    res.json(branches);
  });

  // API Routes
  app.get("/api/menu", (req, res) => {
    const menu = db.prepare("SELECT * FROM menu").all();
    res.json(menu);
  });

  app.post("/api/franchise", (req, res) => {
    const { name, phone, email, city, budget, message } = req.body;
    const stmt = db.prepare("INSERT INTO franchise_applications (name, phone, email, city, budget, message) VALUES (?, ?, ?, ?, ?, ?)");
    stmt.run(name, phone, email, city, budget, message);
    res.json({ success: true, message: "Application submitted successfully!" });
  });

  app.get("/api/reviews", (req, res) => {
    const reviews = db.prepare("SELECT * FROM reviews WHERE is_approved = 1 ORDER BY created_at DESC").all();
    res.json(reviews);
  });

  app.post("/api/reviews", (req, res) => {
    const { user_name, rating, comment } = req.body;
    const stmt = db.prepare("INSERT INTO reviews (user_name, rating, comment) VALUES (?, ?, ?)");
    stmt.run(user_name, rating, comment);
    res.json({ success: true, message: "Review submitted for moderation." });
  });

  app.post("/api/orders", (req, res) => {
    const { customer_name, customer_phone, items, total, branch_id } = req.body;
    const stmt = db.prepare("INSERT INTO orders (customer_name, customer_phone, items, total, branch_id) VALUES (?, ?, ?, ?, ?)");
    const info = stmt.run(customer_name, customer_phone, JSON.stringify(items), total, branch_id);
    res.json({ success: true, order_id: info.lastInsertRowid, message: "Order placed successfully!" });
  });

  app.get("/api/orders/:id", (req, res) => {
    const order = db.prepare("SELECT o.*, b.name as branch_name, b.qr_code_url FROM orders o LEFT JOIN branches b ON o.branch_id = b.id WHERE o.id = ?").get(req.params.id);
    res.json(order);
  });

  // Documentation & Design Guide
  app.get("/api/documents", (req, res) => {
    const docs = db.prepare("SELECT * FROM documents ORDER BY created_at DESC").all();
    res.json(docs);
  });

  app.post("/api/documents", (req, res) => {
    const { title, category, file_url, uploaded_by } = req.body;
    const stmt = db.prepare("INSERT INTO documents (title, category, file_url, uploaded_by) VALUES (?, ?, ?, ?)");
    stmt.run(title, category, file_url, uploaded_by);
    res.json({ success: true });
  });

  app.get("/api/design-guides", (req, res) => {
    const guides = db.prepare("SELECT * FROM design_guides ORDER BY created_at DESC").all();
    res.json(guides);
  });

  app.get("/api/rules", (req, res) => {
    const rules = db.prepare("SELECT * FROM rules ORDER BY created_at").all();
    res.json(rules);
  });

  app.get("/api/franchisees", (req, res) => {
    const franchisees = db.prepare("SELECT * FROM franchisees ORDER BY created_at DESC").all();
    res.json(franchisees);
  });

  app.post("/api/franchisees", (req, res) => {
    const { name, location, contact, email, document_list } = req.body;
    const stmt = db.prepare("INSERT INTO franchisees (name, location, contact, email, document_list) VALUES (?, ?, ?, ?, ?)");
    stmt.run(name, location, contact, email, JSON.stringify(document_list || []));
    res.json({ success: true });
  });

  // Menu Management
  app.post("/api/admin/menu", (req, res) => {
    const { name, category, description, price, image_url, is_veg } = req.body;
    const stmt = db.prepare("INSERT INTO menu (name, category, description, price, image_url, is_veg) VALUES (?, ?, ?, ?, ?, ?)");
    stmt.run(name, category, description, price, image_url, is_veg ? 1 : 0);
    res.json({ success: true });
  });

  app.delete("/api/admin/menu/:id", (req, res) => {
    db.prepare("DELETE FROM menu WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  });

  app.get("/api/user/orders/:phone", (req, res) => {
    const orders = db.prepare("SELECT o.*, b.name as branch_name FROM orders o LEFT JOIN branches b ON o.branch_id = b.id WHERE o.customer_phone = ? ORDER BY o.created_at DESC").all(req.params.phone);
    res.json(orders);
  });

  // Admin/Owner Routes
  app.get("/api/admin/franchise", (req, res) => {
    const applications = db.prepare("SELECT * FROM franchise_applications ORDER BY created_at DESC").all();
    res.json(applications);
  });

  app.get("/api/admin/orders", (req, res) => {
    const { branch_id } = req.query;
    let orders;
    if (branch_id) {
      orders = db.prepare("SELECT * FROM orders WHERE branch_id = ? ORDER BY created_at DESC").all(branch_id);
    } else {
      orders = db.prepare("SELECT * FROM orders ORDER BY created_at DESC").all();
    }
    res.json(orders);
  });

  app.post("/api/admin/orders/status", (req, res) => {
    const { id, status, payment_status } = req.body;
    if (status) {
      db.prepare("UPDATE orders SET status = ? WHERE id = ?").run(status, id);
    }
    if (payment_status) {
      db.prepare("UPDATE orders SET payment_status = ? WHERE id = ?").run(payment_status, id);
    }
    res.json({ success: true });
  });

  app.post("/api/admin/reviews/approve", (req, res) => {
    const { id } = req.body;
    db.prepare("UPDATE reviews SET is_approved = 1 WHERE id = ?").run(id);
    res.json({ success: true });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
