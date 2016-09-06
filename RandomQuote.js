$(document).ready(function(){
  getQuote();
  // $("#wikiAuthor").tooltip();
  // $("#twitterQuote").tooltip();
  $( "#wikiAuthor" ).tooltip({track:true});
  $( "#twitterQuote" ).tooltip({track:true});
  
  $("#newQuote").bind("click",getQuote);

  //wiki button
   $("#wikiAuthor").click(function(){
      $("#a1").attr("href",wikiUrl);
   });

   //tweet button
  $("#twitterQuote").click(function(){
      $("#a2").attr("href",twitterQuote);
  });
}); //end of document


var wikiUrl;
var twitterQuote;

function getQuote(){ 
  var allColor = ["#A93226","#CB4335","#884EA0","#7D3C98","#2471A3","#2E86C1","#17A589","#138D75",
  "#229954","#28B463","#D4AC0D","#D68910","#CA6F1E","#BA4A00"];
  //get quote
  //use the Forismatic API
  var url = "http://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=?";
  
  $.getJSON(url).done(function(data){
    var quoteText = data.quoteText.trim(); 
    var quoteAuthor = data.quoteAuthor.trim() || "Anonymous";
    wikiUrl = "https://en.wikipedia.org/wiki/"+ data.quoteAuthor.trim().replace(/\s/g,"_");   //change all space to “_”
    twitterQuote = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(quoteText+" "+"-- "+quoteAuthor);

    //put the value into body
    if((quoteText.length + quoteAuthor.length)<140){
      $("#text").animate(
        {opacity:0},500,
        function(){
          $(this).animate({opacity:1},500);
          $("#text").text(quoteText);
        });

      $("#author").animate(
      {opacity:0},500,
      function(){
        $(this).animate({opacity:1},500);
        $("#author").text("By " + quoteAuthor);
      });
    }  //end if 
  }); //end of getJSON

  //change the background color use animate()
  //you need to inmort <script type="text/javascript" src="http://code.jquery.com/color/jquery.color-2.1.2.js"></script>
  var index = Math.floor(Math.random() * allColor.length);
  $("#b1").animate({backgroundColor:allColor[index]},1000); 
  $("#text,#author").animate({color:allColor[index]},1000);
  $(".button").animate({backgroundColor:allColor[index]},1000); 
}//end of getQuote function 


  