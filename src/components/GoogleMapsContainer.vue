<template>
    <div class="map-container" :id="theMap"></div>
</template>

<script>
    export default {
        name: "GoogleMapsContainer",
        data() {
            return {
                theMap: "map-for-" + this.name,
                latLong: {
                    latitude: '',
                    longitude: ''
                },
            }
        },
        props: {
            name,
            'latitude': {
                type: Number,
                default: function () {
                    return 39.50
                }
            },
            'longitude': {
                type: Number,
                default: function () {
                    return -98.35
                }
            },
            'zoom': {
                type: Number,
                default: function () {
                    return 4
                }
            }
        },


        methods: {
            showMap() {
                this.map = new google.maps.Map(document.getElementById(this.theMap), {
                    center: {lat: this.latitude, lng: this.longitude},
                    zoom: this.zoom
                });
            }
        },


        mounted() {
            this.showMap();
        },
        updated() {
            console.log('updated');
        }

    }
</script>

<style scoped>
    .map-container {
        width: 80vw;
        margin: 5vh auto;
        height: 50vh;
        background: fuchsia;
        content: 'PLEASE BE PATIENT ON A SLOW CONNECTIONS';
    }
</style>