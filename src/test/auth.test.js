import { jest } from "@jest/globals";
jest.setTimeout(20000);

import request from "supertest";
import app from "../app.js";
import mongoose from "mongoose";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI_TEST);
  // clean test user
  await User.deleteOne({ email: "testuser@example.com" });
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

describe("Auth API", () => {
  const userData = {
    name: "Test User",
    email: "testuser@example.com",
    password: "123456",
  };

  it("should register a new user", async () => {
    const res = await request(app).post("/api/auth/register").send(userData);
    console.log(res.statusCode, res.body);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("message", "User registered");
    expect(res.body).toHaveProperty("user");
  });

  it("should login the user", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: userData.email, password: userData.password });
    console.log(res.statusCode, res.body);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });
});
