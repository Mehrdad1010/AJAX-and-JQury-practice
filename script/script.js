// diclear the variabel that save data in it
let reserve = {};
//--------------------------------------


// diclear wihch url we want request
loadDoc("https://restcountries.com/v3.1/all", myFunction); //we write a qury and save all of the data to the reserv




// wright a synch AJAX to request evry where we want
function loadDoc(url, cFunction) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        cFunction(this);
      }
    }
    xhttp.open("GET", url);
    xhttp.send();
}
// -------------------------------------------
  
// 1-Timezone, 2-flag, 3-capital, 4-Native Name, 5-Languages, 6-population, 7-Rigion, 8-call code
// what happen with request wen it is resive
function myFunction(xhttp) {
    let Data_reserve = {}
    let page = JSON.parse(xhttp.responseText)
    var a_creator = 0
    page.map(function(item, index) {
        a_creator +=1
        var contry = {}
        // console.log(item);

        if (item["idd"]["suffixes"] == undefined) {
          contry["contry code"] = item["idd"]["root"]
        }else if (item["idd"]["suffixes"].length>1) {
          contry["contry code"] = item["idd"]["root"] 
        }else{
          contry["contry code"] = item["idd"]["root"] + item["idd"]["suffixes"]
        }
        
        contry["lating"] = item["latlng"]
        contry["Region"] = item["region"] + ", "+item["subregion"]
        contry["Population"] = item["population"]
        contry["Timezone"] = item["timezones"][0]
        contry["flag"] = item["flags"]["png"]
        
        var google_log = item["maps"]["googleMaps"];
        // google_log = google_log.split("/")
        // google_log[3] = google_log[3]+"/embed"
        // google_log = google_log.join("/")
        contry["map"] = google_log
        contry["id_number"] = a_creator

        if (item["languages"] == undefined) {
          contry["Languages"] = "__"
        }else {
          var lang = Object.keys(item["languages"])[0]
          contry["Languages"] = item["languages"][lang]
        }
        if (item["capital"] == undefined) {
          contry["Captal"] = "__"
        }else {
          contry["Captal"] = item["capital"][0]
        }
        
        if (item["name"]["nativeName"] == undefined) {
          contry["Native Name"] = item["name"]["common"]
        }else {
          var language = Object.keys(item["name"]["nativeName"])[0]
          contry["Native Name"] = item["name"]["nativeName"][language]["common"]
        }
        contry["full_name"] = item["name"]["common"]+" ("+item["name"]["official"]+")"
        Data_reserve[item["name"]["common"]] = contry 
      })
   
      $(document).ready(function(){
        for (const key in Data_reserve) {
          var option = $(`<option id=${Data_reserve[key]["id_number"]}>${key}</option>`)
          $("#SearchBar").append(option)
          $(`#${Data_reserve[key]["id_number"]}`).click(function () {
            $("#Property").empty();
            $("#phone").empty();
            $("#flag").empty();
            $("#map_hoder").empty();

            var name = $(`<div><h4 class="text-white">${Data_reserve[key]["full_name"]}</h4></div>`)
            var Native = $(`<p class="m-0"><span class="text-warning">Native Name:</span> <span class="text-white">${Data_reserve[key]["Native Name"]}</span></p>`)
            var Capt = $(`<p class="m-0"><span class="text-warning">Capital:</span> <span class="text-white">${Data_reserve[key]["Captal"]}</span></p>`)
            var Rig = $(`<p class="m-0"><span class="text-warning">Region:</span> <span class="text-white">${Data_reserve[key]["Region"]}</span></p>`)
            var pop = $(`<p class="m-0"><span class="text-warning">Population:</span> <span class="text-white">${Data_reserve[key]["Population"]}</span></p>`)
            var lan = $(`<p class="m-0"><span class="text-warning">Languages:</span> <span class="text-white">${Data_reserve[key]["Languages"]}</span></p>`)
            var tim = $(`<p class="m-0"><span class="text-warning">Timezones:</span> <span class="text-white">${Data_reserve[key]["Timezone"]}</span></p>`)
            $("#Property").append(name, Native, Capt, Rig, pop, lan, tim)

            var call = $(`<p style="font-size:150px">${Data_reserve[key]["contry code"]}</p>`)
            $("#phone").append(call)

            var flag = $(`<img src=${Data_reserve[key]["flag"]} alt="flag" class="w-100 h-100">`)
            $("#flag").append(flag)

            // var mapProp = {
            //   center: new google.maps.LatLng(Data_reserve[key]["lating"][0],Data_reserve[key]["lating"][1]),
            //   zoom: 5,
            // };
            // var map = new google.maps.Map(document.getElementById("map_hoder"), mapProp);
            // console.log(map);
            var map = $(`<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2990.274257380938!2d-70.56068388481569!3d41.45496659976631!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e52963ac45bbcb%3A0xf05e8d125e82af10!2sDos%20Mas!5e0!3m2!1sen!2sus!4v1671220374408!5m2!1sen!2sus"
             width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`)
            console.log(Data_reserve[key]["map"]);
             //  ${Data_reserve[key]["map"]}
            $("#map_hoder").append(map)
          })
        }
      })
}

// -----------------------------------------
  
// when this function give json file and a empty list it is full it with id number and property 
function save_data(reserve, json_file) {
    for (let index = 0; index < json_file.length; index++) {
      reserve[index] = json_file[index]
    }
    return reserve
}
// ----------------------------------------------------------------------------