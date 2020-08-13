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
/**
 * 联盟
 * author dky
 * date 2017/11/27
 * @class AllianceCreateView
 */
var AllianceCreateView = (function (_super) {
    __extends(AllianceCreateView, _super);
    function AllianceCreateView() {
        return _super.call(this) || this;
    }
    AllianceCreateView.prototype.getRequestData = function () {
        return { requestType: NetRequestConst.REQUEST_ALLIANCE_INITALLIANCE, requestData: {} };
    };
    AllianceCreateView.prototype.initView = function () {
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_USERINFO, this.checkData, this);
        var bottomBg = BaseLoadBitmap.create("alliance_bg2");
        bottomBg.x = 0;
        bottomBg.y = -15;
        this.addChildToContainer(bottomBg);
        var npcPic = BaseLoadBitmap.create("servant_full_1031");
        npcPic.x = 0;
        npcPic.y = GameConfig.stageHeigth - this.container.y - 467;
        this.addChildToContainer(npcPic);
        this._child_wordbg = BaseBitmap.create("public_9v_bg11");
        this._child_wordbg.x = 60;
        this._child_wordbg.y = npcPic.y - 100;
        this._child_wordbg.width = 320;
        this._child_wordbg.height = 78;
        if (PlatformManager.checkIsKRSp() || PlatformManager.checkIsKRNewSp()) {
            this._child_wordbg.height = 100;
        }
        if (PlatformManager.checkIsTextHorizontal()) {
            this._child_wordbg.height = 118;
        }
        this.addChildToContainer(this._child_wordbg);
        // this._child_wordbgCor = BaseBitmap.create("public_9_bg25_tail");
        // this._child_wordbgCor.x = 260;
        // this._child_wordbgCor.y = this._child_wordbg.y + this._child_wordbg.height - 3;
        // this.addChildToContainer(this._child_wordbgCor);
        var words = LanguageManager.getlocal("allianceCreateTip1");
        var myAllianceVo = Api.allianceVoApi.getMyAllianceVo();
        if (myAllianceVo.nextt - GameData.serverTime > 0) {
            words = LanguageManager.getlocal("allianceMemberQuitNextT", [App.DateUtil.getFormatBySecond(myAllianceVo.nextt - GameData.serverTime, 1)]);
        }
        this._childWordsText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        this._childWordsText.text = words;
        this._childWordsText.x = this._child_wordbg.x + 20;
        this._childWordsText.y = this._child_wordbg.y + 20;
        this._childWordsText.width = 280;
        this._childWordsText.height = 80;
        this.addChildToContainer(this._childWordsText);
        //按钮背景
        var btnBg = BaseBitmap.create("public_9v_bg10");
        btnBg.width = 180;
        btnBg.height = 270;
        btnBg.x = 430;
        btnBg.y = npcPic.y + 120;
        this.addChildToContainer(btnBg);
        //创建按钮
        var createBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "allianceCreateCreateBtn", this.createHander, this);
        createBtn.x = btnBg.x + btnBg.width / 2 - createBtn.width / 2;
        createBtn.y = btnBg.y + 19;
        // createBtn.setColor(TextFieldConst.COLOR_BLACK);
        this.addChildToContainer(createBtn);
        //随机按钮
        var randomBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "allianceCreateRandomBtn", this.randomJoinHander, this);
        randomBtn.x = createBtn.x;
        randomBtn.y = createBtn.y + createBtn.height + 10;
        // randomBtn.setColor(TextFieldConst.COLOR_BLACK);
        this.addChildToContainer(randomBtn);
        //查询按钮
        var searchBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "allianceCreateSearchBtn", this.findHander, this);
        searchBtn.x = createBtn.x;
        searchBtn.y = randomBtn.y + randomBtn.height + 10;
        // searchBtn.setColor(TextFieldConst.COLOR_BLACK); 
        this.addChildToContainer(searchBtn);
        //排行按钮
        var rankBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "allianceCreateRankBtn", this.rankHander, this);
        rankBtn.x = createBtn.x;
        rankBtn.y = searchBtn.y + searchBtn.height + 10;
        // rankBtn.setColor(TextFieldConst.COLOR_BLACK);
        this.addChildToContainer(rankBtn);
    };
    AllianceCreateView.prototype.tick = function () {
        var words = LanguageManager.getlocal("allianceCreateTip1");
        var myAllianceVo = Api.allianceVoApi.getMyAllianceVo();
        if (myAllianceVo.nextt - GameData.serverTime > 0) {
            words = LanguageManager.getlocal("allianceMemberQuitNextT", [App.DateUtil.getFormatBySecond(myAllianceVo.nextt - GameData.serverTime, 1)]);
        }
        this._childWordsText.text = words;
    };
    AllianceCreateView.prototype.checkData = function () {
        if (Api.playerVoApi.getPlayerAllianceId() > 0 && NetManager.curReceiveCmd != NetRequestConst.REQUEST_ALLIANCE_JOINRANDALLIANCE) {
            this.hide();
        }
    };
    AllianceCreateView.prototype.createHander = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCECREATEPOPUPVIEW, { callback: this.creatCallback, handler: this });
    };
    AllianceCreateView.prototype.randomJoinHander = function () {
        var myAllianceVo = Api.allianceVoApi.getMyAllianceVo();
        if (myAllianceVo.nextt - GameData.serverTime > 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("allianceJoinTip"));
            return;
        }
        this.request(NetRequestConst.REQUEST_ALLIANCE_JOINRANDALLIANCE, {});
    };
    AllianceCreateView.prototype.findHander = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCEFINDPOPUPVIEW, { callback: this.creatCallback, handler: this });
    };
    AllianceCreateView.prototype.rankHander = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCERANKPOPUPVIEW, { callback: this.creatCallback, handler: this });
    };
    AllianceCreateView.prototype.creatCallback = function () {
        Api.chatVoApi.clearChat();
        NetManager.chatServerLogin(null, null);
        this.hide();
        ViewController.getInstance().openView(ViewConst.COMMON.ALLIANCEVIEW, { type: 1 });
    };
    //请求回调
    AllianceCreateView.prototype.receiveData = function (data) {
        if (!data.ret) {
            return;
        }
        if (data.data.data.allianceFlag == 4) {
            App.CommonUtil.showTip(LanguageManager.getlocal("allianceErrorMsg4"));
            return;
        }
        if (data.data.cmd == NetRequestConst.REQUEST_ALLIANCE_JOINRANDALLIANCE) {
            this.hide();
            if (Api.playerVoApi.getPlayerAllianceId() > 0) {
                Api.chatVoApi.clearChat();
                NetManager.chatServerLogin(null, null);
                ViewController.getInstance().openView(ViewConst.COMMON.ALLIANCEVIEW, { type: 2 });
            }
        }
    };
    // protected getResourceList():string[]
    // {
    // 	return super.getResourceList().concat([
    // 				"alliance_bg2",
    // 				]);
    // }
    AllianceCreateView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_USERINFO, this.checkData, this);
        this._child_wordbg = null;
        // this._child_wordbgCor = null;
        this._childWordsText = null;
        _super.prototype.dispose.call(this);
    };
    return AllianceCreateView;
}(CommonView));
__reflect(AllianceCreateView.prototype, "AllianceCreateView");
