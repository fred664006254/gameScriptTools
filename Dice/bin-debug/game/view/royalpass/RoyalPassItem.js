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
var RoyalPassItem = (function (_super) {
    __extends(RoyalPassItem, _super);
    function RoyalPassItem() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._curJinduGroup = null;
        _this._curJinduGroup1 = null;
        _this._freegetbtn = null;
        _this._haveGetGroup = null;
        _this._adhaveGetGroup = null;
        _this._adgetbtn = null;
        _this._dbArr = [];
        _this.lingpai = null;
        return _this;
    }
    RoyalPassItem.prototype.initItem = function (index, data, param) {
        var view = this;
        view.width = GameConfig.stageWidth;
        view.height = 241; //165;
        view._data = data;
        // if(App.CommonUtil.check_dragon()){
        //     let db3 = App.DragonBonesUtil.getLoadDragonBones(`royalpass_jbzl_3`);
        //     db3.blendMode = egret.BlendMode.ADD;
        //     view.addChild(db3);
        //     db3.x = view.width / 2;
        //     db3.scaleY = 1.1;
        //     db3.y = 70;
        //     view._dbArr.push(db3);
        //     db3.name = `scanLight`;
        // }
        var line = BaseBitmap.create("royalpassline");
        line.width = 307;
        view.addChild(line);
        var line2 = BaseBitmap.create("royalpassline");
        line2.width = 307;
        line2.x = GameConfig.stageWidth - line2.width;
        view.addChild(line2);
        //刻度组
        //中间刻度
        var curJinduGroup = new BaseDisplayObjectContainer();
        view._curJinduGroup = curJinduGroup;
        curJinduGroup.width = view.width;
        curJinduGroup.height = 45;
        view.addChild(curJinduGroup);
        var curjindu = BaseBitmap.create("royalpasscur");
        curjindu.width = view.width;
        curJinduGroup.addChild(curjindu);
        curjindu.name = "curjindu";
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, curjindu, curJinduGroup, [0, -3], true);
        var tcurJinbg = BaseBitmap.create("royalpasstitletype1");
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tcurJinbg, curjindu);
        curJinduGroup.addChild(tcurJinbg);
        tcurJinbg.name = "typebg";
        var curicon = BaseBitmap.create("trophy_icon");
        curJinduGroup.addChild(curicon);
        curicon.setScale(0.294);
        curicon.name = "curicon";
        var curTxt = ComponentMgr.getTextField(Api.UserinfoVoApi.getMaxScore().toString(), TextFieldConst.SIZE_22, ColorEnums.white);
        curJinduGroup.addChild(curTxt);
        curTxt.name = "curTxt";
        curTxt.strokeColor = 0x24c98;
        curTxt.stroke = 2;
        var curJinduGroup1 = new BaseDisplayObjectContainer();
        view._curJinduGroup1 = curJinduGroup1;
        curJinduGroup1.width = view.width;
        curJinduGroup1.height = 45;
        view.addChild(curJinduGroup1);
        var curjindu1 = BaseBitmap.create("royalpassmax");
        curjindu1.width = view.width;
        curJinduGroup1.addChild(curjindu1);
        curjindu1.name = "curjindu1";
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, curjindu1, curJinduGroup1, [0, -3], true);
        var text = ComponentMgr.getTextField('11', TextFieldConst.SIZE_16, ColorEnums.white);
        curJinduGroup1.addChild(text);
        text.text = LangMger.getlocal("royalpassmax");
        text.x = 5;
        text.y = curjindu1.y - text.height;
        var tcurJinbg1 = BaseBitmap.create("royalpasstitletype6");
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tcurJinbg1, curjindu1);
        curJinduGroup1.addChild(tcurJinbg1);
        tcurJinbg1.name = "typebg1";
        tcurJinbg1.visible = false;
        var curicon1 = BaseBitmap.create("trophy_icon");
        curJinduGroup1.addChild(curicon1);
        curicon1.setScale(0.294);
        curicon1.name = "curicon";
        var curTxt1 = ComponentMgr.getTextField(Api.UserinfoVoApi.getMaxScore().toString(), TextFieldConst.SIZE_22, ColorEnums.white);
        curJinduGroup1.addChild(curTxt1);
        curTxt1.name = "curTxt";
        curTxt1.strokeColor = 0x24c98;
        curTxt1.stroke = 2;
        //领取状态
        var id = view._data.id;
        var cangetFree = Api.GameinfoVoApi.canGetRoyalPassRewardByLevel(id, 1);
        var cangetAdv = Api.GameinfoVoApi.getIsBuyRoyalPass() ? Api.GameinfoVoApi.canGetRoyalPassRewardByLevel(id, 2) : false;
        //免费的
        var bg1 = BaseBitmap.create("royalpassrewardbg1");
        view.addChild(bg1);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, bg1, view, [(320 - bg1.width) / 2, 0], true);
        if (App.CommonUtil.check_dragon() && cangetFree) {
            var db2 = App.DragonBonesUtil.getLoadDragonBones("royalpass_jbzl_2");
            view.addChild(db2);
            db2.setPosition(bg1.x + bg1.width / 2, bg1.y + bg1.height / 2);
            view._dbArr.push(db2);
            db2.blendMode = egret.BlendMode.ADD;
            db2.name = "scanFree";
        }
        var freerewardvo = GameData.formatRewardItem(data.primary)[0];
        if (this.getIsShowBoxEffect(freerewardvo.id) && App.CommonUtil.check_dragon()) {
            var fguang_1 = App.DragonBonesUtil.getLoadDragonBones("royalpass_bxvfx", 0, "idle", function () {
                fguang_1.setScale(0.5);
                fguang_1.setPosition(160, 135);
            }, this);
            // fguang.setPosition(bg1.x + bg1.width / 2, bg1.y + bg1.height);
            view.addChild(fguang_1);
        }
        var showTip = !(freerewardvo.type == 1 || freerewardvo.type == 2) && Api.GameinfoVoApi.getIsFinishNewGuide();
        var freeicon = GameData.getItemIcon(freerewardvo, 0, showTip);
        // freeicon.setScale(0.66);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, freeicon, bg1, [0, 0]);
        view.addChild(freeicon);
        var numTxt = ComponentMgr.getTextField("x" + freerewardvo.num, TextFieldConst.SIZE_26);
        view.addChild(numTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, numTxt, bg1, [0, 15]);
        if (App.CommonUtil.check_dragon() && cangetFree) {
            var db1 = App.DragonBonesUtil.getLoadDragonBones("royalpass_jbzl_1");
            view.addChild(db1);
            db1.setPosition(bg1.x + bg1.width / 2, bg1.y + bg1.height / 2);
            view._dbArr.push(db1);
            db1.blendMode = egret.BlendMode.ADD;
            db1.name = "bubbleFree";
        }
        var freegetBtn = ComponentMgr.getButton(ButtonConst.BTN_COMMON_GREEN, LangMger.getlocal("syscanget"), function () {
            // let isRes = freerewardvo.type == 1 || freerewardvo.type == 2
            // let point = isRes ? new egret.Point(freeicon.localToGlobal().x+freeicon.width/2, freeicon.localToGlobal().y+freeicon.height/2) : new egret.Point(GameConfig.stageWidth / 2, GameConfig.stageHeigth / 2);
            // Api.UserinfoVoApi.setFreshInfo(isRes, point);
            if (freerewardvo.type == 50) {
                Api.ShopVoApi.setIsBox(true, freerewardvo.id.toString());
            }
            view.getReward(1);
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, freegetBtn, bg1, [0, bg1.height]);
        view.addChild(freegetBtn);
        // freegetBtn.setTextPos(null,7);
        freegetBtn.visible = Api.GameinfoVoApi.canGetRoyalPassRewardByLevel(data.id, 1);
        view._freegetbtn = freegetBtn;
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, line, view, [0,freegetBtn.y + (freegetBtn.height - line.height)/2], true);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, curJinduGroup, line);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, curJinduGroup1, line);
        var haveGetGroup = new BaseDisplayObjectContainer();
        view.addChild(haveGetGroup);
        haveGetGroup.width = bg1.width;
        haveGetGroup.height = bg1.height;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, haveGetGroup, bg1);
        haveGetGroup.visible = false;
        view._haveGetGroup = haveGetGroup;
        var maskbg = BaseBitmap.create("public_9_bg8");
        maskbg.width = bg1.width;
        maskbg.height = bg1.height;
        maskbg.alpha = 0.7;
        haveGetGroup.addChild(maskbg);
        var flag = BaseBitmap.create("royalgouhao");
        haveGetGroup.addChild(flag);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, flag, haveGetGroup, [-14, -2], true);
        //VIP的
        var bg2 = BaseBitmap.create("royalpassrewardbg2");
        view.addChild(bg2);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, bg2, view, [320 + (320 - bg2.width) / 2, 0], true);
        if (cangetAdv) {
            var lingpai = ComponentMgr.getCustomMovieClip("lingpai_effect", 10, 100);
            lingpai.blendMode = egret.BlendMode.ADD;
            lingpai.playWithTime(0);
            view.addChild(lingpai);
            lingpai.x = bg2.x - 42;
            lingpai.y = bg2.y - 45;
            this.lingpai = lingpai;
        }
        if (App.CommonUtil.check_dragon() && cangetAdv) {
            var db2 = App.DragonBonesUtil.getLoadDragonBones("royalpass_jbzl_2");
            view.addChild(db2);
            db2.setPosition(bg2.x + bg2.width / 2, bg2.y + bg2.height / 2);
            view._dbArr.push(db2);
            db2.name = "scanAd";
            db2.blendMode = egret.BlendMode.ADD;
        }
        var adrewardvo = GameData.formatRewardItem(data.advanced)[0];
        if (this.getIsShowBoxEffect(adrewardvo.id) && App.CommonUtil.check_dragon()) {
            var fguang_2 = App.DragonBonesUtil.getLoadDragonBones("royalpass_bxvfx", 0, "idle", function () {
                fguang_2.setScale(0.5);
                fguang_2.setPosition(bg2.x + bg2.width / 2, 135);
            }, this);
            // fguang.setPosition(bg1.x + bg1.width / 2, bg1.y + bg1.height);
            view.addChild(fguang_2);
        }
        var adicon = GameData.getItemIcon(adrewardvo, 0, !(adrewardvo.type == 1 || adrewardvo.type == 2)); //Api.GameinfoVoApi.getIsBuyRoyalPass());
        adicon.addTouchTap(function () {
            if (Api.GameinfoVoApi.getIsBuyRoyalPass()) {
                return;
            }
            if (adrewardvo.type == 1 || adrewardvo.type == 2) {
                App.CommonUtil.showTip(LangMger.getlocal("royalpassunlocktip"));
            }
        }, view);
        // adicon.setScale(0.66);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, adicon, bg2, [0, 0]);
        view.addChild(adicon);
        var adnumTxt = ComponentMgr.getTextField("x" + adrewardvo.num, TextFieldConst.SIZE_26);
        view.addChild(adnumTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, adnumTxt, bg2, [0, 15]);
        if (App.CommonUtil.check_dragon() && cangetAdv) {
            var db1 = App.DragonBonesUtil.getLoadDragonBones("royalpass_jbzl_1");
            view.addChild(db1);
            db1.setPosition(bg2.x + bg2.width / 2, bg2.y + bg2.height / 2);
            view._dbArr.push(db1);
            db1.blendMode = egret.BlendMode.ADD;
            db1.name = "bubbleAd";
        }
        //解锁战令来领取超值奖励!
        // if(!Api.GameinfoVoApi.getIsBuyRoyalPass()){
        //     bg2.addTouchTap(()=>{
        //         App.CommonUtil.showTip(LangMger.getlocal(`royalpassunlocktip`));
        //     }, view);
        // }
        var adgetBtn = ComponentMgr.getButton(ButtonConst.BTN_COMMON_GREEN, LangMger.getlocal("syscanget"), function () {
            if (adrewardvo.type == 50) {
                Api.ShopVoApi.setIsBox(true, adrewardvo.id.toString());
            }
            // let isRes = adrewardvo.type == 1 || adrewardvo.type == 2
            // let point = isRes ? new egret.Point(adicon.localToGlobal().x+adicon.width/2, adicon.localToGlobal().y+adicon.height/2) : new egret.Point(GameConfig.stageWidth / 2, GameConfig.stageHeigth / 2);
            // Api.UserinfoVoApi.setFreshInfo(isRes, point);
            view.getReward(2);
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, adgetBtn, bg2, [0, bg2.height]);
        view.addChild(adgetBtn);
        // adgetBtn.setTextPos(null,7);
        adgetBtn.visible = Api.GameinfoVoApi.getIsBuyRoyalPass() ? Api.GameinfoVoApi.canGetRoyalPassRewardByLevel(data.id, 2) : false;
        view._adgetbtn = adgetBtn;
        var adhaveGetGroup = new BaseDisplayObjectContainer();
        view.addChild(adhaveGetGroup);
        adhaveGetGroup.width = bg2.width;
        adhaveGetGroup.height = bg2.height;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, adhaveGetGroup, bg2);
        adhaveGetGroup.visible = false;
        view._adhaveGetGroup = adhaveGetGroup;
        var admaskbg = BaseBitmap.create("public_9_bg8");
        admaskbg.width = bg2.width;
        admaskbg.height = bg2.height;
        admaskbg.alpha = 0.7;
        adhaveGetGroup.addChild(admaskbg);
        var adflag = BaseBitmap.create("royalgouhao");
        adhaveGetGroup.addChild(adflag);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, adflag, adhaveGetGroup, [-14, -2], true);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, adflag, adhaveGetGroup, [0,0], true);
        var lock = BaseBitmap.create("royalpasslock");
        view.addChild(lock);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, lock, bg2, [-10, -10]);
        lock.visible = !Api.GameinfoVoApi.getIsBuyRoyalPass();
        //奖杯
        var type = Math.ceil(data.needScore / 1000) + 1;
        var typebg = BaseBitmap.create("royalpasstitletype" + type);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, typebg, view, [0, bg1.y + (bg1.height - typebg.height) / 2 - 5], true);
        view.addChild(typebg);
        var icon = BaseBitmap.create("trophy_icon");
        view.addChild(icon);
        icon.setScale(0.294);
        var color = {
            2: 0x6b3f01,
            3: 0x323d4a,
            4: 0x7e430b,
            5: 0x337270,
        };
        var needTxt = ComponentMgr.getTextField(data.needScore.toString(), TextFieldConst.SIZE_22, ColorEnums.white);
        view.addChild(needTxt);
        needTxt.strokeColor = color[type];
        needTxt.stroke = 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, icon, typebg, [(typebg.width - icon.width * icon.scaleX - needTxt.width) / 2, 0]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, needTxt, icon, [icon.width * icon.scaleX, 0]);
        view.freshInfo();
    };
    RoyalPassItem.prototype.getIsShowBoxEffect = function (boxid) {
        var flag = false;
        var boxs = [1004, 1008, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008];
        flag = boxs.indexOf(boxid) >= 0;
        return flag;
    };
    RoyalPassItem.prototype.getReward = function (type) {
        var view = this;
        //1普通 2高级
        NetManager.request(NetConst.ROYALPASS_GETREWARDS, {
            isAdvanced: type - 1,
            key: String(view._data.id)
        });
    };
    RoyalPassItem.prototype.freshInfo = function () {
        var view = this;
        var curJinduGroup = view._curJinduGroup;
        var curjindu = curJinduGroup.getChildByName("curjindu");
        var typebg = curJinduGroup.getChildByName("typebg");
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, typebg, curjindu);
        var curicon = curJinduGroup.getChildByName("curicon");
        var curTxt = curJinduGroup.getChildByName("curTxt");
        curTxt.text = Api.UserinfoVoApi.getScore().toString();
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, curicon, typebg, [(typebg.width - curicon.width * curicon.scaleX - curTxt.width) / 2, 0]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, curTxt, curicon, [curicon.width * curicon.scaleX, 0]);
        var curjinduid = Config.RoyalpassCfg.getNowProgressId(Api.UserinfoVoApi.getScore());
        curJinduGroup.visible = view._index == curjinduid - 1;
        curJinduGroup.y = view._freegetbtn.y + (view._freegetbtn.height - curJinduGroup.height) / 2;
        // 历史最高
        var curJinduGroup1 = view._curJinduGroup1;
        var curjindu1 = curJinduGroup1.getChildByName("curjindu1");
        var typebg1 = curJinduGroup1.getChildByName("typebg1");
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, typebg1, curjindu1);
        var curicon1 = curJinduGroup1.getChildByName("curicon");
        var curTxt1 = curJinduGroup1.getChildByName("curTxt");
        curTxt1.text = Api.UserinfoVoApi.getMaxScore().toString();
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, curicon1, typebg1, [(typebg1.width - curicon1.width * curicon1.scaleX - curTxt1.width) / 2, 0]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, curTxt1, curicon1, [curicon1.width * curicon1.scaleX, 0]);
        var curjinduid1 = Config.RoyalpassCfg.getNowProgressId();
        curJinduGroup1.visible = (view._index == curjinduid1 - 1) && !(view._index == curjinduid - 1);
        curJinduGroup1.y = view._freegetbtn.y + (view._freegetbtn.height - curJinduGroup1.height) / 2;
        //奖励相关
        var id = view._data.id;
        var cangetFree = Api.GameinfoVoApi.canGetRoyalPassRewardByLevel(id, 1);
        var cangetAdv = Api.GameinfoVoApi.getIsBuyRoyalPass() ? Api.GameinfoVoApi.canGetRoyalPassRewardByLevel(id, 2) : false;
        view._freegetbtn.visible = cangetFree;
        view._adgetbtn.visible = cangetAdv;
        var scanFree = view.getChildByName("scanFree");
        var bubbleFree = view.getChildByName("bubbleFree");
        if (scanFree) {
            if (!cangetFree) {
                scanFree.dispose();
                bubbleFree.dispose();
            }
        }
        var scanAd = view.getChildByName("scanAd");
        var bubbleAd = view.getChildByName("bubbleAd");
        if (scanAd) {
            if (!cangetAdv) {
                if (view.lingpai) {
                    view.lingpai.dispose();
                }
                scanAd.dispose();
                bubbleAd.dispose();
            }
        }
        // let scanLight = view.getChildByName(`scanLight`);
        // if(scanLight){
        //     if(!cangetFree && !cangetAdv){
        //         scanLight.dispose();
        //     }
        // }
        view._haveGetGroup.visible = Api.GameinfoVoApi.isGetRoyalPassReward(id, 1);
        view._adhaveGetGroup.visible = Api.GameinfoVoApi.isGetRoyalPassReward(id, 2);
    };
    RoyalPassItem.prototype.setCurProgress = function () {
        var view = this;
        var curJinduGroup = view._curJinduGroup;
        curJinduGroup.y = 5;
        curJinduGroup.visible = true;
    };
    RoyalPassItem.prototype.checkBounds = function () {
        return false;
    };
    RoyalPassItem.prototype.getSpaceY = function () {
        return 0;
    };
    RoyalPassItem.prototype.getSpaceX = function () {
        return 0;
    };
    RoyalPassItem.prototype.dispose = function () {
        var view = this;
        view._data = null;
        view._curJinduGroup = null;
        view._freegetbtn = null;
        view.lingpai = null;
        for (var i in view._dbArr) {
            var unit = view._dbArr[i];
            if (unit) {
                unit.dispose();
                unit = null;
            }
        }
        view._dbArr = null;
        _super.prototype.dispose.call(this);
    };
    return RoyalPassItem;
}(ScrollListItem));
__reflect(RoyalPassItem.prototype, "RoyalPassItem");
//# sourceMappingURL=RoyalPassItem.js.map