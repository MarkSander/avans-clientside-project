/* import { Booster } from '../booster/booster.model';
import { BoosterBox } from '../boosterbox/boosterbox.model';
import { Card } from '../card/card.model'; */

export class Set {
  _id: string = '';
  name: string = '';
  releasedate: Date = new Date();
  cardsinset: string = '';
  setcode: string = '';
  /*   cards: Array<Card> = [];
  boosters: Array<Booster> = [];
  boosterboxes: Array<BoosterBox> | undefined; */
}
