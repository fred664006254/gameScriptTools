var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var ServerListPopupView = (function (_super) {
    __extends(ServerListPopupView, _super);
    function ServerListPopupView() {
        var _this = _super.call(this) || this;
        _this._tabIndex = -1;
        _this._allServerList = [];
        return _this;
    }
    ServerListPopupView.prototype.getBgName = function () {
        return "serverlist_bg";
    };
    ServerListPopupView.prototype.getShowHeight = function () {
        return 740 + (PlatformManager.getGameArea() ? 46 : 0);
    };
    ServerListPopupView.prototype.getCloseBtnName = function () {
        return "sharepopupview_closebtn";
    };
    ServerListPopupView.prototype.preInit = function () {
        var _this = this;
        var ths = this;
        this.getServerList(function (data) {
            _super.prototype.preInit.call(_this);
        }, function () {
            ths.preInit();
        }, this, true);
    };
    ServerListPopupView.prototype.getServerList = function (successCallback, failCallback, thisObj, showLoading) {
        var ths = this;
        var reqData = { t: "getserverlist", pid: LoginManager.getLocalUserName() };
        if (ServerCfg.checkServerDebug()) {
            reqData.debug = 1;
        }
        var version = PlatformManager.getAppVersion();
        var channel = PlatformManager.getAppid();
        if (version) {
            reqData.version = version;
        }
        if (channel) {
            reqData.channel = channel;
        }
        if (PlatformManager.checkIsIOSShenheSp()) {
            reqData.isShenhe = "1";
        }
        if (App.DeviceUtil.isAndroid()) {
            reqData.os = "android";
        }
        else if (App.DeviceUtil.isIOS()) {
            reqData.os = "ios";
        }
        if (PlatformManager.checkIsAreaPkg()) {
            reqData.bigType = PlatformManager.getGameArea();
        }
        console.log("getCfg os", reqData.os);
        showLoading && NetLoading.show();
        NetManager.http.get(ServerCfg.svrCfgUrl, reqData, function (data) {
            showLoading && NetLoading.hide();
            ServerCfg.myserver = data.myserver;
            ServerCfg.serverlist = data.serverlist;
            if (successCallback) {
                successCallback.call(thisObj, data);
            }
        }, function () {
            showLoading && NetLoading.hide();
            if (failCallback) {
                failCallback.call(thisObj);
            }
        }, this);
    };
    ServerListPopupView.prototype.initView = function () {
        var _this = this;
        var ths = this;
        var topBg = BaseBitmap.create("serverlist_topbg");
        topBg.width = 535;
        topBg.height = 140;
        topBg.x = this.viewBg.x + this.viewBg.width / 2 - topBg.width / 2;
        // topBg.y = 20;
        this.addChildToContainer(topBg);
        var lineSp = BaseBitmap.create("public_line3");
        this.addChildToContainer(lineSp);
        var lastLoginTF = ComponentManager.getTextField(LanguageManager.getlocal("serverListLastLogin"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        lastLoginTF.x = topBg.x + topBg.width / 2 - lastLoginTF.width / 2;
        lastLoginTF.y = topBg.y + 15;
        this.addChildToContainer(lastLoginTF);
        lineSp.width = lastLoginTF.width + 280;
        lineSp.setPosition(lastLoginTF.x + (lastLoginTF.width - lineSp.width) / 2, lastLoginTF.y + (lastLoginTF.height - lineSp.height) / 2);
        // let myBg = BaseBitmap.create("public_9_bg4");
        // myBg.width = 518;
        // myBg.height = 140;
        // myBg.x = this.viewBg.x + this.viewBg.width/2 - myBg.width/2;
        // myBg.y = 75;
        // this.addChildToContainer(myBg);
        var rect = egret.Rectangle.create();
        var myserverList = ServerCfg.myserver;
        rect.setTo(0, 0, 434, topBg.height - lastLoginTF.y - lastLoginTF.height - 20);
        var myScrollList = ComponentManager.getScrollList(ServerListMyScrollItem, myserverList, rect);
        this._myScrollList = myScrollList;
        this.addChildToContainer(myScrollList);
        myScrollList.x = topBg.x + topBg.width / 2 - myScrollList.width / 2;
        myScrollList.y = lastLoginTF.y + lastLoginTF.height + 5;
        myScrollList.addTouchTap(this.clickItemHandler3, this);
        var topX = topBg.x;
        var topY = topBg.y + 10 + topBg.height;
        var areaData = GameConfig.getAreaTab();
        if (PlatformManager.getGameArea()) {
            topY = topBg.y + 5 + topBg.height;
            var areaTab_1 = ComponentManager.getTabBarGroup(this.getTabbarName(), areaData.tab, function (data) {
                App.LogUtil.log("index: " + data.index);
                if (App.DeviceUtil.isRuntime2()) {
                    var areaid = GameConfig.getSubAppIdByArea(areaData.area[data.index]);
                    PlatformManager.switchAreaOrLanguage(areaid, PlatformManager.getGameLanguage());
                    GameData.curBigType = areaid;
                    ths.refreshListData();
                }
                else {
                    ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                        msg: LanguageManager.getlocal("switchAreaTip"), title: "itemUseConstPopupViewTitle", needCancel: true, handler: _this, callback: function () {
                            var areaid = GameConfig.getSubAppIdByArea(areaData.area[data.index]);
                            PlatformManager.switchAreaOrLanguage(areaid, PlatformManager.getGameLanguage());
                            if (App.DeviceUtil.isRuntime2()) {
                                GameData.curBigType = areaid;
                                ths.refreshListData();
                            }
                        }, cancelcallback: function () {
                            areaTab_1.revertSelected();
                        }
                    });
                }
            }, this);
            areaTab_1.setPosition(topX, topY);
            this.addChildToContainer(areaTab_1);
            topY = topY + areaTab_1.height;
        }
        var bottomBg = BaseBitmap.create("public_9_managebg");
        bottomBg.width = topBg.width;
        bottomBg.height = 460;
        bottomBg.x = topX;
        bottomBg.y = topY;
        this.addChildToContainer(bottomBg);
        var lineSp2 = BaseBitmap.create("public_line3");
        this.addChildToContainer(lineSp2);
        var listTF = ComponentManager.getTextField(LanguageManager.getlocal("serverList"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        listTF.x = bottomBg.x + bottomBg.width / 2 - listTF.width / 2;
        listTF.y = bottomBg.y + 15;
        this.addChildToContainer(listTF);
        lineSp2.width = listTF.width + 280;
        lineSp2.setPosition(listTF.x + (listTF.width - lineSp2.width) / 2, listTF.y + (listTF.height - lineSp2.height) / 2);
        var rect2 = egret.Rectangle.create();
        // let test = ServerCfg.serverlist;
        // ServerCfg.serverlist = [
        // {"sname":"30服","zid":"1","ip_server":"gt-","port_server":"15001","ip_chat":"gt-wanba-web04.raygame3.com","port_chat":"3002","flag":1},
        // {"sname":"29服","zid":"4","ip_server":"gt-","port_server":"15001","ip_chat":"gt-wanba-web04.raygame3.com","port_chat":"3002","flag":1},
        // {"sname":"28服","zid":"2","ip_server":"gt-","port_server":"15001","ip_chat":"gt-wanba-web04.raygame3.com","port_chat":"3002","flag":1},
        // {"sname":"27服","zid":"3","ip_server":"gt-","port_server":"15001","ip_chat":"gt-wanba-web04.raygame3.com","port_chat":"3002","flag":1},
        // {"sname":"26服","zid":"5","ip_server":"gt-","port_server":"15001","ip_chat":"gt-wanba-web04.raygame3.com","port_chat":"3002","flag":1},
        // {"sname":"25服","zid":"6","ip_server":"gt-","port_server":"15001","ip_chat":"gt-wanba-web04.raygame3.com","port_chat":"3002","flag":1},
        // {"sname":"24服","zid":"7","ip_server":"gt-","port_server":"15001","ip_chat":"gt-wanba-web04.raygame3.com","port_chat":"3002","flag":1},
        // 	{"sname":"23服","zid":"8","ip_server":"gt-","port_server":"15001","ip_chat":"gt-wanba-web04.raygame3.com","port_chat":"3002","flag":1},
        // 	{"sname":"22服","zid":"9","ip_server":"gt-","port_server":"15001","ip_chat":"gt-wanba-web04.raygame3.com","port_chat":"3002","flag":1},
        // 	{"sname":"21服","zid":"10","ip_server":"gt-","port_server":"15001","ip_chat":"gt-wanba-web04.raygame3.com","port_chat":"3002","flag":1},
        // 	{"sname":"20服","zid":"11","ip_server":"gt-","port_server":"15001","ip_chat":"gt-wanba-web04.raygame3.com","port_chat":"3002","flag":1},
        // 	{"sname":"19服","zid":"12","ip_server":"gt-","port_server":"15001","ip_chat":"gt-wanba-web04.raygame3.com","port_chat":"3002","flag":1},
        // 	{"sname":"18服","zid":"13","ip_server":"gt-","port_server":"15001","ip_chat":"gt-wanba-web04.raygame3.com","port_chat":"3002","flag":1},
        // 	{"sname":"17服","zid":"14","ip_server":"gt-","port_server":"15001","ip_chat":"gt-wanba-web04.raygame3.com","port_chat":"3002","flag":1},
        // 	{"sname":"16服","zid":"15","ip_server":"gt-","port_server":"15001","ip_chat":"gt-wanba-web04.raygame3.com","port_chat":"3002","flag":1},
        // 	{"sname":"15服","zid":"16","ip_server":"gt-","port_server":"15001","ip_chat":"gt-wanba-web04.raygame3.com","port_chat":"3002","flag":1},
        // 	{"sname":"14服","zid":"17","ip_server":"gt-","port_server":"15001","ip_chat":"gt-wanba-web04.raygame3.com","port_chat":"3002","flag":1},
        // 	{"sname":"13服","zid":"18","ip_server":"gt-","port_server":"15001","ip_chat":"gt-wanba-web04.raygame3.com","port_chat":"3002","flag":1},
        // 	{"sname":"12服","zid":"19","ip_server":"gt-","port_server":"15001","ip_chat":"gt-wanba-web04.raygame3.com","port_chat":"3002","flag":1},
        // 	{"sname":"11服","zid":"20","ip_server":"gt-","port_server":"15001","ip_chat":"gt-wanba-web04.raygame3.com","port_chat":"3002","flag":1},
        // 	{"sname":"10服","zid":"21","ip_server":"gt-","port_server":"15001","ip_chat":"gt-wanba-web04.raygame3.com","port_chat":"3002","flag":1},
        // 	{"sname":"9服","zid":"22","ip_server":"gt-","port_server":"15001","ip_chat":"gt-wanba-web04.raygame3.com","port_chat":"3002","flag":1},
        // 	{"sname":"8服","zid":"23","ip_server":"gt-","port_server":"15001","ip_chat":"gt-wanba-web04.raygame3.com","port_chat":"3002","flag":1},
        // 	{"sname":"7服","zid":"24","ip_server":"gt-","port_server":"15001","ip_chat":"gt-wanba-web04.raygame3.com","port_chat":"3002","flag":1},
        // 	{"sname":"6服","zid":"25","ip_server":"gt-","port_server":"15001","ip_chat":"gt-wanba-web04.raygame3.com","port_chat":"3002","flag":1},
        // 	{"sname":"5服","zid":"26","ip_server":"gt-","port_server":"15001","ip_chat":"gt-wanba-web04.raygame3.com","port_chat":"3002","flag":1},
        // 	{"sname":"4服","zid":"27","ip_server":"gt-","port_server":"15001","ip_chat":"gt-wanba-web04.raygame3.com","port_chat":"3002","flag":1},
        // 	{"sname":"3服","zid":"28","ip_server":"gt-","port_server":"15001","ip_chat":"gt-wanba-web04.raygame3.com","port_chat":"3002","flag":1},
        // 	{"sname":"2服","zid":"29","ip_server":"gt-","port_server":"15001","ip_chat":"gt-wanba-web04.raygame3.com","port_chat":"3002","flag":1},
        // 	{"sname":"1服","zid":"30","ip_server":"gt-","port_server":"15001","ip_chat":"gt-wanba-web04.raygame3.com","port_chat":"3002","flag":1},
        // ]
        var leftBg = BaseBitmap.create("serverlist_leftbg");
        leftBg.width = 156;
        leftBg.height = 405;
        this.addChildToContainer(leftBg);
        leftBg.setPosition(bottomBg.x + 10, listTF.y + listTF.height + 10);
        var test = ServerCfg.serverlist;
        var tabList = this.getTabList(test);
        rect2.setTo(0, 0, 152, leftBg.height - 10);
        this._tabScrollList = ComponentManager.getScrollList(ServerListTabScrollItem, tabList, rect2);
        this.addChildToContainer(this._tabScrollList);
        this._tabScrollList.x = leftBg.x + (leftBg.width - this._tabScrollList.width) / 2;
        this._tabScrollList.y = leftBg.y + 5;
        this._tabScrollList.addTouchTap(this.clickItemHandler, this);
        this.setSelect(0);
        var rect3 = egret.Rectangle.create();
        var serverList = this.getServerListByIndex(0);
        rect3.setTo(0, 0, 353, leftBg.height + 5);
        this._serverScrollList = ComponentManager.getScrollList(ServerListServerScrollItem, serverList, rect3);
        this.addChildToContainer(this._serverScrollList);
        this._serverScrollList.x = leftBg.x + leftBg.width + 6;
        this._serverScrollList.y = leftBg.y;
        this._serverScrollList.addTouchTap(this.clickItemHandler2, this);
    };
    ServerListPopupView.prototype.refreshListData = function () {
        var _this = this;
        this.getServerList(function () {
            if (_this._myScrollList) {
                _this._myScrollList.refreshData(ServerCfg.myserver);
            }
            if (_this._tabScrollList) {
                var test = ServerCfg.serverlist;
                var tabList = _this.getTabList(test, true);
                _this._tabScrollList.refreshData(tabList);
                _this.setSelect(0);
            }
            if (_this._serverScrollList) {
                var serverList = _this.getServerListByIndex(0);
                _this._serverScrollList.refreshData(serverList);
            }
        }, function () {
            _this.refreshListData();
        }, this, true);
    };
    ServerListPopupView.prototype.initContainer = function () {
        _super.prototype.initContainer.call(this);
        // this.container.y=this.viewBg.y+105;
    };
    ServerListPopupView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        if (this.titleTF) {
            this.titleTF.y = this.viewBg.y + 66 - this.titleTF.height / 2;
            this.titleTF.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
        }
        this.container.y = this.viewBg.y + 103;
        this.closeBtn.x = this.viewBg.x + this.viewBg.width - 32 - this.closeBtn.width / 2;
        this.closeBtn.y = this.viewBg.y + 27;
        this._hudieClip.x = this.closeBtn.x - 45;
        this._hudieClip.y = this.closeBtn.y - 45;
    };
    ServerListPopupView.prototype.clickItemHandler = function (event) {
        var index = Number(event.data);
        this.setSelect(index);
        var serverList = this.getServerListByIndex(index);
        this._serverScrollList.setScrollTop(0);
        this._serverScrollList.refreshData(serverList);
    };
    ServerListPopupView.prototype.clickItemHandler2 = function (event) {
        var index = Number(event.data);
        this.setSelectServer(this._curServerList[index]);
        this.hide();
    };
    ServerListPopupView.prototype.clickItemHandler3 = function (event) {
        var index = Number(event.data);
        // this.setSelect(index);
        var myserverList = ServerCfg.myserver;
        this.setSelectServer(myserverList[index]);
        this.hide();
    };
    ServerListPopupView.prototype.setSelectServer = function (serverData) {
        var result = false;
        if (serverData) {
            result = ServerCfg.setSelectServer(serverData.old_zid ? serverData.old_zid : serverData.zid);
        }
        return result;
    };
    ServerListPopupView.prototype.getTabList = function (data, opera) {
        // let tabList: Array<number> = new Array();
        // let tabNum = Math.ceil(data.length/10);
        // for (var index = tabNum; index > 0; index--) {
        // 	tabList.push(index);
        // }
        if (opera) {
            if (ServerCfg.myserver && ServerCfg.myserver.length > 0) {
                var result = this.setSelectServer(ServerCfg.myserver[0]);
                opera = (!result);
            }
        }
        this._allServerList.length = 0;
        data.sort(function (a, b) {
            var bzid = b.old_zid ? Number(b.old_zid) : Number(b.zid);
            var azid = a.old_zid ? Number(a.old_zid) : Number(a.zid);
            return bzid - azid;
        });
        var list = [];
        var i = 0;
        var l = data.length;
        var pageIndex = 0;
        var startIndex = -1;
        for (i; i < l; i++) {
            if (opera && data[i].flag == 1) {
                this.setSelectServer(data[i]);
            }
            var czid = data[i].old_zid ? Number(data[i].old_zid) : Number(data[i].zid);
            if (i == 0) {
                if (czid % 10 == 0) {
                    startIndex = czid;
                }
                else {
                    startIndex = Math.ceil(czid / 10) * 10;
                }
                if (this._allServerList[pageIndex] == null) {
                    this._allServerList[pageIndex] = [data[i]];
                }
                if (i == l - 1) {
                    if (PlatformManager.checkIsEnLang() || PlatformManager.checkIsPtLang()) {
                        list.push(LanguageManager.getlocal("serverListServer") + String(startIndex - 9) + "-" + startIndex);
                    }
                    else {
                        list.push(String(startIndex - 9) + "-" + startIndex + LanguageManager.getlocal("serverListServer"));
                    }
                }
            }
            else {
                if (czid <= (startIndex - 10)) {
                    if (PlatformManager.checkIsEnLang() || PlatformManager.checkIsPtLang()) {
                        list.push(LanguageManager.getlocal("serverListServer") + String(startIndex - 9) + "-" + startIndex);
                    }
                    else {
                        list.push(String(startIndex - 9) + "-" + startIndex + LanguageManager.getlocal("serverListServer"));
                    }
                    if (czid % 10 == 0) {
                        startIndex = czid;
                    }
                    else {
                        startIndex = Math.ceil(czid / 10) * 10;
                    }
                    pageIndex++;
                    if (this._allServerList[pageIndex] == null) {
                        this._allServerList[pageIndex] = [data[i]];
                    }
                    if (i == l - 1) {
                        if (PlatformManager.checkIsEnLang() || PlatformManager.checkIsPtLang()) {
                            list.push(LanguageManager.getlocal("serverListServer") + String(startIndex - 9) + "-" + startIndex);
                        }
                        else {
                            list.push(String(startIndex - 9) + "-" + startIndex + LanguageManager.getlocal("serverListServer"));
                        }
                    }
                }
                else if (i == l - 1) {
                    if (PlatformManager.checkIsEnLang() || PlatformManager.checkIsPtLang()) {
                        list.push(LanguageManager.getlocal("serverListServer") + String(startIndex - 9) + "-" + startIndex);
                    }
                    else {
                        list.push(String(startIndex - 9) + "-" + startIndex + LanguageManager.getlocal("serverListServer"));
                    }
                    if (this._allServerList[pageIndex]) {
                        this._allServerList[pageIndex].push(data[i]);
                    }
                }
                else {
                    if (this._allServerList[pageIndex]) {
                        this._allServerList[pageIndex].push(data[i]);
                    }
                }
            }
        }
        return list;
    };
    ServerListPopupView.prototype.getServerListByIndex = function (tabIndex) {
        this._curServerList = this._allServerList[tabIndex];
        return this._curServerList;
        // let test = ServerCfg.serverlist;
        // // tabIndex = Math.ceil(test.length/10) - tabIndex -1;
        // let aNum = test.length%10;
        // if(test.length>0&&aNum==0)
        // {
        // 	aNum=10;
        // }
        // let startNum:number=tabIndex*10;
        // let endNum:number=tabIndex*10+aNum+10-aNum;
        // if(tabIndex==0)
        // {
        // 	startNum=tabIndex*10;
        // 	endNum=startNum+aNum;
        // }
        // else
        // {
        // 	startNum=tabIndex*10-10+aNum;
        // 	endNum=tabIndex*10+aNum;
        // }
        // endNum=Math.min(test.length,endNum);
        // if(endNum == 0){
        // 	endNum = 10;
        // }
        // let serverList: Array<any> = new Array();
        // for(startNum;startNum<endNum;startNum++)
        // {
        // 	serverList.push(test[startNum]);
        // }
        // this._curServerList = serverList;
        // return serverList;
    };
    //刷新选中状态
    ServerListPopupView.prototype.setSelect = function (tabIndex) {
        // let curTabIndex = this._tabIndex;
        if (this._tabIndex == tabIndex) {
            return;
        }
        this._tabIndex = tabIndex;
        if (this._tabScrollItem) {
            if (this._tabScrollItem.getChildByName("itemBg")) {
                var baseBitmap_1 = this._tabScrollItem.getChildByName("itemBg");
                baseBitmap_1.texture = ResourceManager.getRes("btn_normal_yellow_down");
                var colorMatrix = [
                    1, 0, 0, 0, 7,
                    0, 1, 0, 0, 21,
                    0, 0, 1, 0, 48,
                    0, 0, 0, 1, 0
                ];
                var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
                baseBitmap_1.filters = [colorFlilter];
            }
        }
        this._tabScrollItem = this._tabScrollList.getItemByIndex(tabIndex);
        var baseBitmap = this._tabScrollItem.getChildByName("itemBg");
        baseBitmap.texture = ResourceManager.getRes("btn_normal_yellow");
        baseBitmap.filters = null;
    };
    ServerListPopupView.prototype.getResourceList = function () {
        var resArr = [
            "public_9_bg3", "public_9_bg4",
            "public_9_probiginnerbg"
        ];
        if (PlatformManager.getGameArea()) {
            resArr.push(ButtonConst.BTN_TAB);
        }
        return _super.prototype.getResourceList.call(this).concat(resArr);
    };
    ServerListPopupView.prototype.dispose = function () {
        this._tabIndex = -1;
        this._tabScrollList = null;
        this._serverScrollList = null;
        this._tabScrollItem = null;
        this._allServerList.length = 0;
        this._myScrollList = null;
        _super.prototype.dispose.call(this);
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_CLOSE_SEVERLISTPOPUPVIEW);
    };
    return ServerListPopupView;
}(PopupView));
__reflect(ServerListPopupView.prototype, "ServerListPopupView");
//# sourceMappingURL=ServerListPopupView.js.map