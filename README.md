# MuseumX

## 前端仓库地址
https://github.com/zqh0421/MuseumX

## 前端技术选型
- `React Native`: `^0.71.6`
- `React`: `18.2.0`
- `expo`:`48.0.11`
- `eslint`: `^8.38.0`
- `husky`: `^8.0.3`
- `lint-staged`: `^13.2.1`
- `prettier`: `^2.8.7`
- `gradle`: `7.5.1`

## 项目运行
克隆项目目录后，执行：
```
npx expo install
npx expo run:android
```
即可在安卓真机或模拟机设备中运行调试。

## 项目目录说明
- assets：放置静态资源，比如固定展示的图片。
- src/api：放置公共接口函数。
- src/views：放置页面，比如登录、注册。
- src/components：放置一些公用组件，比如TabBar、Button。
- App.js：应用入口文件。

## 打包apk文件
在终端执行如下语句：
```
cd android
./gradlew assembleRelease
```

打包成功后可在`android/app/build/outputs/apk/release`目录下，找到生成的`app-release.apk`文件，在安卓设备中安装即可使用。

