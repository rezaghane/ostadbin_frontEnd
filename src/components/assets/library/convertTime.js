//--------------------------time2minutes----------------------------------------
export function time2minutes(time) {
  var result = 0, arr = time.split(':')
	result = parseInt(arr[0] * 60);
	result += parseInt(arr[1]);
	return result
}
//--------------------------minutes2time----------------------------------------
export function minutes2time(minutes) {
  var num = minutes;
  var hours = (num / 60);
  var rhours = (Math.floor(hours)).toString();
  var rhours = (rhours.length == 1) ? "0"+rhours : rhours;
  var minutes = (hours - rhours) * 60;
  var rminutes = (Math.round(minutes)).toString();
  var rminutes = (rminutes.length == 1) ? "0"+rminutes : rminutes;
  return rhours + ":" + rminutes;
}
//--------------------------زمان کلاس ها----------------------------------------
export function classTime(startTime='', lengthTime='', breakTime='') {
  let s = time2minutes(startTime);
  let e = 0;
  let l = parseInt(lengthTime);
  let b = parseInt(breakTime);
  let time = [];
  let times = [];
  for(var J = 0; J < 50; J++){
    s = (J > 0) ? (e + b) : parseInt(s) + (parseInt(l) * parseInt(J));
    e = s + parseInt(l);
    if(parseInt(e) > 1440) break;
    time = {
      'start': minutes2time(s),
      'end': minutes2time(e),
      'reserved': 1,
      'status': 1,
    };
    times.push(time);
  }
  return times;
}
//--------------------------آماده سازی زمان ها برای انتخاب--------------------
export function timeOptions(startTime='', lengthTime='', breakTime='') {
  let time = [];
  let times = [];
  let fields = (startTime=='' || lengthTime=='' || breakTime=='') ? [] : classTime(startTime, lengthTime, breakTime);
  for(let i=0; i<fields.length; i++) {
    time = {
      'id': i,
      'label': fields[i].start + " _ " + fields[i].end,
    };
    times.push(time);
  }
  return times;
}
//--------------------------آماده سازی زمان ها برای انتخاب--------------------
export function vlaTimeOptions(startTime='', lengthTime='', breakTime='') {
  let times = [];
  let fields = (startTime=='' || lengthTime=='' || breakTime=='') ? [] : classTime(startTime, lengthTime, breakTime);
  for(let i=0; i<fields.length; i++) {
    times.push(i);
  }
  return times;
}
