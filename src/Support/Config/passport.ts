import { PassportStatic } from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';
import UserService from '../Services/UserService';

export default function (passport: PassportStatic) {
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID as string,
        clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        callbackURL: process.env.GITHUB_CALLBACK_URL as string,
      },
      async (accessToken: string, refreshToken: string, profile: any, done: any) => {
        try {
          let user = await UserService.findByGitHubId(profile.id);

          // If user does not exist, create a new one
          if (!user) {
            user = await UserService.createUser(profile.id, profile.username, accessToken);
          } else {
            // If user exists, update the access token
            UserService.updateAccessToken(user, accessToken);
          }

          return done(null, user);
        } catch (err) {
          return done(err, null);
        }
      }
    )
  );

  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await UserService.findById(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });
}
