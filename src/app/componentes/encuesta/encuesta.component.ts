import { Component } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Encuesta } from 'src/app/clases/encuesta';
import { AbmService } from 'src/app/servicios/abm.service';
import { validarCampoNumero, validarCampoTexto } from 'src/app/validators/validaciones';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent {
  form!: FormGroup;
  juegosPorEdad:boolean = false
  ocultarChat:boolean = false

  constructor(private serviceAbm: AbmService){}

  ngOnInit() {
    this.validar();
  }
  CambiarValor(){
    console.log('CambiarValor')
    this.ocultarChat = this.ocultarChat?   false : true;
  }

  get nombre() {
    return this.form?.get('nombre');
  }
  set nombre(value: any) {
    this.form?.get('nombre')?.patchValue(value);;
  }
  get apellido() {
    return this.form?.get('apellido');
  }
  set apellido(value: any) {
    this.form?.get('apellido')?.patchValue(value);;
  }
  get edad() {
    return this.form?.get('edad');
  }
  set edad(value: any) {
    this.form?.get('edad')?.patchValue(value);;
  }
  get telefono() {
    return this.form?.get('telefono');
  }
  set telefono(value: any) {
    this.form?.get('telefono')?.patchValue(value);;
  }
  get expSitio() {
    return this.form?.get('expSitio');
  }
  set expSitio(value: any) {
    this.form?.get('expSitio')?.patchValue(value);;
  }
  get dificultad() {
    return this.form?.get('dificultad');
  }
  set dificultad(value: any) {
    this.form?.get('dificultad')?.patchValue(value);;
  }
  get termCond() {
    return this.form?.get('termCond');
  }
  set termCond(value: any) {
    this.form?.get('termCond')?.patchValue(value);;
  }

  validar(): void {
    this.form = new FormGroup
      (
        {
          nombre: new FormControl(this.nombre,  [validarCampoTexto(1, 20, false , true)]  ) ,
          //nombre: new FormControl(this.nombre,  [Validators.required , Validators.maxLength(2),validarCampoTexto(1, 20, false , true)]  ) ,
          apellido: new FormControl('', { validators: [validarCampoTexto(1, 20, false , true)] }),
          edad: new FormControl('', { validators: [validarCampoNumero(18, 99)] }),
          telefono: new FormControl('', { validators: [validarCampoNumero(1, 9999999)] }),
          expSitio: new FormControl('', { validators: [validarCampoTexto(1, 9999)] }),//TODO AGREGAR AL HTML LA VALIDACION
          dificultad: new FormControl(this.dificultad,  [Validators.required ]),
          termCond: new FormControl(this.dificultad,  [Validators.requiredTrue ]),
         
          
        },
      );
  }

  obtenerErrores(errores: any): string[] {
    return Object.keys(errores);
  }

  GuardarEncuesta(){
    console.log('guardar encuesta')
    var encuesta = new Encuesta()
    encuesta.apellido = this.apellido.value
    encuesta.nombre = this.nombre.value
    encuesta.numTel =  this.telefono.value
    encuesta.dificultad =  this.dificultad.value
    encuesta.edad =  this.edad.value
    encuesta.expSitio =  this.expSitio.value
    encuesta.fecha = new Date()
    encuesta.juegosPorEdad = this.juegosPorEdad
    encuesta.ocultarChat = this.ocultarChat
    this.serviceAbm.CrearFirestore({...encuesta}, 'encuestaUsuario')

    console.log(encuesta)

  }
}
