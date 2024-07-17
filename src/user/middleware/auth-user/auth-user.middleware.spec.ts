import { AuthUserMiddleware } from './auth-user.middleware';

describe('AuthUserMiddleware', () => {
  it('should be defined', () => {
    expect(new AuthUserMiddleware()).toBeDefined();
  });
});
