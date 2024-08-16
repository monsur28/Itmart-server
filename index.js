const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vnidizo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const productCollection = client.db("ItmartDB").collection("product");

    // Endpoint to get all products with pagination, search, categorization, and sorting
    app.get("/products", async (req, res) => {
      const {
        page = 1,
        limit = 9,
        search = "",
        BrandName,
        Category,
        minPrice,
        maxPrice,
        sortBy,
      } = req.query;

      const query = {};

      if (search) {
        query.ProductName = { $regex: search, $options: "i" };
      }

      if (BrandName) {
        query.BrandName = BrandName;
      }

      if (Category) {
        query.Category = Category;
      }

      if (minPrice || maxPrice) {
        query.Price = {};
        if (minPrice) query.Price.$gte = Number(minPrice);
        if (maxPrice) query.Price.$lte = Number(maxPrice);
      }

      let sort = {};
      if (sortBy === "priceAsc") sort.Price = 1;
      if (sortBy === "priceDesc") sort.Price = -1;
      if (sortBy === "dateNewest") sort.ProductCreationDateTime = -1;
      if (sortBy === "dateOldest") sort.ProductCreationDateTime = 1;

      try {
        const products = await productCollection
          .find(query)
          .sort(sort)
          .skip((page - 1) * limit)
          .limit(Number(limit))
          .toArray();

        const totalProducts = await productCollection.countDocuments(query);

        res.send({
          products,
          totalPages: Math.ceil(totalProducts / limit),
          currentPage: Number(page),
        });
      } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).send({ error: "Failed to fetch products" });
      }
    });

    // Example endpoint to get all products (without filtering)
    app.get("/product", async (req, res) => {
      try {
        const result = await productCollection.find().toArray();
        res.send(result);
      } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).send({ error: "Failed to fetch products" });
      }
    });

    app.get("/product/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await productCollection.findOne(query);
      res.send(result);
    });

    // Connect the client to the server (optional starting in v4.7)
    await client.connect();

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("It Mart Running");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
