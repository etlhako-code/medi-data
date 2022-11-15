import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { HttpClient, HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
// Set the http options
const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json", "Authorization": "c31z" })
};



@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private afs : AngularFirestore,private http:HttpClient) { }
  private apiBaseUrl=environment.arduinoIp;
  addDoctor(doctor : any) {
    doctor.id = this.afs.createId();
    return this.afs.collection("Doctor/").add(doctor);
  }
  getAllDoctors() {
    return this.afs.collection("Doctor/").snapshotChanges();
  }
  updateDoctor(doctor : any) {
    return this.afs.doc("Doctor/"+doctor.id).update(doctor);
  }
  deleteDoctor(id : string) {
    return this.afs.doc("Doctor/"+id).delete();
  }
  getDoctorById(id : any) {
    return this.afs.doc("Doctor/"+id).valueChanges();
  }
  addPatient(patient : any) {
    patient.patient_id = this.afs.createId();
   // patient.print_id = this.getPrintId();
    return this.afs.collection("Patient/").add(patient);
  }
  public getPrintId(){
    return this.http.get(this.apiBaseUrl+"printid");
  }
  findPatientByPrint(print_id:any){
    //var print_id = this.getPrintId();
    return this.afs.doc("Patient/"+print_id).valueChanges();
    //return this.afs.collection('patient').get();
  }
  getAllPatients() {
    return this.afs.collection("Patient/").snapshotChanges();
  }
  updatePatient(patient : any) {
    return this.afs.doc("Patient/"+patient.patient_id).update(patient);
  }
  deletePatient(id : string) {
    return this.afs.doc("Patient/"+id).delete();
  }
  getPatientById(id : any) {
    return this.afs.doc("Patient/"+id).valueChanges();
  }
}
