/**
 * 门客羁绊buff
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
var ServantJibanBuffItem = (function (_super) {
    __extends(ServantJibanBuffItem, _super);
    function ServantJibanBuffItem() {
        return _super.call(this) || this;
    }
    ServantJibanBuffItem.prototype.initItem = function (index, data, param) {
        //App.Messag
        var view = this;
        //eHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_USE_ITEM),this.useBtnHandlerCallBaclk,this);
        view.width = 526;
        var isActive = Api.servantVoApi.isBuffActive(param, data);
        view.height = isActive ? 290 : 198;
        /**
         * --combinationDetail  组合元素
        --attributeType  加成属性类型  1.擂台中增加攻击 2擂台中增加血量
        --addValue  羁绊加成值
        --needAbility  所需等级
        
        ["10011"]={       ----元芳----
            ["combinationDetail"]={"1001","1002","1003","1004","1005"},
            ["attributeType"]=1,
            ["addValue"]={0.05,0.1,0.15},
            ["needAbility"]={100,200,300},
        },
        */
        var cfg = Config.ServentcombinationCfg.getCombineInfoById(param, data);
        var proNumBg = BaseBitmap.create("public_ts_bg01");
        proNumBg.width = 228;
        view.addChild(proNumBg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, proNumBg, view, [0, 0], true);
        var curBuffLv = Api.servantVoApi.getServantActiveBufflv(param, data);
        var namtxt = ComponentManager.getTextField(LanguageManager.getlocal("servant_combinebuff_" + (param + data)), 22, 0x420E00);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, namtxt, proNumBg);
        view.addChild(namtxt);
        var activeTxt = ComponentManager.getTextField(LanguageManager.getlocal(isActive ? "servantJibanActive" : "servantJibanDeActive"), 20, isActive ? 0x359270 : 0xAC0101);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, activeTxt, proNumBg, [proNumBg.width + 5, 0]);
        view.addChild(activeTxt);
        var descTxt = ComponentManager.getTextField(LanguageManager.getlocal("servantJibanDesc" + cfg.attributeType, [(cfg.addValue[curBuffLv] * 100).toFixed(0)]), 20, 0x420E00);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, descTxt, proNumBg, [0, proNumBg.height + 9]);
        view.addChild(descTxt);
        var group = new BaseDisplayObjectContainer();
        group.height = 90;
        var arr = cfg.combinationDetail;
        var canActive = true;
        var needlv = cfg.needAbility[curBuffLv];
        var ismax = curBuffLv == cfg.needAbility.length;
        var _loop_1 = function (i) {
            var servant = arr[i];
            var cfg_1 = Config.ServantCfg.getServantItemById(arr[i]);
            var sgroup = new BaseDisplayObjectContainer();
            sgroup.width = sgroup.height = 90;
            sgroup.setPosition(i * 103, 0);
            group.addChild(sgroup);
            sgroup.addTouchTap(function () {
                if (!obj) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("servantJibanNotHave"));
                    return;
                }
                var openview = ViewController.getInstance().getView(ViewConst.POPUP.SERVANTJIBANBUFFPOPUPVUEW);
                if (arr[i] !== param) {
                    App.MessageHelper.dispatchEvent(MessageConst.SERVANT_CHANGE, { sid: arr[i] });
                }
                if (openview) {
                    openview.hide();
                }
            }, view);
            var qualitybg = BaseLoadBitmap.create("servant_cardbg_" + cfg_1.quality);
            qualitybg.width = qualitybg.height = 184;
            qualitybg.setScale(90 / 184);
            sgroup.addChild(qualitybg);
            var halficon = BaseLoadBitmap.create(cfg_1.halfIcon);
            halficon.width = 180;
            halficon.height = 177;
            halficon.setScale(90 / 180);
            sgroup.addChild(halficon);
            var obj = Api.servantVoApi.getServantObj(arr[i]);
            if (!obj) {
                App.DisplayUtil.changeToGray(sgroup);
                canActive = false;
            }
            else {
                if (obj.getTotalBookValue() < needlv) {
                    canActive = false;
                }
            }
        };
        for (var i = 0; i < arr.length; ++i) {
            _loop_1(i);
        }
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, group, descTxt, [0, descTxt.height + 10]);
        view.addChild(group);
        var line = BaseBitmap.create("public_line4");
        line.width = 500;
        view.addChild(line);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, line, group, [0, group.height + 13]);
        if (isActive) {
            view.height = 218;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, line, view, [0, 0], true);
            //后续可升级
            // if(canActive){
            //     let btn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, `servantJibanUnlock`, null, null);
            //     view.addChild(btn);
            //     App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, btn, group, [0,group.height+10]);
            // }
            // else{
            //     let nextLevelTxt = ComponentManager.getTextField(`${LanguageManager.getlocal(`skinnextLv`)}：`, 20, 0x420E00);
            //     view.addChild(nextLevelTxt);
            //     App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, nextLevelTxt, group, [0,group.height+9]);
            //     let desc2Txt = ComponentManager.getTextField(LanguageManager.getlocal(`servantJibanDesc`), 20, 0x420E00);
            //     App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, desc2Txt, nextLevelTxt, [0,nextLevelTxt.height+10]);
            //     view.addChild(desc2Txt); 
            // }
            // let need = 400;
            // let cur = 250;
            // let tipTxt = ComponentManager.getTextField(`${LanguageManager.getlocal(`组合内门客总等价达到{1}/{2}级时解锁`, [cur+'',need+''])}`, 20, canActive ? 0x359270 : 0xAC0101);
            // view.addChild(tipTxt);
            // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, tipTxt, line, [0,line.height+4]);
        }
        else {
            if (canActive) {
                view.height = 256;
                var btn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "servantJibanUnlock", function () {
                    NetManager.request(NetRequestConst.REQUEST_SERVANT_ACTIVECOMB, {
                        servantId: param,
                        combinationId: param + data
                    });
                }, view);
                view.addChild(btn);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, btn, group, [0, group.height + 10]);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, line, btn, [0, btn.height + 10]);
            }
            else {
                view.height = 236;
                var tipTxt = ComponentManager.getTextField("" + LanguageManager.getlocal("servant_combinebuffneed", [needlv + '']), 20, 0xAC0101);
                view.addChild(tipTxt);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, group, [0, group.height + 10]);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, line, tipTxt, [0, tipTxt.height + 10]);
            }
        }
    };
    ServantJibanBuffItem.prototype.dispose = function () {
        //App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_USE_ITEM),this.useBtnHandlerCallBaclk,this);
        _super.prototype.dispose.call(this);
    };
    return ServantJibanBuffItem;
}(ScrollListItem));
__reflect(ServantJibanBuffItem.prototype, "ServantJibanBuffItem");
