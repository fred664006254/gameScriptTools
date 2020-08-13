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
 * 头像框展示
 * author ycg
 * date 2019.10.10
 * @class AcCommonRewardHeadTitleView
 */
var AcCommonRewardHeadTitleView = (function (_super) {
    __extends(AcCommonRewardHeadTitleView, _super);
    function AcCommonRewardHeadTitleView(params) {
        var _this = _super.call(this) || this;
        _this.data = null;
        if (params) {
            _this.data = params;
        }
        return _this;
        // egret.callLater(this.initView, this);
    }
    AcCommonRewardHeadTitleView.prototype.initView = function () {
        // if (this.data){
        //     let container = null;
        //     let idType = (this.data.idType).split("_");
        //     container = this.getTitleView(idType[1], this.data.bgName);
        //     this.width = container.width;
        //     container.setPosition(0,0);
        //     this.addChild(container);
        // }
    };
    AcCommonRewardHeadTitleView.prototype.init = function () {
        if (this.data) {
            var container = null;
            var idType = (this.data.idType).split("_");
            container = this.getTitleView(idType[1], this.data.bgName);
            this.width = container.width;
            container.setPosition(0, 0);
            this.addChild(container);
        }
    };
    //头像框
    AcCommonRewardHeadTitleView.prototype.getTitleView = function (titleid, bgName) {
        var container = new BaseDisplayObjectContainer();
        container.width = 540;
        var view = container;
        var bgNameStr = "battlepassrewardbg";
        if (bgName) {
            bgNameStr = bgName;
        }
        var bigbg = BaseLoadBitmap.create(bgNameStr);
        // bigbg.height = 677;
        bigbg.width = 540; //544
        bigbg.height = 710; //730
        bigbg.setPosition(0, 0);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, bigbg, view);
        container.addChild(bigbg);
        var topbg = BaseLoadBitmap.create("acchristmasview_rewardtopbg");
        topbg.width = 544;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topbg, bigbg);
        view.addChild(topbg);
        var tcfg = Config.TitleCfg.getTitleCfgById(titleid);
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("acRechargeBoxSpHeadTitleTip"), 20);
        tipTxt.lineSpacing = 5;
        tipTxt.width = topbg.width - 20;
        tipTxt.textAlign = egret.HorizontalAlign.CENTER;
        topbg.height = tipTxt.textHeight + 30;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, topbg, [0, 10]);
        view.addChild(tipTxt);
        var pos1 = {
            1: {
                scale: 0.7, layout: LayoutConst.rightbottom, dis: [50, 70], arrowx: -20, arrowy: 15, rotaion: 120,
            },
            2: {
                scale: 0.7, layout: LayoutConst.horizontalCenterbottom, dis: [0, 140], arrowx: -25, arrowy: -5, rotaion: 120,
            },
            3: {
                scale: 0.8, layout: LayoutConst.leftbottom, dis: [20, 250], arrowx: 135, arrowy: 0, rotaion: -120,
            },
            4: {
                scale: 0.9, layout: LayoutConst.horizontalCenterbottom, dis: [-15, 370], arrowx: 145, arrowy: 30, rotaion: -120,
            },
            5: {
                scale: 1, layout: LayoutConst.rightbottom, dis: [25, 460]
            },
        };
        var pos2 = {
            1: {
                scale: 0.8, layout: LayoutConst.rightbottom, dis: [70, 70], arrowx: -110, arrowy: -15, rotaion: 125,
            },
            2: {
                scale: 0.9, layout: LayoutConst.leftbottom, dis: [50, 270], arrowx: 195, arrowy: -40, rotaion: -130,
            },
            3: {
                scale: 1, layout: LayoutConst.rightbottom, dis: [55, 480]
            },
        };
        if (tcfg.changePic) {
            var pos = {};
            if (tcfg.changePic.length == 3) {
                pos = pos2;
            }
            else if (tcfg.changePic.length == 5) {
                pos = pos1;
            }
            for (var i in tcfg.changePic) {
                var unit = tcfg.changePic[i];
                var idx = Number(i) + 1;
                var poscfg = pos[idx];
                var group = new BaseDisplayObjectContainer();
                view.addChild(group);
                group.setScale(poscfg.scale);
                var ishead = tcfg.isTitle == 2;
                var headbg = BaseBitmap.create("battlepassrewardbg" + (ishead ? 2 : 1));
                group.addChild(headbg);
                var headcircle = ishead ? App.CommonUtil.getHeadPic(tcfg.id, unit) : App.CommonUtil.getTitlePic(tcfg.id, unit);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, headcircle, headbg, [0, ishead ? 5 : 50]);
                group.addChild(headcircle);
                // let effName = `head_${tcfg.id}_${idx}effect`;
                // if(RES.hasRes(effName)){
                // 	let clip = ComponentManager.getCustomMovieClip(effName, 10, 130);
                // 	let skinTxtEffectBM = BaseLoadBitmap.create(`${effName}1`,null,{
                // 		callback:()=>{
                // 			clip.width = skinTxtEffectBM.width;
                // 			clip.height = skinTxtEffectBM.height;
                // 			clip.playWithTime(-1);
                // 			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, clip, headcircle, [-9,-8]);
                // 			group.addChild(clip);
                // 		},
                // 		callbackThisObj : this
                // 	});
                // }
                var levelTxt = ComponentManager.getTextField(LanguageManager.getlocal("servant_lv", [unit.toString()]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, levelTxt, headbg, [0, 7]);
                group.addChild(levelTxt);
                App.DisplayUtil.setLayoutPosition(poscfg.layout, group, bigbg, poscfg.dis);
                if (poscfg.arrowx) {
                    var arrow = BaseBitmap.create("studyatk_arrow");
                    arrow.anchorOffsetX = arrow.width / 2;
                    arrow.anchorOffsetY = arrow.height / 2;
                    arrow.setScale(0.6);
                    arrow.x = group.x + poscfg.arrowx;
                    arrow.y = group.y + poscfg.arrowy;
                    arrow.rotation = poscfg.rotaion;
                    view.addChild(arrow);
                }
            }
        }
        else {
            tipTxt.text = LanguageManager.getlocal("acRechargeBoxSpHeadTitleTip2");
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tipTxt, topbg);
            var ishead = tcfg.isTitle == 2;
            var headbg = BaseBitmap.create("battlepassrewardbg" + (ishead ? 2 : 1));
            view.addChild(headbg);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, headbg, bigbg);
            var jsonData = RES.getRes("head_4037_effect");
            console.log(jsonData);
            var headcircle = ishead ? App.CommonUtil.getHeadPic(tcfg.id, 1, null, true, 8) : App.CommonUtil.getTitlePic(tcfg.id, 1);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, headcircle, headbg, [0, ishead ? 5 : 50]);
            view.addChild(headcircle);
        }
        return view;
    };
    AcCommonRewardHeadTitleView.prototype.getResourceList = function () {
        var arr = [];
        arr = [
            "studyatk_arrow", "battlepassrewardbg1", "battlepassrewardbg2"
        ];
        return arr;
    };
    AcCommonRewardHeadTitleView.prototype.getParent = function () {
        return null;
    };
    AcCommonRewardHeadTitleView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcCommonRewardHeadTitleView;
}(CommonViewTab));
__reflect(AcCommonRewardHeadTitleView.prototype, "AcCommonRewardHeadTitleView");
//# sourceMappingURL=AcCommonRewardHeadTitleView.js.map