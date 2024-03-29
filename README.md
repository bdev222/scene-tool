## App
Scene management tool for episodes.
This is based on [Rick And Morty Graphql API](https://rickandmortyapi.com/graphql)

## Author
Branko Damjanovic

## Tech stacks
React, Typescript, Apollo Graphql, Redux

## Style system
MUI v5

## How to run this app
After `git clone`, run `yarn` and `yarn start`

## Unit testing
Regarding unit testing, I just added `scene.slice.spec.tsx` in this project. Considering deadline of the task, here I am going to skip unit testing for this app by creating one sample test file.
To run this file, you can run `yarn test` in bash.

## Description
This app has following functionalities.

***
#### Add or Remove scenes to episode
#### Add or Remove characters from scene
#### Set the scene's location
#### Set the scene's description

***
This app consists of three main pages

`Scenes page for each episode` \
`Add new Scene page` \
`Edit Scene`

***

### Scenes page

`Each scene` is shown as a `card` of the first character image and location name. \
`Each scene` can be `removed` by clicking `Remove` icon at the corner of the card. (Here it doesn't show any confirmation dialog and will delete immediately. But considering this functionality will be connected to real api endpoint, then we have to show this modal before calling remove api endpoint) \
To enter `Edit mode` of scene, you can just click the card then it will lead you to the edit page.\
To enter `Add mode` of scene, you can click the `+` button in the panel at the right top corner.

***
### Edit or Add new Scene page

In `Edit/Add` page, you can see `3 panels`.\
The first one is `Locations` panel.\
The second one is `Characters` panel.\
In these two panels, you can choose one `location` and multiple `characters` for the scene.
And you can search and move to next page or previous page to get more data.\
The third one is the panel to show the `Draft of scene` made by your operations (choose locations and characters) and set `description` by input field.

Here you can't `Add/Save` scene if you didn't select `location`.

After all, you can click `Add/Save` button.

### App workflow

![Web](public/web.gif)

![Mobile](public/mobile.gif)
