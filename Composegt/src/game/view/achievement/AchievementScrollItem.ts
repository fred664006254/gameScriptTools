/**
 * 成就Item
 * author dky
 * date 2017/11/4
 * @class AchievementScrollItem
 */
class AchievementScrollItem extends ScrollListItem
{
	// // 成就标题
	// private _achNameTF:BaseTextField;

	// 成就完成度
	private _achProTF:BaseTextField;

	// 成就图片
	// private _achIcon:BaseLoadBitmap;
	// 成就标题
	private _getBtn:BaseButton;
	// 状态图片
	private _stateIcon:BaseBitmap;

	private _expProgress:ProgressBar = null;



	private _achInfo:AchievementInfoVo;

	private _achRedDotSp:BaseBitmap = null;
	
	public constructor() 
	{
		super();
	}

	public initItem(index:number,achInfoVo:AchievementInfoVo):void
	{
		this.width = 600;
		this.height = 152 + this.getSpaceY();


		this._achInfo = achInfoVo;

		let achCfg = Config.AchievementCfg.getAchievementCfgById(achInfoVo.id);

		// let bgBg:BaseBitmap = BaseBitmap.create("public_listbg");
		let bgBg:BaseBitmap = BaseBitmap.create("achievement_bg");
		// bgBg.width = this.width;
		// bgBg.height = 145;
		this.addChild(bgBg);

		// let leftBg = BaseBitmap.create("public_left");
		// leftBg.width = 139;
		// leftBg.height = 126.5;
		// leftBg.x = 5.5;
		// leftBg.y = 5.5;
		// this.addChild(leftBg);


		let iconBg:BaseBitmap = BaseBitmap.create("progress6_bg");
		iconBg.x = 18;
		iconBg.y = 21;
		this.addChild(iconBg);

		let iconContainer = new BaseDisplayObjectContainer();
		this.addChild(iconContainer);
		iconContainer.x = iconBg.x + iconBg.width/2 - 44;
		iconContainer.y = iconBg.y + iconBg.height/2 - 44;
		iconContainer.width = 88;
		iconContainer.height = 88;
	

		let achIcon :BaseLoadBitmap = BaseLoadBitmap.create(achInfoVo.icon);
		// achIcon.x = iconBg.x + iconBg.width/2 - 44;
		// //todo achIcon的宽高尺寸需要固定
		// achIcon.y = iconBg.y + iconBg.height/2 - 44;
		iconContainer.addChild(achIcon);
		
		let nameIcon :BaseLoadBitmap = BaseLoadBitmap.create(achInfoVo.nameIcon,null,{callback:(container:BaseDisplayObjectContainer)=>{
				if(container)
				{
					nameIcon.x = container.width/2 - nameIcon.width/2;
				}
			},callbackThisObj:this,callbackParams:[iconContainer]});

		// nameIcon.x = 17;
		nameIcon.y = 58 - 3;
		iconContainer.addChild(nameIcon);

		App.CommonUtil.addTouchScaleEffect(iconContainer,this.clickItemHandler,this);
		

		let achPro = Api.achievementVoApi.getAchProById(achInfoVo.id);
		// let curValue1 = achCfg.value[Api.achievementVoApi.getAchProById(achInfoVo.id)];
		let pro = ComponentManager.getCircleProgressBar("progress6");
		pro.setPercentage(achPro/achCfg.value.length*100);
		pro.x = 18;//7;
		pro.y = 21;//20 - 3 - 3;
		this.addChild(pro);


		this._achRedDotSp = BaseBitmap.create("public_dot2");
		this._achRedDotSp.x = iconBg.x + iconBg.width - this._achRedDotSp.width - 20 ;
		this._achRedDotSp.y = iconBg.y + 2;
		this.addChild(this._achRedDotSp);

		if(achInfoVo.f == 1)
		{
			this._achRedDotSp.visible= true;
		}
		else
		{
			this._achRedDotSp.visible= false;
		}

		// let nameBg:BaseBitmap = BaseBitmap.create("public_numbg");
		// nameBg.width = 194;
		// nameBg.height = 41;
		// nameBg.x = 140;
		// nameBg.y = 30;
		// this.addChild(nameBg);

		let nameTF = ComponentManager.getTextField(achInfoVo.name,TextFieldConst.FONTSIZE_TITLE_COMMON,0x420e00);
		// nameBg.width = nameTF.width + 40;
		// nameTF.bold = true;
		nameTF.x = 161;
		nameTF.y = 45;
		this.addChild(nameTF);

		
		

		this._expProgress = ComponentManager.getProgressBar("progress_type1_yellow2","progress_type3_bg",255);
		this._expProgress.setPosition(155,80);
		this._expProgress.setTextSize(TextFieldConst.FONTSIZE_CONTENT_SMALL);
		this.addChild(this._expProgress);



		let curValue = achCfg.value[Api.achievementVoApi.getAchProById(achInfoVo.id)];
		if(!curValue)
		{
			curValue = achInfoVo.v;
		}
		let nn1 =  App.StringUtil.changeIntToText(achInfoVo.v );
		let nn2 =  App.StringUtil.changeIntToText(curValue);
		this._expProgress.setPercentage(achInfoVo.v /curValue );
		let achProStr = nn1 + "/" + nn2;


		this._achProTF = ComponentManager.getTextField(achProStr,20,TextFieldConst.COLOR_WHITE);

		this._achProTF.x = this._expProgress.x + this._expProgress.width/2 - this._achProTF.width/2;
		this._achProTF.y = this._expProgress.y + this._expProgress.height/2 - this._achProTF.height/2 +1;
		this.addChild(this._achProTF);

		//领取按钮
		this._getBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "taskCollect", this.getBtnClickHandler, this);
		this._getBtn.setColor(0x6f2f00);
		this._getBtn.x = 435;
		this._getBtn.y = 152/2 - this._getBtn.height * this._getBtn.scaleY /2;

		this.addChild(this._getBtn);

		this._stateIcon = BaseBitmap.create("achievement_state1");
		this._stateIcon.x = 435 + this._getBtn.width /2 - this._stateIcon.width /2;
		this._stateIcon.y = 152/2 - this._stateIcon.height/2;
		this.addChild(this._stateIcon);


		if(achInfoVo.f == 0)
		{
			//进行中
			this._getBtn.visible = false;
		}
		else if(achInfoVo.f == 1)
		{
			//已完成
			this._stateIcon.visible = false;
		}
		else if(achInfoVo.f == 2)
		{
			this._stateIcon.visible = false;
			this._getBtn.visible = false;
			pro.setPercentage(100);
		}

		this.cacheAsBitmap=true;
	}

	private clickItemHandler(event: egret.TouchEvent): void {
		// let index: number = Number(event.data);
		// let achList = Api.achievementVoApi.getAchievementInfoVoList();
		// let achVo = achList[index]
		ViewController.getInstance().openView(ViewConst.POPUP.ACHIEVEMENTDETAILPOPUPVIEW,{achId:this._achInfo.id});

	}
	public refreshData(index:number)
	{	
		// let achList = Api.achievementVoApi.getAchievementInfoVoList();
		// let achInfoVo = achList[index];
		let achInfoVo = Api.achievementVoApi.getAchievementInfoVoById(this._achInfo.id);
		let achCfg = Config.AchievementCfg.getAchievementCfgById(achInfoVo.id);
		let curValue = achCfg.value[Api.achievementVoApi.getAchProById(achInfoVo.id)];
		
		this._expProgress.setPercentage(achInfoVo.v /curValue );
		let achProStr = achInfoVo.v + "/" + curValue;
		this._achProTF.text = achProStr;
			
		this._achProTF.y = this._expProgress.y + this._expProgress.height/2 - this._achProTF.height/2;



		if(achInfoVo.f == 0)
		{
			//进行中
			this._getBtn.visible = false;
			this._stateIcon.visible = true;
		}
		else if(achInfoVo.f == 1)
		{
			//已完成
			this._getBtn.visible = false;
			this._stateIcon.visible = true;
		}
		else if(achInfoVo.f == 2)
		{
			this._stateIcon.visible = false;
			this._getBtn.visible = false;
		}

		if(achInfoVo.f == 1)
		{
			this._achRedDotSp.visible= true;
		}
		else
		{
			this._achRedDotSp.visible= false;
		}
	}


	private getBtnClickHandler()
	{
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_ACH_GETREWARD,{"achId":this._achInfo.id});
	}

	public getSpaceY():number
	{
		return 5;
	}

	public dispose():void
	{
		this._achProTF = null;

		// 成就图片
		// this._achIcon = null;
		// 成就标题
		this._getBtn = null;
		// 状态图片
		this._stateIcon = null;

		this._expProgress = null;
		this._achInfo = null;
		this._achRedDotSp = null;
		this.cacheAsBitmap=false;

		super.dispose();
	}
}