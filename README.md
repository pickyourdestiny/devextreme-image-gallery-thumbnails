# Devextreme Image Gallery + Thumbnail Slider

I ran into this solution because I was trying to reduce the number of external libraries on another project and only use Devextreme.

This project was created using the Devextreme library which contains many other professional looking widgets. So in addition to an image gallery and thumbnail slider, you can look into using a variety of other devextreme widgets and customize them as needed. This project took less than a week from start to finish.

The two main widgets configured are the Gallery widget for the main image gallery and the Tabs widget repurposed as a thumbnail slider. The Tabs widget was recently improved (https://js.devexpress.com/React/New/23_2/#Tabs-and-TabPanel) and now has an orientation option that allows you to align the tabs horizontally or vertically, which provides a more flexible thumbnail slider depending on your use case.

Alternatively, you can allow the user to switch between the four thumbnail positions (left,right,top, and bottom) as shown in this demo and the code provided.

I separated the Options.js page from the main App.js page for two reasons, the first was to avoid overwhelming those who are new to Devextreme or React in general and just show the two main components in use in the App.js file (Gallery + Tabs widgets). The second reason is to show you how easy it is to setup and configure the "optional" widgets used in the options menu, or not use them at all.

The vertical thumbnail positions have the added bonus of allowing users to scroll up and down through the thumbnail list (using your mouse wheel) instead of having to rely on the tabs navigation buttons alone.

To try the online demo click on the following link: https://symphonious-narwhal-a891cb.netlify.app/

Note: you can use this code freely (as is) however the devextreme components do require a developer license if you plan on modifying the code:
https://js.devexpress.com/Buy/ . I am an independent contractor and this is my 'go to' library for all client engagements.

https://github.com/pickyourdestiny/devextreme-image-gallery-thumbnails/assets/125666742/6e291ffd-30ae-4fbb-9961-5c3a036d3c7d
