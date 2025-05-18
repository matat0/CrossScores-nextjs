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











## Developer Manual
CrossScores utilizes both server-side and client-side rendering, because of this
we make use of numerous modern web development languages including both
React and Next.js. 

Through this, CrossScores is comprised of many **.jsx** files which make up 
all the necessary modules, elements, and page designs for the website.
This means we are able to implement numerous modules like the **TeamModule.jsx**
that all run independently from each other, matching with our fully
modular philosophy.

This all begins within the **page.js**, which serves as the basic structure 
for our entire site. This file simply returns a segment of HTML code, which 
contains the main building blocks of our site. Tags like **<Header/>** and 
**<Welcome/>** are other **.jsx** files that we have imported into this page, 
which make up the Header and Welcome page of our site. Below is a segment
of code which is returned in the **page.js**.

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