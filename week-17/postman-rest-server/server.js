const express = require("express");
const fs = require("fs").promises;
const path = require("path");

const app = express();
const PORT = 3001;
const DB_FILE = path.join(__dirname, "data.json");

app.use(express.json());

async function initializeDatabase() {
  try {
    await fs.access(DB_FILE);
  } catch {
    const sampleTodos = [
      {
        id: 1,
        title: "Buy groceries",
        description: "Milk, eggs, bread, butter",
        completed: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: 2,
        title: "Walk the dog",
        description: "Take Max for a 30-minute walk",
        completed: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: 3,
        title: "Finish project report",
        description: "Complete Q4 analysis report",
        completed: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: 4,
        title: "Call mom",
        description: "Weekly check-in call",
        completed: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: 5,
        title: "Schedule dentist appointment",
        description: "Annual checkup",
        completed: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: 6,
        title: "Pay electricity bill",
        description: "Due by end of month",
        completed: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: 7,
        title: "Clean garage",
        description: "Organize tools and donate old items",
        completed: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: 8,
        title: "Read book chapter",
        description: "Chapter 5 of 'Clean Code'",
        completed: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: 9,
        title: "Update resume",
        description: "Add recent project experience",
        completed: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: 10,
        title: "Gym workout",
        description: "Leg day routine",
        completed: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: 11,
        title: "Prepare presentation",
        description: "Slides for Monday meeting",
        completed: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: 12,
        title: "Fix kitchen faucet",
        description: "Replace washer to stop leak",
        completed: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: 13,
        title: "Order birthday gift",
        description: "Gift for Sarah's birthday",
        completed: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: 14,
        title: "Backup laptop",
        description: "Full system backup to external drive",
        completed: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: 15,
        title: "Learn TypeScript basics",
        description: "Complete online tutorial",
        completed: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: 16,
        title: "Plan weekend trip",
        description: "Research hotels and activities",
        completed: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: 17,
        title: "Renew car insurance",
        description: "Compare quotes and renew policy",
        completed: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: 18,
        title: "Water plants",
        description: "Indoor and balcony plants",
        completed: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: 19,
        title: "Review pull requests",
        description: "Check team's pending PRs",
        completed: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: 20,
        title: "Meal prep Sunday",
        description: "Prepare lunches for the week",
        completed: false,
        createdAt: new Date().toISOString(),
      },
    ];
    await fs.writeFile(DB_FILE, JSON.stringify(sampleTodos, null, 2));
  }
}

app.get("/todos", async (req, res) => {
  try {
    const data = await fs.readFile(DB_FILE, "utf8");
    res.json(JSON.parse(data));
  } catch (error) {
    res.status(500).json({ error: "Failed to read todos" });
  }
});

app.get("/todos/:id", async (req, res) => {
  try {
    const data = await fs.readFile(DB_FILE, "utf8");
    const todos = JSON.parse(data);
    const todo = todos.find((t) => t.id === parseInt(req.params.id));
    if (!todo) return res.status(404).json({ error: "Todo not found" });
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: "Failed to read todo" });
  }
});

app.post("/todos", async (req, res) => {
  try {
    const data = await fs.readFile(DB_FILE, "utf8");
    const todos = JSON.parse(data);
    const newTodo = {
      id: todos.length > 0 ? Math.max(...todos.map((t) => t.id)) + 1 : 1,
      title: req.body.title || "",
      description: req.body.description || "",
      completed: req.body.completed || false,
      createdAt: new Date().toISOString(),
    };
    todos.push(newTodo);
    await fs.writeFile(DB_FILE, JSON.stringify(todos, null, 2));
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: "Failed to create todo" });
  }
});

app.put("/todos/:id", async (req, res) => {
  try {
    const data = await fs.readFile(DB_FILE, "utf8");
    const todos = JSON.parse(data);
    const index = todos.findIndex((t) => t.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ error: "Todo not found" });
    todos[index] = {
      id: parseInt(req.params.id),
      title: req.body.title,
      description: req.body.description,
      completed: req.body.completed,
      createdAt: todos[index].createdAt,
      updatedAt: new Date().toISOString(),
    };
    await fs.writeFile(DB_FILE, JSON.stringify(todos, null, 2));
    res.json(todos[index]);
  } catch (error) {
    res.status(500).json({ error: "Failed to update todo" });
  }
});

app.patch("/todos/:id", async (req, res) => {
  try {
    const data = await fs.readFile(DB_FILE, "utf8");
    const todos = JSON.parse(data);
    const index = todos.findIndex((t) => t.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ error: "Todo not found" });
    todos[index] = {
      ...todos[index],
      ...(req.body.title !== undefined && { title: req.body.title }),
      ...(req.body.description !== undefined && {
        description: req.body.description,
      }),
      ...(req.body.completed !== undefined && {
        completed: req.body.completed,
      }),
      updatedAt: new Date().toISOString(),
    };
    await fs.writeFile(DB_FILE, JSON.stringify(todos, null, 2));
    res.json(todos[index]);
  } catch (error) {
    res.status(500).json({ error: "Failed to patch todo" });
  }
});

app.delete("/todos/:id", async (req, res) => {
  try {
    const data = await fs.readFile(DB_FILE, "utf8");
    let todos = JSON.parse(data);
    const initialLength = todos.length;
    todos = todos.filter((t) => t.id !== parseInt(req.params.id));
    if (todos.length === initialLength)
      return res.status(404).json({ error: "Todo not found" });
    await fs.writeFile(DB_FILE, JSON.stringify(todos, null, 2));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete todo" });
  }
});

async function startServer() {
  await initializeDatabase();
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();
