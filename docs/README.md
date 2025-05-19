# CrossScores Tracker

## Created by Matthew Bangit & Yohannes Gebrechristos

## Project Description
CrossScores is a fully modular sports tracking website, allowing you to 
easily search and add your favorite sports teams to keep track of past and 
upcoming matches!

CrossScores' intended browser is to be used within any desktop web browser.
This includes Google Chrome, Firefox, Microsoft Edge, or any other 
desktop web browser. 

**Link to Developer Manual: [Developer Manual](#developer-manual).**

<br/>
<br/>

### Developer Manual Introduction
CrossScores utilizes both server-side and client-side rendering, because of this
we make use of numerous modern web development languages including both
React and Next.js. 

Through this, CrossScores is comprised of many ***.jsx*** files which make up 
all the necessary modules, elements, and page designs for the website.
This means we are able to implement numerous modules like the ***TeamModule.jsx***
that all run independently from each other, matching with our fully
modular philosophy.

This all begins within the ***page.js***, which serves as the basic structure 
for our entire site. This file simply returns a segment of HTML code, which 
contains the main building blocks of our site. Tags like ***Header*** and 
***Welcome*** are other ***.jsx*** files that we have imported into this page, 
which make up the Header and Welcome page of our site. Below is a segment
of code which is returned in the ***page.js***.

```
  return(
    <div className="app-container">
      <Header/>
      <div className="workspace-container">
        <ModuleGrid/>
      </div>
      <Welcome/>
    </div>
  );
```
<br/>
<br/>

## Developer Manual
To install our application and all dependencies you are first required to install ***Node.js***
The latest version of Node.js can be found [Here](https://nodejs.org/en/download).

When initially creating our app, we utilized an automatic installation provided to'
us by Next.js. We simply entered a line of code into our terminal, which setup the
building blocks for our project. 

Although ***<ins>you aren't required to do this</ins>***, 
I will provide the line of code below if you wish to start your own project
in the future.
```
npx create-next-app@latest
```

Following this, we installed numerous dependencies, libraries, and packages through
***npm***, a way to automatically import online libraries into our project through
the terminal. Below is a list of all the libraries, dependencies, and plugins used.

```
npm install next@latest react@latest react-dom@latest
npm install @supabase/supabase-js
npm install @mui/material @emotion/react @emotion/styled
npm install dayjs
npm i dayjs-plugin-utc --save
npm i dayjs-timezone-iana-plugin
```

### Installed Libraries/Plugins/Dependencies:
**1. NextJS & ReactJS**  
The most important piece of our project is the use of NextJS & ReactJS. Through
these libraries described early, we are able to modularly develop this site, 
reusing numerous HTML elements, without having to manually write it out every
time.


**2. Supabase**  

This online database tool allowed us to use SQL to manage large amounts of data 
in organized tables, then fetch it into organized objects to be used on our site.

**3. MaterialUI**  

This is an open sourced React library which houses a plethora of User Interface 
components and elements, based on Material Design by Google.

**4. DayJS**  

We installed ***DayJS***, along with the ***UTC*** and ***Timezone*** 
plugins. Our Supabase database housed sports matches with specific dates and times 
in the UTC format. In order to translate this timezone to whatever local timezone
is used near the user, we used these packages in order to easily convert the UTC
format into the local timezone.

<br/>
<br/>
  
## Running The Application on a Server
In order to get live feedback on any changes made on the project you need to
host the project on a local server. Luckily, through Node we can easily
host this through the following command.
```
cd crossscores
npm run dev
```
By running this command in the **CMD Terminal** (**NOT THE POWERSHELL TERMINAL**),
you open the crossscores directory, which is the folder the project is saved in,
then the next command will begin to host the project on a local host. Simply
click the IP address listed in the Command Prompt, and any changes made
on the project will be uploaded instantly to the local server.


<br/>
<br/>

## Running Tests for the Software
Type this section blah blha blah

<br/>
<br/>

## API Overview
Type this section blahb lhablh

<br/>
<br/>

## Bugs and Notices
We plan to continue improving this application over time, so naturally there
are lots of bugs and notices to be aware of. 


### List of Bugs/Notices
As of right now, the **Welcome** module
appears every time you visit the home page, when ideally it should only show on a first
visit to the website.

Idealy **we want the /home page in our application to be the defaulted page** to be sent to.
However, **it defaults to the Dashboard instead**. Due to the deep structure of our app it
will be a tedious task to reroute all the file imports by changing around the default
page layouts, so in time this bug can be fixed.

Another aspect of our application that needs to be noted is that **In Progress Games Don't Show**. 
So if a game were to be happening at the time of using the app, the app
won't recognize it due to the logic in our code. However our API does have an 
attribute listed for in progress games, so this issue will be easily fixed in the
near future.

### Roadmap/Down the Line
We aren't done with this application and are very passionate in continuing to
maintain and develop this over time. There are numerous improvements that can
we aspire to implement and aim to keep adding more and more apps!

As for a general roadmap, we are aiming to perfect the main 3 sports of 
Basketball, Soccer, and American Football. When we get to a point where
we find that these sports are fine tuned, we are going to continue to 
implement more and more sports.

We also plan adding additional information such as live scores, table position,
players, and much more which can be fetched by our API's.


