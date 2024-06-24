import express, { Express, Request, Response } from "express"
import dotenv from "dotenv"
import cors from "cors"

// import icecreamRoutes from "./routes/icecreamRoutes"
// import drinkRoutes from "./routes/drinkRoutes"
import pokemonRoutes from "./routes/pokemonRoutes"

import swaggerUi from "swagger-ui-express"
import { connect } from "./service/database"

dotenv.config()

const app: Express = express()

const port = process.env.PORT
const databaseUrl = process.env.DATABASE_URL || ""

connect(databaseUrl)

const corsOptions = { 
  origin : ['http://localhost:3000'], 
} 
 
app.use(cors(corsOptions)) 
app.use(express.json())
app.use(express.static("public"))
app.use(
  "/swagger", // endereço de onde o swagger responde
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
)

app.use("/api/pokemon", pokemonRoutes)

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server")
})

app.listen(port, () => {
  console.log(`Server Started at ${port}`)
})
