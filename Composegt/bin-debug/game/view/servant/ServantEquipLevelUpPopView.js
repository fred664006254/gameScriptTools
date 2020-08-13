/**
 * 门客装备升级
 * author yanyuling
 * date 2017/11/18
 * @class ServantBookLevelupPopupView
 */
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
var ServantEquipLevelUpPopView = (function (_super) {
    __extends(ServantEquipLevelUpPopView, _super);
    function ServantEquipLevelUpPopView() {
        var _this = _super.call(this) || this;
        _this._servantId = '';
        _this._equipid = 1;
        _this._list = null;
        _this._curQuality = -1;
        _this._equipObj = {};
        _this._nextLvTxt = null;
        _this._nextLvQulaityBg = null;
        _this._progress = null;
        _this._infoGroup = null;
        _this._isStackflow = false;
        _this._canqualityup = false;
        _this._selected = null;
        _this._curLvTxt = null;
        _this._curLvQulaityBg = null;
        _this._btn = null;
        return _this;
    }
    ServantEquipLevelUpPopView.prototype.initView = function () {
        // public_tcdw_bg01
        var servantId = this.param.data.sid;
        var equipid = this.param.data.eid;
        var view = this;
        view._equipid = equipid;
        App.MessageHelper.addEventListener(MessageConst.EQUIP_REVOLUTION_CHOOSE, view.chooseEquip, view);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_SERVANT_EQUIPLEVELUP, view.equipLevelCallback, view);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_SERVANT_EQUIPQUALITYUP, view.equipQualityCallback, view);
        view._servantId = servantId;
        view._curQuality = -1;
        var bg = BaseBitmap.create("public_9v_bg12");
        bg.width = 526;
        bg.height = 398;
        bg.x = view.viewBg.x + view.viewBg.width / 2 - bg.width / 2;
        bg.y = 19;
        view.addChildToContainer(bg);
        var group = new BaseDisplayObjectContainer();
        group.width = 382;
        group.height = 170;
        view.addChildToContainer(group);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, group, bg, [0, 12]);
        //升级展示
        var curlv = Api.servantVoApi.getEquipAddLv(servantId, equipid);
        var quality = Api.servantVoApi.getEquipQuality(servantId, equipid);
        var ismax = quality == 6;
        var canBreak = curlv == Config.ServantequiplCfg.getEquipQualityMaxLv(quality) && !ismax;
        var group1 = view.creatIcon(equipid, curlv, quality);
        var group2 = view.creatIcon(equipid, canBreak ? 0 : curlv + 1, canBreak ? quality + 1 : quality, true);
        group.addChild(group1);
        group.addChild(group2);
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, group2, group, [0, 0], true);
        var arrow = BaseBitmap.create("public_greenarrow2");
        group.addChild(arrow);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, arrow, group, [0, 24], true);
        var progressbar = ComponentManager.getProgressBar("progress_type3_yellow", "progress_type3_bg", 480);
        view.addChildToContainer(progressbar);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, progressbar, group, [0, group.height + 8]);
        var curvalue = Api.servantVoApi.getEquipCurExp(servantId, equipid);
        view._progress = progressbar;
        var needvalue = ismax ? 0 : Config.ServantequiplCfg.getNextNeedValue(quality, curlv + 1);
        view._canqualityup = ismax ? false : (curvalue >= Config.ServantequiplCfg.getEquipQualityBreakExp(quality) && curlv == Config.ServantequiplCfg.getEquipQualityMaxLv(quality));
        if (!ismax) {
            progressbar.setPercentage(curvalue / needvalue);
            progressbar.setText(Math.min(curvalue, needvalue) + "/" + needvalue);
        }
        else {
            progressbar.setPercentage(1);
            progressbar.setText(LanguageManager.getlocal("promotion_topLevel"));
        }
        var infobg = BaseBitmap.create("servantequip_infobg");
        view.addChildToContainer(infobg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, infobg, progressbar, [0, progressbar.height + 12]);
        var infoGroup = new BaseDisplayObjectContainer();
        infoGroup.width = 485;
        view._infoGroup = infoGroup;
        //信息说明
        var rankList = Config.ServantequiplCfg.rankList;
        var count = 0;
        for (var i in rankList) {
            var unit = rankList[i];
            if (unit.attType || Number(i) == 1) {
                var descgroup = new BaseDisplayObjectContainer();
                descgroup.width = 485;
                descgroup.height = 35;
                infoGroup.addChild(descgroup);
                descgroup.setPosition(0, 35 * count);
                descgroup.name = "descgroup" + i;
                var addStr = "";
                var upNum = "";
                if (Number(i) == 1) {
                    addStr = LanguageManager.getlocal("servantInfo_speciality" + equipid);
                }
                else {
                    if (unit.attType == 1) {
                        addStr = LanguageManager.getlocal("servantInfo_speciality" + equipid);
                        upNum = unit.value + "";
                    }
                    else {
                        addStr = LanguageManager.getlocal("servant_equipattType" + unit.attType);
                        upNum = (unit.value > 1 ? unit.value : (unit.value * 100).toFixed(0) + "%") + '';
                    }
                }
                var nameTxt = ComponentManager.getTextField(addStr, 20, 0x410D00);
                descgroup.addChild(nameTxt);
                App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, nameTxt, descgroup, [62, 0], true);
                var isunlock = quality >= Number(i);
                var str = '';
                if (Number(i) == 1) {
                    var cur = Config.ServantequiplCfg.getEquipAddvalue(equipid, quality, curlv);
                    var next = Config.ServantequiplCfg.getEquipAddvalue(equipid, quality, curlv == Config.ServantequiplCfg.getEquipQualityMaxLv(quality) ? curlv : (curlv + 1));
                    str = ismax ? cur + '' : "" + cur + (isunlock ? "<font color=0x359270>\uFF08+" + (next - cur) + "\uFF09</font>" : "");
                }
                else {
                    str = upNum;
                }
                var upTxt = ComponentManager.getTextField(str, 20, 0x410D00);
                upTxt.name = "upTxt" + i;
                descgroup.addChild(upTxt);
                App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, upTxt, nameTxt, [120, 0]);
                var lock = BaseBitmap.create("servantequip_lock");
                lock.name = "lock" + i;
                App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, lock, descgroup, [94, 0], true);
                var arrow_1 = BaseBitmap.create("servantequip_arrow");
                descgroup.addChild(arrow_1);
                arrow_1.name = "arrow" + i;
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, arrow_1, lock);
                if (Number(i) == 1) {
                    lock.visible = false;
                    if (ismax) {
                        arrow_1.visible = false;
                    }
                    else {
                        arrow_1.visible = true;
                    }
                }
                else {
                    descgroup.addChild(lock);
                    lock.visible = !isunlock;
                    if (view._canqualityup && quality + 1 == Number(i)) {
                        arrow_1.visible = true;
                        lock.visible = false;
                    }
                    else {
                        arrow_1.visible = false;
                    }
                }
                var line = BaseBitmap.create("servantequip_infoline");
                descgroup.addChild(line);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, line, descgroup, [0, 0], true);
                ++count;
            }
        }
        var alphabg = BaseBitmap.create("public_alphabg");
        alphabg.width = infoGroup.width;
        alphabg.height = infoGroup.height;
        infoGroup.addChild(alphabg);
        var scrollview = ComponentManager.getScrollView(infoGroup, new egret.Rectangle(0, 0, 485, 140));
        view.addChildToContainer(scrollview);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, scrollview, infobg);
        var bg2 = BaseBitmap.create("public_9v_bg12");
        bg2.width = 526;
        bg2.height = 280;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, bg2, bg, [0, bg.height + 11]);
        view.addChildToContainer(bg2);
        var select = BaseBitmap.create("servantequip_select");
        view._selected = select;
        var _loop_1 = function (i) {
            var qualitySel = ComponentManager.getButton("servantequip_selquality" + i, "", function () {
                if (view._canqualityup) {
                    return;
                }
                if (view._curQuality == i) {
                    select.visible = false;
                    view._curQuality = -1;
                }
                else {
                    view._curQuality = i;
                    select.visible = true;
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, select, qualitySel);
                }
                view.freshList();
            }, view);
            qualitySel.setPosition(bg2.x + 183 + (48 + 22) * (i - 1), bg2.y + 10);
            view.addChildToContainer(qualitySel);
        };
        for (var i = 1; i < 6; ++i) {
            _loop_1(i);
        }
        view.addChildToContainer(select);
        select.visible = false;
        var itemlistbg = BaseBitmap.create("public_lvupcenter");
        itemlistbg.width = 495;
        itemlistbg.height = 198;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, itemlistbg, bg2, [0, 63]);
        view.addChildToContainer(itemlistbg);
        //强化材料
        var arr = Config.ServantequiplCfg.getCostEquipItem(equipid);
        var list = ComponentManager.getScrollList(ServantEquipCostItem, arr, new egret.Rectangle(0, 0, 495, 183), view._curQuality);
        view.addChildToContainer(list);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, list, itemlistbg, [15, 10]);
        view._list = list;
        var btn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "servantEquipStrenghthen", function () {
            if (!view._canqualityup && !Object.keys(view._equipObj).length) {
                return;
            }
            var servantinfo = Api.servantVoApi.getServantObj(servantId);
            var quality = Api.servantVoApi.getEquipQuality(servantId, equipid);
            if (view._canqualityup && quality > (servantinfo.clv + 1)) {
                App.CommonUtil.showTip(LanguageManager.getlocal("servantEquipQuliatyNotUp"));
                return;
            }
            var curlv = Api.servantVoApi.getEquipAddLv(servantId, equipid);
            var ismax = quality == 6;
            if (ismax) {
                App.CommonUtil.showTip(LanguageManager.getlocal("promotion_topLevel"));
                return;
            }
            if (view._canqualityup) {
                NetManager.request(NetRequestConst.REQUEST_SERVANT_EQUIPQUALITYUP, {
                    servantId: view._servantId,
                    equipType: view._equipid
                });
            }
            else {
                if (view._isStackflow) {
                    ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                        title: "itemUseConstPopupViewTitle",
                        msg: LanguageManager.getlocal("servant_equipTip1"),
                        callback: function () {
                            NetManager.request(NetRequestConst.REQUEST_SERVANT_EQUIPLEVELUP, {
                                servantId: view._servantId,
                                equipArr: view._equipObj,
                            });
                        },
                        handler: view,
                        needCancel: true
                    });
                }
                else {
                    NetManager.request(NetRequestConst.REQUEST_SERVANT_EQUIPLEVELUP, {
                        servantId: view._servantId,
                        equipArr: view._equipObj,
                    });
                }
            }
        }, this);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, btn, bg2, [0, bg2.height + 8]);
        view.addChildToContainer(btn);
        view._btn = btn;
        btn.setText(view._canqualityup ? "servantEquipBreak" : "servantEquipStrenghthen", true);
    };
    ServantEquipLevelUpPopView.prototype.freshList = function () {
        var view = this;
        var equipid = view.param.data.eid;
        var list = view._list;
        var arr = [];
        if (view._curQuality == -1) {
            arr = Config.ServantequiplCfg.getCostEquipItem(equipid);
        }
        else {
            arr = Config.ServantequiplCfg.getCostEquipItem(equipid, view._curQuality);
        }
        list.refreshData(arr, view._curQuality);
        view._equipObj = {};
        if (view._curQuality > -1) {
            for (var i = 0; i < arr.length; ++i) {
                var id = arr[i].item;
                if (!view._equipObj[id]) {
                    view._equipObj[id] = 0;
                }
                view._equipObj[id] = Api.itemVoApi.getItemNumInfoVoById(id);
            }
        }
        view.calExp();
    };
    ServantEquipLevelUpPopView.prototype.creatIcon = function (equipId, lv, quality, isleft) {
        var view = this;
        var group = new BaseDisplayObjectContainer();
        group.width = 113;
        group.height = 170;
        var cfg = Config.ServantCfg.getServantItemById(view._servantId);
        //分文武
        var itembg = BaseBitmap.create("servant_equip_iconbg");
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, itembg, group);
        group.addChild(itembg);
        var qulitybg = BaseBitmap.create("servant_equip_iconqulaity" + quality);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, qulitybg, itembg);
        group.addChild(qulitybg);
        if (isleft) {
            view._nextLvQulaityBg = qulitybg;
        }
        else {
            view._curLvQulaityBg = qulitybg;
        }
        var item = BaseBitmap.create("servant_equip" + cfg.getServantType() + "_icon" + equipId);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, item, itembg);
        group.addChild(item);
        var lvbg = BaseBitmap.create("servant_equip_numbg");
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, lvbg, itembg, [0, 104]);
        group.addChild(lvbg);
        var str = '';
        if (quality == 6) {
            str = "Max"; //LanguageManager.getlocal(`promotion_topLevel`) 
        }
        else {
            str = "+" + lv;
        }
        var lvTxt = ComponentManager.getTextField(str, 22, 0xFEFEFE);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, lvTxt, lvbg, [0, 4]);
        group.addChild(lvTxt);
        if (isleft) {
            view._nextLvTxt = lvTxt;
        }
        else {
            view._curLvTxt = lvTxt;
        }
        var itemNameTxt = ComponentManager.getTextField("", 22, 0x410D00);
        itemNameTxt.text = LanguageManager.getlocal("servant_equip" + cfg.getServantType() + "_" + equipId);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, itemNameTxt, lvbg, [0, lvbg.height + 5]);
        group.addChild(itemNameTxt);
        return group;
    };
    ServantEquipLevelUpPopView.prototype.getResourceList = function () {
        return ["servantequip", "progress_type3_bg", "progress_type3_yellow",];
    };
    ServantEquipLevelUpPopView.prototype.chooseEquip = function (evt) {
        var view = this;
        if (view._canqualityup) {
            return;
        }
        if (evt.data) {
            var id = evt.data.id;
            var num = evt.data.num;
            if (num == 0) {
                if (view._equipObj[id]) {
                    delete view._equipObj[id];
                }
            }
            else {
                if (!view._equipObj[id]) {
                    view._equipObj[id] = 0;
                }
                view._equipObj[id] = num;
            }
        }
        view.calExp();
    };
    ServantEquipLevelUpPopView.prototype.calExp = function () {
        var view = this;
        var totalexp = 0;
        for (var i in view._equipObj) {
            var id = i;
            var num = view._equipObj[i];
            var exp = Config.ServantequiplCfg.getCostEquipAddExp(id);
            totalexp += (num * exp);
        }
        var curvalue = Api.servantVoApi.getEquipCurExp(view._servantId, view._equipid);
        var quality = Api.servantVoApi.getEquipQuality(view._servantId, view._equipid);
        var curlv = Api.servantVoApi.getEquipAddLv(view._servantId, view._equipid);
        var ismax = quality == 6;
        if (!ismax) {
            var calaftterInfo = Config.ServantequiplCfg.calExpProgress(totalexp + curvalue, view._equipid, quality, curlv);
            if (totalexp == 0) {
                calaftterInfo.nextlv = calaftterInfo.isBroke ? 0 : curlv + 1;
            }
            view.freshView(totalexp + curvalue, quality, calaftterInfo);
        }
    };
    ServantEquipLevelUpPopView.prototype.freshView = function (totalexp, quality, info) {
        var view = this;
        var curlv = Api.servantVoApi.getEquipAddLv(view._servantId, view._equipid);
        var ismax = false;
        var cfg = Config.ServantCfg.getServantItemById(view._servantId);
        var canQualityUp = info.nextquality > quality;
        var qulitybg = "servant_equip_iconqulaity" + info.nextquality;
        view._nextLvQulaityBg.setRes(qulitybg);
        var str = '';
        if (ismax) {
            str = "Max"; //LanguageManager.getlocal(`promotion_topLevel`) 
        }
        else {
            str = "+" + info.nextlv;
        }
        view._nextLvTxt.text = str;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, view._nextLvTxt, view._nextLvQulaityBg);
        var t2 = Config.ServantequiplCfg.getTotalNeedExp(view._servantId, view._equipid, info.nextquality, info.nextlv - 1);
        var needvalue = ismax ? 0 : Config.ServantequiplCfg.getNextNeedValue(info.nextquality, info.nextlv);
        view._isStackflow = info.nextlv == 0 && totalexp > (t2 + needvalue);
        if (!ismax) {
            var num = Math.max(0, totalexp - t2);
            // if(num <  needvalue && !info.isBroke){
            //     needvalue = ismax ? 0 : Config.ServantequiplCfg.getNextNeedValue(quality, info.nextlv);
            // }
            view._progress.setPercentage(num / needvalue);
            view._progress.setText(num + "/" + needvalue);
        }
        else {
            view._progress.setPercentage(1);
            view._progress.setText(LanguageManager.getlocal("promotion_topLevel"));
        }
        var rankList = Config.ServantequiplCfg.rankList;
        var count = 0;
        for (var i in rankList) {
            var unit = rankList[i];
            if (unit.attType || Number(i) == 1) {
                var descgroup = view._infoGroup.getChildByName("descgroup" + i);
                var addStr = "";
                var upNum = "";
                if (Number(i) == 1) {
                    addStr = LanguageManager.getlocal("servantInfo_speciality" + view._equipid);
                }
                else {
                    if (unit.attType == 1) {
                        addStr = LanguageManager.getlocal("servantInfo_speciality" + view._equipid);
                        upNum = unit.value + "";
                    }
                    else {
                        addStr = LanguageManager.getlocal("servant_equipattType" + unit.attType);
                        upNum = (unit.value > 1 ? unit.value : (unit.value * 100).toFixed(0) + "%") + '';
                    }
                }
                var nameTxt = descgroup.getChildByName("nameTxt" + i);
                var isunlock = info.nextquality >= Number(i);
                var newstr = '';
                if (Number(i) == 1) {
                    var cur = Config.ServantequiplCfg.getEquipAddvalue(view._equipid, quality, curlv);
                    var next = Config.ServantequiplCfg.getEquipAddvalue(view._equipid, quality, info.nextlv == 0 ? (Config.ServantequiplCfg.getEquipQualityMaxLv(quality)) : info.nextlv);
                    newstr = ismax ? cur + '' : "" + cur + (isunlock ? "<font color=0x359270>\uFF08+" + (next - cur) + "\uFF09</font>" : "");
                }
                else {
                    newstr = upNum;
                }
                if (info.nextlv >= 0) {
                    var upTxt = descgroup.getChildByName("upTxt" + i);
                    upTxt.text = newstr;
                }
                // let lock = descgroup.getChildByName(`lock${i}`);
                // let arrow = descgroup.getChildByName(`arrow${i}`);
                // if(Number(i) == 1){
                // }
                // else{
                //     lock.visible = !isunlock;
                //     // if(info.nextquality > quality && info.nextquality == Number(i)){
                //     //     arrow.visible = true;
                //     //     lock.visible = false;
                //     // }
                //     // else{
                //     //     arrow.visible = false;
                //     // }
                // }
            }
        }
    };
    ServantEquipLevelUpPopView.prototype.equipLevelCallback = function (evt) {
        var view = this;
        if (evt.data.ret) {
            view.freshAfterLevelup();
        }
    };
    ServantEquipLevelUpPopView.prototype.equipQualityCallback = function (evt) {
        var view = this;
        if (evt.data.ret) {
            view.freshAfterLevelup();
        }
    };
    ServantEquipLevelUpPopView.prototype.freshAfterLevelup = function () {
        var view = this;
        var curlv = Api.servantVoApi.getEquipAddLv(view._servantId, view._equipid);
        var quality = Api.servantVoApi.getEquipQuality(view._servantId, view._equipid);
        var ismax = quality == 6;
        var curvalue = Api.servantVoApi.getEquipCurExp(view._servantId, view._equipid);
        var needvalue = ismax ? 0 : Config.ServantequiplCfg.getNextNeedValue(quality, curlv + 1);
        view._canqualityup = ismax ? false : (curvalue >= Config.ServantequiplCfg.getEquipQualityBreakExp(quality) && curlv == Config.ServantequiplCfg.getEquipQualityMaxLv(quality));
        var str = '';
        if (ismax) {
            str = "Max"; //LanguageManager.getlocal(`promotion_topLevel`) 
        }
        else {
            str = "+" + curlv;
        }
        view._curLvTxt.text = str;
        view._curLvQulaityBg.setRes("servant_equip_iconqulaity" + quality);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, view._curLvTxt, view._curLvQulaityBg);
        view._nextLvTxt.text = ismax ? str : "+" + (curlv + 1);
        var isbroke = curlv == Config.ServantequiplCfg.getEquipQualityMaxLv(quality);
        if (isbroke) {
            view._nextLvTxt.text = "+0";
            view._nextLvQulaityBg.setRes("servant_equip_iconqulaity" + (quality + 1));
            var curvalue_1 = Api.servantVoApi.getEquipCurExp(view._servantId, view._equipid);
            var needvalue_1 = ismax ? 0 : Config.ServantequiplCfg.getEquipQualityBreakExp(quality);
            if (!ismax) {
                view._progress.setPercentage(Math.min(needvalue_1, curvalue_1) / needvalue_1);
                view._progress.setText(Math.min(needvalue_1, curvalue_1) + "/" + needvalue_1);
            }
            else {
                view._progress.setPercentage(1);
                view._progress.setText(LanguageManager.getlocal("promotion_topLevel"));
            }
        }
        view._btn.setText(view._canqualityup ? "servantEquipBreak" : "servantEquipStrenghthen", true);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, view._nextLvTxt, view._nextLvQulaityBg);
        var rankList = Config.ServantequiplCfg.rankList;
        for (var i in rankList) {
            var unit = rankList[i];
            if (unit.attType || Number(i) == 1) {
                var descgroup = view._infoGroup.getChildByName("descgroup" + i);
                var lock = descgroup.getChildByName("lock" + i);
                var arrow = descgroup.getChildByName("arrow" + i);
                var isunlock = quality >= Number(i);
                if (Number(i) == 1) {
                }
                else {
                    lock.visible = !isunlock;
                    if (view._canqualityup && quality + 1 == Number(i)) {
                        arrow.visible = true;
                        lock.visible = false;
                    }
                    else {
                        arrow.visible = false;
                    }
                }
            }
        }
        if (!ismax) {
            view._progress.setPercentage(curvalue / needvalue);
            view._progress.setText(curvalue + "/" + needvalue);
        }
        else {
            view._progress.setPercentage(1);
            view._progress.setText(LanguageManager.getlocal("promotion_topLevel"));
        }
        view._curQuality = -1;
        view._selected.visible = false;
        view.freshList();
        view._equipObj = {};
    };
    ServantEquipLevelUpPopView.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeEventListener(MessageConst.EQUIP_REVOLUTION_CHOOSE, view.chooseEquip, view);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_SERVANT_EQUIPLEVELUP, view.equipLevelCallback, view);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_SERVANT_EQUIPQUALITYUP, view.equipQualityCallback, view);
        view._servantId = '';
        view._equipid = 1;
        view._list = null;
        view._curQuality = -1;
        view._equipObj = {};
        view._nextLvTxt = null;
        view._nextLvQulaityBg = null;
        view._progress = null;
        view._infoGroup = null;
        view._isStackflow = false;
        view._canqualityup = false;
        view._selected = null;
        view._curLvTxt = null;
        view._curLvQulaityBg = null;
        view._btn = null;
        _super.prototype.dispose.call(this);
    };
    return ServantEquipLevelUpPopView;
}(PopupView));
__reflect(ServantEquipLevelUpPopView.prototype, "ServantEquipLevelUpPopView");
