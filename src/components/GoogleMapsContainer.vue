<template>
    <div class="map-container" :id="theMap"></div>
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
                zoom: 15
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

                return new Promise(function (resolve, reject) {
                    geocoder.geocode({'address': (theLocation ? theLocation : 'canada')}, function (results, status) {
                        if (status === google.maps.GeocoderStatus.OK) {
                            console.log(results[0].geometry.location.lat(), results[0].geometry.location.lng());
                            latLong.latitude = results[0].geometry.location.lat();
                            latLong.longitude = results[0].geometry.location.lng();
                            let myLatlng = new google.maps.LatLng(latLong.latitude, latLong.longitude);
                            self.map.panTo(myLatlng);
                        } else {
                            reject(status);
                        }
                    });
                });
            },
            getPlaces() {
                let map;
                let service;
                let infowindow;

                function initialize() {
                    let pyrmont = new google.maps.LatLng(this.latLong.latitude, this.latLong.longitude);
                    console.log(pyrmont);

                    map = new google.maps.Map(document.getElementById(this.theMap), {
                        center: pyrmont,
                        zoom: this.zoom
                    });

                    let request = {
                        location: pyrmont,
                        radius: this.radius,
                        type: [this.interest]
                    };

                    service = new google.maps.places.PlacesService(map);
                    service.nearbySearch(request, callback);

                    function callback(results, status) {
                        if (status === google.maps.places.PlacesServiceStatus.OK) {
                            for (let i = 0; i < results.length; i++) {
                                let place = results[i];
                                createMarker(results[i]);
                            }
                            console.log(results);
                            console.log(status);
                        }
                    }
                }

            }
        },
        mounted() {
            this.showMap();
            console.log(this.location, this.interest);
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
                this.getPlaces();
            }
        },


    }
</script>

<style scoped>
    .map-container {
        width: 80vw;
        margin: 5vh auto;
        height: 50vh;
        background: fuchsia;
    }
</style>