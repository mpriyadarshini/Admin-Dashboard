export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export async function loadData() {
  const response = await fetch(
    "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
  );
  const users: User[] = await response.json();
  return users
}
