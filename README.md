Limitation of loading javascript file by using Ajax
----------------------------------------------------
Here is a method we can use to provide the reference of javascript in js file

$.ajax({
  url: url,
  dataType: "script",
  success: success
});

Major limitations
------------------
1. limited to your domain because of the JavaScript sandbox security model.(took from stackOverflow).
2. Script is loaded but not guaranteed to be executed.
Well, 2nd problem can be solved by a callback function but it may lead to slow down the loading of webpage.