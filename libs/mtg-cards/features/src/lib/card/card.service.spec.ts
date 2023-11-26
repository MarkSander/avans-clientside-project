import { HttpClientModule } from '@angular/common/http';
import { CardService } from './card.service';
import { TestBed } from '@angular/core/testing';
import { Card } from '@avans-nx-project/backend/features';

const PAGE = 1;
const PAGE_SIZE = 10;
const SAMPLE_TOTAL = 100;
const SAMPLE_PAGINATION = {
  page: 1,
  pageSize: 10,
  total: SAMPLE_TOTAL,
  cards: [...Array(SAMPLE_TOTAL).keys()]
    .map((i) => ({ id: i, name: `Name of ${i}` }))
    .slice((PAGE - 1) * PAGE_SIZE, PAGE * PAGE_SIZE),
};
const SAMPLE_CARD = {
  id: '1',
  name: `Name of 1`,
};

describe('CardService', () => {
  let service: CardService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [CardService],
      imports: [HttpClientModule],
    });
    service = TestBed.inject(CardService);
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should return card list', () => {
    const result = service.list({ page: 1, pageSize: 10 });
    result.subscribe((res) => {
      expect(res).toEqual(SAMPLE_PAGINATION);
    });
  });

  it('should return one card', () => {
    const details = service.read('1');
    details.subscribe((res) => {
      expect(res).toEqual(SAMPLE_CARD);
    });
  });

  it('should create a card', () => {
    const cardToCreate: Card = {
      _id: '0',
      title: 'Apex Devastator',
      type: 'Creature',
      rarity: 'Mythic',
      legendary: true,
      manacost: 10,
    };
    service.createCard(cardToCreate).subscribe((createdCard) => {
      console.log(`created card has the title: ${createdCard.title}`);
      expect(createdCard.title).toEqual('Asdskvbsdkj');
    });
  });
});
