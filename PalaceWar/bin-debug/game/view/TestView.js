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
var TestView = (function (_super) {
    __extends(TestView, _super);
    function TestView() {
        var _this = _super.call(this) || this;
        _this.nameCfgArr = null;
        return _this;
    }
    TestView.prototype.initView = function () {
        this.nameCfgArr = [];
        if (App.DeviceUtil.IsHtml5() || App.DeviceUtil.isRuntime2()) {
            this._curl = window.location.href;
            this._newurl = App.CommonUtil.getTestUrl();
            if (this._newurl != this._curl) {
                this.nameCfgArr.push({ "test": "进测试环境" });
            }
            else {
                console.log("already in test");
            }
        }
        this.nameCfgArr.push({ "pid": "用pid登录" });
        if (PlatformManager.checkIsWeiduan() && App.DeviceUtil.isAndroid() && PlatformManager.checkIsUseSDK() && PlatformManager.checkUseRSDKSocket() == false) {
            this.nameCfgArr.push({ "clientsocket": "使用壳子websocket" });
        }
        this.nameCfgArr.push({ "consolelog": "输出log" });
        this.nameCfgArr.push({ "vconsole": "打开调试工具" });
        if (App.DeviceUtil.isRuntime2()) {
            this.nameCfgArr.push({ "disnativerender": "禁用原生渲染" });
        }
        var sp = new BaseShape();
        sp.graphics.beginFill(0, 0.8);
        var w = 300;
        var h = 60 + (40 + 20) * this.nameCfgArr.length;
        sp.graphics.drawRoundRect((GameConfig.stageWidth - w) / 2, (GameConfig.stageHeigth - h) / 2, w, h, 20, 20);
        sp.graphics.endFill();
        this.addChildToContainer(sp);
        this._sp = sp;
        this.initTool();
    };
    TestView.prototype.initTool = function () {
        var maxH = 0;
        for (var i = 0; i < this.nameCfgArr.length; i++) {
            var iData = this.nameCfgArr[i];
            for (var key in iData) {
                var checkBox = ComponentManager.getCheckBox(iData[key]);
                checkBox.setPosition((GameConfig.stageWidth - this._sp.width) / 2 + 20, (GameConfig.stageHeigth - this._sp.height) / 2 + 30 + i * (20 + checkBox.height));
                checkBox.addTouchTap(this.testHandler, this, [key]);
                this.addChildToContainer(checkBox);
                if (key == "clientsocket") {
                    checkBox.setSelected(GameData.testUseClientSocket);
                }
            }
        }
    };
    TestView.prototype.testHandler = function (event, key) {
        var checkBox = event.target.parent;
        var ths = this;
        StatisticsHelper.reportOwnNameLog("select:" + key, "testcmd");
        switch (key) {
            case "test":
                LocalStorageManager.set("gametest1000", this._curl);
                if (App.DeviceUtil.isRuntime2()) {
                    RSDKHelper.setRuntime2State({ game_mark: "test" });
                }
                else {
                    window.location.href = this._newurl;
                }
                ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                    title: "itemUseConstPopupViewTitle",
                    msg: "已切换到测试环境，请清除进程后重新进入游戏。",
                    callback: this.hide,
                    handler: this,
                    needCancel: false
                });
                break;
            case "pid":
                this.createPanel(function (pid) {
                    LoginManager.setLoginByPID(pid);
                }, "进入游戏");
                break;
            case "clientsocket":
                GameData.testUseClientSocket = checkBox.checkSelected();
                this.hide();
            case "consolelog":
                App.LogUtil.isTestShowLog = true;
                this.hide();
            case "vconsole":
                App.ResourceUtil.loadSingleScript("./vconsole.min.js", function () {
                    var vConsole = new window["VConsole"]();
                    ths.hide();
                }, this);
                break;
            case "disnativerender":
                RSDKHelper.setRuntime2State({ disable_native_render: (checkBox.checkSelected() ? "yes" : "no") });
                break;
        }
    };
    TestView.prototype.createPanel = function (callback, btnStr) {
        var maskSp = new BaseShape();
        maskSp.graphics.beginFill(TextFieldConst.COLOR_BLACK, 0.5);
        maskSp.graphics.drawRect(0, 0, GameConfig.stageWidth, GameConfig.stageHeigth);
        maskSp.graphics.endFill();
        maskSp.touchEnabled = true;
        this.addChild(maskSp);
        var panel = new BaseDisplayObjectContainer();
        this.addChild(panel);
        var bg = new BaseShape();
        bg.graphics.beginFill(TextFieldConst.COLOR_BLACK, 1);
        bg.graphics.drawRect(0, 0, 400, 300);
        bg.graphics.endFill();
        panel.addChild(bg);
        panel.x = GameConfig.stageWidth / 2 - bg.width / 2;
        panel.y = GameConfig.stageHeigth / 2 - bg.height / 2;
        var pidBox = new Test.TestBox("PID:");
        pidBox.x = 20;
        pidBox.y = 50;
        panel.addChild(pidBox);
        // let zidBox:Test.TestBox = new Test.TestBox("ZID:")
        // zidBox.x=pidBox.x;
        // zidBox.y=pidBox.y+20+pidBox.height;
        // panel.addChild(zidBox);
        var ths = this;
        var confirmBtn = ComponentManager.getButton("loginres_btn3", "", function () {
            var pidStr = pidBox.getStr();
            if (callback && pidStr) {
                var msgCallback = function () {
                    App.MessageHelper.removeEventListener(MessageConst.MESSAGE_CLOSE_SEVERLISTPOPUPVIEW, msgCallback, ths);
                    callback(pidStr);
                    panel.dispose();
                    maskSp.dispose();
                    ths.hide();
                };
                App.MessageHelper.addEventListener(MessageConst.MESSAGE_CLOSE_SEVERLISTPOPUPVIEW, msgCallback, ths);
                ViewController.getInstance().openView(ViewConst.POPUP.SERVERLISTPOPUPVIEW);
            }
            else {
                if (!pidStr) {
                    egret.Tween.get(pidBox).to({ scaleX: 1.05, scaleY: 1.05 }, 150).to({ scaleX: 1, scaleY: 1 }, 150);
                }
                // if(!zidBox.getStr())
                // {
                // 	egret.Tween.get(zidBox).to({scaleX:1.05,scaleY:1.05},150).to({scaleX:1,scaleY:1},150);
                // }
            }
        }, this);
        confirmBtn.setText(btnStr, false);
        confirmBtn.x = panel.width / 2 - confirmBtn.width / 2;
        confirmBtn.y = panel.height - 70;
        panel.addChild(confirmBtn);
    };
    return TestView;
}(BaseView));
__reflect(TestView.prototype, "TestView");
var Test;
(function (Test) {
    var TestBox = (function (_super) {
        __extends(TestBox, _super);
        function TestBox(txtStr) {
            var _this = _super.call(this) || this;
            _this.init(txtStr);
            return _this;
        }
        TestBox.prototype.init = function (txtStr) {
            var usernameTF = new BaseTextField();
            usernameTF.text = txtStr;
            this.addChild(usernameTF);
            var usernameBg = new BaseShape();
            usernameBg.graphics.lineStyle(2, TextFieldConst.COLOR_LIGHT_RED);
            usernameBg.graphics.moveTo(0, 0);
            usernameBg.graphics.lineTo(250, 0);
            usernameBg.graphics.lineTo(250, 50);
            usernameBg.graphics.lineTo(0, 50);
            usernameBg.graphics.lineTo(0, 0);
            usernameBg.graphics.endFill();
            usernameBg.x = 110;
            usernameBg.y = usernameTF.y + usernameTF.height / 2 - usernameBg.height / 2;
            this.addChild(usernameBg);
            var usernameInput = new BaseTextField();
            usernameInput.type = egret.TextFieldType.INPUT;
            usernameInput.width = 230;
            usernameInput.height = usernameTF.height;
            usernameInput.x = usernameBg.x + 10;
            usernameInput.y = usernameBg.y + 10;
            usernameInput.name = "testInput";
            this.addChild(usernameInput);
        };
        TestBox.prototype.getStr = function () {
            var str = "";
            var txt = this.getChildByName("testInput");
            if (txt) {
                str = txt.text;
            }
            return str;
        };
        return TestBox;
    }(BaseDisplayObjectContainer));
    Test.TestBox = TestBox;
    __reflect(TestBox.prototype, "Test.TestBox");
})(Test || (Test = {}));
//# sourceMappingURL=TestView.js.map