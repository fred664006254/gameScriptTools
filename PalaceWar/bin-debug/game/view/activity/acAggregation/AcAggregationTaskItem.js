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
  * 任务item
  * author weixiaozhe
  * date 2020.5.12
  * @class AcAggregationTaskItem
  */
var AcAggregationTaskItem = (function (_super) {
    __extends(AcAggregationTaskItem, _super);
    function AcAggregationTaskItem() {
        var _this = _super.call(this) || this;
        _this._itemData = null;
        _this._aid = null;
        _this._code = null;
        return _this;
    }
    Object.defineProperty(AcAggregationTaskItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcAggregationTaskItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcAggregationTaskItem.prototype, "code", {
        get: function () {
            return this._code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcAggregationTaskItem.prototype, "aid", {
        get: function () {
            return this._aid;
        },
        enumerable: true,
        configurable: true
    });
    AcAggregationTaskItem.prototype.getTypeCode = function () {
        if (this.code == "2") {
            return "1";
        }
        return this.code;
    };
    /**
     * 初始化itemview
     */
    AcAggregationTaskItem.prototype.initItem = function (index, data, itemParam) {
        var _this = this;
        this._itemData = data;
        this._aid = itemParam.aid;
        this._code = itemParam.code;
        var itemBg = BaseBitmap.create("acaggregation_bot");
        this.width = itemBg.width;
        this.addChild(itemBg);
        var titleBg1 = BaseBitmap.create("acaggregation_itemtxt1");
        this.addChild(titleBg1);
        this.setLayoutPosition(LayoutConst.lefttop, titleBg1, itemBg, [95, 2]);
        var titleBg2 = BaseBitmap.create("acaggregation_itemtxt2");
        this.addChild(titleBg2);
        this.setLayoutPosition(LayoutConst.righttop, titleBg2, itemBg, [95, 2]);
        // let title1 = ComponentManager.getTextField(LanguageManager.getlocal("acAggregationItemTxt1"), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        // this.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter,title1,titleBg1,[0,0]);
        // this.addChild(title1);
        // let title2 = ComponentManager.getTextField(LanguageManager.getlocal("acAggregationItemTxt2"), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        // this.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter,title2,titleBg2,[0,0]);
        // this.addChild(title2);
        var cicle = BaseBitmap.create("acaggregation_cicle");
        this.setLayoutPosition(LayoutConst.horizontalCenterbottom, cicle, itemBg, [0, 15]);
        this.addChild(cicle);
        var cicleTxt = ComponentManager.getTextField(LanguageManager.getlocal("acAggregationItemTxt3"), 16, TextFieldConst.COLOR_BROWN);
        cicleTxt.lineSpacing = 3;
        this.setLayoutPosition(LayoutConst.horizontalCentertop, cicleTxt, cicle, [0, 35]);
        this.addChild(cicleTxt);
        var ptoKey = "acAggregationItemPro1";
        var curNum = this.vo.getAllianceNum();
        var needNum = data.taskValue;
        curNum = curNum > needNum ? needNum : curNum;
        if (curNum >= needNum) {
            ptoKey = "acAggregationItemPro2";
        }
        var cicleProTxt = ComponentManager.getTextField(LanguageManager.getlocal("acAggregationItemPro2", [String(curNum), String(needNum)]), 18, TextFieldConst.COLOR_BROWN);
        this.setLayoutPosition(LayoutConst.horizontalCenterbottom, cicleProTxt, cicle, [0, 45]);
        this.addChild(cicleProTxt);
        var scale = 0.6;
        var space = 5;
        var rewards1 = this._itemData.getReward1;
        var rewardIconList1 = GameData.getRewardItemIcons(rewards1, true, false);
        var container1 = new BaseDisplayObjectContainer();
        for (var i = 0; i < rewardIconList1.length; i++) {
            rewardIconList1[i].setScale(scale);
            rewardIconList1[i].x = i * rewardIconList1[i].width * scale + i * space;
            var childBg = rewardIconList1[i].getChildByName("numbg");
            if (childBg) {
                childBg.anchorOffsetX = childBg.width;
                childBg.anchorOffsetY = childBg.height;
                childBg.x += childBg.width;
                childBg.y += childBg.height;
                childBg.setScale(1.5);
            }
            var childTxt = rewardIconList1[i].getChildByName("numLb");
            if (childTxt) {
                childTxt.anchorOffsetX = childTxt.width;
                childTxt.anchorOffsetY = childTxt.height;
                childTxt.x += childTxt.width;
                childTxt.y += childTxt.height;
                childTxt.setScale(1.5);
            }
            container1.addChild(rewardIconList1[i]);
        }
        container1.x = titleBg1.x + titleBg1.width / 2 - container1.width / 2;
        container1.y = titleBg1.y + titleBg1.height + 15;
        this.addChild(container1);
        var rewards2 = this._itemData.getReward2;
        var rewardIconList2 = GameData.getRewardItemIcons(rewards2, true, false);
        var container2 = new BaseDisplayObjectContainer();
        for (var i = 0; i < rewardIconList2.length; i++) {
            rewardIconList2[i].setScale(scale);
            rewardIconList2[i].x = i * rewardIconList2[i].width * scale + i * space;
            container2.addChild(rewardIconList2[i]);
            var childBg = rewardIconList2[i].getChildByName("numbg");
            if (childBg) {
                childBg.anchorOffsetX = childBg.width;
                childBg.anchorOffsetY = childBg.height;
                childBg.x += childBg.width;
                childBg.y += childBg.height;
                childBg.setScale(1.5);
            }
            var childTxt = rewardIconList2[i].getChildByName("numLb");
            if (childTxt) {
                childTxt.anchorOffsetX = childTxt.width;
                childTxt.anchorOffsetY = childTxt.height;
                childTxt.x += childTxt.width;
                childTxt.y += childTxt.height;
                childTxt.setScale(1.5);
            }
        }
        container2.x = titleBg2.x + titleBg2.width / 2 - container2.width / 2;
        container2.y = titleBg2.y + titleBg2.height + 15;
        this.addChild(container2);
        var getImg1 = BaseBitmap.create("collectflag");
        getImg1.setScale(0.7);
        getImg1.x = container1.x + container1.width / 2 - getImg1.width * getImg1.scaleX / 2;
        getImg1.y = container1.y + container1.height / 2 - getImg1.height * getImg1.scaleY / 2;
        this.addChild(getImg1);
        var getImg2 = BaseBitmap.create("collectflag");
        getImg2.setScale(0.7);
        getImg2.x = container2.x + container2.width / 2 - getImg2.width * getImg2.scaleX / 2;
        getImg2.y = container2.y + container2.height / 2 - getImg2.height * getImg2.scaleY / 2;
        this.addChild(getImg2);
        getImg1.visible = getImg2.visible = false;
        var getBtn1 = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "taskCollect", function () {
            if ((!_this.vo.isStart)) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            if (Api.playerVoApi.getPlayerAllianceId() == 0) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acAggregationGetFailTips2"));
                return;
            }
            NetManager.request(NetRequestConst.REQUEST_AGGREGATION_GETRWD, { activeId: _this.vo.aidAndCode, rkey: Number(data.id) });
        }, this);
        getBtn1.x = container1.x + container1.width / 2 - getBtn1.width / 2;
        getBtn1.y = container1.y + container1.height + 10;
        this.addChild(getBtn1);
        var getBtn2 = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "taskCollect", function () {
            if ((!_this.vo.isStart)) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            if (Api.playerVoApi.getPlayerAllianceId() == 0) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acAggregationGetFailTips2"));
                return;
            }
            NetManager.request(NetRequestConst.REQUEST_AGGREGATION_GETRWD, { activeId: _this.vo.aidAndCode, rkey: Number(data.id) });
        }, this);
        getBtn2.x = container2.x + container2.width / 2 - getBtn2.width / 2;
        getBtn2.y = container2.y + container2.height + 10;
        this.addChild(getBtn2);
        getBtn1.visible = getBtn2.visible = false;
        var max = this.vo.getAllianceMaxNum() + this.cfg.maxGet;
        var left = max - this.vo.getNumById(data.id);
        var cur = this.vo.getNumById(data.id);
        var cangetTxt = ComponentManager.getTextField(LanguageManager.getlocal("acAggregationItemTxt4", [String(cur), String(max)]), 18, TextFieldConst.COLOR_WHITE);
        if (left <= 0) {
            cangetTxt.text = LanguageManager.getlocal("acAggregationItemTxt5");
        }
        cangetTxt.x = getBtn2.x + getBtn2.width / 2 - cangetTxt.width / 2;
        cangetTxt.y = itemBg.height - cangetTxt.height - 21;
        this.addChild(cangetTxt);
        var rewardPos = this.vo.isRewardTaskById(data.id);
        cangetTxt.visible = rewardPos > 0 || left <= 0;
        if (Api.playerVoApi.getPlayerAllianceId() == 0) {
            cangetTxt.visible = false;
        }
        if (rewardPos == 1 || data.isCreatorRwd != 0) {
            getImg1.visible = true;
        }
        if (rewardPos == 2) {
            getImg2.visible = true;
        }
        if (this.vo.isCanGetRewardById(data.id)) {
            if (Api.allianceVoApi.getMyAllianceVo().po == 1 && data.isCreatorRwd == 0) {
                getBtn1.visible = true;
            }
            else {
                getBtn2.visible = true;
            }
            cicle.setRes("acaggregation_cicle2");
        }
    };
    AcAggregationTaskItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcAggregationTaskItem.prototype.dispose = function () {
        this._itemData = null;
        this._aid = null;
        this._code = null;
        _super.prototype.dispose.call(this);
    };
    return AcAggregationTaskItem;
}(ScrollListItem));
__reflect(AcAggregationTaskItem.prototype, "AcAggregationTaskItem");
//# sourceMappingURL=AcAggregationTaskItem.js.map