# Spicy Logger :hot_pepper:
## Overview
Spicy Logger is a React Native app that can log all the spicy food you experienced!
- You can log all the spicy menu in restaurants, spicy recipes at home, and spicy products you purchased at supermarket.
- The information can be logged with spicy rate, tasty rate, address & location along with photo so you don't forget when you want to try next time.
- You can search all the spicy log history sorted by spicy rate, tasty rate and so on... depending on your mood of the day

## Demo
1. You can sign up for an account, or login if you already have an account.  
![signup](https://user-images.githubusercontent.com/126217845/229663484-422a0cda-cbc0-45e1-a613-b06b30dbdcf5.PNG)
![login](https://user-images.githubusercontent.com/126217845/229663538-02252130-09ca-410f-b0be-830269089cfa.PNG)   

1. The app will land you on spicy logs screen where you can browse all your favorite spicy menu, products, and recipes. By default the order is created by date (DESC) but you can adjust to 'spicy rate' or 'tasty rate'.  
![list_1](https://user-images.githubusercontent.com/126217845/229663936-892e040e-741f-4b27-8488-58825af29b33.PNG)
![list_2](https://user-images.githubusercontent.com/126217845/229663955-9f16c558-3f62-401c-972c-1e49b53e3bcf.PNG)
![list_3](https://user-images.githubusercontent.com/126217845/229663970-493707af-d073-47e2-932c-8e1824a034bb.PNG)


1. By clicking 'plus' button on the header, you can add a new spicy item with name, category (shop, product, or recipe), descriptions, spicy & tasty rates, photo, and location information.  
![add](https://user-images.githubusercontent.com/126217845/229664459-3c3adfc9-47f8-42e9-adbd-748c1f4fb872.PNG)  

1. You can view the detailed information by clicking a card in the list, and also can edit from that screen.  
![details](https://user-images.githubusercontent.com/126217845/229664870-88a35fad-844b-4624-98b0-65c1840cc80a.PNG)
![edit](https://user-images.githubusercontent.com/126217845/229664884-71e7d418-5980-4360-9b8b-0093eda605e9.PNG).  

## To Install and Run Locally

### Prerequisite
You will need a [Mapbox](https://account.mapbox.com/) access token to run this app locally.
Please get an account and an access token, and put the value in .env file with the name **MAP_BOX_TOKEN**.   

### Steps
1. Clone the repository. 
```
git clone https://github.com/JennyJunko2/SpicyApp.git
```
1. Install all the dependencies
```
npm install
```
1. Start the app
```
npx expo start
```
