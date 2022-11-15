import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataService } from 'src/app/shared/service/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-find-patient',
  templateUrl: './find-patient.component.html',
  styleUrls: ['./find-patient.component.css']
})
export class FindPatientComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) data : any,
  private dialogRef : MatDialogRef<FindPatientComponent>,
  private dataApi : DataService, private _snackBar : MatSnackBar) { }

  form !: FormGroup;
  title !: string;
  patient_name !: string;
  mobile !: string;
  gender !: string;
  admission_date !: Date;
  prescription !: string;
  patient_id !: string;
  buttonName !: string;
  doctor_id !: string;
  doctor_name !: string;
  blood_type !: string;

  ngOnInit(): void {
  }
  cancelSearch() {
    this.dialogRef.close();
  }

  async getPatient() {
    //this.form.value.doctor_name = await this.getDoctorName(this.form.value.id);
    var print_id;
    this.dialogRef.close(true);
    this.openSnackBar("Scan Print......","OK");
    console.log("pressesed");
    this.dataApi.getPrintId().subscribe(d=>{
      print_id = d;
    })
    this.dataApi.findPatientByPrint(print_id).subscribe((users:any)=>{
      window.open('/dashboard/patient/'+users.id,'_blank');
    })//getPatientById(9);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
