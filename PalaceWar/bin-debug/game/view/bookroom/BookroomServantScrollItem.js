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
 * 任务列表节点
 * author yanyuling
 * date 2017/10/28
 * @class BookroomServantScrollItem
 */
var BookroomServantScrollItem = (function (_super) {
    __extends(BookroomServantScrollItem, _super);
    function BookroomServantScrollItem() {
        var _this = _super.call(this) || this;
        _this._servantId = "";
        _this._mainTaskHandKey = null;
        return _this;
    }
    BookroomServantScrollItem.prototype.initItem = function (index, servantId) {
        var _this = this;
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
            var studyBtn_1 = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "bookRoomServant_study", this.studyHandler, this);
            studyBtn_1.x = bottomBg.x + bottomBg.width - 150;
            studyBtn_1.y = bottomBg.y + bottomBg.height / 2 - studyBtn_1.height / 2;
            this.addChild(studyBtn_1);
            egret.callLater(function () {
                var serIndex = Api.bookroomVoApi.getNotInStudyServantIndex();
                if (serIndex > -1 && serIndex == index) {
                    _this._mainTaskHandKey = App.MainTaskHandUtil.addHandNode(_this, studyBtn_1.x + studyBtn_1.width / 2 - 10, studyBtn_1.y + 10, [studyBtn_1], 502, true, function () {
                        this.parent.setChildIndex(this, 100);
                        return true;
                    }, _this);
                }
            }, this);
        }
    };
    BookroomServantScrollItem.prototype.studyHandler = function () {
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
    BookroomServantScrollItem.prototype.getSpaceX = function () {
        return 0;
    };
    /**
     * 不同格子Y间距
     */
    BookroomServantScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    BookroomServantScrollItem.prototype.dispose = function () {
        this._servantId = "";
        _super.prototype.dispose.call(this);
    };
    BookroomServantScrollItem._posId = 0;
    BookroomServantScrollItem._data = null;
    return BookroomServantScrollItem;
}(ScrollListItem));
__reflect(BookroomServantScrollItem.prototype, "BookroomServantScrollItem");
//# sourceMappingURL=BookroomServantScrollItem.js.map