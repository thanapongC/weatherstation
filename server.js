var express = require('express');
var app = express();
var http = require("http").createServer(app);
var io =require('socket.io')(http);
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('express-handlebars');

var mySocket;

function onOpen(){}
http.listen(9999,function(){});
io.on("connection",function(socket){
    console.log(socket.connected);
   });

// view engine setup
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');

var url = 'mongodb://localhost:27017/watherdata';



/* GET home page. */
app.get('/', function(req, res, next) {
  res.render('index');
});



app.get('/light', function(req, res, next) {     
    io.on("connection",function(socket){        
  if (socket.connected == true) {
     sendlight();
     sendlightmonth();
     sendlightyear();
  }  
}); 
res.render('light');
}); 

app.get('/temp', function(req, res, next) {     
    io.on("connection",function(socket){        
  if (socket.connected == true) {
     sendtemp();
     sendtempmonth();
     sendtempyear();
  }  
}); 
res.render('temp');
}); 

app.get('/humid', function(req, res, next) {     
    io.on("connection",function(socket){        
  if (socket.connected == true) {
     sendhumid();
     sendhumidmonth();
     sendhumidyear();
  }  
}); 

res.render('humid');
}); 
app.get('/soil', function(req, res, next) {     
    io.on("connection",function(socket){        
  if (socket.connected == true) {
     sendsoil();
     sendsoilmonth();
     sendsoilyear();
  }  
}); 

res.render('soil');
}); 
app.get('/rain', function(req, res, next) {     
    io.on("connection",function(socket){        
  if (socket.connected == true) {
     sendrain();
     sendrainmonth();
     sendrainyear();
  }  
}); 
res.render('rain');
}); 

app.get('/dust', function(req, res, next) {     
    io.on("connection",function(socket){        
  if (socket.connected == true) {
     senddust();
     senddustmonth();
     senddustyear();
  }  
}); 
res.render('dust');
}); 



app.post('/sendlight', function(req, res, next) {
    var date = {
      day: req.body.Day,
      month: req.body.Month,
      year: req.body.Year,
    };
    var resultArray = [];
    mongo.connect(url, function(err, db) {
      assert.equal(null, err);
      var cursor = db.collection('lightdata').find(date);
      cursor.forEach(function(doc, err) {
        assert.equal(null, err);
        resultArray.push(doc);
      }, function() {
        db.close();        
        res.render('light', {items: resultArray});
      });
    });
  });

 

  app.post('/sendtemp', function(req, res, next) {
    var date = {
      day: req.body.Day,
      month: req.body.Month,
      year: req.body.Year,
    };
    var resultArray = [];
    mongo.connect(url, function(err, db) {
      assert.equal(null, err);
      var cursor = db.collection('tempdata').find(date);
      cursor.forEach(function(doc, err) {
        assert.equal(null, err);
        resultArray.push(doc);
      }, function() {
        db.close();
        res.render('temp', {items: resultArray});
      });
    });
  });

  app.post('/sendhumid', function(req, res, next) {
    var date = {
      day: req.body.Day,
      month: req.body.Month,
      year: req.body.Year,
    };
    var resultArray = [];
    mongo.connect(url, function(err, db) {
      assert.equal(null, err);
      var cursor = db.collection('humiddata').find(date);
      cursor.forEach(function(doc, err) {
        assert.equal(null, err);
        resultArray.push(doc);
      }, function() {
        db.close();
        res.render('humid', {items: resultArray});
      });
    });
  });

  app.post('/sendsoil', function(req, res, next) {
    var date = {
      day: req.body.Day,
      month: req.body.Month,
      year: req.body.Year,
    };
    var resultArray = [];
    mongo.connect(url, function(err, db) {
      assert.equal(null, err);
      var cursor = db.collection('soildata').find(date);
      cursor.forEach(function(doc, err) {
        assert.equal(null, err);
        resultArray.push(doc);
      }, function() {
        db.close();
        res.render('soil', {items: resultArray});
      });
    });
  });

  app.post('/sendrain', function(req, res, next) {
    var date = {
      day: req.body.Day,
      month: req.body.Month,
      year: req.body.Year,
    };
    var resultArray = [];
    mongo.connect(url, function(err, db) {
      assert.equal(null, err);
      var cursor = db.collection('raindata').find(date);
      cursor.forEach(function(doc, err) {
        assert.equal(null, err);
        resultArray.push(doc);
      }, function() {
        db.close();
        res.render('rain', {items: resultArray});
      });
    });
  });

  app.post('/senddust', function(req, res, next) {
    var date = {
      day: req.body.Day,
      month: req.body.Month,
      year: req.body.Year,
    };
    var resultArray = [];
    mongo.connect(url, function(err, db) {
      assert.equal(null, err);
      var cursor = db.collection('dustdata').find(date);
      cursor.forEach(function(doc, err) {
        assert.equal(null, err);
        resultArray.push(doc);
      }, function() {
        db.close();
        res.render('dust', {items: resultArray});
      });
    });
  });

var Serialport = require('serialport');
var Serialport2 = require('serialport');
var Serialport3 = require('serialport');
var Serialport4 = require('serialport');
var Serialport5 = require('serialport');
var Serialport6 = require('serialport');



//lightSensor
var myPort = new Serialport("COM6",{
    baudrate: 115200,
   
});
//TempSersor
var myPort2 = new Serialport2("COM16",{
    baudrate: 9600,
    
});
//HumidSensor
var myPort3 = new Serialport2("COM19",{
    baudrate: 9600,
   
});
//SoilmoistureSersor
var myPort4 = new Serialport2("COM18",{
    baudrate: 9600,
    
});
//RainSensor
var myPort5 = new Serialport2("COM14",{
    baudrate: 9600,
    
});
//DustSensor
var myPort6 = new Serialport2("COM15",{
    baudrate: 9600,
    
});


myPort.on('open',onOpen);
myPort2.on('open',onOpen);
myPort3.on('open',onOpen);
myPort4.on('open',onOpen);
myPort5.on('open',onOpen);
myPort6.on('open',onOpen);



myPort.on('data', function (dato) {

     var Light = {light: +dato};

     var date = new Date();      
     var timehour = (date.getHours());
     var timeminute = (date.getMinutes());
     var timesecond = (date.getSeconds());
     if(timehour == 1 || timehour == 2 || timehour == 3 || timehour == 4 || timehour== 5 || timehour == 6 || timehour == 7 || timehour == 8 || timehour == 9 || timehour == 0){
      var hourout = ("0"+timehour.toString());
    }else{
        var hourout = (timehour.toString());
    }
     var timenow = (timehour.toString()+timeminute.toString()); 
     
     //getDate
     var datadate = (date.getDate());
     var datamonth = (date.getMonth()+1);
     var datayear = (date.getFullYear());
     var dateout = (datadate.toString());
     if(datamonth == 1 || datamonth == 2 || datamonth == 3 || datamonth == 4 || datamonth == 5 || datamonth == 6 || datamonth == 7 || datamonth == 8 || datamonth == 9 ){
       var monthout = ("0"+datamonth.toString());
     }else{
         var monthout = (datamonth.toString());
     }
    var yearout = (datayear.toString());
    var datenow = (datadate.toString()+datamonth.toString()+datayear.toString());

    console.log("********** Date : Day "+datadate+" Month "+(monthout)+" Year "+datayear+"  Time : Hour "+timehour+" Minute "+timeminute+" Second "+timesecond+" **********");
    console.log();
    console.log("          Lightvalue :" +dato);
    if(+dato > 24 ){
     io.emit('test',{
         valor: +dato
        });
      }

    if (timeminute == 0 && timesecond == 0) {
    var MongoClientlight = require('mongodb').MongoClient;
    var urllight = "mongodb://localhost:27017/watherdata";
     MongoClientlight.connect(urllight, function(err, db) {
        if (err) throw err;
     var myobj = { day: dateout, 
                   month: monthout,
                   year: yearout, 
                   hour: hourout,  
                   minute: "00", 
                   lightvalue: +dato };
     db.collection("lightdata").insertOne(myobj, function(err, res) {
     if (err) throw err;
     console.log("light inserted");
     db.close();

  });
 });
 }
 

});




myPort2.on('data', function (dato2) {
        
         console.log("          Tempereturevalue :" +dato2);
         var temp = {Temp: +dato2};

         var date = new Date();      
         var timehour = (date.getHours());
         var timeminute = (date.getMinutes());
         var timesecond = (date.getSeconds());
         if(timehour == 1 || timehour == 2 || timehour == 3 || timehour == 4 || timehour== 5 || timehour == 6 || timehour == 7 || timehour == 8 || timehour == 9 || timehour == 0){
          var hourout = ("0"+timehour.toString());
        }else{
            var hourout = (timehour.toString());
        }
         var timenow = (timehour.toString()+timeminute.toString()); 
         
         //getDate
         var datadate = (date.getDate());
         var datamonth = (date.getMonth()+1);
         var datayear = (date.getFullYear());
         var dateout = (datadate.toString());
         if(datamonth == 1 || datamonth == 2 || datamonth == 3 || datamonth == 4 || datamonth == 5 || datamonth == 6 || datamonth == 7 || datamonth == 8 || datamonth == 9 ){
           var monthout = ("0"+datamonth.toString());
         }else{
             var monthout = (datamonth.toString());
         }
        var yearout = (datayear.toString());
    var datenow = (datadate.toString()+datamonth.toString()+datayear.toString());
         //return data;
         
         io.emit('test2',{
             valor: +dato2
            });
            io.emit('test22',{
              valor: +dato2
             });
    if (timeminute == 0 && timesecond == 0) {
    var MongoClienttemp = require('mongodb').MongoClient;
    var urltemp = "mongodb://localhost:27017/watherdata";
    MongoClienttemp.connect(urltemp, function(err, db) {
        if (err) throw err;
        var myobj = { day: dateout, 
          month: monthout,
          year: yearout, 
          hour: hourout,  
          minute: "00", 
          tempvalue: +dato2 };     
     db.collection("tempdata").insertOne(myobj, function(err, res) {
     if (err) throw err;
     console.log("temp inserted");
     db.close();
  });
 });
}

});


myPort3.on('data', function (dato3) {
    
     console.log("          Humidityvalue :" +dato3);
     var humid = {Humid: dato3};
     //return data;

     var date = new Date();      
     var timehour = (date.getHours());
     var timeminute = (date.getMinutes());
     var timesecond = (date.getSeconds());
     if(timehour == 1 || timehour == 2 || timehour == 3 || timehour == 4 || timehour== 5 || timehour == 6 || timehour == 7 || timehour == 8 || timehour == 9 || timehour == 0){
      var hourout = ("0"+timehour.toString());
    }else{
        var hourout = (timehour.toString());
    }
     var timenow = (timehour.toString()+timeminute.toString()); 
     
     //getDate
     var datadate = (date.getDate());
     var datamonth = (date.getMonth()+1);
     var datayear = (date.getFullYear());
     var dateout = (datadate.toString());
     if(datamonth == 1 || datamonth == 2 || datamonth == 3 || datamonth == 4 || datamonth == 5 || datamonth == 6 || datamonth == 7 || datamonth == 8 || datamonth == 9 ){
       var monthout = ("0"+datamonth.toString());
     }else{
         var monthout = (datamonth.toString());
     }
    var yearout = (datayear.toString());
    var datenow = (datadate.toString()+datamonth.toString()+datayear.toString());
     
     io.emit('test3',{
         valor: +dato3
        });

    if (timeminute == 0 && timesecond == 0) {
    var MongoClienthumid = require('mongodb').MongoClient;
    var urlhumid= "mongodb://localhost:27017/watherdata";
    MongoClienthumid.connect(urlhumid, function(err, db) {
        if (err) throw err;
        var myobj = { day: dateout, 
          month: monthout,
          year: yearout, 
          hour: hourout,  
          minute: "00", 
          humidvalue: +dato3 };  
     db.collection("humiddata").insertOne(myobj, function(err, res) {
     if (err) throw err;
     console.log("humid inserted");
     db.close();
  });
 });
}

});  



myPort4.on('data', function (dato4) {
    
     console.log("          Soilmoistuervalue :" +dato4);
     var soilmoisture = {Soilmoisture: dato4};
     //return data;

     var date = new Date();      
     var timehour = (date.getHours());
     var timeminute = (date.getMinutes());
     var timesecond = (date.getSeconds());
     if(timehour == 1 || timehour == 2 || timehour == 3 || timehour == 4 || timehour== 5 || timehour == 6 || timehour == 7 || timehour == 8 || timehour == 9 || timehour == 0){
      var hourout = ("0"+timehour.toString());
    }else{
        var hourout = (timehour.toString());
    }
     var timenow = (timehour.toString()+timeminute.toString()); 
     
     //getDate
     var datadate = (date.getDate());
     var datamonth = (date.getMonth()+1);
     var datayear = (date.getFullYear());
     var dateout = (datadate.toString());
     if(datamonth == 1 || datamonth == 2 || datamonth == 3 || datamonth == 4 || datamonth == 5 || datamonth == 6 || datamonth == 7 || datamonth == 8 || datamonth == 9 ){
       var monthout = ("0"+datamonth.toString());
     }else{
         var monthout = (datamonth.toString());
     }
    var yearout = (datayear.toString());
    var datenow = (datadate.toString()+datamonth.toString()+datayear.toString());
     
     io.emit('test4',{
         valor: +dato4
        });

    if (timeminute == 0 && timesecond == 0) {
    var MongoClientsoil = require('mongodb').MongoClient;
    var urllightsoil = "mongodb://localhost:27017/watherdata";
    MongoClientsoil.connect(urllightsoil, function(err, db) {
        if (err) throw err;
        var myobj = { day: dateout, 
          month: monthout,
          year: yearout, 
          hour: hourout,  
          minute: "00", 
          soilvalue: +dato4 };
     db.collection("soildata").insertOne(myobj, function(err, res) {
     if (err) throw err;
     console.log("soil inserted");
     db.close();
  });
 });
}
    

});  



myPort5.on('data', function (dato5) {
    
     console.log("          Rainvalue :" +dato5);
     var rain = {Rain: +dato5};
     //return data;

     var date = new Date();      
     var timehour = (date.getHours());
     var timeminute = (date.getMinutes());
     var timesecond = (date.getSeconds());
     if(timehour == 1 || timehour == 2 || timehour == 3 || timehour == 4 || timehour== 5 || timehour == 6 || timehour == 7 || timehour == 8 || timehour == 9 || timehour == 0){
      var hourout = ("0"+timehour.toString());
    }else{
        var hourout = (timehour.toString());
    }
    if(timeminute == 1 || timeminute == 2 || timeminute== 3 || timeminute == 4 || timeminute== 5 || timeminute == 6 || timeminute == 7 || timeminute == 8 || timeminute == 9 || timeminute == 0){
      var minuteout = ("0"+timeminute.toString());
      
    }else{
        var minuteout = (timeminute.toString());
    }
     
     //getDate
     var datadate = (date.getDate());
     var datamonth = (date.getMonth()+1);
     var datayear = (date.getFullYear());
     var dateout = (datadate.toString());
     if(datamonth == 1 || datamonth == 2 || datamonth == 3 || datamonth == 4 || datamonth == 5 || datamonth == 6 || datamonth == 7 || datamonth == 8 || datamonth == 9 ){
       var monthout = ("0"+datamonth.toString());
     }else{
         var monthout = (datamonth.toString());
     }
    var yearout = (datayear.toString());
    var datenow = (datadate.toString()+datamonth.toString()+datayear.toString());
     
     io.emit('test5',{
         valor: +dato5
        });

  
  
        if (timeminute == 0 && timesecond == 0) {
      
      var MongoClientrain = require('mongodb').MongoClient;
      var urlrain= "mongodb://localhost:27017/watherdata";
      MongoClientrain.connect(urlrain, function(err, db) {
          if (err) throw err;
          var myobj = { day: dateout, 
            month: monthout,
            year: yearout, 
            hour: hourout,  
            minute: minuteout, 
            rainvalue: +dato5 };
       db.collection("raindata").insertOne(myobj, function(err, res) {
       if (err) throw err;
       console.log("rain inserted");
       db.close();
    });
   });
     
}
    
});  

myPort6.on('data', function (dato6) {
    
     console.log("          Dustvalue :" +dato6);
     var dust = {Dust: +dato6};
     //return data;
     

     var date = new Date();      
     var timehour = (date.getHours());
     var timeminute = (date.getMinutes());
     var timesecond = (date.getSeconds());
     if(timehour == 1 || timehour == 2 || timehour == 3 || timehour == 4 || timehour== 5 || timehour == 6 || timehour == 7 || timehour == 8 || timehour == 9 || timehour == 0){
      var hourout = ("0"+timehour.toString());
    }else{
        var hourout = (timehour.toString());
    }
     var timenow = (timehour.toString()+timeminute.toString()); 
     
     //getDate
     var datadate = (date.getDate());
     var datamonth = (date.getMonth()+1);
     var datayear = (date.getFullYear());
     var dateout = (datadate.toString());
     if(datamonth == 1 || datamonth == 2 || datamonth == 3 || datamonth == 4 || datamonth == 5 || datamonth == 6 || datamonth == 7 || datamonth == 8 || datamonth == 9 ){
       var monthout = ("0"+datamonth.toString());
     }else{
         var monthout = (datamonth.toString());
     }
    var yearout = (datayear.toString());
    var datenow = (datadate.toString()+datamonth.toString()+datayear.toString());
    
    
     io.emit('test6',{
          valor: +dato6/100
        });


    if (timeminute == 0 && timesecond == 0) {
    var MongoClientdust = require('mongodb').MongoClient;
    var urldust = "mongodb://localhost:27017/watherdata";
    MongoClientdust.connect(urldust, function(err, db) {
        if (err) throw err;
        var myobj = { day: dateout, 
          month: monthout,
          year: yearout, 
          hour: hourout,  
          minute: "00", 
          dustvalue: +dato6 };
     db.collection("dustdata").insertOne(myobj, function(err, res) {
     if (err) throw err;
     console.log("dust inserted");
     db.close();
     //console.log("Date "+datadate+"Month "+datamonth+"Year"+datayear);
  });
 });
} 

});  






function sendlight(){
    var MongoClient1 = require('mongodb').MongoClient;
    var url1 = "mongodb://localhost:27017/watherdata";
    MongoClient1.connect(url1, function(err, db) {
      if (err) throw err;
      var date = new Date();  
      var datadate = (date.getDate());
      var datamonth = (date.getMonth()+1);
      var datayear = (date.getFullYear());
      var datenow = (datadate.toString()+datamonth.toString()+datayear.toString());
      var col =  db.collection("lightdata");  
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
    
    
    
       
        var findlight = {day: dateout, month: monthout, year: yearout, hour: '00',  minute: '00'};
        var findlight1 = {day: dateout, month: monthout, year: yearout, hour: '01',  minute: '00'};
        var findlight2 = {day: dateout, month: monthout, year: yearout, hour: '02',  minute: '00'};
        var findlight3 = {day: dateout, month: monthout, year: yearout, hour: '03',  minute: '00'};
        var findlight4 = {day: dateout, month: monthout, year: yearout, hour: '04',  minute: '00'};
        var findlight5 = {day: dateout, month: monthout, year: yearout, hour: '05',  minute: '00'};
        var findlight6 = {day: dateout, month: monthout, year: yearout, hour: '06',  minute: '00'};
        var findlight7 = {day: dateout, month: monthout, year: yearout, hour: '07',  minute: '00'};
        var findlight8 = {day: dateout, month: monthout, year: yearout, hour: '08',  minute: '00'};
        var findlight9 = {day: dateout, month: monthout, year: yearout, hour: '09',  minute: '00'};
        var findlight10 = {day: dateout, month: monthout, year: yearout, hour: '10',  minute: '00'};
        var findlight11 = {day: dateout, month: monthout, year: yearout, hour: '11',  minute: '00'};
        var findlight12 = {day: dateout, month: monthout, year: yearout, hour: '12',  minute: '00'};
        var findlight13 = {day: dateout, month: monthout, year: yearout, hour: '13',  minute: '00'};
        var findlight14 = {day: dateout, month: monthout, year: yearout, hour: '14',  minute: '00'};
        var findlight15 = {day: dateout, month: monthout, year: yearout, hour: '15',  minute: '00'};
        var findlight16 = {day: dateout, month: monthout, year: yearout, hour: '16',  minute: '00'};
        var findlight17 = {day: dateout, month: monthout, year: yearout, hour: '17',  minute: '00'};
        var findlight18 = {day: dateout, month: monthout, year: yearout, hour: '18',  minute: '00'};
        var findlight19 = {day: dateout, month: monthout, year: yearout, hour: '19',  minute: '00'};
        var findlight20 = {day: dateout, month: monthout, year: yearout, hour: '20',  minute: '00'};
        var findlight21 = {day: dateout, month: monthout, year: yearout, hour: '21',  minute: '00'};
        var findlight22 = {day: dateout, month: monthout, year: yearout, hour: '22',  minute: '00'};
        var findlight23 = {day: dateout, month: monthout, year: yearout, hour: '23',  minute: '00'};
    
  
    
    
        
        col.aggregate([ { $match : findlight  } ,
        {$group:{_id: null, max: { $push: "$lightvalue" } }}],	  
        function(err, results) {
        assert.equal(err, null);
        if(results == "" ){
          var intrevalight0n = 0;
          io.emit('light0n',{           
            valor: +intrevalight0n
           });
       }else{
        var intrevalight0 = results[0].max[0];
        io.emit('light0',{           
          valor: +intrevalight0
         });
             
    }
  }                       
)
col.aggregate([ { $match : findlight1  } ,
  {$group:{_id: null, max: { $push: "$lightvalue" } }}],	  
  function(err, results) {
  assert.equal(err, null);
  if(results == "" ){
    var intrevalight1n = 0;
    io.emit('light1n',{           
      valor: +intrevalight1n
     });
 }else{
  var intrevalight1 = results[0].max[0];
  io.emit('light1',{           
    valor: +intrevalight1
   });
       
}
}                       
)
col.aggregate([ { $match : findlight2  } ,
  {$group:{_id: null, max: { $push: "$lightvalue" } }}],	  
  function(err, results) {
  assert.equal(err, null);
  if(results == "" ){
    var intrevalight2n = 0;
    io.emit('light2n',{           
      valor: +intrevalight2n
     });
 }else{
  var intrevalight2 = results[0].max[0];
  io.emit('light2',{           
    valor: +intrevalight2
   });
       
}
}                       
)
col.aggregate([ { $match : findlight3  } ,
  {$group:{_id: null, max: { $push: "$lightvalue" } }}],	  
  function(err, results) {
  assert.equal(err, null);
  if(results == "" ){
    var intrevalight3n = 0;
    io.emit('light3n',{           
      valor: +intrevalight3n
     });
 }else{
  var intrevalight3 = results[0].max[0];
  io.emit('light3',{           
    valor: +intrevalight3
   });
       
}
}                       
)
col.aggregate([ { $match : findlight4  } ,
  {$group:{_id: null, max: { $push: "$lightvalue" } }}],	  
  function(err, results) {
  assert.equal(err, null);
  if(results == "" ){
    var intrevalight4n = 0;
    io.emit('light4n',{           
      valor: +intrevalight4n
     });
 }else{
  var intrevalight4 = results[0].max[0];
  io.emit('light4',{           
    valor: +intrevalight4
   });
       
}
}                       
)
col.aggregate([ { $match : findlight5  } ,
  {$group:{_id: null, max: { $push: "$lightvalue" } }}],	  
  function(err, results) {
  assert.equal(err, null);
  if(results == "" ){
    var intrevalight5n = 0;
    io.emit('light5n',{           
      valor: +intrevalight5n
     });
 }else{
  var intrevalight5 = results[0].max[0];
  io.emit('light5',{           
    valor: +intrevalight5
   });
       
}
}                       
)
col.aggregate([ { $match : findlight6  } ,
  {$group:{_id: null, max: { $push: "$lightvalue" } }}],	  
  function(err, results) {
  assert.equal(err, null);
  if(results == "" ){
    var intrevalight6n = 0;
    io.emit('light6n',{           
      valor: +intrevalight6n
     });
 }else{
  var intrevalight6 = results[0].max[0];
  io.emit('light6',{           
    valor: +intrevalight6
   });
       
}
}                       
)
col.aggregate([ { $match : findlight7  } ,
  {$group:{_id: null, max: { $push: "$lightvalue" } }}],	  
  function(err, results) {
  assert.equal(err, null);
  if(results == "" ){
    var intrevalight7n = 0;
    io.emit('light7n',{           
      valor: +intrevalight7n
     });
 }else{
  var intrevalight7 = results[0].max[0];
  io.emit('light7',{           
    valor: +intrevalight7
   });
       
}
}                       
)
col.aggregate([ { $match : findlight8  } ,
  {$group:{_id: null, max: { $push: "$lightvalue" } }}],	  
  function(err, results) {
  assert.equal(err, null);
  if(results == "" ){
    var intrevalight8n = 0;
    io.emit('light8n',{           
      valor: +intrevalight8n
     });
 }else{
  var intrevalight8 = results[0].max[0];
  io.emit('light8',{           
    valor: +intrevalight8
   });
       
}
}                       
)
col.aggregate([ { $match : findlight9  } ,
  {$group:{_id: null, max: { $push: "$lightvalue" } }}],	  
  function(err, results) {
  assert.equal(err, null);
  if(results == "" ){
    var intrevalight9n = 0;
    io.emit('light9n',{           
      valor: +intrevalight9n
     });
 }else{
  var intrevalight9 = results[0].max[0];
  io.emit('light9',{           
    valor: +intrevalight9
   });
       
}
}                       
)
col.aggregate([ { $match : findlight10  } ,
  {$group:{_id: null, max: { $push: "$lightvalue" } }}],	  
  function(err, results) {
  assert.equal(err, null);
  if(results == "" ){
    var intrevalight10n = 0;
    io.emit('light10n',{           
      valor: +intrevalight10n
     });
 }else{
  var intrevalight10 = results[0].max[0];
  io.emit('light10',{           
    valor: +intrevalight10
   });
       
}
}                       
)
col.aggregate([ { $match : findlight11  } ,
  {$group:{_id: null, max: { $push: "$lightvalue" } }}],	  
  function(err, results) {
  assert.equal(err, null);
  if(results == "" ){
    var intrevalight11n = 0;
    io.emit('light11n',{           
      valor: +intrevalight11n
     });
 }else{
  var intrevalight11 = results[0].max[0];
  io.emit('light11',{           
    valor: +intrevalight11
   });
       
}
}                       
)
col.aggregate([ { $match : findlight12  } ,
  {$group:{_id: null, max: { $push: "$lightvalue" } }}],	  
  function(err, results) {
  assert.equal(err, null);
  if(results == "" ){
    var intrevalight12n = 0;
    io.emit('light12n',{           
      valor: +intrevalight12n
     });
 }else{
  var intrevalight12 = results[0].max[0];
  io.emit('light12',{           
    valor: +intrevalight12
   });
       
}
}                       
)
col.aggregate([ { $match : findlight13  } ,
  {$group:{_id: null, max: { $push: "$lightvalue" } }}],	  
  function(err, results) {
  assert.equal(err, null);
  if(results == "" ){
    var intrevalight13n = 0;
    io.emit('light13n',{           
      valor: +intrevalight13n
     });
 }else{
  var intrevalight13 = results[0].max[0];
  io.emit('light13',{           
    valor: +intrevalight13
   });
       
}
}                       
)
col.aggregate([ { $match : findlight14  } ,
  {$group:{_id: null, max: { $push: "$lightvalue" } }}],	  
  function(err, results) {
  assert.equal(err, null);
  if(results == "" ){
    var intrevalight14n = 0;
    io.emit('light14n',{           
      valor: +intrevalight14n
     });
 }else{
  var intrevalight14 = results[0].max[0];
  io.emit('light14',{           
    valor: +intrevalight14
   });
       
}
}                       
)
col.aggregate([ { $match : findlight15  } ,
  {$group:{_id: null, max: { $push: "$lightvalue" } }}],	  
  function(err, results) {
  assert.equal(err, null);
  if(results == "" ){
    var intrevalight15n = 0;
    io.emit('light15n',{           
      valor: +intrevalight15n
     });
 }else{
  var intrevalight15 = results[0].max[0];
  io.emit('light15',{           
    valor: +intrevalight15
   });
       
}
}                       
)
col.aggregate([ { $match : findlight16  } ,
  {$group:{_id: null, max: { $push: "$lightvalue" } }}],	  
  function(err, results) {
  assert.equal(err, null);
  if(results == "" ){
    var intrevalight16n = 0;
    io.emit('light16n',{           
      valor: +intrevalight16n
     });
 }else{
  var intrevalight16 = results[0].max[0];
  io.emit('light16',{           
    valor: +intrevalight16
   });
       
}
}                       
)
col.aggregate([ { $match : findlight17  } ,
  {$group:{_id: null, max: { $push: "$lightvalue" } }}],	  
  function(err, results) {
  assert.equal(err, null);
  if(results == "" ){
    var intrevalight17n = 0;
    io.emit('light17n',{           
      valor: +intrevalight17n
     });
 }else{
  var intrevalight17 = results[0].max[0];
  io.emit('light17',{           
    valor: +intrevalight17
   });
       
}
}                       
)
col.aggregate([ { $match : findlight18  } ,
  {$group:{_id: null, max: { $push: "$lightvalue" } }}],	  
  function(err, results) {
  assert.equal(err, null);
  if(results == "" ){
    var intrevalight18n = 0;
    io.emit('light18n',{           
      valor: +intrevalight18n
     });
 }else{
  var intrevalight18 = results[0].max[0];
  io.emit('light18',{           
    valor: +intrevalight18
   });
       
}
}                       
)
col.aggregate([ { $match : findlight19  } ,
  {$group:{_id: null, max: { $push: "$lightvalue" } }}],	  
  function(err, results) {
  assert.equal(err, null);
  if(results == "" ){
    var intrevalight19n = 0;
    io.emit('light19n',{           
      valor: +intrevalight19n
     });
 }else{
  var intrevalight19 = results[0].max[0];
  io.emit('light19',{           
    valor: +intrevalight19
   });
       
}
}                       
)
col.aggregate([ { $match : findlight20  } ,
  {$group:{_id: null, max: { $push: "$lightvalue" } }}],	  
  function(err, results) {
  assert.equal(err, null);
  if(results == "" ){
    var intrevalight20n = 0;
    io.emit('light20n',{           
      valor: +intrevalight20n
     });
 }else{
  var intrevalight20 = results[0].max[0];
  io.emit('light20',{           
    valor: +intrevalight20
   });
       
}
}                       
)
col.aggregate([ { $match : findlight21  } ,
  {$group:{_id: null, max: { $push: "$lightvalue" } }}],	  
  function(err, results) {
  assert.equal(err, null);
  if(results == "" ){
    var intrevalight21n = 0;
    io.emit('light21n',{           
      valor: +intrevalight21n
     });
 }else{
  var intrevalight21 = results[0].max[0];
  io.emit('light21',{           
    valor: +intrevalight21
   });
       
}
}                       
)
col.aggregate([ { $match : findlight22  } ,
  {$group:{_id: null, max: { $push: "$lightvalue" } }}],	  
  function(err, results) {
  assert.equal(err, null);
  if(results == "" ){
    var intrevalight22n = 0;
    io.emit('light22n',{           
      valor: +intrevalight22n
     });
 }else{
  var intrevalight22 = results[0].max[0];
  io.emit('light22',{           
    valor: +intrevalight22
   });
       
}
}                       
)
col.aggregate([ { $match : findlight23  } ,
  {$group:{_id: null, max: { $push: "$lightvalue" } }}],	  
  function(err, results) {
  assert.equal(err, null);
  if(results == "" ){
    var intrevalight23n = 0;
    io.emit('light23n',{           
      valor: +intrevalight23n
     });
 }else{
  var intrevalight23 = results[0].max[0];
  io.emit('light23',{           
    valor: +intrevalight23
   });
       
}
}                       
) 
      db.close();
     });  
    }



    function sendtemp() {
        
        var MongoClient2 = require('mongodb').MongoClient;
        var url2 = "mongodb://localhost:27017/watherdata";
        MongoClient2.connect(url2, function(err, db) {
          if (err) throw err;
          var date = new Date();  
          var datadate = (date.getDate());
          var datamonth = (date.getMonth()+1);
          var datayear = (date.getFullYear());
          var datenow = (datadate.toString()+datamonth.toString()+datayear.toString());
          var col =  db.collection("tempdata");  
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
        
        
               var findtemp = {day: dateout, month: monthout, year: yearout, hour: '00',  minute: '00'};
               var findtemp1 = {day: dateout, month: monthout, year: yearout, hour: '01',  minute: '00'};
               var findtemp2 = {day: dateout, month: monthout, year: yearout, hour: '02',  minute: '00'};
               var findtemp3 = {day: dateout, month: monthout, year: yearout, hour: '03',  minute: '00'};
               var findtemp4 = {day: dateout, month: monthout, year: yearout, hour: '04',  minute: '00'};
               var findtemp5 = {day: dateout, month: monthout, year: yearout, hour: '05',  minute: '00'};
               var findtemp6 = {day: dateout, month: monthout, year: yearout, hour: '06',  minute: '00'};
               var findtemp7 = {day: dateout, month: monthout, year: yearout, hour: '07',  minute: '00'};
               var findtemp8 = {day: dateout, month: monthout, year: yearout, hour: '08',  minute: '00'};
               var findtemp9 = {day: dateout, month: monthout, year: yearout, hour: '09',  minute: '00'};
               var findtemp10 = {day: dateout, month: monthout, year: yearout, hour: '10',  minute: '00'};
               var findtemp11 = {day: dateout, month: monthout, year: yearout, hour: '11',  minute: '00'};
               var findtemp12 = {day: dateout, month: monthout, year: yearout, hour: '12',  minute: '00'};
               var findtemp13 = {day: dateout, month: monthout, year: yearout, hour: '13',  minute: '00'};
               var findtemp14 = {day: dateout, month: monthout, year: yearout, hour: '14',  minute: '00'};
               var findtemp15 = {day: dateout, month: monthout, year: yearout, hour: '15',  minute: '00'};
               var findtemp16 = {day: dateout, month: monthout, year: yearout, hour: '16',  minute: '00'};
               var findtemp17 = {day: dateout, month: monthout, year: yearout, hour: '17',  minute: '00'};
               var findtemp18 = {day: dateout, month: monthout, year: yearout, hour: '18',  minute: '00'};
               var findtemp19 = {day: dateout, month: monthout, year: yearout, hour: '19',  minute: '00'};
               var findtemp20 = {day: dateout, month: monthout, year: yearout, hour: '20',  minute: '00'};
               var findtemp21 = {day: dateout, month: monthout, year: yearout, hour: '21',  minute: '00'};
               var findtemp22 = {day: dateout, month: monthout, year: yearout, hour: '22',  minute: '00'};
               var findtemp23 = {day: dateout, month: monthout, year: yearout, hour: '23',  minute: '00'};
        
               col.aggregate([ { $match : findtemp  } ,
                {$group:{_id: null, max: { $push: "$tempvalue" } }}],	  
                function(err, results) {
                assert.equal(err, null);
                if(results == "" ){
                  var intrevatemp0n = 0;
                  io.emit('temp0n',{           
                    valor: +intrevatemp0n
                   });
               }else{
                var intrevatemp0 = results[0].max[0];
                io.emit('temp0',{           
                  valor: +intrevatemp0
                 });
                     
              }
              }                       
              ) 
              col.aggregate([ { $match : findtemp1  } ,
                {$group:{_id: null, max: { $push: "$tempvalue" } }}],	  
                function(err, results) {
                assert.equal(err, null);
                if(results == "" ){
                  var intrevatemp1n = 0;
                  io.emit('temp1n',{           
                    valor: +intrevatemp1n
                   });
               }else{
                var intrevatemp1 = results[0].max[0];
                io.emit('temp1',{           
                  valor: +intrevatemp1
                 });
                     
              }
              }                       
              ) 
              col.aggregate([ { $match : findtemp2  } ,
                {$group:{_id: null, max: { $push: "$tempvalue" } }}],	  
                function(err, results) {
                assert.equal(err, null);
                if(results == "" ){
                  var intrevatemp2n = 0;
                  io.emit('temp2n',{           
                    valor: +intrevatemp2n
                   });
               }else{
                var intrevatemp2 = results[0].max[0];
                io.emit('temp2',{           
                  valor: +intrevatemp2
                 });
                     
              }
              }                       
              ) 
              col.aggregate([ { $match : findtemp3  } ,
                {$group:{_id: null, max: { $push: "$tempvalue" } }}],	  
                function(err, results) {
                assert.equal(err, null);
                if(results == "" ){
                  var intrevatemp3n = 0;
                  io.emit('temp3n',{           
                    valor: +intrevatemp3n
                   });
               }else{
                var intrevatemp3 = results[0].max[0];
                io.emit('temp3',{           
                  valor: +intrevatemp3
                 });
                     
              }
              }                       
              ) 
              col.aggregate([ { $match : findtemp4  } ,
                {$group:{_id: null, max: { $push: "$tempvalue" } }}],	  
                function(err, results) {
                assert.equal(err, null);
                if(results == "" ){
                  var intrevatemp4n = 0;
                  io.emit('temp4n',{           
                    valor: +intrevatemp4n
                   });
               }else{
                var intrevatemp4 = results[0].max[0];
                io.emit('temp4',{           
                  valor: +intrevatemp4
                 });
                     
              }
              }                       
              ) 
              col.aggregate([ { $match : findtemp5  } ,
                {$group:{_id: null, max: { $push: "$tempvalue" } }}],	  
                function(err, results) {
                assert.equal(err, null);
                if(results == "" ){
                  var intrevatemp5n = 0;
                  io.emit('temp5n',{           
                    valor: +intrevatemp5n
                   });
               }else{
                var intrevatemp5 = results[0].max[0];
                io.emit('temp5',{           
                  valor: +intrevatemp5
                 });
                     
              }
              }                       
              ) 
              col.aggregate([ { $match : findtemp6  } ,
                {$group:{_id: null, max: { $push: "$tempvalue" } }}],	  
                function(err, results) {
                assert.equal(err, null);
                if(results == "" ){
                  var intrevatemp6n = 0;
                  io.emit('temp6n',{           
                    valor: +intrevatemp6n
                   });
               }else{
                var intrevatemp6 = results[0].max[0];
                io.emit('temp6',{           
                  valor: +intrevatemp6
                 });
                     
              }
              }                       
              ) 
              col.aggregate([ { $match : findtemp7  } ,
                {$group:{_id: null, max: { $push: "$tempvalue" } }}],	  
                function(err, results) {
                assert.equal(err, null);
                if(results == "" ){
                  var intrevatemp7n = 0;
                  io.emit('temp7n',{           
                    valor: +intrevatemp7n
                   });
               }else{
                var intrevatemp7 = results[0].max[0];
                io.emit('temp7',{           
                  valor: +intrevatemp7
                 });
                     
              }
              }                       
              ) 
            
              col.aggregate([ { $match : findtemp8  } ,
                {$group:{_id: null, max: { $push: "$tempvalue" } }}],	  
                function(err, results) {
                assert.equal(err, null);
                if(results == "" ){
                  var intrevatemp8n = 0;
                  io.emit('temp8n',{           
                    valor: +intrevatemp8n
                   });
               }else{
                var intrevatemp8 = results[0].max[0];
                io.emit('temp8',{           
                  valor: +intrevatemp8
                 });
                     
              }
              }                       
              ) 
              col.aggregate([ { $match : findtemp9  } ,
                {$group:{_id: null, max: { $push: "$tempvalue" } }}],	  
                function(err, results) {
                assert.equal(err, null);
                if(results == "" ){
                  var intrevatemp9n = 0;
                  io.emit('temp9n',{           
                    valor: +intrevatemp9n
                   });
               }else{
                var intrevatemp9 = results[0].max[0];
                io.emit('temp9',{           
                  valor: +intrevatemp9
                 });
                     
              }
              }                       
              ) 
              col.aggregate([ { $match : findtemp10  } ,
                {$group:{_id: null, max: { $push: "$tempvalue" } }}],	  
                function(err, results) {
                assert.equal(err, null);
                if(results == "" ){
                  var intrevatemp10n = 0;
                  io.emit('temp10n',{           
                    valor: +intrevatemp10n
                   });
               }else{
                var intrevatemp10 = results[0].max[0];
                io.emit('temp10',{           
                  valor: +intrevatemp10
                 });
                     
              }
              }                       
              ) 
              col.aggregate([ { $match : findtemp11  } ,
                {$group:{_id: null, max: { $push: "$tempvalue" } }}],	  
                function(err, results) {
                assert.equal(err, null);
                if(results == "" ){
                  var intrevatemp11n = 0;
                  io.emit('temp11n',{           
                    valor: +intrevatemp11n
                   });
               }else{
                var intrevatemp11 = results[0].max[0];
                io.emit('temp11',{           
                  valor: +intrevatemp11
                 });
                     
              }
              }                       
              ) 
              col.aggregate([ { $match : findtemp12  } ,
                {$group:{_id: null, max: { $push: "$tempvalue" } }}],	  
                function(err, results) {
                assert.equal(err, null);
                if(results == "" ){
                  var intrevatemp12n = 0;
                  io.emit('temp12n',{           
                    valor: +intrevatemp12n
                   });
               }else{
                var intrevatemp12 = results[0].max[0];
                io.emit('temp12',{           
                  valor: +intrevatemp12
                 });
                     
              }
              }                       
              ) 
              col.aggregate([ { $match : findtemp13  } ,
                {$group:{_id: null, max: { $push: "$tempvalue" } }}],	  
                function(err, results) {
                assert.equal(err, null);
                if(results == "" ){
                  var intrevatemp13n = 0;
                  io.emit('temp13n',{           
                    valor: +intrevatemp13n
                   });
               }else{
                var intrevatemp13 = results[0].max[0];
                io.emit('temp13',{           
                  valor: +intrevatemp13
                 });
                     
              }
              }                       
              ) 
              col.aggregate([ { $match : findtemp14  } ,
                {$group:{_id: null, max: { $push: "$tempvalue" } }}],	  
                function(err, results) {
                assert.equal(err, null);
                if(results == "" ){
                  var intrevatemp14n = 0;
                  io.emit('temp14n',{           
                    valor: +intrevatemp14n
                   });
               }else{
                var intrevatemp14 = results[0].max[0];
                io.emit('temp14',{           
                  valor: +intrevatemp14
                 });
                     
              }
              }                       
              ) 
              col.aggregate([ { $match : findtemp15  } ,
                {$group:{_id: null, max: { $push: "$tempvalue" } }}],	  
                function(err, results) {
                assert.equal(err, null);
                if(results == "" ){
                  var intrevatemp15n = 0;
                  io.emit('temp15n',{           
                    valor: +intrevatemp15n
                   });
               }else{
                var intrevatemp15 = results[0].max[0];
                io.emit('temp15',{           
                  valor: +intrevatemp15
                 });
                     
              }
              }                       
              ) 
              col.aggregate([ { $match : findtemp16  } ,
                {$group:{_id: null, max: { $push: "$tempvalue" } }}],	  
                function(err, results) {
                assert.equal(err, null);
                if(results == "" ){
                  var intrevatemp16n = 0;
                  io.emit('temp16n',{           
                    valor: +intrevatemp16n
                   });
               }else{
                var intrevatemp16 = results[0].max[0];
                io.emit('temp16',{           
                  valor: +intrevatemp16
                 });
                     
              }
              }                       
              ) 
              col.aggregate([ { $match : findtemp17  } ,
                {$group:{_id: null, max: { $push: "$tempvalue" } }}],	  
                function(err, results) {
                assert.equal(err, null);
                if(results == "" ){
                  var intrevatemp17n = 0;
                  io.emit('temp17n',{           
                    valor: +intrevatemp17n
                   });
               }else{
                var intrevatemp17 = results[0].max[0];
                io.emit('temp17',{           
                  valor: +intrevatemp17
                 });
                     
              }
              }                       
              ) 
              col.aggregate([ { $match : findtemp18  } ,
                {$group:{_id: null, max: { $push: "$tempvalue" } }}],	  
                function(err, results) {
                assert.equal(err, null);
                if(results == "" ){
                  var intrevatemp18n = 0;
                  io.emit('temp18n',{           
                    valor: +intrevatemp18n
                   });
               }else{
                var intrevatemp18 = results[0].max[0];
                io.emit('temp18',{           
                  valor: +intrevatemp18
                 });
                     
              }
              }                       
              ) 
              col.aggregate([ { $match : findtemp19  } ,
                {$group:{_id: null, max: { $push: "$tempvalue" } }}],	  
                function(err, results) {
                assert.equal(err, null);
                if(results == "" ){
                  var intrevatemp19n = 0;
                  io.emit('temp19n',{           
                    valor: +intrevatemp19n
                   });
               }else{
                var intrevatemp19 = results[0].max[0];
                io.emit('temp19',{           
                  valor: +intrevatemp19
                 });
                     
              }
              }                       
              ) 
              col.aggregate([ { $match : findtemp20  } ,
                {$group:{_id: null, max: { $push: "$tempvalue" } }}],	  
                function(err, results) {
                assert.equal(err, null);
                if(results == "" ){
                  var intrevatemp20n = 0;
                  io.emit('temp20n',{           
                    valor: +intrevatemp20n
                   });
               }else{
                var intrevatemp20 = results[0].max[0];
                io.emit('temp20',{           
                  valor: +intrevatemp20
                 });
                     
              }
              }                       
              ) 
              col.aggregate([ { $match : findtemp21  } ,
                {$group:{_id: null, max: { $push: "$tempvalue" } }}],	  
                function(err, results) {
                assert.equal(err, null);
                if(results == "" ){
                  var intrevatemp21n = 0;
                  io.emit('temp21n',{           
                    valor: +intrevatemp21n
                   });
               }else{
                var intrevatemp21 = results[0].max[0];
                io.emit('temp21',{           
                  valor: +intrevatemp21
                 });
                     
              }
              }                       
              ) 
              col.aggregate([ { $match : findtemp22  } ,
                {$group:{_id: null, max: { $push: "$tempvalue" } }}],	  
                function(err, results) {
                assert.equal(err, null);
                if(results == "" ){
                  var intrevatemp22n = 0;
                  io.emit('temp22n',{           
                    valor: +intrevatemp22n
                   });
               }else{
                var intrevatemp22 = results[0].max[0];
                io.emit('temp22',{           
                  valor: +intrevatemp22
                 });
                     
              }
              }                       
              ) 
              col.aggregate([ { $match : findtemp23  } ,
                {$group:{_id: null, max: { $push: "$tempvalue" } }}],	  
                function(err, results) {
                assert.equal(err, null);
                if(results == "" ){
                  var intrevatemp23n = 0;
                  io.emit('temp23n',{           
                    valor: +intrevatemp23n
                   });
               }else{
                var intrevatemp23 = results[0].max[0];
                io.emit('temp23',{           
                  valor: +intrevatemp23
                 });
                     
              }
              }                       
              )  
          db.close();        
         }); 
        }



        function sendhumid(){
            
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
                      var intrevahumid0n = 0;
                      io.emit('humid0n',{           
                        valor: +intrevahumid0n
                       });
                   }else{
                    var intrevahumid0 = results[0].max[0];
                    io.emit('humid0',{           
                      valor: +intrevahumid0
                     });
                         
                  }
                  }                       
                  )  
                  col.aggregate([ { $match : findhumid1  } ,
                    {$group:{_id: null, max: { $push: "$humidvalue" } }}],	  
                    function(err, results) {
                    assert.equal(err, null);
                    if(results == "" ){
                      var intrevahumid1n = 0;
                      io.emit('humid1n',{           
                        valor: +intrevahumid1n
                       });
                   }else{
                    var intrevahumid1 = results[0].max[0];
                    io.emit('humid1',{           
                      valor: +intrevahumid1
                     });
                         
                  }
                  }                       
                  )  
                  col.aggregate([ { $match : findhumid2  } ,
                    {$group:{_id: null, max: { $push: "$humidvalue" } }}],	  
                    function(err, results) {
                    assert.equal(err, null);
                    if(results == "" ){
                      var intrevahumid2n = 0;
                      io.emit('humid2n',{           
                        valor: +intrevahumid2n
                       });
                   }else{
                    var intrevahumid2 = results[0].max[0];
                    io.emit('humid2',{           
                      valor: +intrevahumid2
                     });
                         
                  }
                  }                       
                  )  
                  col.aggregate([ { $match : findhumid3  } ,
                    {$group:{_id: null, max: { $push: "$humidvalue" } }}],	  
                    function(err, results) {
                    assert.equal(err, null);
                    if(results == "" ){
                      var intrevahumid3n = 0;
                      io.emit('humid3n',{           
                        valor: +intrevahumid3n
                       });
                   }else{
                    var intrevahumid3 = results[0].max[0];
                    io.emit('humid3',{           
                      valor: +intrevahumid3
                     });
                         
                  }
                  }                       
                  )  
                  col.aggregate([ { $match : findhumid4  } ,
                    {$group:{_id: null, max: { $push: "$humidvalue" } }}],	  
                    function(err, results) {
                    assert.equal(err, null);
                    if(results == "" ){
                      var intrevahumid4n = 0;
                      io.emit('humid4n',{           
                        valor: +intrevahumid4n
                       });
                   }else{
                    var intrevahumid4 = results[0].max[0];
                    io.emit('humid4',{           
                      valor: +intrevahumid4
                     });
                         
                  }
                  }                       
                  )  
                  col.aggregate([ { $match : findhumid5  } ,
                    {$group:{_id: null, max: { $push: "$humidvalue" } }}],	  
                    function(err, results) {
                    assert.equal(err, null);
                    if(results == "" ){
                      var intrevahumid5n = 0;
                      io.emit('humid5n',{           
                        valor: +intrevahumid5n
                       });
                   }else{
                    var intrevahumid5 = results[0].max[0];
                    io.emit('humid5',{           
                      valor: +intrevahumid5
                     });
                         
                  }
                  }                       
                  )  
                  col.aggregate([ { $match : findhumid6  } ,
                    {$group:{_id: null, max: { $push: "$humidvalue" } }}],	  
                    function(err, results) {
                    assert.equal(err, null);
                    if(results == "" ){
                      var intrevahumid6n = 0;
                      io.emit('humid6n',{           
                        valor: +intrevahumid6n
                       });
                   }else{
                    var intrevahumid6 = results[0].max[0];
                    io.emit('humid6',{           
                      valor: +intrevahumid6
                     });
                         
                  }
                  }                       
                  )  
                  col.aggregate([ { $match : findhumid7  } ,
                    {$group:{_id: null, max: { $push: "$humidvalue" } }}],	  
                    function(err, results) {
                    assert.equal(err, null);
                    if(results == "" ){
                      var intrevahumid7n = 0;
                      io.emit('humid7n',{           
                        valor: +intrevahumid7n
                       });
                   }else{
                    var intrevahumid7 = results[0].max[0];
                    io.emit('humid7',{           
                      valor: +intrevahumid7
                     });
                         
                  }
                  }                       
                  )  
                  col.aggregate([ { $match : findhumid8  } ,
                    {$group:{_id: null, max: { $push: "$humidvalue" } }}],	  
                    function(err, results) {
                    assert.equal(err, null);
                    if(results == "" ){
                      var intrevahumid8n = 0;
                      io.emit('humid8n',{           
                        valor: +intrevahumid8n
                       });
                   }else{
                    var intrevahumid8 = results[0].max[0];
                    io.emit('humid8',{           
                      valor: +intrevahumid8
                     });
                         
                  }
                  }                       
                  )  
                  col.aggregate([ { $match : findhumid9  } ,
                    {$group:{_id: null, max: { $push: "$humidvalue" } }}],	  
                    function(err, results) {
                    assert.equal(err, null);
                    if(results == "" ){
                      var intrevahumid9n = 0;
                      io.emit('humid9n',{           
                        valor: +intrevahumid9n
                       });
                   }else{
                    var intrevahumid9 = results[0].max[0];
                    io.emit('humid9',{           
                      valor: +intrevahumid9
                     });
                         
                  }
                  }                       
                  )  
                  col.aggregate([ { $match : findhumid10  } ,
                    {$group:{_id: null, max: { $push: "$humidvalue" } }}],	  
                    function(err, results) {
                    assert.equal(err, null);
                    if(results == "" ){
                      var intrevahumid10n = 0;
                      io.emit('humid10n',{           
                        valor: +intrevahumid10n
                       });
                   }else{
                    var intrevahumid10 = results[0].max[0];
                    io.emit('humid10',{           
                      valor: +intrevahumid10
                     });
                         
                  }
                  }                       
                  )  
                  col.aggregate([ { $match : findhumid11  } ,
                    {$group:{_id: null, max: { $push: "$humidvalue" } }}],	  
                    function(err, results) {
                    assert.equal(err, null);
                    if(results == "" ){
                      var intrevahumid11n = 0;
                      io.emit('humid11n',{           
                        valor: +intrevahumid11n
                       });
                   }else{
                    var intrevahumid11 = results[0].max[0];
                    io.emit('humid11',{           
                      valor: +intrevahumid11
                     });
                         
                  }
                  }                       
                  )  
                  col.aggregate([ { $match : findhumid12  } ,
                    {$group:{_id: null, max: { $push: "$humidvalue" } }}],	  
                    function(err, results) {
                    assert.equal(err, null);
                    if(results == "" ){
                      var intrevahumid12n = 0;
                      io.emit('humid12n',{           
                        valor: +intrevahumid12n
                       });
                   }else{
                    var intrevahumid12 = results[0].max[0];
                    io.emit('humid12',{           
                      valor: +intrevahumid12
                     });
                         
                  }
                  }                       
                  )  
                  col.aggregate([ { $match : findhumid13  } ,
                    {$group:{_id: null, max: { $push: "$humidvalue" } }}],	  
                    function(err, results) {
                    assert.equal(err, null);
                    if(results == "" ){
                      var intrevahumid13n = 0;
                      io.emit('humid13n',{           
                        valor: +intrevahumid13n
                       });
                   }else{
                    var intrevahumid13 = results[0].max[0];
                    io.emit('humid13',{           
                      valor: +intrevahumid13
                     });
                         
                  }
                  }                       
                  )  
                  col.aggregate([ { $match : findhumid14  } ,
                    {$group:{_id: null, max: { $push: "$humidvalue" } }}],	  
                    function(err, results) {
                    assert.equal(err, null);
                    if(results == "" ){
                      var intrevahumid14n = 0;
                      io.emit('humid14n',{           
                        valor: +intrevahumid14n
                       });
                   }else{
                    var intrevahumid14 = results[0].max[0];
                    io.emit('humid14',{           
                      valor: +intrevahumid14
                     });
                         
                  }
                  }                       
                  )  
                  col.aggregate([ { $match : findhumid15  } ,
                    {$group:{_id: null, max: { $push: "$humidvalue" } }}],	  
                    function(err, results) {
                    assert.equal(err, null);
                    if(results == "" ){
                      var intrevahumid15n = 0;
                      io.emit('humid15n',{           
                        valor: +intrevahumid15n
                       });
                   }else{
                    var intrevahumid15 = results[0].max[0];
                    io.emit('humid15',{           
                      valor: +intrevahumid15
                     });
                         
                  }
                  }                       
                  )  
                  col.aggregate([ { $match : findhumid16  } ,
                    {$group:{_id: null, max: { $push: "$humidvalue" } }}],	  
                    function(err, results) {
                    assert.equal(err, null);
                    if(results == "" ){
                      var intrevahumid16n = 0;
                      io.emit('humid16n',{           
                        valor: +intrevahumid16n
                       });
                   }else{
                    var intrevahumid16 = results[0].max[0];
                    io.emit('humid16',{           
                      valor: +intrevahumid16
                     });
                         
                  }
                  }                       
                  )  
                  col.aggregate([ { $match : findhumid17  } ,
                    {$group:{_id: null, max: { $push: "$humidvalue" } }}],	  
                    function(err, results) {
                    assert.equal(err, null);
                    if(results == "" ){
                      var intrevahumid17n = 0;
                      io.emit('humid17n',{           
                        valor: +intrevahumid17n
                       });
                   }else{
                    var intrevahumid17 = results[0].max[0];
                    io.emit('humid17',{           
                      valor: +intrevahumid17
                     });
                         
                  }
                  }                       
                  )  
                  col.aggregate([ { $match : findhumid18  } ,
                    {$group:{_id: null, max: { $push: "$humidvalue" } }}],	  
                    function(err, results) {
                    assert.equal(err, null);
                    if(results == "" ){
                      var intrevahumid18n = 0;
                      io.emit('humid18n',{           
                        valor: +intrevahumid18n
                       });
                   }else{
                    var intrevahumid18 = results[0].max[0];
                    io.emit('humid18',{           
                      valor: +intrevahumid18
                     });
                         
                  }
                  }                       
                  )  
                  col.aggregate([ { $match : findhumid19  } ,
                    {$group:{_id: null, max: { $push: "$humidvalue" } }}],	  
                    function(err, results) {
                    assert.equal(err, null);
                    if(results == "" ){
                      var intrevahumid19n = 0;
                      io.emit('humid19n',{           
                        valor: +intrevahumid19n
                       });
                   }else{
                    var intrevahumid19 = results[0].max[0];
                    io.emit('humid19',{           
                      valor: +intrevahumid19
                     });
                         
                  }
                  }                       
                  )  
                  col.aggregate([ { $match : findhumid20  } ,
                    {$group:{_id: null, max: { $push: "$humidvalue" } }}],	  
                    function(err, results) {
                    assert.equal(err, null);
                    if(results == "" ){
                      var intrevahumid20n = 0;
                      io.emit('humid20n',{           
                        valor: +intrevahumid20n
                       });
                   }else{
                    var intrevahumid20 = results[0].max[0];
                    io.emit('humid20',{           
                      valor: +intrevahumid20
                     });
                         
                  }
                  }                       
                  )  
                  col.aggregate([ { $match : findhumid21  } ,
                    {$group:{_id: null, max: { $push: "$humidvalue" } }}],	  
                    function(err, results) {
                    assert.equal(err, null);
                    if(results == "" ){
                      var intrevahumid21n = 0;
                      io.emit('humid21n',{           
                        valor: +intrevahumid21n
                       });
                   }else{
                    var intrevahumid21 = results[0].max[0];
                    io.emit('humid21',{           
                      valor: +intrevahumid21
                     });
                         
                  }
                  }                       
                  )  
                  col.aggregate([ { $match : findhumid22  } ,
                    {$group:{_id: null, max: { $push: "$humidvalue" } }}],	  
                    function(err, results) {
                    assert.equal(err, null);
                    if(results == "" ){
                      var intrevahumid22n = 0;
                      io.emit('humid22n',{           
                        valor: +intrevahumid22n
                       });
                   }else{
                    var intrevahumid22 = results[0].max[0];
                    io.emit('humid22',{           
                      valor: +intrevahumid22
                     });
                         
                  }
                  }                       
                  )  
                  col.aggregate([ { $match : findhumid23  } ,
                    {$group:{_id: null, max: { $push: "$humidvalue" } }}],	  
                    function(err, results) {
                    assert.equal(err, null);
                    if(results == "" ){
                      var intrevahumid23n = 0;
                      io.emit('humid23n',{           
                      valor: +intrevahumid23n
                       });
                   }else{
                    var intrevahumid23 = results[0].max[0];
                    io.emit('humid23',{           
                      valor: +intrevahumid23
                     });
                         
                  }
                  }                       
                  )  
            db.close();
            }); 
            }


            function sendsoil(){
                
                  var MongoClient4 = require('mongodb').MongoClient;
                  var url4 = "mongodb://localhost:27017/watherdata";
                  MongoClient4.connect(url4, function(err, db) {
                  if (err) throw err;
                  var date = new Date();  
                  var datadate = (date.getDate());
                  var datamonth = (date.getMonth()+1);
                  var datayear = (date.getFullYear());
                  var datenow = (datadate.toString()+datamonth.toString()+datayear.toString());
                  var col =  db.collection("soildata");  
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
                
                
                   
                    var findsoil = {day: dateout, month: monthout, year: yearout, hour: '00',  minute: '00'};
                    var findsoil1 = {day: dateout, month: monthout, year: yearout, hour: '01',  minute: '00'};
                    var findsoil2 = {day: dateout, month: monthout, year: yearout, hour: '02',  minute: '00'};
                    var findsoil3 = {day: dateout, month: monthout, year: yearout, hour: '03',  minute: '00'};
                    var findsoil4 = {day: dateout, month: monthout, year: yearout, hour: '04',  minute: '00'};
                    var findsoil5 = {day: dateout, month: monthout, year: yearout, hour: '05',  minute: '00'};
                    var findsoil6 = {day: dateout, month: monthout, year: yearout, hour: '06',  minute: '00'};
                    var findsoil7 = {day: dateout, month: monthout, year: yearout, hour: '07',  minute: '00'};
                    var findsoil8 = {day: dateout, month: monthout, year: yearout, hour: '08',  minute: '00'};
                    var findsoil9 = {day: dateout, month: monthout, year: yearout, hour: '09',  minute: '00'};
                    var findsoil10 = {day: dateout, month: monthout, year: yearout, hour: '10',  minute: '00'};
                    var findsoil11 = {day: dateout, month: monthout, year: yearout, hour: '11',  minute: '00'};
                    var findsoil12 = {day: dateout, month: monthout, year: yearout, hour: '12',  minute: '00'};
                    var findsoil13 = {day: dateout, month: monthout, year: yearout, hour: '13',  minute: '00'};
                    var findsoil14 = {day: dateout, month: monthout, year: yearout, hour: '14',  minute: '00'};
                    var findsoil15 = {day: dateout, month: monthout, year: yearout, hour: '15',  minute: '00'};
                    var findsoil16 = {day: dateout, month: monthout, year: yearout, hour: '16',  minute: '00'};
                    var findsoil17 = {day: dateout, month: monthout, year: yearout, hour: '17',  minute: '00'};
                    var findsoil18 = {day: dateout, month: monthout, year: yearout, hour: '18',  minute: '00'};
                    var findsoil19 = {day: dateout, month: monthout, year: yearout, hour: '19',  minute: '00'};
                    var findsoil20 = {day: dateout, month: monthout, year: yearout, hour: '20',  minute: '00'};
                    var findsoil21 = {day: dateout, month: monthout, year: yearout, hour: '21',  minute: '00'};
                    var findsoil22 = {day: dateout, month: monthout, year: yearout, hour: '22',  minute: '00'};
                    var findsoil23 = {day: dateout, month: monthout, year: yearout, hour: '23',  minute: '00'};
                
                
                
                
                    col.aggregate([ { $match : findsoil  } ,
                      {$group:{_id: null, max: { $push: "$soilvalue" } }}],	  
                      function(err, results) {
                      assert.equal(err, null);
                      if(results == "" ){
                        var intrevasoil0n = 0;
                        io.emit('soil0n',{           
                        valor: +intrevasoil0n
                         });
                     }else{
                      var intrevasoil0 = results[0].max[0];
                      io.emit('soil0',{           
                        valor: +intrevasoil0
                       });
                           
                    }
                    }                       
                    )  
                    col.aggregate([ { $match : findsoil1  } ,
                      {$group:{_id: null, max: { $push: "$soilvalue" } }}],	  
                      function(err, results) {
                      assert.equal(err, null);
                      if(results == "" ){
                        var intrevasoil1n = 0;
                        io.emit('soil1n',{           
                        valor: +intrevasoil1n
                         });
                     }else{
                      var intrevasoil1 = results[0].max[0];
                      io.emit('soil1',{           
                        valor: +intrevasoil1
                       });
                           
                    }
                    }                       
                    )  
                    col.aggregate([ { $match : findsoil2  } ,
                      {$group:{_id: null, max: { $push: "$soilvalue" } }}],	  
                      function(err, results) {
                      assert.equal(err, null);
                      if(results == "" ){
                        var intrevasoil2n = 0;
                        io.emit('soil2n',{           
                        valor: +intrevasoil2n
                         });
                     }else{
                      var intrevasoil2 = results[0].max[0];
                      io.emit('soil2',{           
                        valor: +intrevasoil2
                       });
                           
                    }
                    }                       
                    )  
                    col.aggregate([ { $match : findsoil3  } ,
                      {$group:{_id: null, max: { $push: "$soilvalue" } }}],	  
                      function(err, results) {
                      assert.equal(err, null);
                      if(results == "" ){
                        var intrevasoil3n = 0;
                        io.emit('soil3n',{           
                        valor: +intrevasoil3n
                         });
                     }else{
                      var intrevasoil3 = results[0].max[0];
                      io.emit('soil3',{           
                        valor: +intrevasoil3
                       });
                           
                    }
                    }                       
                    )  
                    col.aggregate([ { $match : findsoil4  } ,
                      {$group:{_id: null, max: { $push: "$soilvalue" } }}],	  
                      function(err, results) {
                      assert.equal(err, null);
                      if(results == "" ){
                        var intrevasoil4n = 0;
                        io.emit('soil4n',{           
                        valor: +intrevasoil4n
                         });
                     }else{
                      var intrevasoil4 = results[0].max[0];
                      io.emit('soil4',{           
                        valor: +intrevasoil4
                       });
                           
                    }
                    }                       
                    )  
                    col.aggregate([ { $match : findsoil5  } ,
                      {$group:{_id: null, max: { $push: "$soilvalue" } }}],	  
                      function(err, results) {
                      assert.equal(err, null);
                      if(results == "" ){
                        var intrevasoil5n = 0;
                        io.emit('soil5n',{           
                        valor: +intrevasoil5n
                         });
                     }else{
                      var intrevasoil5 = results[0].max[0];
                      io.emit('soil5',{           
                        valor: +intrevasoil5
                       });
                           
                    }
                    }                       
                    )  
                    col.aggregate([ { $match : findsoil6  } ,
                      {$group:{_id: null, max: { $push: "$soilvalue" } }}],	  
                      function(err, results) {
                      assert.equal(err, null);
                      if(results == "" ){
                        var intrevasoil6n = 0;
                        io.emit('soil6n',{           
                        valor: +intrevasoil6n
                         });
                     }else{
                      var intrevasoil6 = results[0].max[0];
                      io.emit('soil6',{           
                        valor: +intrevasoil6
                       });
                           
                    }
                    }                       
                    )  
                    col.aggregate([ { $match : findsoil7  } ,
                      {$group:{_id: null, max: { $push: "$soilvalue" } }}],	  
                      function(err, results) {
                      assert.equal(err, null);
                      if(results == "" ){
                        var intrevasoil7n = 0;
                        io.emit('soil7n',{           
                        valor: +intrevasoil7n
                         });
                     }else{
                      var intrevasoil7 = results[0].max[0];
                      io.emit('soil7',{           
                        valor: +intrevasoil7
                       });
                           
                    }
                    }                       
                    )  
                    col.aggregate([ { $match : findsoil8  } ,
                      {$group:{_id: null, max: { $push: "$soilvalue" } }}],	  
                      function(err, results) {
                      assert.equal(err, null);
                      if(results == "" ){
                        var intrevasoil8n = 0;
                        io.emit('soil8n',{           
                        valor: +intrevasoil8n
                         });
                     }else{
                      var intrevasoil8 = results[0].max[0];
                      io.emit('soil8',{           
                        valor: +intrevasoil8
                       });
                           
                    }
                    }                       
                    )  
                    col.aggregate([ { $match : findsoil9  } ,
                      {$group:{_id: null, max: { $push: "$soilvalue" } }}],	  
                      function(err, results) {
                      assert.equal(err, null);
                      if(results == "" ){
                        var intrevasoil9n = 0;
                        io.emit('soil9n',{           
                        valor: +intrevasoil9n
                         });
                     }else{
                      var intrevasoil9 = results[0].max[0];
                      io.emit('soil9',{           
                        valor: +intrevasoil9
                       });
                           
                    }
                    }                       
                    )  
                    col.aggregate([ { $match : findsoil10  } ,
                      {$group:{_id: null, max: { $push: "$soilvalue" } }}],	  
                      function(err, results) {
                      assert.equal(err, null);
                      if(results == "" ){
                        var intrevasoil10n = 0;
                        io.emit('soil10n',{           
                        valor: +intrevasoil10n
                         });
                     }else{
                      var intrevasoil10 = results[0].max[0];
                      io.emit('soil10',{           
                        valor: +intrevasoil10
                       });
                           
                    }
                    }                       
                    )  
                    col.aggregate([ { $match : findsoil11  } ,
                      {$group:{_id: null, max: { $push: "$soilvalue" } }}],	  
                      function(err, results) {
                      assert.equal(err, null);
                      if(results == "" ){
                        var intrevasoil11n = 0;
                        io.emit('soil11n',{           
                        valor: +intrevasoil11n
                         });
                     }else{
                      var intrevasoil11 = results[0].max[0];
                      io.emit('soil11',{           
                        valor: +intrevasoil11
                       });
                           
                    }
                    }                       
                    )  
                    col.aggregate([ { $match : findsoil12  } ,
                      {$group:{_id: null, max: { $push: "$soilvalue" } }}],	  
                      function(err, results) {
                      assert.equal(err, null);
                      if(results == "" ){
                        var intrevasoil12n = 0;
                        io.emit('soil12n',{           
                        valor: +intrevasoil12n
                         });
                     }else{
                      var intrevasoil12 = results[0].max[0];
                      io.emit('soil12',{           
                        valor: +intrevasoil12
                       });
                           
                    }
                    }                       
                    )  
                    col.aggregate([ { $match : findsoil13  } ,
                      {$group:{_id: null, max: { $push: "$soilvalue" } }}],	  
                      function(err, results) {
                      assert.equal(err, null);
                      if(results == "" ){
                        var intrevasoil13n = 0;
                        io.emit('soil13n',{           
                        valor: +intrevasoil13n
                         });
                     }else{
                      var intrevasoil13 = results[0].max[0];
                      io.emit('soil13',{           
                        valor: +intrevasoil13
                       });
                           
                    }
                    }                       
                    )  
                    col.aggregate([ { $match : findsoil14  } ,
                      {$group:{_id: null, max: { $push: "$soilvalue" } }}],	  
                      function(err, results) {
                      assert.equal(err, null);
                      if(results == "" ){
                        var intrevasoil14n = 0;
                        io.emit('soil14n',{           
                        valor: +intrevasoil14n
                         });
                     }else{
                      var intrevasoil14 = results[0].max[0];
                      io.emit('soil14',{           
                        valor: +intrevasoil14
                       });
                           
                    }
                    }                       
                    )  
                    col.aggregate([ { $match : findsoil15  } ,
                      {$group:{_id: null, max: { $push: "$soilvalue" } }}],	  
                      function(err, results) {
                      assert.equal(err, null);
                      if(results == "" ){
                        var intrevasoil15n = 0;
                        io.emit('soil15n',{           
                        valor: +intrevasoil15n
                         });
                     }else{
                      var intrevasoil15 = results[0].max[0];
                      io.emit('soil15',{           
                        valor: +intrevasoil15
                       });
                           
                    }
                    }                       
                    )  
                    col.aggregate([ { $match : findsoil16  } ,
                      {$group:{_id: null, max: { $push: "$soilvalue" } }}],	  
                      function(err, results) {
                      assert.equal(err, null);
                      if(results == "" ){
                        var intrevasoil16n = 0;
                        io.emit('soil16n',{           
                        valor: +intrevasoil16n
                         });
                     }else{
                      var intrevasoil16 = results[0].max[0];
                      io.emit('soil16',{           
                        valor: +intrevasoil16
                       });
                           
                    }
                    }                       
                    )  
                    col.aggregate([ { $match : findsoil17  } ,
                      {$group:{_id: null, max: { $push: "$soilvalue" } }}],	  
                      function(err, results) {
                      assert.equal(err, null);
                      if(results == "" ){
                        var intrevasoil17n = 0;
                        io.emit('soil17n',{           
                        valor: +intrevasoil17n
                         });
                     }else{
                      var intrevasoil17 = results[0].max[0];
                      io.emit('soil17',{           
                        valor: +intrevasoil17
                       });
                           
                    }
                    }                       
                    )  
                    col.aggregate([ { $match : findsoil18  } ,
                      {$group:{_id: null, max: { $push: "$soilvalue" } }}],	  
                      function(err, results) {
                      assert.equal(err, null);
                      if(results == "" ){
                        var intrevasoil18n = 0;
                        io.emit('soil18n',{           
                        valor: +intrevasoil18n
                         });
                     }else{
                      var intrevasoil18 = results[0].max[0];
                      io.emit('soil18',{           
                        valor: +intrevasoil18
                       });
                           
                    }
                    }                       
                    )  
                    col.aggregate([ { $match : findsoil19  } ,
                      {$group:{_id: null, max: { $push: "$soilvalue" } }}],	  
                      function(err, results) {
                      assert.equal(err, null);
                      if(results == "" ){
                        var intrevasoil19n = 0;
                        io.emit('soil19n',{           
                        valor: +intrevasoil19n
                         });
                     }else{
                      var intrevasoil19 = results[0].max[0];
                      io.emit('soil19',{           
                        valor: +intrevasoil19
                       });
                           
                    }
                    }                       
                    )  
                    col.aggregate([ { $match : findsoil20  } ,
                      {$group:{_id: null, max: { $push: "$soilvalue" } }}],	  
                      function(err, results) {
                      assert.equal(err, null);
                      if(results == "" ){
                        var intrevasoil20n = 0;
                        io.emit('soil20n',{           
                        valor: +intrevasoil20n
                         });
                     }else{
                      var intrevasoil20 = results[0].max[0];
                      io.emit('soil20',{           
                        valor: +intrevasoil20
                       });
                           
                    }
                    }                       
                    )  
                    col.aggregate([ { $match : findsoil21  } ,
                      {$group:{_id: null, max: { $push: "$soilvalue" } }}],	  
                      function(err, results) {
                      assert.equal(err, null);
                      if(results == "" ){
                        var intrevasoil21n = 0;
                        io.emit('soil21n',{           
                        valor: +intrevasoil21n
                         });
                     }else{
                      var intrevasoil21 = results[0].max[0];
                      io.emit('soil21',{           
                        valor: +intrevasoil21
                       });
                           
                    }
                    }                       
                    )  
                    col.aggregate([ { $match : findsoil22  } ,
                      {$group:{_id: null, max: { $push: "$soilvalue" } }}],	  
                      function(err, results) {
                      assert.equal(err, null);
                      if(results == "" ){
                        var intrevasoil22n = 0;
                        io.emit('soil22n',{           
                        valor: +intrevasoil22n
                         });
                     }else{
                      var intrevasoil22 = results[0].max[0];
                      io.emit('soil22',{           
                        valor: +intrevasoil22
                       });
                           
                    }
                    }                       
                    )  
                    col.aggregate([ { $match : findsoil23  } ,
                      {$group:{_id: null, max: { $push: "$soilvalue" } }}],	  
                      function(err, results) {
                      assert.equal(err, null);
                      if(results == "" ){
                        var intrevasoil23n = 0;
                        io.emit('soil23n',{           
                        valor: +intrevasoil23n
                         });
                     }else{
                      var intrevasoil23 = results[0].max[0];
                      io.emit('soil23',{           
                        valor: +intrevasoil23
                       });
                           
                    }
                    }                       
                    )  
                db.close();
                }); 
                }


                function sendrain(){
                    
                        var MongoClient5 = require('mongodb').MongoClient;
                        var url5 = "mongodb://localhost:27017/watherdata";
                        MongoClient5.connect(url5, function(err, db) {
                      if (err) throw err;
                      var date = new Date();  
                      var datadate = (date.getDate());
                      var datamonth = (date.getMonth()+1);
                      var datayear = (date.getFullYear());
                      var datenow = (datadate.toString()+datamonth.toString()+datayear.toString());
                      var col =  db.collection("้raindata");  
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
                    
                    
                        var findrain = {day: dateout, month: monthout, year: yearout, hour: '00',  minute: '00'};
                        var findrain1 = {day: dateout, month: monthout, year: yearout, hour: '01',  minute: '00'};
                        var findrain2 = {day: dateout, month: monthout, year: yearout, hour: '02',  minute: '00'};
                        var findrain3 = {day: dateout, month: monthout, year: yearout, hour: '03',  minute: '00'};
                        var findrain4 = {day: dateout, month: monthout, year: yearout, hour: '04',  minute: '00'};
                        var findrain5 = {day: dateout, month: monthout, year: yearout, hour: '05',  minute: '00'};
                        var findrain6 = {day: dateout, month: monthout, year: yearout, hour: '06',  minute: '00'};
                        var findrain7 = {day: dateout, month: monthout, year: yearout, hour: '07',  minute: '00'};
                        var findrain8 = {day: dateout, month: monthout, year: yearout, hour: '08',  minute: '00'};
                        var findrain9 = {day: dateout, month: monthout, year: yearout, hour: '09',  minute: '00'};
                        var findrain10 = {day: dateout, month: monthout, year: yearout, hour: '10',  minute: '00'};
                        var findrain11 = {day: dateout, month: monthout, year: yearout, hour: '11',  minute: '00'};
                        var findrain12 = {day: dateout, month: monthout, year: yearout, hour: '12',  minute: '00'};
                        var findrain13 = {day: dateout, month: monthout, year: yearout, hour: '13',  minute: '00'};
                        var findrain14 = {day: dateout, month: monthout, year: yearout, hour: '14',  minute: '00'};
                        var findrain15 = {day: dateout, month: monthout, year: yearout, hour: '15',  minute: '00'};
                        var findrain16 = {day: dateout, month: monthout, year: yearout, hour: '16',  minute: '00'};
                        var findrain17 = {day: dateout, month: monthout, year: yearout, hour: '17',  minute: '00'};
                        var findrain18 = {day: dateout, month: monthout, year: yearout, hour: '18',  minute: '00'};
                        var findrain19 = {day: dateout, month: monthout, year: yearout, hour: '19',  minute: '00'};
                        var findrain20 = {day: dateout, month: monthout, year: yearout, hour: '20',  minute: '00'};
                        var findrain21 = {day: dateout, month: monthout, year: yearout, hour: '21',  minute: '00'};
                        var findrain22 = {day: dateout, month: monthout, year: yearout, hour: '22',  minute: '00'};
                        var findrain23 = {day: dateout, month: monthout, year: yearout, hour: '23',  minute: '00'};
                    
                    
                        col.aggregate([ { $match : findrain  } ,
                          {$group:{_id: null, max: { $push: "$rainvalue" } }}],	  
                          function(err, results) {
                          assert.equal(err, null);
                          if(results == "" ){
                            var intrevarain0n = 0;
                            io.emit('rain0n',{           
                            valor: +intrevarain0n
                             });
                         }else{
                          var intrevarain0 = results[0].max[0];
                          io.emit('rain0',{           
                            valor: +intrevarain0
                           });
                               
                        }
                        }                       
                        )  
                        col.aggregate([ { $match : findrain1  } ,
                          {$group:{_id: null, max: { $push: "$rainvalue" } }}],	  
                          function(err, results) {
                          assert.equal(err, null);
                          if(results == "" ){
                            var intrevarain1n = 0;
                            io.emit('rain1n',{           
                            valor: +intrevarain1n
                             });
                         }else{
                          var intrevarain1 = results[0].max[0];
                          io.emit('rain1',{           
                            valor: +intrevarain1
                           });
                               
                        }
                        }                       
                        )  
                        col.aggregate([ { $match : findrain2  } ,
                          {$group:{_id: null, max: { $push: "$rainvalue" } }}],	  
                          function(err, results) {
                          assert.equal(err, null);
                          if(results == "" ){
                            var intrevarain2n = 0;
                            io.emit('rain2n',{           
                            valor: +intrevarain2n
                             });
                         }else{
                          var intrevarain2 = results[0].max[0];
                          io.emit('rain2',{           
                            valor: +intrevarain2
                           });
                               
                        }
                        }                       
                        )  
                        col.aggregate([ { $match : findrain3  } ,
                          {$group:{_id: null, max: { $push: "$rainvalue" } }}],	  
                          function(err, results) {
                          assert.equal(err, null);
                          if(results == "" ){
                            var intrevarain3n = 0;
                            io.emit('rain3n',{           
                            valor: +intrevarain3n
                             });
                         }else{
                          var intrevarain3 = results[0].max[0];
                          io.emit('rain3',{           
                            valor: +intrevarain3
                           });
                               
                        }
                        }                       
                        )  
                        col.aggregate([ { $match : findrain4  } ,
                          {$group:{_id: null, max: { $push: "$rainvalue" } }}],	  
                          function(err, results) {
                          assert.equal(err, null);
                          if(results == "" ){
                            var intrevarain4n = 0;
                            io.emit('rain4n',{           
                            valor: +intrevarain4n
                             });
                         }else{
                          var intrevarain4 = results[0].max[0];
                          io.emit('rain4',{           
                            valor: +intrevarain4
                           });
                               
                        }
                        }                       
                        )  
                        col.aggregate([ { $match : findrain5  } ,
                          {$group:{_id: null, max: { $push: "$rainvalue" } }}],	  
                          function(err, results) {
                          assert.equal(err, null);
                          if(results == "" ){
                            var intrevarain5n = 0;
                            io.emit('rain5n',{           
                            valor: +intrevarain5n
                             });
                         }else{
                          var intrevarain5 = results[0].max[0];
                          io.emit('rain5',{           
                            valor: +intrevarain5
                           });
                               
                        }
                        }                       
                        )  
                        col.aggregate([ { $match : findrain6  } ,
                          {$group:{_id: null, max: { $push: "$rainvalue" } }}],	  
                          function(err, results) {
                          assert.equal(err, null);
                          if(results == "" ){
                            var intrevarain6n = 0;
                            io.emit('rain6n',{           
                            valor: +intrevarain6n
                             });
                         }else{
                          var intrevarain6 = results[0].max[0];
                          io.emit('rain6',{           
                            valor: +intrevarain6
                           });
                               
                        }
                        }                       
                        )  
                        col.aggregate([ { $match : findrain7  } ,
                          {$group:{_id: null, max: { $push: "$rainvalue" } }}],	  
                          function(err, results) {
                          assert.equal(err, null);
                          if(results == "" ){
                            var intrevarain7n = 0;
                            io.emit('rain7n',{           
                            valor: +intrevarain7n
                             });
                         }else{
                          var intrevarain7 = results[0].max[0];
                          io.emit('rain7',{           
                            valor: +intrevarain7
                           });
                               
                        }
                        }                       
                        )  
                        col.aggregate([ { $match : findrain8  } ,
                          {$group:{_id: null, max: { $push: "$rainvalue" } }}],	  
                          function(err, results) {
                          assert.equal(err, null);
                          if(results == "" ){
                            var intrevarain8n = 0;
                            io.emit('rain8n',{           
                            valor: +intrevarain8n
                             });
                         }else{
                          var intrevarain8 = results[0].max[0];
                          io.emit('rain8',{           
                            valor: +intrevarain8
                           });
                               
                        }
                        }                       
                        )  
                        col.aggregate([ { $match : findrain9  } ,
                          {$group:{_id: null, max: { $push: "$rainvalue" } }}],	  
                          function(err, results) {
                          assert.equal(err, null);
                          if(results == "" ){
                            var intrevarain9n = 0;
                            io.emit('rain9n',{           
                            valor: +intrevarain9n
                             });
                         }else{
                          var intrevarain9 = results[0].max[0];
                          io.emit('rain9',{           
                            valor: +intrevarain9
                           });
                               
                        }
                        }                       
                        )  
                        col.aggregate([ { $match : findrain10  } ,
                          {$group:{_id: null, max: { $push: "$rainvalue" } }}],	  
                          function(err, results) {
                          assert.equal(err, null);
                          if(results == "" ){
                            var intrevarain10n = 0;
                            io.emit('rain10n',{           
                            valor: +intrevarain10n
                             });
                         }else{
                          var intrevarain10 = results[0].max[0];
                          io.emit('rain10',{           
                            valor: +intrevarain10
                           });
                               
                        }
                        }                       
                        )  
                        col.aggregate([ { $match : findrain11  } ,
                          {$group:{_id: null, max: { $push: "$rainvalue" } }}],	  
                          function(err, results) {
                          assert.equal(err, null);
                          if(results == "" ){
                            var intrevarain11n = 0;
                            io.emit('rain11n',{           
                            valor: +intrevarain11n
                             });
                         }else{
                          var intrevarain11 = results[0].max[0];
                          io.emit('rain11',{           
                            valor: +intrevarain11
                           });
                               
                        }
                        }                       
                        )  
                        col.aggregate([ { $match : findrain12  } ,
                          {$group:{_id: null, max: { $push: "$rainvalue" } }}],	  
                          function(err, results) {
                          assert.equal(err, null);
                          if(results == "" ){
                            var intrevarain12n = 0;
                            io.emit('rain12n',{           
                            valor: +intrevarain12n
                             });
                         }else{
                          var intrevarain12 = results[0].max[0];
                          io.emit('rain12',{           
                            valor: +intrevarain12
                           });
                               
                        }
                        }                       
                        )  
                        col.aggregate([ { $match : findrain13  } ,
                          {$group:{_id: null, max: { $push: "$rainvalue" } }}],	  
                          function(err, results) {
                          assert.equal(err, null);
                          if(results == "" ){
                            var intrevarain13n = 0;
                            io.emit('rain13n',{           
                            valor: +intrevarain13n
                             });
                         }else{
                          var intrevarain13 = results[0].max[0];
                          io.emit('rain13',{           
                            valor: +intrevarain13
                           });
                               
                        }
                        }                       
                        )  
                        col.aggregate([ { $match : findrain14  } ,
                          {$group:{_id: null, max: { $push: "$rainvalue" } }}],	  
                          function(err, results) {
                          assert.equal(err, null);
                          if(results == "" ){
                            var intrevarain14n = 0;
                            io.emit('rain14n',{           
                            valor: +intrevarain14n
                             });
                         }else{
                          var intrevarain14 = results[0].max[0];
                          io.emit('rain14',{           
                            valor: +intrevarain14
                           });
                               
                        }
                        }                       
                        )  
                        col.aggregate([ { $match : findrain15  } ,
                          {$group:{_id: null, max: { $push: "$rainvalue" } }}],	  
                          function(err, results) {
                          assert.equal(err, null);
                          if(results == "" ){
                            var intrevarain15n = 0;
                            io.emit('rain15n',{           
                            valor: +intrevarain15n
                             });
                         }else{
                          var intrevarain15 = results[0].max[0];
                          io.emit('rain15',{           
                            valor: +intrevarain15
                           });
                               
                        }
                        }                       
                        )  
                        col.aggregate([ { $match : findrain16  } ,
                          {$group:{_id: null, max: { $push: "$rainvalue" } }}],	  
                          function(err, results) {
                          assert.equal(err, null);
                          if(results == "" ){
                            var intrevarain16n = 0;
                            io.emit('rain16n',{           
                            valor: +intrevarain16n
                             });
                         }else{
                          var intrevarain16 = results[0].max[0];
                          io.emit('rain16',{           
                            valor: +intrevarain16
                           });
                               
                        }
                        }                       
                        )  
                        col.aggregate([ { $match : findrain17  } ,
                          {$group:{_id: null, max: { $push: "$rainvalue" } }}],	  
                          function(err, results) {
                          assert.equal(err, null);
                          if(results == "" ){
                            var intrevarain17n = 0;
                            io.emit('rain17n',{           
                            valor: +intrevarain17n
                             });
                         }else{
                          var intrevarain17 = results[0].max[0];
                          io.emit('rain17',{           
                            valor: +intrevarain17
                           });
                               
                        }
                        }                       
                        )  
                        col.aggregate([ { $match : findrain18  } ,
                          {$group:{_id: null, max: { $push: "$rainvalue" } }}],	  
                          function(err, results) {
                          assert.equal(err, null);
                          if(results == "" ){
                            var intrevarain18n = 0;
                            io.emit('rain18n',{           
                            valor: +intrevarain18n
                             });
                         }else{
                          var intrevarain18 = results[0].max[0];
                          io.emit('rain18',{           
                            valor: +intrevarain18
                           });
                               
                        }
                        }                       
                        )  
                        col.aggregate([ { $match : findrain19  } ,
                          {$group:{_id: null, max: { $push: "$rainvalue" } }}],	  
                          function(err, results) {
                          assert.equal(err, null);
                          if(results == "" ){
                            var intrevarain19n = 0;
                            io.emit('rain19n',{           
                            valor: +intrevarain19n
                             });
                         }else{
                          var intrevarain19 = results[0].max[0];
                          io.emit('rain19',{           
                            valor: +intrevarain19
                           });
                               
                        }
                        }                       
                        )  
                        col.aggregate([ { $match : findrain20  } ,
                          {$group:{_id: null, max: { $push: "$rainvalue" } }}],	  
                          function(err, results) {
                          assert.equal(err, null);
                          if(results == "" ){
                            var intrevarain20n = 0;
                            io.emit('rain20n',{           
                            valor: +intrevarain20n
                             });
                         }else{
                          var intrevarain20 = results[0].max[0];
                          io.emit('rain20',{           
                            valor: +intrevarain20
                           });
                               
                        }
                        }                       
                        )  
                        col.aggregate([ { $match : findrain21  } ,
                          {$group:{_id: null, max: { $push: "$rainvalue" } }}],	  
                          function(err, results) {
                          assert.equal(err, null);
                          if(results == "" ){
                            var intrevarain21n = 0;
                            io.emit('rain21n',{           
                            valor: +intrevarain21n
                             });
                         }else{
                          var intrevarain21 = results[0].max[0];
                          io.emit('rain21',{           
                            valor: +intrevarain21
                           });
                               
                        }
                        }                       
                        )  
                        col.aggregate([ { $match : findrain22  } ,
                          {$group:{_id: null, max: { $push: "$rainvalue" } }}],	  
                          function(err, results) {
                          assert.equal(err, null);
                          if(results == "" ){
                            var intrevarain22n = 0;
                            io.emit('rain22n',{           
                            valor: +intrevarain22n
                             });
                         }else{
                          var intrevarain22 = results[0].max[0];
                          io.emit('rain22',{           
                            valor: +intrevarain22
                           });
                               
                        }
                        }                       
                        )  
                        col.aggregate([ { $match : findrain23  } ,
                          {$group:{_id: null, max: { $push: "$rainvalue" } }}],	  
                          function(err, results) {
                          assert.equal(err, null);
                          if(results == "" ){
                            var intrevarain23n = 0;
                            io.emit('rain23n',{           
                            valor: +intrevarain23n
                             });
                         }else{
                          var intrevarain23 = results[0].max[0];
                          io.emit('rain23',{           
                            valor: +intrevarain23
                           });
                               
                        }
                        }                       
                        )  

                    db.close();
                    }); 
                    }

                
                    function senddust(){
                        
                        var MongoClient6 = require('mongodb').MongoClient;
                        var url6 = "mongodb://localhost:27017/watherdata";
                        MongoClient6.connect(url6, function(err, db) {
                          if (err) throw err;
                          var date = new Date();  
                          var datadate = (date.getDate());
                          var datamonth = (date.getMonth()+1);
                          var datayear = (date.getFullYear());
                          var col =  db.collection("dustdata");  
                          assert = require('assert');
                          //var datenow = (datadate.toString()+datamonth.toString()+datayear.toString());
                          
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
                        
                        
                        
                            
                            var finddust = {day: dateout, month: monthout, year: yearout, hour: '00',  minute: '00',};
                            var finddust1 = {day: dateout, month: monthout, year: yearout, hour: '01',  minute: '00',};
                            var finddust2 = {day: dateout, month: monthout, year: yearout, hour: '02',  minute: '00',};
                            var finddust3 = {day: dateout, month: monthout, year: yearout, hour: '03',  minute: '00',};
                            var finddust4 = {day: dateout, month: monthout, year: yearout, hour: '04',  minute: '00',};
                            var finddust5 = {day: dateout, month: monthout, year: yearout, hour: '05',  minute: '00',};
                            var finddust6 = {day: dateout, month: monthout, year: yearout, hour: '06',  minute: '00',};
                            var finddust7 = {day: dateout, month: monthout, year: yearout, hour: '07',  minute: '00',};
                            var finddust8 = {day: dateout, month: monthout, year: yearout, hour: '08',  minute: '00',};
                            var finddust9 = {day: dateout, month: monthout, year: yearout, hour: '09',  minute: '00',};
                            var finddust10 = {day: dateout, month: monthout, year: yearout, hour: '10',  minute: '00',};
                            var finddust11 = {day: dateout, month: monthout, year: yearout, hour: '11',  minute: '00',};
                            var finddust12 = {day: dateout, month: monthout, year: yearout, hour: '12',  minute: '00',};
                            var finddust13 = {day: dateout, month: monthout, year: yearout, hour: '13',  minute: '00',};
                            var finddust14 = {day: dateout, month: monthout, year: yearout, hour: '14',  minute: '00',};
                            var finddust15 = {day: dateout, month: monthout, year: yearout, hour: '15',  minute: '00',};
                            var finddust16 = {day: dateout, month: monthout, year: yearout, hour: '16',  minute: '00',};
                            var finddust17 = {day: dateout, month: monthout, year: yearout, hour: '17',  minute: '00',};
                            var finddust18 = {day: dateout, month: monthout, year: yearout, hour: '18',  minute: '00',};
                            var finddust19 = {day: dateout, month: monthout, year: yearout, hour: '19',  minute: '00',};
                            var finddust20 = {day: dateout, month: monthout, year: yearout, hour: '20',  minute: '00',};
                            var finddust21 = {day: dateout, month: monthout, year: yearout, hour: '21',  minute: '00',};
                            var finddust22 = {day: dateout, month: monthout, year: yearout, hour: '22',  minute: '00',};
                            var finddust23 = {day: dateout, month: monthout, year: yearout, hour: '23',  minute: '00',};
                        
                        
                        
                        
                            col.aggregate([ { $match : finddust  } ,
                              {$group:{_id: null, max: { $push: "$dustvalue" } }}],	  
                              function(err, results) {
                              assert.equal(err, null);
                              if(results == "" ){
                                var intrevadust0n = 0;
                                io.emit('dust0n',{           
                                valor: +intrevadust0n
                                 });
                             }else{
                              var intrevadust0 = results[0].max[0];
                              io.emit('dust0',{           
                                valor: +intrevadust0
                               });
                                   
                            }
                            }                       
                            )  
                            col.aggregate([ { $match : finddust1  } ,
                              {$group:{_id: null, max: { $push: "$dustvalue" } }}],	  
                              function(err, results) {
                              assert.equal(err, null);
                              if(results == "" ){
                                var intrevadust1n = 0;
                                io.emit('dust1n',{           
                                valor: +intrevadust1n
                                 });
                             }else{
                              var intrevadust1 = results[0].max[0];
                              io.emit('dust1',{           
                                valor: +intrevadust1
                               });
                                   
                            }
                            }                       
                            )  
                            col.aggregate([ { $match : finddust2  } ,
                              {$group:{_id: null, max: { $push: "$dustvalue" } }}],	  
                              function(err, results) {
                              assert.equal(err, null);
                              if(results == "" ){
                                var intrevadust2n = 0;
                                io.emit('dust2n',{           
                                valor: +intrevadust2n
                                 });
                             }else{
                              var intrevadust2 = results[0].max[0];
                              io.emit('dust2',{           
                                valor: +intrevadust2
                               });
                                   
                            }
                            }                       
                            )  
                            col.aggregate([ { $match : finddust3  } ,
                              {$group:{_id: null, max: { $push: "$dustvalue" } }}],	  
                              function(err, results) {
                              assert.equal(err, null);
                              if(results == "" ){
                                var intrevadust3n = 0;
                                io.emit('dust3n',{           
                                valor: +intrevadust3n
                                 });
                             }else{
                              var intrevadust3 = results[0].max[0];
                              io.emit('dust3',{           
                                valor: +intrevadust3
                               });
                                   
                            }
                            }                       
                            )  
                            col.aggregate([ { $match : finddust4  } ,
                              {$group:{_id: null, max: { $push: "$dustvalue" } }}],	  
                              function(err, results) {
                              assert.equal(err, null);
                              if(results == "" ){
                                var intrevadust4n = 0;
                                io.emit('dust4n',{           
                                valor: +intrevadust4n
                                 });
                             }else{
                              var intrevadust4 = results[0].max[0];
                              io.emit('dust4',{           
                                valor: +intrevadust4
                               });
                                   
                            }
                            }                       
                            )  
                            
                            col.aggregate([ { $match : finddust5  } ,
                              {$group:{_id: null, max: { $push: "$dustvalue" } }}],	  
                              function(err, results) {
                              assert.equal(err, null);
                              if(results == "" ){
                                var intrevadust5n = 0;
                                io.emit('dust5n',{           
                                valor: +intrevadust5n
                                 });
                             }else{
                              var intrevadust5 = results[0].max[0];
                              io.emit('dust5',{           
                                valor: +intrevadust5
                               });
                                   
                            }
                            }                       
                            )  
                            col.aggregate([ { $match : finddust6  } ,
                              {$group:{_id: null, max: { $push: "$dustvalue" } }}],	  
                              function(err, results) {
                              assert.equal(err, null);
                              if(results == "" ){
                                var intrevadust6n = 0;
                                io.emit('dust6n',{           
                                valor: +intrevadust6n
                                 });
                             }else{
                              var intrevadust6 = results[0].max[0];
                              io.emit('dust6',{           
                                valor: +intrevadust6
                               });
                                   
                            }
                            }                       
                            )  
                            col.aggregate([ { $match : finddust7  } ,
                              {$group:{_id: null, max: { $push: "$dustvalue" } }}],	  
                              function(err, results) {
                              assert.equal(err, null);
                              if(results == "" ){
                                var intrevadust7n = 0;
                                io.emit('dust7n',{           
                                valor: +intrevadust7n
                                 });
                             }else{
                              var intrevadust7 = results[0].max[0];
                              io.emit('dust7',{           
                                valor: +intrevadust7
                               });
                                   
                            }
                            }                       
                            )  
                            col.aggregate([ { $match : finddust8  } ,
                              {$group:{_id: null, max: { $push: "$dustvalue" } }}],	  
                              function(err, results) {
                              assert.equal(err, null);
                              if(results == "" ){
                                var intrevadust8n = 0;
                                io.emit('dust8n',{           
                                valor: +intrevadust8n
                                 });
                             }else{
                              var intrevadust8 = results[0].max[0];
                              io.emit('dust8',{           
                                valor: +intrevadust8
                               });
                                   
                            }
                            }                       
                            )  
                            col.aggregate([ { $match : finddust9  } ,
                              {$group:{_id: null, max: { $push: "$dustvalue" } }}],	  
                              function(err, results) {
                              assert.equal(err, null);
                              if(results == "" ){
                                var intrevadust9n = 0;
                                io.emit('dust9n',{           
                                valor: +intrevadust9n
                                 });
                             }else{
                              var intrevadust9 = results[0].max[0];
                              io.emit('dust9',{           
                                valor: +intrevadust9
                               });
                                   
                            }
                            }                       
                            )  
                            col.aggregate([ { $match : finddust10  } ,
                              {$group:{_id: null, max: { $push: "$dustvalue" } }}],	  
                              function(err, results) {
                              assert.equal(err, null);
                              if(results == "" ){
                                var intrevadust10n = 0;
                                io.emit('dust10n',{           
                                valor: +intrevadust10n
                                 });
                             }else{
                              var intrevadust10 = results[0].max[0];
                              io.emit('dust10',{           
                                valor: +intrevadust10
                               });
                                   
                            }
                            }                       
                            )  
                            col.aggregate([ { $match : finddust11  } ,
                              {$group:{_id: null, max: { $push: "$dustvalue" } }}],	  
                              function(err, results) {
                              assert.equal(err, null);
                              if(results == "" ){
                                var intrevadust11n = 0;
                                io.emit('dust11n',{           
                                valor: +intrevadust11n
                                 });
                             }else{
                              var intrevadust11 = results[0].max[0];
                              io.emit('dust11',{           
                                valor: +intrevadust11
                               });
                                   
                            }
                            }                       
                            )  
                            col.aggregate([ { $match : finddust12  } ,
                              {$group:{_id: null, max: { $push: "$dustvalue" } }}],	  
                              function(err, results) {
                              assert.equal(err, null);
                              if(results == "" ){
                                var intrevadust12n = 0;
                                io.emit('dust12n',{           
                                valor: +intrevadust12n
                                 });
                             }else{
                              var intrevadust12 = results[0].max[0];
                              io.emit('dust12',{           
                                valor: +intrevadust12
                               });
                                   
                            }
                            }                       
                            )  
                            col.aggregate([ { $match : finddust13  } ,
                              {$group:{_id: null, max: { $push: "$dustvalue" } }}],	  
                              function(err, results) {
                              assert.equal(err, null);
                              if(results == "" ){
                                var intrevadust13n = 0;
                                io.emit('dust3n',{           
                                valor: +intrevadust13n
                                 });
                             }else{
                              var intrevadust13 = results[0].max[0];
                              io.emit('dust13',{           
                                valor: +intrevadust13
                               });
                                   
                            }
                            }                       
                            )  
                            col.aggregate([ { $match : finddust14  } ,
                              {$group:{_id: null, max: { $push: "$dustvalue" } }}],	  
                              function(err, results) {
                              assert.equal(err, null);
                              if(results == "" ){
                                var intrevadust14n = 0;
                                io.emit('dust14n',{           
                                valor: +intrevadust14n
                                 });
                             }else{
                              var intrevadust14 = results[0].max[0];
                              io.emit('dust14',{           
                                valor: +intrevadust14
                               });
                                   
                            }
                            }                       
                            )  
                            col.aggregate([ { $match : finddust15  } ,
                              {$group:{_id: null, max: { $push: "$dustvalue" } }}],	  
                              function(err, results) {
                              assert.equal(err, null);
                              if(results == "" ){
                                var intrevadust15n = 0;
                                io.emit('dust15n',{           
                                valor: +intrevadust15n
                                 });
                             }else{
                              var intrevadust15 = results[0].max[0];
                              io.emit('dust15',{           
                                valor: +intrevadust15
                               });
                                   
                            }
                            }                       
                            )  
                            col.aggregate([ { $match : finddust16  } ,
                              {$group:{_id: null, max: { $push: "$dustvalue" } }}],	  
                              function(err, results) {
                              assert.equal(err, null);
                              if(results == "" ){
                                var intrevadust16n = 0;
                                io.emit('dust16n',{           
                                valor: +intrevadust16n
                                 });
                             }else{
                              var intrevadust16 = results[0].max[0];
                              io.emit('dust16',{           
                                valor: +intrevadust16
                               });
                                   
                            }
                            }                       
                            )  
                            col.aggregate([ { $match : finddust17  } ,
                              {$group:{_id: null, max: { $push: "$dustvalue" } }}],	  
                              function(err, results) {
                              assert.equal(err, null);
                              if(results == "" ){
                                var intrevadust17n = 0;
                                io.emit('dust17n',{           
                                valor: +intrevadust17n
                                 });
                             }else{
                              var intrevadust17 = results[0].max[0];
                              io.emit('dust17',{           
                                valor: +intrevadust17
                               });
                                   
                            }
                            }                       
                            )  
                            col.aggregate([ { $match : finddust18  } ,
                              {$group:{_id: null, max: { $push: "$dustvalue" } }}],	  
                              function(err, results) {
                              assert.equal(err, null);
                              if(results == "" ){
                                var intrevadust18n = 0;
                                io.emit('dust18n',{           
                                valor: +intrevadust18n
                                 });
                             }else{
                              var intrevadust18 = results[0].max[0];
                              io.emit('dust18',{           
                                valor: +intrevadust18
                               });
                                   
                            }
                            }                       
                            )  
                            col.aggregate([ { $match : finddust19  } ,
                              {$group:{_id: null, max: { $push: "$dustvalue" } }}],	  
                              function(err, results) {
                              assert.equal(err, null);
                              if(results == "" ){
                                var intrevadust19n = 0;
                                io.emit('dust19n',{           
                                valor: +intrevadust19n
                                 });
                             }else{
                              var intrevadust19 = results[0].max[0];
                              io.emit('dust19',{           
                                valor: +intrevadust19
                               });
                                   
                            }
                            }                       
                            )  
                            col.aggregate([ { $match : finddust20  } ,
                              {$group:{_id: null, max: { $push: "$dustvalue" } }}],	  
                              function(err, results) {
                              assert.equal(err, null);
                              if(results == "" ){
                                var intrevadust20n = 0;
                                io.emit('dust20n',{           
                                valor: +intrevadust20n
                                 });
                             }else{
                              var intrevadust20 = results[0].max[0];
                              io.emit('dust20',{           
                                valor: +intrevadust20
                               });
                                   
                            }
                            }                       
                            )  
                            col.aggregate([ { $match : finddust21  } ,
                              {$group:{_id: null, max: { $push: "$dustvalue" } }}],	  
                              function(err, results) {
                              assert.equal(err, null);
                              if(results == "" ){
                                var intrevadust21n = 0;
                                io.emit('dust21n',{           
                                valor: +intrevadust21n
                                 });
                             }else{
                              var intrevadust21 = results[0].max[0];
                              io.emit('dust21',{           
                                valor: +intrevadust21
                               });
                                   
                            }
                            }                       
                            )  
                            col.aggregate([ { $match : finddust22  } ,
                              {$group:{_id: null, max: { $push: "$dustvalue" } }}],	  
                              function(err, results) {
                              assert.equal(err, null);
                              if(results == "" ){
                                var intrevadust22n = 0;
                                io.emit('dust22n',{           
                                valor: +intrevadust22n
                                 });
                             }else{
                              var intrevadust22 = results[0].max[0];
                              io.emit('dust22',{           
                                valor: +intrevadust22
                               });
                                   
                            }
                            }                       
                            )  
                            col.aggregate([ { $match : finddust23  } ,
                              {$group:{_id: null, max: { $push: "$dustvalue" } }}],	  
                              function(err, results) {
                              assert.equal(err, null);
                              if(results == "" ){
                                var intrevadust23n = 0;
                                io.emit('dust23n',{           
                                valor: +intrevadust23n
                                 });
                             }else{
                              var intrevadust23 = results[0].max[0];
                              io.emit('dust23',{           
                                valor: +intrevadust23
                               });
                                   
                            }
                            }                       
                            )  
                        db.close();
                        }); 
                        
                        }

                        function sendlightmonth(){
                          var MongoClient1_2 = require('mongodb').MongoClient;
                          assert1_2 = require('assert');
                          var url1_2 = "mongodb://localhost:27017/watherdata";
                          MongoClient1_2.connect(url1_2, function(err, db) {
                                        if (err) throw err;   
                                       var col =  db.collection("lightdata");  
                        
                                       col.aggregate([ { $match : { month : "01" } } ,
                                             {$group:{_id: null, max: { $max: "$lightvalue" }, min: { $min: "$lightvalue" }}}],	  
                                       function(err, results) {
                                         assert1_2.equal(err, null);
                                         if(results == "" ){
                                             var intrevalight1_2 = 1;
                                            io.emit('light1_2',{
                                                valor: +intrevalight1_2
                                               });
                                         }else{
                                            io.emit('light1_2_1',{
                                                valor: +results[0].max
                                               });
                                            io.emit('light1_2_2',{
                                                valor: +results[0].min
                                               });
                                         }
                                       }                       
                                    )
                                    col.aggregate([ { $match : { month : "02" } } ,
                                    {$group:{_id: null, max: { $max: "$lightvalue" }, min: { $min: "$lightvalue" }}}],	  
                              function(err, results) {
                                assert1_2.equal(err, null);
                                if(results == "" ){
                                    var intrevalight2_2 = 1;
                                   io.emit('light2_2',{
                                       valor: +intrevalight2_2
                                      });
                                }else{
                                   io.emit('light2_2_1',{
                                       valor: +results[0].max
                                      });
                                   io.emit('light2_2_2',{
                                       valor: +results[0].min
                                      });
                                }
                              }                       
                           )             
                           col.aggregate([ { $match : { month : "03" } } ,
                           {$group:{_id: null, max: { $max: "$lightvalue" }, min: { $min: "$lightvalue" }}}],	  
                     function(err, results) {
                       assert1_2.equal(err, null);
                       if(results == "" ){
                           var intrevalight3_2 = 1;
                          io.emit('light3_2',{
                              valor: +intrevalight3_2
                             });
                       }else{
                          io.emit('light3_2_1',{
                              valor: +results[0].max
                             });
                          io.emit('light3_2_2',{
                              valor: +results[0].min
                             });
                       }
                     }                       
                  )
                  col.aggregate([ { $match : { month : "04" } } ,
                  {$group:{_id: null, max: { $max: "$lightvalue" }, min: { $min: "$lightvalue" }}}],	  
            function(err, results) {
              assert1_2.equal(err, null);
              if(results == "" ){
                  var intrevalight4_2 = 1;
                 io.emit('light4_2',{
                     valor: +intrevalight4_2
                    });
              }else{
                 io.emit('light4_2_1',{
                     valor: +results[0].max
                    });
                 io.emit('light4_2_2',{
                     valor: +results[0].min
                    });
              }
            }                       
         )
         col.aggregate([ { $match : { month : "05" } } ,
         {$group:{_id: null, max: { $max: "$lightvalue" }, min: { $min: "$lightvalue" }}}],	  
   function(err, results) {
     assert1_2.equal(err, null);
     if(results == "" ){
         var intrevalight5_2 = 1;
        io.emit('light5_2',{
            valor: +intrevalight5_2
           });
     }else{
        io.emit('light5_2_1',{
            valor: +results[0].max
           });
        io.emit('light5_2_2',{
            valor: +results[0].min
           });
     }
   }                       
)       
col.aggregate([ { $match : { month : "06" } } ,
{$group:{_id: null, max: { $max: "$lightvalue" }, min: { $min: "$lightvalue" }}}],	  
function(err, results) {
assert1_2.equal(err, null);
if(results == "" ){
var intrevalight6_2 = 1;
io.emit('light6_2',{
   valor: +intrevalight6_2
  });
}else{
io.emit('light6_2_1',{
   valor: +results[0].max
  });
io.emit('light6_2_2',{
   valor: +results[0].min
  });
}
}                       
)
col.aggregate([ { $match : { month : "07" } } ,
{$group:{_id: null, max: { $max: "$lightvalue" }, min: { $min: "$lightvalue" }}}],	  
function(err, results) {
assert1_2.equal(err, null);
if(results == "" ){
var intrevalight7_2 = 1;
io.emit('light7_2',{
   valor: +intrevalight7_2
  });
}else{
io.emit('light7_2_1',{
   valor: +results[0].max
  });
io.emit('light7_2_2',{
   valor: +results[0].min
  });
}
}                       
)
col.aggregate([ { $match : { month : "08" } } ,
{$group:{_id: null, max: { $max: "$lightvalue" }, min: { $min: "$lightvalue" }}}],	  
function(err, results) {
assert1_2.equal(err, null);
if(results == "" ){
var intrevalight8_2 = 1;
io.emit('light8_2',{
   valor: +intrevalight8_2
  });
}else{
io.emit('light8_2_1',{
   valor: +results[0].max
  });
io.emit('light8_2_2',{
   valor: +results[0].min
  });
}
}                       
) 
col.aggregate([ { $match : { month : "09" } } ,
{$group:{_id: null, max: { $max: "$lightvalue" }, min: { $min: "$lightvalue" }}}],	  
function(err, results) {
assert1_2.equal(err, null);
if(results == "" ){
var intrevalight9_2 = 1;
io.emit('light9_2',{
   valor: +intrevalight9_2
  });
}else{
io.emit('light9_2_1',{
   valor: +results[0].max
  });
io.emit('light9_2_2',{
   valor: +results[0].min
  });
}
}                       
) 
col.aggregate([ { $match : { month : "10" } } ,
{$group:{_id: null, max: { $max: "$lightvalue" }, min: { $min: "$lightvalue" }}}],	  
function(err, results) {
assert1_2.equal(err, null);
if(results == "" ){
var intrevalight10_2 = 1;
io.emit('light10_2',{
   valor: +intrevalight10_2
  });
}else{
io.emit('light10_2_1',{
   valor: +results[0].max
  });
io.emit('light10_2_2',{
   valor: +results[0].min
  });
}
}                       
) 
col.aggregate([ { $match : { month : "11" } } ,
{$group:{_id: null, max: { $max: "$lightvalue" }, min: { $min: "$lightvalue" }}}],	  
function(err, results) {
assert1_2.equal(err, null);
if(results == "" ){
var intrevalight11_2 = 1;
io.emit('light11_2',{
   valor: +intrevalight11_2
  });
}else{
io.emit('light11_2_1',{
   valor: +results[0].max
  });
io.emit('light11_2_2',{
   valor: +results[0].min
  });
}
}                       
)
col.aggregate([ { $match : { month : "12" } } ,
{$group:{_id: null, max: { $max: "$lightvalue" }, min: { $min: "$lightvalue" }}}],	  
function(err, results) {
assert1_2.equal(err, null);
if(results == "" ){
var intrevalight12_2 = 1;
io.emit('light12_2',{
   valor: +intrevalight12_2
  });
}else{
io.emit('light12_2_1',{
   valor: +results[0].max
  });
io.emit('light12_2_2',{
   valor: +results[0].min
  });
}
}                       
)      
                                    db.close();
                                        });
                        
                        }

                        function sendtempmonth(){
                          var MongoClient2_2 = require('mongodb').MongoClient;
                          assert2_2 = require('assert');
                          var url2_2 = "mongodb://localhost:27017/watherdata";
                          MongoClient2_2.connect(url2_2, function(err, db) {
                                        if (err) throw err;   
                                       var col =  db.collection("tempdata");  
                        
                                       col.aggregate([ { $match : { month : "01" } } ,
                                             {$group:{_id: null, max: { $max: "$tempvalue" }, min: { $min: "$tempvalue" }}}],	  
                                       function(err, results) {
                                         assert2_2.equal(err, null);
                                         if(results == "" ){
                                             var intrevatemp1_2 = 1;
                                            io.emit('temp1_2',{
                                                valor: +intrevatemp1_2
                                               });
                                         }else{
                                            io.emit('temp1_2_1',{
                                                valor: +results[0].max
                                               });
                                            io.emit('temp1_2_2',{
                                                valor: +results[0].min
                                               });
                                         }
                                       }                       
                                    )
                                    col.aggregate([ { $match : { month : "02" } } ,
                                    {$group:{_id: null, max: { $max: "$tempvalue" }, min: { $min: "$tempvalue" }}}],	  
                              function(err, results) {
                                assert2_2.equal(err, null);
                                if(results == "" ){
                                    var intrevatemp2_2 = 1;
                                   io.emit('temp2_2',{
                                       valor: +intrevatemp2_2
                                      });
                                }else{
                                   io.emit('temp2_2_1',{
                                       valor: +results[0].max
                                      });
                                   io.emit('temp2_2_2',{
                                       valor: +results[0].min
                                      });
                                }
                              }                       
                           )           
                           col.aggregate([ { $match : { month : "03" } } ,
                           {$group:{_id: null, max: { $max: "$tempvalue" }, min: { $min: "$tempvalue" }}}],	  
                     function(err, results) {
                       assert2_2.equal(err, null);
                       if(results == "" ){
                           var intrevatemp3_2 = 1;
                          io.emit('temp3_2',{
                              valor: +intrevatemp3_2
                             });
                       }else{
                          io.emit('temp3_2_1',{
                              valor: +results[0].max
                             });
                          io.emit('temp3_2_2',{
                              valor: +results[0].min
                             });
                       }
                     }                       
                  )  
                  col.aggregate([ { $match : { month : "04" } } ,
                  {$group:{_id: null, max: { $max: "$tempvalue" }, min: { $min: "$tempvalue" }}}],	  
            function(err, results) {
              assert2_2.equal(err, null);
              if(results == "" ){
                  var intrevatemp4_2 = 1;
                 io.emit('temp4_2',{
                     valor: +intrevatemp4_2
                    });
              }else{
                 io.emit('temp4_2_1',{
                     valor: +results[0].max
                    });
                 io.emit('temp4_2_2',{
                     valor: +results[0].min
                    });
              }
            }                       
         )
         col.aggregate([ { $match : { month : "05" } } ,
         {$group:{_id: null, max: { $max: "$tempvalue" }, min: { $min: "$tempvalue" }}}],	  
   function(err, results) {
     assert2_2.equal(err, null);
     if(results == "" ){
         var intrevatemp5_2 = 1;
        io.emit('temp5_2',{
            valor: +intrevatemp5_2
           });
     }else{
        io.emit('temp5_2_1',{
            valor: +results[0].max
           });
        io.emit('temp5_2_2',{
            valor: +results[0].min
           });
     }
   }                       
)     
col.aggregate([ { $match : { month : "06" } } ,
{$group:{_id: null, max: { $max: "$tempvalue" }, min: { $min: "$tempvalue" }}}],	  
function(err, results) {
assert2_2.equal(err, null);
if(results == "" ){
var intrevatemp6_2 = 1;
io.emit('temp6_2',{
   valor: +intrevatemp6_2
  });
}else{
io.emit('temp6_2_1',{
   valor: +results[0].max
  });
io.emit('temp6_2_2',{
   valor: +results[0].min
  });
}
}                       
)
col.aggregate([ { $match : { month : "07" } } ,
{$group:{_id: null, max: { $max: "$tempvalue" }, min: { $min: "$tempvalue" }}}],	  
function(err, results) {
assert2_2.equal(err, null);
if(results == "" ){
var intrevatemp7_2 = 1;
io.emit('temp7_2',{
   valor: +intrevatemp7_2
  });
}else{
io.emit('temp7_2_1',{
   valor: +results[0].max
  });
io.emit('temp7_2_2',{
   valor: +results[0].min
  });
}
}                       
)
col.aggregate([ { $match : { month : "08" } } ,
{$group:{_id: null, max: { $max: "$tempvalue" }, min: { $min: "$tempvalue" }}}],	  
function(err, results) {
assert2_2.equal(err, null);
if(results == "" ){
var intrevatemp8_2 = 1;
io.emit('temp8_2',{
   valor: +intrevatemp8_2
  });
}else{
io.emit('temp8_2_1',{
   valor: +results[0].max
  });
io.emit('temp8_2_2',{
   valor: +results[0].min
  });
}
}                       
)
col.aggregate([ { $match : { month : "09" } } ,
{$group:{_id: null, max: { $max: "$tempvalue" }, min: { $min: "$tempvalue" }}}],	  
function(err, results) {
assert2_2.equal(err, null);
if(results == "" ){
var intrevatemp9_2 = 1;
io.emit('temp9_2',{
   valor: +intrevatemp9_2
  });
}else{
io.emit('temp9_2_1',{
   valor: +results[0].max
  });
io.emit('temp9_2_2',{
   valor: +results[0].min
  });
}
}                       
)
col.aggregate([ { $match : { month : "10" } } ,
{$group:{_id: null, max: { $max: "$tempvalue" }, min: { $min: "$tempvalue" }}}],	  
function(err, results) {
assert2_2.equal(err, null);
if(results == "" ){
var intrevatemp10_2 = 1;
io.emit('temp10_2',{
   valor: +intrevatemp10_2
  });
}else{
io.emit('temp10_2_1',{
   valor: +results[0].max
  });
io.emit('temp10_2_2',{
   valor: +results[0].min
  });
}
}                       
)
col.aggregate([ { $match : { month : "11" } } ,
{$group:{_id: null, max: { $max: "$tempvalue" }, min: { $min: "$tempvalue" }}}],	  
function(err, results) {
assert2_2.equal(err, null);
if(results == "" ){
var intrevatemp11_2 = 1;
io.emit('temp11_2',{
   valor: +intrevatemp11_2
  });
}else{
io.emit('temp11_2_1',{
   valor: +results[0].max
  });
io.emit('temp11_2_2',{
   valor: +results[0].min
  });
}
}                       
)
col.aggregate([ { $match : { month : "12" } } ,
{$group:{_id: null, max: { $max: "$tempvalue" }, min: { $min: "$tempvalue" }}}],	  
function(err, results) {
assert2_2.equal(err, null);
if(results == "" ){
var intrevatemp12_2 = 1;
io.emit('temp12_2',{
   valor: +intrevatemp12_2
  });
}else{
io.emit('temp12_2_1',{
   valor: +results[0].max
  });
io.emit('temp12_2_2',{
   valor: +results[0].min
  });
}
}                       
)      
                                    db.close();
                                        });
                        
                        }
                        function sendhumidmonth(){
                          var MongoClient3_2 = require('mongodb').MongoClient;
                          assert3_2 = require('assert');
                          var url3_2 = "mongodb://localhost:27017/watherdata";
                          MongoClient3_2.connect(url3_2, function(err, db) {
                                        if (err) throw err;   
                                       var col =  db.collection("humiddata");  
                        
                                       col.aggregate([ { $match : { month : "01" } } ,
                                             {$group:{_id: null, max: { $max: "$humidvalue" }, min: { $min: "$humidvalue" }}}],	  
                                       function(err, results) {
                                         assert3_2.equal(err, null);
                                         if(results == "" ){
                                             var intrevahumid1_2 = 1;
                                            io.emit('humid1_2',{
                                                valor: +intrevahumid1_2
                                               });
                                         }else{
                                            io.emit('humid1_2_1',{
                                                valor: +results[0].max
                                               });
                                            io.emit('humid1_2_2',{
                                                valor: +results[0].min
                                               });
                                         }
                                       }                       
                                    )
                                    col.aggregate([ { $match : { month : "02" } } ,
                                    {$group:{_id: null, max: { $max: "$humidvalue" }, min: { $min: "$humidvalue" }}}],	  
                              function(err, results) {
                                assert3_2.equal(err, null);
                                if(results == "" ){
                                    var intrevahumid2_2 = 1;
                                   io.emit('humid2_2',{
                                       valor: +intrevahumid2_2
                                      });
                                }else{
                                   io.emit('humid2_2_1',{
                                       valor: +results[0].max
                                      });
                                   io.emit('humid2_2_2',{
                                       valor: +results[0].min
                                      });
                                }
                              }                       
                           )
                           col.aggregate([ { $match : { month : "03" } } ,
                           {$group:{_id: null, max: { $max: "$humidvalue" }, min: { $min: "$humidvalue" }}}],	  
                     function(err, results) {
                       assert3_2.equal(err, null);
                       if(results == "" ){
                           var intrevahumid3_2 = 1;
                          io.emit('humid3_2',{
                              valor: +intrevahumid3_2
                             });
                       }else{
                          io.emit('humid3_2_1',{
                              valor: +results[0].max
                             });
                          io.emit('humid3_2_2',{
                              valor: +results[0].min
                             });
                       }
                     }                       
                  )
                  col.aggregate([ { $match : { month : "04" } } ,
                  {$group:{_id: null, max: { $max: "$humidvalue" }, min: { $min: "$humidvalue" }}}],	  
            function(err, results) {
              assert3_2.equal(err, null);
              if(results == "" ){
                  var intrevahumid4_2 = 1;
                 io.emit('humid4_2',{
                     valor: +intrevahumid4_2
                    });
              }else{
                 io.emit('humid4_2_1',{
                     valor: +results[0].max
                    });
                 io.emit('humid4_2_2',{
                     valor: +results[0].min
                    });
              }
            }                       
         )
         col.aggregate([ { $match : { month : "05" } } ,
         {$group:{_id: null, max: { $max: "$humidvalue" }, min: { $min: "$humidvalue" }}}],	  
   function(err, results) {
     assert3_2.equal(err, null);
     if(results == "" ){
         var intrevahumid5_2 = 1;
        io.emit('humid5_2',{
            valor: +intrevahumid5_2
           });
     }else{
        io.emit('humid5_2_1',{
            valor: +results[0].max
           });
        io.emit('humid5_2_2',{
            valor: +results[0].min
           });
     }
   }                       
)
col.aggregate([ { $match : { month : "06" } } ,
{$group:{_id: null, max: { $max: "$humidvalue" }, min: { $min: "$humidvalue" }}}],	  
function(err, results) {
assert3_2.equal(err, null);
if(results == "" ){
var intrevahumid6_2 = 1;
io.emit('humid6_2',{
   valor: +intrevahumid6_2
  });
}else{
io.emit('humid6_2_1',{
   valor: +results[0].max
  });
io.emit('humid6_2_2',{
   valor: +results[0].min
  });
}
}                       
)
col.aggregate([ { $match : { month : "07" } } ,
{$group:{_id: null, max: { $max: "$humidvalue" }, min: { $min: "$humidvalue" }}}],	  
function(err, results) {
assert3_2.equal(err, null);
if(results == "" ){
var intrevahumid7_2 = 1;
io.emit('humid7_2',{
   valor: +intrevahumid7_2
  });
}else{
io.emit('humid7_2_1',{
   valor: +results[0].max
  });
io.emit('humid7_2_2',{
   valor: +results[0].min
  });
}
}                       
)
col.aggregate([ { $match : { month : "08" } } ,
{$group:{_id: null, max: { $max: "$humidvalue" }, min: { $min: "$humidvalue" }}}],	  
function(err, results) {
assert3_2.equal(err, null);
if(results == "" ){
var intrevahumid8_2 = 1;
io.emit('humid8_2',{
   valor: +intrevahumid8_2
  });
}else{
io.emit('humid8_2_1',{
   valor: +results[0].max
  });
io.emit('humid8_2_2',{
   valor: +results[0].min
  });
}
}                       
)
col.aggregate([ { $match : { month : "09" } } ,
{$group:{_id: null, max: { $max: "$humidvalue" }, min: { $min: "$humidvalue" }}}],	  
function(err, results) {
assert3_2.equal(err, null);
if(results == "" ){
var intrevahumid9_2 = 1;
io.emit('humid9_2',{
   valor: +intrevahumid9_2
  });
}else{
io.emit('humid9_2_1',{
   valor: +results[0].max
  });
io.emit('humid9_2_2',{
   valor: +results[0].min
  });
}
}                       
)
col.aggregate([ { $match : { month : "10" } } ,
{$group:{_id: null, max: { $max: "$humidvalue" }, min: { $min: "$humidvalue" }}}],	  
function(err, results) {
assert3_2.equal(err, null);
if(results == "" ){
var intrevahumid10_2 = 1;
io.emit('humid10_2',{
   valor: +intrevahumid10_2
  });
}else{
io.emit('humid10_2_1',{
   valor: +results[0].max
  });
io.emit('humid10_2_2',{
   valor: +results[0].min
  });
}
}                       
)
col.aggregate([ { $match : { month : "11" } } ,
{$group:{_id: null, max: { $max: "$humidvalue" }, min: { $min: "$humidvalue" }}}],	  
function(err, results) {
assert3_2.equal(err, null);
if(results == "" ){
var intrevahumid11_2 = 1;
io.emit('humid11_2',{
   valor: +intrevahumid11_2
  });
}else{
io.emit('humid11_2_1',{
   valor: +results[0].max
  });
io.emit('humid11_2_2',{
   valor: +results[0].min
  });
}
}                       
)
col.aggregate([ { $match : { month : "12" } } ,
{$group:{_id: null, max: { $max: "$humidvalue" }, min: { $min: "$humidvalue" }}}],	  
function(err, results) {
assert3_2.equal(err, null);
if(results == "" ){
var intrevahumid12_2 = 1;
io.emit('humid12_2',{
   valor: +intrevahumid12_2
  });
}else{
io.emit('humid12_2_1',{
   valor: +results[0].max
  });
io.emit('humid12_2_2',{
   valor: +results[0].min
  });
}
}                       
)
                             
                                    db.close();
                                        });
                        
                        }
                        function sendsoilmonth(){
                          var MongoClient4_2 = require('mongodb').MongoClient;
                          assert4_2 = require('assert');
                          var url4_2 = "mongodb://localhost:27017/watherdata";
                          MongoClient4_2.connect(url4_2, function(err, db) {
                                        if (err) throw err;   
                                       var col =  db.collection("soildata");  
                        
                                       col.aggregate([ { $match : { month : "01" } } ,
                                             {$group:{_id: null, max: { $max: "$soilvalue" }, min: { $min: "$soilvalue" }}}],	  
                                       function(err, results) {
                                         assert4_2.equal(err, null);
                                         if(results == "" ){
                                             var intrevasoil1_2 = 1;
                                            io.emit('soil1_2',{
                                                valor: +intrevasoil1_2
                                               });
                                         }else{
                                            io.emit('soil1_2_1',{
                                                valor: +results[0].max
                                               });
                                            io.emit('soil1_2_2',{
                                                valor: +results[0].min
                                               });
                                         }
                                       }                       
                                    )

                                    col.aggregate([ { $match : { month : "02" } } ,
                                    {$group:{_id: null, max: { $max: "$soilvalue" }, min: { $min: "$soilvalue" }}}],	  
                              function(err, results) {
                                assert4_2.equal(err, null);
                                if(results == "" ){
                                    var intrevasoil2_2 = 1;
                                   io.emit('soil2_2',{
                                       valor: +intrevasoil2_2
                                      });
                                }else{
                                   io.emit('soil2_2_1',{
                                       valor: +results[0].max
                                      });
                                   io.emit('soil2_2_2',{
                                       valor: +results[0].min
                                      });
                                }
                              }                       
                           )
                           col.aggregate([ { $match : { month : "03" } } ,
                           {$group:{_id: null, max: { $max: "$soilvalue" }, min: { $min: "$soilvalue" }}}],	  
                     function(err, results) {
                       assert4_2.equal(err, null);
                       if(results == "" ){
                           var intrevasoil3_2 = 1;
                          io.emit('soil3_2',{
                              valor: +intrevasoil3_2
                             });
                       }else{
                          io.emit('soil3_2_1',{
                              valor: +results[0].max
                             });
                          io.emit('soil3_2_2',{
                              valor: +results[0].min
                             });
                       }
                     }                       
                  )
                  col.aggregate([ { $match : { month : "04" } } ,
                  {$group:{_id: null, max: { $max: "$soilvalue" }, min: { $min: "$soilvalue" }}}],	  
            function(err, results) {
              assert4_2.equal(err, null);
              if(results == "" ){
                  var intrevasoil4_2 = 1;
                 io.emit('soil4_2',{
                     valor: +intrevasoil4_2
                    });
              }else{
                 io.emit('soil4_2_1',{
                     valor: +results[0].max
                    });
                 io.emit('soil4_2_2',{
                     valor: +results[0].min
                    });
              }
            }                       
         )
         col.aggregate([ { $match : { month : "05" } } ,
         {$group:{_id: null, max: { $max: "$soilvalue" }, min: { $min: "$soilvalue" }}}],	  
   function(err, results) {
     assert4_2.equal(err, null);
     if(results == "" ){
         var intrevasoil5_2 = 1;
        io.emit('soil5_2',{
            valor: +intrevasoil5_2
           });
     }else{
        io.emit('soil5_2_1',{
            valor: +results[0].max
           });
        io.emit('soil5_2_2',{
            valor: +results[0].min
           });
     }
   }                       
)
col.aggregate([ { $match : { month : "06" } } ,
{$group:{_id: null, max: { $max: "$soilvalue" }, min: { $min: "$soilvalue" }}}],	  
function(err, results) {
assert4_2.equal(err, null);
if(results == "" ){
var intrevasoil6_2 = 1;
io.emit('soil6_2',{
   valor: +intrevasoil6_2
  });
}else{
io.emit('soil6_2_1',{
   valor: +results[0].max
  });
io.emit('soil6_2_2',{
   valor: +results[0].min
  });
}
}                       
)
col.aggregate([ { $match : { month : "07" } } ,
{$group:{_id: null, max: { $max: "$soilvalue" }, min: { $min: "$soilvalue" }}}],	  
function(err, results) {
assert4_2.equal(err, null);
if(results == "" ){
var intrevasoil7_2 = 1;
io.emit('soil7_2',{
   valor: +intrevasoil7_2
  });
}else{
io.emit('soil7_2_1',{
   valor: +results[0].max
  });
io.emit('soil7_2_2',{
   valor: +results[0].min
  });
}
}                       
)
col.aggregate([ { $match : { month : "08" } } ,
{$group:{_id: null, max: { $max: "$soilvalue" }, min: { $min: "$soilvalue" }}}],	  
function(err, results) {
assert4_2.equal(err, null);
if(results == "" ){
var intrevasoil8_2 = 1;
io.emit('soil8_2',{
   valor: +intrevasoil8_2
  });
}else{
io.emit('soil8_2_1',{
   valor: +results[0].max
  });
io.emit('soil8_2_2',{
   valor: +results[0].min
  });
}
}                       
)
col.aggregate([ { $match : { month : "09" } } ,
{$group:{_id: null, max: { $max: "$soilvalue" }, min: { $min: "$soilvalue" }}}],	  
function(err, results) {
assert4_2.equal(err, null);
if(results == "" ){
var intrevasoil9_2 = 1;
io.emit('soil9_2',{
   valor: +intrevasoil9_2
  });
}else{
io.emit('soil9_2_1',{
   valor: +results[0].max
  });
io.emit('soil9_2_2',{
   valor: +results[0].min
  });
}
}                       
)
col.aggregate([ { $match : { month : "10" } } ,
{$group:{_id: null, max: { $max: "$soilvalue" }, min: { $min: "$soilvalue" }}}],	  
function(err, results) {
assert4_2.equal(err, null);
if(results == "" ){
var intrevasoil10_2 = 1;
io.emit('soil10_2',{
   valor: +intrevasoil10_2
  });
}else{
io.emit('soil10_2_1',{
   valor: +results[0].max
  });
io.emit('soil10_2_2',{
   valor: +results[0].min
  });
}
}                       
)
col.aggregate([ { $match : { month : "11" } } ,
{$group:{_id: null, max: { $max: "$soilvalue" }, min: { $min: "$soilvalue" }}}],	  
function(err, results) {
assert4_2.equal(err, null);
if(results == "" ){
var intrevasoil11_2 = 1;
io.emit('soil11_2',{
   valor: +intrevasoil11_2
  });
}else{
io.emit('soil11_2_1',{
   valor: +results[0].max
  });
io.emit('soil11_2_2',{
   valor: +results[0].min
  });
}
}                       
)
col.aggregate([ { $match : { month : "12" } } ,
{$group:{_id: null, max: { $max: "$soilvalue" }, min: { $min: "$soilvalue" }}}],	  
function(err, results) {
assert4_2.equal(err, null);
if(results == "" ){
var intrevasoil12_2 = 1;
io.emit('soil12_2',{
   valor: +intrevasoil12_2
  });
}else{
io.emit('soil12_2_1',{
   valor: +results[0].max
  });
io.emit('soil12_2_2',{
   valor: +results[0].min
  });
}
}                       
)
                                  
                                    db.close();
                                        });
                        
                        }


                        function sendrainmonth(){
                          var MongoClient5_2 = require('mongodb').MongoClient;
                          assert5_2 = require('assert');
                          var url5_2 = "mongodb://localhost:27017/watherdata";
                          MongoClient5_2.connect(url5_2, function(err, db) {
                                        if (err) throw err;   
                                       var col =  db.collection("raindata");  
                                       col.aggregate([ { $match : { month : "01" } } ,
                                       {$group:{_id: null, sum: { $sum: "$rainvalue" }}}],	  
                                 function(err, results) {
                                   assert5_2.equal(err, null);     
                                   if(results == "" ){
                                       var intrevarain1_2 = 1;
                                       io.emit('rain1_2',{
                                        valor: +intrevarain1_2
                                       });
                                   }else{
                                    io.emit('rain1_2_1',{
                                      valor: +results[0].sum
                                     });
                                   }
                                 }                     
                              )
                              
                              col.aggregate([ { $match : { month : "02" } } ,
                              {$group:{_id: null, sum: { $sum: "$rainvalue" }}}],	  
                        function(err, results) {
                          assert5_2.equal(err, null);     
                          if(results == "" ){
                              var intrevarain2_2 = 1;
                              io.emit('rain2_2',{
                               valor: +intrevarain2_2
                              });
                          }else{
                           io.emit('rain2_2_1',{
                             valor: +results[0].sum
                            });
                          }
                        }                     
                     )
                     col.aggregate([ { $match : { month : "03" } } ,
                     {$group:{_id: null, sum: { $sum: "$rainvalue" }}}],	  
               function(err, results) {
                 assert5_2.equal(err, null);     
                 if(results == "" ){
                     var intrevarain3_2 = 1;
                     io.emit('rain3_2',{
                      valor: +intrevarain3_2
                     });
                 }else{
                  io.emit('rain3_2_1',{
                    valor: +results[0].sum
                   });
                 }
               }                     
            )   

            col.aggregate([ { $match : { month : "04" } } ,
            {$group:{_id: null, sum: { $sum: "$rainvalue" }}}],	  
      function(err, results) {
        assert5_2.equal(err, null);     
        if(results == "" ){
            var intrevarain4_2 = 1;
            io.emit('rain4_2',{
             valor: +intrevarain4_2
            });
        }else{
         io.emit('rain4_2_1',{
           valor: +results[0].sum
          });
        }
      }                     
   )   
   
   col.aggregate([ { $match : { month : "05" } } ,
   {$group:{_id: null, sum: { $sum: "$rainvalue" }}}],	  
function(err, results) {
assert5_2.equal(err, null);     
if(results == "" ){
   var intrevarain5_2 = 1;
   io.emit('rain5_2',{
    valor: +intrevarain5_2
   });
}else{
io.emit('rain5_2_1',{
  valor: +results[0].sum
 });
}
}                     
)
col.aggregate([ { $match : { month : "06" } } ,
{$group:{_id: null, sum: { $sum: "$rainvalue" }}}],	  
function(err, results) {
assert5_2.equal(err, null);     
if(results == "" ){
var intrevarain6_2 = 1;
io.emit('rain6_2',{
 valor: +intrevarain6_2
});
}else{
io.emit('rain6_2_1',{
valor: +results[0].sum
});
}
}                     
)
col.aggregate([ { $match : { month : "07" } } ,
{$group:{_id: null, sum: { $sum: "$rainvalue" }}}],	  
function(err, results) {
assert5_2.equal(err, null);     
if(results == "" ){
var intrevarain7_2 = 1;
io.emit('rain7_2',{
 valor: +intrevarain7_2
});
}else{
io.emit('rain7_2_1',{
valor: +results[0].sum
});
}
}                     
)
col.aggregate([ { $match : { month : "08" } } ,
{$group:{_id: null, sum: { $sum: "$rainvalue" }}}],	  
function(err, results) {
assert5_2.equal(err, null);     
if(results == "" ){
var intrevarain8_2 = 1;
io.emit('rain8_2',{
 valor: +intrevarain8_2
});
}else{
io.emit('rain8_2_1',{
valor: +results[0].sum
});
}
}                     
)
col.aggregate([ { $match : { month : "09" } } ,
{$group:{_id: null, sum: { $sum: "$rainvalue" }}}],	  
function(err, results) {
assert5_2.equal(err, null);     
if(results == "" ){
var intrevarain9_2 = 1;
io.emit('rain9_2',{
 valor: +intrevarain9_2
});
}else{
io.emit('rain9_2_1',{
valor: +results[0].sum
});
}
}                     
)
col.aggregate([ { $match : { month : "10" } } ,
{$group:{_id: null, sum: { $sum: "$rainvalue" }}}],	  
function(err, results) {
assert5_2.equal(err, null);     
if(results == "" ){
var intrevarain10_2 = 1;
io.emit('rain10_2',{
 valor: +intrevarain10_2
});
}else{
io.emit('rain10_2_1',{
valor: +results[0].sum
});
}
}                     
)
col.aggregate([ { $match : { month : "11" } } ,
{$group:{_id: null, sum: { $sum: "$rainvalue" }}}],	  
function(err, results) {
assert5_2.equal(err, null);     
if(results == "" ){
var intrevarain11_2 = 1;
io.emit('rain11_2',{
 valor: +intrevarain11_2
});
}else{
io.emit('rain11_2_1',{
valor: +results[0].sum
});
}
}                     
)
col.aggregate([ { $match : { month : "12" } } ,
{$group:{_id: null, sum: { $sum: "$rainvalue" }}}],	  
function(err, results) {
assert5_2.equal(err, null);     
if(results == "" ){
var intrevarain12_2 = 1;
io.emit('rain12_2',{
 valor: +intrevarain12_2
});
}else{
io.emit('rain12_2_1',{
valor: +results[0].sum
});
}
}                     
)  
                                    db.close();
                                        });
                        
                        }


                        function senddustmonth(){
                          var MongoClient6_2 = require('mongodb').MongoClient;
                          assert6_2 = require('assert');
                          var url6_2 = "mongodb://localhost:27017/watherdata";
                          MongoClient6_2.connect(url6_2, function(err, db) {
                                        if (err) throw err;   
                                       var col =  db.collection("dustdata");  
                        
                                       col.aggregate([ { $match : { month : "01" } } ,
                                             {$group:{_id: null, max: { $max: "$dustvalue" }, min: { $min: "$dustvalue" }}}],	  
                                       function(err, results) {
                                         assert6_2.equal(err, null);
                                         if(results == "" ){
                                             var intrevadust1_2 = 1;
                                            io.emit('dust1_2',{
                                                valor: +intrevadust1_2
                                               });
                                         }else{
                                            io.emit('dust1_2_1',{
                                                valor: +results[0].max
                                               });
                                            io.emit('dust1_2_2',{
                                                valor: +results[0].min
                                               });
                                         }
                                       }                       
                                    )
                                    col.aggregate([ { $match : { month : "02" } } ,
                                    {$group:{_id: null, max: { $max: "$dustvalue" }, min: { $min: "$dustvalue" }}}],	  
                              function(err, results) {
                                assert6_2.equal(err, null);
                                if(results == "" ){
                                    var intrevadust2_2 = 1;
                                   io.emit('dust2_2',{
                                       valor: +intrevadust2_2
                                      });
                                }else{
                                   io.emit('dust2_2_1',{
                                       valor: +results[0].max
                                      });
                                   io.emit('dust2_2_2',{
                                       valor: +results[0].min
                                      });
                                }
                              }                       
                           )                 
                                       col.aggregate([ { $match : { month : "03" } } ,
                                             {$group:{_id: null, max: { $max: "$dustvalue" }, min: { $min: "$dustvalue" }}}],	  
                                       function(err, results) {
                                         assert6_2.equal(err, null);
                                         if(results == "" ){
                                             var intrevadust3_2 = 1;
                                            io.emit('dust3_2',{
                                                valor: +intrevadust3_2
                                               });
                                         }else{
                                            io.emit('dust3_2_1',{
                                                valor: +results[0].max
                                               });
                                            io.emit('dust3_2_2',{
                                                valor: +results[0].min
                                               });
                                         }
                                       }                       
                                    )    
                                    col.aggregate([ { $match : { month : "04" } } ,
                                    {$group:{_id: null, max: { $max: "$dustvalue" }, min: { $min: "$dustvalue" }}}],	  
                              function(err, results) {
                                assert6_2.equal(err, null);
                                if(results == "" ){
                                    var intrevadust4_2 = 1;
                                   io.emit('dust4_2',{
                                       valor: +intrevadust4_2
                                      });
                                }else{
                                   io.emit('dust4_2_1',{
                                       valor: +results[0].max
                                      });
                                   io.emit('dust4_2_2',{
                                       valor: +results[0].min
                                      });
                                }
                              }                       
                           )
                                       col.aggregate([ { $match : { month : "05" } } ,
                                             {$group:{_id: null, max: { $max: "$dustvalue" }, min: { $min: "$dustvalue" }}}],	  
                                       function(err, results) {
                                         assert6_2.equal(err, null);
                                         if(results == "" ){
                                             var intrevadust5_2 = 1;
                                            io.emit('dust5_2',{
                                                valor: +intrevadust5_2
                                               });
                                         }else{
                                            io.emit('dust5_2_1',{
                                                valor: +results[0].max
                                               });
                                            io.emit('dust5_2_2',{
                                                valor: +results[0].min
                                               });
                                         }
                                       }                       
                                    )            
                                    col.aggregate([ { $match : { month : "06" } } ,
                                    {$group:{_id: null, max: { $max: "$dustvalue" }, min: { $min: "$dustvalue" }}}],	  
                              function(err, results) {
                                assert6_2.equal(err, null);
                                if(results == "" ){
                                    var intrevadust6_2 = 1;
                                   io.emit('dust6_2',{
                                       valor: +intrevadust6_2
                                      });
                                }else{
                                   io.emit('dust6_2_1',{
                                       valor: +results[0].max
                                      });
                                   io.emit('dust6_2_2',{
                                       valor: +results[0].min
                                      });
                                }
                              }                       
                           )  
                           col.aggregate([ { $match : { month : "07" } } ,
                           {$group:{_id: null, max: { $max: "$dustvalue" }, min: { $min: "$dustvalue" }}}],	  
                        function(err, results) {
                        assert6_2.equal(err, null);
                        if(results == "" ){
                           var intrevadust7_2 = 1;
                          io.emit('dust7_2',{
                              valor: +intrevadust7_2
                             });
                        }else{
                          io.emit('dust7_2_1',{
                              valor: +results[0].max
                             });
                          io.emit('dust7_2_2',{
                              valor: +results[0].min
                             });
                        }
                        }                       
                        )  
                        col.aggregate([ { $match : { month : "08" } } ,
                        {$group:{_id: null, max: { $max: "$dustvalue" }, min: { $min: "$dustvalue" }}}],	  
                        function(err, results) {
                        assert6_2.equal(err, null);
                        if(results == "" ){
                        var intrevadust8_2 = 1;
                        io.emit('dust8_2',{
                           valor: +intrevadust8_2
                          });
                        }else{
                        io.emit('dust8_2_1',{
                           valor: +results[0].max
                          });
                        io.emit('dust8_2_2',{
                           valor: +results[0].min
                          });
                        }
                        }                       
                        )  
                        col.aggregate([ { $match : { month : "09" } } ,
                        {$group:{_id: null, max: { $max: "$dustvalue" }, min: { $min: "$dustvalue" }}}],	  
                        function(err, results) {
                        assert6_2.equal(err, null);
                        if(results == "" ){
                        var intrevadust9_2 = 1;
                        io.emit('dust9_2',{
                           valor: +intrevadust9_2
                          });
                        }else{
                        io.emit('dust9_2_1',{
                           valor: +results[0].max
                          });
                        io.emit('dust9_2_2',{
                           valor: +results[0].min
                          });
                        }
                        }                       
                        )  
                        col.aggregate([ { $match : { month : "10" } } ,
                        {$group:{_id: null, max: { $max: "$dustvalue" }, min: { $min: "$dustvalue" }}}],	  
                        function(err, results) {
                        assert6_2.equal(err, null);
                        if(results == "" ){
                        var intrevadust10_2 = 1;
                        io.emit('dust10_2',{
                           valor: +intrevadust10_2
                          });
                        }else{
                        io.emit('dust10_2_1',{
                           valor: +results[0].max
                          });
                        io.emit('dust10_2_2',{
                           valor: +results[0].min
                          });
                        }
                        }                       
                        )  
                        col.aggregate([ { $match : { month : "11" } } ,
                        {$group:{_id: null, max: { $max: "$dustvalue" }, min: { $min: "$dustvalue" }}}],	  
                        function(err, results) {
                        assert6_2.equal(err, null);
                        if(results == "" ){
                        var intrevadust11_2 = 1;
                        io.emit('dust11_2',{
                           valor: +intrevadust11_2
                          });
                        }else{
                        io.emit('dust11_2_1',{
                           valor: +results[0].max
                          });
                        io.emit('dust11_2_2',{
                           valor: +results[0].min
                          });
                        }
                        }                       
                        )  
                        col.aggregate([ { $match : { month : "12" } } ,
                        {$group:{_id: null, max: { $max: "$dustvalue" }, min: { $min: "$dustvalue" }}}],	  
                        function(err, results) {
                        assert6_2.equal(err, null);
                        if(results == "" ){
                        var intrevadust12_2 = 1;
                        io.emit('dust12_2',{
                           valor: +intrevadust12_2
                          });
                        }else{
                        io.emit('dust12_2_1',{
                           valor: +results[0].max
                          });
                        io.emit('dust12_2_2',{
                           valor: +results[0].min
                          });
                        }
                        }                       
                        )        
                                    db.close();
                                        });
                        
                        }


                    function senddustmonth(){
                          var MongoClient6_2 = require('mongodb').MongoClient;
                          assert6_2 = require('assert');
                          var url6_2 = "mongodb://localhost:27017/watherdata";
                          MongoClient6_2.connect(url6_2, function(err, db) {
                                        if (err) throw err;   
                                       var col =  db.collection("dustdata");  
                        
                                       col.aggregate([ { $match : { month : "01" } } ,
                                             {$group:{_id: null, max: { $max: "$dustvalue" }, min: { $min: "$dustvalue" }}}],	  
                                       function(err, results) {
                                         assert6_2.equal(err, null);
                                         if(results == "" ){
                                             var intrevadust1_2 = 1;
                                            io.emit('dust1_2',{
                                                valor: +intrevadust1_2
                                               });
                                         }else{
                                            io.emit('dust1_2_1',{
                                                valor: +results[0].max
                                               });
                                            io.emit('dust1_2_2',{
                                                valor: +results[0].min
                                               });
                                         }
                                       }                       
                                    )
                                    col.aggregate([ { $match : { month : "02" } } ,
                                    {$group:{_id: null, max: { $max: "$dustvalue" }, min: { $min: "$dustvalue" }}}],	  
                              function(err, results) {
                                assert6_2.equal(err, null);
                                if(results == "" ){
                                    var intrevadust2_2 = 1;
                                   io.emit('dust2_2',{
                                       valor: +intrevadust2_2
                                      });
                                }else{
                                   io.emit('dust2_2_1',{
                                       valor: +results[0].max
                                      });
                                   io.emit('dust2_2_2',{
                                       valor: +results[0].min
                                      });
                                }
                              }                       
                           )                 
                                       col.aggregate([ { $match : { month : "03" } } ,
                                             {$group:{_id: null, max: { $max: "$dustvalue" }, min: { $min: "$dustvalue" }}}],	  
                                       function(err, results) {
                                         assert6_2.equal(err, null);
                                         if(results == "" ){
                                             var intrevadust3_2 = 1;
                                            io.emit('dust3_2',{
                                                valor: +intrevadust3_2
                                               });
                                         }else{
                                            io.emit('dust3_2_1',{
                                                valor: +results[0].max
                                               });
                                            io.emit('dust3_2_2',{
                                                valor: +results[0].min
                                               });
                                         }
                                       }                       
                                    )    
                                    col.aggregate([ { $match : { month : "04" } } ,
                                    {$group:{_id: null, max: { $max: "$dustvalue" }, min: { $min: "$dustvalue" }}}],	  
                              function(err, results) {
                                assert6_2.equal(err, null);
                                if(results == "" ){
                                    var intrevadust4_2 = 1;
                                   io.emit('dust4_2',{
                                       valor: +intrevadust4_2
                                      });
                                }else{
                                   io.emit('dust4_2_1',{
                                       valor: +results[0].max
                                      });
                                   io.emit('dust4_2_2',{
                                       valor: +results[0].min
                                      });
                                }
                              }                       
                           )
                                       col.aggregate([ { $match : { month : "05" } } ,
                                             {$group:{_id: null, max: { $max: "$dustvalue" }, min: { $min: "$dustvalue" }}}],	  
                                       function(err, results) {
                                         assert6_2.equal(err, null);
                                         if(results == "" ){
                                             var intrevadust5_2 = 1;
                                            io.emit('dust5_2',{
                                                valor: +intrevadust5_2
                                               });
                                         }else{
                                            io.emit('dust5_2_1',{
                                                valor: +results[0].max
                                               });
                                            io.emit('dust5_2_2',{
                                                valor: +results[0].min
                                               });
                                         }
                                       }                       
                                    )            
                                    col.aggregate([ { $match : { month : "06" } } ,
                                    {$group:{_id: null, max: { $max: "$dustvalue" }, min: { $min: "$dustvalue" }}}],	  
                              function(err, results) {
                                assert6_2.equal(err, null);
                                if(results == "" ){
                                    var intrevadust6_2 = 1;
                                   io.emit('dust6_2',{
                                       valor: +intrevadust6_2
                                      });
                                }else{
                                   io.emit('dust6_2_1',{
                                       valor: +results[0].max
                                      });
                                   io.emit('dust6_2_2',{
                                       valor: +results[0].min
                                      });
                                }
                              }                       
                           )  
                           col.aggregate([ { $match : { month : "07" } } ,
                           {$group:{_id: null, max: { $max: "$dustvalue" }, min: { $min: "$dustvalue" }}}],	  
                        function(err, results) {
                        assert6_2.equal(err, null);
                        if(results == "" ){
                           var intrevadust7_2 = 1;
                          io.emit('dust7_2',{
                              valor: +intrevadust7_2
                             });
                        }else{
                          io.emit('dust7_2_1',{
                              valor: +results[0].max
                             });
                          io.emit('dust7_2_2',{
                              valor: +results[0].min
                             });
                        }
                        }                       
                        )  
                        col.aggregate([ { $match : { month : "08" } } ,
                        {$group:{_id: null, max: { $max: "$dustvalue" }, min: { $min: "$dustvalue" }}}],	  
                        function(err, results) {
                        assert6_2.equal(err, null);
                        if(results == "" ){
                        var intrevadust8_2 = 1;
                        io.emit('dust8_2',{
                           valor: +intrevadust8_2
                          });
                        }else{
                        io.emit('dust8_2_1',{
                           valor: +results[0].max
                          });
                        io.emit('dust8_2_2',{
                           valor: +results[0].min
                          });
                        }
                        }                       
                        )  
                        col.aggregate([ { $match : { month : "09" } } ,
                        {$group:{_id: null, max: { $max: "$dustvalue" }, min: { $min: "$dustvalue" }}}],	  
                        function(err, results) {
                        assert6_2.equal(err, null);
                        if(results == "" ){
                        var intrevadust9_2 = 1;
                        io.emit('dust9_2',{
                           valor: +intrevadust9_2
                          });
                        }else{
                        io.emit('dust9_2_1',{
                           valor: +results[0].max
                          });
                        io.emit('dust9_2_2',{
                           valor: +results[0].min
                          });
                        }
                        }                       
                        )  
                        col.aggregate([ { $match : { month : "10" } } ,
                        {$group:{_id: null, max: { $max: "$dustvalue" }, min: { $min: "$dustvalue" }}}],	  
                        function(err, results) {
                        assert6_2.equal(err, null);
                        if(results == "" ){
                        var intrevadust10_2 = 1;
                        io.emit('dust10_2',{
                           valor: +intrevadust10_2
                          });
                        }else{
                        io.emit('dust10_2_1',{
                           valor: +results[0].max
                          });
                        io.emit('dust10_2_2',{
                           valor: +results[0].min
                          });
                        }
                        }                       
                        )  
                        col.aggregate([ { $match : { month : "11" } } ,
                        {$group:{_id: null, max: { $max: "$dustvalue" }, min: { $min: "$dustvalue" }}}],	  
                        function(err, results) {
                        assert6_2.equal(err, null);
                        if(results == "" ){
                        var intrevadust11_2 = 1;
                        io.emit('dust11_2',{
                           valor: +intrevadust11_2
                          });
                        }else{
                        io.emit('dust11_2_1',{
                           valor: +results[0].max
                          });
                        io.emit('dust11_2_2',{
                           valor: +results[0].min
                          });
                        }
                        }                       
                        )  
                        col.aggregate([ { $match : { month : "12" } } ,
                        {$group:{_id: null, max: { $max: "$dustvalue" }, min: { $min: "$dustvalue" }}}],	  
                        function(err, results) {
                        assert6_2.equal(err, null);
                        if(results == "" ){
                        var intrevadust12_2 = 1;
                        io.emit('dust12_2',{
                           valor: +intrevadust12_2
                          });
                        }else{
                        io.emit('dust12_2_1',{
                           valor: +results[0].max
                          });
                        io.emit('dust12_2_2',{
                           valor: +results[0].min
                          });
                        }
                        }                       
                        )        
                                    db.close();
                                        });
                        
                        }

                        function sendlightyear(){
                          var MongoClient1_3 = require('mongodb').MongoClient;
                          assert1_3 = require('assert');
                          var url1_3 = "mongodb://localhost:27017/watherdata";
                          MongoClient1_3.connect(url1_3, function(err, db) {
                                        if (err) throw err;   
                                       var col =  db.collection("lightdata");  
                                       var date = new Date();
                                       var yearnow = (date.getFullYear()).toString();
                                       
                                       var lastyear = (date.getFullYear()-1).toString();
                                       
                                       var year2 = (date.getFullYear()-2).toString();
                                       
                                       var year3 = (date.getFullYear()-3).toString();
                        
                                       col.aggregate([ { $match : { year : yearnow } } ,
                                             {$group:{_id: null, max: { $max: "$lightvalue" }, min: { $min: "$lightvalue" }}}],	  
                                       function(err, results) {
                                         assert1_3.equal(err, null);
                                         if(results == "" ){
                                             var intrevalightyear1_2 = 1;
                                            io.emit('lightyear1_2',{
                                                valor: +intrevalightyear1_2
                                               });
                                         }else{
                                            io.emit('lightyear1_2_1',{
                                                valor: +results[0].max
                                               });
                                            io.emit('lightyear1_2_2',{
                                                valor: +results[0].min
                                               });
                                         }
                                       }                       
                                    )
                                    col.aggregate([ { $match : { year : lastyear } } ,
                                    {$group:{_id: null, max: { $max: "$lightvalue" }, min: { $min: "$lightvalue" }}}],	  
                              function(err, results) {
                                assert1_3.equal(err, null);
                                if(results == "" ){
                                    var intrevalightyear2_2 = 1;
                                   io.emit('lightyear2_2',{
                                       valor: +intrevalightyear2_2
                                      });
                                }else{
                                   io.emit('lightyear2_2_1',{
                                       valor: +results[0].max
                                      });
                                   io.emit('lightyear2_2_2',{
                                       valor: +results[0].min
                                      });
                                }
                              }                       
                           )             
                           col.aggregate([ { $match : { year : year2 } } ,
                           {$group:{_id: null, max: { $max: "$lightvalue" }, min: { $min: "$lightvalue" }}}],	  
                     function(err, results) {
                       assert1_3.equal(err, null);
                       if(results == "" ){
                           var intrevalightyear3_2 = 1;
                          io.emit('lightyear3_2',{
                              valor: +intrevalightyear3_2
                             });
                       }else{
                          io.emit('lightyear3_2_1',{
                              valor: +results[0].max
                             });
                          io.emit('lightyear3_2_2',{
                              valor: +results[0].min
                             });
                       }
                     }                       
                  )
                  col.aggregate([ { $match : { year : year3 } } ,
                  {$group:{_id: null, max: { $max: "$lightvalue" }, min: { $min: "$lightvalue" }}}],	  
            function(err, results) {
              assert1_3.equal(err, null);
              if(results == "" ){
                  var intrevalightyear4_2 = 1;
                 io.emit('lightyear4_2',{
                     valor: +intrevalightyear4_2
                    });
              }else{
                 io.emit('lightyear4_2_1',{
                     valor: +results[0].max
                    });
                 io.emit('lightyear4_2_2',{
                     valor: +results[0].min
                    });
              }
            }                       
         )
         db.close();
        });
      }

      function sendtempyear(){
        var MongoClient2_3 = require('mongodb').MongoClient;
        assert2_3 = require('assert');
        var url2_3 = "mongodb://localhost:27017/watherdata";
        MongoClient2_3.connect(url2_3, function(err, db) {
                      if (err) throw err;   
                     var col =  db.collection("tempdata");  
                     var date = new Date();
                     var yearnow = (date.getFullYear()).toString();
                     
                     var lastyear = (date.getFullYear()-1).toString();
                     
                     var year2 = (date.getFullYear()-2).toString();
                     
                     var year3 = (date.getFullYear()-3).toString();

      
                     col.aggregate([ { $match : { year : yearnow } } ,
                           {$group:{_id: null, max: { $max: "$tempvalue" }, min: { $min: "$tempvalue" }}}],	  
                     function(err, results) {
                       assert2_3.equal(err, null);
                       if(results == "" ){
                           var intrevatempyear1_2 = 1;
                          io.emit('tempyear1_2',{
                              valor: +intrevatempyear1_2
                             });
                       }else{
                          io.emit('tempyear1_2_1',{
                              valor: +results[0].max
                             });
                          io.emit('tempyear1_2_2',{
                              valor: +results[0].min
                             });
                       }
                     }                       
                  )
                  col.aggregate([ { $match : { year : lastyear } } ,
                  {$group:{_id: null, max: { $max: "$tempvalue" }, min: { $min: "$tempvalue" }}}],	  
            function(err, results) {
              assert2_3.equal(err, null);
              if(results == "" ){
                  var intrevatempyear2_2 = 1;
                 io.emit('tempyear2_2',{
                     valor: +intrevatempyear2_2
                    });
              }else{
                 io.emit('tempyear2_2_1',{
                     valor: +results[0].max
                    });
                 io.emit('tempyear2_2_2',{
                     valor: +results[0].min
                    });
              }
            }                       
         )           
         col.aggregate([ { $match : { year : year2 } } ,
         {$group:{_id: null, max: { $max: "$tempvalue" }, min: { $min: "$tempvalue" }}}],	  
   function(err, results) {
     assert2_3.equal(err, null);
     if(results == "" ){
         var intrevatempyear3_2 = 1;
        io.emit('tempyear3_2',{
            valor: +intrevatempyear3_2
           });
     }else{
        io.emit('tempyear3_2_1',{
            valor: +results[0].max
           });
        io.emit('tempyear3_2_2',{
            valor: +results[0].min
           });
     }
   }                       
)  
col.aggregate([ { $match : { year : year3 } } ,
{$group:{_id: null, max: { $max: "$tempvalue" }, min: { $min: "$tempvalue" }}}],	  
function(err, results) {
assert2_3.equal(err, null);
if(results == "" ){
var intrevatempyear4_2 = 1;
io.emit('tempyear4_2',{
   valor: +intrevatempyear4_2
  });
}else{
io.emit('tempyear4_2_1',{
   valor: +results[0].max
  });
io.emit('tempyear4_2_2',{
   valor: +results[0].min
  });
}
}                       
)
db.close();
        });
      }

      function sendhumidyear(){
        var MongoClient3_3 = require('mongodb').MongoClient;
        assert3_3 = require('assert');
        var url3_3 = "mongodb://localhost:27017/watherdata";
        MongoClient3_3.connect(url3_3, function(err, db) {
                      if (err) throw err;   
                     var col =  db.collection("humiddata");  
                     var date = new Date();
                     var yearnow = (date.getFullYear()).toString();
                     
                     var lastyear = (date.getFullYear()-1).toString();
                     
                     var year2 = (date.getFullYear()-2).toString();
                     
                     var year3 = (date.getFullYear()-3).toString();
      
                     col.aggregate([ { $match : { year : yearnow } } ,
                           {$group:{_id: null, max: { $max: "$humidvalue" }, min: { $min: "$humidvalue" }}}],	  
                     function(err, results) {
                       assert3_3.equal(err, null);
                       if(results == "" ){
                           var intrevahumidyear1_2 = 1;
                          io.emit('humidyear1_2',{
                              valor: +intrevahumidyear1_2
                             });
                       }else{
                          io.emit('humidyear1_2_1',{
                              valor: +results[0].max
                             });
                          io.emit('humidyear1_2_2',{
                              valor: +results[0].min
                             });
                       }
                     }                       
                  )
                  col.aggregate([ { $match : { year : lastyear } } ,
                  {$group:{_id: null, max: { $max: "$humidvalue" }, min: { $min: "$humidvalue" }}}],	  
            function(err, results) {
              assert3_3.equal(err, null);
              if(results == "" ){
                  var intrevahumidyear2_2 = 1;
                 io.emit('humidyear2_2',{
                     valor: +intrevahumidyear2_2
                    });
              }else{
                 io.emit('humidyear2_2_1',{
                     valor: +results[0].max
                    });
                 io.emit('humidyear2_2_2',{
                     valor: +results[0].min
                    });
              }
            }                       
         )
         col.aggregate([ { $match : { year : year2 } } ,
         {$group:{_id: null, max: { $max: "$humidvalue" }, min: { $min: "$humidvalue" }}}],	  
   function(err, results) {
     assert3_3.equal(err, null);
     if(results == "" ){
         var intrevahumidyear3_2 = 1;
        io.emit('humidyear3_2',{
            valor: +intrevahumidyear3_2
           });
     }else{
        io.emit('humidyear3_2_1',{
            valor: +results[0].max
           });
        io.emit('humidyear3_2_2',{
            valor: +results[0].min
           });
     }
   }                       
)
col.aggregate([ { $match : { year : year3 } } ,
{$group:{_id: null, max: { $max: "$humidvalue" }, min: { $min: "$humidvalue" }}}],	  
function(err, results) {
assert3_3.equal(err, null);
if(results == "" ){
var intrevahumidyear4_2 = 1;
io.emit('humidyear4_2',{
   valor: +intrevahumidyear4_2
  });
}else{
io.emit('humidyear4_2_1',{
   valor: +results[0].max
  });
io.emit('humidyear4_2_2',{
   valor: +results[0].min
  });
}
}                       
)
db.close();
        });
      }

      function sendsoilyear(){
        var MongoClient4_3 = require('mongodb').MongoClient;
        assert4_3 = require('assert');
        var url4_3 = "mongodb://localhost:27017/watherdata";
        MongoClient4_3.connect(url4_3, function(err, db) {
                      if (err) throw err;   
                     var col =  db.collection("soildata");  
                     var date = new Date();
                     var yearnow = (date.getFullYear()).toString();
                     
                     var lastyear = (date.getFullYear()-1).toString();
                     
                     var year2 = (date.getFullYear()-2).toString();
                     
                     var year3 = (date.getFullYear()-3).toString();

      
                     col.aggregate([ { $match : { year : yearnow } } ,
                           {$group:{_id: null, max: { $max: "$soilvalue" }, min: { $min: "$soilvalue" }}}],	  
                     function(err, results) {
                       assert4_3.equal(err, null);
                       if(results == "" ){
                           var intrevasoilyear1_2 = 1;
                          io.emit('soilyear1_2',{
                              valor: +intrevasoilyear1_2
                             });
                       }else{
                          io.emit('soilyear1_2_1',{
                              valor: +results[0].max
                             });
                          io.emit('soilyear1_2_2',{
                              valor: +results[0].min
                             });
                       }
                     }                       
                  )

                  col.aggregate([ { $match : { year : lastyear } } ,
                  {$group:{_id: null, max: { $max: "$soilvalue" }, min: { $min: "$soilvalue" }}}],	  
            function(err, results) {
              assert4_3.equal(err, null);
              if(results == "" ){
                  var intrevasoilyear2_2 = 1;
                 io.emit('soilyear2_2',{
                     valor: +intrevasoilyear2_2
                    });
              }else{
                 io.emit('soilyear2_2_1',{
                     valor: +results[0].max
                    });
                 io.emit('soilyear2_2_2',{
                     valor: +results[0].min
                    });
              }
            }                       
         )
         col.aggregate([ { $match : { year : year2 } } ,
         {$group:{_id: null, max: { $max: "$soilvalue" }, min: { $min: "$soilvalue" }}}],	  
   function(err, results) {
     assert4_3.equal(err, null);
     if(results == "" ){
         var intrevasoilyear3_2 = 1;
        io.emit('soilyear3_2',{
            valor: +intrevasoilyear3_2
           });
     }else{
        io.emit('soilyear3_2_1',{
            valor: +results[0].max
           });
        io.emit('soilyear3_2_2',{
            valor: +results[0].min
           });
     }
   }                       
)
col.aggregate([ { $match : { year : year3 } } ,
{$group:{_id: null, max: { $max: "$soilvalue" }, min: { $min: "$soilvalue" }}}],	  
function(err, results) {
assert4_3.equal(err, null);
if(results == "" ){
var intrevasoilyear4_2 = 1;
io.emit('soilyear4_2',{
   valor: +intrevasoilyear4_2
  });
}else{
io.emit('soilyear4_2_1',{
   valor: +results[0].max
  });
io.emit('soilyear4_2_2',{
   valor: +results[0].min
  });
}
}                       
)
db.close();
        });
      }

                        function sendrainyear(){
                          var MongoClient5_3 = require('mongodb').MongoClient;
                          assert5_3 = require('assert');
                          var url5_3 = "mongodb://localhost:27017/watherdata";
                          MongoClient5_3.connect(url5_3, function(err, db) {
                                        if (err) throw err;   
                                        
                                        var date = new Date();
                                        var yearnow = (date.getFullYear()).toString();
                                        
                                        var lastyear = (date.getFullYear()-1).toString();
                                        
                                        var year2 = (date.getFullYear()-2).toString();
                                        
                                        var year3 = (date.getFullYear()-3).toString();

                                       var col =  db.collection("raindata");  
                                       col.aggregate([ { $match : { year : yearnow } } ,
                                       {$group:{_id: null, sum: { $sum: "$rainvalue" }}}],	  
                                 function(err, results) {
                                   assert5_3.equal(err, null);     
                                   if(results == "" ){
                                       var intrevarainyear1_2 = 1;
                                       io.emit('rainyear1_2',{
                                        valor: +intrevarainyear1_2
                                       });
                                   }else{
                                    io.emit('rainyear1_2_1',{
                                      valor: +results[0].sum
                                     });
                                   }
                                 }                     
                              )
                              
                              col.aggregate([ { $match : { year : lastyear } } ,
                              {$group:{_id: null, sum: { $sum: "$rainvalue" }}}],	  
                        function(err, results) {
                          assert5_3.equal(err, null);     
                          if(results == "" ){
                              var intrevarainyear2_2 = 1;
                              io.emit('rainyear2_2',{
                               valor: +intrevarainyear2_2
                              });
                          }else{
                           io.emit('rainyear2_2_1',{
                             valor: +results[0].sum
                            });
                          }
                        }                     
                     )
                     col.aggregate([ { $match : { year : year2 } } ,
                     {$group:{_id: null, sum: { $sum: "$rainvalue" }}}],	  
               function(err, results) {
                 assert5_3.equal(err, null);     
                 if(results == "" ){
                     var intrevarainyear3_2 = 1;
                     io.emit('rainyear3_2',{
                      valor: +intrevarainyear3_2
                     });
                 }else{
                  io.emit('rainyear3_2_1',{
                    valor: +results[0].sum
                   });
                 }
               }                     
            )   

            col.aggregate([ { $match : { year : year3 } } ,
            {$group:{_id: null, sum: { $sum: "$rainvalue" }}}],	  
      function(err, results) {
        assert5_3.equal(err, null);     
        if(results == "" ){
            var intrevarainyear4_2 = 1;
            io.emit('rainyear4_2',{
             valor: +intrevarainyear4_2
            });
        }else{
         io.emit('rainyear4_2_1',{
           valor: +results[0].sum
          });
        }
      }                     
   )   
   db.close();
  });
                        
 }


                          function senddustyear() {
                          var MongoClient6_3 = require('mongodb').MongoClient;
                          assert6_3 = require('assert');
                          var url6_3 = "mongodb://localhost:27017/watherdata";
                          MongoClient6_3.connect(url6_3, function(err, db) {
                                        if (err) throw err;   
                                       var col =  db.collection("dustdata");  
                                       var date = new Date();
                                       var yearnow = (date.getFullYear()).toString();
                                       
                                       var lastyear = (date.getFullYear()-1).toString();
                                       
                                       var year2 = (date.getFullYear()-2).toString();
                                       
                                       var year3 = (date.getFullYear()-3).toString();
                                       
                        
                                       col.aggregate([ { $match : { year : yearnow } } ,
                                             {$group:{_id: null, max: { $max: "$dustvalue" }, min: { $min: "$dustvalue" }}}],	  
                                       function(err, results) {
                                         assert6_3.equal(err, null);
                                         if(results == "" ){
                                             var intrevadustyear1_2 = 1;
                                            io.emit('dustyear1_2',{
                                                valor: +intrevadustyear1_2
                                               });
                                         }else{
                                            io.emit('dustyear1_2_1',{
                                                valor: +results[0].max
                                               });
                                            io.emit('dustyear1_2_2',{
                                                valor: +results[0].min
                                               });
                                         }
                                       }                       
                                    )
                                    col.aggregate([ { $match : { year : lastyear } } ,
                                    {$group:{_id: null, max: { $max: "$dustvalue" }, min: { $min: "$dustvalue" }}}],	  
                              function(err, results) {
                                assert6_3.equal(err, null);
                                if(results == "" ){
                                    var intrevadustyear2_2 = 1;
                                   io.emit('dustyear2_2',{
                                       valor: +intrevadustyear2_2
                                      });
                                }else{
                                   io.emit('dustyear2_2_1',{
                                       valor: +results[0].max
                                      });
                                   io.emit('dustyear2_2_2',{
                                       valor: +results[0].min
                                      });
                                }
                              }                       
                           )                 
                                       col.aggregate([ { $match : { year : year2 } } ,
                                             {$group:{_id: null, max: { $max: "$dustvalue" }, min: { $min: "$dustvalue" }}}],	  
                                       function(err, results) {
                                         assert6_3.equal(err, null);
                                         if(results == "" ){
                                             var intrevadustyear3_2 = 1;
                                            io.emit('dustyear3_2',{
                                                valor: +intrevadustyear3_2
                                               });
                                         }else{
                                            io.emit('dustyear3_2_1',{
                                                valor: +results[0].max
                                               });
                                            io.emit('dustyear3_2_2',{
                                                valor: +results[0].min
                                               });
                                         }
                                       }                       
                                    )    
                                    col.aggregate([ { $match : { year : year3 } } ,
                                      {$group:{_id: null, max: { $max: "$dustvalue" }, min: { $min: "$dustvalue" }}}],	  
                                function(err, results) {
                                  assert6_3.equal(err, null);
                                  if(results == "" ){
                                      var intrevadustyear3_2 = 1;
                                     io.emit('dustyear4_2',{
                                         valor: +intrevadustyear3_2
                                        });
                                  }else{
                                     io.emit('dustyear4_2_1',{
                                         valor: +results[0].max
                                        });
                                     io.emit('dustyear4_2_2',{
                                         valor: +results[0].min
                                        });
                                  }
                                }                       
                             )    
                                    db.close();
                                        });
                                      }     