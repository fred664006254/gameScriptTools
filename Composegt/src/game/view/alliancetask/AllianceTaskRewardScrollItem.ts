/**
 *帮会任务奖励
 * author yanyuling
 * date 2018/07/20
 * @class AllianceTaskRewardScrollItem
 */
class AllianceTaskRewardScrollItem extends ScrollListItem
{
	private _taskId:string;
	private _requsting:boolean = false;
	private _collectBtn:BaseButton;
	private _collectFlag:BaseBitmap;
	public constructor() 
	{
		super();
	}

	public initItem(index:number,data:any,ismon?:number):void
	{
		this._taskId = data;
		let cfgData
		let rewardStr
		let cellType
		let cellValue
		let titleStr
		if(ismon)
		{
			cfgData = Config.AlliancetaskCfg.getAllianceMonTTaskById(this._taskId);
			rewardStr = cfgData.monthReward;
			cellType = 1;
			cellValue = cfgData.missionNum;
			titleStr=LanguageManager.getlocal("allianceTaskMonName", [cellValue]);
		}else{
			cfgData = Config.AlliancetaskCfg.getAllianceTaskById(this._taskId);
			rewardStr = cfgData.completeReward + "|101_1_" + cfgData.addExp;
			cellType = cfgData.type;
			cellValue = cfgData.value;
			titleStr=LanguageManager.getlocal("allianceTaskName" + this._taskId);
		}


		let bg = BaseBitmap.create("public_tc_bg03");
        bg.width = 524;
        bg.height= 130;
        bg.x = 3;
        this.addChild(bg);

		let attrbg = BaseBitmap.create("alliance_taskAttrbg"+cellType);
		attrbg.x = bg.x;
		attrbg.y = bg.y;
		this.addChild(attrbg);

		let taskNameTxt = ComponentManager.getTextField(titleStr,18);
		taskNameTxt.x = attrbg.x + 10;
		taskNameTxt.y = attrbg.y + attrbg.height/2 - taskNameTxt.height/2;
		this.addChild(taskNameTxt);

		let startX = 15;
		let startY = attrbg.y + attrbg.height + 2;

		startX +=5;
		startY += 5;
		let rewardArr = GameData.getRewardItemIcons(rewardStr ,true);
		let deltalW = 90;
		let deltaH = 90;
		for (var index = 0; index < rewardArr.length; index++) {
			var element = rewardArr[index];
			element.setScale(0.78);
			if(index%4 == 0 && index > 0){
				startX = 20;
				startY += deltaH;
			}
			element.x = startX;
			element.y = startY;
			startX += deltalW;
			this.addChild(element);
		}
		startY += deltaH;
		
		let nowNum = 0
		if(ismon)
		{
			nowNum = Api.allianceTaskVoApi.getAllianceMonTaskOverNum();
		}
		else{
			let taskinfo = Api.allianceTaskVoApi.getAllianceTaskInfo(this._taskId);
			if(taskinfo){
				nowNum = taskinfo.v;
			}
		}
		if (!ismon) {
			let _progress = ComponentManager.getProgressBar("progress_type1_yellow2","progress_type3_bg",488);
			_progress.setTextSize(18);
			_progress.x = bg.x+bg.width/2 - _progress.width/2;
			_progress.y = startY;
			_progress.setPercentage(nowNum/cellValue);
			if (nowNum >= cellValue) {
				_progress.setText(LanguageManager.getlocal("bookRoomServant_studyComplete"));
			} else {
				_progress.setText(LanguageManager.getlocal("allianceTaskProgressTxt",[String(Math.floor(nowNum / cellValue * 10000) / 100) + "%"]));
			}
			this.addChild(_progress);
			bg.height = _progress.y + _progress.height + 15;
		}

		if (ismon) {
			if(nowNum>=cellValue){
				let collectImageStr = "isover"
				let collectFlag = BaseBitmap.create(collectImageStr)
				collectFlag.x = bg.x+bg.width -70 - collectFlag.width/2 ;
				collectFlag.y = bg.y+bg.height/2 - collectFlag.height/2;
				this.addChild(collectFlag);
			} else {
				let taskNameTxt = ComponentManager.getTextField(LanguageManager.getlocal("allianceTaskMonthProgress",[nowNum,cellValue]),TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BROWN);
				taskNameTxt.textAlign = egret.HorizontalAlign.CENTER;
				taskNameTxt.x = bg.x+bg.width -70 - taskNameTxt.width/2 ;
				taskNameTxt.y = bg.y+bg.height/2 - taskNameTxt.height/2;
				this.addChild(taskNameTxt);
			}
		} else {
			let collectImageStr = "notover"
			if(nowNum>=cellValue){
				collectImageStr = "isover"
			}
			let collectFlag = BaseBitmap.create(collectImageStr)
			collectFlag.x = bg.x+bg.width -70 - collectFlag.width/2 ;
			collectFlag.y = bg.y+bg.height/2 - collectFlag.height/2;
			this.addChild(collectFlag);
		}
	}
	

	public getSpaceY():number
	{
		return 2;
	}

	public dispose():void
	{
		this._taskId = null;
		this._requsting = false;
		this._collectBtn = null;
		this._collectFlag = null;

		super.dispose();
	}
}