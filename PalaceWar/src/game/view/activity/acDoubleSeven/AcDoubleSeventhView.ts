/*
author : qianjun
desc : 七夕活动
*/
class AcDoubleSeventhView extends AcCommonView{
    public constructor(){
        super();
    }
    private _lqbtn : BaseButton = null;
    private _lqjindu : number = 1;
    private _acchargetipTxt : BaseTextField = null;
    private _build1 : BaseBitmap = null;
    private _build1name : BaseBitmap|NameLabel = null;
    private _build2 : BaseBitmap = null;
    private _build2name : BaseBitmap|NameLabel = null;
    private _build3 : BaseBitmap = null;
    private _build3name : BaseBitmap|NameLabel = null;
    private _build4 : BaseBitmap = null;
    private _build4name : BaseBitmap|NameLabel = null;
    private _build5 : BaseBitmap = null;
    private _build5name : BaseBitmap|NameLabel = null;
    private _build6 : BaseBitmap = null;
    private _build6name : BaseBitmap|NameLabel = null;
    private _build7 : BaseBitmap = null;
    private _build7name : BaseBitmap|NameLabel = null;
    private _build8 : BaseBitmap = null;
    private _build8name : BaseBitmap|NameLabel = null;
    private _dliangfont : BaseBitmap = null;
    private _lampClip : CustomMovieClip = null;
    private _lampNanguaEye : BaseBitmap = null;
    private _lampNanguaMouth : BaseBitmap = null;
    private _gquan : BaseBitmap = null;
    private _showAVG : boolean = false;
    private _acCDTxt : BaseTextField = null;
    private _countDownTimeBg:BaseBitmap = null;
    private _skinPreviewBtn:BaseButton = null;
    private _particleEffArr =[];

    private _itemNumText:BaseTextField = null;

    private _sceneLayer:BaseDisplayObjectContainer;
    private _sceneType:string = "1";// 1白天 2晚上
	private _maskTab:BaseLoadBitmap[] = [];
	private _curSceneBg:string = "";
	protected _maskLayer:BaseDisplayObjectContainer = null;
	protected _effectLayer:SceneEffect = null;
	private _switchTime:number = -1;
    private _bone:BaseLoadDragonBones = null;

    private get codeResStr() : string
    {
        let str = ``;
        switch(String(this.code)){
            case `1`:
                str = "";
                break;
            case `4`:
                str = `_code3`;
                break;
            default :
                str = ("_code"+this.code);
                break;
        }
        return str;
    }

    private get ruleCode():string{
        return this.code == '1' ? '' : `_code${this.code}`;
    }

    private get cfg() : Config.AcCfg.DoubleSeventhCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcDoubleSeventhVo{
        return <AcDoubleSeventhVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
    }

    protected getTitleStr():string{
        return super.getTitleStr();
    }

     // 背景图名称
	protected getBgName():string
	{
        return 'acsevenbg' + this.codeResStr;
    }
    
    protected initBg():void
	{
		let bgName:string=this.getBgName();
		if(bgName)
		{   
            if (String(this.code) == "5")
            {
                this.viewBg = BaseBitmap.create(this._curSceneBg);
            }
            else
            {
                this.viewBg = BaseLoadBitmap.create(bgName);
            }
			
			if(this.isTouchMaskClose())
			{
				this.viewBg.touchEnabled=true;
			}
            this.addChild(this.viewBg);
            this.viewBg.width = GameConfig.stageWidth;
            this.height = GameConfig.stageHeigth;

            //this.setLayoutPosition(LayoutConst.horizontalCenterbottom, this.viewBg, this);
			// 
            // this.viewBg.height = GameConfig.stageHeigth;
            // let mask = BaseLoadBitmap.create('empvsmask');
            // this.addChild(mask);
			// mask.width = GameConfig.stageWidth;
            // mask.height = GameConfig.stageHeigth;
            this.viewBg.y = Math.floor(GameConfig.stageHeigth - 1136);
		}
	}
    //
    public initView(){

        this._sceneLayer=new BaseDisplayObjectContainer();
        this._sceneLayer.y = this.viewBg.y - this.container.y;
		this.addChildToContainer(this._sceneLayer);

        this._particleEffArr =[];
        let view = this;     
        view.width = GameConfig.stageWidth;
        view._showAVG = false;

        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_DOUBLESEVEN_GETREWARD),view.getrewardCallback,view);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_DOUBLESEVEN_FRESH,this.fresh_jindu,this); 
         App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.update, this);

        let top = BaseBitmap.create("acseventopbg" + this.codeResStr);
        if(this.code == '4'){
            top.setRes(`acseventopbg_code4`);
        }
        view.setLayoutPosition(LayoutConst.horizontalCentertop, top, view.titleBg, [0,view.titleBg.height]);
        view.addChild(top);

        if (String(this.code) === "1") {
            let man = BaseBitmap.create('wife_skinhalf_1091');
            man.setScale(0.9);
            view.setLayoutPosition(LayoutConst.leftbottom, man, top, [0,30]);
            view.addChild(man);
        }
        //活动时间
        let ac_timeTF : BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("acDoubleSeventhTime",[view.vo.acTimeAndHour]),
        TextFieldConst.FONTSIZE_CONTENT_SMALL);
        ac_timeTF.textAlign = egret.HorizontalAlign.LEFT;
        ac_timeTF.width = 350;
        view.setLayoutPosition(LayoutConst.righttop, ac_timeTF, top, [50,10]);
        view.addChild(ac_timeTF);
        
        //活动规则文本
        let acruleTxt : BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("acDoubleSeventhRule",[LanguageManager.getlocal('acDoubleSeventhRuleDesc' + this.ruleCode)]),TextFieldConst.FONTSIZE_CONTENT_SMALL);
        acruleTxt.textAlign = egret.HorizontalAlign.LEFT;
        acruleTxt.lineSpacing = 5;
        acruleTxt.width = 360;
        view.setLayoutPosition(LayoutConst.righttop, acruleTxt, ac_timeTF, [0,ac_timeTF.textHeight + 8]);
        view.addChild(acruleTxt);
        
        if (this.code == "5")
        {   
            let iconname = "scene_preview_icon_"+this.cfg.getExchangeSceneId();
            let skinPreviewBtn = ComponentManager.getButton(iconname, null, ()=>{
                ViewController.getInstance().openView(ViewConst.POPUP.ACDOUBLESEVENTHEXCHANGEVIEW,{
                    code : view.code,
                    aid : view.aid
                })
            }, this);
            skinPreviewBtn.setPosition(top.x + 8, top.y + top.height / 2 - skinPreviewBtn.height / 2);
            view.addChild(skinPreviewBtn);
            this._skinPreviewBtn = skinPreviewBtn;

            let itemnum = this.cfg.getExchangeNeedItemNum();
            this._itemNumText = ComponentManager.getTextField(LanguageManager.getlocal("acDoubleSeventhItemNum",[String(itemnum)]),
            TextFieldConst.FONTSIZE_CONTENT_SMALL);
            view.addChild(this._itemNumText);

            view.setLayoutPosition(LayoutConst.lefttop, ac_timeTF, top, [110,10]);
            view.setLayoutPosition(LayoutConst.lefttop,  this._itemNumText, ac_timeTF, [0,ac_timeTF.textHeight+6]);
            acruleTxt.width = 530;
            view.setLayoutPosition(LayoutConst.lefttop, acruleTxt, this._itemNumText, [0,27]);
        }
        else
        {
            let actipTxt : BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("acDoubleSeventhTip"),TextFieldConst.FONTSIZE_CONTENT_SMALL);
            view.setLayoutPosition(LayoutConst.horizontalCentertop, actipTxt, acruleTxt, [0,acruleTxt.textHeight + 10]);
            view.addChild(actipTxt);

            let skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
            // this._effect.setScale(2);
            let skinTxtEffectBM = BaseBitmap.create("acwealthcarpview_skineffect1");
            skinTxtEffect.setPosition(top.x, top.y + 50);
            skinTxtEffect.blendMode = egret.BlendMode.ADD;
            this.addChild(skinTxtEffect);
            skinTxtEffect.playWithTime(-1);

            let skinTxt = BaseBitmap.create("acwealthcarpview_servantskintxt");
            skinTxt.anchorOffsetX = skinTxt.width / 2;
            skinTxt.anchorOffsetY = skinTxt.height / 2;
            skinTxt.setPosition(top.x + 106, top.y + 130);
            this.addChild(skinTxt);
            egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);


            let skinTxteffect = BaseBitmap.create("acwealthcarpview_servantskintxt");
            skinTxteffect.anchorOffsetX = skinTxteffect.width / 2;
            skinTxteffect.anchorOffsetY = skinTxteffect.height / 2;
            skinTxteffect.setPosition(top.x + 106, top.y + 130);
            this.addChild(skinTxteffect);
            skinTxteffect.blendMode = egret.BlendMode.ADD;
            skinTxteffect.alpha = 0;
            egret.Tween.get(skinTxteffect, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
            
            //透明点击区域
            let touchPos = BaseBitmap.create("public_alphabg");
            touchPos.width = 180;
            touchPos.height = 176;
            touchPos.setPosition(top.x, top.y);
            view.addChild(touchPos);
            touchPos.addTouchTap(() => {
                ViewController.getInstance().openView(ViewConst.POPUP.ACCOMMONSKINVIEW, {
                    skinId : view.cfg.getSkin(view.code),
                    need : view.cfg.recharge[Object.keys(view.cfg.recharge).length].needGem
                });
            }, ViewController);
        }

     

        if (String(this.code) === "2") {
            // 南瓜车
            let nanguache = ComponentManager.getCustomMovieClip("nanguache",12,83);
            let startX = -200;
            let startY = 870 + Math.floor(view.viewBg.y);
            let xMove = 2000;
            let yMove = -xMove / 6.2;
            let time = xMove / GameConfig.stageWidth * 15000; // 15秒x移动一屏幕的宽度像素
            nanguache.setPosition(startX, startY);
            egret.Tween.get(nanguache, {loop:true}).to({x:startX + xMove, y:startY + yMove}, time);
            view.addChild(nanguache);
            nanguache.playWithTime(-1);

            // 南瓜车 某建筑的遮罩
            let nanguachezhezhao = BaseBitmap.create("nanguachezhezhao");
            nanguachezhezhao.setPosition(453, 786 + Math.floor(view.viewBg.y));
            view.addChild(nanguachezhezhao);
        }
        //水灯节波纹
        if (String(this.code) === "3" || String(this.code) === `4`) 
        {
            let rippleEff = ComponentManager.getCustomMovieClip("ripple",8,100);  
            rippleEff.setPosition(0, top.y+top.height+229+ Math.floor(view.viewBg.y));
            rippleEff.playWithTime(-1); 
            view.addChild(rippleEff);

            let bgpng = BaseBitmap.create("acsevenbg_png");
            bgpng.setPosition(0,this.viewBg.y);
            bgpng.touchEnabled = false;
            view.addChild(bgpng);
        
        }

        //建筑
        let isTh = PlatformManager.checkIsThSp();
        // 是不是万圣节
        let isCode2 = String(this.code) === "2";
        // 是不是水灯节
        let isCode3 = String(this.code) === "3" || String(this.code) === `4`;

        // 是不是水灯节
        let isCode4 = String(this.code) === "5";

        var effpos_arr = {}
        var pos_arr = {
            1 : {buildId : 1, buildPos : [0,505], namePos : isCode2?[433, 462]:(isTh ? [22,456] :[25,434])},
            2 : {buildId : 2, buildPos : [0,683], namePos : isCode2?[444, 614]:(isTh ? [0,670] :[22,657])},
            3 : {buildId : 3, buildPos : [166,763], namePos : isCode2?[453, 798]:(isTh ? [138,746] :[298,717])},
            4 : {buildId : 4, buildPos : [331,783], namePos : isCode2?[238, 518]:(isTh ? [422,778] :[460,771])},
            5 : {buildId : 5, buildPos : [468, 559], namePos : isCode2?[260, 667]:(isTh ? [480,554] :[596,532])},
            6 : {buildId : 6, buildPos : [332,586], namePos : isCode2?[41, 904]:(isTh ? [296,570] :[358,532])},
            7 : {buildId : 7, buildPos : [164,572], namePos : isCode2?[26, 657]:(isTh ? [150,534] :[198,532])},
            8 : {buildId : 8, buildPos : [392,458], namePos : isCode2?[68, 462]:(isTh ? [422,448] :[490,460])},
        }
        if (this.code == "1" && (PlatformManager.checkIsEnLang() || PlatformManager.checkIsRuSp())) {
            pos_arr = {
                1: { buildId: 1, buildPos: [0, 505], namePos: [23, 482] },
                2: { buildId: 2, buildPos: [0, 683], namePos: [2, 699] },
                3: { buildId: 3, buildPos: [166, 763], namePos: [125, 777] },
                4: { buildId: 4, buildPos: [331, 783], namePos: [421, 825] },
                5: { buildId: 5, buildPos: [468, 559], namePos: [448, 593] },
                6: { buildId: 6, buildPos: [332, 586], namePos: [260, 563] },
                7: { buildId: 7, buildPos: [164, 572], namePos: [118, 610] },
                8: { buildId: 8, buildPos: [392, 458], namePos: [343, 487] },
            }
        }   

        if(isCode3)
        {
            //   pos_arr = {
            //     1 : {buildId : 1, buildPos : [43, 639]  , namePos : [17,604] },
            //     2 : {buildId : 2, buildPos : [132, 577] , namePos : [133,563]},
            //     3 : {buildId : 3, buildPos : [317, 626] , namePos : [307,592]},
            //     4 : {buildId : 4, buildPos : [454, 638] , namePos : [452,613]},
            //     5 : {buildId : 5, buildPos : [504, 764] , namePos : [503,729]},
            //     6 : {buildId : 6, buildPos : [461, 907] , namePos : [463,876]},
            //     7 : {buildId : 7, buildPos : [304, 774] , namePos : [313,748]},
            //     8 : {buildId : 8, buildPos : [104, 819] , namePos : [108,795]},
            // }
                pos_arr = {
                1 : {buildId : 1, buildPos : [43, 639]  , namePos : [9,604] },
                2 : {buildId : 2, buildPos : [132, 577] , namePos : [112,563]},
                3 : {buildId : 3, buildPos : [317, 626] , namePos : [290,592]},
                4 : {buildId : 4, buildPos : [454, 638] , namePos : [433,613]},
                5 : {buildId : 5, buildPos : [504, 764] , namePos : [488,729]},
                6 : {buildId : 6, buildPos : [461, 907] , namePos : [443,876]},
                7 : {buildId : 7, buildPos : [304, 774] , namePos : [298,748]},
                8 : {buildId : 8, buildPos : [104, 819] , namePos : [93,795]},
            }

            effpos_arr = {

                1 : { effPoint : [36, 588,0.5] },
                2 : { effPoint : [132, 524,0.8]},
                3 : { effPoint : [320, 573,0.5] },
                4 : { effPoint : [450, 585,0.8] },
                5 : { effPoint : [504, 685,0.8] },
                6 : { effPoint : [458, 834,0.8]},
                7 : { effPoint : [304, 725,0.9] },
                8 : { effPoint : [94, 806,1] }, 
            }
        }
         else if (isCode4)
        {
            pos_arr = {
                1 : {buildId : 1, buildPos : [0, 708]  , namePos : [0,714]},
                2 : {buildId : 2, buildPos : [428, 788] , namePos : [517,823]},
                3 : {buildId : 3, buildPos : [371, 574] , namePos : [517,548]},
                4 : {buildId : 4, buildPos : [346, 663] , namePos : [378,664]},
                5 : {buildId : 5, buildPos : [206, 619] , namePos : [236,615]},
                6 : {buildId : 6, buildPos : [0, 528] , namePos : [91,518]},
                7 : {buildId : 7, buildPos : [0, 448] , namePos : [175,443]},
                8 : {buildId : 8, buildPos : [423, 410] , namePos : [494,438]},
            }

            if (PlatformManager.checkIsEnLang() || PlatformManager.checkIsThSp() || PlatformManager.checkIsRuSp()){
                pos_arr = {
                    1 : {buildId : 1, buildPos : [0, 708]  , namePos : [0,714]},
                    2 : {buildId : 2, buildPos : [428, 788] , namePos : [460,823]},
                    3 : {buildId : 3, buildPos : [371, 574] , namePos : [500,548]},
                    4 : {buildId : 4, buildPos : [346, 663] , namePos : [378,664]},
                    5 : {buildId : 5, buildPos : [206, 619] , namePos : [236,615]},
                    6 : {buildId : 6, buildPos : [0, 528] , namePos : [91,518]},
                    7 : {buildId : 7, buildPos : [0, 448] , namePos : [175,443]},
                    8 : {buildId : 8, buildPos : [423, 410] , namePos : [445,438]},
                }
            }


            this._effectLayer=new SceneEffect();
            this._sceneLayer.addChild(this._effectLayer);
            this._maskLayer=new BaseDisplayObjectContainer();
            this._sceneLayer.addChild(this._maskLayer);


            let cId:string = "303";
            if (Config.SceneeffectCfg.hasSceneEffect(cId))
            {	
                this._sceneType = this._curSceneBg.substring(this._curSceneBg.length-1,this._curSceneBg.length);
                this._effectLayer.showSceneEffect(this._sceneType, cId);
                this.initBuildBg();
                this._switchTime = 50;
                if (this._sceneType == "2")
                {
                    this._bone = App.DragonBonesUtil.getLoadDragonBones("scene_bone_303_2");
                    this._bone.setPosition(0 , 1136);
                    this._sceneLayer.addChild(this._bone);
                }
            }
        }

        if (String(this.code) === "1"|| isCode3) {
            var codeStr ="";
            if(isCode3)
            {
                codeStr ="_code3";
            }
            for(let i in pos_arr){
                let unit = pos_arr[i];
                let buildPic = BaseBitmap.create(`acsevenbuilding${unit.buildId}`+codeStr);
                buildPic.x = unit.buildPos[0];
                buildPic.y = unit.buildPos[1] + Math.floor(view.viewBg.y);
                view.addChild(buildPic);
                buildPic.alpha = 1;
                view[`_build${unit.buildId}`] = buildPic; 


                //花上粒子
                if(codeStr=="_code3")
                {
                    // this._particleEffArr = [];
                    let particleEff = ComponentManager.getCustomMovieClip("particle",8,56);  
                    particleEff.playWithTime(-1);
                    particleEff.blendMode = egret.BlendMode.ADD;
                    particleEff.anchorOffsetX =particleEff.width/2;
                    particleEff.anchorOffsetY =particleEff.height/2; 
                    particleEff.scaleX =particleEff.scaleY =effpos_arr[i].effPoint[2];
                    particleEff.x = effpos_arr[i].effPoint[0];
                    particleEff.y  = effpos_arr[i].effPoint[1]+GameConfig.stageHeigth-1136+41+15;
                    view.addChild(particleEff);  
                    particleEff.visible =false;
                    this._particleEffArr.push(particleEff); 
                    // view[`_build${unit.buildId}`] = particleEff; 
                }
            }
        }

        for(let i in pos_arr){
            let unit = pos_arr[i];
            let namePic;
            if (isCode4)
            {
                namePic = ComponentManager.getNameLabel(LanguageManager.getlocal("DoubleSevenBudName"+unit.buildId+"_code"+this.code));
            }
            else
            {
                namePic = BaseBitmap.create(`acsevenbuild${unit.buildId}` + this.codeResStr);
            }
            
            if (isCode2) {
                namePic.x = unit.namePos[0] + 147/2 - namePic.width/2;
            } else if(isCode3)
            { 
                if(PlatformManager.checkIsThSp())
                {
                     namePic.x = unit.namePos[0]
                }else
                {
                     namePic.x = unit.namePos[0]+10; 
                }
            }
            else
            {
                namePic.x = unit.namePos[0];
            }
            namePic.y = unit.namePos[1] + Math.floor(view.viewBg.y);
            App.DisplayUtil.changeToGray(namePic);  
            view.addChild(namePic);
            view[`_build${unit.buildId}name`] = namePic; 
        }

        //当前进度与显示
        let lqBtn = ComponentManager.getButton('acsevenlampgray' + this.codeResStr, '', view.lqBtnClick, view);
        view.setLayoutPosition(LayoutConst.horizontalCenterbottom, lqBtn, view, [0,10]);
        view.addChild(lqBtn);
        view._lqbtn = lqBtn;

        let acchargetipTxt : BaseTextField = ComponentManager.getTextField('',TextFieldConst.FONTSIZE_CONTENT_SMALL);
        view._acchargetipTxt = acchargetipTxt;
        view.addChild(acchargetipTxt);
        view.swapChildren(view.closeBtn, top);//view.closeBtn
                
        //查看奖励
        let ckjliBtn = ComponentManager.getButton('acsevenckjl', '', view.ckjlCall, view);
        view.setLayoutPosition(LayoutConst.leftbottom, ckjliBtn, view, [20,30]);
        view.addChild(ckjliBtn);

        //充值
        let czhiBtn = ComponentManager.getButton('acsevenczhi', '', view.czhiCall, view);
        view.setLayoutPosition(LayoutConst.rightbottom, czhiBtn, view, [20,30]);
        view.addChild(czhiBtn);
        
        let gquan = BaseBitmap.create('doublesevengquan');
        gquan.anchorOffsetX = gquan.width / 2;
        gquan.anchorOffsetY = gquan.height / 2;
        view.setLayoutPosition(LayoutConst.horizontalCenterbottom, gquan, view._lqbtn, [gquan.width / 2, gquan.height / 2 - 30]);
        gquan.visible = false;
        view._gquan = gquan;
        view.addChild(gquan);
        view.swapChildren(gquan,view._lqbtn);

        let font = BaseBitmap.create('acsevendliang' + this.codeResStr);
        view.setLayoutPosition(LayoutConst.horizontalCenterbottom, font, view, [5,0]);
        view.addChild(font);
        font.visible = false;
        view._dliangfont = font;


        let lamp;
        if (String(this.code) === "2") {
            lamp = ComponentManager.getCustomMovieClip("nangualoop",10,70);
        } else {
            lamp = ComponentManager.getCustomMovieClip("dbsevenloop",10,83);
        } 
        lamp.blendMode = egret.BlendMode.ADD;
        if (String(this.code) === "2") {
            lamp.width = 216;
            lamp.height = 266;
            view.setLayoutPosition(LayoutConst.horizontalCentertop, lamp, view._lqbtn, [0,-50]);
        } else {
            lamp.width = 178;
            lamp.height = 177;
            lamp.setScale(1.5);
            view.setLayoutPosition(LayoutConst.horizontalCentertop, lamp, view._lqbtn, [0,-65]);
        }
        view.addChild(lamp);
        lamp.playWithTime(-1);
        view._lampClip = lamp;
        lamp.visible = false;
        
        if (String(this.code) === "2") {
            view._lampNanguaEye = BaseBitmap.create("nangua_eye");
            view.setLayoutPosition(LayoutConst.horizontalCentertop, view._lampNanguaEye, view._lqbtn, [0,108]);
            egret.Tween.get(view._lampNanguaEye, {loop:true}).to({alpha:0}, 670).to({alpha:1}, 660);
            view._lampNanguaEye.visible = false;
            view._lampNanguaEye.blendMode = egret.BlendMode.ADD;
            view.addChild(view._lampNanguaEye);

            view._lampNanguaMouth = BaseBitmap.create("nangua_mouth");
            view.setLayoutPosition(LayoutConst.horizontalCentertop, view._lampNanguaMouth, view._lqbtn, [3,140]);
            egret.Tween.get(view._lampNanguaMouth, {loop:true}).to({alpha:0}, 670).to({alpha:1}, 660);
            view._lampNanguaMouth.visible = false;
            view._lampNanguaMouth.blendMode = egret.BlendMode.ADD;
            view.addChild(view._lampNanguaMouth);
        }
        view.fresh_jindu();
        view.fresh_jindu_OfBuild();

        // 倒计时
        if (this.code == "5")
        {
            let countDownBg = BaseBitmap.create("public_9_bg61");
            countDownBg.y = top.y + top.height - countDownBg.height / 2;
            view.addChild(countDownBg);
            this._countDownTimeBg = countDownBg;

            let deltaT = Math.max(0, this.acVo.et - GameData.serverTime);
            let acCDTxt = ComponentManager.getTextField("",18,TextFieldConst.COLOR_WHITE);
            this._acCDTxt = acCDTxt;
            this._acCDTxt.text = LanguageManager.getlocal("acFourPeople_acCD",[App.DateUtil.getFormatBySecond(deltaT,1)]);
            view.addChild(acCDTxt);
            countDownBg.width = 80 + acCDTxt.width;
            countDownBg.x = GameConfig.stageWidth - countDownBg.width - 15;
           
            acCDTxt.setPosition(this._countDownTimeBg.x + this._countDownTimeBg.width / 2 - acCDTxt.width / 2, this._countDownTimeBg.y + this._countDownTimeBg.height / 2 - acCDTxt.height / 2);
        }
        else
        {
            let countDownBg = BaseBitmap.create("public_searchdescbg");
            countDownBg.setPosition(GameConfig.stageWidth/2 - countDownBg.width/2, 275 - countDownBg.height/2);
            view.addChild(countDownBg);
            let deltaT = Math.max(0, this.acVo.et - GameData.serverTime);
            let acCDTxt = ComponentManager.getTextField("",20,TextFieldConst.COLOR_WHITE);
            view.addChild(acCDTxt);
            this._acCDTxt = acCDTxt;
            this._acCDTxt.text = LanguageManager.getlocal("acFourPeople_acCD",[App.DateUtil.getFormatBySecond(deltaT,1)]);
            acCDTxt.setPosition(GameConfig.stageWidth/2 - acCDTxt.width/2, 275 - acCDTxt.height/2);
        }
        this.update();
        
        //红点1
        // let public_dot1 =BaseBitmap.create("public_dot2");
        // this.addChild(public_dot1); ;
        // public_dot1.x = this.tabbarGroup.getChildAt(0).x + this.tabbarGroup.getChildAt(0).width-5;
        // public_dot1.y = this.tabbarGroup.y; 
		// this.public_dot1 = public_dot1;
    }

    protected initBuildBg():void
	{
		// if (this._maskTab.length>0)
        // {
        //     for (var k1 in this._maskTab) {
        //         var v1 = this._maskTab[k1];
        //         egret.Tween.removeTweens(v1);
        //         v1.dispose();
        //     }
		// 	this._maskTab.length = 0;
        // }


        let curCfg=Config.SceneCfg.getSceneCfgBySceneName("searchScene","303");
        let buildBgCfg = curCfg.buildBgCfg;
		if (buildBgCfg)
		{
			for(let key in buildBgCfg)
			{	
				let resName;
                if (this._sceneType == "1")
                {
                    resName  = "searchscene_303_1" + "_"+key;
                }
                else
                {
                  resName  = this._curSceneBg+"_"+key;
                }
                 
                if (this._maskTab[Number(key)-1])
                {
                    let mask:BaseLoadBitmap = this._maskTab[Number(key)-1];
                     mask.setPosition(buildBgCfg[key].x,buildBgCfg[key].y);
                     mask.setload(resName);
                }
                else
                {
                    let mask:BaseLoadBitmap=BaseLoadBitmap.create(resName);
                    mask.setPosition(buildBgCfg[key].x,buildBgCfg[key].y);
                    this._maskLayer.addChild(mask);
                    this._maskTab.push(mask);
                }				
			}
		}
	}

    private showDialog(buildId):void{
        let view = this;
        // console.log(buildId);
        if(view.vo.getAvgConfig(buildId, this.code)){
            ViewController.getInstance().openView(ViewConst.BASE.ACDOUBLESEVENTHAVGVIEW,{
                f : view.avgendCallback,
                o : view,
                idx : 1,
                buidId : buildId,
                aid : this.aid,
                code : this.code
            });
        }
    }

    private avgendCallback():void{
        let view = this;
        let rewardList = GameData.formatRewardItem(view._rewards);
        let pos = new egret.Point(view._lqbtn.x + (view._lqbtn.width / 2), view._lqbtn.y + (view._lqbtn.height / 2));
        App.CommonUtil.playRewardFlyAction(rewardList,pos);
        view._showAVG = false;
        this.fresh_jindu_OfBuild();
    }

    private fresh_jindu():void{
        let view = this;
        let curJindu = view.vo.getCurJindu();
        let chargeNum= view.vo.getChargeNum();

        for(let i = 1; i <= curJindu; ++ i){
            view._lqjindu = i;
            if(chargeNum >= view.cfg.recharge[i].needGem && !view.vo.isGetRecharge(i)){
                break;
            } 
        }

        let descNum = view.cfg.recharge[view._lqjindu].needGem - chargeNum;
        view._lqbtn.setBtnBitMap((chargeNum >= view.cfg.recharge[view._lqjindu].needGem ? 'acsevenlamp' : 'acsevenlampgray') + this.codeResStr);
   
        view._lampClip.visible = view._dliangfont.visible = ((chargeNum >= view.cfg.recharge[view._lqjindu].needGem) && !view.vo.isGetRecharge(view._lqjindu));
        if (String(this.code) === "2") {
            view._lampNanguaEye.visible = view._lampClip.visible;
            view._lampNanguaMouth.visible = view._lampClip.visible;
        }
        if(1){
            egret.Tween.get(view._dliangfont,{onChange : ()=>{
                view._dliangfont.x = (GameConfig.stageWidth - view._dliangfont.width * view._dliangfont.scaleX) / 2 + 5 * view._dliangfont.scaleX;
                view._dliangfont.y = GameConfig.stageHeigth - view._dliangfont.height - 10 * view._dliangfont.scaleY;
            }, onChangeObj : view, loop : true}).to({scaleX : 0.9, scaleY : 0.9},500).to({scaleX : 1, scaleY : 1},500);
        }
        view._acchargetipTxt.text = LanguageManager.getlocal("acDoubleSeventhChargeTip" + this.ruleCode, [descNum.toString(), LanguageManager.getlocal(`acDoubleSeventhViewBuild${view._lqjindu}` + this.ruleCode)]);
        view.setLayoutPosition(LayoutConst.horizontalCenterbottom, view._acchargetipTxt, view, [0,10]);
        view._acchargetipTxt.visible = descNum > 0;
    }
    private fresh_jindu_OfBuild():void{
        let view = this;
        let curJindu = view.vo.getCurJindu();
        let chargeNum= view.vo.getChargeNum();

        for(let i = 1; i <= curJindu; ++ i){
            view._lqjindu = i;
            if (String(this.code) === "1") {
                egret.Tween.removeTweens(view[`_build${i}`]);
            }
            if(chargeNum >= view.cfg.recharge[i].needGem && view.vo.isGetRecharge(i)){
                if (String(this.code) === "1") {
                    view[`_build${i}`].setRes(`acsevenbuilding${i}_open`); 
                    view[`_build${i}`].alpha = 1;
                }
                else if(String(this.code) === "3" || String(this.code) === "4")
                {
                    view[`_build${i}`].setRes(`acsevenbuilding${i}_open`+this.codeResStr); 
                    view[`_build${i}`].alpha = 1;
                    this._particleEffArr[i-1].visible =true;
                }
                App.DisplayUtil.changeToNormal(view[`_build${i}name`]);  
            }
            if(chargeNum >= view.cfg.recharge[i].needGem && !view.vo.isGetRecharge(i)){ 
                break;
            } 
        }
        view.showBuilding(view._lqjindu);
    }

    private showBuilding(buildId){
        let view = this;
        if(view.vo.isGetRecharge(buildId)){
            return;
        }
        if (String(this.code) === "1") {
            egret.Tween.get(view[`_build${buildId}`]).setPaused(true);
            egret.Tween.removeTweens(view[`_build${buildId}`]);
            egret.Tween.get(view[`_build${buildId}`], {loop : true}).to({alpha : 0}, 1300).to({alpha : 1}, 1300);
        }
    }

    private _rewards = '';
    private getrewardCallback(event):void{
        let view = this;
        let rData = event.data.data.data;
        if(!rData){
            view._showAVG = false;
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        if(event.data.data.ret < 0){
            view._showAVG = false;
            return;
        }
        view._rewards = rData.rewards
        if(view.vo.isGetRecharge(view._lqjindu)){
            view.showDialog(view._lqjindu);
        }
        else{
            view.showDialog(view._lqjindu - 1);
        }
        
    }
    public hide():void{
        if (this._showAVG) {
            return;
        } else {
            super.hide();
        }
    }
    private ckjlCall():void{
        let view = this;
        ViewController.getInstance().openView(ViewConst.POPUP.ACDOUBLESEVENTHAWARDVIEW,{
            aid : this.aid,
            code : this.code
        });
    }

    private czhiCall():void{
        let view = this;
        if(!view.vo.isInActivity()){
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
    }

    private lqBtnClick():void{
        let view = this;
        let chargeNum = view.vo.getChargeNum();
        let descNum = view.cfg.recharge[view._lqjindu].needGem - chargeNum;
        if(!view.vo.isInActivity()){
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        if(view.vo.isGetRecharge(view._lqjindu)){
            App.CommonUtil.showTip(LanguageManager.getlocal('acDoubleSeventhChargeTip3'));
            return;
        }
        if(view._showAVG){
            return;
        }
        if(descNum <= 0){
            view._showAVG = true;
            view._gquan.visible = true;
            egret.Tween.get(view._gquan).to({scaleX : 1.71,scaleY : 1.71}, 160).to({scaleX : 2.22,scaleY : 2.22}, 160).to({scaleX : 2.4,scaleY : 2.4}, 180).
            call(()=>{
                egret.Tween.removeTweens(view._gquan);
                view._gquan.visible = false;
                view._gquan.scaleX = view._gquan.scaleY = 1;
                view._gquan.alpha = 1;
                let lamp;
                if (String(this.code) === "2") {
                    lamp = ComponentManager.getCustomMovieClip("nangualight",10,70);
                } else {
                    lamp = ComponentManager.getCustomMovieClip("dbsevenlamp",10,83);
                }
                lamp.blendMode = egret.BlendMode.ADD;
                if (String(this.code) === "2") {
                    lamp.width = 324;
                    lamp.height = 304;
                    lamp.setScale(1.1);
                    view.setLayoutPosition(LayoutConst.horizontalCentertop, lamp, view._lqbtn, [3,-93]);
                } else {
                    lamp.width = 407;
                    lamp.height = 259;
                    view.setLayoutPosition(LayoutConst.horizontalCentertop, lamp, view._lqbtn, [10,-45]);
                }
                view.addChild(lamp);
                lamp.playWithTime(1);
                lamp.setEndCallBack(()=>{
                    lamp.dispose();
                    lamp = null;
                    NetManager.request(NetRequestConst.REQUST_DOUBLESEVEN_GETREWARD,{activeId:this.acTivityId,rechargeId:this._lqjindu});
                },view);
            },view);
            
            egret.Tween.get(view._gquan).wait(80).to({alpha : 0}, 590);
        }
        else{
            App.CommonUtil.showTip(LanguageManager.getlocal('acDoubleSeventhChargeTip2' + this.ruleCode, [descNum.toString()]));
        }
    }

    protected getRuleInfo() : string{
        return `acDoubleSeventhRules` + (this.code == '1' ? '' : `_code${this.code}`);
    }

    protected getResourceList():string[]
	{
        let ret = super.getResourceList();
        if (String(this.code) === "1") {
            ret = ret.concat([
               "acsevenbg","acsevenbuilding2_open","acsevenbuilding2","acsevenbuilding4_open","acsevenbuilding4","wife_skinhalf_1091","doublesevengquan","dbsevenloop","dbsevenlamp"
            ]);
        }
        else {
            ret = ret.concat([
                "acsevenbg" + this.codeResStr,
                "acsevenbg_png",
            ]);
        }
        if(String(this.code) === "4"){
            ret = ret.concat([
                `acseventopbg_code4`,
                `doubleseventh3`,
            ]);
        } 
        else if(String(this.code) === "5"){

            this._curSceneBg = "searchscene_303_2";
            ret = ret.concat([
                `enjoynightscene-1`,this._curSceneBg
            ]);
        } 
        
        ret = ret.concat([`acwealthcarpview_servantskintxt`,`acwealthcarpview_skineffect1`,`acwealthcarpview_skineffect`,]);
		return ret;
	}

    public tick():boolean
	{
        let deltaT = this.acVo.et - GameData.serverTime;

		if (this._acCDTxt && deltaT > 0){
            this._acCDTxt.text = LanguageManager.getlocal("acFourPeople_acCD",[App.DateUtil.getFormatBySecond(deltaT,1)]);
            if (String(this.code) == "5")
            {
                //  this._countDownTimeBg.width = 60 + this._acCDTxt.width;
                // this._countDownTimeBg.x = GameConfig.stageWidth - this._countDownTimeBg.width - 15;
                this._acCDTxt.setPosition(this._countDownTimeBg.x + this._countDownTimeBg.width / 2 - this._acCDTxt.width / 2,
                this._countDownTimeBg.y + this._countDownTimeBg.height / 2 - this._acCDTxt.height / 2);
                this.checkScene();
            }
			return true;
        }else{
            this._acCDTxt.text = LanguageManager.getlocal("acFourPeople_acCD",[App.DateUtil.getFormatBySecond(0,1)]);
            if (String(this.code) == "5")
            {
                // this._countDownTimeBg.width = 60 + this._acCDTxt.width;
                // this._countDownTimeBg.x = GameConfig.stageWidth - this._countDownTimeBg.width - 15;
                this._acCDTxt.setPosition(this._countDownTimeBg.x + this._countDownTimeBg.width / 2 - this._acCDTxt.width / 2,
                this._countDownTimeBg.y + this._countDownTimeBg.height / 2 - this._acCDTxt.height / 2);
                this.checkScene();
            }
			return false;
		}

	}

    private checkScene():void
    {
        if (this._switchTime ==0)
        {   
            if (this._sceneType == "1")
            {
                this._curSceneBg = "searchscene_303_2";
            }
            else
            {
                this._curSceneBg = "scenebg_303_1";
            }
            
            ResourceManager.loadItem(this._curSceneBg,this.resetSceneBg,this);
        }
        this._switchTime --;
    }

    private resetSceneBg():void
	{	
		if (!this.viewBg)
		{
			return;
		}
        let view = this;
        let mybg = <BaseBitmap>this.viewBg;
        this.viewBg = null;
        egret.Tween.get(mybg).to({alpha:0},1000).call(function(){
			mybg.dispose();
		});

        this.viewBg = BaseBitmap.create(this._curSceneBg);
		
		this.viewBg.setPosition(0,mybg.y);
		this.addChildAt(this.viewBg,this.getChildIndex(mybg));
		this.viewBg.alpha = 0;

		egret.Tween.get(this.viewBg).to({alpha:1},1000);

		mybg.texture = ResourceManager.getRes(this._curSceneBg);

		let cId:string = "303";

		if (Config.SceneeffectCfg.hasSceneEffect(cId))
		{
			this._sceneType = this._curSceneBg.substring(this._curSceneBg.length-1,this._curSceneBg.length);
			egret.Tween.get(this._effectLayer).to({alpha:0},1000).call(function(){
				view._effectLayer.showSceneEffect(view._sceneType, cId);
				egret.Tween.get(view._effectLayer).to({alpha:1},1000)
			});
			this._switchTime = 50;
            if (this._sceneType == "2")
			{	
				if (!this._bone)
				{
					this._bone = App.DragonBonesUtil.getLoadDragonBones("scene_bone_303_2");
					this._bone.setPosition(0 , 1136);
					this._sceneLayer.addChild(this._bone);
				}				
			}
			else
			{	
				if (this._bone)
				{
					this._bone.dispose();
					this._bone = null;
				}
			}
		}
		else if (this._effectLayer.sceneType)
		{
			this._effectLayer.hideSceneEffect();
		}
		this.initBuildBg();
	}

    private update():void
    {
        if (this._itemNumText)
        {
            let hasNum:number = Api.itemVoApi.getItemNumInfoVoById(this.cfg.getExchangeNeedItemId());
            this._itemNumText.text = LanguageManager.getlocal("acDoubleSeventhItemNum",[String(hasNum)]);
        }
        if (this._skinPreviewBtn)
        {
            if (this.vo.isCanExchange())
            {
                App.CommonUtil.addIconToBDOC(this._skinPreviewBtn);
            }
            else
            {
                App.CommonUtil.removeIconFromBDOC(this._skinPreviewBtn);
            }
        }
    }

    public dispose():void
	{   
        let view = this;
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_DOUBLESEVEN_GETREWARD),view.getrewardCallback,view);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_DOUBLESEVEN_FRESH,this.fresh_jindu,this); 
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.update, this);
        egret.Tween.removeTweens(view._dliangfont);
        view._lqbtn = null;
        view._lqjindu = 1;
        view._acchargetipTxt = null;
        for(let i = 1; i <= 8; ++ i){
            if (String(this.code) === "1") {
                egret.Tween.removeTweens(view[`_build${i}`]);
            }
            view[`_build${i}`] = null;
            view[`_build${i}name`] = null;
        }
        view._dliangfont = null;
        view._rewards = '';
        egret.Tween.removeTweens(view._gquan);
        view._gquan = null;
        view._lampClip = null;
        if (view._lampNanguaEye) {
            egret.Tween.removeTweens(view._lampNanguaEye);
            view._lampNanguaEye = null;
        }
        if (view._lampNanguaMouth) {
            egret.Tween.removeTweens(view._lampNanguaMouth);
            view._lampNanguaMouth = null;
        }
        view._showAVG = false;
        view._acCDTxt = null;
        this._countDownTimeBg = null;
        this._skinPreviewBtn = null;
        this._particleEffArr = [];
        this._itemNumText = null;

        this._sceneType = "1";
		this._curSceneBg = "";
		this._maskTab.length = 0;
		this._maskLayer = null;
		this._effectLayer = null;
		this._switchTime = -1;

        super.dispose();
    }
}