import { FrontclientPage } from './app.po';

describe('frontclient App', () => {
  let page: FrontclientPage;

  beforeEach(() => {
    page = new FrontclientPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
