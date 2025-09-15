import request from "supertest";
import app from "../app.js";

describe("Auth API", () => {
  const userData = {
    name: "Test User",
    email: "testuser@example.com",
    password: "123456",
  };

  it("should register a new user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send(userData);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("token");
  });

  it("should login the user", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: userData.email,
        password: userData.password,
      });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });
});
