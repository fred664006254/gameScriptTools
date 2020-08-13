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
 * 自动选择门课客item
 * author ycg
 * date 2020.3.2
 * @class BookroomAutoSelServantScrollItem
 */
var BookroomAutoSelServantScrollItem = (function (_super) {
    __extends(BookroomAutoSelServantScrollItem, _super);
    function BookroomAutoSelServantScrollItem() {
        var _this = _super.call(this) || this;
        _this._servantId = "";
        _this._isSelect = false;
        _this._selectBg = null;
        return _this;
    }
    BookroomAutoSelServantScrollItem.prototype.initItem = function (index, servantId, itemParam) {
        this._servantId = servantId;
        var servantInfoObj = Api.servantVoApi.getServantObj(this._servantId);
        var bottomBg = BaseBitmap.create("public_9_probiginnerbg");
        bottomBg.width = 510;
        bottomBg.height = 120;
        bottomBg.x = 9;
        this.addChild(bottomBg);
        var deltaScale = 0.55;
        var cardbg = BaseLoadBitmap.create(servantInfoObj.qualityBoxImgPath);
        cardbg.width = 194;
        cardbg.height = 192;
        cardbg.setScale(deltaScale);
        cardbg.x = 20;
        cardbg.y = 8;
        cardbg.name = "cardbg";
        this.addChild(cardbg);
        var servantImg = BaseLoadBitmap.create(servantInfoObj.halfImgPath);
        servantImg.width = 180;
        servantImg.height = 177;
        servantImg.x = cardbg.x + cardbg.width / 2 - servantImg.width / 2 - 5;
        servantImg.y = cardbg.y + cardbg.height / 2 - servantImg.height / 2 - 2;
        servantImg.setScale(deltaScale);
        this.addChild(servantImg);
        var nameTxt = ComponentManager.getTextField("", 20);
        nameTxt.textColor = ServantScrollItem.getQualityColor(servantInfoObj.clv);
        nameTxt.text = servantInfoObj.servantName;
        nameTxt.x = cardbg.x + cardbg.width * deltaScale + 10;
        nameTxt.y = 13;
        this.addChild(nameTxt);
        var lvTxt = ComponentManager.getTextField(LanguageManager.getlocal("bookRoomServantLevel", ["" + servantInfoObj.level]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        lvTxt.setPosition(nameTxt.x, nameTxt.y + nameTxt.height + 4);
        this.addChild(lvTxt);
        // let ability = servantInfoObj.getAbilityIdList();
        // let totalBookV = 0;
        // for (let i= 0; i < ability.length; i++) {
        // 	let aid = ability[i];
        // 	let tmpAcfg = GameConfig.config.abilityCfg[aid];
        // 	let aLv:number =0;
        //     tmpAcfg = GameConfig.config.abilityCfg[aid];
        //     let servantCfg = GameConfig.config.servantCfg[this._servantId];
        //     let tmpability = servantCfg.ability;
        //     let oriidx = tmpability.indexOf(aid) ;
        //     if( oriidx> -1){
        //         aLv = servantInfoObj.ability[String(oriidx)];
        //     }else{
        //         aLv = servantInfoObj.getSkinBookLv2(aid);
        //     }
        //     totalBookV += aLv * tmpAcfg.num;
        // }
        var bookExpTxt = ComponentManager.getTextField(LanguageManager.getlocal("bookRoomServantBookExp", ["" + servantInfoObj.abilityExp]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        bookExpTxt.setPosition(nameTxt.x, lvTxt.y + lvTxt.height + 4);
        this.addChild(bookExpTxt);
        var skillExpTxt = ComponentManager.getTextField("", 20);
        skillExpTxt.text = LanguageManager.getlocal("bookRoomServantSkillExp", [String(servantInfoObj.skillExp)]);
        skillExpTxt.x = nameTxt.x;
        skillExpTxt.y = bookExpTxt.y + bookExpTxt.height + 4;
        this.addChild(skillExpTxt);
        // 
        if (Api.bookroomVoApi.isStudying(this._servantId)) {
            var flagTxt = ComponentManager.getTextField("", 24);
            flagTxt.text = LanguageManager.getlocal("bookRoomServant_studyingTxt");
            flagTxt.x = bottomBg.x + bottomBg.width - 130;
            flagTxt.y = bottomBg.y + bottomBg.height / 2 - flagTxt.height / 2;
            ;
            this.addChild(flagTxt);
        }
        else {
            var selectBg = BaseBitmap.create("public_select");
            selectBg.setPosition(bottomBg.x + bottomBg.width - selectBg.width - 20, bottomBg.y + bottomBg.height / 2 - selectBg.height / 2);
            this.addChild(selectBg);
            selectBg.addTouchTap(this.selectBtnClick, this);
            this._selectBg = selectBg;
            if (itemParam.data) {
                for (var i = 0; i < itemParam.data.length; i++) {
                    if (String(itemParam.data[i]) == String(this._servantId)) {
                        this._isSelect = true;
                        this._selectBg.setRes("public_select_down");
                        break;
                    }
                }
            }
        }
    };
    BookroomAutoSelServantScrollItem.prototype.selectBtnClick = function (target, param) {
        var autoSelView = ViewController.getInstance().getView(ViewConst.POPUP.BOOKROOMAUTOSELECTSERVANTPOPUPVIEW);
        this._isSelect = !this._isSelect;
        var selBtnImg = "public_select";
        if (this._isSelect) {
            selBtnImg = "public_select_down";
            if (!autoSelView.isCanSelect()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("bookRoom_autoPosIsFull"));
                return;
            }
        }
        if (this._selectBg) {
            this._selectBg.setRes(selBtnImg);
        }
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_AUTOSTUDY_SELECTSERVANT, { servantId: this._servantId, isSelect: this._isSelect });
    };
    BookroomAutoSelServantScrollItem.prototype.studyHandler = function () {
        if (Api.bookroomVoApi.isStudying(this._servantId)) {
            App.CommonUtil.showTip(LanguageManager.getlocal("bookRoomServant_studying"));
            return;
        }
        // var posType:string =null;
        if (BookroomServantScrollItem._data) {
            var posId = BookroomServantScrollItem._posId;
            var info = Api.bookroomVoApi.getInfoByPosId(posId);
            if (posId > 300 && posId < 400 && info && info.lastet > 0 && info.lastet < GameData.serverTime) {
                App.CommonUtil.showTip(LanguageManager.getlocal("bookRoom_useSeatTip5"));
                return;
            }
        }
        // if(posType!=null)
        // {
        //     NetManager.request(NetRequestConst.REQUEST_BOOKROOM_STUDY,{servantid:this._servantId,pos:BookroomServantScrollItem._posId});
        // }
        // else
        // {
        NetManager.request(NetRequestConst.REQUEST_BOOKROOM_STUDY, { servantid: this._servantId, pos: BookroomServantScrollItem._posId + "" });
        // } 
    };
    BookroomAutoSelServantScrollItem.prototype.getSpaceX = function () {
        return 0;
    };
    /**
     * 不同格子Y间距
     */
    BookroomAutoSelServantScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    BookroomAutoSelServantScrollItem.prototype.dispose = function () {
        this._servantId = "";
        this._isSelect = false;
        this._selectBg = null;
        _super.prototype.dispose.call(this);
    };
    return BookroomAutoSelServantScrollItem;
}(ScrollListItem));
__reflect(BookroomAutoSelServantScrollItem.prototype, "BookroomAutoSelServantScrollItem");
//# sourceMappingURL=BookroomAutoSelServantScrollItem.js.map