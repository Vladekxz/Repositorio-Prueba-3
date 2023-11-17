import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QrPage } from './qr.page';

describe('QrPage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        QrPage
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(QrPage);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'qr-reader'`, () => {
    const fixture = TestBed.createComponent(QrPage);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('qr-reader');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(QrPage);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('qr-reader app is running!');
  });
});