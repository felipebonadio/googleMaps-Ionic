import { Component, ElementRef, ViewChild } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

@ViewChild('map') mapRef: ElementRef;

map: google.maps.Map;
minhaPosicao: google.maps.LatLng;

  constructor(private geolocation: Geolocation) {}

  ionViewWillEnter(){
    this.exibirMapa();
  }

  exibirMapa(): void{

    const posicao = new google.maps.LatLng(-22.49390139193252, -48.5522033747302);
    const opcoes = {
      center: posicao,
      zoom: 15,
      disableDefaultUi: false
    };
    this.map = new google.maps.Map(this.mapRef.nativeElement, opcoes);

    this.buscarPosicao();
  }

  buscarPosicao(){
    this.geolocation.getCurrentPosition().then((resp) =>{
      this.minhaPosicao = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      this.irParaPosicao();
    }).catch((error)=>{
      console.log('Erro ao tentar capturar a localização', error);
    });
  }

  irParaPosicao(){
    this.map.setCenter(this.minhaPosicao);
    this.map.setZoom(15);
    new google.maps.Marker({
      position: this.minhaPosicao,
      map: this.map,
      title: 'Olá!',
      animation: google.maps.Animation.BOUNCE
    });
  }
}
