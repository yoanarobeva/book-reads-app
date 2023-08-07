import { Component, Input } from '@angular/core';
import { Activity } from 'src/app/shared/types';

@Component({
  selector: 'app-activity-card',
  templateUrl: './activity-card.component.html',
  styleUrls: ['./activity-card.component.css']
})
export class ActivityCardComponent {
  @Input() activity!: Activity
}
