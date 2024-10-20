import { PassportStatic } from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';
import User from '../Models/User';

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
          let user = await User.findOne({ where: { github_id: profile.id } });

          // If user does not exist, create a new one
          if (!user) {
            user = await User.create({
              github_id: profile.id,
              name: profile.username,
              github_access_token: accessToken,
              is_active: true,  // Set user as active upon registration
            });
          } else {
            // If user exists, update the access token
            user.github_access_token = accessToken;
            await user.save();
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
      const user = await User.findByPk(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });
}
