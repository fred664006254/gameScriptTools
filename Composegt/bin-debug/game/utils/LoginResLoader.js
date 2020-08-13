var App;
(function (App) {
    var LoginResLoader;
    (function (LoginResLoader) {
        LoginResLoader.isLoginBgLoaded = false;
        LoginResLoader.isLoginViewResLoaded = false;
        LoginResLoader.isLoginResLoaded = false;
        LoginResLoader.isNeedLoadGuideRes = false;
        LoginResLoader.isDefaultResLoaded = false;
        function checkAndShowLoginView() {
            if (LoginResLoader.isLoginBgLoaded && LoginResLoader.isLoginViewResLoaded) {
                LoginLoading.showBg();
                ViewController.getInstance().openView(ViewConst.BASE.LOGINVIEW);
            }
        }
        LoginResLoader.checkAndShowLoginView = checkAndShowLoginView;
        function loadLoginBgItem() {
            initPlatCfg();
        }
        /**
         * 加载第0步，加载闪屏
         */
        function loadPreLoginBgRes() {
            if (PlatformManager.isShowPreLoading()) {
                ResourceManager.loadItem("mlybg", function () {
                    LoginLoading.showPreBg();
                    App.LoginResLoader.loadLoginBgRes();
                    // LoginLoading.show();
                }, this);
            }
            else {
                App.LoginResLoader.loadLoginBgRes();
            }
        }
        LoginResLoader.loadPreLoginBgRes = loadPreLoginBgRes;
        /**
         * 加载第一步，加载进度条
         */
        function loadLoginBgRes() {
            App.LogUtil.log("startload loginBg");
            StatisticsHelper.reportLoadData(3);
            var resArr = ["loginBg"];
            if (PlatformManager.isShowWXLoading()) {
                if (PlatformManager.checkIsBaiduSp() || PlatformManager.checkIsQQXYXSp()) {
                    resArr.push("baiduloadingbg");
                }
                else {
                    resArr.push("wxloadingbg");
                }
                resArr.push("loginbg_wxprogress1_light");
                resArr.push("loginbg_wxprogress1_bg");
                resArr.push("loginbg_wxprogress1");
            }
            ResourceManager.loadResources(resArr, [], function () {
                //加载loading背景图完成
                StatisticsHelper.reportLoadData(4);
                App.LogUtil.log("loadcomplete loginBg");
                LoginLoading.show();
                if (PlatformManager.checkIsUseSDK() == false) {
                    loadLoginBgItem();
                }
                StatisticsHelper.reportLoadData(5);
                loadLoginViewRes();
            }, function (event) {
                //加载loading背景进度
                console.log("加载进度");
                if (event.resItem && event.resItem.type == RES.ResourceItem.TYPE_IMAGE && PlatformManager.checkCrossDomon() && App.DeviceUtil.isAndroid() && PlatformManager.checkIsWeiduan()) {
                    if (GameData.isLoadedSuccessImage || GameData.isLoadCrossImageError) {
                        if (GameData.isLoadedSuccessImage) {
                            console.log("已经有加载图片成功，不再处理跨域");
                        }
                        if (GameData.isLoadCrossImageError) {
                            console.log("有加载报错，之前已经切换为非缓存，不再处理");
                        }
                    }
                    else if (!GameData.isLoadedSuccessImage) {
                        if ((!ResourceManager.getRes(event.resItem.name))) {
                            NetManager.checkIsOnline(function (isOnline) {
                                if (isOnline) {
                                    GameData.isLoadCrossImageError = true;
                                    console.log("跨域报错了，尝试reload");
                                    if (window["RSDKPlatform"] && window["RSDKPlatform"].setDisableCache) {
                                        window["RSDKPlatform"].setDisableCache("1");
                                    }
                                    window.location.reload();
                                }
                            });
                        }
                        else {
                            GameData.isLoadedSuccessImage = true;
                            console.log("跨域加载成功");
                            if (window["RSDKPlatform"] && window["RSDKPlatform"].setEnableCacheForver) {
                                window["RSDKPlatform"].setEnableCacheForver("1");
                            }
                        }
                    }
                }
            }, LoginResLoader);
        }
        LoginResLoader.loadLoginBgRes = loadLoginBgRes;
        function loadLoginViewRes() {
            App.LogUtil.log("startload loginRes");
            var cnName;
            var languageResKey = PlatformManager.getSpid();
            if (PlatformManager.checkIsLocal() || PlatformManager.checkIsIOSShenheSp()) {
                var tmpcnName = App.CommonUtil.getOption("language");
                if (tmpcnName && RES.hasRes(tmpcnName)) {
                    languageResKey = tmpcnName;
                }
                else {
                    if (PlatformManager.checkIsIOSShenheSp() && PlatformManager.checkIsTWBSp()) {
                        languageResKey = "tw";
                    }
                }
            }
            if (RES.hasRes(languageResKey)) {
                cnName = languageResKey;
            }
            else {
                cnName = "cn";
            }
            var loadArray = ["loginRes", cnName];
            if (PlatformManager.checkIsKRSp()) {
                var isShow = LocalStorageManager.get("isShowKRAgreement");
                if (!isShow) {
                    loadArray.push("kragreement");
                }
            }
            if (App.DeviceUtil.checkIsFullscreen()) {
                if (ResourceManager.hasRes("fill_screen_buttom")) {
                    loadArray.push("fill_screen_buttom");
                }
                if (ResourceManager.hasRes("fill_screen_top")) {
                    loadArray.push("fill_screen_top");
                }
            }
            ResourceManager.loadResources(loadArray, [], function () {
                App.LogUtil.log("loadcomplete loginRes");
                LanguageManager.setData(ResourceManager.getRes(cnName));
                if (App.DeviceUtil.isIOS()) {
                    loadLoginViewSoundRes();
                }
                else {
                    loginViewResLoadComplete();
                }
                // loginViewResLoadComplete();
            }, function (event) {
                //加载loginview资源进度
                var per = event.itemsLoaded / event.itemsTotal;
                var progressStr = event.itemsLoaded + "/" + event.itemsTotal;
                LoginLoading.setPercentage(per, progressStr);
            }, LoginResLoader, function (e) {
                loadLoginViewRes();
            });
        }
        function loadLoginViewSoundRes() {
            ResourceManager.loadGroup("loginSound", function () {
                loginViewResLoadComplete();
            }, function (event) {
                //加载loginview资源进度
                var per = event.itemsLoaded / event.itemsTotal;
                var progressStr = event.itemsLoaded + "/" + event.itemsTotal;
                LoginLoading.setPercentage(per, progressStr);
            }, LoginResLoader, function (e) {
                loginViewResLoadComplete();
            });
        }
        function loginViewResLoadComplete() {
            StatisticsHelper.reportLoadData(6);
            if (!LoginResLoader.isLoginViewResLoaded) {
                LoginResLoader.isLoginViewResLoaded = true;
                checkAndShowLoginView();
            }
            //加载loginview资源完成
            GameConfig.loadConfig();
            // loadPublicRes();
        }
        function loadPublicRes() {
            if (LoginResLoader.isLoginResLoaded == true) {
                return;
            }
            StatisticsHelper.reportLoadData(11);
            var resArr = ["preload", "office_fnt", "composeRes"];
            ResourceManager.loadResources(resArr, [], function () {
                if (App.DeviceUtil.isIOS()) {
                    loadhHomeSoundRes();
                }
                else {
                    loadExtraPreloadRes();
                }
            }, function (event) {
                var per = event.itemsLoaded / event.itemsTotal;
                var progressStr = event.itemsLoaded + "/" + event.itemsTotal;
                LoginLoading.setPercentage(per, progressStr);
            }, LoginResLoader, function (e) {
                loadPublicRes();
            });
        }
        LoginResLoader.loadPublicRes = loadPublicRes;
        function loadhHomeSoundRes() {
            ResourceManager.loadGroup("homeSound", function () {
                loadExtraPreloadRes();
            }, function (event) {
                var per = event.itemsLoaded / event.itemsTotal;
                var progressStr = event.itemsLoaded + "/" + event.itemsTotal;
                LoginLoading.setPercentage(per, progressStr);
            }, LoginResLoader, function (e) {
                loadExtraPreloadRes();
            });
        }
        function loadExtraPreloadRes() {
            StatisticsHelper.reportLoadData(12);
            if (PlatformManager.checkIsTWBSp()) {
                StatisticsHelper.reportLoadData(13);
                ResourceManager.loadResources(["preload_tw"], [], function () {
                    StatisticsHelper.reportLoadData(14);
                    homeResLoadComplete();
                }, function (event) {
                    var per = event.itemsLoaded / event.itemsTotal;
                    var progressStr = event.itemsLoaded + "/" + event.itemsTotal;
                    LoginLoading.setPercentage(per, progressStr);
                }, LoginResLoader, function (e) {
                    loadExtraPreloadRes();
                });
            }
            else {
                homeResLoadComplete();
            }
        }
        function homeResLoadComplete() {
            LoginResLoader.isLoginResLoaded = true;
            if (LoginResLoader.isNeedLoadGuideRes) {
                loadGuideRes();
            }
            else {
                if (LoginManager.isLoginSuccess) {
                    StatisticsHelper.reportLoadData(15);
                    LoginManager.checkAndCreateScene();
                }
                else {
                    LoginManager.waitToCheckLoadGuide = true;
                }
            }
        }
        function loadGuideRes() {
            PlatformManager.analyticsNewGuide(1);
            ResourceManager.loadGroup("rookieRes", function () {
                //加载loginview资源完成
                LoginResLoader.isLoginResLoaded = true;
                LoginManager.startGuide();
                LoginManager.checkAndCreateScene();
            }, function (event) {
                //加载loginview资源进度
                var per = event.itemsLoaded / event.itemsTotal;
                var progressStr = event.itemsLoaded + "/" + event.itemsTotal;
                LoginLoading.setPercentage(per, progressStr);
            }, LoginManager);
        }
        function setNeedLoadGuideRes() {
            LoginResLoader.isNeedLoadGuideRes = true;
            if (LoginManager.waitToCheckLoadGuide) {
                LoginManager.waitToCheckLoadGuide = false;
                loadGuideRes();
            }
        }
        LoginResLoader.setNeedLoadGuideRes = setNeedLoadGuideRes;
        function initPlatCfg() {
            PlatCfg.initCfg(function () {
                var loadRes = [];
                if (PlatCfg.loginBg) {
                    loadRes.push(PlatCfg.loginBg);
                }
                if (PlatCfg.loginLogo) {
                    loadRes.push(PlatCfg.loginLogo);
                }
                ResourceManager.loadResources(loadRes, [], function () {
                    if (!App.LoginResLoader.isLoginBgLoaded) {
                        App.LoginResLoader.isLoginBgLoaded = true;
                        App.LoginResLoader.checkAndShowLoginView();
                    }
                }, null, LoginResLoader, function () {
                });
            }, LoginResLoader);
        }
        LoginResLoader.initPlatCfg = initPlatCfg;
        function dispose() {
            LoginResLoader.isNeedLoadGuideRes = false;
        }
        LoginResLoader.dispose = dispose;
        var autoResCfg = [
            "servant_full2_1033_ske",
            "servant_full2_1033_tex_json",
            "servant_full2_1033_tex_png",
            "firstchargefg",
            "firstchargebg",
            "recharge_fnt",
            "common_left_bg",
            "common_9_bg",
            "achievement_state3",
            "servant_topresbg",
            "progress_type1_yellow", "progress_type1_bg",
            "rechargevie_effects",
            "recharge2_fnt",
            "recharge_diban_01",
            "rechargevie_db_01",
            "rechargevipview",
            "recharge_new_itemicon1",
            "recharge_new_itemicon2",
            "recharge_new_itemicon3",
            "recharge_new_itemicon4",
            "recharge_new_itemicon5",
            "recharge_new_itemicon6",
            "recharge_new_itemicon7",
            "recharge_new_itemicon8",
        ];
        var loadItemIndex = -1;
        var maxResNum = autoResCfg.length;
        /**
         * 单线程静默加载文件
         */
        function autoLoadNextResItem() {
            loadItemIndex++;
            if (loadItemIndex < maxResNum) {
                if (autoResCfg[loadItemIndex]) {
                    var resKey = autoResCfg[loadItemIndex];
                    ResourceManager.loadItem(resKey, autoLoadNextResItem, this);
                }
                else {
                    App.LogUtil.log("缺少" + autoResCfg[loadItemIndex]);
                    autoLoadNextResItem();
                }
            }
        }
        LoginResLoader.autoLoadNextResItem = autoLoadNextResItem;
    })(LoginResLoader = App.LoginResLoader || (App.LoginResLoader = {}));
})(App || (App = {}));
