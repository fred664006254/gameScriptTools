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
//
var WifeSkillPopupViewTab2 = (function (_super) {
    __extends(WifeSkillPopupViewTab2, _super);
    function WifeSkillPopupViewTab2(param) {
        var _this = _super.call(this) || this;
        _this._index = 0;
        _this.param = param;
        _this.initView();
        return _this;
    }
    // protected getListType():number
    // {
    // 	return 1;
    // }
    WifeSkillPopupViewTab2.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_WIFE_ARSKILLUPD, this.doGive, this);
        this._wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(WifeSkillPopupView.wifeId);
        var detailBg = BaseBitmap.create("popupview_bg4");
        detailBg.x = GameConfig.stageWidth / 2 - detailBg.width / 2 - 5;
        detailBg.y = 50;
        this.addChild(detailBg);
        //子嗣个数
        var childValue = LanguageManager.getlocal("wifeSkillPopupChildrenNum", [String(this._wifeInfoVo.child)]);
        var childrenValueText = ComponentManager.getTextField(childValue, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        childrenValueText.x = 135;
        childrenValueText.y = 80;
        this.addChild(childrenValueText);
        var artistryValue = LanguageManager.getlocal("wifeSkillPopupArtistry", [String(this._wifeInfoVo.artistry)]);
        var artistryText = ComponentManager.getTextField(artistryValue, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        artistryText.x = 372;
        artistryText.y = 80;
        this.addChild(artistryText);
        var cfg = Config.WifeCfg.getWifeCfgById(WifeSkillPopupView.wifeId);
        var serCfg = Config.ServantCfg.getServantItemById(cfg.servantId);
        var list = this._wifeInfoVo.cfg.getArtistrySkillList();
        // let newList:Array<any> =[]; 
        // if(PlatformManager.checkIsWxCfg())
        // {
        // 	newList = list;
        // }
        // else 
        // {
        // 	for(var i:number=0; i<list.length; i++)
        // 	{
        // 		if(list[i].condition)
        // 		{
        // 			newList.push(list[i]);
        // 		}
        // 	} 
        // } 
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 530, 480 + 90);
        this._scrollList = ComponentManager.getScrollList(WifeSkillScrollItem2, list, rect);
        this.addChild(this._scrollList);
        this._scrollList.setPosition(GameConfig.stageWidth / 2 - this._scrollList.width / 2 - 5, artistryText.y + artistryText.height + 20);
    };
    WifeSkillPopupViewTab2.prototype.doGive = function (event) {
        var data = event.data;
        this._index = data.index;
        this.request(NetRequestConst.REQUEST_WIFE_UPGRADEEXTRASKILL, { wifeId: this.param.data.id.toString(), key: data.index });
    };
    //请求回调
    WifeSkillPopupViewTab2.prototype.receiveData = function (data) {
        if (data.data.cmd == NetRequestConst.REQUEST_WIFE_UPGRADEEXTRASKILL) {
            if (data.data.data && data.data.data.rewards) {
                var rewards = GameData.formatRewardItem(data.data.data.rewards);
                if (rewards && rewards.length > 0) {
                    App.CommonUtil.playRewardFlyAction(rewards);
                }
            }
            var index = this._index;
            var wideItem = this._scrollList.getItemByIndex(index);
            wideItem.refreshData(index);
            // let id = this.param.data.id
            // this._wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(id);
            // let expStr = LanguageManager.getlocal("wifeExp") +  " " + this._wifeInfoVo.exp.toString();
            // this._text1.text = expStr;
            // this._text2.text = this._wifeInfoVo.glamour.toString();
            App.CommonUtil.showTip(LanguageManager.getlocal("wifeSkillUpdSuccess"));
        }
    };
    WifeSkillPopupViewTab2.prototype.dispose = function () {
        this._wifeInfoVo = null;
        // this._text1 = null;
        this._scrollList = null;
        this._index = 0;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_WIFE_ARSKILLUPD, this.doGive, this);
        _super.prototype.dispose.call(this);
    };
    return WifeSkillPopupViewTab2;
}(CommonViewTab));
__reflect(WifeSkillPopupViewTab2.prototype, "WifeSkillPopupViewTab2");
