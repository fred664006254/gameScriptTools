
/**
 * 擂台 缉捕
 * author shaoliang
 * date 2017/11/26
 * @class AtkraceArrestView
 */

class AtkraceArrestView extends CommonView
{	

	private _infoText1:BaseTextField;
	private _infoText2:BaseTextField;
	private _infoText3:BaseTextField;
	private _servantCount:BaseTextField;
	private _scoreText:BaseTextField;
	private _servantInfoArray:BaseDisplayObjectContainer[] = [];
	private _progressBar:ProgressBar;
	private _isShowBuy:boolean = false;
	private _key:string;
	private _playerScore:BaseTextField;

	public constructor() {
		super();
	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"atkrace_arrest_bg","atkrace_enemy_bg","atkrace_my_bg","atkrace_name_bg",
			"atkrace_one_key","atkrace_temp_property","atkrace_text_bg",
			// "progress_type1_bg2",
			// "progress_type1_red",

			"progress_type3_bg",
			"progress_type3_red",
			"arena_detailbg",
			"atkrace_namebg",
			"atkrace_redtopbg",
			"popupview_bg5",
			"arena_battlebg",
			"battle_skinnamebg"

		]);
	}
	protected getBgName():string
	{
		return "arena_battlebg";
	}
	public initView():void
	{	
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_ATKRACE_BATCH_FIGHT_RET_REFRESH,this.resetServantInfo,this);

		this.container.y = this.getTitleButtomY();
		let containerHeight:number = GameConfig.stageHeigth - this.container.y;
		//中间的对战
		// let middleBg:BaseBitmap = BaseBitmap.create("atkrace_arrest_bg");
		// middleBg.y = containerHeight/2 - middleBg.height/2;
		// this.addChildToContainer(middleBg);
		// let bg = BaseLoadBitmap.create("arena_battlebg");
		

		//顶部敌人信息
		let topBg = BaseBitmap.create("atkrace_redtopbg");
		this.addChildToContainer(topBg);
 
		//点击头像进入战斗
		let atkraceArredesText = ComponentManager.getTextField(LanguageManager.getlocal("atkraceArredes"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WHITE);
		atkraceArredesText.x = GameConfig.stageWidth/ 2 - atkraceArredesText.width/2;
		atkraceArredesText.y = topBg.y + topBg.height + 10;
		this.addChildToContainer(atkraceArredesText);
		let myAtkInfo:AtkraceAtkInfoVo = Api.atkraceVoApi.getMyFightInfo();


		


		this._scoreText = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WARN_YELLOW_NEW);
		this._scoreText.setPosition(22, 22);
		this.addChildToContainer(this._scoreText);

		let curcount:number = Object.keys(myAtkInfo.sids).length;
		let total:number = myAtkInfo.total;
		this._servantCount = ComponentManager.getTextField(LanguageManager.getlocal("servant_count")+"("+curcount+"/"+total+")",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WARN_YELLOW_NEW);
		this._servantCount.setPosition(GameConfig.stageWidth - this._servantCount.width - 22 , this._scoreText.y);
		this.addChildToContainer(this._servantCount);

			//门客形象
		this.resetServantInfo();


	


		// let tempPropertyText = BaseBitmap.create("atkrace_temp_property");
		// tempPropertyText.setPosition(tempProperty.width/2 - tempPropertyText.width/2, tempProperty.height/2 - tempPropertyText.height/2)
		// tempProperty.addChild(tempPropertyText);

		// let oneKey:BaseButton = ComponentManager.getButton("atkrace_text_bg",null,this.oneKeyClick,this);
		// oneKey.setPosition(GameConfig.stageWidth - tempProperty.x - oneKey.width,tempProperty.y);
		// this.addChildToContainer(oneKey);

		// let oneKeyText = BaseBitmap.create("atkrace_one_key");
		// oneKeyText.setPosition(oneKey.width/2 - oneKeyText.width/2, oneKey.height/2 - oneKeyText.height/2)
		// oneKey.addChild(oneKeyText);

		
		//底部我方信息
		let bottomBg = BaseBitmap.create("arena_detailbg");
		bottomBg.y = containerHeight - bottomBg.height;
		this.addChildToContainer(bottomBg);

		let line = BaseBitmap.create("popupview_bg5");
		line.width = GameConfig.stageWidth;
		line.y = bottomBg.y - line.height +8;
		this.addChildToContainer(line);

		let tempProperty:BaseButton = ComponentManager.getButton(ButtonConst.BTN_SMALL_ORANGE,"atkraceTempProperty",this.tempPropertyClick,this);
		tempProperty.setPosition(bottomBg.x + 540 - tempProperty.width/2,bottomBg.y + 82 - tempProperty.height/2);
		this.addChildToContainer(tempProperty);

		// let nameBg = BaseBitmap.create("atkrace_1_newui");
		// nameBg.width = 330;
		// nameBg.height = 35;
		// nameBg.setPosition(310, bottomBg.y + 23);
		// this.addChildToContainer(nameBg);
		
		let myInfo:AtkraceServantVo = myAtkInfo.mesid;
		
		this._playerScore = ComponentManager.getTextField(LanguageManager.getlocal("atkrace_score",[Api.playerVoApi.getPlayerName(),Api.atkraceVoApi.getPoint().toString()]),TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_WARN_YELLOW_NEW);
		this._playerScore.setPosition(GameConfig.stageWidth/2 - this._playerScore.width/2, bottomBg.y+ 26 - this._playerScore.height/2);
		this.addChildToContainer(this._playerScore);

		let servantName:string = LanguageManager.getlocal("servant_name"+myInfo.sid);
		let servantLv:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("atkrace_level",[servantName,myInfo.lv.toString()]),22,TextFieldConst.COLOR_WARN_YELLOW_NEW);
		servantLv.setPosition(bottomBg.x + 160, bottomBg.y + 65);
		this.addChildToContainer(servantLv);

		let infoDesc1:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("atkrace_info_1"),20);
		infoDesc1.setPosition(servantLv.x, servantLv.y+ 33);
		this.addChildToContainer(infoDesc1);

		let infoDesc2:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("atkrace_info_2"),20);
		infoDesc2.setPosition(servantLv.x, infoDesc1.y+ 23);
		this.addChildToContainer(infoDesc2);

		let infoDesc3:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("atkrace_info_3"),20);
		infoDesc3.setPosition(servantLv.x, infoDesc2.y+ 23);
		this.addChildToContainer(infoDesc3);

		this._infoText1 = ComponentManager.getTextField("",20,TextFieldConst.COLOR_WARN_GREEN2);
		this._infoText1.setPosition(infoDesc1.x + infoDesc1.width , infoDesc1.y);
		this.addChildToContainer(this._infoText1);

		this._infoText2 = ComponentManager.getTextField("",20,this._infoText1.textColor);
		this._infoText2.setPosition(infoDesc2.x + infoDesc2.width , infoDesc2.y);
		this.addChildToContainer(this._infoText2);

		this._infoText3 = ComponentManager.getTextField("",20,this._infoText1.textColor);
		this._infoText3.setPosition(infoDesc3.x + infoDesc3.width, infoDesc3.y);
		this.addChildToContainer(this._infoText3);

		let servantInfoObj:ServantInfoVo = Api.servantVoApi.getServantObj(myInfo.sid);
		// let servantFullImg = BaseLoadBitmap.create(Api.servantVoApi.getFullImgPathWithId(myInfo.sid));
		// servantFullImg.width = 640*0.8;
		// servantFullImg.height = 482*0.8;
		// servantFullImg.y = containerHeight - servantFullImg.height - 25;
		// servantFullImg.x = -94;
		// this.addChildToContainer(servantFullImg);

        let deltaScale = 0.55;
        let cardbg = BaseLoadBitmap.create( servantInfoObj.qualityBoxImgPath );
        cardbg.width = 194; 
        cardbg.height = 192; 
        cardbg.setScale(deltaScale);
        cardbg.x = bottomBg.x + 25;
        cardbg.y = bottomBg.y + 58;
        this.addChildToContainer(cardbg);

        let servantImg = BaseLoadBitmap.create(servantInfoObj.halfImgPath );
        servantImg.width = 180;
        servantImg.height = 177;
		servantImg.setScale(deltaScale);
        servantImg.x = cardbg.x + cardbg.width * cardbg.scaleX/2-servantImg.width * servantImg.scaleX/2;
        servantImg.y = cardbg.y+ cardbg.height * cardbg.scaleY/2-servantImg.height * servantImg.scaleY/2;
       
        this.addChildToContainer(servantImg);




		this._progressBar=ComponentManager.getProgressBar("progress_type3_red","progress_type3_bg",570);
		this._progressBar.x = GameConfig.stageWidth/2 - this._progressBar.width/2;
		this._progressBar.y = containerHeight - this._progressBar.height - 14;
		this.addChildToContainer(this._progressBar);

		
		if (Api.switchVoApi.checkAutoAtkrace()) 
		{
			let needVip = Api.vipVoApi.getNeedVip("autoAtkraceLock");
			if (
				Api.playerVoApi.getPlayerVipLevel() >= needVip 
				|| 
				((PlatformManager.checkIsWxCfg()) && (Api.shopVoApi.ifBuyMonthCard()|| Api.shopVoApi.ifBuyYearCard()))
				)
			// if ((PlatformManager.checkIsWxSp() && (Api.playerVoApi.getPlayerVipLevel() >= 13 || Api.shopVoApi.ifBuyMonthCard()|| Api.shopVoApi.ifBuyYearCard())) ||( !PlatformManager.checkIsWxSp() && Api.playerVoApi.getPlayerVipLevel() >= 6 )) 
			{

				let autoFight:BaseButton = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"atkraceOneKey",this.oneKeyClick,this);
				autoFight.setPosition(bottomBg.x + 540 - autoFight.width/2,bottomBg.y + 142 - autoFight.height/2);
				this.addChildToContainer(autoFight);

				// let oneKeyText = BaseBitmap.create("atkrace_one_key");
				// oneKeyText.setPosition(autoFight.width/2 - oneKeyText.width/2, autoFight.height/2 - oneKeyText.height/2)
				// autoFight.addChild(oneKeyText);



			}else{
				let strKey = "autoAtkraceLock";
				let reachText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal(strKey), 18,TextFieldConst.COLOR_WARN_YELLOW_NEW);
				reachText.textAlign = egret.HorizontalAlign.CENTER;
				reachText.lineSpacing = 3;
				reachText.setPosition(bottomBg.x + 540 - reachText.width/2,bottomBg.y + 145 - reachText.height/2);
				this.addChildToContainer(reachText);
			}
		}

		this.resetInfoText();
	}

	private resetServantInfo():void
	{




		if (this._servantInfoArray.length>0) {
			for (let k in this._servantInfoArray)
			{
				this._servantInfoArray[k].dispose();
			}
			this._servantInfoArray.length = 0;
		}

		// 640 530
		let posList = [{x:160, y:170}, {x:320, y:450}, {x: 480, y:170}];
		//170 390 170
		let startY = 60 +(GameConfig.stageHeigth - 960) / (1136 - 960) * 100 ;//GameConfig.stageHeigth /2 - 580/2 + (GameConfig.stageHeigth - 960)
		let index:number = 0;
		let myAtkInfo:AtkraceAtkInfoVo = Api.atkraceVoApi.getMyFightInfo();
		for (let key in myAtkInfo.fids)
		{
			

			let container:BaseDisplayObjectContainer = new BaseDisplayObjectContainer();
			container.width = 320;
			container.height = 241 + 44;
			container.x = posList[index].x - container.width/2;
			container.y = startY + posList[index].y - container.height/2; 
			this.addChildToContainer(container);
			this._servantInfoArray.push(container);


			let sinfo:AtkraceServantVo = myAtkInfo.fids[key];
			// let servantCfg = Config.ServantCfg.getServantItemById
		




			let tmpCfg = Config.ServantCfg.getServantItemById(key);

			let imgStr:string = tmpCfg.body;


			// let cardbg = BaseLoadBitmap.create( "servant_cardbg_" + sinfo.clv );
			// cardbg.width = 194; 
			// cardbg.height = 192; 
			// cardbg.setPosition(15 + (cardbg.width+14)*index,62);
			// container.addChild(cardbg);
			index++;
			container.addTouchTap(this.vsClick,this,[key]);
			if(sinfo.skin && sinfo.skin != ""){
				imgStr = Config.ServantskinCfg.getServantSkinItemById(sinfo.skin).body;
			}
			// sinfo.skin = "10011"
			// let serimg = tmpCfg.halfIcon;
			let servantImg = BaseLoadBitmap.create(imgStr);
			servantImg.width = 640;
			servantImg.height = 482;
			servantImg.setScale(0.5);
			container.addChild(servantImg);




			
			let sernamebg =  BaseBitmap.create("atkrace_namebg");
			sernamebg.x = container.width/2 - sernamebg.width/2;
			sernamebg.y = container.height - sernamebg.height;
			container.addChild(sernamebg);
			
			let sernametxt = ComponentManager.getTextField( tmpCfg.name, 22,this.getNameQualityColor(sinfo.clv));
			sernametxt.x = sernamebg.x + sernamebg.width/2 - sernametxt.width/2
			sernametxt.y = sernamebg.y + sernamebg.height/2 - sernametxt.height/2 ;
			container.addChild(sernametxt);

			if(sinfo.skin && sinfo.skin != ""){
				
				let snamebg =  BaseBitmap.create("battle_skinnamebg");
				snamebg.x = container.width/2 - snamebg.width/2;
				snamebg.y = container.height - 44 - snamebg.height + 11;
				container.addChild(snamebg);
				
				let snametxt = ComponentManager.getTextField(LanguageManager.getlocal("servantSkinName"+sinfo.skin), 18,TextFieldConst.COLOR_WARN_YELLOW_NEW);
				snametxt.x = snamebg.x + snamebg.width/2 - snametxt.width/2;
				snametxt.y = snamebg.y + snamebg.height/2 - snametxt.height/2 - 5;
				container.addChild(snametxt);
			}

		}
	}
	public getNameQualityColor(clv:number)
	{	
		let tarColor =TextFieldConst.COLOR_QUALITY_WHITE_SERVANT;//TextFieldConst.COLOR_QUALITY_WHITE;
		switch(clv)
		{

			case 0:
				tarColor = TextFieldConst.COLOR_QUALITY_WHITE_SERVANT;
				break
			case 1:
				tarColor = TextFieldConst.COLOR_QUALITY_GREEN_NEW;
				break
			case 2:
				tarColor = TextFieldConst.COLOR_QUALITY_BLUE_NEW;
				break
			case 3:
				tarColor = TextFieldConst.COLOR_QUALITY_PURPLE_NEW;
				break
			case 4:
				tarColor = TextFieldConst.COLOR_QUALITY_ORANGE_NEW;
				break
			case 5: 
				tarColor = TextFieldConst.COLOR_QUALITY_RED_NEW;
				break
			case 6: 
				tarColor = TextFieldConst.COLOR_QUALITY_YELLOW_NEW;
				break
			case 7: 
				tarColor = TextFieldConst.COLOR_QUALITY_GOLD_NEW;
				break

			default:
				tarColor = TextFieldConst.COLOR_QUALITY_WHITE_SERVANT;
				break

		}
		return tarColor;
	}
	private resetInfoText():void
	{	
		let myAtkInfo:AtkraceAtkInfoVo = Api.atkraceVoApi.getMyFightInfo();
		let myInfo:AtkraceServantVo = myAtkInfo.mesid;
		this._infoText1.text = myInfo.ability.toString();


		let tmpatt:any = myAtkInfo.tmpattr;
		let atkAdd:number =  0;
		let skillAdd:number = 0;
		if (tmpatt) {
			if (tmpatt.atk) {
				atkAdd=Math.floor(tmpatt.atk*100);
			}
			if (tmpatt.skill) {
				skillAdd=Math.floor(tmpatt.skill*100);
			}
		}
	
		this._infoText2.text = atkAdd.toString() + "%";
		this._infoText3.text = skillAdd.toString() + "%";
		
		
		let total:number = myAtkInfo.total;
		let curcount:number = total - myAtkInfo.fightnum;
		this._servantCount.text = LanguageManager.getlocal("servant_count")+"("+curcount+"/"+total+")";
		let nameStr:string = myAtkInfo.fname;
		if (myAtkInfo.uid == "robot") {
			nameStr =  LanguageManager.getlocal("atkRaceRobotName"+myAtkInfo.fname);
		}
		this._scoreText.text =LanguageManager.getlocal("atkrace_score",[nameStr,myAtkInfo.fpoint.toString()]);

		this._progressBar.setText( myInfo.attr + "/"+ myInfo.fullattr);
		this._progressBar.setPercentage(myInfo.attr / myInfo.fullattr);
		this._playerScore.text = LanguageManager.getlocal("atkrace_score",[Api.playerVoApi.getPlayerName(),Api.atkraceVoApi.getPoint().toString()]);
	}



	//临时属性
	private tempPropertyClick():void
	{
		ViewController.getInstance().openView(ViewConst.POPUP.ATKRACEBUYPOPUPVIEW,{f:this.resetInfoText,o:this});
	}

	//开始对战
	private vsClick(event:egret.Event,key:string):void
	{	
		let myAtkInfo:AtkraceAtkInfoVo = Api.atkraceVoApi.getMyFightInfo();
		this._key = key;
		if (myAtkInfo.fightnum == 0 && this._isShowBuy==false && (myAtkInfo.tmpattr == null || (myAtkInfo.tmpattr.atk ==0 && myAtkInfo.tmpattr.blood ==0))) {
			this._isShowBuy=true;
			let itemId:string = Config.AtkraceCfg.getFightAdd();

			ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
			title:"itemUseConstPopupViewTitle",
			msg:LanguageManager.getlocal("atkrace_no_property"),
			callback:this.realFight,
			handler:this,
			needCancel:true
			});
		}
		else {
			this.realFight()
		}

		
	}

	private realFight():void
	{
		ViewController.getInstance().openView(ViewConst.BATTLE.ATKRACEBATTLEVIEW,{f:this.resetBattleInfo,o:this,servantid: this._key ,f2:this.battleEnd});
	}


	// 规则说明内容
	protected getRuleInfo():string
	{
		if (Api.switchVoApi.checkOpenRevengeList())
		{
			return "atkraceInfo2";
		}
		else
		{
			return "atkraceInfo";
		}
	}
	//战斗胜利回调 刷新 打开购买属性
	private resetBattleInfo():void
	{
		
		this.resetInfoText();
		this.resetServantInfo();

		this.tempPropertyClick();
	}
	//战斗结束回掉 关掉板子
	private battleEnd():void
	{
		this.hide();
	}

	//请求回调
	protected receiveData(data: { ret: boolean, data: any }): void 
	{

	}
	//一键缉捕
	private oneKeyClick():void
	{

		/**(PlatformManager.checkIsWxSp() && (Api.playerVoApi.getPlayerVipLevel() >= 13 || Api.shopVoApi.ifBuyMonthCard()|| Api.shopVoApi.ifBuyYearCard())) ||( !PlatformManager.checkIsWxSp() && Api.playerVoApi.getPlayerVipLevel() >= 6 )  */
		
		// if(PlatformManager.checkIsWxSp() && (Api.playerVoApi.getPlayerVipLevel() >= 13 || Api.shopVoApi.ifBuyMonthCard()|| Api.shopVoApi.ifBuyYearCard())){

		// } else {
		// 	App.CommonUtil.showTip(LanguageManager.getlocal("autoAtkraceLock_wxType"));
		// 	return;
		// }

		// if (!PlatformManager.checkIsWxSp() && Api.playerVoApi.getPlayerVipLevel() >= 6) 
		// {

		// } else {
		// 	App.CommonUtil.showTip(LanguageManager.getlocal("autoAtkraceLock"));
		// 	return;
		// }
		let needVip = Api.vipVoApi.getNeedVip("autoAtkraceLock");
		if (!(
			Api.playerVoApi.getPlayerVipLevel() >= needVip 
			|| 
			((PlatformManager.checkIsWxCfg()) && (Api.shopVoApi.ifBuyMonthCard()|| Api.shopVoApi.ifBuyYearCard()))
			))
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("autoAtkraceLock"));
			return;
		}
		// if(PlatformManager.checkIsWxSp() && Api.playerVoApi.getPlayerVipLevel() < 13 && !Api.shopVoApi.ifBuyMonthCard() && !Api.shopVoApi.ifBuyYearCard()){
		// 	App.CommonUtil.showTip(LanguageManager.getlocal("autoAtkraceLock_wxType"));
		// 	return;
		// }
		// if (!PlatformManager.checkIsWxSp() && Api.playerVoApi.getPlayerVipLevel() < 6 ) 
		// {
		// 	App.CommonUtil.showTip(LanguageManager.getlocal("autoAtkraceLock"));
		// 	return;
		// }

		let myAtkInfo:AtkraceAtkInfoVo = Api.atkraceVoApi.getMyFightInfo();
		if (myAtkInfo.fightnum == 0 && this._isShowBuy==false && (myAtkInfo.tmpattr == null || (myAtkInfo.tmpattr.atk ==0 && myAtkInfo.tmpattr.blood ==0))) {
			this._isShowBuy=true;
			let itemId:string = Config.AtkraceCfg.getFightAdd();

			ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
			title:"itemUseConstPopupViewTitle",
			msg:LanguageManager.getlocal("atkrace_no_property"),
			callback:this.realOneKey,
			handler:this,
			needCancel:true
			});
		}
		else {
			this.realOneKey()
		}
	}
	private realOneKey():void
	{
		ViewController.getInstance().openView(ViewConst.POPUP.ATKRACEAUTOFIGHTPOPUPVIEW,{f:this.hide,o:this});
	}

	public dispose():void
	{	
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ATKRACE_BATCH_FIGHT_RET_REFRESH,this.resetServantInfo,this);

		this._infoText1 = null;
		this._infoText2 = null;
		this._infoText3 = null;
		this._servantCount = null;
		this._servantInfoArray.length = 0;
		this._scoreText =null;
		this._progressBar =null;
		this._isShowBuy = false;
		this._key = null;
		this._playerScore = null;

		super.dispose();
	}
}

