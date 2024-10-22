import User from '../Models/User';
import { encrypt } from '../Utils/Encryption';

class UserService {
  // Find a user by GitHub ID
  public async findByGitHubId(githubId: string) {
    return User.findOne({ where: { github_id: githubId } });
  }

  // Create a new user
  public async createUser(githubId: string, username: string, accessToken: string) {
    const encryptedToken = encrypt(accessToken); // Encrypt the access token
    return User.create({
      github_id: githubId,
      name: username,
      github_access_token: encryptedToken,
      is_active: true,  // Set user as active upon registration
    });
  }

  // Update a user's access token
  public async updateAccessToken(user: any, accessToken: string) {
    user.github_access_token = encrypt(accessToken); // Encrypt before saving
    return user.save();
  }

  // Find a user by ID (for deserialization)
  public async findById(id: number) {
    return User.findByPk(id);
  }
}

export default new UserService();
