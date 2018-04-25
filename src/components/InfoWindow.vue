<template>
    <div class="info-window--wrapper">
        <div id="info-window">
            <ul>
                <li v-for="result in searchResults">
                    <img v-if="result.photos" :src="result.photos[0].getUrl({ 'maxWidth': 140, 'maxHeight': 100 })" />
                    <img v-else src="http://via.placeholder.com/140x100" />
                    <h2>{{result.name}}</h2>
                    <p v-if="result.opening_hours">Is it open now? <span v-bind:style="result.opening_hours.open_now ? 'color:green' : 'color:red'">{{(result.opening_hours.open_now ? 'Yes :)': 'Nope :(')}}</span></p>
                    <p v-else>Is it open now? No info on that.</p>
                    <p class="venue-types">This location is associated with the following venue types: <strong>{{(result.types.filter(type => type !== "establishment" && type !== "point_of_interest").join(", ").replace("_", " "))}}</strong></p>

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
                searchResults: [],
            }
        },
        // computed:{
        //   venueTypes(){
        //       let theVenueTypes =
        //   }
        // },
        methods: {
            parseSearchResults() {
                let i;
                console.log(this.searchResults);
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
        text-align: left;
    }
    #info-window li {
        display: table;

    }
    #info-window h2 {

    }
    #info-window h2, p{
        display: table-cell;
        padding-left: 40px;
        vertical-align: middle;
    }
    .venue-types{
        text-decoration: underline;
    }
</style>