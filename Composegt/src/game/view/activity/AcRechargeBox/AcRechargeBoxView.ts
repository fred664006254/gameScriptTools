/**
  * 百服活动-储值宝箱
  * author jiangliuyang
  * date 2018/9/26
  * @class AcRechargeBoxView
  */
class AcRechargeBoxView extends AcCommonView {
	private _topbg:BaseLoadBitmap = null;
	private boxInfoList: { "boxBg":BaseBitmap;"needGem": string;"lightBM": BaseBitmap;"boxBM": BaseLoadBitmap;"rechargeTF": BaseTextField;"rechargebg":BaseBitmap;} []= null;
	private _suffix:string = "";
	public initView()
	{
		App.MessageHelper.addNetMessage(NetPushConst.PUSH_PAY,this.refreshView,this);
		App.MessageHelper.addNetMessage(NetRequestConst.REQUST_ACTIVITY_GETRECHARGEBOXREWARD,this.refreshView,this);

		let vo = <AcRechargeBoxVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
		let cfg =  <Config.AcCfg.RechargeBoxCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);


		this._suffix = "";
		if( this.code == "3"){
			this._suffix = "_" + this.code;
		} 
		
		
		
		if (ResourceManager.hasRes("acrechargeboxview_bg"+"_"+this.code))
		{
			this._topbg = BaseLoadBitmap.create("acrechargeboxview_bg"+"_"+this.code);
		} else {
			this._topbg = BaseLoadBitmap.create("acrechargeboxview_bg");
		}


		
        this._topbg.width = 626;
		this._topbg.height = 296;

		this._topbg.x = GameConfig.stageWidth/2 - this._topbg.width/2;
		this._topbg.y = 69;
		this.addChild(this._topbg);

		let shadow = BaseBitmap.create("commonview_titlebgshadow");
		shadow.width = GameConfig.stageWidth;
		shadow.height = 8;
		this.addChild(shadow);

		// public_9v_bg03

		let border = BaseBitmap.create("public_9v_bg03");
		border.width = GameConfig.stageWidth;
		border.height = GameConfig.stageHeigth;
		// border.y = -15;
		this.addChild(border);

		let innerBg = BaseLoadBitmap.create("acrechargeboxview_border");
		

		let bottomBg = BaseLoadBitmap.create("acrechargeboxview_buttombg" + this._suffix);
		if( this.code == "3"){
			bottomBg.width = 628;
		}else{
			bottomBg.width = 620;
		}
		
        // bottomBg.width = 640;
        bottomBg.height =  GameConfig.stageHeigth - this._topbg.height - 69 - 16 - 3;
		bottomBg.x = GameConfig.stageWidth / 2 - bottomBg.width / 2; 
        bottomBg.y = this._topbg.y + this._topbg.height + 3; //GameConfig.stageHeigth - this._topbg.height - bottomBg.height - 69;
		
		innerBg.width = 608;
		innerBg.height = bottomBg.height - 50;
		innerBg.x = bottomBg.x + bottomBg.width/2 - innerBg.width/2;
		innerBg.y = bottomBg.y + 5;
		
		this.addChild(bottomBg);
		this.addChild(innerBg);
		innerBg.visible = this._suffix == "";

		let actimeTF = ComponentManager.getTextField(LanguageManager.getlocal("acRechargeBoxTime",[vo.acTimeAndHour]),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
		actimeTF.width = 580;
		actimeTF.lineSpacing = 5;
		actimeTF.setPosition(this._topbg.x + 30,this._topbg.y + 210);
		this.addChild(actimeTF);
		let acDesc = null;
		if(LanguageManager.checkHasKey("acRechargeBoxDesc"+"_"+this.code)){
			acDesc = ComponentManager.getTextField(LanguageManager.getlocal("acRechargeBoxDesc"+"_"+this.code),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);

		} else {
			acDesc = ComponentManager.getTextField(LanguageManager.getlocal("acRechargeBoxDesc"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);

		}

		acDesc.setPosition(actimeTF.x,actimeTF.y + actimeTF.height + 5);
		acDesc.width = 580;
		acDesc.lineSpacing = 5;
		this.addChild(acDesc);

		// if(this.code != "1")
		// {
		// 	let bottomBg2  = BaseBitmap.create("public_9_bg51")
		// 	bottomBg2.width = 630;
		// 	bottomBg2.height = bottomBg.y + bottomBg.height - this._topbg.y - this._topbg.height - 55;
		// 	bottomBg2.setPosition(bottomBg.x + bottomBg.width / 2 - bottomBg2.width / 2,this._topbg.y  + this._topbg.height + 5);
		// 	this.addChild(bottomBg2);
		// }
		


		let boxList = cfg.getBoxListData();
		this.boxInfoList = [];
		for(let i = 0;i < boxList.length;i++)
		{
			let boxCfg = boxList[i];
			let rechargecfg =  Config.RechargeCfg.getRechargeItemCfgByKey(boxCfg.needGem);
			if(i%3 == 0)
			{

				let bg1 = null;
				if(ResourceManager.hasRes("acrechargeboxview_firstbg" + "_"+this.code)){
					bg1 = BaseLoadBitmap.create("acrechargeboxview_firstbg" + "_"+this.code);
				} else {
					bg1 = BaseLoadBitmap.create("acrechargeboxview_firstbg" );
				}
				
				bg1.width = 576;
				bg1.height = 243;
				bg1.setPosition(innerBg.x + innerBg.width / 2 - bg1.width / 2,innerBg.y + 15 + Math.floor(i/3) * 253);
				if( this.code == "3"){
					bg1.width = 617;
					bg1.height = 117;	
					bg1.setPosition(innerBg.x + innerBg.width / 2 - bg1.width / 2,innerBg.y + 130 + Math.floor(i/3) * 253);
				}
				//  else if(this.code =="4"){
				// 	bg1.width = 576;
				// 	bg1.height = 283;	
				// 	bg1.setPosition(innerBg.x + innerBg.width / 2 - bg1.width / 2,innerBg.y + 60 + Math.floor(i/3) * 300);

				// }
				
				
				this.addChild(bg1);
		
			
			}
			
			let boxBgStr =null;
			if(ResourceManager.hasRes("acrechargeboxview_whitebg"+"_"+this.code)){
				boxBgStr= "acrechargeboxview_whitebg"+"_"+this.code;
			} else {
				boxBgStr= "acrechargeboxview_whitebg";
			}
			

			
			let boxBg = BaseBitmap.create(boxBgStr);
			boxBg.x = bottomBg.x + 40 + (605 - boxBg.width * 3) / 4 +((boxBg.width) * (i%3));
			boxBg.y = innerBg.y + 37 + Math.floor(i/3) * 253;
			this.addChild(boxBg);
			if( this.code == "3"){
				boxBg.x = bottomBg.x  + (700 - boxBg.width * 3) / 4 +((boxBg.width+20) * (i%3));
			} 
			// else if(this.code == "4"){
			// 	boxBg.y = innerBg.y + 82 + Math.floor(i/3) * 300;
			// }
			let box = null;

			if(ResourceManager.hasRes("acrechargeboxview_box1"+"_"+this.code)){
				boxBgStr= "acrechargeboxview_box1"+"_"+this.code;
			} else {
				boxBgStr= "acrechargeboxview_box1";
			}
			box = BaseLoadBitmap.create("acrechargeboxview_box1");
			box.width = 122;
			box.height = 124;
			box.anchorOffsetX = box.width / 2;
			box.anchorOffsetY = box.height / 2;
			box.setPosition(boxBg.x + boxBg.width / 2,boxBg.y + box.height / 2 + 17);
			
			

			//tailor_get_light
			let light = BaseBitmap.create("tailor_get_light");
			light.anchorOffsetX = light.width / 2;
			light.anchorOffsetY = light.height / 2;
			light.setPosition(box.x,box.y);
			light.setScale(0.75);
			this.addChild(light);
			light.setVisible(false);
			this.addChild(box);
			box.addTouchTap(this.boxClick,this,[boxCfg.needGem]);

			
			let gemBM =  BaseLoadBitmap.create("itemicon1");
			gemBM.width = 40;
			gemBM.height = 40;

			gemBM.setPosition(boxBg.x + 20,boxBg.y  + boxBg.height - gemBM.height - 5);
			
			if(this.code == "3"){
				let gembg = BaseLoadBitmap.create("ac_rechargebox_gembg_3");
				gembg.width = 191;
				gembg.height = 51;
				gembg.setPosition(boxBg.x - 20,boxBg.y  + boxBg.height - gembg.height-15);
				this.addChild(gembg);
				gemBM.setPosition(boxBg.x + 25,boxBg.y  + boxBg.height - gemBM.height - 25);
			}
			this.addChild(gemBM);

			let gemNum =  ComponentManager.getTextField(String(rechargecfg.gemCost),TextFieldConst.FONTSIZE_BUTTON_COMMON,TextFieldConst.COLOR_WARN_YELLOW);

			gemNum.setColor(TextFieldConst.COLOR_QUALITY_WHITE);
			gemNum.setPosition(gemBM.x + gemBM.width + 5,gemBM.y + gemBM.height / 2  - gemNum.height / 2);
			this.addChild(gemNum);

			let rechargeNum = vo.getBoxReChargeNum(boxCfg.needGem);
			let receiveNum = ComponentManager.getTextField(LanguageManager.getlocal("acRechargeBoxReceiveNum",[String(rechargeNum),String(boxCfg.limit)]),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_QUALITY_WHITE);
			
			let rechargebgStr = "acrechargeboxview_textbg";
			let rechargebg = BaseBitmap.create(rechargebgStr);
			rechargebg.setPosition(boxBg.x + boxBg.width / 2 - rechargebg.width / 2 - 10,boxBg.y + boxBg.height - rechargebg.height / 2  + 20);
			receiveNum.setPosition(rechargebg.x + rechargebg.width / 2,rechargebg.y + rechargebg.height/2 - receiveNum.height/2 );
			receiveNum.anchorOffsetX =  receiveNum.width / 2;
			if( this.code == "3"){
				boxBg.visible = false;
				rechargebg.visible = false;
				receiveNum.setPosition(boxBg.x + boxBg.width / 2 -10 ,gemNum.y + 40);
				//  - receiveNum.width / 2
			} 
			// else if(this.code == "4"){
			// 	rechargebg.setPosition(boxBg.x + boxBg.width / 2 - rechargebg.width / 2 - 10,boxBg.y + boxBg.height - rechargebg.height / 2  + 35);
			// 	receiveNum.setPosition(rechargebg.x + rechargebg.width / 2,rechargebg.y + rechargebg.height/2 - receiveNum.height/2 );
			// }

			this.addChild(rechargebg);
			this.addChild(receiveNum);
			let boxInfo:{ "boxBg":BaseBitmap;"needGem": string;"lightBM": BaseBitmap;"boxBM": BaseLoadBitmap;"rechargeTF": BaseTextField;"rechargebg":BaseBitmap;} = {"boxBg":boxBg,"needGem": boxCfg.needGem,"lightBM":light,"boxBM": box,"rechargeTF": receiveNum,"rechargebg":rechargebg};
			this.boxInfoList.push(boxInfo);
		}
		this.refreshView();

		
		let flowerBM = null;
	

		if(ResourceManager.hasRes("acrechargeboxview_flower"+"_"+this.code)){
			flowerBM = BaseBitmap.create("acrechargeboxview_flower"+"_"+this.code);
		} else {
			flowerBM = BaseBitmap.create("acrechargeboxview_flower")
		}


		flowerBM.setPosition(this._topbg.x,this._topbg.y + this._topbg.height);
		this.addChild(flowerBM);

		let buttomBg3 = null;
		if(ResourceManager.hasRes("acrechargeboxview_bg3"+"_"+this.code)){
			buttomBg3 = BaseLoadBitmap.create("acrechargeboxview_bg3"+"_"+this.code);
		} else {
			buttomBg3 = BaseLoadBitmap.create("acrechargeboxview_bg3")
		}

	
		buttomBg3.width = 620;
		buttomBg3.height = 89;
		buttomBg3.setPosition(bottomBg.x + bottomBg.width / 2 - buttomBg3.width / 2 , bottomBg.y + bottomBg.height - buttomBg3.height);
		this.addChild(buttomBg3);
		if(this.code == "3"){
			buttomBg3.visible = false;
			flowerBM.visible = false;
		}
		

		
	}
	private refreshView()
	{
		for(let i = 0;i<this.boxInfoList.length;i++)
		{
			let vo = <AcRechargeBoxVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
			let cfg =  <Config.AcCfg.RechargeBoxCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
			let boxInfo = this.boxInfoList[i];
			let boxCfg =  cfg.getBoxData(boxInfo.needGem);
			let rechargeNum = vo.getBoxReChargeNum(boxInfo.needGem);
			let receiveNum = vo.getBoxReceiveNum(boxInfo.needGem);
			boxInfo.rechargeTF.textColor = TextFieldConst.COLOR_QUALITY_WHITE;
			if(Number(boxCfg.limit) <= receiveNum)
			{
				egret.Tween.removeTweens(boxInfo.lightBM);
				egret.Tween.removeTweens(boxInfo.boxBM);
				boxInfo.lightBM.setVisible(false);
				boxInfo.boxBM.setload("acrechargeboxview_box3" + this._suffix);
				boxInfo.rechargeTF.text = LanguageManager.getlocal("acRechargeBoxReceiveNum3");
			}
			else
			{
				 if(rechargeNum > receiveNum )
				 {
					 boxInfo.lightBM.setVisible(true);
					boxInfo.boxBM.setload("acrechargeboxview_box2" + this._suffix);
					egret.Tween.get(boxInfo.lightBM,{loop:true}).to({rotation:boxInfo.lightBM.rotation+360},10000);
					egret.Tween.get(boxInfo.boxBM,{loop:true}).to({rotation:10},50).to({rotation:-10},100).to({rotation:10},100).to({rotation:0},50).wait(500);
					boxInfo.rechargeTF.text = LanguageManager.getlocal("acRechargeBoxReceiveNum2");
					if( this.code == "3"){
						boxInfo.rechargeTF.textColor = TextFieldConst.COLOR_WARN_GREEN2;
					}else{
						boxInfo.rechargeTF.textColor = TextFieldConst.COLOR_QUALITY_WHITE;
					}
				 }
				 else
				 {
					egret.Tween.removeTweens(boxInfo.lightBM);
					egret.Tween.removeTweens(boxInfo.boxBM);
					boxInfo.lightBM.setVisible(false);
					boxInfo.boxBM.setload("acrechargeboxview_box1" + this._suffix);
					boxInfo.rechargeTF.text = LanguageManager.getlocal("acRechargeBoxReceiveNum",[String(rechargeNum),String(boxCfg.limit)]);
				 }
			}
			boxInfo.rechargeTF.anchorOffsetX =  boxInfo.rechargeTF.width / 2;
		}
	}
	/**
	 * 宝箱的点击事件
	 */
	private boxClick(event: egret.TouchEvent,needGem:any)
	{
		ViewController.getInstance().openView(ViewConst.POPUP.ACRECHARGEBOXPOPUPVIEW,{"aid":this.aid,"code":this.code,"boxId":needGem})
	}
	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			// ,"itemeffect",
			"tailor_get_light",
			// "commonview_titlebgshadow"
			]);
	}
	protected getTitleBgName():string
	{
		return "commonview_db_04"
	}
	protected getRuleInfo():string
	{
		if(this.code == "3"){
			return "acRechargeBoxRule_3";
		} else if(this.code == "4"){
			return "acRechargeBoxRule_4";
		}
		return "acRechargeBoxRule";
    } 
	public dispose()
	{
		App.MessageHelper.removeNetMessage(NetPushConst.PUSH_PAY,this.refreshView,this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUST_ACTIVITY_GETRECHARGEBOXREWARD,this.refreshView,this);
		this._topbg = null;
		this.boxInfoList = null;
		this._suffix = "";
		super.dispose();
	}
	
}