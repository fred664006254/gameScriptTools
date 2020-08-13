/*
author : qianjun
desc : 双十一活动
*/
class AcSingleDayView extends AcCommonView{
    public constructor(){
        super();
    }
    private public_dot1:BaseBitmap =null;
    private public_dot2:BaseBitmap =null;
    private public_dot3:BaseBitmap =null;
    private _descTxt : BaseTextField = null;
    private _descTxtBg : BaseBitmap = null;
    private _descGroup : BaseDisplayObjectContainer = null;
    private _cdtxt : BaseTextField = null;
    private _topbg : BaseBitmap = null;

    private _timeBg:BaseBitmap = null;
    private _acTimeTf:BaseTextField = null;


    private get cfg() : Config.AcCfg.SingleDayCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcSingleDayVo{
        return <AcSingleDayVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
	}
    
    protected getBgName():string{
        return `acsingleday_bg${this.uiCode}`;
    }

    private get uiCode():string{
        if (this.code == "3"){
            return "2";
        }
        return this.code;
    }

    protected initBg():void{
        let bgName:string=this.getBgName();
		if(bgName){
			this.viewBg = BaseBitmap.create(bgName);
			if(this.isTouchMaskClose())
			{
				this.viewBg.touchEnabled=true;
			}
			this.addChild(this.viewBg);
			this.viewBg.width = GameConfig.stageWidth;
            this.viewBg.y = GameConfig.stageHeigth - 1136;
		}
    }

    protected getTitleStr():string{
        if (this.uiCode == "1"){
            return "ac"+App.StringUtil.firstCharToUper(this.acVo.aidAndCode)+"_Title";
        }
        return null;
    }

    protected getTitleBgName():string{
        if (this.uiCode == "1"){
            return "commonview_titlebg"+this.uiType;
        }
        return "acsingleday_titlebg-"+this.uiCode;
    }

    protected isHideTitleBgShadow():boolean{
        return true;
    }
    
    private _count = 0;
    public initView(){
        let view = this;
        view._nowDescId = 2;
        view._count = 0;
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY,this.update,this);
        let topBgImg = "ac_skinoflibai_infobg-1";
        if (this.uiCode == "1"){
            topBgImg = "forpeople_top";
        }
        let topbg = BaseBitmap.create(topBgImg);
        topbg.width = view.width;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topbg, view.titleBg, [0,view.titleBg.height]);
        if (this.uiCode == "2"){
            topbg.y = view.titleBg.y + view.titleBg.height - 50;
            view.addChildToContainer(topbg);
        }
        else{
            view.addChild(topbg);
        }
        
        view._topbg = topbg;

        let timeDescTxt = ComponentManager.getTextField(LanguageManager.getlocal('acmidAutumnAcInfoTime', [view.vo.acTimeAndHour]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, timeDescTxt, topbg, [20,10]);
        view.addChild(timeDescTxt);
        if (this.uiCode == "2"){
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, timeDescTxt, view.titleBg, [20,view.titleBg.height + 10]);
        }
        
        let ruleTxt = ComponentManager.getTextField(LanguageManager.getlocal('acSingleDayRuleTxt'), 20);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, ruleTxt, timeDescTxt, [0, timeDescTxt.textHeight + 5]);
        view.addChild(ruleTxt);

        let ruleDescTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acSingleDayRule-${view.uiCode}`), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        ruleDescTxt.width = 500;
        ruleDescTxt.lineSpacing = 5;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, ruleDescTxt, ruleTxt, [ruleTxt.textWidth,0]);
        view.addChild(ruleDescTxt);

        if (this.uiCode == "1"){
            topbg.height = ruleDescTxt.y + ruleDescTxt.textHeight + 10 - topbg.y;
            let cd = view.vo.et - 86400 - GameData.serverTime;
            let cdTxt = ComponentManager.getTextField('', 20, TextFieldConst.COLOR_WARN_RED3);
            cdTxt.text = cd > 0 ? (LanguageManager.getlocal('acSingleDayGetRed4',[App.DateUtil.getFormatBySecond(cd)])) : LanguageManager.getlocal('acPunishEnd');
            cdTxt.lineSpacing = 5;
            App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, cdTxt, topbg, [20,10]);
            view.addChild(cdTxt);
            view._cdtxt = cdTxt;

            let mask1 = BaseBitmap.create('acsingleday_bg_mask1');
            mask1.addTouch((e : egret.Event)=>{
                if(e.type==egret.TouchEvent.TOUCH_BEGIN){
                    if(mask1.alpha == 0){
                        mask1.alpha = 0.3;
                    }
                    else{
                        mask1.alpha = 0;
                    }
                }
                else if(e.type==egret.TouchEvent.TOUCH_CANCEL){
                    mask1.alpha = 0;
                }
                if(e.type==egret.TouchEvent.TOUCH_END){
                    mask1.alpha = 0;
                    ViewController.getInstance().openView(ViewConst.COMMON.ACSINGLEDAYBUILD1VIEW,{
                        code : this.code,
                        aid : this.aid
                    })
                }
            },view,null,true);
            mask1.setScale(5);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, mask1, view.viewBg, [-10,398]);
            view.addChild(mask1);

            let mask2 = BaseBitmap.create('acsingleday_bg_mask2');
            mask2.addTouch((e : egret.Event)=>{
                if(e.type==egret.TouchEvent.TOUCH_BEGIN){
                    if(mask2.alpha == 0){
                        mask2.alpha = 0.3;
                    }
                    else{
                        mask2.alpha = 0;
                    }
                }
                else if(e.type==egret.TouchEvent.TOUCH_CANCEL){
                    mask2.alpha = 0;
                }
                if(e.type==egret.TouchEvent.TOUCH_END){
                    mask2.alpha = 0;
                    ViewController.getInstance().openView(ViewConst.COMMON.ACSINGLEDAYSKINVIEW,{
                        code : this.code,
                        aid : this.aid
                    })
                }
            },view,null,true);
            mask2.setScale(5);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, mask2, view.viewBg, [-7.5,575]);
            view.addChild(mask2);

            let mask3 = BaseBitmap.create('acsingleday_bg_mask3');
            mask3.addTouch((e : egret.Event)=>{
                if(e.type==egret.TouchEvent.TOUCH_BEGIN){
                    if(mask3.alpha == 0){
                        mask3.alpha = 0.3;
                    }
                    else{
                        mask3.alpha = 0;
                    }
                }
                else if(e.type==egret.TouchEvent.TOUCH_CANCEL){
                    mask3.alpha = 0;
                }
                if(e.type==egret.TouchEvent.TOUCH_END){
                    mask3.alpha = 0;
                    ViewController.getInstance().openView(ViewConst.COMMON.ACSINGLEDAYBUILD3VIEW,{
                        code : this.code,
                        aid : this.aid
                    })
                }
            },view,null,true);
            mask3.setScale(5);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, mask3, view.viewBg, [0,730]);
            view.addChild(mask3);

            mask1.alpha = mask2.alpha = mask3.alpha = 0;

            let buildtxt1 = BaseBitmap.create('acsingleday_bottomname1');
            let buildclip1 = ComponentManager.getCustomMovieClip('buildName',10,200);
            buildclip1.width = 182 * 0.73;
            buildclip1.height = 91 * 0.842;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, buildclip1, view.viewBg, [-10,485]);
            view.addChild(buildclip1); 
            buildclip1.playWithTime(-1);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, buildtxt1, view.viewBg, [0,505]);
            view.addChild(buildtxt1);
            buildtxt1.alpha = 0;

            let buildtxt2 = BaseBitmap.create('acsingleday_bottomname2');
            let buildclip2 = ComponentManager.getCustomMovieClip('buildName',10,200);
            buildclip2.width = 182 * 0.78;
            buildclip2.height = 91 * 0.9;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, buildclip2, view.viewBg, [-9,610]);
            view.addChild(buildclip2); 
            buildclip2.playWithTime(-1);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, buildtxt2, view.viewBg, [0,630]);
            view.addChild(buildtxt2);
            buildtxt2.alpha = 0;
            

            let buildtxt3 = BaseBitmap.create('acsingleday_bottomname3');
            let buildclip3 = ComponentManager.getCustomMovieClip('buildName',10,200);
            buildclip3.width = 182 * 1;
            buildclip3.height = 91 * 1;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, buildclip3, view.viewBg, [0,845]);
            view.addChild(buildclip3); 
            buildclip3.playWithTime(-1);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, buildtxt3, view.viewBg, [0,875]);
            view.addChild(buildtxt3);
            buildtxt3.alpha = 0;

            let npc = BaseLoadBitmap.create('wife_skin_1091');
            npc.width = 640;
            npc.height = 840;
            npc.setScale(0.37);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, npc, view, [-50,0]);
            view.addChild(npc);

            let descgroup:BaseDisplayObjectContainer=new BaseDisplayObjectContainer();
            descgroup.width = 320;
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, descgroup, view, [160, 30]);
            view.addChild(descgroup);
            descgroup.alpha = 0;
            view._descGroup = descgroup;

            let descTxtBg = BaseBitmap.create('public_9_bg25');
            descTxtBg.width = 320;
            descTxtBg.anchorOffsetX = descTxtBg.width / 2;
            descTxtBg.scaleX = -1;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, descTxtBg, descgroup, [0, 0], true);
            descgroup.addChild(descTxtBg);
            view._descTxtBg = descTxtBg;

            let desctTxt = ComponentManager.getTextField('',20,TextFieldConst.COLOR_BROWN);
            desctTxt.width = 290;
            desctTxt.lineSpacing = 5;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, desctTxt, descTxtBg, [0, 15]);
            descgroup.addChild(desctTxt);
            view._descTxt = desctTxt;
                                
            let arrowbg : BaseBitmap = BaseBitmap.create("public_9_bg25_tail");
            arrowbg.anchorOffsetX = arrowbg.width / 2;
            arrowbg.anchorOffsetY = arrowbg.height / 2;
            arrowbg.scaleY = -1;
            descgroup.addChild(arrowbg);

            egret.Tween.get(descgroup, {loop : true}).call(()=>{
                let period = view.vo.getCurPeriod();
                let desc = '';
                let param = [];
                let code = view.uiCode;
        
                let rechargeFlag = view.vo.getpublicRedhot2();
                let usegemFlag = view.vo.getpublicRedhot3();
                if(period == 1){
                    if(view.vo.getIsCollectMax()){
                        let tmp = view.getPeriodText();
                        desc = tmp.desc;
                        param = tmp.param;
                    }
                    else{
                        desc = `acSingleDayDesc1-${code}`;
                    }
                }
                else{
                    let tmp = view.getPeriodText();
                    desc = tmp.desc;
                    param = tmp.param;
                }
                desctTxt.text = LanguageManager.getlocal(desc,param);
                descTxtBg.height = desctTxt.textHeight + 50;
                descgroup.height = descTxtBg.height + 10;
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, desctTxt, descTxtBg, [0, 15]);
                App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, descgroup, view, [160, 30]);
                App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, arrowbg, descTxtBg, [25,-arrowbg.height+5]);
            },view).to({alpha : 1},2000).wait(3000).to({alpha : 0}, 1500).call(()=>{
                view._count = 0;
            },view).wait(7000);  
            //红点1
            let public_dot1 =BaseBitmap.create("public_dot2");
            this.addChild(public_dot1); ;
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, public_dot1, buildtxt1, [buildtxt1.width * buildtxt1.scaleX - 30, -7]);
            this.public_dot1 = public_dot1;

            // //红点2
            // let public_dot2 =BaseBitmap.create("public_dot2");
            // this.addChild(public_dot2); ;
            // public_dot2.x = 280;//this.tabbarGroup.getChildAt(1).x + this.tabbarGroup.getChildAt(1).width-45;
            // public_dot2.y = this.tabbarGroup.y+10; 
            // this.public_dot2 = public_dot2;

            //  //红点3
            // let public_dot3 = BaseBitmap.create("public_dot2");
            // this.addChild(public_dot3); ;
            // public_dot3.x = 430;//this.tabbarGroup.getChildAt(2).x + this.tabbarGroup.getChildAt(2).width-45;
            // public_dot3.y = this.tabbarGroup.y+10; 
            // this.public_dot3 = public_dot3; 
            this.update();
            // ViewController.getInstance().openView(ViewConst.COMMON.ACSINGLEDAYSKINVIEW,{aid:this.aid,code:this.code});
            //  ViewController.getInstance().openView(ViewConst.BASE.ACSINGLEDAYENVELOPEVIEW);
        }
        else if (this.uiCode == "2"){
            this._timeBg = BaseBitmap.create("public_9_bg61");
            this._timeBg.y = topbg.y + topbg.height - this._timeBg.height / 2 - 2;
            this.addChild(this._timeBg);
            App.LogUtil.log("this.vo.getCountDown() "+this.vo.getCountDown())
            this._acTimeTf = ComponentManager.getTextField(LanguageManager.getlocal("acSkinoflibaiTimeCountDown", [this.vo.getCountDown()]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            this._timeBg.width = 60 + this._acTimeTf.width;
            this._timeBg.x = GameConfig.stageWidth - this._timeBg.width - 5;
            this._acTimeTf.setPosition(this._timeBg.x + this._timeBg.width / 2 - this._acTimeTf.width / 2, this._timeBg.y + this._timeBg.height / 2 - this._acTimeTf.height / 2);
            this.addChild(this._acTimeTf);

            //门客名字
            let namePos = [
                {x:496, y: GameConfig.stageHeigth - 264},
                {x:60, y: GameConfig.stageHeigth - 415},
                {x:100, y: GameConfig.stageHeigth - 673},
                {x:546, y: GameConfig.stageHeigth - 447},
                {x:504, y: GameConfig.stageHeigth - 646},
            ];
            if (PlatformManager.checkIsTextHorizontal()){
                namePos = [
                    {x:423, y: GameConfig.stageHeigth - 223},
                    {x:20, y: GameConfig.stageHeigth - 361},
                    {x:45, y: GameConfig.stageHeigth - 559},
                    {x:414, y: GameConfig.stageHeigth - 354},
                    {x:470, y: GameConfig.stageHeigth - 581}, 
                ];
            }
            let nameIds = this.vo.getShowSkinIds();
            for (let i=0; i < nameIds.length; i++){
                let nameBg = BaseBitmap.create("acsingleday_namebg-"+this.uiCode);
                this.addChild(nameBg);
                if (PlatformManager.checkIsTextHorizontal()){
                    nameBg.setPosition(namePos[i].x, namePos[i].y);
                }
                else{
                    nameBg.rotation = 90;
                    nameBg.setPosition(namePos[i].x + nameBg.height - 23, namePos[i].y);
                }
                let name = ComponentManager.getTextField(LanguageManager.getlocal("servant_name"+nameIds[i]), TextFieldConst.FONTSIZE_BUTTON_COMMON , TextFieldConst.COLOR_WHITE);
                this.addChild(name);
                if (PlatformManager.checkIsTextHorizontal()){
                    name.setPosition(nameBg.x + nameBg.width/2 - name.width/2, nameBg.y + 17);
                }
                else{
                    name.width = TextFieldConst.FONTSIZE_BUTTON_COMMON;
                    name.lineSpacing = 7;
                    name.setPosition(nameBg.x - 16 - name.width, nameBg.y + 30);
                }
            }

            let bottomBg = BaseBitmap.create("acsingleday_bottombg-"+this.uiCode);
            bottomBg.setPosition(GameConfig.stageWidth/2 - bottomBg.width/2, GameConfig.stageHeigth - bottomBg.height);
            this.addChild(bottomBg);

            //衣装预览
            let skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
            skinTxtEffect.width = 208;
            skinTxtEffect.height = 154;
            skinTxtEffect.setPosition(GameConfig.stageWidth/2 - skinTxtEffect.width/2, GameConfig.stageHeigth - skinTxtEffect.height);
            skinTxtEffect.blendMode = egret.BlendMode.ADD;
            this.addChild(skinTxtEffect);
            skinTxtEffect.playWithTime(-1);

            let skinTxt = BaseBitmap.create("acthrowstone_common_servant_txt");
            skinTxt.anchorOffsetX = skinTxt.width / 2;
            skinTxt.anchorOffsetY = skinTxt.height / 2;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxt, skinTxtEffect);
            this.addChild(skinTxt);
            egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);

            let skinTxt1 = BaseBitmap.create("acthrowstone_common_servant_txt");
            skinTxt1.anchorOffsetX = skinTxt1.width / 2;
            skinTxt1.anchorOffsetY = skinTxt1.height / 2;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxt1, skinTxtEffect);
            this.addChild(skinTxt1);
            skinTxt1.blendMode = egret.BlendMode.ADD;
            skinTxt1.alpha = 0;
            egret.Tween.get(skinTxt1, { loop: true }).to({ alpha: 0.7, scaleX: 0.9, scaleY: 0.9 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
            let skinData = [];
            for (let i=0; i < nameIds.length; i++){
                let titleStr = "servant_name"+nameIds[i];
                let skinId = Config.ServantCfg.formatRewardItemVoStr(nameIds[i]);
                let topMsg = LanguageManager.getlocal("acSingleDaySkinTopMsg-"+this.uiCode, [""+ LanguageManager.getlocal(titleStr)]);
                let data = {idType: skinId, topMsg:topMsg, bgName:"acthreekingdomrecharge_skinbg", scale: 0.8, offY: 2, title: titleStr};
                skinData[i] = data;
            }
            let title = "acCommonClothesServantTitle";
            skinTxt1.addTouchTap(() => {
                App.LogUtil.log("aaaa skin preview");
                let data = {data: skinData, title: title};
                ViewController.getInstance().openView(ViewConst.POPUP.ACCOMMONREWARDPOPUPVEW, data);
            }, this);

            //开始游戏按钮
            let playBtn = ComponentManager.getButton("acsingleday_enterbtn-"+this.uiCode, "", ()=>{
                ViewController.getInstance().openView(ViewConst.COMMON.ACSINGLEDAYBUILD1VIEW,{
                    code : this.code,
                    aid : this.aid
                })
            }, this);
            playBtn.setPosition(GameConfig.stageWidth/2 - playBtn.width/2, GameConfig.stageHeigth - 400 - playBtn.height);
            this.addChild(playBtn);

            let public_dot1 =BaseBitmap.create("public_dot2");
            this.addChild(public_dot1); ;
            public_dot1.setPosition(playBtn.x + playBtn.width - 20, playBtn.y + 12);
            this.public_dot1 = public_dot1;
            this.update();
        }

        let button = ComponentManager.getButton('acsingleday_couponbtn', '', ()=>{
            ViewController.getInstance().openView(ViewConst.COMMON.ACSINGLEDAYCOUPONVIEW,{
                code : this.code,
                aid : this.aid
            })
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, button, view, [0,0]);
        view.addChild(button);

        if(LocalStorageManager.get(`${view.acTivityId}${Api.playerVoApi.getPlayerID()}`) == '1'){
            
        }
        else{
            LocalStorageManager.set(`${view.acTivityId}${Api.playerVoApi.getPlayerID()}`, '1')
            ViewController.getInstance().openView(ViewConst.BASE.ACSINGLEDAYROOKIEVIEW,{
                f : view.avgendCallback,
                o : view,
                aid : view.aid,
                code : view.code
            });
        }
        //云动画
        if (this.uiCode == "1"){
            let cloud1 = BaseBitmap.create('cloud1');
            App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, cloud1, view.viewBg, [-cloud1.width,400]);
            view.addChild(cloud1);
            egret.Tween.get(cloud1, {loop : true}).wait(5000).to({x : -cloud1.width}, 15000).call(()=>{
                cloud1.x = GameConfig.stageWidth + cloud1.width;
            },view);

            let cloud3 = BaseBitmap.create('cloud3');
            App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, cloud3, view.viewBg, [-cloud3.width,550]);
            view.addChild(cloud3);
            egret.Tween.get(cloud3, {loop : true}).to({x : -cloud3.width}, 15000).call(()=>{
                cloud3.x = GameConfig.stageWidth + cloud3.width;
            },view);

            let cloud2 = BaseBitmap.create('cloud2');
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, cloud2, view.viewBg, [-cloud2.width,700]);
            view.addChild(cloud2);
            egret.Tween.get(cloud2, {loop : true}).to({x : GameConfig.stageWidth + cloud2.width}, 20000).call(()=>{
                cloud2.x = -cloud2.width;
            },view);

            let cloud4 = BaseBitmap.create('cloud2');
            App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, cloud4, view.viewBg, [-cloud4.width,750]);
            view.addChild(cloud4);
            egret.Tween.get(cloud4, {loop : true}).to({x : -cloud4.width}, 20000).call(()=>{
                cloud4.x = GameConfig.stageWidth + cloud4.width;
            },view);
        }
    }

    private avgendCallback():void{
        let view = this;
    }

    protected getRuleInfo():string{
		return "acSingleDayRuleInfo-" + this.uiCode;
    } 

    protected getRuleInfoParam():string[]{
        let vo = this.vo;
        let cfg = this.cfg;
        return [
            (cfg.startTime / 3600).toString(),
            ((cfg.startTime + cfg.luckyPacketCD) / 3600).toString(),
            String(cfg.luckyPacketPurchase / 3600),
            cfg.couponLimit.toString()
        ];
    } 

    protected getResourceList():string[]{
        let list:string[] = [];
        if (this.uiCode == "2"){
            list = [
                "acsingleday_bottombg-"+this.uiCode,
                "acsingleday_enterbtn-"+this.uiCode,
                "acsingleday_namebg-"+this.uiCode,
                "acsingleday_bg2",
                "ac_skinoflibai_infobg-1",
                "acthrowstone_common_servant_txt",
            ];
        }
		return super.getResourceList().concat([
            "acsingleday_bottombg",
            "acsingleday_bottomIcon1",
            "acsingleday_bottomIcon2",
            "acsingleday_bottomIcon3",
            "acsingleday_bottomname1",
            "acsingleday_bottomname2",
            "acsingleday_bottomname3",
            "acsingleday_bottomIcon1_2",
            "acsingleday_bottomIcon2_2",
            "acsingleday_bottomIcon3_2",
            "acsingleday_bg1",
            "acsingleday_couponbtn",
            "acsingleday_couponbtn_down",
            "forpeople_top",
            "wifeskin_barbg",
            "acsingleday_bg_mask1",
            "acsingleday_bg_mask2",
            "acsingleday_bg_mask3",
            "buildName",
            "cloud1",
            "cloud2",
            "cloud3"
        ]).concat(list);
    }

    private _nowDescId : number = 2;

    private getPeriodText():{desc : string, param : any}{
        let view = this;
        let desc = '';
        let param = [];
        let period = view.vo.getCurPeriod();
        let code = view.uiCode;
        let rechargeFlag = view.vo.getpublicRedhot2();
        let usegemFlag = view.vo.getpublicRedhot3();
        if(rechargeFlag && usegemFlag){
            desc = `acSingleDayDesc${view._nowDescId}-${code}`;
            view._nowDescId = 5 - view._nowDescId;
        }
        else if(!(rechargeFlag && usegemFlag)){
            let rid = App.MathUtil.getRandom(4,10);
            desc = `acSingleDayDesc${rid}-${code}`;
            // if(rid == 4){
            //     // 已充值 还差
            //     let sub = 0;
            //     let now = view.vo.getChargeNum();
            //     for(let i in view.cfg.recharge){
            //         let unit : Config.AcCfg.SDRechargeItemCfg = view.cfg.recharge[i];
            //         if(now < unit.needGem){
            //             sub = unit.needGem - now;
            //             break;
            //         }
            //     }
            //     if(sub <= 0){
            //         desc = `acSingleDayDesc7-${code}`;
            //     }
            //     else{
            //         param = [now,sub];
            //     }
            // }
            // else if(rid == 5){
            //     //已消费 还差
            //     let sub = 0;
            //     let use = view.vo.getUseGemNum();
            //     for(let i in view.cfg.recharge){
            //         let unit : Config.AcCfg.SDUseGemItemCfg = view.cfg.recharge[i];
            //         if(use < unit.needGem){
            //             sub = unit.needGem - use;
            //             break;
            //         }
            //     }
            //     if(sub <= 0){
            //         desc = `acSingleDayDesc7-${code}`;
            //     }
            //     else{
            //         param = [use,sub];
            //     }
            // }
        }
        else{
            desc = `acSingleDayDesc${rechargeFlag ? 2 : 3}-${code}`
        }

        return {
            desc : desc,
            param : param,
        };
    }

    protected tick():void{
        let view = this;
        view.update();
        let cd = view.vo.et - 86400 - GameData.serverTime;
        if (this.uiCode == "1"){
            if(cd > 0){
                view._cdtxt.text = LanguageManager.getlocal('acSingleDayGetRed4',[App.DateUtil.getFormatBySecond(cd)]);
            }
            else{
                view._cdtxt.text = LanguageManager.getlocal('acPunishEnd');
            }
            App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, view._cdtxt, view._topbg, [20,10]);
        }
        else{
            this._acTimeTf.text = LanguageManager.getlocal("acSkinoflibaiTimeCountDown", [this.vo.getCountDown()]);
            this._timeBg.width = 60 + this._acTimeTf.width;
            this._timeBg.x = GameConfig.stageWidth - this._timeBg.width - 5;
            this._acTimeTf.x = this._timeBg.x + this._timeBg.width / 2 - this._acTimeTf.width / 2;
        }
		
    }

    private update(): void{
         //第一页 红点
        let vo = this.vo;
        if(!vo)
        {
            return;
        }	
        if(this.public_dot1){
            this.public_dot1.visible = vo.isShowRedDot;
        }
        //  //第二页 红点
        //  if(this.public_dot2)
        //  {
        //       this.public_dot2.visible =  vo.getpublicRedhot2();
        //  }    
 
        //  //第三页 红点
        //  if(this.public_dot3)
        //  {
        //       this.public_dot3.visible =  vo.getpublicRedhot3();
        //  }    
    } 
     
    
    public dispose():void{   
        let view = this;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY,this.update,this);
        view.public_dot1 = null;
        view.public_dot2 = null;
        view.public_dot3 = null;
        view._descTxt = null;
        view._descTxtBg = null;
        if (this._descGroup){
            egret.Tween.removeTweens(view._descGroup);
        }
        view._descGroup = null;
        view._count = 0;
        view._nowDescId = 0;
        view._cdtxt = null;
        view._topbg = null;
        view._timeBg = null;
        view._acTimeTf = null;

        super.dispose();
    }
}