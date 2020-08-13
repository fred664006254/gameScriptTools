/**
 * 成就详情Item
 * author dky
 * date 2017/11/6
 * @class AchievementDetailScrollItem
 */
class AchievementDetailScrollItem extends ScrollListItem
{
	// // 成就标题
	// private _achNameTF:BaseTextField;

	// 成就完成度
	private _achProTF:BaseTextField;

	// 成就标题
	private _getBtn:BaseButton;
	// 状态图片
	private _stateIcon:BaseBitmap;

	private _achInfo:AchievementInfoVo;
	
	private _achIndex:number;
		
	public constructor() 
	{
		super();
	}

	public initItem(index:number,achIndex:number):void
	{
		this.width = 522;
		this.height = 100 + this.getSpaceY();

		// let parent = <AchievementDetailPopupView>this.par;
		this._achIndex = achIndex;

		let achInfoVo = Api.achievementVoApi.getAchievementInfoVoById(Api.achievementVoApi.getUIItemId());
		this._achInfo = achInfoVo;

		let achCfg = Config.AchievementCfg.getAchievementCfgById(achInfoVo.id);

		let bgBg:BaseBitmap = BaseBitmap.create("public_9_probiginnerbg");
		bgBg.width = this.width;
		bgBg.height = 100;
		this.addChild(bgBg);
		
		let nameStr = (achIndex + 1) + "." + achInfoVo.name
		let nameTF = ComponentManager.getTextField(nameStr,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		nameTF.x = 20
		nameTF.y = 30;
		this.addChild(nameTF);


		let rewardStr = GameData.getRewardsStr(achCfg.reward[achIndex]);

		let rewardTF = ComponentManager.getTextField(rewardStr,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WARN_GREEN);
		rewardTF.x = nameTF.x ;
		rewardTF.y = 60;
		this.addChild(rewardTF);


		// let achPro = Api.achievementVoApi.getAchProById(achInfoVo.id);

		let achProStr = "(" + achInfoVo.v + "/" + achCfg.value[achIndex] + ")";


		this._achProTF = ComponentManager.getTextField(achProStr,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WARN_YELLOW);

		this._achProTF.x = nameTF.x + nameTF.width + 10;
		this._achProTF.y = nameTF.y;
		this.addChild(this._achProTF);

		//领取按钮
		this._getBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "taskCollect", this.getBtnClickHandler, this);
		this._getBtn.x = 378;
		this._getBtn.y = this.height/2 - this._getBtn.height/2;
		this._getBtn.setColor(TextFieldConst.COLOR_BLACK);
		this.addChild(this._getBtn);

		this._stateIcon = BaseBitmap.create("achievement_state2");
		this._stateIcon.x = 378;
		this._stateIcon.y = this.height/2 - this._stateIcon.height/2;
		this.addChild(this._stateIcon);



		let stage = achInfoVo.stage;
		let curValue = achCfg.value[Api.achievementVoApi.getAchProById(achInfoVo.id)];

		this._getBtn.visible = false;
		this._stateIcon.visible = true;
		if(achIndex < achInfoVo.stage - 1)
		{
			//不是最後一個
			this._stateIcon.texture = ResourceManager.getRes("achievement_state3")
		}
		else{
			if(achCfg.value[achIndex] > achInfoVo.v )
			{
				//未完成
				// this._stateIcon.texture = ResourceManager.getRes("achievement_state2")
				if(this._achIndex == achInfoVo.stage - 1)
				{
						 //2进行种
					this._stateIcon.texture = ResourceManager.getRes("achievement_state1");
				}else{
						//未完成
					this._stateIcon.texture = ResourceManager.getRes("achievement_state2");
				}
			}
			else{
				
				
				if(achIndex == achInfoVo.stage - 1)
				{
					
					// this._stateIcon.texture = ResourceManager.getRes("achievement_state3")
					if(achInfoVo.f == 2)
					{
						//任务完成
						this._getBtn.visible = false;
						this._stateIcon.visible = true;
						this._stateIcon.texture = ResourceManager.getRes("achievement_state3")
					}else
					{
						//可领取
						this._getBtn.visible = true;
						this._stateIcon.visible = false;
					}
					
				}
				else{
					//进行中
					this._stateIcon.texture = ResourceManager.getRes("achievement_state1")
				}
			}
		}
		
	}


	public refreshData(index:number)
	{	
		let achInfoVo = Api.achievementVoApi.getAchievementInfoVoById(Api.achievementVoApi.getUIItemId());
		let stage = achInfoVo.stage;
		let achCfg = Config.AchievementCfg.getAchievementCfgById(achInfoVo.id);
		let curValue = achCfg.value[Api.achievementVoApi.getAchProById(achInfoVo.id)];

		this._getBtn.visible = false;
		this._stateIcon.visible = true;
		let achIndex = this._achIndex;
		if(achIndex < achInfoVo.stage - 1)
		{
			//不是最後一個
			this._stateIcon.texture = ResourceManager.getRes("achievement_state3")
		}
		else{
			if(achCfg.value[achIndex] > achInfoVo.v )
			{
				//未完成
				// this._stateIcon.texture = ResourceManager.getRes("achievement_state2")
				if(this._achIndex == achInfoVo.stage - 1)
				{
						 //2进行种
					this._stateIcon.texture = ResourceManager.getRes("achievement_state1");
				}else{
						//未完成
					this._stateIcon.texture = ResourceManager.getRes("achievement_state2");
				}
			}
			else{
				
				
				if(achIndex == achInfoVo.stage - 1)
				{
					
					// this._stateIcon.texture = ResourceManager.getRes("achievement_state3")
					if(achInfoVo.f == 2)
					{
						//任务完成
						this._getBtn.visible = false;
						this._stateIcon.visible = true;
						this._stateIcon.texture = ResourceManager.getRes("achievement_state3")
					}else
					{
						//可领取
						this._getBtn.visible = true;
						this._stateIcon.visible = false;
					}
					
				}
				else{
					//进行中
					this._stateIcon.texture = ResourceManager.getRes("achievement_state1")
				}
			}
		}
	}

	private getBtnClickHandler()
	{
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_ACH_GETDETAILREWARD,{"achIndex":this._achIndex});
	}

	public getSpaceY():number
	{
		return 10;
	}

	public dispose():void
	{
		this._achProTF = null;

		// 成就标题
		this._getBtn = null;
		// 状态图片
		this._stateIcon = null;

		this._achInfo = null;

		this._achIndex = null;;

		super.dispose();
	}
}