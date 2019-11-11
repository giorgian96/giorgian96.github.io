var height, weight, bmi, culoare;
$(document).ready(function(){
  $('#submit').click(function(){
    height = $('#height').val();
    weight = $('#weight').val();
    if(height.includes(',')){
      height=height.replace(',','.');
    }
    if(height>3){
      height = height/100;
    }
    bmi = weight/(height*height);
    bmi = bmi.toFixed(2);
    if(bmi<18.5){
      culoare = '#1b74e2';
      $('#rezultat').text('Your bmi is: '+bmi+', you\'re underweight.' );
    }else if(bmi<24.9){
      culoare = '##00cc3f';
      $('#rezultat').text('Your bmi is: '+bmi+', you\'re normal weight.');
    }else if(bmi<29.9){
      culoare = '#f1bd23';
      $('#rezultat').text('Your bmi is: '+bmi+', you\'re overweight.');
    }else{
      culoare = '#e2241b';
      $('#rezultat').text('Your bmi is: '+bmi+', you\'re obese.');
    }
    $('*').not('input,#submit').animate({
      backgroundColor:culoare,
      color:'black'
    },1000);
  });
});
