// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {  
   // Add code to display the current date in the header of the page using dayjs
  var currentDay = $("#currentDay");
  currentDay.text(dayjs().format('dddd, MMMM D, YYYY'));
   
  // apply past present or future class to each timeBlock depending on current hour defined using dayjs
  var hour = dayjs().hour();
  var timeBlock = $(".time-block");
  timeBlock.each(function(){
    // splits id string at dash and grabs number which is at index 1
    var id = $(this).attr("id").split('-')[1];
    var rowHour = parseInt(id);
    // conditional to color code for past, future, or present depending on if current hour (hour) is <, >, or = to the rowHour
    if (hour > rowHour) {
      $(this).addClass('past');
    } else if (hour < rowHour) {
      $(this).addClass('future');
    } else {
      $(this).addClass('present');}

      // retrieve events saved in local storage and set them to the value of each corresponding timeBlock
      // each time block retrieves localStorage data with key of its own id 
    var text = JSON.parse(localStorage.getItem(id));
    $(this).children('.description').val(text);                       
  })

  // add event listener to all elements with class .saveBtn so that when clicked, the user input is saved to local storage with the key value defined by the parent container's id
 $(".saveBtn").on('click', function (event) {
  // parentId refers to id of timeBlock - this will match the id variable used to set text of each timeblock in function above
    var parentId = ($(this).parent().attr('id').split('-')[1]);
    // must follow path from this = button to sibling with class of description
    var event = ($(this).siblings('.description').val())
    // sets parentId (will be the same as id in above function) as key and the entered text as the value within local storage
    localStorage.setItem(parentId, JSON.stringify(event));
  })
});
