import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss',
})
export class TabsComponent {
  @Output() activeTabChange = new EventEmitter<boolean>();
  public activeTab: boolean = true;

  setActiveTab(tab: boolean): void {
    this.activeTab = tab;
    this.activeTabChange.emit(tab);
  }
}
