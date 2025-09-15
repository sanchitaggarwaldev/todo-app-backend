import { jest } from "@jest/globals";
import request from "supertest";
import app from "../app.js";

let token;
let taskId;

beforeAll(async () => {
  jest.setTimeout(50000);
  const loginRes = await request(app)
    .post("/api/auth/login")
    .send({ email: "testuser@example.com", password: "123456" });
  token = loginRes.body.token;
});

describe("Task API", () => {
  it("should create a task", async () => {
    const res = await request(app)
      .post("/api/tasks/create-task")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Test Task",
        dueDate: "2025-09-15T23:59:59.000Z",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("_id");
    taskId = res.body._id;
  });

  it("should list all tasks", async () => {
    const res = await request(app)
      .get("/api/tasks/list-all-tasks")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should get a single task by ID", async () => {
    const res = await request(app)
      .get(`/api/tasks/list-single-task/${taskId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("_id", taskId);
  });

  it("should update a task", async () => {
    const res = await request(app)
      .put(`/api/tasks/update-task/${taskId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Updated Task",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("name", "Updated Task");
  });

  it("should delete a task", async () => {
    const res = await request(app)
      .delete(`/api/tasks/delete-task/${taskId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message");
  });
});
