import app from "../src/server.js";
import prisma from "../src/config/db.js";
import dotenv from "dotenv";
import CustomerFactory from "./factories/customerFactory.js";
import supertest from "supertest";

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE "Customer" RESTART IDENTITY;`;
});

describe("testing api endpoints", () => {
    afterAll(async () => {
        dotenv.config({ path: '.env.test' });
        await prisma.$disconnect();
      });
    
    it("should return status code 201", async () => {
        const body = CustomerFactory.customerGenerate();
        const response = await supertest(app).post("/customer").send(body); 
        expect(response.status).toBe(201);
    });

    it("should return status code 409 when cpf already exist in database", async () => {
        const body = CustomerFactory.customerGenerate();
        await supertest(app).post("/customer").send(body); 
        const response = await supertest(app).post("/customer").send(body); 
        expect(response.status).toBe(409);
    });

    it("should return status code 422 when cpf don't have valid format", async () => { 
        const response = await supertest(app).post("/customer").send({name:"teste", cpf:"111444777-35", birthdate:"2000/12/02"}); 
        expect(response.status).toBe(422);
    });

    it("should return just ten results", async () => {
        await CustomerFactory.createScenarioTwentyCustomers();
        const response = await supertest(app).get("/customer");
        expect(response.body.length).toEqual(10); 
    });

    it("should return last ten results", async () => {
        await CustomerFactory.createScenarioTwentyCustomers();
        const response = await supertest(app).get("/customer");
        const response1 = await supertest(app).get("/customer?page=1");
        expect(response1.body[0].id).toEqual(response.body[0].id + 10);
    });

    it("should return fifteen results", async () => {
        await CustomerFactory.createScenarioTwentyCustomers();
        const response = await supertest(app).get("/customer?limit=15");
        expect(response.body.length).toEqual(15);
    });

    it("should return status code 422 when nothing passed argument", async () => {
        const response = await supertest(app).post("/customer").send();
        expect(response.status).toBe(422);
    });

    it("should return status code 400 when nothing passed argument on upload ", async () => {
        const body = CustomerFactory.customerGenerate();
        await supertest(app).post("/customer").send(body); 
        const response2 = await supertest(app).patch("/customer/1").send();
        expect(response2.status).toBe(400);
    });

    it("should update fields", async () => {
        const body = CustomerFactory.customerGenerate();
        await supertest(app).post("/customer").send(body);
        await supertest(app).patch("/customer/1").send({name: "teste", cpf: "27467346301"});
        const response = await supertest(app).get("/customer");
        expect(response.body[0].name).toEqual("teste");
        expect(response.body[0].cpf).toEqual("27467346301");
    });

    it("should return customer with cpf 11144477735", async () => {
        await supertest(app).post("/customer").send({name: "teste", cpf:"111.444.777-35", birthdate:"2000/01/14"});
        const response = await supertest(app).get("/customer/111.444.777-35");
        expect(response.body.cpf).toEqual("11144477735");
    });

    it("should return status code 404 when cpf don't exist in database", async () => {
        const response = await supertest(app).get("/customer/111.444.777-35");
        expect(response.status).toBe(404);
    });

    it("should return status code 204", async () => {
        await supertest(app).post("/customer").send({name: "teste", cpf:"111.444.777-35", birthdate:"2000/01/14"});
        const response = await supertest(app).delete("/customer/11144477735");
        expect(response.status).toBe(204);
    });

    it("should return status code 404 when trying delete a cpf nonexistent", async () => {
        const response = await supertest(app).delete("/customer/11144477735");
        expect(response.status).toBe(404);
    });
});