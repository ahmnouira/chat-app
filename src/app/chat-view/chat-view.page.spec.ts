import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChatViewPage } from './chat-view.page';

describe('ChatViewPage', () => {
  let component: ChatViewPage;
  let fixture: ComponentFixture<ChatViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatViewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChatViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
