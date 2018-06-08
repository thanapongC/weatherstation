           var MongoClient3 = require('mongodb').MongoClient;
            var url3 = "mongodb://localhost:27017/watherdata";
            MongoClient3.connect(url3, function(err, db) {
                if (err) throw err;
                var date = new Date();  
                var datadate = (date.getDate());
                var datamonth = (date.getMonth()+1);
                var datayear = (date.getFullYear());
                var datenow = (datadate.toString()+datamonth.toString()+datayear.toString());
                var col =  db.collection("humiddata");  
                assert = require('assert');
                
                
                if (datadate == 1 ) {
                if (datamonth == 1 ) {
                   var lastmonth = (datamonth + 11);
                  // var lastmonthout = (lastmonth.toString()+1);
                } else {
                   var lastmonth = (datamonth - 1);
                  // var lastmonthout = (lastmonth.toString()+1);
                }
                } else {
                var lastmonth = (datamonth);
                }
                
                if(lastmonth == 1 || lastmonth == 2 || lastmonth == 3 || lastmonth == 4 || lastmonth == 5 || lastmonth == 6 || lastmonth == 7 || lastmonth == 8 || lastmonth == 9 ){
                  var monthout = ("0"+lastmonth.toString());
                }else{
                  var monthout = (lastmonth.toString());
                }
                
                if (datadate == 1 ) {
                   if (lastmonth == 1 || lastmonth == 3 || lastmonth == 5 || lastmonth == 7 || lastmonth == 8 || lastmonth == 10 || lastmonth == 12) {
                       var lastdate = (datadate+30);
                       var dateout = (lastdate.toString());
                  } else if (lastmonth == 4 || lastmonth == 6 || lastmonth == 9 || lastmonth == 11 ) {
                       var lastdate = (datadate+29);
                       var dateout = (lastdate.toString());
                  } else if (lastmonth == 2) {
                       var lastdate = (datadate+27);
                       var dateout = (lastdate.toString());
                  }   
                } else {
                      var lastdate = (datadate-1);
                      var dateout = (lastdate.toString());
                }
                
                if (lastdate == 31 && lastmonth == 12) {
                      var lastyear = (datayear-1);
                      var yearout = (lastyear.toString());
                } else {
                      var lastyear = datayear;
                      var yearout = (lastyear.toString());
                } 
              
              
                 
                  var findhumid = {day: dateout, month: monthout, year: yearout, hour: '00',  minute: '00'};
                  var findhumid1 = {day: dateout, month: monthout, year: yearout, hour: '01',  minute: '00'};
                  var findhumid2 = {day: dateout, month: monthout, year: yearout, hour: '02',  minute: '00'};
                  var findhumid3 = {day: dateout, month: monthout, year: yearout, hour: '03',  minute: '00'};
                  var findhumid4 = {day: dateout, month: monthout, year: yearout, hour: '04',  minute: '00'};
                  var findhumid5 = {day: dateout, month: monthout, year: yearout, hour: '05',  minute: '00'};
                  var findhumid6 = {day: dateout, month: monthout, year: yearout, hour: '06',  minute: '00'};
                  var findhumid7 = {day: dateout, month: monthout, year: yearout, hour: '07',  minute: '00'};
                  var findhumid8 = {day: dateout, month: monthout, year: yearout, hour: '08',  minute: '00'};
                  var findhumid9 = {day: dateout, month: monthout, year: yearout, hour: '09',  minute: '00'};
                  var findhumid10 = {day: dateout, month: monthout, year: yearout, hour: '10',  minute: '00'};
                  var findhumid11 = {day: dateout, month: monthout, year: yearout, hour: '11',  minute: '00'};
                  var findhumid12 = {day: dateout, month: monthout, year: yearout, hour: '12',  minute: '00'};
                  var findhumid13 = {day: dateout, month: monthout, year: yearout, hour: '13',  minute: '00'};
                  var findhumid14 = {day: dateout, month: monthout, year: yearout, hour: '14',  minute: '00'};
                  var findhumid15 = {day: dateout, month: monthout, year: yearout, hour: '15',  minute: '00'};
                  var findhumid16 = {day: dateout, month: monthout, year: yearout, hour: '16',  minute: '00'};
                  var findhumid17 = {day: dateout, month: monthout, year: yearout, hour: '17',  minute: '00'};
                  var findhumid18 = {day: dateout, month: monthout, year: yearout, hour: '18',  minute: '00'};
                  var findhumid19 = {day: dateout, month: monthout, year: yearout, hour: '19',  minute: '00'};
                  var findhumid20 = {day: dateout, month: monthout, year: yearout, hour: '20',  minute: '00'};
                  var findhumid21 = {day: dateout, month: monthout, year: yearout, hour: '21',  minute: '00'};
                  var findhumid22 = {day: dateout, month: monthout, year: yearout, hour: '22',  minute: '00'};
                  var findhumid23 = {day: dateout, month: monthout, year: yearout, hour: '23',  minute: '00'};
                
            
                  col.aggregate([ { $match : findhumid  } ,
                    {$group:{_id: null, max: { $push: "$humidvalue" } }}],	  
                    function(err, results) {
                    assert.equal(err, null);
                    if(results == "" ){
                      console.log("nodata")
                   }else{
                    var intrevahumid0 = results[0].max[0];
                  console.log(intrevahumid0)
                         
                  }
                  }                       
                  )
                  db.close();
                }); 
                
      