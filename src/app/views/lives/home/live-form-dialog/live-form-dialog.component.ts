import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { LiveService } from 'src/app/shared/service/live.service';

@Component({
  selector: 'app-live-form-dialog',
  templateUrl: './live-form-dialog.component.html',
  styleUrls: ['./live-form-dialog.component.scss']
})
export class LiveFormDialogComponent implements OnInit {

  public liveForm: FormGroup = new FormGroup({});

  constructor(
    public dialogRef: MatDialogRef<LiveFormDialogComponent>,
    private fb: FormBuilder,
    private liveService: LiveService
  ) { }

  ngOnInit(): void {
    this.liveForm = this.fb.group({
      liveName: ['', [Validators.required]],
      channelName: ['', [Validators.required]],
      liveLink: ['', [Validators.required]],
      liveDate: ['', [Validators.required]],
      liveTime: ['', [Validators.required]]
    });

    this.liveForm.valueChanges.subscribe(data => console.log(data));
  }

  cancel(): void {
    this.dialogRef.close();
    this.liveForm.reset();
  }

  createLive() {
    let newDate: moment.Moment = moment.utc(this.liveForm.value.liveDate).local();
    this.liveForm.value.liveDate = newDate.format('YYYY-MM-DD') + "T" + this.liveForm.value.liveTime;
    this.liveService.postLives(this.liveForm.value).subscribe(live => { });
    this.dialogRef.close();
    this.liveForm.reset();

    window.location.reload();
  }

}
