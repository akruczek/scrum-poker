#### 🃏Make your Refinements a little bit more interesting with this simple mobile app for android and iOS! 

# Scrum poker - mobile App
1. [What is Scrum Poker?](#what-is-scrum-poker?)
2. [Installation](#installation)
3. [Update](#update)
4. [How to set up the App and connect with Jira?](#how-to-set-up-the-app-and-connect-with-jira?)
5. [Technical](#technical)

## What is Scrum Poker?
#### Scrum Poker (or Planning Poker) is a technique to estimate the complexity of a software feature. After discuss the feature, each member of development team pick a vote. The vote remains hidden until all members have voted to avoid influence from other team members. After everyone has voted the highest and lowest estimates explain their choice and the process is repeated until the team agrees on one final estimation.
#### Scrum Poker App is mobile implementation of this technique. It can help to speed up Refinement and Planning meetings (especially in the case of remote teams). It is also possible to connect App with JIRA software to automatically push final estimations to JIRA, so you can conduct whole Estimation process (or even whole meeting) via only one application.

## Installation
### Installation through Expo app:
- Download Expo app on your device from Google Store or AppStore
- Install all needed dependencies on your computer:
  - node `10+`
  - npm `6+`
  - expo-cli `3+`
- Clone repo and set up expo server:
  - `git clone https://github.com/akruczek/scrum-poker.git`
  - `cd scrum-poker`
  - `npm install`
  - `npm start`
- Go to Expo DevTools (will open automatically in browser after `npm start`)
- Switch to Production Mode
- Make sure that your device is in the same network as your computer or change Connection to `Tunnel` in Expo DevTools
- Open App on your device:
  - android: Scan QR code via Expo app
  - iOS: Scan QR code via Camera app and allow to open via Expo app
- Wait until building JavaScript bundle is finished
- Done! Now you can kill expo server (Ctrl + C)
- Every time you want to open app just choose it from `RECENTLY OPENED` list in Expo app

## Update
### Update to latest version through Expo app:
- Go to project directory
- Make sure that you are on `workspace` branch (`git checkout workspace`)
- Pull latest changes (`git pull`)
- Reinstall packages:
  - `rm -rf node_modules`
  - `npm install`
- Set up expo server (`npm start`)
- Make sure that you are in Production Mode (Expo DevTools in browser)
- Open by scanning QR code (not from `RECENTLY OPENED` list)
- Wait until building JavaScript bundle is finished

## How to set up the App and connect with Jira?
- When you join to the App for the first time login with your e-mail address
- Go to Settings View and tap `Connect with Jira`
- Fill form and submit
- Tap Jira badge (with your name and avatar)
- Fill form (all fields are case sensitive!)
  - Custom field - this is identifier of field in your Jira space which is used to store estimation.
    You can find it in Jira Admin panel
  - Default issue type - this is default type of issues you would like to estimate. Task, Sub-Task, User Story, Story, Bug, etc.
    It is used to filter issues in project to make it easier to find what you need.
    You can find full and correct issue type name in Jira Admin Panel.
  - Default issue status - this is default status of issues you would like to estimate. To Do, To Code, In Progress, Done, etc.
    It is used to filter issues in project to make it easier to find what you need.
    You can find full and correct issue status name in Jira Admin Panel.
- Done! Now, when you will create room, Jira configuration will be automatically set up to be the same as your.

## Technical
### Tech Stack:
- Expo 34 (React Native 0.59+, react 16.8.+)
- Typescript 3
- Redux 4
- rxJS 6
- Ramda
- Styled Components 4
- React Native Elements
- Firebase (Real Time Database)
- Jest 24
### Requirements:
- node `10+` (~ `10.15.+`)
- npm `6+` (~ `6.4.+`)
- expo-cli `3+` (~ `3.0.+`)
### Project setup:
> npm install
### Start expo server:
> npm start
### Run unit tests:
> npm run test:all
### Problems? Try this:
- Clear expo cache:
  > expo r -c
