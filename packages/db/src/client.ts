import { CosmosClient, type SqlQuerySpec } from "@azure/cosmos";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
export const client = new CosmosClient({
  endpoint: process.env.COSMOS_DB_ENDPOINT ?? "https://localhost:8081",
  key: process.env.COSMOS_DB_KEY,
});

type Container = "addresses" | "logging";

const containers = ["addresses", "logging"] as const;

//  The `CosmosClient` class is not exported from the "@azure/cosmos" modu
class DB {
  // constructor for accpeting the database name and cosmos client
  constructor(
    private dbName: string,
    private client: CosmosClient,
  ) {
    // this.init().then(() => console.log("Database initialized"));
  }

  // create the database
  async createDatabase() {
    await this.client.databases.createIfNotExists({ id: this.dbName });
  }

  // create the container
  async createContainer(containerName: string) {
    await this.client
      .database(this.dbName)
      .containers.createIfNotExists({ id: containerName });
  }

  // initialize the database
  async init() {
    await this.createDatabase();
    await Promise.all(
      containers.map((container) => this.createContainer(container)),
    );
  }

  // get the container
  getContainer(container: Container) {
    return this.client.database(this.dbName).container(container);
  }

  // query the container
  async queryContainer(container: Container, query: SqlQuerySpec) {
    const { resources } = await this.client
      .database(this.dbName)
      .container(container)
      .items.query(query)
      .fetchAll();

    return resources;
  }
}

export const db = new DB("ACI", client);
