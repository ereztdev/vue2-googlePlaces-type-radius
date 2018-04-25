<template>
    <div class="map-container" :id="theMap" v-bind:class="{ fiddyHeight: searched }"></div>
</template>
<script>
    import {Bus} from "../main";

    export default {
        name: "GoogleMapsContainer",
        data() {
            return {
                theMap: "map-for-" + this.name,
                location: '',
                interest: '',
                radius: '',
                latLong: {
                    latitude: 43.6532,
                    longitude: -79.3832
                },
                zoom: 15,
                searched: false,
                searchResults: []
            }
        },
        props: {
            name,
        },
        methods: {
            showMap() {
                this.map = new google.maps.Map(document.getElementById(this.theMap), {
                    center: {lat: this.latLong.latitude, lng: this.latLong.longitude},
                    zoom: this.zoom
                });
            },
            geoDecoding() {
                let geocoder = new google.maps.Geocoder();
                let theLocation = this.location;
                let latLong = this.latLong;
                self = this;

                let service = new google.maps.places.PlacesService(this.map);
                var erez_markers = [];

                return new Promise(function (resolve, reject) {
                    geocoder.geocode({'address': theLocation}, function (results, status) {
                        if (status === google.maps.GeocoderStatus.OK) {
                            console.log(results[0].geometry.location.lat(), results[0].geometry.location.lng());
                            latLong.latitude = results[0].geometry.location.lat();
                            latLong.longitude = results[0].geometry.location.lng();
                            this.myLatlng = new google.maps.LatLng(latLong.latitude, latLong.longitude);
                            self.map.panTo(this.myLatlng);

                            let request = {
                                location: this.myLatlng,
                                radius: self.radius,
                                type: self.interest
                            };

                            service.nearbySearch(request, callback);

                            function callback(results, status) {
                                // console.log("results", results);
                                if (status === google.maps.places.PlacesServiceStatus.OK) {
                                    for (var i = 0; i < erez_markers.length; i++) {
                                        erez_markers[i].setMap(null);
                                    }
                                    erez_markers = [];
                                    for (let i = 0; i < results.length; i++) {
                                        createMarker(results[i]);
                                    }
                                    self.searchResults = results;
                                    Bus.$emit('passSearchResults', self.searchResults);
                                }
                            }

                            function createMarker(place) {
                                let placeLoc = place.geometry.location;
                                let marker = new google.maps.Marker({
                                    map: self.map,
                                    position: place.geometry.location
                                });
                                erez_markers.push(marker);
                            }

                        } else {
                            reject(status);
                        }
                    });
                });
            }
        },
        mounted() {
            this.showMap();
            Bus.$on('passSearched', (input) => {
                this.searched = input;
            });
        },
        created() {
            //this.showMap();
            //this.geoDecoding();
            Bus.$on('passLocation', (input) => {
                this.location = input;
                this.geoDecoding();
            });
            if (this.latLong.latitude && this.latLong.longitude) {
                Bus.$on('passInterest', (input) => {
                    this.interest = input;
                });
                Bus.$on('passRadius', (input) => {
                    this.radius = input;
                });
                // this.getPlaces();
            }
        },
    }
</script>

<style scoped>
    .map-container {
        /*height: calc((100vh/3)*2);*/
        height: 62.3vh;
        margin: 0 auto;
        width: 100%;
        background: fuchsia;
    }
</style>