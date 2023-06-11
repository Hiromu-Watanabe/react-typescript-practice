import axios from "axios";
import { useState } from "react";
import { User } from "../types/api/user";
import { userProfile } from "../types/userProfile";

// 全ユーザー一覧を取得するカスタムフック
export const useAllUsers = () => {
  const [userProfiles, setUserProfiles] = useState<userProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    setError(false);

    try {
      const { data } = await axios.get<User[]>(
        "https://jsonplaceholder.typicode.com/users"
      );

      const formatData = data.map((user) => ({
        id: user.id,
        name: `${user.name} （${user.username}）`,
        email: user.email,
        address: `${user.address.city}${user.address.suite}${user.address.street}`,
      }));
      setUserProfiles(formatData);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return { fetchUsers, userProfiles, loading, error };
};
