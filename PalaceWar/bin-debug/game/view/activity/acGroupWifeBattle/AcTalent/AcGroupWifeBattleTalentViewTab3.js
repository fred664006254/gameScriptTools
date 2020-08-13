var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * 标签3 文思泉涌
 * author qianjun----wxz
 */
var AcGroupWifeBattleTalentViewTab3 = /** @class */ (function (_super) {
    __extends(AcGroupWifeBattleTalentViewTab3, _super);
    function AcGroupWifeBattleTalentViewTab3(data) {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this._allTalentTxt = null;
        _this._descTxt = null;
        _this._acTxt = null;
        _this._barWifeTxt = null;
        _this._barStatusTxt = null;
        _this._caiyiTxt = null;
        _this._caiqingTxt = null;
        _this._orderImg = null;
        _this._opTxt = null;
        _this._title = null;
        _this._isOrderDown = true;
        _this._isHaveBuff = null;
        _this.param = data;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcGroupWifeBattleTalentViewTab3.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcGroupWifeBattleTalentViewTab3.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    AcGroupWifeBattleTalentViewTab3.prototype.initView = function () {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_WIFEBATTLECROSS_CRASHMODEL, this.refreshList, this);
        var isHaveBuff = false;
        var h = 80;
        if (this.checkHaveBuff()) {
            isHaveBuff = true;
            h = 168;
        }
        var topBg = BaseBitmap.create("wifetalenttopbg");
        topBg.width = 614;
        topBg.x = 640 / 2 - topBg.width / 2;
        topBg.height = 200;
        topBg.y = 5;
        this.addChild(topBg);
        var acTime = this.vo.getAcLocalTime(true);
        this._acTxt = ComponentManager.getTextField(acTime, 20, TextFieldConst.COLOR_BLACK);
        this._acTxt.x = topBg.x + topBg.width / 2 - this._acTxt.width / 2;
        this._acTxt.y = topBg.y + 40;
        this.addChild(this._acTxt);
        var tiptxt = ComponentManager.getTextField(LanguageManager.getlocal("acGroupWifeBattleTalentTip1"), 20, TextFieldConst.COLOR_BLACK);
        tiptxt.x = this._acTxt.x + this._acTxt.width / 2 - tiptxt.width / 2;
        tiptxt.y = this._acTxt.y + this._acTxt.height + 5;
        tiptxt.lineSpacing = 5;
        tiptxt.textAlign = egret.HorizontalAlign.CENTER;
        this.addChild(tiptxt);
        var model = this.vo.wifebattlecross; //Api.wifebattleVoApi.wifebattleVo;
        var plusv = this.vo.test ? 0 : model.info.totaltactadd ? model.info.totaltactadd : 0;
        var allTalentStr = null;
        if (plusv == 0) {
            allTalentStr = LanguageManager.getlocal("wifeBattleAllTalentTxt1", [String(this.vo.test ? 0 : model.info.totaltalent)]);
        }
        else {
            allTalentStr = LanguageManager.getlocal("wifeBattleAllTalentTxt2", [String(this.vo.test ? 0 : model.info.totaltalent), String(plusv)]);
        }
        var rankBuff = 0;
        var titleBg2 = BaseBitmap.create("public_9_managebg");
        titleBg2.width = 560; //538
        titleBg2.height = 65; //666
        titleBg2.x = topBg.x + topBg.width / 2 - titleBg2.width / 2; //view.viewBg.x + view.viewBg.width/2 - contentBg.width/2;
        titleBg2.y = tiptxt.y + tiptxt.height + 10;
        this.addChild(titleBg2);
        ;
        if (this.checkHaveBuff()) {
            var wifeBattleBuff = this.cfg.wifeBattleBuff;
            var curlv = 1;
            var maxV = 0;
            var artsum = this.vo.test ? 0 : (model.info.artsum ? model.info.artsum : 0);
            for (var index = 0; index < wifeBattleBuff.length; index++) {
                var element = wifeBattleBuff[index];
                var artistryRange = element.artistryRange;
                if (artistryRange[0] <= artsum && artsum <= artistryRange[1]) {
                    rankBuff = element.rankBuff;
                    maxV = artistryRange[1];
                    break;
                }
                ++curlv;
            }
            var nextAdd = 0;
            var lvStr = "";
            var lvStr2 = "";
            var percV = 0;
            var percStr = "";
            if (curlv < wifeBattleBuff.length) {
                nextAdd = wifeBattleBuff[curlv - 1].rankBuff;
                lvStr = LanguageManager.getlocal("wifeTalent_bufftxt1", ["" + curlv]);
                lvStr2 = LanguageManager.getlocal("wifeTalent_bufftxt2", ["1", "" + nextAdd]);
                percV = artsum / maxV;
                percStr = artsum + "/" + maxV;
            }
            else {
                var paramStr = LanguageManager.getlocal("wifeSkillMaxShow");
                lvStr = LanguageManager.getlocal("wifeTalent_bufftxt1", [paramStr]);
                nextAdd = wifeBattleBuff[curlv - 1].rankBuff;
                lvStr2 = LanguageManager.getlocal("wifeTalent_bufftxt2", ["1", "" + nextAdd]);
                percV = 1.0;
                percStr = paramStr;
            }
            // if(curlv == )
            maxV += 1;
            //才情当前等级txt1
            var lvtxt1 = ComponentManager.getTextField(lvStr, 18, TextFieldConst.COLOR_WARN_YELLOW2);
            lvtxt1.setPosition(titleBg2.x + 15, titleBg2.y + 7);
            this.addChild(lvtxt1);
            var lvtxt2 = ComponentManager.getTextField(lvStr2, 18, TextFieldConst.COLOR_WARN_YELLOW2);
            lvtxt2.setPosition(lvtxt1.x + lvtxt1.width + 30, lvtxt1.y);
            this.addChild(lvtxt2);
            var progressBar = ComponentManager.getProgressBar("progress3", "progress3_bg", 460);
            progressBar.x = titleBg2.x + 7;
            progressBar.y = lvtxt1.y + lvtxt1.textHeight + 5;
            progressBar.setTextSize(18);
            progressBar.setPercentage(percV);
            progressBar.setText(percStr);
            this.addChild(progressBar);
            var ruleBtn = ComponentManager.getButton("btn_rule", "", this.showBuffLvUI, this, [wifeBattleBuff]);
            //ruleBtn.setScale(0.65);
            ruleBtn.x = progressBar.x + progressBar.width + 10;
            ruleBtn.y = titleBg2.y + (titleBg2.height - ruleBtn.height * ruleBtn.scaleY) / 2 + 3;
            this.addChild(ruleBtn);
            this["lvtxt1"] = lvtxt1;
            this["lvtxt2"] = lvtxt2;
            this["ruleBtn"] = ruleBtn;
            this["progressBar"] = progressBar;
            this["titleBg2"] = titleBg2;
        }
        //边框
        // let borderBg = BaseBitmap.create("public_9_bg32");
        // borderBg.width = 610;
        // borderBg.height =  GameConfig.stageHeigth - 143 - 215-40-8+20; //666
        // borderBg.x = 320-borderBg.width/2;
        // borderBg.y = topBg.y + topBg.height * topBg.scaleY + 8;
        // this.addChild(borderBg);
        var title = BaseBitmap.create("qingyuanitemtitlebg");
        title.width = 594;
        title.x = GameConfig.stageWidth / 2 - title.width / 2;
        title.y = topBg.y + topBg.height * topBg.scaleY + 5;
        ;
        this._title = title;
        this.addChild(title);
        this._barWifeTxt = ComponentManager.getTextField(LanguageManager.getlocal("wifeTalentPlusPopupViewLevel2"), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._barWifeTxt.x = title.x + 47;
        this._barWifeTxt.y = title.y + title.height / 2 - this._barWifeTxt.height / 2;
        this.addChild(this._barWifeTxt);
        this._barStatusTxt = ComponentManager.getTextField(LanguageManager.getlocal("wifeBattleAllBarStatus"), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._barStatusTxt.x = 198 - 19 - this._barStatusTxt.height / 2;
        this._barStatusTxt.y = title.y + title.height / 2 - this._barStatusTxt.height / 2;
        this.addChild(this._barStatusTxt);
        this._caiyiTxt = ComponentManager.getTextField(LanguageManager.getlocal("wifeTalentPlusPopupViewNum2"), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._caiyiTxt.x = 280 - 23 - this._caiyiTxt.height / 2;
        this._caiyiTxt.y = title.y + title.height / 2 - this._caiyiTxt.height / 2;
        this.addChild(this._caiyiTxt);
        this._caiqingTxt = ComponentManager.getTextField(LanguageManager.getlocal("wifeTalentPlusPopupViewEffect2"), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._caiqingTxt.x = 400 - 16 - this._caiqingTxt.height / 2;
        this._caiqingTxt.y = title.y + title.height / 2 - this._caiqingTxt.height / 2;
        this.addChild(this._caiqingTxt);
        this._opTxt = ComponentManager.getTextField(LanguageManager.getlocal("wifeBattleAllBarOp"), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._opTxt.x = 505;
        this._opTxt.y = title.y + title.height / 2 - this._opTxt.height / 2;
        this.addChild(this._opTxt);
        this._orderImg = ComponentManager.getButton("wifebattleview_updown", null, this.orderHandler, this, null, 3);
        this._orderImg.scaleY = -1;
        this._orderImg.x = this._caiqingTxt.x + this._caiqingTxt.width - 50;
        this._orderImg.y = title.y + title.height / 2 - this._orderImg.height * this._orderImg.scaleY / 2;
        // this._orderImg.y = title.y + title.height/2 - this._orderImg.height/2;
        this.addChild(this._orderImg);
        var rect = new egret.Rectangle(0, 0, title.width + 10, 720 - (1136 - GameConfig.stageHeigth));
        // let list = Api.dailytaskVoApi.getTaskIdListAfterSort();
        // let list = [];
        // if(Api.wifebattleVoApi.wifebattleVo.info && Api.wifebattleVoApi.wifebattleVo.info.tmpattr && Api.wifebattleVoApi.wifebattleVo.info.tmpattr.wifeadd_arr){
        // 	list = Api.wifebattleVoApi.wifebattleVo.info.tmpattr.wifeadd_arr;
        // }
        // list = list?list:[];
        // list.sort((a,b)=>{
        // 	return b.talentadd - a.talentadd;
        // });
        var infoList2 = [];
        if (this.vo.wifebattlecross && this.vo.wifebattlecross.info && this.vo.wifebattlecross.info.tmpattr && this.vo.wifebattlecross.info.tmpattr.wifeadd_arr) {
            for (var i in this.vo.wifebattlecross.info.tmpattr.wifeadd_arr) {
                var unit = this.vo.wifebattlecross.info.tmpattr.wifeadd_arr[i];
                var level = Number(Api.wifestatusVoApi.getWifestatusLevelById(unit.wid));
                if (level == 1) {
                    continue;
                }
                infoList2.push(unit);
            }
        }
        infoList2 = infoList2 ? infoList2 : [];
        infoList2.sort(function (a, b) {
            var levela = Number(Api.wifestatusVoApi.getWifestatusLevelById(a.wid));
            var levelb = Number(Api.wifestatusVoApi.getWifestatusLevelById(b.wid));
            if (levela == 1 && levelb > 1) {
                return 1;
            }
            else if (levelb == 1 && levela > 1) {
                return -1;
            }
            else {
                return b.talentadd - a.talentadd;
            }
        });
        // let wifelist = Api.wifeVoApi.getWifeInfoVoList();
        // for(let i in wifelist){
        // 	let unit = wifelist[i];
        // 	if(Api.wifestatusVoApi.getWifestatusLevelById(unit.id.toString()) == "1"){
        // 		infoList2.push(element);
        // 	}
        // }
        this._scrollList = ComponentManager.getScrollList(AcGroupWifeBattleTalentViewTab3Item, infoList2, rect, {
            aid: this.param.data.aid,
            code: this.param.data.code
        });
        this._scrollList.x = 320 - this._scrollList.width / 2;
        this._scrollList.y = title.y + title.height + 5;
        this.addChild(this._scrollList);
    };
    AcGroupWifeBattleTalentViewTab3.prototype.freshView = function () {
        var model = this.vo.wifebattlecross; //Api.wifebattleVoApi.wifebattleVo;
        var plusv = this.vo.test ? 0 : model.info.totaltactadd ? model.info.totaltactadd : 0;
        var rankBuff = 0;
        var wifeBattleBuff = this.cfg.wifeBattleBuff;
        var curlv = 1;
        var maxV = 0;
        var artsum = this.vo.test ? 0 : (model.info.artsum ? model.info.artsum : 0);
        for (var index = 0; index < wifeBattleBuff.length; index++) {
            var element = wifeBattleBuff[index];
            var artistryRange = element.artistryRange;
            if (artistryRange[0] <= artsum && artsum <= artistryRange[1]) {
                rankBuff = element.rankBuff;
                maxV = artistryRange[1];
                break;
            }
            ++curlv;
        }
        var nextAdd = 0;
        var lvStr = "";
        var lvStr2 = "";
        var percV = 0;
        var percStr = "";
        if (curlv < wifeBattleBuff.length) {
            nextAdd = wifeBattleBuff[curlv - 1].rankBuff;
            lvStr = LanguageManager.getlocal("wifeTalent_bufftxt1", ["" + curlv]);
            lvStr2 = LanguageManager.getlocal("wifeTalent_bufftxt2", ["1", "" + nextAdd]);
            percV = artsum / maxV;
            percStr = artsum + "/" + maxV;
        }
        else {
            nextAdd = wifeBattleBuff[curlv - 1].rankBuff;
            lvStr2 = LanguageManager.getlocal("wifeTalent_bufftxt2", ["1", "" + nextAdd]);
            var paramStr = LanguageManager.getlocal("wifeSkillMaxShow");
            lvStr = LanguageManager.getlocal("wifeTalent_bufftxt1", [paramStr]);
            percV = 1.0;
            percStr = paramStr;
        }
        // if(curlv == )
        maxV += 1;
        this["lvtxt1"].text = lvStr;
        this["lvtxt2"].text = lvStr2;
        this["progressBar"].setPercentage(percV);
        this["progressBar"].setText(percStr);
    };
    AcGroupWifeBattleTalentViewTab3.prototype.orderHandler = function () {
        this._isOrderDown = !this._isOrderDown;
        if (this._isOrderDown) {
            this._orderImg.scaleY = -1;
        }
        else {
            this._orderImg.scaleY = 1;
        }
        this._orderImg.y = this._title.y + this._title.height / 2 - this._orderImg.height * this._orderImg.scaleY / 2;
        this.refreshList(null);
    };
    AcGroupWifeBattleTalentViewTab3.prototype.showBuffLvUI = function (param) {
        ViewController.getInstance().openView(ViewConst.POPUP.ACCROSSSERVERWIFETALENTBUFFPOPUPVIEW, {
            aid: this.param.data.aid,
            code: this.param.data.code,
            data: param
        });
    };
    // private tick(){
    //     if(!this._acVo){
    //         this._acVo = this.getAcVo();
    //     }
    //     let t = this._acVo.et - GameData.serverTime  - 86400 * 1;
    //     if(t<0){
    //          App.CommonUtil.showTip(LanguageManager.getlocal("wifeTalentUpPopupViewAcOver"));
    //          this.hide();
    //     } 
    // }
    AcGroupWifeBattleTalentViewTab3.prototype.checkHaveBuff = function () {
        return true;
    };
    AcGroupWifeBattleTalentViewTab3.prototype.refreshWhenSwitchBack = function () {
        _super.prototype.refreshWhenSwitchBack.call(this);
        this.refreshList(null);
    };
    AcGroupWifeBattleTalentViewTab3.prototype.refreshList = function (evt) {
        if (evt) {
            var data = evt.data.data.data;
            this.vo.setWifebattleInfo(data.wifebattlecross);
        }
        var model = this.vo.wifebattlecross; //Api.wifebattleVoApi.wifebattleVo;
        var plusv = this.vo.test ? 0 : (model.info.totaltactadd ? model.info.totaltactadd : 0);
        var list = [];
        if (this.vo.wifebattlecross && this.vo.wifebattlecross.info && this.vo.wifebattlecross.info.tmpattr && this.vo.wifebattlecross.info.tmpattr.wifeadd_arr) {
            for (var i in this.vo.wifebattlecross.info.tmpattr.wifeadd_arr) {
                var unit = this.vo.wifebattlecross.info.tmpattr.wifeadd_arr[i];
                var level = Number(Api.wifestatusVoApi.getWifestatusLevelById(unit.wid));
                if (level == 1) {
                    continue;
                }
                list.push(unit);
            }
        }
        list = list ? list : [];
        if (this._isOrderDown) {
            list.sort(function (a, b) {
                var levela = Number(Api.wifestatusVoApi.getWifestatusLevelById(a.wid));
                var levelb = Number(Api.wifestatusVoApi.getWifestatusLevelById(b.wid));
                if (levela == 1 && levelb > 1) {
                    return 1;
                }
                else if (levelb == 1 && levela > 1) {
                    return -1;
                }
                else {
                    return b.talentadd - a.talentadd;
                }
            });
            this._scrollList.refreshData(list, {
                aid: this.param.data.aid,
                code: this.param.data.code
            });
        }
        else {
            list.sort(function (a, b) {
                var levela = Number(Api.wifestatusVoApi.getWifestatusLevelById(a.wid));
                var levelb = Number(Api.wifestatusVoApi.getWifestatusLevelById(b.wid));
                if (levela == 1 && levelb > 1) {
                    return 1;
                }
                else if (levelb == 1 && levela > 1) {
                    return -1;
                }
                else {
                    return a.talentadd - b.talentadd;
                }
            });
            this._scrollList.refreshData(list, {
                aid: this.param.data.aid,
                code: this.param.data.code
            });
        }
        this.freshView();
    };
    AcGroupWifeBattleTalentViewTab3.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_WIFEBATTLECROSS_CRASHMODEL, this.refreshList, this);
        this._scrollList = null;
        this._allTalentTxt = null;
        this._descTxt = null;
        this._barWifeTxt = null;
        this._barStatusTxt = null;
        this._caiyiTxt = null;
        this._caiqingTxt = null;
        this._orderImg = null;
        this._opTxt = null;
        this._title = null;
        this._isOrderDown = true;
        this._isHaveBuff = null;
        this._acTxt = null;
        _super.prototype.dispose.call(this);
    };
    return AcGroupWifeBattleTalentViewTab3;
}(CommonViewTab));
//# sourceMappingURL=AcGroupWifeBattleTalentViewTab3.js.map