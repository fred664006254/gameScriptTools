/**
 * 练武场书籍升级，门客弹出UI
 * author yanyuling
 * date 2017/12/02
 * @class StudyAtkBookLvupSuccessView
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
var StudyAtkBookLvupSuccessView = (function (_super) {
    __extends(StudyAtkBookLvupSuccessView, _super);
    function StudyAtkBookLvupSuccessView() {
        return _super.call(this) || this;
    }
    StudyAtkBookLvupSuccessView.prototype.initView = function () {
        var bookId = this.param.data[0];
        var servantIdList = this.param.data[1];
        var bookCfg = GameConfig.config.abilityCfg[bookId];
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChild(this._nodeContainer);
        // this.addTouchTap(this.clickHandler,this)
        var bottomBg = BaseBitmap.create("public_9_wordbg");
        bottomBg.height = GameConfig.stageHeigth - 200;
        bottomBg.y = GameConfig.stageHeigth - bottomBg.height - 2;
        this._nodeContainer.addChild(bottomBg);
        var closeBtn = ComponentManager.getButton("commonview_closebtn1", "", this.hide, this);
        closeBtn.x = this.viewBg.width - closeBtn.width;
        closeBtn.y = bottomBg.y - closeBtn.height / 2 - 25;
        this._nodeContainer.addChild(closeBtn);
        // let closeBtn = 
        var titleFlag = BaseBitmap.create("studyatk_servant_title");
        titleFlag.x = bottomBg.x + bottomBg.width / 2 - titleFlag.width / 2;
        titleFlag.y = bottomBg.y - titleFlag.height / 2 - 15;
        this._nodeContainer.addChild(titleFlag);
        // studyatk_booklv
        // let upgradeClip = ComponentManager.getCustomMovieClip("studyatk_booklv",13,100);
        // upgradeClip.anchorOffsetX = 180;
        // upgradeClip.anchorOffsetY = 90;
        // upgradeClip.setScale(1.2);
        // upgradeClip.x = bottomBg.x + bottomBg.width/2 ;
        // upgradeClip.y = bottomBg.y;
        // this._nodeContainer.addChild(upgradeClip);
        // upgradeClip.playWithTime(1);
        var tipTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_WHITE);
        tipTxt.text = LanguageManager.getlocal("studyatkBook_upgradeTip2", [String(Object.keys(servantIdList).length)]);
        tipTxt.x = bottomBg.x + bottomBg.width / 2 - tipTxt.width / 2;
        tipTxt.y = bottomBg.y + 45;
        this._nodeContainer.addChild(tipTxt);
        var scrollH = bottomBg.height - 100;
        var rect = new egret.Rectangle(0, 0, GameConfig.stageWidth, scrollH);
        var tmpNode = new BaseDisplayObjectContainer();
        var StartY = 20;
        var StartX = -10;
        var index = 0;
        //wifeview_wenzibg2
        for (var servantId in servantIdList) {
            var sbg = BaseBitmap.create("studyatk_servant_bg");
            sbg.y = StartY;
            sbg.width = 368;
            sbg.height = 368;
            if (index % 2 == 0) {
                sbg.x = StartX;
            }
            else {
                sbg.x = GameConfig.stageWidth - StartX - sbg.width;
                StartY += 340;
            }
            tmpNode.addChild(sbg);
            var circleImg = BaseBitmap.create("studyatk_booklv_circle");
            circleImg.anchorOffsetX = circleImg.width / 2;
            circleImg.anchorOffsetY = circleImg.height / 2;
            // circleImg.setScale(0.5);
            circleImg.x = sbg.x + sbg.width / 2;
            circleImg.y = sbg.y + sbg.height / 2;
            var light1 = BaseBitmap.create("studyatk_booklv_light1");
            light1.anchorOffsetX = light1.width / 2;
            light1.anchorOffsetY = light1.height / 2;
            light1.x = sbg.x + sbg.width / 2;
            light1.y = sbg.y + sbg.height / 2;
            light1.setScale(2.18);
            tmpNode.addChild(light1);
            var light2 = BaseBitmap.create("studyatk_booklv_light2");
            light2.anchorOffsetX = light2.width / 2;
            light2.anchorOffsetY = light2.height / 2;
            light2.x = light1.x;
            light2.y = light1.y;
            light2.setScale(light1.scaleX);
            tmpNode.addChild(light2);
            tmpNode.addChild(circleImg);
            egret.Tween.get(circleImg, { loop: true }).to({ scaleX: 1.25, scaleY: 1.25 }, 1000).to({ scaleX: 2.0, scaleY: 2.0, alpha: 0 }, 1000).set({ scaleX: 0.5, scaleY: 0.5, alpha: 1 });
            egret.Tween.get(light1, { loop: true }).to({ rotation: 360 }, 15000);
            egret.Tween.get(light2, { loop: true }).to({ rotation: -360 }, 15000);
            var fulImg = Api.servantVoApi.getFullImgPathWithId(servantId);
            var simg = BaseLoadBitmap.create(fulImg);
            var mask = egret.Rectangle.create();
            simg.width = 640;
            simg.height = 482;
            mask.setTo(0, 0, 640, 400);
            // simg.width = 368;
            // simg.height = 424;
            // mask.setTo(0,0,368,368);
            simg.mask = mask;
            simg.anchorOffsetX = simg.width / 2;
            simg.anchorOffsetY = simg.height / 2;
            simg.setScale(0.7);
            simg.x = sbg.x + sbg.width / 2;
            simg.y = sbg.y + sbg.height / 2 - 10;
            tmpNode.addChild(simg);
            var bookBg = BaseBitmap.create("wifeview_wenzibg2");
            // bookBg.scaleY = 1.5;
            bookBg.height = 60;
            bookBg.x = sbg.x + sbg.width / 2 - bookBg.width / 2;
            bookBg.y = sbg.y + sbg.height - 95;
            tmpNode.addChild(bookBg);
            var bookNameTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_WARN_GREEN2);
            bookNameTxt.text = LanguageManager.getlocal("servant_attrNameTxt" + bookId) + "+1";
            bookNameTxt.x = bookBg.x + bookBg.width / 2 - bookNameTxt.width / 2;
            bookNameTxt.y = bookBg.y + 5;
            tmpNode.addChild(bookNameTxt);
            var attrV = servantIdList[servantId];
            var addAttrTxt = ComponentManager.getTextField("", bookNameTxt.size, bookNameTxt.textColor);
            addAttrTxt.text = LanguageManager.getlocal("servantInfo_speciality" + bookCfg.type) + "+" + attrV;
            addAttrTxt.x = bookBg.x + bookBg.width / 2 - addAttrTxt.width / 2;
            addAttrTxt.y = bookNameTxt.y + bookNameTxt.height + 2;
            tmpNode.addChild(addAttrTxt);
            index++;
        }
        var scrollView = ComponentManager.getScrollView(tmpNode, rect);
        scrollView.y = bottomBg.y + 80;
        scrollView.bounces = false;
        scrollView.horizontalScrollPolicy = "off";
        // scrollView.touchEnabled = false;
        this._nodeContainer.addChild(scrollView);
    };
    StudyAtkBookLvupSuccessView.prototype.clickHandler = function () {
        _super.prototype.hide.call(this);
    };
    StudyAtkBookLvupSuccessView.prototype.getTitleStr = function () {
        return null;
    };
    // protected getCloseBtnName():string
    // {
    // 	return "commonview_closebtn1";
    // }
    StudyAtkBookLvupSuccessView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "studyatk_servant_bg", "wifeview_wenzibg2", "popupview_closebtn1", "studyatk_servant_title",
            "studyatk_booklv_circle", "studyatk_booklv_light1", "studyatk_booklv_light2"
        ]);
    };
    StudyAtkBookLvupSuccessView.prototype.dispose = function () {
        this._nodeContainer = null;
        _super.prototype.dispose.call(this);
    };
    return StudyAtkBookLvupSuccessView;
}(BaseView));
__reflect(StudyAtkBookLvupSuccessView.prototype, "StudyAtkBookLvupSuccessView");
