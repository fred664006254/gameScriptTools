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
/*
author : qinajun
date : 2018.4.14
desc : 励精图治 等级奖励
*/
var AcBattlePassViewTab1 = (function (_super) {
    __extends(AcBattlePassViewTab1, _super);
    function AcBattlePassViewTab1() {
        var _this = _super.call(this) || this;
        //滑动列表
        _this._level = 0;
        _this._scrollList = null;
        _this._specialReward = null;
        _this._listBg = null;
        _this._lqBtnGroup = null;
        _this._topTip = null;
        _this._bottomTip = null;
        _this._tipTxt = null;
        _this._tempRect = null;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcBattlePassViewTab1.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattlePassViewTab1.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattlePassViewTab1.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattlePassViewTab1.prototype, "uiCode", {
        get: function () {
            var baseview = ViewController.getInstance().getView('AcBattlePassView');
            var code = baseview.getUiCode();
            return code;
        },
        enumerable: true,
        configurable: true
    });
    AcBattlePassViewTab1.prototype.getNewCode = function () {
        if (this.vo.isNewUi()) {
            return "8";
        }
        return this.getUiCode();
    };
    AcBattlePassViewTab1.prototype.initView = function () {
        var _this = this;
        var view = this;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BATTLEPASS_GETLVRWD), view.rewardCallback, view);
        var baseview = ViewController.getInstance().getView('AcBattlePassView');
        var code = baseview.getUiCode();
        var newcode = baseview.getNewCode();
        view.height = baseview.tabHeight;
        view.width = baseview.tabWidth;
        var listbg = BaseBitmap.create(App.CommonUtil.getResByCode("battlepassrewardbg", code));
        listbg.height = view.height - 20;
        // App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, listbg, view, [-2, 10]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, listbg, view, [-3, 5]);
        // if(Number(this.code) >= 3){
        // 	listbg.x = -11;
        // }
        view.addChild(listbg);
        view._listBg = listbg;
        if (this.vo.isNewUi()) {
            this.cfg.segmentation = 0;
            listbg.height = view.height - 95;
            var botbg = BaseBitmap.create("battlepassbotbg-" + this.getNewCode());
            botbg.x = GameConfig.stageWidth / 2 - botbg.width / 2;
            botbg.y = listbg.y + listbg.height - 5;
            view.addChild(botbg);
        }
        if (!this.vo.isNewUi()) {
            var levelbg = BaseBitmap.create("acwealthcomingview_numbg");
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, levelbg, listbg);
            view.addChild(levelbg);
            if (Number(this.code) >= 3) {
                levelbg.x = 0;
            }
            var levelTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acBattlePassRewardTxt", code)), 20, TextFieldConst.COLOR_BLACK);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, levelTxt, levelbg);
            view.addChild(levelTxt);
        }
        var rect = {
            1: { 1: { x: 90, width: 170, height: 85 }, 2: { x: 260, width: 355, height: 85 } },
            2: { 1: { x: 90, width: 175, height: 85 }, 2: { x: 265, width: 175, height: 85 }, 3: { x: 445, width: 175, height: 85 } },
            3: { 1: { x: 101, width: 170, height: 85 }, 2: { x: 273, width: 355, height: 85 } },
        };
        //--unlockBP:解锁的战令。Primary-初级。Intermediate-中级。Advanced-高级
        var levelarr = ["primary", "intermediate", "advanced"];
        var curBattleLevel = view.vo.getMyBattleLevel();
        for (var i in levelarr) {
            var unit = view.cfg.getBattleInfo(levelarr[i]);
            if (unit) {
                var level = 1;
                switch (unit.unlockBP) {
                    case "primary":
                        level = 1;
                        break;
                    case "intermediate":
                        level = 2;
                        break;
                    case "advanced":
                        level = 3;
                        break;
                }
                var tmp = null;
                if (!rect[code]) {
                    tmp = rect[3][level];
                }
                else {
                    tmp = rect[code][level];
                }
                var paramX = tmp.x;
                var title = BaseBitmap.create(App.CommonUtil.getResByCode("battlepassrewardtitle" + level, view.getNewCode()));
                title.setScale(0.8);
                title.name = "title" + level;
                view.addChild(title);
                var lockGroup = new BaseDisplayObjectContainer();
                lockGroup.width = Number(code) == 2 ? (level == 2 ? 180 : 175) : 357;
                lockGroup.height = 80;
                lockGroup.name = "lockgroup" + level;
                view.addChild(lockGroup);
                lockGroup.visible = curBattleLevel < level;
                lockGroup.addTouchTap(function () {
                    if (!view.vo.isInActivity()) {
                        App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acBattlePassExpiredUnlock", view.getUiCode())));
                        return;
                    }
                    if (Number(_this.code) > 1) {
                        ViewController.getInstance().openView(ViewConst.COMMON.ACBATTLEPASSUNLOCKNEWREWWARDVIEW, {
                            code: view.code,
                            aid: view.aid
                        });
                    }
                    else {
                        ViewController.getInstance().openView(ViewConst.COMMON.ACBATTLEPASSUNLOCKREWWARDVIEW, {
                            code: view.code,
                            aid: view.aid
                        });
                    }
                }, view);
                var lockmask = BaseBitmap.create("battlepassslockmask" + (Number(code) == 2 ? (level == 2 ? 2 : 1) : 1));
                lockmask.width = lockGroup.width;
                lockmask.height = lockGroup.height;
                App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, lockmask, lockGroup, [0, 0], true);
                lockGroup.addChild(lockmask);
                var lock = BaseBitmap.create(App.CommonUtil.getResByCode("battlepasstoplock", code));
                App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, lock, lockGroup, [Number(code) == 2 ? 20 : 50, 0], true);
                lockGroup.addChild(lock);
                if (lockGroup.visible) {
                    var shareEffect = ComponentManager.getCustomMovieClip("fenxiang_", 15, 1000 / 15);
                    shareEffect.setScale(1.55);
                    shareEffect.setPosition(lock.x + lock.width / 2 - 59 * shareEffect.scaleX / 2, lock.y + lock.height / 2 - 60 * shareEffect.scaleY / 2 - 2);
                    lockGroup.addChild(shareEffect);
                    shareEffect.playWithTime(0);
                    shareEffect.name = "shareEffect" + level;
                    if (this.vo.isNewUi()) {
                        shareEffect.visible = false;
                    }
                }
                var lockfnt = BaseBitmap.create(App.CommonUtil.getResByCode("battlepasslockfnt", code));
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, lockfnt, lock, [0, -lockfnt.height / 2 + 10]);
                lockGroup.addChild(lockfnt);
                if (lockGroup.visible) {
                    if (this.vo.isNewUi()) {
                        lockmask.visible = false;
                        lock.setScale(0.75);
                        lockfnt.visible = false;
                        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, lock, lockGroup, [20, 0]);
                        lock.y = 0;
                    }
                }
                var flag = BaseBitmap.create(App.CommonUtil.getResByCode("battlepassrewardget", code));
                flag.name = "flag" + level;
                view.addChild(flag);
                App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, flag, listbg, [paramX, 0]);
                flag.visible = false;
                if (this.vo.isNewUi()) {
                    if (levelarr[i] == "primary") {
                        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, flag, listbg, [paramX - 98, 0]);
                    }
                    else {
                        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, flag, listbg, [paramX - 88, 0]);
                    }
                }
                var tmpX = paramX + (Number(i) == 0 ? ((tmp.width - title.width * title.scaleX) / 2) : (Number(code) == 2 ? 105 : 135)); //paramX + ; 
                App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, title, listbg, [tmpX, (tmp.height - title.height * title.scaleY) / 2]);
                App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, lockGroup, listbg, [paramX + (Number(code) == 2 ? (level == 3 ? -3 : 0) : 0), Number(code) >= 3 ? 1 : 0]);
                if (!lockGroup.visible && Number(i) == 1) {
                    title.x = 368;
                }
                if (this.vo.isNewUi()) {
                    title.setScale(1);
                    if (Number(i) == 0) {
                        title.setPosition(20, 0);
                    }
                    else if (Number(i) == 1) {
                        title.setPosition(350, 0);
                    }
                }
            }
        }
        //解锁高级政令
        var btngroup = new BaseDisplayObjectContainer();
        view.addChild(btngroup);
        view._lqBtnGroup = btngroup;
        var btnstr = this.vo.isNewUi() ? "battlepassbuybtn-" + newcode : App.CommonUtil.getResByCode("battlepasslock", code);
        var btn = ComponentManager.getButton(btnstr, "", function () {
            if (!view.vo.isInActivity()) {
                App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acBattlePassExpiredUnlock", view.getUiCode())));
                return;
            }
            if (Number(_this.code) == 1) {
                ViewController.getInstance().openView(ViewConst.COMMON.ACBATTLEPASSUNLOCKREWWARDVIEW, {
                    code: view.code,
                    aid: view.aid
                });
            }
            else {
                ViewController.getInstance().openView(ViewConst.COMMON.ACBATTLEPASSUNLOCKNEWREWWARDVIEW, {
                    code: view.code,
                    aid: view.aid
                });
            }
        }, view);
        btngroup.addChild(btn);
        btn.name = "btn";
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, btngroup, listbg, [0, listbg.height + 25]);
        if (this.vo.isNewUi()) {
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, btngroup, listbg, [0, listbg.height + 115]);
        }
        btn.visible = view.vo.getMyBattleLevel() < 2;
        if (Number(this.code) >= 3) {
            if (Number(this.code) == 4 || Number(this.code) == 7) {
                btn.y = 4;
                btn.visible = true;
            }
            if (this.vo.isNewUi()) {
                var eff1 = ComponentManager.getCustomMovieClip("threekingdomsentereff", 10);
                eff1.width = 285;
                eff1.height = 85;
                btngroup.addChild(eff1);
                eff1.playWithTime(-1);
                eff1.blendMode = egret.BlendMode.ADD;
                eff1.setPosition(btn.x, btn.y);
                // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, eff1, btn);
            }
            else {
                var txt = BaseBitmap.create(App.CommonUtil.getResByCode("battlepasslocktxt", code));
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, txt, btn, [0, 29]);
                btngroup.addChild(txt);
                txt.name = "locktxt";
                if (Number(this.code) == 4 || Number(this.code) == 7) {
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, txt, btn, [0, 26]);
                }
                var framenum = 0;
                var effname = "acbattlepasslockeff" + (Number(this.getUiCode()) != 4 ? 3 : this.getUiCode());
                var bitmap = BaseBitmap.create(effname + "1");
                var eff1 = ComponentManager.getCustomMovieClip(effname, framenum);
                eff1.width = bitmap.width;
                eff1.height = bitmap.height;
                eff1.playWithTime(-1);
                btngroup.addChild(eff1);
                eff1.blendMode = egret.BlendMode.ADD;
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, eff1, btn);
            }
        }
        var tiptxtstr = this.vo.isNewUi() ? "battlepassbuybtn2-" + newcode : "battlepassreward";
        var tipTxt = ComponentManager.getButton(tiptxtstr, "", function () {
            if (Number(_this.code) == 1) {
                ViewController.getInstance().openView(ViewConst.COMMON.ACBATTLEPASSUNLOCKREWWARDVIEW, {
                    code: view.code,
                    aid: view.aid
                });
            }
            else {
                ViewController.getInstance().openView(ViewConst.COMMON.ACBATTLEPASSUNLOCKNEWREWWARDVIEW, {
                    code: view.code,
                    aid: view.aid
                });
            }
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, listbg, [0, listbg.height + 25]);
        view.addChild(tipTxt);
        view._tipTxt = tipTxt;
        tipTxt.visible = !view._lqBtnGroup.visible;
        if (this.vo.isNewUi()) {
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, listbg, [0, listbg.height + 115]);
        }
        var tmpRect = new egret.Rectangle(0, 0, 618, listbg.height - 195);
        if (this.vo.isNewUi()) {
            tmpRect.height = listbg.height - 80;
        }
        this._tempRect = tmpRect;
        var scrollList = ComponentManager.getScrollList(AcBattlePassViewTab1ScrollItem, [], tmpRect, view.code);
        view._scrollList = scrollList;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, listbg, [0, 90]);
        if (this.vo.isNewUi()) {
            view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, listbg, [0, 70]);
        }
        view.addChild(scrollList);
        scrollList.bindMoveCompleteCallback(function () {
            var level = Math.ceil(scrollList.scrollTop / 90 + ((tmpRect.height) / 90));
            view.freshBottomSpecialReward(level);
            //当前滑动到的等级
            var toplevel = Math.ceil(scrollList.scrollTop / 90);
            var have = false;
            for (var i = 1; i < toplevel; ++i) {
                if (i <= view.vo.getLevel() && i == (view.vo.getHaveGetLevel() + 1) && !view.vo.getLevelReward(i)) {
                    have = true;
                    break;
                }
            }
            view._topTip.visible = have;
            have = false;
            for (var i = (level + 1); i <= view.cfg.maxlevel; ++i) {
                if (i <= view.vo.getLevel() && i == (view.vo.getHaveGetLevel() + 1) && !view.vo.getLevelReward(i)) {
                    have = true;
                    break;
                }
            }
            view._bottomTip.visible = have;
        }, view);
        var listmask = BaseBitmap.create(App.CommonUtil.getResByCode("battlepassscrollmask", code));
        listmask.width = listbg.width;
        listmask.height = listbg.height - 185;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, listmask, listbg, [0, 90]);
        view.addChild(listmask);
        if (Number(this.code) >= 3) {
            listmask.x = 0;
        }
        if (this.vo.isNewUi()) {
            listmask.visible = false;
        }
        //当前等级最接近的特殊奖励展示
        var recentSpecialRewardInfo = view.cfg.getRecentSpecialReward(view.vo.getLevel());
        var specialReward = new AcBattlePassViewTab1ScrollItem();
        specialReward.initSpecialReward(recentSpecialRewardInfo, view.code);
        view._specialReward = specialReward;
        view.addChild(specialReward);
        view.setLayoutPosition(LayoutConst.horizontalCenterbottom, specialReward, listbg, [0, 5]);
        if (this.vo.isNewUi()) {
            view.setLayoutPosition(LayoutConst.horizontalCenterbottom, specialReward, listbg, [0, -95]);
        }
        var topTip = BaseBitmap.create("battlepasstoptip");
        view._topTip = topTip;
        topTip.visible = false;
        var bottomTip = BaseBitmap.create("battlepasstip");
        view._bottomTip = bottomTip;
        bottomTip.visible = false;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, topTip, listbg, [0, 90]);
        view.addChild(topTip);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, bottomTip, listbg, [0, 90]);
        view.addChild(bottomTip);
        if (this.vo.isNewUi()) {
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, topTip, listbg, [150, 5]);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, bottomTip, listbg, [150, 5]);
        }
        view.update(true);
        // let vo = this.vo;
    };
    AcBattlePassViewTab1.prototype.update = function (init) {
        var view = this;
        if (!view.vo) {
            return;
        }
        var code = view.uiCode;
        var objList = view.cfg.getBattlePassReward();
        var arr = view.updateArr(objList);
        view._scrollList.refreshData(arr, view.code);
        //解锁状况
        var levelarr = ["primary", "intermediate", "advanced"];
        var battleLevel = view.vo.getMyBattleLevel();
        var rect = {
            1: { 1: { x: 90, width: 170, height: 85 }, 2: { x: 260, width: 355, height: 85 } },
            2: { 1: { x: 90, width: 175, height: 85 }, 2: { x: 265, width: 175, height: 85 }, 3: { x: 445, width: 175, height: 85 } },
            3: { 1: { x: 96, width: 170, height: 85 }, 2: { x: 260, width: 355, height: 85 } },
        };
        for (var i = 1; i <= battleLevel; ++i) {
            var tmp = null;
            if (!rect[code]) {
                tmp = rect[3][i];
            }
            else {
                tmp = rect[code][i];
            }
            var paramX = tmp.x;
            //领取标记
            var flag = view.getChildByName("flag" + i);
            if (flag) {
                flag.visible = view.vo.checkRedPoint1;
            }
            var lockgroup = view.getChildByName("lockgroup" + i);
            var title = view.getChildByName("title" + i);
            var shareEffect = view.getChildByName("shareEffect" + i);
            if (title && lockgroup && lockgroup.visible) {
                lockgroup.visible = false;
                title.setRes(App.CommonUtil.getResByCode("battlepassrewardtitle" + i, view.getNewCode()));
                if (i == 2) {
                    title.x = 368;
                }
                if (this.vo.isNewUi()) {
                    title.setScale(1);
                    if (Number(i) == 1) {
                        title.setPosition(20, 0);
                    }
                    else if (Number(i) == 2) {
                        title.setPosition(350, 0);
                    }
                }
                if (shareEffect) {
                    shareEffect.dispose();
                    shareEffect = null;
                }
            }
        }
        var level = Math.ceil(view._scrollList.scrollTop / 90 + ((this._tempRect.height) / 90));
        var toplevel = Math.ceil(view._scrollList.scrollTop / 90);
        if (init) {
            toplevel = view.vo.getHaveGetLevel() + 1;
            level = Math.ceil(toplevel + (this._tempRect.height) / 90);
        }
        var have = false;
        for (var i = 1; i < toplevel; ++i) {
            if (i <= view.vo.getLevel() && i == (view.vo.getHaveGetLevel() + 1) && !view.vo.getLevelReward(i)) {
                have = true;
                break;
            }
        }
        view._topTip.visible = have;
        have = false;
        for (var i = (level + 1); i <= view.cfg.maxlevel; ++i) {
            if (i <= view.vo.getLevel() && i == (view.vo.getHaveGetLevel() + 1) && !view.vo.getLevelReward(i)) {
                have = true;
                break;
            }
        }
        view._bottomTip.visible = have;
        // //当前等级最接近的特殊奖励展示
        // if(view._topTip.visible || view._bottomTip.visible){
        // 	level = view.vo.getHaveGetLevel() + 1;
        // 	view._topTip.visible = view._bottomTip.visible = false;
        // }
        view.freshBottomSpecialReward(toplevel);
        view._scrollList.setScrollTopByIndex(Math.max(0, toplevel - 1));
        view._lqBtnGroup.visible = view.vo.getMyBattleLevel() < 2;
        view._tipTxt.visible = !view._lqBtnGroup.visible;
        if (Number(this.code) == 4 || Number(this.code) == 7) {
            view._tipTxt.visible = false;
            view._lqBtnGroup.visible = true;
            var txtimg = view._lqBtnGroup.getChildByName("locktxt");
            if (view.vo.getMyBattleLevel() >= 2) {
                txtimg.setRes("battlepasslocktxt2-4");
            }
        }
    };
    //底部特殊奖励展示
    AcBattlePassViewTab1.prototype.freshBottomSpecialReward = function (level) {
        var view = this;
        var recentSpecialRewardInfo = view.cfg.getRecentSpecialReward(level);
        view._specialReward.freshSpecialReward(recentSpecialRewardInfo, view.code);
    };
    AcBattlePassViewTab1.prototype.updateArr = function (arr) {
        var view = this;
        var vo = view.vo;
        var tmp = [];
        if (!vo) {
            return tmp;
        }
        /**
         *  --expNeed:升级需要经验
        --specialGift:特殊档位标识。1
        --primary:普通政令奖励
        --intermediate:黄金政令奖励
        --advanced:传世政令奖励
        */
        for (var i in arr) {
            var unit = arr[i];
            tmp.push({
                expNeed: unit.expNeed,
                specialGift: unit.specialGift,
                primary: unit.primary,
                intermediate: unit.intermediate,
                advanced: unit.advanced,
                level: Number(i) + 1,
                special1: unit.special1,
                special2: unit.special2,
                special3: unit.special3,
            });
        }
        return tmp;
        // let arr1=[];
        // let arr2=[];
        // let arr3=[];
        // for(var i:number= 0;i<arr.length; i++){
        // 	let questType = arr[i].questType;
        // 	let taskNum = vo.getTaskValue(questType); 
        // 	if(vo.isGetTaskReward(questType)){
        // 		arr1.push(arr[i]);
        // 	}
        // 	else{
        // 		if(taskNum>=arr[i].value)
        // 		{
        // 			arr2.push(arr[i]);
        // 		}
        // 		else
        // 		{
        // 			arr3.push(arr[i]);
        // 		} 
        // 	}
        // }
        // return arr2.concat(arr3).concat(arr1); 
    };
    AcBattlePassViewTab1.prototype.rewardCallback = function (evt) {
        var view = this;
        if (evt.data.ret) {
            var data = evt.data.data.data;
            var rewardStr = '';
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_CHANGE_IMG);
            if (data.special) {
                rewardStr = "1009_0_" + data.special + "_" + view.code;
            }
            if (data && data.rewards) {
                var rewards = data.rewards;
                if (data.special) {
                    rewardStr += "|" + rewards;
                }
                else {
                    rewardStr = rewards;
                }
                if (data.replacerewards) {
                    ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { replacerewards: data.replacerewards });
                }
                var item = view._scrollList.getItemByIndex(view.vo.selIdx);
                if (item) {
                    item.refreshItem();
                }
                var nextitem = view._scrollList.getItemByIndex(view.vo.selIdx + 1);
                if (nextitem) {
                    nextitem.refreshItem();
                }
                view.vo.selIdx = -1;
            }
            if (rewardStr != '') {
                var rewardList = GameData.formatRewardItem(rewardStr);
                App.CommonUtil.playRewardFlyAction(rewardList);
            }
            view.freshBottomSpecialReward(view.vo.getHaveGetLevel());
        }
    };
    AcBattlePassViewTab1.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BATTLEPASS_GETLVRWD), view.rewardCallback, view);
        view._specialReward = null;
        view._scrollList = null;
        view._level = 0;
        view._listBg = null;
        view._lqBtnGroup.dispose();
        view._lqBtnGroup = null;
        view._tipTxt = null;
        view._tempRect = null;
        _super.prototype.dispose.call(this);
    };
    return AcBattlePassViewTab1;
}(AcCommonViewTab));
__reflect(AcBattlePassViewTab1.prototype, "AcBattlePassViewTab1");
//# sourceMappingURL=AcBattlePassViewTab1.js.map