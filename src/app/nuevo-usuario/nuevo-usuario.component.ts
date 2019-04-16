import { Component, OnInit, Input } from '@angular/core';
import {FormBuilder, FormGroup, NgForm} from '@angular/forms';
import { DataApiService } from '../services/data-api.service';
import { AngendaInterface } from '../models/agenda-interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styleUrls: ['./nuevo-usuario.component.css']
})
export class NuevoUsuarioComponent implements OnInit {

  myform: FormGroup;

  imageUrl = '../../assets/img/user.png';
  fileToUpload: File = null;

  @Input() AgendaData = {nombre: '',
  apepaterno: '', apematerno: '', area: '', cargo: '', departamento: '', descripcion: '', direccion: '', email: '', foto: ''};

  constructor(public post: DataApiService, private route: ActivatedRoute, private router: Router ) {

  }

  ngOnInit() {
  }

  handleFileUpload(file: FileList) {
    this.fileToUpload = file.item(0);
    // previsualizar la imagen
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    };
    reader.readAsDataURL(this.fileToUpload);
  }

  onSaveAgenda(agendaForm: NgForm): void {
    if (agendaForm.value.userid == null) {
       // nuevo elementos de la agenda
       this.post.saveAgenda(agendaForm.value).subscribe((result) => {
         console.log(result);
         this.myform.reset();
         this.router.navigate(['usuario/' + result.data.id]);
       }, (err) => {
         console.log(err);
       });
    }
  }

}
