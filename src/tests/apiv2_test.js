import { test, expect } from "bun:test";
import "dotenv/config";

const BASE_URL = process.env.API_BASE_URL;

async function createUser(data) {
  const res = await fetch(`${BASE_URL}/api/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  return { res, json };
}

async function deleteUserById(id) {
  await fetch(`${BASE_URL}/api/users/${id}`, { method: "DELETE" });
}

test("Health endpoint works", async () => {
  const res = await fetch(`${BASE_URL}/health`);
  expect(res.status).toBe(200);
});

test("CRUD workflow", async () => {
  // Create
  const { res: createRes, json: createdUser } = await createUser({ name: "DevOps", email: "devops@test.com" });
  expect(createRes.status).toBe(201);
  expect(createdUser.name).toBe("DevOps");
  const userId = createdUser.id;

  // Read
  const getRes = await fetch(`${BASE_URL}/api/users/${userId}`);
  const userData = await getRes.json();
  expect(getRes.status).toBe(200);
  expect(userData.name).toBe("DevOps");

  // Update
  const updateRes = await fetch(`${BASE_URL}/api/users/${userId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "DevOps Updated" }),
  });
  const updatedUser = await updateRes.json();
  expect(updateRes.status).toBe(200);
  expect(updatedUser.name).toBe("DevOps Updated");

  // Delete
  const deleteRes = await fetch(`${BASE_URL}/api/users/${userId}`, { method: "DELETE" });
  const deleteData = await deleteRes.json();
  expect(deleteRes.status).toBe(200);
  expect(deleteData.message).toBe("User deleted");
  
});
