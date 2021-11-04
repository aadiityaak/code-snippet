jQuery(function($) {
// Menyimpan json provinsi dan kota ke local storage
    let JustLokasi = {
        storeCountry: function () {
            if (!JustLokasi.getCountry().length) {
                $.getJSON(parameterurl.json.country_url, function (data) {
                    data.sort(function (a, b) {
                        return (a.country_name > b.country_name) ? 1 : ((b.country_name > a.country_name) ? -1 : 0);
                    });
                    Lockr.set(parameterurl.json.country_key, data);
                });
            }
        },
        getCountry: function (search, searchMethod) {
            var items = Lockr.get(parameterurl.json.country_key);
            if (!items || typeof items === 'undefined') {
                return [];
            }
    
            if (search && search === Object(search)) {
                return JustLokasi.searchLocation(items, search, searchMethod);
            }
    
            return items;
        },
        storeProvince: function () {
            if (!JustLokasi.getProvince().length) {
                $.getJSON(parameterurl.json.province_url, function (data) {
                    data.sort(function (a, b) {
                        return (a.province_name > b.province_name) ? 1 : ((b.province_name > a.province_name) ? -1 : 0);
                    });
                    Lockr.set(parameterurl.json.province_key, data);
                });
            }
        },
        getProvince: function (search, searchMethod) {
            var items = Lockr.get(parameterurl.json.province_key);
            if (!items || typeof items === 'undefined') {
                return [];
            }
    
            if (search && search === Object(search)) {
                return JustLokasi.searchLocation(items, search, searchMethod);
            }
    
            return items;
        },
        storeCity: function () {
            if (!JustLokasi.getCity().length) {
                $.getJSON(parameterurl.json.city_url, function (data) {
                    data.sort(function (a, b) {
                        return (a.city_name > b.city_name) ? 1 : ((b.city_name > a.city_name) ? -1 : 0);
                    });
                    Lockr.set(parameterurl.json.city_key, data);
                });
            }
        },
        getCity: function (search, searchMethod) {
            var items = Lockr.get(parameterurl.json.city_key);
            if (!items || typeof items === 'undefined') {
                return [];
            }
    
            if (search && search === Object(search)) {
                return JustLokasi.searchLocation(items, search, searchMethod);
            }
    
            return items;
        },
        storeSubdistrict: function () {
            if (!JustLokasi.getSubdistrict().length) {
                $.getJSON(parameterurl.json.subdistrict_url, function (data) {
                    data.sort(function (a, b) {
                        return (a.subdistrict_name > b.subdistrict_name) ? 1 : ((b.subdistrict_name > a.subdistrict_name) ? -1 : 0);
                    });
                    Lockr.set(parameterurl.json.subdistrict_key, data);
                });
            }
        },
        getSubdistrict: function (search, searchMethod) {
            var items = Lockr.get(parameterurl.json.subdistrict_key);
            if (!items || typeof items === 'undefined') {
                return [];
            }
    
            if (search && search === Object(search)) {
                return JustLokasi.searchLocation(items, search, searchMethod);
            }
    
            return items;
        },
        searchLocation: function (items, search, searchMethod) {
            if (searchMethod === 'filter') {
                return items.filter(function (item) {
                    return JustLokasi.isLocationMatch(item, search);
                });
            }
    
            return items.find(function (item) {
                return JustLokasi.isLocationMatch(item, search);
            });
        },
        isLocationMatch: function (item, search) {
            var isItemMatch = true;
            for (var key in search) {
                if (!item.hasOwnProperty(key) || String(item[key]).toLowerCase() !== String(search[key]).toLowerCase()) {
                    isItemMatch = false;
                }
            }
            return isItemMatch;
        }
    };
    
    JustLokasi.storeCountry(); // Store custom country data to local storage.
    JustLokasi.storeProvince(); // Store custom province data to local storage.
    JustLokasi.storeCity(); // Store custom city data to local storage.
    JustLokasi.storeSubdistrict(); // Store custom subdistrict data to local storage.
    
    let provinsi = JustLokasi.getProvince();
    let kota = JustLokasi.getCity();

    // membuat input datalist province dan kota jquery
    let inputProvinsi = $('#provinsi-10');
    let inputKota = $('#kota-10');

    $(inputProvinsi).attr("list","daftarprovinsi");
    $(inputKota).attr("list","daftarkota");

    // append datalist province dan kota    
    let listprovinsi = '';
    $.each(provinsi, function (index, value) {
        listprovinsi += '<option value="' + value.province + '">' + value.province + '</option>';
    });
    inputProvinsi.append('<datalist id="daftarprovinsi">'+ listprovinsi +'</datalist>');

    let listkota = '';
    $.each(kota, function (index, value) {
        if(inputProvinsi.val() == value.province){
            listkota += '<option value="' + value.city_name + '">' + value.city_name + '</option>';
        }
    });
    inputKota.append('<datalist id="daftarkota">'+ listkota +'</datalist>');

    
});