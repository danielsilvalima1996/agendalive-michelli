import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Live } from 'src/app/shared/model/live.model';
import { LiveService } from 'src/app/shared/service/live.service';

@Component({
  selector: 'app-live-list',
  templateUrl: './live-list.component.html',
  styleUrls: ['./live-list.component.scss']
})
export class LiveListComponent implements OnInit {

  livePrevious: Live[] = [];
  liveNext: Live[] = [];
  next: boolean = false;
  previous: boolean = false;

  constructor(
    private liveService: LiveService,
    public sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.getLives();
  }

  getLives() {
    this.liveService
      .getLivesWithFlag('previous')
      .subscribe(data => {
        this.livePrevious = data.content;
        console.log(this.livePrevious);
        this.previous = true;
        this.livePrevious.forEach(live => {
          live.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(live.liveLink);
        })
      })

    this.liveService
      .getLivesWithFlag('next')
      .subscribe(data => {
        this.liveNext = data.content;
        console.log(this.liveNext);
        this.liveNext.forEach(live => {
          live.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(live.liveLink);
        })
        this.next = true;
      })
  }

}
