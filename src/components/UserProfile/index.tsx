import { ProfileProps } from "./types";

const UserProfile = ({ user }: ProfileProps) => {
  return (
    <div>
      <h3>{user.id}</h3>
      <h3>{user.name}</h3>
      <h3>{user.email}</h3>
      <img src={user.profile_picture} alt={`${user.name} profile pic`} />
    </div>
  );
};

export default UserProfile;
