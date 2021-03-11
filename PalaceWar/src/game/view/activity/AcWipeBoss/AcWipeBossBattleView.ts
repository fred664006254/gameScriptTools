
class AcWipeBossBattleView extends BaseBattleView
{
	private _callbackF:Function = null;
	private _obj:any = null;
	private _idx:number= null;

	private _rewards:string = null;
	private _curKey:string = null;
	private _curValue:number = 0;
	private _bossConfig : Config.AcCfg.WipeBossFoeItemCfg = null;

	// 开始按钮
	private _gameBtn:BaseButton;
	private _isAttackWin:boolean;

	
	//门客战斗力
	private _allServantInfo:Object = null;	
	private _dps:number = 0;
	private _exp:number = 0;

	//总血量
	private _bossValue:number = 0;
	private _heroValue:number = 0;

	private _isBattling:boolean = false;
	private _hasKill:number = 0; // 1--Boss已经被击杀



	private _moreArrow:BaseBitmap = null;
	private _isShowMore:boolean = false;
	private touchBoo:boolean =true;
	private _nameTxt:BaseTextField =null;
	private _describeTxt:BaseTextField =null;
    private moveContainer:BaseDisplayObjectContainer =null;
    private _infoGroup:BaseDisplayObjectContainer =null;
	private _currMaskBmp:BaseBitmap =null;
	private _touchBg:BaseBitmap =null;
	private _scrollList: ScrollList;
	private moreBg:BaseBitmap =null;
	private bottomBg:BaseBitmap =null;
	private _isRefresh:boolean  =false;
	private _bossInfoVoList:Array<any>=[];

	private _eliteidx:string = null;
	private _eliteBossCfg:Config.AllianceEliteBossItemCfg = null;
	private _upBf : BaseBitmapText|BaseTextField= null;
	private studyatk_upbg : BaseBitmap = null;
	private studyatk_uparrow : BaseBitmap = null;
	private atk : boolean;

	public constructor() {
		super();
	}

	protected getResourceList():string[]
	{
		let tempArray:string[] = super.getResourceList()

		return tempArray.concat([
				ButtonConst.BATTLE_START_BTN_1,
                "allianceboss_down","progress8","progress7_bg",
				"studyatk_upfnt","studyatk_upbg","studyatk_uparrow",
				`wipeboss${this.param.data.foeId}`
		]);
    }
    
    private get api() : WipeBossVoApi{
        return Api.wipeBossVoApi;
    }
	
	private get cfg() : Config.AcCfg.WipeBossCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
    }

    private get vo() : AcWipeBossVo{
        return <AcWipeBossVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
    }

	protected getBgName():string
	{
		return "aobaibg2";
    }
    
    // 标题背景名称
	protected initTitle():void
	{				
		return null;
	}

	// 标题背景名称
	protected getTitleStr():string
	{				
		return null;
	}

	protected initBg():void
	{
		let bgName:string=this.getBgName();
		if(bgName)
		{
			this.viewBg = BaseLoadBitmap.create(bgName);
			if(this.isTouchMaskClose())
			{
				this.viewBg.touchEnabled=true;
			}
            this.addChild(this.viewBg);
            this.viewBg.width = GameConfig.stageWidth;
            this.viewBg.y = 0;
		}
	}

	private findBestServant(bossLife:number):string|number
	{
		if(!bossLife)
		{
			bossLife=0;
		}
		let servantId:string|number;
		let allKey:string[] = Api.servantVoApi.getServantInfoIdListWithSort(1);
		let addV = this.vo.getMyAdd() / 100;
		allKey.sort((a,b)=>
		{
			let value1:number=Api.servantVoApi.getServantCombatWithId(a) * (1 + addV);
			let valueb:number=Api.servantVoApi.getServantCombatWithId(b) * (1 + addV);
			return value1-valueb;
		});
		let l:number=allKey.length;
		for(let i:number=0;i<l;i++)
		{
			if(this.vo.getServantFightInfo(allKey[i]) == 0)
			{
				servantId=allKey[i];
				if((Api.servantVoApi.getServantCombatWithId(allKey[i]) * (1 + addV)) >= bossLife)
				{
					break;
				}
			}
		}
		return servantId;
	}

	//重置默认选中的门客 和 当前属性
	private resetTopKey():void
	{
		
		//初始化门客信息 key: 门客ID，value: 门客战斗力
		if (this._allServantInfo == null) {
			this._allServantInfo = {};
			let allKey:string[] = Api.servantVoApi.getServantInfoIdListWithSort(1);
			for (let k in allKey)
			{
				let key:string = allKey[k];
				this._allServantInfo[key] = Api.servantVoApi.getServantCombatWithId(key);
			}
		}

		this._curKey = null;
		this._heroValue = 0;

		let blood = this.api.getWipeBlood(this._idx,this.param.data.bosskey);
		let curValue:number = blood == undefined ? (this._bossValue) : blood;
		let servantId = this.findBestServant(curValue);
		if(servantId && this.vo.getServantFightInfo(servantId) == 0){
			this._curKey = servantId.toString();
			this._heroValue = this._allServantInfo[this._curKey];
		}
		//allKeys:string[] = Object.keys(this._allServantInfo);
		// allKeys.sort((a:string,b:string)=>{
				
		// 		let valueA:number = this.vo.getServantFightInfo(a);
		// 		let valueB:number = this.vo.getServantFightInfo(b);

		// 		if (valueA == valueB)
		// 		{
		// 			return Number(this._allServantInfo[b] - this._allServantInfo[a]);
		// 		}else
		// 		{
		// 			return Number(valueA - valueB);
		// 		}
		// 	});
		// if (this.vo.getServantFightInfo(allKeys[0]) == 0) {
		// 	this._curKey = allKeys[0];
		// 	this._heroValue = this._allServantInfo[this._curKey];
		// }
	}

	protected initView():void
	{	
		let view = this;
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_WIPEBOSSATTACK),view.intoBossBattle,view);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_WIPEBOSS_REFRESH,view.update,view);
		let bottom:BaseBitmap = BaseBitmap.create("public_9_wordbg");
		bottom.height = 170;
		view.atk = false;
		// if (this.param.data && this.param.data.f && this.param.data.o)
		// {
		// 	this._obj = this.param.data.o;
		// 	this._callbackF = this.param.data.f;
		// }

		// if(this.param.data.eliteidx != null)
		// {
		// 	this._eliteidx = this.param.data.eliteidx;
		// 	this._eliteBossCfg = Config.AllianceelitebossCfg.getAllianceCfgByLv(this._eliteidx);
		// }

		// let downBg:BaseBitmap = BaseBitmap.create("allianceboss_down");
		// downBg.y = GameConfig.stageHeigth - this.getTitleButtomY() - downBg.height - 75;
		// this.addChildToContainer(downBg);

		view._idx = view.param.data.foeId;
		view._bossConfig = view.cfg.getBossNpcItemCfgById(view._idx);

		// App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ALLIANCE_ATTACK),this.intoBossBattle,this);
		// if (this.param.data && this.param.data.f && this.param.data.o)
		// {
		// 	this._obj = this.param.data.o;
		// 	this._callbackF = this.param.data.f;
		// }

		view._bossValue = view.vo.getWipeBossMaxHp(view._bossConfig.id);;
		let blood = view.api.getWipeBlood(view._idx,view.param.data.bosskey);
		let curValue:number = blood == undefined ? (view._bossValue) : blood;
		this.resetTopKey();
			
		this.setTopProgress(curValue, view._bossValue , GameConfig.stageWidth, 2);
		this._topProgress.y = 0;

		let upHeroPic:string = view._bossConfig.npcPic;
		this.setUpHero(upHeroPic,null,2);
		this._upHero.setScale(0.8);
		this._upHero.x = GameConfig.stageWidth/2 - this._upHero.width * this._upHero.scaleX / 2;

		let downHeroPic:string = null;
		let downInfo:any = null;

		let showeff1 = false;
		if (this._curKey) {
			let addV = 0;
			let addInfo = Api.allianceVoApi.getDecreePolicyAddAttrInfo();
			if(addInfo && addInfo.lastTimes > 0){
				let addV = Math.floor(Api.playerVoApi.getAtk() * addInfo.addExtent);
			}
			downHeroPic = Api.servantVoApi.getFullImgPathWithId(this._curKey);// "servant_full_"+this._curKey;

			let servant:ServantInfoVo = Api.servantVoApi.getServantObj(this._curKey);
			if (servant && servant.equip && servant.equip != ""){
				showeff1 = true;
			}
			let power:number = this._allServantInfo[this._curKey] + addV;
			downInfo = [[LanguageManager.getlocal("fightForce")+":"+power.toFixed(0),TextFieldConst.COLOR_LIGHT_YELLOW],[LanguageManager.getlocal("clickChooseServant")]];
		}
		else {
			downHeroPic = "servant_empty";
			downInfo = [["empty",TextFieldConst.COLOR_LIGHT_YELLOW],[LanguageManager.getlocal("clickChooseServant")]];
		}
		let maskbg:BaseBitmap=BaseBitmap.create("upheromask");
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, maskbg, this._upHero, [0,248]);
		this.addChildToContainer(maskbg);

		this.setDownHero(downHeroPic,downInfo,2,showeff1);
		this._downHero.setScale(0.8);
		this._downHero.x = GameConfig.stageWidth/2 - this._downHero.width * this._downHero.scaleX / 2;
		this._downHero.y = GameConfig.stageHeigth - this._downHero.height * this._downHero.scaleY - 100;//- this.getTitleButtomY();

		this._upPositon = egret.Point.create(this._upHero.x,this._upHero.y);
		this._downPositon = egret.Point.create(this._downHero.x,this._downHero.y);

		this._downHero.addTouchTap(this.clickChangeHero,this);
		//boss getBgName
        let tipBg:BaseBitmap=BaseBitmap.create("aobaibottom");
        tipBg.width = 200;
		this.addChildToContainer(tipBg);
		let id = this._eliteidx == null?this._idx:this._eliteidx;
		let servantName:BaseTextField = ComponentManager.getTextField(view._bossConfig.npcName,TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
		servantName.setPosition(GameConfig.stageWidth/2 - servantName.width/2, this._topProgress.y+ 40);
		this.addChildToContainer(servantName);
		tipBg.setPosition(GameConfig.stageWidth/2 - tipBg.width/2,servantName.y + servantName.height/2 - 15 );
	
		// 开始游戏
		this._gameBtn = ComponentManager.getButton(ButtonConst.BATTLE_START_BTN_1,null,this.btnClick,this);
		this._gameBtn.setPosition(GameConfig.stageWidth/2,GameConfig.stageHeigth/2 - 50);
		this._gameBtn.anchorOffsetX = this._gameBtn.width/2;
		this._gameBtn.anchorOffsetY = this._gameBtn.height/2;
		this.addChild(this._gameBtn);	
		this.btnAnim();

		if (this._curKey == null) {
			this._gameBtn.visible = false;
		}



		bottom.y = GameConfig.stageHeigth - bottom.height;
		this.addChild(bottom);
        this.bottomBg = bottom;
        
        let shopBtn = ComponentManager.getButton('aobaishop', '', ()=>{
            ViewController.getInstance().openView(ViewConst.POPUP.ACWIPEBOSSSHOPVIEW,{
                aid : view.param.data.aid,
                code : view.param.data.code
            });
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, shopBtn, bottom, [20,-shopBtn.height-10]);
        view.addChild(shopBtn);

        let studyatk_upbg =  BaseBitmap.create("studyatk_upbg");
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, studyatk_upbg, shopBtn);
		view.addChild(studyatk_upbg);
		view.studyatk_upbg = studyatk_upbg;
        
        let studyatk_uparrow =  BaseBitmap.create("studyatk_uparrow");
        studyatk_uparrow.x = studyatk_upbg.x + studyatk_upbg.width/2 +20;
        studyatk_uparrow.y = studyatk_upbg.y + studyatk_upbg.height/2 - studyatk_uparrow.height/2 ;
		view.addChild(studyatk_uparrow);
		view.studyatk_uparrow = studyatk_uparrow;

        let addV = view.vo.getMyAdd();
        let addvStr = addV.toFixed(0) + "%";
        let upBF = ComponentManager.getBitmapText(addvStr,"studyatk_upfnt");
        upBF.x = studyatk_uparrow.x - upBF.width - 5;
		upBF.y = studyatk_upbg.y + studyatk_upbg.height/2 - upBF.height/2 ;
		view._upBf = upBF;
        view.addChild(upBF);

        studyatk_upbg.touchEnabled = studyatk_uparrow.touchEnabled = upBF.touchEnabled = false;

		//this.requestGetBossLog();
		this._isRefresh =false;
		//App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ALLIANCE,this.requestGetBossLog,this);


		// let showMore:BaseButton = ComponentManager.getButton("arena_more",null,this.showMoreHandle,this);
		// showMore.setPosition(515,GameConfig.stageHeigth-52);
		// this.addChild(showMore);

		this._moreArrow = BaseBitmap.create("arena_arrow");
		this._moreArrow.alpha = 0;
		this._moreArrow.setPosition(480,911);
		this.addChild(this._moreArrow);

        // this.refreshDecreeAtrr();
        let infoGroup = new BaseDisplayObjectContainer();
		infoGroup.width = 640;
		//App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, infoGroup, bottomBg, [0,45]);
		view.addChild(infoGroup);
		view._infoGroup = infoGroup;

		let rect = new egret.Rectangle(0,0,GameConfig.stageWidth,140);
		infoGroup.y = 0;
		let scrollView = ComponentManager.getScrollView(infoGroup,rect);
		scrollView.y = bottom.y + 20;
		scrollView.horizontalScrollPolicy = "off";
		scrollView.bounces = false;
        view.addChild(scrollView);

        view.freshTxt();
        
        // let maskBmp = BaseBitmap.create("public_9_viewmask");
		// maskBmp.width = GameConfig.stageWidth;
		// maskBmp.height = scrollView.measuredHeight
		// infoGroup.addChild(maskBmp);

    }
    
    private freshTxt():void{
        let view = this;
        let scrollStart = 10;
		let arr = view.api.getWipeDamageInfo(view._idx,this.param.data.bosskey);
		view._infoGroup.removeChildren();
		if(arr.length){
			for(let i in arr){
				let unit = arr[i];
				let nameTxt : any = view._infoGroup.getChildByName(`name${unit.uid}${i}`);
				let namestr =  `${Number(i) + 1}.${unit.name}`;
				if(nameTxt){
					if(PlatformManager.checkIsEnLang())
					{
						nameTxt.text = namestr.length > 12 ? (namestr.substring(0, 12) + '...') : namestr;
					}
					else{
						nameTxt.text = namestr.length > 6 ? (namestr.substring(0, 6) + '...') : namestr;
					}
					
				}
				else{
					let nameTxtStr = "";
					if(PlatformManager.checkIsEnLang())
					{
						nameTxtStr = namestr.length > 12 ? (namestr.substring(0, 12) + '...') : namestr;
					}
					else
					{
						nameTxtStr = namestr.length > 6 ? (namestr.substring(0, 6) + '...') : namestr;
					}
					nameTxt = ComponentManager.getTextField(nameTxtStr, 20);
					nameTxt.width = 150;
					nameTxt.name = `name${unit.uid}${i}`;
					App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, nameTxt, view._infoGroup, [20,scrollStart], true);
					view._infoGroup.addChild(nameTxt);
				}
	
				let scoreTxt : any = view._infoGroup.getChildByName(`score${unit.uid}${i}`);
				if(scoreTxt){
					scoreTxt.text = LanguageManager.getlocal(`acwipeBossAllDamgeDesc`,[view._bossConfig.npcName, unit.score]);
				}
				else{
					scoreTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acwipeBossAllDamgeDesc`,[view._bossConfig.npcName, unit.score]), 20);
					scoreTxt.name = `score${unit.uid}${i}`;
					scoreTxt.textAlign = egret.HorizontalAlign.LEFT;
					App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, scoreTxt, nameTxt, [nameTxt.width + 100,0]);
					view._infoGroup.addChild(scoreTxt);
				}
				scrollStart += 30;
	
				if(unit.uid == Api.playerVoApi.getPlayerID()){
					nameTxt.textColor = scoreTxt.textColor = TextFieldConst.COLOR_WARN_GREEN;
				}
			}
		}
		else{
			let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acPunishNoData`), 20);
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, view._infoGroup, [0,scrollStart + 20],true);
			view._infoGroup.addChild(tipTxt);
		}
		let maskBmp = BaseBitmap.create("public_9_viewmask");
		maskBmp.width = GameConfig.stageWidth;
		maskBmp.height = scrollStart;
		maskBmp.name = 'mask';
		maskBmp.alpha = 0;
		view._infoGroup.addChild(maskBmp);
	}

	// protected refreshDecreeAtrr()
	// {
	// 	let addInfo = Api.allianceVoApi.getDecreePolicyAddAttrInfo();
        
    //     if(addInfo)
    //     {
    //         if(!this._decreeAddTxt)
    //         {
    //             this._decreeAddTxt = ComponentManager.getTextField("",20,TextFieldConst.COLOR_WARN_YELLOW2);
    //             this._decreeAddTxt.setPosition(GameConfig.stageWidth/2 ,this._moreArrow.y - 20 );
    //             this.addChild( this._decreeAddTxt);
    //         }
    //         if(addInfo.lastTimes > 0){
	// 			// let addV = ""+ Math.floor((addInfo.addExtent *100)+0.5);
	// 			let addV = (addInfo.addExtent *100).toFixed(1) + "%";
    //             this._decreeAddTxt.text = LanguageManager.getlocal(addInfo.strKey,[addInfo.strKey2,addV]);
	// 			this._decreeAddTxt.anchorOffsetX = this._decreeAddTxt.width/2;
    //         }else{
    //             this._decreeAddTxt.text = "";
    //         }
    //     }
	// }

	protected getRequestData():{requestType:string,requestData:any}
	{	
		let view = this;
		return {requestType:NetRequestConst.REQUEST_ACTIVITY_WIPEBOSSGETBOSSHP,requestData:{
			activeId : view.vo.aidAndCode,
			bosstype : view.param.data.foeId,
			bosskey : view.param.data.bosskey,
		}};
	}

	protected receiveData(data:{ret:boolean,data:any}):void
	{
		let view = this;
		view.api.setBossInfo({
			bosstype : view.param.data.foeId,
			bosskey : view.param.data.bosskey,
			bosshp : Number(data.data.data.BossHp),
			damagelog : data.data.data.damagelog
		});
	}

	private requestGetBossLog():void
	{
		this._isRefresh =true;
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ALLIANCE_GETBOSSLOG),this.showBossLog,this);
		if(this._eliteidx == null)
		{
			if(this._idx!=null)
			{
				NetManager.request(NetRequestConst.REQUEST_ALLIANCE_GETBOSSLOG, {"bossId":this._idx});
			}
		}
		else
		{
			NetManager.request(NetRequestConst.REQUEST_ALLIANCE_GETBOSSLOG, {"bossId":this._eliteidx});
		}

	
	}
	private showBossLog(event:egret.Event):void
	{
		if (!event.data.ret){
			return;
		}
		let rdata = event.data.data;
		if(rdata.ret == 0)
		{
			this._bossInfoVoList=rdata.data.allianceBossLog;
			if(this._isRefresh)
			{
			
			}
			else
			{
				this.showText();
			}
		
		}
		
	}

	private showMoreHandle():void
	{
		
		if(this.touchBoo)
		{
			this._isShowMore = !this._isShowMore;
			if (this._isShowMore == true) {
				this._moreArrow.scaleY = -1;
				this._moreArrow.y += this._moreArrow.height;
					this.showList();		
			}
			else {
				this._moreArrow.scaleY = 1;
				this._moreArrow.y -= this._moreArrow.height;
					this.closeList();
			}
		}
		
	}
	private closeList():void
	{
		this.touchBoo=false;
		if(this.moveContainer)
		{	
			egret.Tween.get(this.moveContainer).to({y:1150},500).call(function(){
			this.touchBoo=true;
			egret.Tween.removeTweens(this.moveContainer);
		
		},this);
		}
		if(this._currMaskBmp&&this._currMaskBmp.parent)
		{
			this._currMaskBmp.parent.removeChild(this._currMaskBmp);
			this._currMaskBmp.dispose();
			this._currMaskBmp =null;
		}
		
		if(this._touchBg&&this._touchBg.parent)
		{
			this._touchBg.parent.removeChild(this._touchBg);
			this._touchBg.dispose();
			this._touchBg =null;
		}
		
	}

	private clickChangeHero():void
	{
		if (this._isBattling == true) {
			return;
		}

		let allKeys:string[] = Object.keys(this._allServantInfo);
		let showTab:any[] = [];
		for (let k in allKeys)
		{
			let key:string = allKeys[k];
			showTab.push([key,this.vo.getServantFightInfo(key),this._allServantInfo[key],Api.servantVoApi.getServantObj(key).banishSt]);
		}


		showTab.sort((a:any[],b:any[])=>{
				
				let valueA:number = a[1];
				let valueB:number = b[1];

				if (valueA == valueB)
				{
					if (Api.switchVoApi.checkOpenExile()) {
						if (a[3] && (!b[3])) {
							return 1;
						}
						else if (a[3] && b[3]) {
							return Number(b[2] - a[2]);
						}
						else if ((!a[3]) && b[3]) {
							return -1;
						}
						else if ((!a[3]) && (!b[3])) {
							return Number(b[2] - a[2]);
						}

					}
					else {
						return Number(b[2] - a[2]);
					}
					// return Number(b[2] - a[2]);
				}else
				{
					return Number(valueA - valueB);
				}
			});
		ViewController.getInstance().openView(ViewConst.POPUP.SERVANTSELECTEDPOPUPVIEW,{type:ServantSelectedPopupView.TYPE_WIPEBOSS,"info":showTab,callback:this.sendRequest,handler:this, code : this.param.data.code});
	}

	private sendRequest(params:any):void
	{	
		let clickKey:any = params.key;
		if (clickKey != this._curKey) {
			this._curKey = clickKey;
			let servant:ServantInfoVo = Api.servantVoApi.getServantObj(clickKey);		
			let showeff1 = false;
			if (servant && servant.equip && servant.equip != ""){
				showeff1 = true;
			}
			this._downHero.resetHero(servant.fullImgPath,this._allServantInfo[clickKey],showeff1);
			this._gameBtn.visible = true;
		}
	}


	private btnClick():void
	{
		let bossId = this._eliteidx == null?this._idx:this._eliteidx;
		// if( this._eliteidx == null)
		// {
		// 	NetManager.request(NetRequestConst.REQUEST_ALLIANCE_ATTACK,{"servantId":this._curKey,"bossId":this._idx});
		// }
		// else
		// {
		// 	NetManager.request(NetRequestConst.REQUEST_ALLIANCE_ATTACK,{"servantId":this._curKey,"bossId":this._eliteidx,elite:1});
		// }
		let view = this;
		if(!view.vo.isInTansuoTime()){
			App.CommonUtil.showTip(LanguageManager.getlocal("acwipeBossEnd"));
			view.hide();
			return;
		}
		if(!view.vo.isInFightTime()){
			App.CommonUtil.showTip(LanguageManager.getlocal("acwipeBossMidDesc6"));
			view.hide();
			return;
		}
		NetManager.request(NetRequestConst.REQUEST_ACTIVITY_WIPEBOSSATTACK,{
			activeId:this.vo.aidAndCode,
			bosstype:this.param.data.foeId,
			bosskey:this.param.data.bosskey,
			servantId:this._curKey
		});
		
		// NetManager.request(NetRequestConst.REQUEST_ACTIVITY_WIPEBOSSATTACK, {
		// 	activeId : view.vo.aidAndCode,
		// 	bosstype : resultInfo.type,
		// 	bosskey : view.param.data.bosskey
		// });
		//test code
	}

	private btnAnim():void
	{
		if (this._gameBtn) {
			egret.Tween.get(this._gameBtn).to({scaleX:0.9,scaleY:0.9}, 600).to({scaleX:1,scaleY:1}, 600).call(this.btnAnim,this);
		}
	}


	private intoBossBattle(p:any):void
	{
		if (p.data.ret == true) {
			this.atk = true;
			this.api.setBossInfo({
				bosstype : this.param.data.foeId,
				bosskey : this.param.data.bosskey,
				bosshp : p.data.data.data.bosshp,
				damagelog : p.data.data.data.damagelog
			});
			this.freshTxt();
			//this.refreshDecreeAtrr();
			SoundManager.playEffect(SoundConst.EFFECT_BATTLE_START);

			this._hasKill = p.data.data.data.hasKill;
			if (this._hasKill == 1) {
				ViewController.getInstance().openView(ViewConst.POPUP.ACWIPEBOSSATTACKEDPOPUPVIEW,{type:3, index:this._idx, damage:this._dps ,exp:this._exp , rewards:this._rewards , f:this.hide, o:this, aid : this.param.data.aid, code : this.param.data.code});
				return ;
			}
			
			this._rewards= p.data.data.data.rewards;
			this._isAttackWin = p.data.data.data.killFlag;
			this._dps = p.data.data.data.damage;
			this._exp = p.data.data.data.score;
			
			this._isBattling = true;
			this._gameBtn.visible = false;

			this.gameBegin();
			
		}
	}

	private gameBegin():void
	{
		this.attackHandle(1,this._dps);
	}

	protected attackHandle(area:number,damage:number,isCrit?:boolean):void
	{
		if (this._isMoving == true) {
			return;
		}
		this._isMoving = true;
		this._heroArray.length = 0;
		this._damage = damage;
		this._area = area;
		let offsetY:number; 
		let moveY:number;
		let scaleTo:number = 0.75;
		let offsetX:number;
		if (area == 1) {
			this._heroArray=[this._downHero,this._upHero];
			offsetY = 50;
			moveY = this._upHero.y+100;
			offsetX= offsetY*(this._downHero.x - this._upHero.x)/(this._downHero.y - this._upHero.y);
		}
		else {
			this._heroArray=[this._upHero,this._downHero];
			offsetY = -50;
			moveY = this._downHero.y-100 + this._downHero.height*(1-scaleTo);
			offsetX = offsetY*(this._downHero.x - this._upHero.x)/(this._downHero.y - this._upHero.y);
		}

		if (this.container.getChildIndex(this._heroArray[0])< this.container.getChildIndex(this._heroArray[1])) {
			this.container.swapChildren(this._heroArray[0],this._heroArray[1]);
		}

		let critTime:number = 0;
		let moveTime1:number = 60;
		let moveTime2:number = 260;
		
		let moveTo:egret.Point = egret.Point.create( this._heroArray[1].x + (1-scaleTo)*this._heroArray[0].width/2 ,moveY);

		let scaleBig:number = 1.06;
		let moveFirst:egret.Point = egret.Point.create( this._heroArray[0].x - (scaleBig-1)*this._heroArray[0].width/2 ,this._heroArray[0].y - (scaleBig-1)*this._heroArray[0].height/2);
		//hero
		egret.Tween.get(this._heroArray[0]).wait(critTime).
		to({y : this._heroArray[0].y + (area == 1 ? 20 : -20), },300).//后移
		//to({x:moveFirst.x,y:moveFirst.y,alpha : 1,scaleX:scaleBig, scaleY:scaleBig},500).
		to({y:moveTo.y}, moveTime1).
		//to({x:moveFirst.x+offsetX, y:moveFirst.y+offsetY},150).
		to({y:this._heroArray[0].y},moveTime2);
		TimerManager.doTimer(critTime + 300 + moveTime1,1,this.showBeAttackAnim,this);
	}

	protected setTopProgress(value:number,maxValue?:number, progressWidth?:number , type:number=1):void
	{
		super.setTopProgress(value,maxValue,progressWidth,type);
		this._topProgress.setPercentage(this._topCurValue / this._topMaxValue, this._topCurValue.toString());
	}


	private showEndGame():void
	{
			// 
			
	}

	protected atkEndCallback():void
	{	
		this._upHero.setScale(0.8);
		this._upHero.x = GameConfig.stageWidth/2 - this._upHero.width * this._upHero.scaleX / 2;
		this._downHero.setScale(0.8);
		this._downHero.x = GameConfig.stageWidth/2 - this._downHero.width * this._downHero.scaleX / 2;
		this._downHero.y = GameConfig.stageHeigth - this._downHero.height * this._downHero.scaleY - 100;//- this.getTitleButtomY();
		if (this._isAttackWin) {
			let index = null;
			if(this._eliteidx == null)
			{
				index = this._idx;
			}
			else
			{
				index = this._eliteidx;
			}

			ViewController.getInstance().openView(ViewConst.POPUP.ACWIPEBOSSATTACKEDPOPUPVIEW,{type:1, index:index, damage:this._dps ,exp:this._exp , rewards:this._rewards , f:this.hide, o:this, aid : this.param.data.aid, code : this.param.data.code});
		}
		else {
			let index = null;
			if(this._eliteidx == null)
			{
				index = this._idx;
			}
			else
			{
				index = this._eliteidx;
			}
			ViewController.getInstance().openView(ViewConst.POPUP.ACWIPEBOSSATTACKEDPOPUPVIEW,{type:2, index:index, damage:this._dps ,exp:this._exp, aid : this.param.data.aid, code : this.param.data.code});
			this._isBattling = false;
			this.closeBtn.setEnable(true);
			this.resetTopKey();
			if (this._curKey) {
				
				let servant:ServantInfoVo = Api.servantVoApi.getServantObj(this._curKey);
				let showeff1 = false;
				if (servant && servant.equip && servant.equip != ""){
					showeff1 = true;
				}
				this._downHero.resetHero(servant.fullImgPath,this._allServantInfo[this._curKey],showeff1);

				TimerManager.doTimer(100,1,this.showGameBtn,this);
			}
			else {
				this._downHero.resetHero();
			}
		}
		//刷新boss攻打纪录
		if(this._isRefresh)
		{
			this.refreshText();
		}

	}

	private showGameBtn():void
	{
		if (this._gameBtn) {
			this._gameBtn.visible = (this._curKey != null);
		}
	}

	public hide():void
	{
		if (Api.playerVoApi.getPlayerAllianceId()>0 && this._obj && this._callbackF) {
			this._callbackF.apply(this._obj);
		}
		if(this.atk){
			NetManager.request(NetRequestConst.REQUEST_ACTIVITY_WIPEBOSSGETBOSSNUM, {
				activeId : this.vo.aidAndCode,
			});	
			NetManager.request(NetRequestConst.REQUEST_ACTIVITY_WIPEBOSSGETRANK, {
				activeId : this.vo.aidAndCode,
			});	
			this.atk = false;
		}
		
		super.hide();
	}

	private showList():void
	{
	
			this.moveContainer= new BaseDisplayObjectContainer();
			this.addChild(this.moveContainer);

			this.moreBg = BaseBitmap.create("arena_bottom_bg");
			this.moreBg.width = 640;
			this.moreBg.height =GameConfig.stageHeigth - 330;
			this.moveContainer.addChild(this.moreBg);

			this._currMaskBmp = BaseBitmap.create("public_9_viewmask");
			this._currMaskBmp.width=GameConfig.stageWidth;
			this._currMaskBmp.height=GameConfig.stageHeigth;
			this._currMaskBmp.touchEnabled = true;
			this.addChild(this._currMaskBmp);
			this.setChildIndex(this._currMaskBmp,this.getChildIndex(this._gameBtn));
			
			// 增加 点击区域
			this._touchBg = BaseBitmap.create("public_9_bg25");  
			this._touchBg.width = 640;
			this._touchBg.height =260;
			this._touchBg.x=0;
			this._touchBg.y=-240;
			this._touchBg.alpha =0;
			this._touchBg.addTouchTap(this.showMoreHandle,this);
			this.moveContainer.addChild(this._touchBg);

		
			if(this._bossInfoVoList&&this._bossInfoVoList.length>0)
			{
				let rect = egret.Rectangle.create();
				rect.setTo(0, 10, 640, GameConfig.stageHeigth - 340);
				this._scrollList = ComponentManager.getScrollList(AllianceBossMoreItem, this._bossInfoVoList, rect);
				this.moveContainer.addChild(this._scrollList);
				this._scrollList.y=5;
			}
			else
			{
				let atkracedes3 = ComponentManager.getTextField(LanguageManager.getlocal("atkracedes3"), 20);
				atkracedes3.x =250;
				atkracedes3.y =300;
				this.moveContainer.addChild(atkracedes3);
			}	

			this.moveContainer.y =1150;
			this.touchBoo=false;
			egret.Tween.get(this.moveContainer).to({y:260},500).call(function()
			{
				egret.Tween.removeTweens(this.moveContainer);
				this.touchBoo =true;
			},this);
	}
	private showText():void
	{
		if(this._bossInfoVoList&&this._bossInfoVoList.length>=1)
		{
			//名称  
			let nameTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_QUALITY_ORANGE);
			nameTxt.text = this._bossInfoVoList[0].name;
			nameTxt.x = 20;
			nameTxt.y =GameConfig.stageHeigth-67;
			this.addChild(nameTxt);
			this._nameTxt =nameTxt;
			
			let describeTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL);
			var _name =Config.ServantCfg.getServantItemById(this._bossInfoVoList[0].servantId).name;
			let str = LanguageManager.getlocal("alliancelogdes13",[_name,this._bossInfoVoList[0].dps]);	 
			describeTxt.x = 20;
			describeTxt.y = GameConfig.stageHeigth-40;
			describeTxt.height=16;
			describeTxt.text =str;
			this._describeTxt = describeTxt;
			this.addChild(describeTxt);
		}
		
	}
	private refreshText():void
	{	
		
		if(this._nameTxt&&this._bossInfoVoList.length>1&&this._describeTxt)
		{
			this._nameTxt.text = this._bossInfoVoList[0].name;
			var _name =Config.ServantCfg.getServantItemById(this._bossInfoVoList[0].servantId).name;
			 
			this._describeTxt.text =LanguageManager.getlocal("alliancelogdes13",[_name,this._bossInfoVoList[0].dps]);	 
		}
		else
		{
			this.showText();
		}
		
	}

	private update():void{
		let view = this;
		if(view.api.getClickType() == 'b'){
            return;
		}
		if(view.api.getClickIdx() == 0){
			let addV = view.vo.getMyAdd();
			let addvStr = addV.toFixed(0) + "%";
			view._upBf.text = addvStr;
			view._upBf.x = view.studyatk_uparrow.x - view._upBf.width - 5;
			view._upBf.y = view.studyatk_upbg.y + view.studyatk_upbg.height/2 - view._upBf.height/2 ;
			// view.resetTopKey();
			// if (this._curKey) {
			// 	let servant:ServantInfoVo = Api.servantVoApi.getServantObj(this._curKey);
			// 	this._downHero.resetHero(servant.fullImgPath,this._allServantInfo[this._curKey]);
			// }
			// else {
			// 	this._downHero.resetHero();
			// }
		}
	}

	public dispose():void
	{
		let view = this;
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_WIPEBOSS_REFRESH,view.update,view);
		// App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ALLIANCE_ATTACK),this.intoBossBattle,this);
		// App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ALLIANCE_GETBOSSLOG),this.showBossLog,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_WIPEBOSSATTACK),view.intoBossBattle,view);
		this._bossConfig = null;
		this._callbackF = null;
		this._obj = null;
		this._rewards =null;
		this._curKey = null;
		this._isBattling = false;
		this._gameBtn = null;
		this._isAttackWin = null;
		this._allServantInfo = null;
		this._dps = 0;
		this._idx = null;
		this._exp = 0;
		this._hasKill = 0;
		this._isRefresh =false;
		this._bossInfoVoList =null;
		this.bottomBg =null;
		this._moreArrow =null;
		this._isShowMore =false;
		this.touchBoo=true;
		this._nameTxt =null;
		this._describeTxt =null;
		this.moveContainer =null;
		this._currMaskBmp =null;
		this._scrollList= null;
		this.moreBg =null;

		this._eliteidx = null;
		this._eliteBossCfg = null;
		super.dispose();
	}
}