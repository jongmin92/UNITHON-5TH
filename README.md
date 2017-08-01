# UNITHON-5TH
[UNITHON-5TH] 2017-07-28 ~ 2017-07-30

'여정' is an application utilizing the **[tour API(3.0)](http://api.visitkorea.or.kr/main.do)** of 한국관광공사
After selecting the area, you can easily check out the results by simply selecting the '맛집', '숙박', and '명소' in a tinder style.

---

## Getting Start (server)
**Server** is based on Node(Express Framework)
node v8.1.4
Express v4.15
mongodb

```bash
cd ~/work/UNITHON-5TH/server
npm install
cp app/config/config-example.json app/config/config.json
vi app/config/config.json  (you should fill it)
npm start
```

```bash
├── server/
  ├── app/
    ├── config/                  <- server config file here
    ├── auth/                    <- auth middleware
    ├── api/                     <- api controller, db model folder
      ├── index.js               <- routing
  ├── node_modules               <- modules
  ├── app.js                     <- server entry, express setting file
  ├── package.json               <- mostly task runner dependencies
```

---

## Getting start (client)
**Client** is based on **[ReactNative](https://facebook.github.io/react-native/docs/getting-started.html)**
node v6.6.0
react-native v0.46

```bash
cd ~/work/UNITHON-5TH/client
npm install
cp src/config/config-example.json src/config/config.json
vi src/config/config.json  (you should fill it)
(1) react-native run-ios        (Only Mac (with Xcode))
(2) react-native run-android    (with android SDK)
```

```bash
├── client/
  ├── src/
    ├── actions/                 <- action folder
    ├── components/              <- component folder
    ├── containers/              <- containers folder
    ├── reducers/                <- reducer folder
    ├── lib/                     <- lib folder
    ├── config/                  <- client config file here
    ├── App.js                   <- App(ios, android) entry file
    ├── Router.js                <- App Routing
    ├── style.js                 <- global style
  ├── img/                       <- image assets folder
  ├── android/                   <- android native folder
  ├── ios/                       <- ios native folder
  ├── node_modules               <- modules
  ├── index.android.js           <- android entry file
  ├── index.ios.js               <- ios entry file
  ├── package.json               <- mostly task runner dependencies
```
