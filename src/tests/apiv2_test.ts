import { test, expect } from "bun:test";
import "dotenv/config";
const BASE_URL = process.env.API_BASE_URL;
interface User {
  id: number;
  name: string;
  email: string;
}

// Create a new user
async function createUser(data: Omit<User, "id">): Promise<{ res: Response; json: User }> {
  const res = await fetch(`${BASE_URL}/api/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const json: User = (await res.json()) as User;
  return { res, json };
}
// Delete a user by ID
async function deleteUserById(id: number): Promise<void> {
  await fetch(`${BASE_URL}/api/users/${id}`, { method: "DELETE" });
}

// --- Tests ---

// Health check
test("Health endpoint works", async () => {
  const res = await fetch(`${BASE_URL}/health`);
  expect(res.status).toBe(200);
});

// Full CRUD workflow
test("CRUD workflow", async () => {
  // --- Create ---
  const { res: createRes, json: createdUser } = await createUser({
    name: "ratt",
    email: "ratt@test.com",
  });
  expect(createRes.status).toBe(201);
  expect(createdUser.name).toBe("ratt");
  const userId: number = createdUser.id;

  // --- Read ---
  const getRes = await fetch(`${BASE_URL}/api/users/${userId}`);
  const userData: User = (await getRes.json()) as User;
  expect(getRes.status).toBe(200);
  expect(userData.name).toBe("ratt");

  // --- Update ---
  const updateRes = await fetch(`${BASE_URL}/api/users/${userId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "rat" }),
  });
  const updatedUser: User = (await updateRes.json()) as User;
  expect(updateRes.status).toBe(200);
  expect(updatedUser.name).toBe("rat");

  // --- Delete ---
  const deleteRes = await fetch(`${BASE_URL}/api/users/${userId}`, 
    { method: "DELETE" });
  const deleteData: { message: string } = (await deleteRes.json()) as { message: string };
  expect(deleteRes.status).toBe(200);
  expect(deleteData.message).toBe("User deleted");
});
