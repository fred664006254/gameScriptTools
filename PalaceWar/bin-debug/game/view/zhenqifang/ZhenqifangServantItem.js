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
 *  门客布阵item
 * author qianjun
 */
var ZhenqifangServantItem = (function (_super) {
    __extends(ZhenqifangServantItem, _super);
    function ZhenqifangServantItem() {
        var _this = _super.call(this) || this;
        _this._info_g = null;
        _this._cardbg = null;
        _this._servantImg = null;
        _this._delBtn = null;
        _this._itemIndex = "";
        _this._empty_g = null;
        _this._addIcon = null;
        _this._selectIcon = null;
        _this._notTxt = null;
        _this._needTxt = null;
        _this._sxbg = null;
        _this._uid = 0;
        return _this;
    }
    ZhenqifangServantItem.prototype.initItem = function (index, data) {
        var view = this;
        view.cacheAsBitmap = true;
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_ZQF_SERVANT, this.checkBuzhen, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_ZQF_SELECT, this.checkSelect, this);
        view._data = data;
        view._itemIndex = data.index + "_" + index + "_" + data.friend;
        view.width = data.onlyshow ? (97 + 3) : (85 + 8);
        view.height = data.onlyshow ? 97 : 85;
        //门客信息
        view._curServantId = Number(data.servantID);
        var servantInfoObj = Api.servantVoApi.getServantObj(data.servantID);
        var servantQuality = '';
        var servantPic = '';
        var addIcon = BaseBitmap.create("childview_addicon");
        addIcon.setScale(data.onlyshow ? 0.97 : 0.85);
        view._addIcon = addIcon;
        if (data.empty) {
            servantQuality = "servant_cardbg_0";
            // servantPic = `childview_addicon`;
            addIcon.visible = true;
        }
        else {
            if (data.needfriend) {
                var equip = "";
                if (!data.equip || data.equip == "") {
                    equip = "servant_half_" + data.servantId;
                }
                else {
                    var skincfg = Config.ServantskinCfg.getServantSkinItemById(data.equip);
                    equip = skincfg.icon;
                }
                servantQuality = "servant_cardbg_" + data.clv;
                servantPic = equip;
            }
            else {
                servantQuality = servantInfoObj.qualityBoxImgPath;
                servantPic = servantInfoObj.halfImgPath;
            }
            addIcon.visible = false;
        }
        var cardbg = BaseLoadBitmap.create(servantQuality);
        cardbg.width = 194;
        cardbg.height = 192;
        cardbg.anchorOffsetX = cardbg.width / 2;
        cardbg.anchorOffsetY = cardbg.height / 2;
        cardbg.setScale(view.height / 194);
        cardbg.x = cardbg.anchorOffsetX * cardbg.scaleX;
        cardbg.y = cardbg.anchorOffsetY * cardbg.scaleY;
        view.addChild(cardbg);
        view._cardbg = cardbg;
        cardbg.addTouchTap(view.servantTouch, view);
        addIcon.x = data.onlyshow ? 19 : 16;
        addIcon.y = data.onlyshow ? 19 : 16;
        //App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, addIcon, cardbg);
        view._servantImg = BaseLoadBitmap.create(servantPic);
        view._servantImg.width = 180;
        view._servantImg.height = 177;
        view._servantImg.anchorOffsetX = view._servantImg.width / 2;
        view._servantImg.anchorOffsetY = view._servantImg.height / 2;
        view._servantImg.setScale((view.height - 7) / 180);
        view.addChild(view._servantImg);
        view._servantImg.x = cardbg.x;
        view._servantImg.y = cardbg.y;
        view._servantImg.addTouchTap(view.servantTouch, view);
        view._empty_g = new BaseDisplayObjectContainer();
        view._empty_g.width = view.width;
        view._empty_g.height = view.height;
        view.addChild(view._empty_g);
        view._info_g = new BaseDisplayObjectContainer();
        view._info_g.width = view.width;
        view._info_g.height = view.height;
        view.addChild(view._info_g);
        view.addChild(addIcon);
        var needcfg = data;
        if (needcfg.note) {
            var sxbg = BaseBitmap.create("battlepassfntbg-1");
            sxbg.width = view.height;
            view.addChild(sxbg);
            view._sxbg = sxbg;
            sxbg.x = 0;
            sxbg.y = data.onlyshow ? 65 : 57;
            var needTxt = ComponentManager.getTextField(LanguageManager.getlocal("zhenqifangnote" + needcfg.note, ["" + needcfg.requirement]), 18, TextFieldConst.COLOR_WARN_RED3);
            view.addChild(needTxt);
            view._needTxt = needTxt;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, needTxt, sxbg);
            var notTxt = ComponentManager.getTextField(LanguageManager.getlocal("zhenqifangnotmanzu"), 18, TextFieldConst.COLOR_WARN_RED3);
            view.addChild(notTxt);
            view._notTxt = notTxt;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, notTxt, sxbg);
            if (data.empty) {
                sxbg.visible = needTxt.visible = true;
                notTxt.visible = false;
            }
            else {
                sxbg.visible = needTxt.visible = notTxt.visible = false;
                var flag = false;
                if (data.needfriend) {
                    flag = data.deduction > 0;
                }
                else {
                    flag = servantInfoObj[needcfg.note] < needcfg.requirement[index];
                }
                if (flag) {
                    sxbg.visible = notTxt.visible = true;
                }
            }
        }
        var selectbg = BaseBitmap.create("itembg_selected");
        selectbg.setScale(0.9);
        view.addChild(selectbg);
        var delbtn = ComponentManager.getButton("discussclose", "", function () {
            if (data.needfriend) {
                if (!Api.zhenqifangVoApi.friendsendList[view._uid]) {
                    Api.zhenqifangVoApi.friendsendList[view._uid] = {};
                }
                if (Api.zhenqifangVoApi.friendsendList[view._uid][view._curServantId]) {
                    delete Api.zhenqifangVoApi.friendsendList[view._uid][view._curServantId];
                }
                if (Api.zhenqifangVoApi.friendobj[view._data.tabindex]) {
                    delete Api.zhenqifangVoApi.friendobj[view._data.tabindex][view._index];
                }
            }
            else {
                if (Api.zhenqifangVoApi.sendList.indexOf(view._curServantId) > -1) {
                    Api.zhenqifangVoApi.sendList.splice(Api.zhenqifangVoApi.sendList.indexOf(view._curServantId), 1);
                }
            }
            view.clearServant(true);
        }, view);
        delbtn.setScale(data.onlyshow ? 0.97 : 0.85);
        delbtn.x = data.onlyshow ? 71 : 65;
        ;
        delbtn.y = -6;
        view.addChild(delbtn);
        view._delBtn = delbtn;
        if (!data.empty) {
            view._empty_g.visible = false;
            view._info_g.visible = true;
            view._delBtn.visible = true;
            view.fresh_servant({ id: data.servantID, clv: data.clv, equip: data.equip }, false, true);
        }
        else {
            view._empty_g.visible = true;
            view._info_g.visible = false;
            view._delBtn.visible = false;
        }
        selectbg.visible = false;
        if (data.friend && data.needfriend) {
            var friendicon = BaseBitmap.create("zqffriendicon");
            friendicon.x = 0;
            friendicon.y = -8;
            view.addChild(friendicon);
        }
        view._selectIcon = selectbg;
        var isinevent = data.insend;
        if (isinevent) {
            view._delBtn.visible = false;
        }
    };
    ZhenqifangServantItem.prototype.setSelect = function (bool) {
        if (this._data.onlyshow) {
            this._selectIcon.visible = bool;
        }
    };
    ZhenqifangServantItem.prototype.getUid = function () {
        var uid = 0;
        var view = this;
        if (view._data.friend && view._data.needfriend && view._uid) {
            uid = view._uid;
        }
        return uid;
    };
    //能否领取全部奖励
    ZhenqifangServantItem.prototype.checkIsNotAllReward = function () {
        var view = this;
        var flag = view._notTxt && view._notTxt.visible;
        return flag;
    };
    ZhenqifangServantItem.prototype.addServant = function (params) {
        var view = this;
        view._servantImg.visible = true;
        view._servantImg.alpha = 1;
        var data = view._data;
        var servantId = Number(params.id);
        var uid = params.uid;
        view._uid = uid;
        view._curServantId = servantId;
        var servantInfoObj = Api.servantVoApi.getServantObj(params.id);
        //品质 头像 名称
        var servantQuality = '';
        var servantPic = '';
        if (data.needfriend) {
            var equip = "";
            if (!params.equip || params.equip == "") {
                equip = "servant_half_" + servantId;
            }
            else {
                var skincfg = Config.ServantskinCfg.getServantSkinItemById(params.equip);
                equip = skincfg.icon;
            }
            servantQuality = "servant_cardbg_" + params.clv;
            servantPic = equip;
        }
        view._cardbg.setload(servantQuality);
        view._servantImg.setload(servantPic);
        view._info_g.visible = true;
        view._delBtn.visible = true;
        var isinevent = data.insend;
        if (isinevent) {
            view._delBtn.visible = false;
        }
        view._servantImg.setPosition(view._cardbg.x, view._cardbg.y);
        view._addIcon.visible = false;
        if (view._sxbg) {
            view._sxbg.visible = view._needTxt.visible = view._notTxt.visible = false;
        }
        var needcfg = data;
        if (needcfg.note) {
            if (data.needfriend) {
                if (data.insend) {
                    if (data.deduction && data.deduction > 0) {
                        view._sxbg.visible = view._notTxt.visible = true;
                    }
                }
                else {
                    if (params.value < needcfg.requirement) {
                        view._sxbg.visible = view._notTxt.visible = true;
                    }
                }
            }
            view._needTxt.text = LanguageManager.getlocal("zhenqifangnote" + needcfg.note, ["" + needcfg.requirement]);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._needTxt, view._sxbg);
            view.setChildIndex(view._sxbg, 999);
            view.setChildIndex(view._notTxt, 999);
            view.setChildIndex(view._needTxt, 999);
        }
        view._freind = params.freind;
        view._times = params.times;
    };
    ZhenqifangServantItem.prototype.fresh_servant = function (params, bool, init) {
        if (bool === void 0) { bool = true; }
        if (init === void 0) { init = false; }
        var view = this;
        if (params.uid > 0) {
            // let baseview : any = ViewController.getInstance().getView(ViewConst.COMMON.ZHENQIFANGVIEW);
            // let commViewTab:ZhenqifangViewTab2=<ZhenqifangViewTab2>baseview.tabViewData[1];
            if (1) {
                var data_1 = Api.zhenqifangVoApi.friendobj;
                var count = 0;
                for (var i in data_1) {
                    for (var j in data_1[i]) {
                        var unit = data_1[i][j];
                        if (unit && unit.uid == params.uid) {
                            ++count;
                        }
                    }
                }
                //commViewTab.getServantNumByUid(params.uid);
                var total = Config.ZhenqifangCfg.friend.supportTimes;
                var cur = Api.zhenqifangVoApi.getFriendSupportTimes(params.uid);
                if (cur >= total || (cur + count + 1) > total) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("zhenqifangcdtip15", [total]));
                    return;
                }
            }
        }
        view._servantImg.visible = true;
        view._servantImg.alpha = 1;
        var data = view._data;
        var servantId = Number(params.id);
        var uid = params.uid;
        if (view._curServantId) {
            if (data.needfriend) {
                if (!Api.zhenqifangVoApi.friendsendList[view._uid]) {
                    Api.zhenqifangVoApi.friendsendList[view._uid] = {};
                }
                if (Api.zhenqifangVoApi.friendsendList[view._uid][view._curServantId]) {
                    delete Api.zhenqifangVoApi.friendsendList[view._uid][view._curServantId];
                }
            }
            else {
                if (Api.zhenqifangVoApi.sendList.indexOf(view._curServantId) > -1) {
                    Api.zhenqifangVoApi.sendList.splice(Api.zhenqifangVoApi.sendList.indexOf(view._curServantId), 1);
                }
            }
        }
        view._uid = uid;
        view._curServantId = servantId;
        if (data.needfriend) {
            if (!Api.zhenqifangVoApi.friendsendList[uid]) {
                Api.zhenqifangVoApi.friendsendList[uid] = {};
            }
            if (!Api.zhenqifangVoApi.friendsendList[uid][servantId]) {
                Api.zhenqifangVoApi.friendsendList[uid][servantId] = 1;
            }
            Api.zhenqifangVoApi.friendobj[view._data.tabindex][view._index] = params;
        }
        else {
            if (Api.zhenqifangVoApi.sendList.indexOf(Number(servantId)) == -1) {
                Api.zhenqifangVoApi.sendList.push(Number(servantId));
            }
        }
        var servantInfoObj = Api.servantVoApi.getServantObj(servantId.toString());
        //品质 头像 名称
        var servantQuality = '';
        var servantPic = '';
        if (data.needfriend) {
            var equip = "";
            if (!params.equip || params.equip == "") {
                equip = "servant_half_" + servantId;
            }
            else {
                var skincfg = Config.ServantskinCfg.getServantSkinItemById(params.equip);
                equip = skincfg.icon;
            }
            servantQuality = "servant_cardbg_" + params.clv;
            servantPic = equip;
        }
        else {
            servantQuality = servantInfoObj.qualityBoxImgPath;
            servantPic = servantInfoObj.halfImgPath;
        }
        view._cardbg.setload(servantQuality);
        view._servantImg.setload(servantPic);
        view._info_g.visible = true;
        view._delBtn.visible = true;
        var isinevent = data.insend;
        if (isinevent) {
            view._delBtn.visible = false;
        }
        view._servantImg.setPosition(view._cardbg.x, view._cardbg.y);
        view._addIcon.visible = false;
        if (view._sxbg) {
            view._sxbg.visible = view._needTxt.visible = view._notTxt.visible = false;
        }
        var needcfg = data;
        if (needcfg.note) {
            if (data.needfriend) {
                if (data.insend) {
                    if (data.deduction && data.deduction > 0) {
                        view._sxbg.visible = view._notTxt.visible = true;
                    }
                }
                else {
                    if (params.value < needcfg.requirement) {
                        view._sxbg.visible = view._notTxt.visible = true;
                    }
                }
            }
            else {
                if (servantInfoObj[needcfg.note] < needcfg.requirement) {
                    view._sxbg.visible = view._notTxt.visible = true;
                }
            }
            view._needTxt.text = LanguageManager.getlocal("zhenqifangnote" + needcfg.note, ["" + needcfg.requirement]);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._needTxt, view._sxbg);
            view.setChildIndex(view._sxbg, 999);
            view.setChildIndex(view._notTxt, 999);
            view.setChildIndex(view._needTxt, 999);
        }
        view._freind = params.freind;
        view._times = params.times;
        if (bool) {
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ZQF_SERVANT, { itemIndex: view._itemIndex, servantId: servantId, uid: view._uid });
        }
        if (!init) {
            //播放动画
            //出现
            // 门客动画：
            // 时间：0-0.13 缩放：3.3-1
            // 时间：0-0.07 缩放：50%-100%
            // liang动画：0.13-0.33，透明度：100%-0   模式是oneone
            // 消失：
            // 门客动画：
            // 时间：0-0.27 透明度100%-0，缩放1-1.3
            var tmpx = view._cardbg.scaleX;
            view._cardbg.alpha = view._servantImg.alpha = 0.5;
            view._delBtn.alpha = 0;
            view._cardbg.setScale(tmpx * 3.3);
            egret.Tween.get(view._cardbg).to({ scaleX: tmpx, scaleY: tmpx }, 130).call(function () {
                egret.Tween.removeTweens(view._cardbg);
            }, view);
            egret.Tween.get(view._cardbg).to({ alpha: 1 }, 70);
            var tmpx2 = view._servantImg.scaleX;
            view._servantImg.setScale(tmpx2 * 3.3);
            egret.Tween.get(view._servantImg).to({ scaleX: tmpx2, scaleY: tmpx2 }, 130).call(function () {
                egret.Tween.removeTweens(view._servantImg);
            }, view);
            egret.Tween.get(view._servantImg).to({ alpha: 1 }, 70);
            var liang_1 = BaseBitmap.create("zqfliang");
            liang_1.setScale(view.height / 65);
            view.addChild(liang_1);
            liang_1.x = 0;
            liang_1.y = 0;
            liang_1.alpha = 0;
            egret.Tween.get(liang_1).wait(130).set({ alpha: 1 }).to({ alpha: 0 }, 200).call(function () {
                egret.Tween.removeTweens(liang_1);
                view.removeChild(liang_1);
                liang_1 = null;
                view._delBtn.alpha = 1;
            }, view);
        }
    };
    ZhenqifangServantItem.prototype.setDelBtn = function (data) {
        var view = this;
        view._data = data;
        this._delBtn.visible = false;
    };
    //下阵
    ZhenqifangServantItem.prototype.clearServant = function (tween) {
        if (tween === void 0) { tween = false; }
        var view = this;
        view._freind = null;
        view._uid = 0;
        if (tween) {
            var tmpx2_1 = view._servantImg.scaleX;
            egret.Tween.get(view._servantImg).to({ scaleX: tmpx2_1 * 1.3, scaleY: tmpx2_1 * 1.3, alpha: 0 }, 270).call(function () {
                egret.Tween.removeTweens(view._servantImg);
                view._servantImg.setScale(tmpx2_1);
                view._addIcon.visible = true;
                view._servantImg.visible = false;
                if (view._sxbg) {
                    view._sxbg.visible = view._needTxt.visible = true;
                    view._notTxt.visible = false;
                    view._notTxt.visible = false;
                }
                view._cardbg.setload("servant_cardbg_0");
                view._servantImg.setPosition(view._cardbg.x, view._cardbg.y);
                ;
                view._info_g.visible = false;
                view._delBtn.visible = false;
                view._empty_g.visible = true;
                view._curServantId = null;
                App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ZQF_SERVANT);
            }, view);
        }
        else {
            view._addIcon.visible = true;
            view._servantImg.visible = false;
            if (view._sxbg) {
                view._sxbg.visible = view._needTxt.visible = true;
                view._notTxt.visible = false;
                view._notTxt.visible = false;
            }
            view._cardbg.setload("servant_cardbg_0");
            view._servantImg.setPosition(view._cardbg.x, view._cardbg.y);
            view._info_g.visible = false;
            view._delBtn.visible = false;
            view._empty_g.visible = true;
            view._curServantId = null;
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ZQF_SERVANT);
        }
    };
    ZhenqifangServantItem.prototype.servantTouch = function () {
        var view = this;
        var data = view._data;
        if (data.onlyshow) {
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ZQF_SELECT, view._index);
        }
        else {
            var isinevent = data.insend;
            if (isinevent) {
                return;
            }
            if (data.needfriend) {
                //needFriend
                ViewController.getInstance().openView(ViewConst.POPUP.ZHENQIFANGSELECTFRIENDVIEW, {
                    data: data,
                    callback: this.fresh_servant,
                    callobj: view,
                    index: view._index,
                    tabindex: data.index,
                });
            }
            else {
                var allServantInfo = {};
                var allKey = Api.servantVoApi.getServantInfoIdListByProperty(data.type);
                var showTab = [];
                var needcfg = data;
                for (var k in allKey) {
                    var key = allKey[k];
                    var mainAtr = 0;
                    var attr = '';
                    var servantInfoObj = Api.servantVoApi.getServantObj(key);
                    if (needcfg.note) {
                        mainAtr = servantInfoObj[needcfg.note];
                        attr = "zhenqifangnote" + needcfg.note;
                        showTab.push({
                            'servantId': key,
                            'text': LanguageManager.getlocal(attr),
                            'inBuzhen': Api.zhenqifangVoApi.haveInBuzhen(key),
                            'value': mainAtr,
                            'need': needcfg.requirement,
                            insend: Api.zhenqifangVoApi.sendList.indexOf(Number(key)) > -1,
                        });
                    }
                    else {
                        mainAtr = servantInfoObj["total"];
                        attr = "zhenqifangnotetotal";
                        showTab.push({
                            'servantId': key,
                            'text': LanguageManager.getlocal(attr),
                            'inBuzhen': Api.zhenqifangVoApi.haveInBuzhen(key),
                            'value': mainAtr,
                            insend: Api.zhenqifangVoApi.sendList.indexOf(Number(key)) > -1,
                        });
                    }
                }
                if (Api.rookieVoApi.getIsGuiding()) {
                    //a
                    showTab.sort(function (a, b) {
                        return Number(a.servantId) - Number(b.servantId);
                    });
                }
                else {
                    showTab.sort(function (a, b) {
                        if (a.inBuzhen && b.inBuzhen) {
                            return b.value - a.value;
                        }
                        else if (a.inBuzhen) {
                            return 1;
                        }
                        else if (b.inBuzhen) {
                            return -1;
                        }
                        else {
                            return b.value - a.value;
                        }
                    });
                }
                ViewController.getInstance().openView(ViewConst.POPUP.ZHENQIFANGSELECTSERVANTVIEW, {
                    needtext: needcfg.note ? LanguageManager.getlocal("zhenqifangnote" + needcfg.note) + " >= " + needcfg.requirement : null,
                    "info": showTab,
                    callback: this.fresh_servant,
                    handler: this,
                });
            }
        }
    };
    Object.defineProperty(ZhenqifangServantItem.prototype, "curServantId", {
        get: function () {
            return this._curServantId;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 不同格子Y间距
     */
    ZhenqifangServantItem.prototype.getSpaceY = function () {
        return 0;
    };
    ZhenqifangServantItem.prototype.checkBuzhen = function (event) {
        var data = event.data;
        var view = this;
        if (!data) {
            return;
        }
        var isinevent = view._data.insend;
        if (isinevent) {
            return;
        }
        if (data.clear) {
            if (view._data.friend == data.friend) {
                view.clearServant();
            }
        }
        else {
            if (data.servantId) {
                if (view._itemIndex == data.itemIndex) {
                    if (Api.rookieVoApi.getIsGuiding()) {
                        Api.rookieVoApi.checkNextStep();
                    }
                    return;
                }
                var arr1 = view._itemIndex.split("_");
                var arr2 = data.itemIndex.split("_");
                if (view._data.needfriend) {
                    //(Number(arr1[0])!= Number(arr2[0]))
                    if (Number(arr1[0]) == Number(arr2[0])) {
                        if (view._curServantId == data.servantId && data.uid == view._uid) {
                            view.clearServant(true);
                        }
                    }
                }
                else if (!data.uid) {
                    if (view._curServantId == data.servantId) {
                        view.clearServant(true);
                    }
                }
            }
        }
    };
    ZhenqifangServantItem.prototype.getSpaceX = function () {
        return 0;
    };
    ZhenqifangServantItem.prototype.checkSelect = function (evt) {
        if (this._index == evt.data) {
            this.setSelect(true);
        }
        else {
            this.setSelect(false);
        }
    };
    ZhenqifangServantItem.prototype.checkEmpty = function () {
        return this._addIcon.visible;
    };
    ZhenqifangServantItem.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ZQF_SERVANT, this.checkBuzhen, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ZQF_SELECT, this.checkSelect, this);
        view.cacheAsBitmap = false;
        view._servantImg.removeTouchTap();
        view._cardbg.removeTouchTap();
        view._info_g.dispose();
        view._info_g = null;
        BaseLoadBitmap.release(view._cardbg);
        view._cardbg = null;
        BaseLoadBitmap.release(view._servantImg);
        view._servantImg = null;
        view._delBtn = null;
        view._data = null;
        view._empty_g = null;
        view._addIcon = null;
        view._sxbg = null;
        view._notTxt = null;
        view._needTxt = null;
        view._uid = 0;
        view._freind = null;
        view._selectIcon = null;
        _super.prototype.dispose.call(this);
    };
    return ZhenqifangServantItem;
}(ScrollListItem));
__reflect(ZhenqifangServantItem.prototype, "ZhenqifangServantItem");
//# sourceMappingURL=ZhenqifangServantItem.js.map