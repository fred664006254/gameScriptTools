/**
 * 骰子详细信息弹窗
 * author qianjun
 * 
 */
class DiceDetailInfoView extends PopupView{

    private _costGroup : BaseDisplayObjectContainer = null;
    private _costTxt : BaseTextField = null;
    private _costIcon : BaseBitmap = null;
    private _levelBtn : BaseButton = null;
    private _rewardGroup : BaseDisplayObjectContainer = null;
    private _rewardIcon : BaseBitmap = null;
    private _rewardTxt : BaseTextField = null;
    private _progressbar : ProgressBar = null;
    private _list : ScrollList = null;
    private _levelTxt : BaseTextField = null;
    private _levelBg : BaseBitmap = null;
    private _useBtn:BaseButton = null;
    private _isinuse:boolean = false;
    private _inbattle:boolean = false;
    private _check:boolean = false;
    private _starDescGroup : BaseDisplayObjectContainer = null;
    // 是否升级了
    private _isUp:boolean = false;

	public constructor() {
		super();
    }

    protected getNetConstEventArr():string[]{
		return [
			NetConst.DICE_UPGRADE
		];
	}

	protected netEventCallBack(evt : egret.Event):void{
		let view = this;
		switch(evt.type){
            case NetConst.DICE_UPGRADE:
                view.upgardeBack(evt);
                break;
		}
    }

    protected preInit():void{
        super.preInit();
        if(Api.GameinfoVoApi.checlIsInGuideId(10)){
            App.CommonUtil.sendNewGuideId(10);
            BattleStatus.scene.resetDetailIndex();
            Api.GameinfoVoApi.setCurGudingId(11);
            App.MsgHelper.dispEvt(MsgConst.SHOW_GUIDE);
        }
    }
    
	// 打开该面板时，需要传参数msg
	public initView():void{
        let view = this;
        view.name = `DiceDetailInfoView`;
        let param = view.param.data;
        let checkOther = false;
        if(param.info){
            checkOther = true;
        }

        let diceid = param.dice;
        let dicecfg = Config.DiceCfg.getCfgById(diceid);
        let level = checkOther ? param.info.lv : Api.DiceVoApi.getDiceLvById(diceid);
        let ismaxlevel = level == dicecfg.maxGrade;
        let havenum = checkOther ? 0 : Api.DiceVoApi.getDiceNumById(diceid);
        let ishave = checkOther ? true : Api.DiceVoApi.isHaveDiceById(diceid);
        let neednum = dicecfg.getNextLvCostNumByLv(level + 1);
        let canlevelup = checkOther ? false : ishave && havenum >= neednum && !ismaxlevel;
        let isinuse = param.isinuse;
        let inbattle = param.inbattle;
        let hideuse = param.hideuse;
        this._isinuse = isinuse;
        this._inbattle = inbattle;
        this._check = param.check;


		let bg:BaseBitmap = BaseBitmap.create("popupview_content1");
        bg.width = 525;
        bg.height = 490;
		bg.x = 0;
		bg.y = 0;

        let birdBg = BaseBitmap.create("ab_bird_bg");
        this.addChildToContainer(birdBg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, birdBg, this.viewBg, [40,0]);
        // 发光特效
        if(dicecfg.quality == 4 && App.CommonUtil.check_dragon() && !inbattle){
            let xunhuan = App.DragonBonesUtil.getLoadDragonBones("box_effect_xunhuan",0,`box_effect_xunhuan_huang`);
            xunhuan.alpha = 1;
            xunhuan.setScale(0.5);
            xunhuan.x = birdBg.x + birdBg.width / 2;
            xunhuan.y = birdBg.y + birdBg.height / 2;
            this.addChildToContainer(xunhuan);
        }

        let iconGroup = App.CommonUtil.getDiceIconById(diceid,1);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, iconGroup, birdBg, [0,0]);
        //进度条
        let progressbg = `progress24`;
        let arrowres = `public_arrowblue`;
        if(ismaxlevel && !checkOther){
            progressbg = `progress26`;
            arrowres = ``;
        }
        else if(canlevelup || checkOther){
            arrowres = `public_arrowgreen`;
            progressbg = `progress25`;
        }
    
        let curlv = level;
		let needNum = dicecfg.getNextLvCostNumByLv(curlv + 1);
        let curNum = checkOther ? 0 : Api.DiceVoApi.getDiceNumById(diceid);
        if((ishave || ismaxlevel) /*&& !checkOther*/){
            let progressbar = ComponentMgr.getProgressBar(progressbg, `progress_bg_1`, 120);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, progressbar, iconGroup, [10,iconGroup.height*iconGroup.scaleY+25]);
            view.addChildToContainer(progressbar);
            progressbar.setTextSize(TextFieldConst.SIZE_18);
            if(ismaxlevel && !checkOther){
				progressbar.setPercentage(1);
				progressbar.setText(`${havenum}`);
			}	
			else{
                progressbar.setPercentage(checkOther ? 1 : Math.min(1,havenum/neednum));
                if(!checkOther)
                    progressbar.setText(ismaxlevel ? `${havenum}` : `${havenum}/${neednum}`);
            }
            progressbar.setTextColor(ColorEnums.white);
            view._progressbar = progressbar;

            let levelbg = BaseBitmap.create(`ab_brid_info_lv_bg`);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, levelbg, progressbar, [-levelbg.width/2 - 12,0]);
            view.addChildToContainer(levelbg);
            view._levelBg = levelbg;
    
            let levelTxt = ComponentMgr.getTextField(`${curlv}`, TextFieldConst.SIZE_TITLE_SMALL);
            view.addChildToContainer(levelTxt);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, levelTxt, levelbg);
            view._levelTxt = levelTxt;
        }
        view.addChildToContainer(iconGroup);

        let nameBg = BaseBitmap.create(`ab_bird_name_bg`);
        nameBg.setPosition(birdBg.x + birdBg.width + 7, birdBg.y + 10);
        view.addChildToContainer(nameBg);

        let nameTxt = ComponentMgr.getTextField(dicecfg.name, TextFieldConst.SIZE_CONTENT_SMALL_POPUP);
        nameTxt.stroke = 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, nameTxt, nameBg, [50,nameTxt.textHeight + 5]);
        view.addChildToContainer(nameTxt);

        let quliatyTxt = ComponentMgr.getTextField(dicecfg.qualityStr, TextFieldConst.SIZE_CONTENT_SMALL_POPUP, ColorEnums.white);
        quliatyTxt.$setStroke(2);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, quliatyTxt, nameTxt, [0,30]);
        view.addChildToContainer(quliatyTxt);

        // for(let i = 0; i < arr.length; ++ i){
        //     let item = <DiceAtkDescItem>list.getItemByIndex(i);
        //     item.freshInfo(2);
        // }
        let addBuffBtn = BaseBitmap.create(ButtonConst.BTN_SMALL_PURPLE_AB);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, addBuffBtn, nameBg, [nameBg.width+15,5]);
        view.addChildToContainer(addBuffBtn);
        addBuffBtn.addTouch(view.touchHandler, view);
        addBuffBtn.visible = !inbattle;

        let btnTxt = ComponentMgr.getTextField(LangMger.getlocal(`sysaddbuff`), TextFieldConst.SIZE_CONTENT_SMALL_POPUP, ColorEnums.white);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, btnTxt, addBuffBtn);
        view.addChildToContainer(btnTxt);
        btnTxt.touchEnabled = false;
        btnTxt.strokeColor = ColorEnums.strokePurple;
        btnTxt.visible = !inbattle;
        
        // addBuffBtn.addTouch(view.touchHandler, view)

        let addbuffFlag = BaseBitmap.create(`ab_bird_attr_rule`);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, addbuffFlag, addBuffBtn, [0,5]);
        view.addChildToContainer(addbuffFlag);
        addbuffFlag.touchEnabled = false;
        addbuffFlag.visible = !inbattle;

        let fontSize = dicecfg.desc.length > 35 ? TextFieldConst.SIZE_18 : TextFieldConst.SIZE_22;
        let descTxt = ComponentMgr.getTextField(dicecfg.desc,fontSize, 0xCFDEFF);
        descTxt.lineSpacing = 5;
        descTxt.width = 300;
        descTxt.stroke = 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, descTxt, nameBg, [20,nameBg.height+20]);
        view.addChildToContainer(descTxt);

        // let line = BaseBitmap.create(`public_line1`);
        // line.width = 460;
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, line, bg, [0,200]);
        // view.addChildToContainer(line);

        let listBg = BaseBitmap.create("ab_bird_infoattrbg");
        this.addChildToContainer(listBg);
        listBg.width = 500;
        listBg.height = 292;
        listBg.x = this.viewBg.x + (this.getShowWidth() - listBg.width) / 2;
        listBg.y = (descTxt.y + descTxt.height + 20 < 200) ? 200 : descTxt.y + descTxt.height + 20;

        //列表说明项
        let arr = [{type: `atkType`},
            {type: `atkNum`}, 
            {type: `atkSpeed`}, 
            {type: `atkTarget`}, 
            {type: `specialDesc1`}, 
            {type: `specialDesc2`}
        ];
        let list = ComponentMgr.getScrollList(DiceAtkDescItem, arr, new egret.Rectangle(0,0,500,250), {
            diceid : diceid,
            info : this.param.data.info,
            inbattle : inbattle,
            check : this.param.data.check
        });
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, list, listBg, [0,0]);
        list.setPosition(listBg.x + 15, listBg.y + 20);
        view.addChildToContainer(list);
        view._list = list;
        //使用模式
		let useBtn = ComponentMgr.getButton(ButtonConst.BTN_BIG_YELLOW_AB, LangMger.getlocal(`sysuse`), view.clickConHandler,view, null, null, 30);
		useBtn.setColor(ColorEnums.white);
		App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, useBtn, listBg, [20,listBg.height+40]);
        view.addChildToContainer(useBtn);
        this._useBtn = useBtn;

        //升级
        let levelbtn = ComponentMgr.getButton(ButtonConst.BTN_BIG_GREEN, ``, ()=>{
            //升级
            SoundMgr.playEffect(SoundConst.EFFECT_BIRD_UPGRADE);
            let curlevel = Api.DiceVoApi.getDiceLvById(diceid);
            if(Api.GameinfoVoApi.checlIsInStepId(28)){
                App.MsgHelper.dispEvt(MsgConst.CLOSE_GUIDE);
            }
            if(Api.UserinfoVoApi.getGold() < dicecfg.getNextLvCostGoldByLv(curlevel + 1)){
                ViewController.getInstance().openView(ViewConst.CONFIRMPOPUPVIEW, {
					title : LangMger.getlocal("sysTip"),
					msg : LangMger.getlocal(`sysgoldNotEnough`),
                    needCancel : false,
                    callback : ()=>{
                        if(Api.GameinfoVoApi.checlIsInStepId(28)){
                            this.hide();
                        }
                    },
                    closecallback : ()=>{
                        if(Api.GameinfoVoApi.checlIsInStepId(28)){
                            this.hide();
                        }
                    },
                    handler : this,
				});
                return;
            }
            NetManager.request(NetConst.DICE_UPGRADE,{
                diceId : String(diceid)
            });
            this._isUp = true;
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, levelbtn, useBtn, [useBtn.width+20,0]);
        view.addChildToContainer(levelbtn);
        view._levelBtn = levelbtn;
        if(isinuse){
            useBtn.visible = false;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, levelbtn, listBg, [0,listBg.height+40]);
        }
        if(view._check || inbattle){
            levelbtn.visible = useBtn.visible = false;
        }
        
        let costGruop = new BaseDisplayObjectContainer();
        costGruop.width = useBtn.width;
        costGruop.height = useBtn.height;
        view._costGroup = costGruop;

        let levelupTxt = ComponentMgr.getTextField(LangMger.getlocal(`syslevel`), TextFieldConst.SIZE_30);
        costGruop.addChild(levelupTxt);
        levelupTxt.stroke = 2;
        levelupTxt.strokeColor = ColorEnums.btnStrokeBlue;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, levelupTxt, costGruop, [0,-5], true);

        let costicon = BaseBitmap.create(`ab_mainui_gold`);
        costicon.setScale(0.7);
        costGruop.addChild(costicon);
        view._costIcon = costicon;

        let costTxt = ComponentMgr.getTextField(dicecfg.getNextLvCostGoldByLv(level + 1).toString(), TextFieldConst.SIZE_30);
        costGruop.addChild(costTxt);
        costTxt.stroke = 2;
        costTxt.strokeColor = ColorEnums.btnStrokeBlue;
        view._costTxt = costTxt;

        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, costicon, levelupTxt, [(levelupTxt.width - costicon.width * costicon.scaleX - costTxt.width)/2-3, levelupTxt.height+2]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, costTxt, costicon, [costicon.width * costicon.scaleX, 0]);
        levelbtn.addGroup(costGruop);

        let rewardGroup = new BaseDisplayObjectContainer();
        rewardGroup.width = 170;
        view.addChildToContainer(rewardGroup);
        view._rewardGroup = rewardGroup;

        let levelupreweardTxt = ComponentMgr.getTextField(LangMger.getlocal(`syslevelreward`), TextFieldConst.SIZE_24, 0x1953A1);
        rewardGroup.addChild(levelupreweardTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, levelupreweardTxt, rewardGroup, [0,0], true);

        let rewardicon = BaseBitmap.create(`dicecriticon`);
        rewardGroup.addChild(rewardicon);
        view._rewardIcon = rewardicon;

        let rewardTxt = ComponentMgr.getTextField(`+${(dicecfg.getNextLvAddCritDamage(level + 1) * 100).toFixed(0)}%`, TextFieldConst.SIZE_TITLE_SMALL,ColorEnums.orangered);
        rewardGroup.addChild(rewardTxt);
        view._rewardTxt = rewardTxt;

        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, rewardicon, levelupreweardTxt, [(levelupreweardTxt.width - rewardicon.width * rewardicon.scaleX - rewardTxt.width - 10)/2, levelupreweardTxt.height+5]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, rewardTxt, rewardicon, [rewardicon.width * rewardicon.scaleX + 10, 0]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, rewardGroup, levelbtn, [levelbtn.width+10,0]);

        let isPowerUp = param.isPowerUp;
        if(isPowerUp){
            let battleTxt = ComponentMgr.getTextField('11', TextFieldConst.SIZE_24, ColorEnums.white);
            this.addChildToContainer(battleTxt);
            battleTxt.width = this.getShowWidth();
            battleTxt.textAlign = egret.HorizontalAlign.CENTER;
            battleTxt.text = LangMger.getlocal("dicedescinbattle");
            battleTxt.stroke = 2;
            battleTxt.x = 0;
            battleTxt.y = listBg.y + listBg.height + 60;
        }
        
        levelbtn.visible = costGruop.visible = rewardGroup.visible = canlevelup && !inbattle;
        if(view._check){
            view._levelBtn.visible = view._costGroup.visible = view._rewardGroup.visible = false;
        }

        if(param.islock){
            useBtn.visible = levelbtn.visible = costGruop.visible = rewardGroup.visible = false;
        }
        this.viewBg.height = levelbtn.y + levelbtn.height + 20 - birdBg.y;
        // if(!Api.GameinfoVoApi.getIsFinishStepGuide(15) && Api.GameinfoVoApi.checlIsInStepId(15)){
        //     NetManager.request(NetConst.REQUEST_USER_STEPGUILD, {stepId:`15`});
        //     PlatMgr.analyticsCompleteNewGuide();
        //     App.MsgHelper.dispEvt(MsgConst.CLOSE_GUIDE);
        //     Api.GameinfoVoApi.setCurGudingId(28);
        // }
    }

    private upgardeBack(evt : egret.Event):void{
        let view = this;
        let param = view.param.data;
        let diceid = param.dice;
        if(evt.data.ret){
            ViewController.getInstance().openView(ViewConst.DICELEVELUPVIEW, {
                dice : diceid,
                isinuse: this._isinuse,
                callback : ()=>{
                    if(Api.GameinfoVoApi.checlIsInStepId(28)){
                        this.hide();
                    }
                },
            });
            //App.CommonUtil.showTip(LangMger.getlocal(`sysUpgardeSucc`));
            // view.closeHandler();
            view.freshView();
        }
    }
    
    private freshView():void{
        let view = this;
        let param = view.param.data;
        let diceid = param.dice;
        let dicecfg = Config.DiceCfg.getCfgById(diceid);
        let level = Api.DiceVoApi.getDiceLvById(diceid);
        let ismaxlevel = level == dicecfg.maxGrade;
        let havenum = Api.DiceVoApi.getDiceNumById(diceid);
        let neednum = dicecfg.getNextLvCostNumByLv(level + 1);
        let ishave = Api.DiceVoApi.isHaveDiceById(diceid);
        let canlevelup = ishave && havenum >= neednum && !ismaxlevel;

        view._costTxt.text = dicecfg.getNextLvCostGoldByLv(level + 1).toString();
        view._costIcon.x = (view._costGroup.width - view._costIcon.width * view._costIcon.scaleX - view._costTxt.width)/2-3;
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, view._costTxt, view._costIcon, [view._costIcon.width * view._costIcon.scaleX, 0]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._costGroup, view._levelBtn, [0,0], true);

        view._rewardTxt.text = `+${(dicecfg.getNextLvAddCritDamage(level + 1) * 100).toFixed(0)}%`;
        view._rewardIcon.x = (view._rewardGroup.width - view._rewardIcon.width * view._rewardIcon.scaleX - view._rewardTxt.width - 10)/2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, view._rewardTxt, view._rewardIcon, [view._rewardIcon.width * view._rewardIcon.scaleX + 10, 0]);

        view._levelBtn.visible = view._costGroup.visible = view._rewardGroup.visible = canlevelup && !this._inbattle;
        if(view._check){
            view._levelBtn.visible = view._costGroup.visible = view._rewardGroup.visible = false;
        }
        //进度条
        let progressbg = `progress24`;
        let arrowres = `public_arrowblue`;
        if(ismaxlevel){
            progressbg = `progress26`;
            arrowres = ``;
        }
        else if(canlevelup){
            arrowres = `public_arrowgreen`;
            progressbg = `progress25`;
        }
 
        let progressbar = view._progressbar;
        progressbar.changeRes(progressbg, `progress_bg_1`);
        //  App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, progressbar, bg, [0,bg.height+10]);
 
        progressbar.setPercentage(ismaxlevel ? 1 : Math.min(1,havenum/neednum));
        progressbar.setText(ismaxlevel ? `${havenum}` : `${havenum}/${neednum}`);
        progressbar.setTextColor(ColorEnums.white);

        let curlv = Api.DiceVoApi.getDiceLvById(diceid);
        let needNum = dicecfg.getNextLvCostNumByLv(curlv + 1);
        let curNum = Api.DiceVoApi.getDiceNumById(diceid);
        if(needNum && view._levelBg){
            view._levelTxt.text = `${curlv}`;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._levelTxt, view._levelBg);
        }

        let arr = [`atkType`, `atkNum`, `atkSpeed`, `atkTarget`, `specialDesc1`, `specialDesc2`];
        for(let i = 0; i < arr.length; ++ i){
            let item = <DiceAtkDescItem>view._list.getItemByIndex(i);
            item.freshInfo(this._inbattle? 2 : 1);
        }
    }

	protected resetBgSize():void{
        let view = this;
        this.viewBg.width = this.getShowWidth();
        super.resetBgSize();
        let param = view.param.data;
        let diceid = param.dice;
        //星级和攻速说明
        if(view._check && view._inbattle){
            let group = new BaseDisplayObjectContainer();
            view._starDescGroup = group;
            view.addChild(group);

            let iconGroup2 = App.CommonUtil.getDiceIconById(diceid,1);
            iconGroup2.setScale(0.8);

            let txtbg = BaseBitmap.create(`dicedetailstardescbg`);
            group.addChild(txtbg);
            group.addChild(iconGroup2);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, txtbg, iconGroup2, [28, 15]);
    
            let txt = ComponentMgr.getTextField(LangMger.getlocal(`dicestaratkspeed`, [param.star ? param.star : 1]), 24, 0x1953A1);
            txt.stroke = 2;
            txt.strokeColor = 0xffffff;
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, txt, txtbg, [79, 2]);
            group.addChild(txt);

            group.setLayoutPosition(LayoutConst.leftbottom, group, this.viewBg, [49,16]);
        }
	}


	protected isTouchMaskClose():boolean{
		return Api.GameinfoVoApi.getIsFinishNewGuide();
	}

	protected clickConHandler(data:any):void{
		let param=this.param;
		if (!param.data.clickNotAutoHide) {
			this.hide();
		}
		if(param.data.callback){
			param.data.callback.apply(param.data.handler,[this]);
		}
	}

    protected getTitleStr(){
		return LangMger.getlocal(`sysinfo`);
	}

	protected closeHandler(){
		let param = this.param;
		if(param.data.closecallback){
			param.data.closecallback.apply(param.data.handler,[this]);
        }
        if(Api.GameinfoVoApi.checlIsInGuideId(11)){
            App.CommonUtil.sendAnlyId(100);
            BattleStatus.scene.setPowerUpInfo();
        }
		super.closeHandler();
    }

	// protected getShowHeight():number{
	// 	return 700;
	// }

	public hide(){	
        let param = this.param;
        if(Api.GameinfoVoApi.checlIsInStepId(29)){
            Api.GameinfoVoApi.setCurGudingId(30)
            if(param.data.closecallback){
                param.data.closecallback.apply(param.data.handler,[this]);
            }
        }
        if(this._isUp){
            App.MsgHelper.dispEvt(MsgConst.TWEEN_CIRT_NUM);
        }	
        super.hide();
	}

	protected getResourceList():string[]{	
		let array:string[] = [];
		array.concat(super.getResourceList())
		return array.concat([
            `boxrewardpopupview`,
            `ab_bird_name_bg`,
            `ab_bird_bg`,
            `ab_brid_info_lv_bg`,
            `ab_bird_attr_infobg1`,
            `ab_bird_attr_infobg2`,
            `ab_bird_attr_infobg3`,
            `ab_bird_attr_rule`,
            `dicedetailstardescbg`
		]);
	}

	protected getParent():egret.DisplayObjectContainer{
		if(this.param.data.inLayer){
			return this.param.data.inLayer;
		} 
		else{
			return super.getParent();
		}
    }

    protected playOpenViewEffect():void{
		if(this.isShowOpenAni()){
			//打开特效
			this.alpha=0;
			this.scaleX=0.5;
			this.scaleY=0.5;
			this.anchorOffsetX=GameConfig.stageWidth/2;
			this.anchorOffsetY=GameConfig.stageHeigth/2;
			this.x = GameConfig.stageWidth/2;
			this.y = GameConfig.stageHeigth/2;
			if(this._maskBmp){
				this._maskBmp.setScale(2);
				this._maskBmp.x = -GameConfig.stageWidth/2;
				this._maskBmp.y = -GameConfig.stageHeigth/2;
			}
			egret.Tween.get(this, {loop : false}).to({scaleX : 1.1, scaleY : 1.1,alpha:1},200).to({scaleX : 1, scaleY : 1},100).call(function(){
				egret.Tween.removeTweens(this);
				if(this._maskBmp){
					this._maskBmp.setScale(1);
					this._maskBmp.x = 0;
					this._maskBmp.y = 0;
                }
                if(!Api.GameinfoVoApi.getIsFinishStepGuide(28) && Api.GameinfoVoApi.checlIsInStepId(28)){
                    Api.GameinfoVoApi.setCurGudingId(29);
                    NetManager.request(NetConst.REQUEST_USER_STEPGUILD, {stepId:`28`});
                    // App.MsgHelper.dispEvt(MsgConst.SHOW_GUIDE);
                    // PlatMgr.analyticsCompleteNewGuide();
                    App.MsgHelper.dispEvt(MsgConst.CLOSE_GUIDE);
                    // Api.GameinfoVoApi.setCurGudingId(28);
                }
			},this);	
		}	
	}

    private _isBeginning = false;
    private touchHandler(e:egret.TouchEvent):void{
        let view = this;
        let list = view._list;
        let arr = [1,2,3,4,5,6];
        switch (e.type) {
            case egret.TouchEvent.TOUCH_BEGIN:
                if(view._isBeginning==false){
                    view._isBeginning=true;
                }
                for(let i = 0; i < arr.length; ++ i){
                    let item = <DiceAtkDescItem>list.getItemByIndex(i);
                    item.freshInfo(2);
                }
                break;
            case egret.TouchEvent.TOUCH_CANCEL:
            case egret.TouchEvent.TOUCH_END:
                for(let i = 0; i < arr.length; ++ i){
                    let item = <DiceAtkDescItem>list.getItemByIndex(i);
                    item.freshInfo(1);
                }
            default:
                break;
        }
    }

	public dispose():void{
        let view = this;
        this._inbattle = false;
        this._isinuse = false;
        this._check = false;
        this._isUp = false;
        view._costGroup = null;
        view._costTxt = null;
        view._costIcon = null;
        view._levelBtn = null;
        view._rewardGroup = null;
        view._rewardTxt = null;
        view._progressbar = null;
        view._levelBg = null;
        view._levelTxt = null;
        view._list = null;
        view._isBeginning = false;
        view._starDescGroup = null;
		super.dispose();
	}
}