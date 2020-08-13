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
var ZhenqifangServantShowItem = (function (_super) {
    __extends(ZhenqifangServantShowItem, _super);
    function ZhenqifangServantShowItem() {
        var _this = _super.call(this) || this;
        _this._info_g = null;
        _this._cardbg = null;
        _this._servantImg = null;
        _this._delBtn = null;
        _this._itemIndex = "";
        _this._empty_g = null;
        _this._addIcon = null;
        _this._notTxt = null;
        _this._needTxt = null;
        _this._sxbg = null;
        _this._uid = 0;
        return _this;
    }
    ZhenqifangServantShowItem.prototype.initItem = function (index, data) {
        var view = this;
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_ZQF_SERVANT, this.checkBuzhen, this);
        view.cacheAsBitmap = true;
        view._data = data;
        view._itemIndex = data.index + "_" + index + "_" + data.friend;
        view.width = data.onlyshow ? (97 + 3) : (85 + 8);
        view.height = data.onlyshow ? 97 : 85;
        //门客信息
        view._curServantId = data.servantID;
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
        var delbtn = ComponentManager.getButton("discussclose", "", function () {
            if (data.needfriend) {
                if (!Api.zhenqifangVoApi.friendsendList[view._uid]) {
                    Api.zhenqifangVoApi.friendsendList[view._uid] = {};
                }
                if (Api.zhenqifangVoApi.friendsendList[view._uid][view._curServantId]) {
                    delete Api.zhenqifangVoApi.friendsendList[view._uid][view._curServantId];
                }
                if (Api.zhenqifangVoApi.friendobj[view._data.index]) {
                    delete Api.zhenqifangVoApi.friendobj[view._data.index][view._index];
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
        view._info_g.addChild(delbtn);
        view._delBtn = delbtn;
        var isinevent = data.insend;
        if (isinevent) {
            view._delBtn.visible = false;
        }
        if (!data.empty) {
            view._empty_g.visible = false;
            view._info_g.visible = true;
            view.fresh_servant({ id: data.servantID, clv: data.clv, equip: data.equip }, false, true);
        }
        else {
            view._empty_g.visible = true;
            view._info_g.visible = false;
        }
        if (data.friend && data.needfriend) {
            var friendicon = BaseBitmap.create("zqffriendicon");
            friendicon.x = 0;
            friendicon.y = -8;
            view.addChild(friendicon);
        }
    };
    ZhenqifangServantShowItem.prototype.fresh_servant = function (params, bool, init) {
        if (bool === void 0) { bool = true; }
        if (init === void 0) { init = false; }
        var view = this;
        view._servantImg.visible = true;
        view._servantImg.alpha = 1;
        var data = view._data;
        var servantId = Number(params.id);
        var uid = params.uid;
        view._uid = uid;
        view._curServantId = servantId;
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
    ZhenqifangServantShowItem.prototype.getUid = function () {
        var uid = 0;
        var view = this;
        if (view._data.friend && view._data.needfriend && view._uid) {
            uid = view._uid;
        }
        return uid;
    };
    //能否领取全部奖励
    ZhenqifangServantShowItem.prototype.checkIsNotAllReward = function () {
        var view = this;
        var flag = view._notTxt && view._notTxt.visible;
        return flag;
    };
    ZhenqifangServantShowItem.prototype.addServant = function (params) {
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
    ZhenqifangServantShowItem.prototype.setDelBtn = function (data) {
        var view = this;
        view._data = data;
        this._delBtn.visible = false;
    };
    //下阵
    ZhenqifangServantShowItem.prototype.clearServant = function (tween) {
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
                view._info_g.visible = false;
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
            view._empty_g.visible = true;
            view._curServantId = null;
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ZQF_SERVANT);
        }
    };
    ZhenqifangServantShowItem.prototype.servantTouch = function () {
        var view = this;
        var data = view._data;
        var isinevent = data.insend;
        if (isinevent) {
            return;
        }
        //needFriend
        if (!Api.zhenqifangVoApi.friendobj[data.index]) {
            Api.zhenqifangVoApi.friendobj[data.index] = {};
        }
        ViewController.getInstance().openView(ViewConst.POPUP.ZHENQIFANGSELECTFRIENDVIEW, {
            data: data,
            index: view._index,
            tabindex: data.index,
        });
    };
    Object.defineProperty(ZhenqifangServantShowItem.prototype, "curServantId", {
        get: function () {
            return this._curServantId;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 不同格子Y间距
     */
    ZhenqifangServantShowItem.prototype.getSpaceY = function () {
        return 0;
    };
    ZhenqifangServantShowItem.prototype.getSpaceX = function () {
        return 0;
    };
    ZhenqifangServantShowItem.prototype.checkBuzhen = function (event) {
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
    };
    ZhenqifangServantShowItem.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ZQF_SERVANT, this.checkBuzhen, this);
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
        _super.prototype.dispose.call(this);
    };
    return ZhenqifangServantShowItem;
}(ScrollListItem));
__reflect(ZhenqifangServantShowItem.prototype, "ZhenqifangServantShowItem");
//# sourceMappingURL=ZhenqifangServantShowItem.js.map