import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CropPagePage } from './crop-page.page';

describe('CropPagePage', () => {
  let component: CropPagePage;
  let fixture: ComponentFixture<CropPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CropPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CropPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
