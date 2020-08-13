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
var AcNewYearViewTab1 = (function (_super) {
    __extends(AcNewYearViewTab1, _super);
    function AcNewYearViewTab1() {
        var _this = _super.call(this) || this;
        _this._progressBar = null;
        _this._cfgObj = null;
        _this._arrReward = [];
        _this._acNewYearVo = null;
        _this._myScore = 0;
        _this._needTxt = null;
        _this._maxScore = 0;
        _this._downTitleLine = null;
        _this.scrollView = null;
        _this._boxList = [];
        _this._btnTypeNum = 0;
        _this.newYearCfg = [
            {
                id: 1,
                acnewyearPosY: -165,
            },
            {
                id: 2,
                acnewyearPosY: -30,
            },
            {
                id: 3,
                acnewyearPosY: 80,
            },
            {
                id: 4,
                acnewyearPosY: 155,
            },
            {
                id: 5,
                acnewyearPosY: 225,
            },
        ];
        _this.initView();
        return _this;
    }
    AcNewYearViewTab1.prototype.initView = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETNEWYEARREWARD), this.updata, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_BUYNEWYEARGIFT), this.updata, this);
        this._nodeContainer = new BaseDisplayObjectContainer();
        if (AcNewYearView.CODE == "10" || AcNewYearView.CODE == "11") {
            this._nodeContainer.width = 640;
        }
        this.addChild(this._nodeContainer);
        var tmpVo = Api.acVoApi.getActivityVoByAidAndCode(AcNewYearView.AID, AcNewYearView.CODE);
        this._acNewYearVo = tmpVo;
        this._myScore = this._acNewYearVo.getScore();
        this._cfgObj = Config.AcCfg.getCfgByActivityIdAndCode(AcNewYearView.AID, AcNewYearView.CODE);
        var curr_arr = this._cfgObj.itemListCfg.totalScoreReward;
        this._arrReward = [];
        var needScoreArr = [];
        for (var key in curr_arr) {
            if (Number(key)) {
                var reward = curr_arr[key].reward;
                if (reward.indexOf('4013') > -1 && !Api.switchVoApi.checkIsTitleState('4013')) {
                    curr_arr[key].reward = reward.substring(10, reward.length);
                }
                this._arrReward.push(curr_arr[key]);
                // var downbottom: BaseBitmap = BaseBitmap.create("acnewyear_bottom");
                // // downbottom.y=this.newYearCfg[Number(key)-1].acnewyearPosY+210;
                // downbottom.y = 45 + (maxN - curr_arr[key].needScore) / maxN * (507 - 45);
                // downbottom.x=60;
                // this._nodeContainer.addChild(downbottom); 
                needScoreArr.push(curr_arr[key].needScore);
            }
        }
        AcNewYearViewTab1.SCOREARR = [];
        for (var index = 0; index < needScoreArr.length; index++) {
            var element = needScoreArr[index];
            AcNewYearViewTab1.SCOREARR.push(element);
        }
        // AcNewYearViewTab1.SCOREARR = AcNewYearViewTab1.SCOREARR.concat(needScoreArr);
        needScoreArr.reverse();
        this._maxScore = needScoreArr[0];
        if (AcNewYearView.CODE != "10" && AcNewYearView.CODE != "11") {
            for (var i = 0; i < needScoreArr.length; i++) {
                var downbottom = BaseBitmap.create("acnewyear_bottom");
                downbottom.y = 45 + (this._maxScore - needScoreArr[i]) / this._maxScore * (507 - 45);
                downbottom.x = 60;
                this._nodeContainer.addChild(downbottom);
                var downbottomTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_TITLE_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
                downbottomTxt.text = needScoreArr[i];
                // downbottomTxt.setPosition(downbottom.x+15, this.newYearCfg[i].acnewyearPosY+210);
                downbottomTxt.x = downbottom.x + 15;
                downbottomTxt.y = 45 + (this._maxScore - needScoreArr[i]) / this._maxScore * (507 - 45);
                downbottomTxt.width = 60;
                downbottomTxt.textAlign = "right";
                this._nodeContainer.addChild(downbottomTxt);
            }
        }
        //45 -- 507
        var downTitleLine = BaseBitmap.create("acnewyear_middlebg");
        // downTitleLine.width = 627;
        if (AcNewYearView.CODE == "10" || AcNewYearView.CODE == "11") {
            downTitleLine.setPosition(6, -299);
        }
        else {
            downTitleLine.setPosition(6, -296);
        }
        this._downTitleLine = downTitleLine;
        this.addChild(downTitleLine);
        //当前拥有
        var titleTxt = ComponentManager.getTextField(LanguageManager.getlocal("newayearNeednumDes"), TextFieldConst.FONTSIZE_TITLE_COMMON);
        titleTxt.setPosition(190, downTitleLine.y + downTitleLine.height - 40);
        this.addChild(titleTxt);
        //中国结
        var chineseknot = null;
        if (AcNewYearView.CODE == "10" || AcNewYearView.CODE == "11") {
            chineseknot = BaseBitmap.create("acnewyear_chineseknot2_10");
        }
        else {
            chineseknot = BaseBitmap.create("acnewyear_chineseknot2_" + AcNewYearView.CODE);
        }
        // let chineseknot = BaseBitmap.create("acnewyear_chineseknot2_"+AcNewYearView.CODE);
        chineseknot.x = 300;
        if (AcNewYearView.CODE == "10" || AcNewYearView.CODE == "11") {
            chineseknot.y = titleTxt.y - 13;
        }
        else {
            chineseknot.y = titleTxt.y - 18;
        }
        this.addChild(chineseknot);
        //中国结 拥有多少个
        var needTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_TITLE_COMMON);
        needTxt.setPosition(chineseknot.x + 50, titleTxt.y);
        needTxt.text = this._myScore + "";
        this._needTxt = needTxt;
        this.addChild(needTxt);
        // let bottomBg = BaseBitmap.create("public_9v_bg04");
        // bottomBg.width=492;
        // bottomBg.height=506;
        // bottomBg.x=140;
        // bottomBg.y=downTitleLine.y+30;
        // this._nodeContainer.addChild(bottomBg); 
        this._arrReward.reverse();
        if (AcNewYearView.CODE == "10" || AcNewYearView.CODE == "11") {
            var bg = BaseBitmap.create("acnewyear_floorbg");
            bg.x = this._nodeContainer.width / 2 - bg.width / 2;
            bg.y = 0;
            this._nodeContainer.addChild(bg);
            this._nodeContainer.height = 669;
            var progressBg = BaseBitmap.create("acnewyear_progressbg");
            progressBg.x = 20;
            progressBg.y = 15;
            this._nodeContainer.addChild(progressBg);
            //进度条
            this._progressBar = ComponentManager.getProgressBar("progress_type1_yellow2", "progress_type3_bg", 550);
            this._progressBar.x = 45;
            this._progressBar.y = 590;
            this._progressBar.setTextSize(18);
            var v = this.getSameProgressValue(this._myScore, this._maxScore);
            console.log("v--->" + v, "this._myScore-->" + this._myScore);
            this._progressBar.setPercentage(v);
            this._progressBar.rotation = this._progressBar.rotation - 90;
            this._nodeContainer.addChild(this._progressBar);
            //568  35
            for (var i = 0; i < needScoreArr.length; i++) {
                var downbottom = BaseBitmap.create("acnewyear_bottom");
                // downbottom.y = 35 + (this._maxScore - needScoreArr[i]) / this._maxScore * (568 - 35);
                downbottom.x = 75;
                downbottom.y = 35 + (568 - 35) / needScoreArr.length * i; //(this._maxScore - needScoreArr[i]) / this._maxScore * (568 - 35);
                this._nodeContainer.addChild(downbottom);
                var downbottomTxt = ComponentManager.getTextField("", 22, TextFieldConst.COLOR_LIGHT_YELLOW);
                downbottomTxt.text = needScoreArr[i];
                // downbottomTxt.setPosition(downbottom.x+15, this.newYearCfg[i].acnewyearPosY+210);
                downbottomTxt.x = downbottom.x + downbottom.width - 15 - downbottomTxt.width;
                downbottomTxt.y = downbottom.y + downbottom.height / 2 - downbottomTxt.height / 2; //45 + (this._maxScore - needScoreArr[i]) / this._maxScore * (568 - 35);
                // downbottomTxt.width=60;
                // downbottomTxt.textAlign ="right";  
                this._nodeContainer.addChild(downbottomTxt);
            }
            for (var i_1 = 0; i_1 < this._arrReward.length; i_1++) {
                var floor = BaseBitmap.create("acnewyear_floor");
                floor.scaleX = 1 - (i_1 % 2) * 2;
                floor.x = 320 + floor.width * (1 - floor.scaleX) / 2;
                floor.y = 70 + i_1 * (floor.height - 30);
                this._nodeContainer.addChild(floor);
                var box = this.createBox(i_1, this._arrReward[i_1]);
                if (floor.scaleX == 1) {
                    box.x = floor.x + floor.width - 25;
                }
                else {
                    box.x = floor.x - floor.width + 25 - box.width;
                }
                box.y = floor.y - 45;
                this._nodeContainer.addChild(floor);
                this._nodeContainer.addChild(box);
            }
            var scrollRect1 = new egret.Rectangle(0, 0, 640, GameConfig.stageHeigth - 530 + 12);
            if (this.scrollView == null) {
                this.scrollView = ComponentManager.getScrollView(this._nodeContainer, scrollRect1);
                this.scrollView.x = 0;
                this.scrollView.y = -242;
                this.addChild(this.scrollView);
            }
            this.refreshBoxs();
        }
        else {
            var tmpRect = new egret.Rectangle(0, 0, GameConfig.stageWidth, 606);
            var scrollList = ComponentManager.getScrollList(NewYear1ScrollItem, this._arrReward, tmpRect, undefined, undefined, true);
            scrollList.y = 0; //downTitleLine.y+40;
            scrollList.x = 150;
            this._scrollList = scrollList;
            this._nodeContainer.addChild(scrollList);
            //进度条
            this._progressBar = ComponentManager.getProgressBar("progress_type1_yellow", "progress_type1_bg", 500);
            this._progressBar.x = 30;
            this._progressBar.y = 540;
            this._progressBar.setTextSize(18);
            this._progressBar.setPercentage(this._myScore / this._maxScore);
            this._progressBar.rotation = this._progressBar.rotation - 90;
            this._nodeContainer.addChild(this._progressBar);
            var scrollRect1 = new egret.Rectangle(0, 0, 640, GameConfig.stageHeigth - 530);
            if (this.scrollView == null) {
                this.scrollView = ComponentManager.getScrollView(this._nodeContainer, scrollRect1);
                this.scrollView.x = 0;
                this.scrollView.y = -230;
                this.addChild(this.scrollView);
            }
        }
        // let num = AcNewYearView.topBgHeight -this._nodeContainer.height;
        // this._nodeContainer.y=num/2-50; 
    };
    AcNewYearViewTab1.prototype.getSameProgressValue = function (curScore, maxScore) {
        if (curScore == maxScore) {
            return 1;
        }
        var totalScoreReward = this._cfgObj.itemListCfg.totalScoreReward;
        var reward = [];
        for (var key in totalScoreReward) {
            if (Number(key)) {
                reward.push(totalScoreReward[key]);
            }
        }
        // let reward:Array<any> = this._cfgObj.itemListCfg.totalScoreReward;
        for (var i = 0; i < reward.length; i++) {
            if (curScore <= reward[i].needScore) {
                var base = i / reward.length;
                var lastS = 0;
                if (i == 0) {
                    lastS = 0;
                }
                else {
                    lastS = reward[i - 1].needScore;
                }
                var plus = (curScore - lastS) / (reward[i].needScore - lastS) * (1 / reward.length);
                return base + plus;
            }
        }
        return 0;
    };
    AcNewYearViewTab1.prototype.refreshBoxs = function () {
        for (var i = 0; i < this._arrReward.length; i++) {
            var data = this._arrReward[i];
            if (AcNewYearViewTab1.SCOREARR[0] == 3200) {
                AcNewYearViewTab1.SCOREARR.reverse();
            }
            var curr_acNewYearVo = Api.acVoApi.getActivityVoByAidAndCode(AcNewYearView.AID, AcNewYearView.CODE);
            var index = AcNewYearViewTab1.SCOREARR.indexOf(data.needScore);
            // this._packageStateTxt.visible =true;
            var num = index += 1;
            if (this._myScore >= data.needScore) {
                if (curr_acNewYearVo.getBtnType(num)) {
                    //已领取
                    var boxicon = this._boxList[i].getChildByName("box");
                    App.DisplayUtil.changeToGray(boxicon);
                    var boxborder = this._boxList[i].getChildByName("border");
                    App.DisplayUtil.changeToGray(boxborder);
                    var light = this._boxList[i].getChildByName("light");
                    if (light) {
                        egret.Tween.removeTweens(light);
                        light.visible = false;
                    }
                    App.CommonUtil.removeIconFromBDOC(this._boxList[i]);
                }
                else {
                    //可领取
                    // let boxicon = this._boxList[i].getChildByName("box");
                    // App.DisplayUtil.changeToNormal(boxicon);
                    var light = this._boxList[i].getChildByName("light");
                    if (light) {
                        light.visible = true;
                        egret.Tween.get(light, { loop: true }).to({ rotation: light.rotation + 360 }, 10000);
                    }
                    //红点
                    App.CommonUtil.addIconToBDOC(this._boxList[i]);
                }
            }
            else {
                //没达到
                // this._packageStateTxt.visible =false;
            }
        }
    };
    AcNewYearViewTab1.prototype.createBox = function (index, data) {
        var box = new BaseDisplayObjectContainer();
        var light = BaseBitmap.create("dailytask_box_light");
        light.scaleX = 2;
        light.scaleY = 2;
        light.anchorOffsetX = light.width / 2;
        light.anchorOffsetY = light.height / 2;
        light.name = "light";
        light.visible = false;
        box.addChild(light);
        box.addTouchTap(this.big_packageHandler, this, [index]);
        var small_package_bg = BaseBitmap.create("progress6_bg");
        small_package_bg.name = "border";
        box.addChild(small_package_bg);
        small_package_bg.scaleX = 0.75;
        small_package_bg.scaleY = 0.75;
        // small_package_bg.x=20;
        // small_package_bg.y=5;
        box.width = small_package_bg.width * small_package_bg.scaleX;
        box.height = small_package_bg.height * small_package_bg.scaleY;
        light.x = box.width / 2;
        light.y = box.height / 2;
        var big_package = null;
        if (index == 0) {
            big_package = BaseBitmap.create("acnewyear_big_package");
            // big_package.x=30;//small_package_bg.x+5;
            // big_package.y=small_package_bg.y;
            big_package.x = box.width / 2 - big_package.width / 2;
            big_package.y = box.height / 2 - big_package.height / 2;
        }
        else {
            big_package = BaseBitmap.create("acnewyear_small_package");
            big_package.x = box.width / 2 - big_package.width / 2;
            big_package.y = box.height / 2 - big_package.height / 2;
        }
        big_package.name = "box";
        box.addChild(big_package);
        var nameBg = BaseBitmap.create("public_lockbg");
        // nameBg.width = 130;
        // nameBg.height = 22;
        nameBg.scaleX = 130 / nameBg.width;
        nameBg.scaleY = 24 / nameBg.height;
        nameBg.x = box.width / 2 - nameBg.width * nameBg.scaleX / 2;
        nameBg.y = box.height - 10;
        box.addChild(nameBg);
        var PackageTxt = ComponentManager.getTextField("", 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        var num = index + 1;
        var str = null;
        if (AcNewYearView.CODE == "10" || AcNewYearView.CODE == "11") {
            str = LanguageManager.getlocal("acNewYearfestivalDes" + num + "_10");
        }
        else {
            str = LanguageManager.getlocal("acNewYearfestivalDes" + num + "_" + AcNewYearView.CODE);
        }
        // var str = LanguageManager.getlocal("acNewYearfestivalDes"+num+"_"+AcNewYearView.CODE);
        PackageTxt.text = str;
        PackageTxt.x = nameBg.x + nameBg.width * nameBg.scaleX / 2 - PackageTxt.width / 2;
        PackageTxt.y = nameBg.y + nameBg.height * nameBg.scaleY / 2 - PackageTxt.height / 2;
        box.addChild(PackageTxt);
        // let chineseknot:BaseBitmap = null;
        // if(AcNewYearView.CODE == "10" || AcNewYearView.CODE == "11"){
        // }
        // //中国结
        // let chineseknot:BaseBitmap = BaseBitmap.create("acnewyear_chineseknot2_"+AcNewYearView.CODE);   
        var chineseknot = BaseBitmap.create("acnewyear_chineseknot2_10");
        box.addChild(chineseknot);
        //拥有多少个中国结
        var needNumTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_WHITE);
        needNumTxt.text = data.needScore + "";
        chineseknot.x = nameBg.x + nameBg.width * nameBg.scaleX / 2 - (chineseknot.width + needNumTxt.width) / 2;
        chineseknot.y = nameBg.y + nameBg.height * nameBg.scaleY;
        needNumTxt.x = chineseknot.x + chineseknot.width;
        needNumTxt.y = chineseknot.y + chineseknot.height / 2 - needNumTxt.height / 2;
        box.addChild(needNumTxt);
        box.name = "box";
        this._boxList.push(box);
        return box;
    };
    AcNewYearViewTab1.prototype.big_packageHandler = function (evt, idx) {
        console.log(evt, idx);
        var tmpVo = Api.acVoApi.getActivityVoByAidAndCode(AcNewYearView.AID, AcNewYearView.CODE);
        if (tmpVo.isStart == false) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        var rdata = this._arrReward[idx];
        var data = {};
        data.reward = rdata.reward;
        data._name = "newYear1";
        var index = AcNewYearViewTab1.SCOREARR.indexOf(rdata.needScore);
        data.rewardNum = index + 1;
        // data._btnTypeNum = this._btnTypeNum;
        data._btnTypeNum = 0;
        var num = index += 1;
        var curr_acNewYearVo = Api.acVoApi.getActivityVoByAidAndCode(AcNewYearView.AID, AcNewYearView.CODE);
        if (this._myScore >= rdata.needScore) {
            if (curr_acNewYearVo.getBtnType(num)) {
            }
            else {
                data._btnTypeNum = 2;
            }
        }
        ViewController.getInstance().openView(ViewConst.POPUP.ACNEWYEARPOPUPVIEW, data);
    };
    AcNewYearViewTab1.prototype.updata = function (evt) {
        var tmpVo = Api.acVoApi.getActivityVoByAidAndCode(AcNewYearView.AID, AcNewYearView.CODE);
        this._myScore = tmpVo.getScore();
        if (this._progressBar) {
            if (AcNewYearView.CODE == "10" || AcNewYearView.CODE == "11") {
                var v = this.getSameProgressValue(this._myScore, this._maxScore);
                console.log("v--->", "this._myScore-->", this._myScore);
                this._progressBar.setPercentage(v);
            }
            else {
                this._progressBar.setPercentage(this._myScore / this._maxScore);
            }
        }
        if (this._needTxt) {
            this._needTxt.text = "" + this._myScore;
        }
        if (AcNewYearView.CODE == "10" || AcNewYearView.CODE == "11") {
            this.refreshBoxs();
        }
        else {
            if (this._scrollList) {
                this._scrollList.refreshData(this._arrReward);
                this._scrollList.y = 0; //this._downTitleLine.y;//+40;
            }
        }
        if (evt.data.data.ret == 0 && evt.data.data.data.rewards) {
            App.CommonUtil.playRewardFlyAction(GameData.formatRewardItem(evt.data.data.data.rewards));
        }
    };
    // 页签类型
    AcNewYearViewTab1.prototype.getSheepType = function () {
        return 1;
    };
    AcNewYearViewTab1.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETNEWYEARREWARD), this.updata, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_BUYNEWYEARGIFT), this.updata, this);
        this._scrollList = null;
        this._newYearInfoVoList = null;
        this._progressBar = null;
        this._cfgObj = null;
        this._arrReward = [];
        this._nodeContainer = null;
        this._acNewYearVo = null;
        this._myScore = null;
        this._needTxt = null;
        this._maxScore = null;
        AcNewYearViewTab1.SCOREARR = [];
        this._boxList = [];
        this._btnTypeNum = 0;
        _super.prototype.dispose.call(this);
    };
    AcNewYearViewTab1.SCOREARR = [];
    return AcNewYearViewTab1;
}(CommonViewTab));
__reflect(AcNewYearViewTab1.prototype, "AcNewYearViewTab1");
