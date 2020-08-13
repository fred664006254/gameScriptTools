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
		this.height = 146;

		this._achInfo = achInfoVo;

		let achCfg = Config.AchievementCfg.getAchievementCfgById(achInfoVo.id);

		let bgBg:BaseBitmap = BaseBitmap.create("public_scrollitembg");
		this.addChild(bgBg);


		let iconBg:BaseBitmap = BaseBitmap.create("progress19_bg");
		iconBg.x = 7;
		iconBg.y = bgBg.height/2-iconBg.height/2;
		this.addChild(iconBg);
				

		let achPro = Api.achievementVoApi.getAchProById(achInfoVo.id);
		let pro = ComponentManager.getCircleProgressBar("progress19");
		pro.setPercentage(achPro/achCfg.value.length*100);
		pro.x = iconBg.x;
		pro.y = iconBg.y;
		this.addChild(pro);

		let iconCloud:BaseBitmap = BaseBitmap.create("progress19_cloud");
		iconCloud.x = 30;
		iconCloud.y = iconBg.y+iconBg.height-iconCloud.height;
		this.addChild(iconCloud);

		//放在名字上面防止遮挡文字
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
		nameIcon.y = 58;
		iconContainer.addChild(nameIcon);

		App.CommonUtil.addTouchScaleEffect(iconContainer,this.clickItemHandler,this);


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

		let nameBg:BaseBitmap = BaseBitmap.create("public_titlebg");
		nameBg.width = 240;
		nameBg.x = 140;
		nameBg.y = 26;
		this.addChild(nameBg);

		let nameTF = ComponentManager.getTextField(achInfoVo.name,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		nameTF.x = nameBg.x + 15;
		nameTF.y = nameBg.y + nameBg.height/2 - nameTF.height/2;
		this.addChild(nameTF);

		
		//成就名字根据自身变化
		// if(PlatformManager.checkIsTextHorizontal())
        // {
		// 	nameBg.width = nameTF.width + 30;
        // }


		this._expProgress = ComponentManager.getProgressBar("progress17", "progress17_bg",260);
		this._expProgress.setPosition(140,85);
		this.addChild(this._expProgress);
		



		let curValue = achCfg.value[Api.achievementVoApi.getAchProById(achInfoVo.id)];
		if(!curValue)
		{
			curValue = achInfoVo.v;
		}
		this._expProgress.setPercentage(achInfoVo.v /curValue );
		let achProStr = achInfoVo.v + "/" + curValue;
		this._achProTF = ComponentManager.getTextField(achProStr,TextFieldConst.FONTSIZE_ACTIVITY_COMMON,TextFieldConst.COLOR_WHITE);

		this._achProTF.x = this._expProgress.x + this._expProgress.width/2 - this._achProTF.width/2;
		this._achProTF.y = this._expProgress.y + this._expProgress.height/2 - this._achProTF.height/2;
		this.addChild(this._achProTF);

		//领取按钮
		this._getBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "taskCollect", this.getBtnClickHandler, this);
		this._getBtn.x = 450;
		this._getBtn.y = 140/2 - this._getBtn.height/2;
		this._getBtn.setColor(TextFieldConst.COLOR_BLACK);
		this.addChild(this._getBtn);

		this._stateIcon = BaseBitmap.create("achievement_state1");
		this._stateIcon.x = 450;
		this._stateIcon.y = 140/2 - this._stateIcon.height/2;
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
		return 10;
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