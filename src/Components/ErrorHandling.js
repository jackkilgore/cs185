

function is_before_cur_time(day, time) {

    var d = new Date();
    var cur_month = d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : (d.getMonth() + 1).toString();
    var cur_day = d.getDate() < 10 ? "0" + d.getDate() : d.getDate().toString();
    var cur_date = d.getFullYear() +  "." + cur_month + "." + cur_day;
    var m = d.getMinutes();
    var h = d.getHours();    
    cur_date +=  "." + h +"."+m;

    // get input time
    var days = day.split("-")
    var times = time.split(":");
    var hour = times[0];
    var min = times[1];
    var in_time = days[0] + "." + days[1] + "." + days[2] + "." + hour+ "."+min;
    return in_time < cur_date;
    
}

// Using ideas from here: https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
function is_valid_zoom(string) {
    let url;
    
    try {
      url = new URL(string);
    } catch (_) {
      return false;  
    }
    
    return string.search("zoom") !== -1;
}

export {is_before_cur_time, is_valid_zoom};