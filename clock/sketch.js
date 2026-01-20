let data;

let week = [
  "日",
  "月",
  "火",
  "水",
  "木",
  "金",
  "土",
];

function setup() {
  createCanvas(windowHeight,windowHeight);
  getData();
  textAlign(CENTER);
}

function windowResized() {
  resizeCanvas(windowHeight,windowHeight);
  
}

function draw() {
  background(220);

  let date = new Date();
  let year = date.getFullYear(); // 年
  let month = date.getMonth() + 1; // 月 (0-11)
  let day =date.getDate();
  let dow = date.getDay();

  let h =date.getHours();
  let m =date.getHours();
  let s =date.getHours();

  translate(0,-40);
  textAlign(CENTER);
  textFont('Futura');
  textSize(30);
  textStyle(BOLD);
  

  text(year + "/" + month+ "/" + day+'('+week[dow]+')', 400, 400);
  text(h+':'+m+':'+s ,width/2,height/2,200,260);

  if (data){
    text(data.current.temperature_2m+ '°C ',200,300)
  
  }
  // 

  
}
function getData(){
  
  loadJSON('https://api.open-meteo.com/v1/forecast?latitude=36.5667&longitude=139.8833&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,wind_speed_10m,wind_direction_10m,precipitation,rain,showers,snowfall,weather_code,cloud_cover,wind_gusts_10m&timezone=Asia%2FTokyo', newData => {
    data = newData;
    console.log(data);
  });

}
