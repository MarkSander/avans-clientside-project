import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardEditComponent } from './card-edit.component';
import { CardService } from '../card.service';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription, of } from 'rxjs';

describe('CardEditComponent', () => {
  let component: CardEditComponent;
  let fixture: ComponentFixture<CardEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardEditComponent],
      providers: [
        CardService,
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: () => 'some_id' }),
          },
        },
      ],
      imports: [HttpClientModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CardEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should unsubscribe on component destruction', () => {
    // Arrange
    component.subscription = new Subscription();
    // Act
    component.ngOnDestroy();
    // Assert
    expect(component.subscription.closed).toBe(true);
  });

  it('should initialize form with default values', () => {
    // Arrange: Component is created in the beforeEach
    // Act

    // Assert
    expect(component.form.value).toEqual({
      title: '',
      type: '',
      rarity: '',
      manacost: '',
      legendary: '',
    });
  });

  it('should fill form data on card subscription', () => {});
});
