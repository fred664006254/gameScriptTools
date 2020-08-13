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
var EmperorwarReplayPopupView = (function (_super) {
    __extends(EmperorwarReplayPopupView, _super);
    function EmperorwarReplayPopupView() {
        var _this = _super.call(this) || this;
        _this._reportVoApi = null;
        return _this;
    }
    EmperorwarReplayPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "emphfangbg",
            "atkrace_vs",
            "atkracecross_win",
            "atkracecross_loss",
        ]);
    };
    EmperorwarReplayPopupView.prototype.getRequestData = function () {
        return { requestType: NetRequestConst.REQUEST_EMPEROR_GETFIGHTLOG, requestData: { pos: this.param.data.id, version: Api.emperorwarVoApi.getVersion() } };
        // this.param = {data: {id:2}};
        // return {requestType:NetRequestConst.REQUEST_EMPEROR_GETFIGHTLOG,requestData:{pos:this.param.data.id,version:1530403200}};
    };
    EmperorwarReplayPopupView.prototype.receiveData = function (data) {
        if (data.ret == true && data.data && data.data.data.log) {
            this._reportVoApi = new EmperorwarReportVoApi();
            if (data.data.data.log.length < 1) {
                this.requestLoadError();
                return;
            }
            this._reportVoApi.formatData(data.data.data.log);
        }
    };
    EmperorwarReplayPopupView.prototype.initView = function () {
        var replayBg = BaseBitmap.create("emphfangbg");
        replayBg.setPosition(this.viewBg.width / 2 - replayBg.width / 2, 0);
        this.addChildToContainer(replayBg);
        this.container.height = replayBg.height;
        var vsIcon = BaseBitmap.create("atkrace_vs");
        vsIcon.setScale(130 / vsIcon.width);
        vsIcon.setPosition(this.viewBg.width / 2 - vsIcon.width / 2 * vsIcon.scaleX, replayBg.y + 30);
        this.addChildToContainer(vsIcon);
        var lun = Number(this.param.data.id);
        if (lun <= 4) {
            lun = 1;
        }
        else if (lun <= 6) {
            lun = 2;
        }
        else {
            lun = 3;
        }
        var someFight = ComponentManager.getTextField(LanguageManager.getlocal("emperorWarSomeFight", [String(lun)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        someFight.setPosition(this.viewBg.width / 2 - someFight.width / 2, replayBg.y + 15);
        this.addChildToContainer(someFight);
        var resultIcon1;
        var resultIcon2;
        if (this._reportVoApi.getBattleWin() == 1) {
            resultIcon1 = "atkracecross_win";
            resultIcon2 = "atkracecross_loss";
        }
        else {
            resultIcon2 = "atkracecross_win";
            resultIcon1 = "atkracecross_loss";
        }
        var result1 = BaseBitmap.create(resultIcon1);
        result1.setPosition(185 + GameData.popupviewOffsetX, replayBg.y + 120);
        this.addChildToContainer(result1);
        var result2 = BaseBitmap.create(resultIcon2);
        result2.setPosition(350 + GameData.popupviewOffsetX, result1.y);
        this.addChildToContainer(result2);
        var info = this._reportVoApi.getCompetitorInfo(1);
        // let playerHead1 = Api.playerVoApi.getPlayerCircleHead(info[0].pic,info[0].phototitle);
        var playerHead1 = Api.playerVoApi.getPlayerCircleHead(info[0].pic, info[0].phototitle);
        playerHead1.setPosition(25 + GameData.popupviewOffsetX, replayBg.y + 35);
        this.addChildToContainer(playerHead1);
        if (info[1].pic) {
            // let playerHead2 = Api.playerVoApi.getPlayerCircleHead(info[1].pic,info[1].phototitle);
            var playerHead2 = Api.playerVoApi.getPlayerCircleHead(info[1].pic, info[1].phototitle);
            playerHead2.setPosition(this.viewBg.width - playerHead2.width - 25 - GameData.popupviewOffsetX, playerHead1.y);
            this.addChildToContainer(playerHead2);
        }
        var playerName1 = ComponentManager.getTextField(info[0].name, TextFieldConst.FONTSIZE_CONTENT_COMMON);
        playerName1.setPosition(25 + GameData.popupviewOffsetX, replayBg.y + 140);
        this.addChildToContainer(playerName1);
        var playerName2 = ComponentManager.getTextField(info[1].name ? info[1].name : LanguageManager.getlocal("nothing"), TextFieldConst.FONTSIZE_CONTENT_COMMON);
        playerName2.setPosition(this.viewBg.width - playerName2.width - 25 - GameData.popupviewOffsetX, playerName1.y);
        this.addChildToContainer(playerName2);
        if (playerName1.width < 86) {
            playerName1.x = 25 + (86 - playerName1.width) / 2 + GameData.popupviewOffsetX;
        }
        if (playerName2.width < 120) {
            playerName2.x = this.viewBg.width - playerName2.width - 25 - (120 - playerName2.width) / 2 - GameData.popupviewOffsetX;
        }
        var rankpower1 = ComponentManager.getTextField(LanguageManager.getlocal("rankpower") + ":" + info[0].power, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        rankpower1.setPosition(replayBg.x + 142 - rankpower1.width / 2, replayBg.y + 184);
        this.addChildToContainer(rankpower1);
        var pwer2 = info[1].power ? info[1].power : 0;
        var rankpower2 = ComponentManager.getTextField(LanguageManager.getlocal("rankpower") + ":" + pwer2, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        rankpower2.setPosition(replayBg.x + replayBg.width - 142 - rankpower2.width / 2, rankpower1.y);
        this.addChildToContainer(rankpower2);
        var popular1 = ComponentManager.getTextField(LanguageManager.getlocal("emperorWarPopular") + ":" + info[0].cheer, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        popular1.setPosition(replayBg.x + 142 - popular1.width / 2, replayBg.y + 208);
        this.addChildToContainer(popular1);
        var cheer2 = info[1].cheer ? info[1].cheer : 0;
        var popular2 = ComponentManager.getTextField(LanguageManager.getlocal("emperorWarPopular") + ":" + cheer2, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        popular2.setPosition(replayBg.x + replayBg.width - 142 - popular2.width / 2, popular1.y);
        this.addChildToContainer(popular2);
        var beatStr;
        if (info[1].name) {
            if (this._reportVoApi.getBattleWin() == 1) {
                beatStr = LanguageManager.getlocal("emperorWarBeat", [info[0].name, info[1].name]);
            }
            else {
                beatStr = LanguageManager.getlocal("emperorWarBeat", [info[1].name, info[0].name]);
            }
        }
        else {
            beatStr = LanguageManager.getlocal("emperorWarBeat2", [info[0].name]);
        }
        var beat = ComponentManager.getTextField(beatStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        beat.width = 520;
        beat.textAlign = egret.HorizontalAlign.CENTER;
        beat.setPosition(this.viewBg.width / 2 - beat.width / 2, replayBg.y + 265);
        this.addChildToContainer(beat);
        var replayBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "emperorWarReplay", this.doReplay, this);
        replayBtn.setPosition(this.viewBg.width / 2 - replayBtn.width / 2, beat.y + beat.height + 21);
        this.addChildToContainer(replayBtn);
        if (!info[0].name || !info[1].name) {
            replayBtn.setEnable(false);
        }
        if (PlatformManager.checkIsEnSp()) {
            replayBtn.setPosition(this.viewBg.width / 2 - replayBtn.width / 2, beat.y + beat.height + 14);
        }
    };
    EmperorwarReplayPopupView.prototype.doReplay = function () {
        ViewController.getInstance().openView(ViewConst.BATTLE.EMPERORWARBATTLEVIEW, { voApi: this._reportVoApi });
    };
    EmperorwarReplayPopupView.prototype.getTitleStr = function () {
        return "emperorWarReplay";
    };
    EmperorwarReplayPopupView.prototype.getBgExtraHeight = function () {
        return 2;
    };
    EmperorwarReplayPopupView.prototype.dispose = function () {
        this._reportVoApi = null;
        _super.prototype.dispose.call(this);
    };
    return EmperorwarReplayPopupView;
}(PopupView));
__reflect(EmperorwarReplayPopupView.prototype, "EmperorwarReplayPopupView");
//# sourceMappingURL=EmperorwarReplayPopupView.js.map