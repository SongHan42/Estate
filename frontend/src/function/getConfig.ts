import { Cookies } from "react-cookie";

export function getConfig(): { headers: { Authorization: string } } {
  const cookies = new Cookies();
  const config = {
    headers: {
      Authorization: `Bearer ${cookies.get("token")}`,
    },
  };

  return config;
}
