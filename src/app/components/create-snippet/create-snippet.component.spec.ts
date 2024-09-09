import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSnippetComponent } from './create-snippet.component';

describe('CreateSnippetComponent', () => {
  let component: CreateSnippetComponent;
  let fixture: ComponentFixture<CreateSnippetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateSnippetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSnippetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
