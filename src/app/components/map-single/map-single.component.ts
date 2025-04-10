import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {icon, latLng, LatLng, Layer, marker, tileLayer} from 'leaflet';
import {FormsModule} from '@angular/forms';
import {LeafletModule} from '@bluehalo/ngx-leaflet';

/*
https://www.npmjs.com/package/@bluehalo/ngx-leaflet
https://github.com/bluehalo/ngx-leaflet
*/
@Component({
  selector: 'app-map-single',
  imports: [FormsModule, LeafletModule ],
  templateUrl: './map-single.component.html',
  styleUrl: './map-single.component.css'
})
export class MapSingleComponent implements OnInit, OnChanges {

  @Input() lat?: number;
  @Input() lng?: number;

  options: any | undefined;
  markers: Layer[] = [];
  center: LatLng = new LatLng(46.879966, -121.726909); // irgendein Startwert, wird überschrieben

  // Open Street Map definitions
  LAYER_OSM = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    { maxZoom: 18,
      attribution: '<a target="_blank" rel="nofollow noopener noreferrer" href="https://github.com/Leaflet/Leaflet.markercluster">Markercluster</a> ' +
        '&copy; <a target="_blank" rel="nofollow noopener noreferrer" href="https://osm.org/copyright">Open Street Map</a> contributors'
    });

  ngOnInit() {
    // Leaflet bindings
    this.options = {
      layers: [ this.LAYER_OSM ],
      zoom: 8,
      center: latLng(46.879966, -121.726909) // irgendein Wert, wird überschrieben
    };
  }

  ngOnChanges() {
    // Leaflet bindings
    if (this.lat != undefined && this.lng != undefined) {
      this.options = {
        layers: [ this.LAYER_OSM ],
        zoom: 10,
        center: latLng(46.879966, -121.726909)
        //center: new LatLng( this.lat, this.lng)
      };

      this.center = new LatLng( this.lat, this.lng);

      const newMarker = marker(
        new LatLng( this.lat, this.lng ),
        //latLng(46.879966, -121.726909),
        {
          icon: icon({
            iconSize: [ 25, 41 ],
            iconAnchor: [ 13, 41 ],
            iconUrl: 'assets/leaflet/marker-icon.png',
            iconRetinaUrl: 'assets/leaflet/marker-icon-2x.png',
            shadowUrl: 'assets/leaflet/marker-shadow.png'
          })
        }
      );
     // newMarker.bindPopup("hallo").openPopup();

      this.markers.push(newMarker);
    }


  }

}
