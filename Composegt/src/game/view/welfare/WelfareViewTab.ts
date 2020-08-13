/**
 * 福利界面tab父类
 * author dmj
 * date 2017/11/03
 * @class WelfareViewTab
 */
abstract class WelfareViewTab extends BaseLoadDisplayObjectContiner
{
	public bottomBg:BaseBitmap; 
	public isWanbaBoo:boolean = false;
	public constructor() 
	{
		super();
	}

	protected init():void
	{	
		this.isWanbaBoo =Api.switchVoApi.checknewRecharge();		
		var logdStr = BaseBitmap.create(this.getResPreName() + "_bg");
		let totalSignDay = Api.arrivalVoApi.getTotalSignDay();

		let hasSkillIcon: boolean = false;

		if(totalSignDay<=6&&this.getResPreName()=="signin")
		{
			if(Api.switchVoApi.checkSignUp()){

			} else {
				logdStr =BaseBitmap.create(this.getResPreName() + "2_bg");
				if(totalSignDay<=2)
				{
					logdStr =BaseBitmap.create(this.getResPreName() + "3_bg");
					hasSkillIcon = true;
				}
			}


		} else if (this.getResPreName()=="yearcard" && Api.acVoApi.getActivityVoByAidAndCode("discount","2") && Api.acVoApi.getActivityVoByAidAndCode("discount","2").isStart) {
			// vip折扣
			let picname = this.getResPreName() + "_discount_bg";
			logdStr =BaseBitmap.create(picname);
		}else if(this.isWanbaBoo&&this.getResPreName()=="firstrecharge")
		{
			let picname = "firstrecharge2_bg";
			logdStr =BaseBitmap.create(picname);
		}
		 
	
		var bg:BaseBitmap =logdStr;  
		bg.x= 7;
		this.addChild(bg); 
		
		if (hasSkillIcon) {
			let _sid: string = "1050";

			let _fetterBtn = GameData.getServantFetterBtn(_sid);
			if (_fetterBtn) {
				this.addChild(_fetterBtn);
				_fetterBtn.setPosition(bg.x + 408, 160);
				_fetterBtn.setScale(60 / _fetterBtn.width);
			}

			let skillBar = ComponentManager.getSkillBar(_sid, 52);
			this.addChild(skillBar);
			skillBar.setPosition(bg.x + 49, 170);

			let qualityIcon = GameData.getServantQualityIconBySid(_sid);
			if (qualityIcon) {
				this.addChild(qualityIcon);
				qualityIcon.setScale(0.5);
				qualityIcon.setPosition(410, -30);
			}
		}

		
		if(Api.switchVoApi.checkOpenNewMonthCardAndYearCard() && (this.getResPreName().indexOf("monthcard") > -1 || this.getResPreName().indexOf("yearcard") > -1))
		{
			this.bottomBg = BaseBitmap.create("rechargevie_db_01");
			this.bottomBg.height =GameConfig.stageHeigth - 70;
			this.bottomBg.width = 490;
			this.bottomBg.y =0;
			this.bottomBg.x =0; 
			this.addChild(this.bottomBg);	
			this.removeChild(bg); 
		}
		else
		{
				
			this.bottomBg = BaseBitmap.create("rechargevie_db_01");
			this.bottomBg.y = bg.height+5;
			this.bottomBg.width = 466;
			this.bottomBg.x = 13;
			this.bottomBg.height = GameConfig.stageHeigth - 80 - bg.height;
			this.addChild(this.bottomBg);	 
		}
	
	}

	protected getParent():egret.DisplayObjectContainer
	{
		return null;
	}

	protected getResourceList():string[]
	{
		let preName:string = this.getResPreName();
		let arr:string[] = [];
		arr.push(preName + "_btn");
		if (preName=="yearcard" && Api.acVoApi.getActivityVoByAidAndCode("discount","2") && Api.acVoApi.getActivityVoByAidAndCode("discount","2").isStart) {
			arr.push(preName + "_discount_bg");
		} else {
			arr.push(preName + "_bg");
		}
		let descImage = preName + "_desc";
		let iconImage = preName + "_icon";
		if(RES.hasRes(descImage))
		{
			arr.push(descImage);
		}
		if(RES.hasRes(iconImage))
		{
			arr.push(iconImage);
		}
		return arr;
	}

	protected getResPreName():string
	{
		let className:string = egret.getQualifiedClassName(this);
		let preName:string = className.substring(11,className.length);
		return preName.toLowerCase();
	}

	public dispose():void
	{
		if(this.bottomBg)
		{
			this.removeChild(this.bottomBg);
			this.bottomBg.dispose();
			this.bottomBg = null;
		}
		super.dispose();
	}
}