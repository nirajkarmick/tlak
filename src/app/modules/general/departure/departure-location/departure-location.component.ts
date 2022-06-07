import {Component, OnInit, ViewEncapsulation, OnDestroy, HostListener} from '@angular/core';
import {Data, ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from 'ngx-toastr';
import {LocationService} from '../../../../services/location.service';
import {TranslateConfigService} from "../../../../services/translate-config.service";
import tt from '@tomtom-international/web-sdk-maps';

declare var $: any;

@Component({
  selector: 'app-departure-location',
  templateUrl: './departure-location.component.html',
  styleUrls: ['./departure-location.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class DepartureLocationComponent implements OnInit, OnDestroy {

  keyword = '';
  country_name = '';
  country_code = '';
  poi = '';
  ref_id: any;
  dest_id: any;
  country_id: any;
  pois_types = Object;
  search_data: any;
  destinationData: any;
  marker: any;
  popup: any;
  pullit_countryData: any;
  map: any;
  dest_ref_type: any;
  dest_ref_id: any;
  dest_ref_key: any;
  pullit_country: any;
  poi_data: any;
  poi_types: any;
  all_poi_data: any;
  package_id: any;
  pkg_id: any;
  geonameId: any;
  poi_dest: any = [];
  Intso2: any;
  Intso3: any;
  counId: any = [];
  s3url: any;
  all_search: any;
  package_poi_data: any = [];
  location_id: any;
  distinct_types: any;
  all_search_data: any = [];
  selected_location = "";
  isLoading = true;
  iso2: any;
  iso3: any;
  latitude: any;
  longitude: any;
  poi_selected: Data[] = []; // checkbox data
  poi_selected_id: Data[] = [];
  poi_available = false;
  depBreak = 0;
  locationEdit = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location_services: LocationService,
    private toastr: ToastrService,
    private translate: TranslateConfigService
  ) {
    this.package_id = this.route.snapshot.queryParams['package_id'];
    if (this.package_id === undefined) {
      this.toastr.error('Package not found!');
      this.router.navigateByUrl('/departure-create');
    } else {
      this.render_data();
    }
  }

  noImagePoi = "https://tlakdevnew.s3.us-west-2.amazonaws.com/poi/no-image.png";

  onPoiImgError(event) {
    event.target.src = this.noImagePoi;
  }
  locationIDfordel:any;
  render_data() {
    this.isLoading = true;
    this.location_services.getLocationWisePois(this.package_id).subscribe((res: any) => {
      console.log(res,'my location data')
      this.isLoading = false;
      this.all_search = res.location;
      console.log(this.all_search);
      console.log(res, 'all render data');
      this.all_search_data = [];
      if (this.all_search && this.all_search.length > 0) {
        for (let i = 0; i < this.all_search.length; i++) {
          this.all_search_data.push(
            {
              'name': this.all_search[i].name,
              'geonameId': this.all_search[i].geonameId,
              'country_name': this.all_search[i].country_name,
              'pois': [],
              'iso2': this.all_search[i].iso2,
              'iso3': this.all_search[i].iso3,
              'latitude': this.all_search[i].latitude,
              'longitude': this.all_search[i].longitude,
              'ref_id': this.all_search[i].ref_id,
              'location_id': this.all_search[i].location_id,
              'type': 'd'
            }
          );
          if (i == 0) {
            this.changelocation(this.all_search[i].name, i);
          }
          for (let j = 0; j < this.all_search[i].pois.length; j++) {
            this.poi_selected.push(this.all_search[i].pois[j]);
            this.poi_selected_id.push(this.all_search[i].pois[j].location_ref_id);
            this.all_search_data[i].pois.push(this.all_search[i].pois[j]);
            //this.sort_poi(location);
            this.location_id = this.all_search[i].pois[j].location_id;
          }

        }
        //  console.log(this.location_id, 'lcoation ID')
        // this.checked_poi();
      }
      console.log(this.all_search_data, 'hi shashank');
    })
  }

  sort_poi(location: any) {
    const sortarry = this.all_search_data;
    let index;
    if (location.target.checked) {
      sortarry.push(location.target.checked)
    } else {
      index = sortarry.push(location.target.checked);
      sortarry.splice(index, 1);
    }
  }

  ngOnInit(): void {
    const HQ = {lat: localStorage.getItem('latitude'), lng: localStorage.getItem('longitude')}
    this.map = tt.map({
      key: '6vdxVANLJketgjeoT3dvURPnu4ny3VWy',
      container: 'map',
      zoom: 18,
    });
    this.map.addControl(new tt.NavigationControl());
    this.map.addControl(new tt.FullscreenControl({container: document.querySelector('body')}));
    this.map.on('click', function (e: any) {

    });
    this.map.setCenter(HQ);
    this.map.addControl(new tt.GeolocateControl({
      positionOptions: {enableHighAccuracy: true},
      trackUserLocation: true
    }));
    this.map.scrollZoom.enable({around: 'center'});

    setTimeout(() => {
      this.isLoading = false;
    }, 1400);
  }

  ngOnDestroy() {
  }

  search_pullit() {
    if (this.keyword && this.keyword.length > 2) {
      this.location_services.pullSearchByKey(this.keyword).subscribe((result: any) => {
        this.search_data = result;
      }, error => {
        console.log('cannot find the result');
      })
    }
  }

  set_keyData(country_name: any, geonameId: any, iso2: any, iso3: any, ref_id: any, type: any, latitude: any, longitude: any) {
    let key_found = false;
    if (this.all_search_data && this.all_search_data.length > 0) {
      for (let j = 0; j < this.all_search_data.length; j++) {
        if (this.all_search_data[j].name == this.keyword) {
          key_found = true;
        }
      }
    }
    if (key_found == false) {
      this.all_search_data.push(
        {
          'name': this.keyword,
          'country_name': country_name,
          'geonameId': geonameId,
          //'countryId': country_id,
          'iso2': iso2,
          'iso3': iso3,
          'ref_id': ref_id,
          'type': type,
          'latitude': latitude,
          'longitude': longitude,
          'pois': [],
        }
      );
    }
    // 'country_id': this.country_id,
    // console.log(this.all_search_data);
    this.selected_location = this.keyword;
  }

  changelocation(name: any, index: any) {
    if (this.all_search_data[index].type == 'p') {
      this.search_by_poi(this.all_search_data[index].ref_id);
      this.keyword = name;
    } else {
      this.search_destination_by_location(this.all_search_data[index].ref_id, name, this.all_search_data[index].country_name, 'oo', this.all_search_data[index].geonameId);
      this.keyword = name;

    }
  }

  search_by_poi(id: any) {

    this.RemoveAllMarkers();
    this.location_services.pullSearchByPoi(id).subscribe((data: any) => {
      this.poi_data = data.pois;
      this.poi_types = this.poi_data.poi_type;
      this.s3url = data.s3_url;
      this.search_data = [];
      for (var i = 0; i < this.poi_data.length; i++) {
        var lat = parseFloat(this.poi_data[i].attraction_latitude) > 90 ? 90 : parseFloat(this.poi_data[i].attraction_latitude);
        var lng = parseFloat(this.poi_data[i].attraction_longitude) > 90 ? 90 : parseFloat(this.poi_data[i].attraction_longitude);
        this.map.setCenter([lng, lat]);
        var element = document.createElement('div');
        element.id = 'marker';
        const customPopup = '<div style="display:inline">' +
          '<img src=' + this.poi_data[i].images_url + ' alt="" style="width:100%;max-width:100%;height:80px;">' +
          '<div style="width:100%;padding-top:10px"><span style="">' + this.poi_data[i].attraction_name + '</span></div>' +
          '<div style=""><span style="color:grey">' + this.poi_data[i].address + '</span></div>' +
          '</div>';
        const popup = new tt.Popup().setHTML(customPopup);
        this.map.setZoom(18);
        this.marker = new tt.Marker({draggable: false}).setLngLat([lng, lat]).setPopup(popup).addTo(this.map);
      }
      this.load_relatedData();
      let that = this;
      setTimeout(function () {
        that.checked_poi();
      }, 1000);
    }, error => {
      this.toastr.error('server is not responding')
    });
  }

  notdelete: any;

  remove_location(i: any, loc_name: any, id:any) {
    this.locationIDfordel = id;
    var conf = confirm('Do you really want to delete this location?');
    console.log(this.locationIDfordel, this.package_id, 'del location');
    if (conf) {
      this.location_services.DeleteLocation(this.locationIDfordel, this.package_id).subscribe((obj: any) => {
          this.toastr.success(obj.success);
          if (obj.error == false) {
            this.toastr.error(obj.message)
          }
          if (obj.error == true) {
            this.toastr.error(obj.message)
          }
          this.render_data();
          //this.render_data();
        }, (error) => {
          this.toastr.error('server is not responding')
        }
      );
      for (let k of this.all_search_data[i].pois) {
        var elmm = <HTMLInputElement>document.getElementById('poi_checked_' + k.id);
        if (elmm) {
          var isChecked = elmm.checked = false;
        }
      }

      this.all_search_data.splice(i, 1);
      if (this.keyword == loc_name) {
        if (this.all_search_data.length > 0) {
          this.poi_data = [];
          this.distinct_types = [];
          if (this.all_search_data[i] == undefined) {
            this.search_destination_by_location(this.all_search_data[0].ref_id, this.all_search_data[0].name, this.all_search_data[0].country_name, 'oo', this.all_search_data[0].geonameId)
          } else {
            this.search_destination_by_location(this.all_search_data[i].ref_id, this.all_search_data[i].name, this.all_search_data[i].country_name, 'oo', this.all_search_data[i].geonameId)
          }
        } else {
          this.poi_data = [];
          this.distinct_types = [];
        }
      } else {
        if (this.all_search_data.length == 0) {
          this.poi_data = [];
          this.distinct_types = [];
        }
      }

    }
  }

  search_destination(id: any, keyword: any, country_name: any, country_id: any, geonameId: any) {
    this.country_name = country_name;
    this.geonameId = geonameId;
    //this.country_code = country_id;
    this.pullit_country = false;
    this.keyword = keyword;
    this.all_keywords.push(this.keyword);
    this.search_data = [];
    this.RemoveAllMarkers();
    this.location_services.pullSearchByDestination(id).subscribe((data: any) => {
      console.log(data, 'hgshfjgfwjgfwgfewy')
      this.destinationData = data.destination;
      this.poi_data = this.destinationData.poi;
      this.all_poi_data = this.destinationData.poi;
      this.geonameId = this.destinationData.geonameid;
      this.country_id = this.destinationData.country_id;
      this.iso2 = this.destinationData.country_iso_2;
      this.iso3 = this.destinationData.country_iso_3;
      this.latitude = this.destinationData.latitude;
      this.longitude = this.destinationData.longitude;
      this.dest_id = this.destinationData.id;
      this.s3url = data.s3_url;
      //this.poi_types = this.destinationData.poi_types;
      this.set_keyData(this.country_name, this.geonameId, this.iso2, this.iso3, id, 'd', this.latitude, this.longitude);
      this.load_relatedData();
      this.load_marker();
      let that = this;
      setTimeout(function () {
        that.checked_poi();
      }, 1000);
    }, error => {
      this.toastr.error('cannot find the connection');
    });
  }

  search_destination_by_location(id: any, keyword: any, country_name: any, country_id: any, geonameId: any) {
    this.country_name = country_name;
    this.geonameId = geonameId;
    //this.country_code = country_id;
    this.pullit_country = false;
    this.keyword = keyword;
    this.search_data = [];
    this.RemoveAllMarkers();
    this.location_services.pullSearchByDestination(id).subscribe((data: any) => {
      this.destinationData = data.destination;
      this.poi_data = this.destinationData.poi;
      this.all_poi_data = this.destinationData.poi;
      this.s3url = data.s3_url;
      this.geonameId = this.destinationData.geonameid;
      this.country_id = this.destinationData.country_id;
      this.latitude = this.destinationData.latitude;
      this.longitude = this.destinationData.longitude
      this.set_keyData(this.country_name, this.geonameId, this.iso2, this.iso3, id, 'd', this.latitude, this.longitude);
      this.load_relatedData();
      this.load_marker();
      this.search_data = [];
      let that = this;
      setTimeout(function () {
        that.checked_poi();
      }, 1000);
    }, error => {
      this.toastr.error('cannot find the result');
    });
  }

  generateFake(count: number): Array<number> {
    const indexes = [];
    for (let i = 0; i < count; i++) {
      indexes.push(i);
    }
    return indexes;
  }

  load_relatedData() {
    var unique = [];
    this.distinct_types = [];
    for (var i = 0; i < this.poi_data.length; i++) {
      if (this.poi_data[i].attraction_type && !unique[this.poi_data[i].attraction_type]) {
        this.distinct_types.push(this.poi_data[i].attraction_type);
        unique[this.poi_data[i].attraction_type] = 1;
      }
    }
    //console.log(this.distinct_types)
  }

  load_marker() {
    for (var i = 0; i < this.poi_data.length; i++) {
      var lat = parseFloat(this.poi_data[i].latitude) > 90 ? 90 : parseFloat(this.poi_data[i].latitude);
      var lng = parseFloat(this.poi_data[i].longitude) > 90 ? 90 : parseFloat(this.poi_data[i].longitude);
      this.map.setCenter([lng, lat]);
      this.map.setZoom(8);
      var element = document.createElement('div');
      element.className = 'mapMarker';
      const customPopup = '<div style="display:inline">' +
        '<img src=' + this.poi_data[i].images_url + ' alt="" style="width:100%;max-width:100%;height:80px;">' +
        '<div style="width:100%;padding-top:10px"><span style="">' + this.poi_data[i].attraction_name + '</span></div>' +
        '<div style=""><span style="color:grey">' + this.poi_data[i].address + '</span></div>' +
        '</div>';
      const popup = new tt.Popup().setHTML(customPopup);
      this.marker = new tt.Marker({draggable: false}).setLngLat([lng, lat]).setPopup(popup).addTo(this.map);
    }
  }

  RemoveAllMarkers() {
    document.querySelectorAll('.mapboxgl-marker').forEach(function (a) {
      a.remove();
    })
  }

  filter_by_type(type: any) {
    var filter_poi = [];
    for (var i = 0; i < this.all_poi_data.length; i++) {
      if (this.all_poi_data[i].attraction_type == type) {
        filter_poi.push(this.all_poi_data[i]);
      }
    }
    this.poi_data = filter_poi;
    this.RemoveAllMarkers();
    this.load_marker();
  }

  all_keywords: any[] = [];

  search_poi(id: any, keyword: any, country_name: any, country_id: any, geonameId: any) {
    this.country_name = country_name;
    this.geonameId = geonameId;
    this.country_id = this.counId;
    this.pullit_country = false;
    this.poi_data = [];
    this.poi_dest = [];
    this.poi_types = [];
    this.keyword = keyword;
    this.RemoveAllMarkers();
    this.location_services.pullSearchByPoi(id).subscribe((data: any) => {
      console.log(data, 'search poi')
      this.poi_data = data.pois;
      for (let q = 0; q < this.poi_data.length; q++) {
        this.poi_dest.push(this.poi_data[q].destination.geonameid)
        this.Intso2.push(this.poi_data[q].destination.country_iso_2)
        this.Intso3.push(this.poi_data[q].destination.country_iso_3)
        this.counId.push(this.poi_data[q].destination.country_id)
        this.latitude.push(this.poi_data[q].destination.latitude)
        this.longitude.push(this.poi_data[q].destination.longitude)
      }
      this.geonameId = this.poi_dest;
      this.iso2 = this.Intso2;
      this.iso3 = this.Intso3;
      this.latitude = this.latitude;
      this.longitude = this.longitude;
      this.country_id = this.counId;
      this.poi_types = this.poi_data.poi_type;
      console.log(this.geonameId, 'sfasfasfasf')
      this.set_keyData(this.country_name, this.geonameId, this.iso2, this.iso3, id, 'p', this.latitude, this.longitude);
      this.search_data = [];
      this.s3url = data.s3_url;
      for (var i = 0; i < this.poi_data.length; i++) {
        var lat = parseFloat(this.poi_data[i].attraction_latitude) > 90 ? 90 : parseFloat(this.poi_data[i].attraction_latitude);
        var lng = parseFloat(this.poi_data[i].attraction_longitude) > 90 ? 90 : parseFloat(this.poi_data[i].attraction_longitude);
        this.map.setCenter([lng, lat]);
        var element = document.createElement('div');
        element.id = 'marker';
        const customPopup = '<div style="display:inline">' +
          '<img src=' + this.poi_data[i].images_url + ' alt="" style="width:100%;max-width:100%;height:80px;">' +
          '<div style="width:100%;padding-top:10px"><span style="">' + this.poi_data[i].attraction_name + '</span></div>' +
          '<div style=""><span style="color:grey">' + this.poi_data[i].address + '</span></div>' +
          '</div>';
        const popup = new tt.Popup().setHTML(customPopup);
        this.map.setZoom(18);
        this.marker = new tt.Marker({draggable: false}).setLngLat([lng, lat]).setPopup(popup).addTo(this.map);
      }
      this.load_relatedData();
      let that = this;
      setTimeout(function () {
        that.checked_poi();
      }, 1000);
    }, error => {
      this.toastr.error('authentication failed')
    });
  }

  closePoiMap() {   // map closing
    const poimapclose = document.getElementsByClassName('poiMap')[0];
    const changeShowresultDiv = document.getElementsByClassName('hidepoiMap')[0];
    const showmapbtn = document.getElementsByClassName('showpoiMap')[0];
    poimapclose.classList.add('d-none');
    changeShowresultDiv.classList.remove('col-md-9');
    changeShowresultDiv.classList.add('col-md-12');
    showmapbtn.classList.add('d-block');
  }

  showmapdiv() {   // map show
    const showmapdivclick = document.getElementsByClassName('poiMap')[0];
    const changeShowresultDiv = document.getElementsByClassName('hidepoiMap')[0];
    const poimapclose = document.getElementsByClassName('poiMap')[0];
    const showmapbtn = document.getElementsByClassName('showpoiMap')[0];
    showmapdivclick.classList.remove('d-block');
    changeShowresultDiv.classList.remove('col-md-12');
    changeShowresultDiv.classList.add('col-md-9');
    poimapclose.classList.remove('d-none');
    showmapbtn.classList.remove('d-block');
    showmapbtn.classList.add('d-none');
  }

  showSuccess(poi: any) {
    var poi_available = false;
    var index = 0;
    console.log(this.poi_selected);
    console.log(poi.id);
    if (this.poi_selected.length > 0) {
      let i = 0;
      for (let p_sel of this.poi_selected) {
        if (p_sel.id == poi.id) {
          poi_available = true;
          index = i;
        }
        i++;
      }
    }
    //  console.log(this.all_search_data)
    if (poi_available) {
      this.poi_selected.splice(index, 1);
      this.poi_selected_id.splice(index, 1);
      this.toastr.error(poi.attraction_name + ' removed (' + this.poi_selected.length + ')');
      if (this.all_search_data && this.all_search_data.length > 0) {
        for (let j = 0; j < this.all_search_data.length; j++) {
          if (this.all_search_data[j].name == this.keyword && this.all_search_data[j].pois.length > 0) {
            for (let k = 0; k < this.all_search_data[j].pois.length; k++) {
              if (this.all_search_data[j].pois[k].id == poi.id) {
                this.all_search_data[j].pois.splice(k, 1);
              }
            }
          }
        }
      }
    } else {
      this.poi_selected.push(poi);
      this.poi_selected_id.push(poi.id);
      if (this.all_search_data && this.all_search_data.length > 0) {
        for (let j = 0; j < this.all_search_data.length; j++) {
          if (this.all_search_data[j].name == this.keyword) {
            this.all_search_data[j].pois.push(poi);
          }
        }
      }
      this.loadPOISort(poi.id)
      this.toastr.success(poi.attraction_name + ' added (' + this.poi_selected.length + ')');
    }
    //console.log(this.all_search_data)
  }

  loadPOISort(poi_id: any) {
    console.log(this.poi_data);
    let ll = 0;
    let p_index = 0;
    for (let ppd of this.poi_data) {

      if (poi_id == ppd.id) {
        p_index = ll;
        if (p_index > 0) {
          this.adjustPOI(p_index);
        }
      }
      console.log(p_index);
      ll++;
    }
  }

  adjustPOI(ind: any) {
    var element = this.poi_data[ind];
    console.log(element);
    this.poi_data.splice(ind, 1);
    this.poi_data.splice(0, 0, element);
  }

  showSuccess2(poi: any) {

    var index = 0;
    /*console.log(this.poi_selected, 'dfdsdgdsgdsg')
    console.log(this.poi_selected_id, 'poi ID')*/
    if (this.poi_selected.length > 0) {
      let i = 0;
      for (let p_sel of this.poi_selected) {
        if (p_sel.id == poi.id) {
          this.poi_available = true;
          index = i;
        }
        i++;
      }
    }
    if (this.poi_available) {
      this.poi_selected.splice(index, 1);
      this.poi_selected_id.splice(index, 1);
      this.toastr.error(poi.attraction_name + ' removed (' + this.poi_selected.length + ')');

      if (this.all_search_data && this.all_search_data.length > 0) {
        for (let j = 0; j < this.all_search_data.length; j++) {
          if (this.all_search_data[j].name == this.keyword && this.all_search_data[j].pois.length > 0) {
            for (let k = 0; k < this.all_search_data[j].pois.length; k++) {
              if (this.all_search_data[j].pois[k].id == poi.id) {
                this.all_search_data[j].pois.splice(k, 1);
              } else if (this.all_search_data[j].pois[k].location_ref_id == poi.id) {
                this.all_search_data[j].pois.splice(k, 1);
              }
            }
          }
        }
      }
      console.log(this.poi_selected, 'If already exist remove')
    } else {
      this.poi_selected.push(poi);
      this.poi_selected_id.push(poi.id);
      if (this.all_search_data && this.all_search_data.length > 0) {
        for (let j = 0; j < this.all_search_data.length; j++) {
          if (this.all_search_data[j].name == this.keyword) {
            this.all_search_data[j].pois.push(poi);
          }
        }
      }
      this.toastr.success(poi.attraction_name + ' added (' + this.poi_selected.length + ')');
    }
    /*if (poi_available) {
      this.poi_selected.splice(index, 1);
      this.poi_selected_id.splice(index, 1);
      this.toastr.error(poi.attraction_name + ' removed (' + this.poi_selected.length + ')');

      if (this.all_search_data && this.all_search_data.length > 0) {
        for (let j = 0; j < this.all_search_data.length; j++) {
          if (this.all_search_data[j].name == this.keyword && this.all_search_data[j].pois.length > 0) {
            for (let k = 0; k < this.all_search_data[j].pois.length; k++) {
              if (this.all_search_data[j].pois[k].id == poi.id) {
                this.all_search_data[j].pois.splice(k, 1);
              }
            }
          }
        }
      }
      console.log(this.poi_selected, 'hi there!')
    } else {
      this.poi_selected.push(poi);
      this.poi_selected_id.push(poi.id);
      if (this.all_search_data && this.all_search_data.length > 0) {
        for (let j = 0; j < this.all_search_data.length; j++) {
          if (this.all_search_data[j].name == this.keyword) {
            this.all_search_data[j].pois.push(poi);
          }
        }
      }
      this.toastr.success(poi.attraction_name + ' added (' + this.poi_selected.length + ')');
    }*/

    //console.log(this.all_search_data)
  }

  checked_poi() {
    //console.log(this.poi_selected_id);
    if (this.poi_selected_id && this.poi_selected_id.length) {
      for (let k of this.poi_selected_id) {
        var elmm = <HTMLInputElement>document.getElementById('poi_checked_' + k);
        if (elmm) {
          var isChecked = elmm.checked = true;
          this.loadPOISort(k);
        }
      }
    }
    var elem = document.getElementById('poi_checked_')
  }

  destination_data() {
    this.isLoading = true;
    console.log(this.all_search_data);
    if (this.all_search_data.length > 0) {

    }
    this.location_services.location_create(this.package_id, this.all_search_data).subscribe((obj: any) => {
      console.log(obj);
      this.isLoading = false;
      this.toastr.success(obj.message);
      this.router.navigateByUrl('/departure-itinerary?package_id=' + this.package_id);
    }, (error) => {
      this.toastr.error('server is not responding')
    })
  }

  loadPermissionMenu() {
    if (localStorage.getItem('permissionArray') != null) {
      var permissionArray = JSON.parse(localStorage.getItem('permissionArray'));
      console.log(permissionArray, 'permission')
      permissionArray.forEach(permissions => {
        if (permissions == 'location-edit') {
          this.locationEdit = true;
        }
      });
    }
  }

}
