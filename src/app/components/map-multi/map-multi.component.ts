import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Sand} from '../../common/sand';
import {icon, latLng, LatLng, LatLngBounds, Layer, marker, tileLayer, Map, featureGroup} from 'leaflet';
import {FormsModule} from '@angular/forms';
import {LeafletModule} from '@bluehalo/ngx-leaflet';
import {NgForOf} from '@angular/common';

/*
https://www.npmjs.com/package/@bluehalo/ngx-leaflet
https://github.com/bluehalo/ngx-leaflet
 TODO https://github.com/BlueHalo/ngx-leaflet-markercluster
*/

@Component({
  selector: 'app-map-multi',
  imports: [FormsModule, LeafletModule ],
  templateUrl: './map-multi.component.html',
  styleUrl: './map-multi.component.css'
})
export class MapMultiComponent implements OnInit, OnChanges {

  @Input() sands: Sand[] = [];

  markers: Layer[] = [];
  center: LatLng = new LatLng(46.879966, -121.726909); // irgendein Startwert, wird überschrieben
  map: Map | undefined;

  // Open Street Map definitions
  LAYER_OSM = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    { maxZoom: 18,
      attribution: '<a target="_blank" rel="nofollow noopener noreferrer" href="https://github.com/Leaflet/Leaflet.markercluster">Markercluster</a> ' +
        '&copy; <a target="_blank" rel="nofollow noopener noreferrer" href="https://osm.org/copyright">Open Street Map</a> contributors'
    });

  options = {
    layers: [ this.LAYER_OSM ],
    zoom: 8,
    center: latLng(46.879966, -121.726909) // irgendein Wert, wird überschrieben
  };

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.sands === undefined || this.sands.length === 0) {
      return;
    }

    for (const sand of this.sands) {
      if (sand.latitude != null && sand.longitude != null && sand.latitude != 0 && sand.longitude !=0) {
        const newMarker = marker(
          new LatLng(sand.latitude, sand.longitude),
          {
            icon: icon({
              iconSize: [25, 41],
              iconAnchor: [13, 41],
              iconUrl: 'assets/leaflet/marker-icon.png',
              iconRetinaUrl: 'assets/leaflet/marker-icon-2x.png',
              shadowUrl: 'assets/leaflet/marker-shadow.png'
            })
          }
        );
        // @ts-ignore
        newMarker.bindPopup(sand.name).openPopup();

        this.markers.push(newMarker);
      }
    }
    const group = featureGroup(this.markers);

      if (this.map != undefined && this.markers.length > 0) {
        const group = featureGroup(this.markers);
        group.addTo(this.map);
        this.map.fitBounds(group.getBounds());
      }
  }


  onMapReady($event: Map) {
    this.map = $event;
  }
}
