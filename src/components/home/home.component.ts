import { Component, ChangeDetectionStrategy } from '@angular/core';

import { HeroComponent } from '../hero/hero.component';
import { PickupComponent } from '../pickup/pickup.component';
import { ExhibitionComponent } from '../exhibition/exhibition.component';
import { EventComponent } from '../event/event.component';
import { SownComponent } from '../sown/sown.component';
import { InformationComponent } from '../information/information.component';
import { FaqComponent } from '../faq/faq.component';
import { MentorComponent } from '../mentor/mentor.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    PickupComponent,
    ExhibitionComponent,
    EventComponent,
    SownComponent,
    MentorComponent,
    InformationComponent,
    FaqComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-hero></app-hero>
    <app-pickup></app-pickup>
    <app-exhibition></app-exhibition>
    <app-event></app-event>
    <app-sown></app-sown>
    <app-mentor></app-mentor>
    <app-information></app-information>
    <app-faq></app-faq>
  `,
})
export class HomeComponent {}