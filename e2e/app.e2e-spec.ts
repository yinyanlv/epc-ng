import { EpcNgPage } from './app.po';

describe('epc-ng App', function() {
  let page: EpcNgPage;

  beforeEach(() => {
    page = new EpcNgPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
