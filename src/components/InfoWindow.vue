<template>
    <div class="info-window--wrapper">
        <div id="info-window">
            <ul>
                <li v-for="result in testing">
                    {{ result }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import {Bus} from "../main";

    export default {
        name: "InfoWindow",
        data() {
            return {
                testing: ['accounting',
                    'airport',
                    'amusement_park',
                    'aquarium',
                    'art_gallery',
                    'atm',
                    'bakery',
                    'bank',
                    'bar',
                    'beauty_salon',
                    'bicycle_store',
                    'book_store',
                    'bowling_alley',
                    'bus_station',
                    'cafe'],
                searchResults: []
            }
        },
        methods: {
            parseSearchResults() {
                console.log('oh hello');
                //console.log(this.searchResults);
                // let i;
                // for (i = 0; i < this.searchResults; i++) {
                //     document.getElementById("info-window ul").innerHTML += '<li id="resultsNumber-"' + i + '>'+this.searchResults[i]+'</li>'
                //     console.log(this.searchResults[i].name);
                // }
                // for (let result of this.searchResults){
                //     document.getElementById("info-window ul").innerHTML += '<li id="resultsNumber-"' + i + '>'+this.searchResults[i]+'</li>'
                // }
            }
        },
        mounted() {
            Bus.$on('passSearchResults', (input) => {
                this.searchResults = input;
                this.parseSearchResults();

            });

        }
    }
</script>

<style scoped>
    .info-window--wrapper {
        text-align: center;
    }

    #info-window {
        margin: 0 auto;
        width: 100%;
        height: 20vh;
        overflow: scroll;
        background: aquamarine;
    }

    #info-window ul {
        list-style-type: none;
    }
    #info-window li {
        text-align: left;
    }
</style>