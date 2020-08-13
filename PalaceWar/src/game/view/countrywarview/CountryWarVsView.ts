/**
 * 战斗准备期倒计时界面
 * author qianjun
 */
class CountryWarVsView extends CommonView
{
	private _timeCdTxt : BaseTextField = null;
	public constructor(){
		super();
	}

	private get api():CountryWarVoApi{
		return Api.countryWarVoApi;
	}

	public initView():void{
		let view = this;
		view.width = GameConfig.stageWidth;
		view.height = GameConfig.stageHeigth;

		view.createWarInfo(LayoutConst.left);
		view.createWarInfo(LayoutConst.right);

		let vsbg = BaseBitmap.create(`crossservantrulevs`);
        vsbg.setScale(0.6);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, vsbg, view, [0,130]);
        view.addChild(vsbg);

		let timebg = BaseBitmap.create('public_itemtipbg2');
		timebg.width = 415;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, timebg, view.titleBg, [0,view.titleBg.height + 44]);
		view.addChild(timebg);

		let timeTxt = ComponentManager.getTextField(LanguageManager.getlocal('CountryWarCountdown_1',[App.DateUtil.getFormatBySecond(view.api.getCountTime())]), 22, TextFieldConst.COLOR_LIGHT_YELLOW);//App.DateUtil.getFormatBySecond(time);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, timeTxt, timebg);
		view.addChild(timeTxt);
		view._timeCdTxt = timeTxt;
	}

	protected getRequestData():{requestType:string,requestData:any}{	
		let view = this;
		if(view.param.data.test){
			return null;
		}
		else{
			return {requestType:NetRequestConst.REQUEST_COUNTRYWAY_WARDETAIL,requestData:{
				city : view.api.getCityIndex(view.param.data.cityId),
			}};
		}
	}
	
	private wardata : any = {};
	protected receiveData(rdata:any):void{
		let view = this;
		if(!rdata.ret){
			return;
		}
		view.wardata = rdata.data.data.countrywarresult;
	}

	/**
	 * 获取此次帮会对阵信息 0 自己帮会的信息 1敌方帮会的
	*/
	public getThisWarLog(index : number):{server : number, allianceName : string, attendLog : any[], totalattr : number, allilevel : number}{
		let arr = [];
		let isMy = index == 0;
		let sourceObj = isMy ? this.wardata.info : this.wardata.tinfo;
		let obj : any = {};
		// let myAllianceVo =  Api.allianceVoApi.getAllianceVo();
		let zid = isMy ? Api.mergeServerVoApi.getTrueZid() : this.api.getEnermyZid();
		obj['server'] = zid;
		obj['allianceName'] = Api.mergeServerVoApi.getAfterMergeSeverName(null,true,zid);
		obj['attendLog'] = this.getWarVsLog(index);
		obj['totalattr'] = isMy ? this._allMyTotalAttr : this._allOtherTotalAttr;
		obj['allilevel'] = 0;
		return obj;
	}
	/**
	 * 获取当前阵容信息 0己方 1敌方
	*/
	private _allMyTotalAttr = 0;
	private _allOtherTotalAttr = 0;

	public getWarVsLog(type : number):{}[]{
		let sourceObj = type == 0 ? this.wardata.info : this.wardata.tinfo.info;
		let arr = [];
		let total = 0;
		for(let i in sourceObj){
			let unit = sourceObj[i];
			total += unit.dps;
			let zid = type == 0 ? Api.mergeServerVoApi.getTrueZid() : this.api.getEnermyZid();
			arr.push({
				servantId : unit.servant,
				plan : unit.stra,
				attr : unit.dps,
				name : unit.name,
				uid : i,
				curHp : unit.dps,
				alliname : Api.mergeServerVoApi.getAfterMergeSeverName(null, true, zid),
				zid : zid,
				time : unit.st,
				level :  unit.level,
				titleid : unit.title,
				skin : unit.servantskin,
			});
		}
		if(type == 0){
			this._allMyTotalAttr = total;
		}
		else{
			this._allOtherTotalAttr = total;
		}

		arr.sort((a,b)=>{
			return a.time - b.time;
		});
		return arr;
	}

	private createWarInfo(type : string):void{
		let view = this;
		let isLeft = type == LayoutConst.left;
		let wardata = view.getThisWarLog(isLeft ? 0 : 1);

		let group = new BaseDisplayObjectContainer();
		group.width = GameConfig.stageWidth / 2;
		group.height = GameConfig.stageHeigth - view.titleBg.height;
		App.DisplayUtil.setLayoutPosition( isLeft ? LayoutConst.leftbottom : LayoutConst.rightbottom, group, view, [0,-3]);
		view.addChild(group);
		//信息
		let infobg = BaseBitmap.create(view.api.isRedTeam(type) ? 'crossservantvsmask1' : 'crossservantvsmask2');
		infobg.height = group.height;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, infobg, group, [0,0], true);
		group.addChild(infobg);

		let servernameTxt = ComponentManager.getTextField(LanguageManager.getlocal(`Countrywarvsserver${type}`, [Api.mergeServerVoApi.getAfterMergeSeverName(null,true,wardata.server)]), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, servernameTxt, infobg, [0,10]);
		servernameTxt.visible = !(Number(wardata.server) == 0);
		group.addChild(servernameTxt);

		let vsbg = BaseBitmap.create(view.api.isRedTeam(type) ? `countrywarvsleft` : 'countrywarvsright');
		if((type == 'left' && !view.api.isRedTeam(type)) || (type == 'right' && view.api.isRedTeam(type))){
            vsbg.anchorOffsetX = vsbg.width / 2;
            vsbg.anchorOffsetY = vsbg.height / 2;
            vsbg.scaleX = -1;
        }
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, vsbg, servernameTxt, [0,servernameTxt.textHeight + 10]);
		group.addChild(vsbg);

		//服信息
		let allinamebg = BaseBitmap.create(view.api.isRedTeam(type) ? 'awservernamebg1' : 'awservernamebg2');
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, allinamebg, vsbg, [0,-10]);
		group.addChild(allinamebg);

		let allinameTxt = ComponentManager.getTextField(LanguageManager.getlocal(`Countrywarvsname${view.api.isRedTeam(type) ? 'left' : 'right'}`), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, allinameTxt, allinamebg);
		group.addChild(allinameTxt);

		let memberNumTxt = ComponentManager.getTextField(LanguageManager.getlocal('allianceWarAttendNum',[wardata.attendLog.length.toString()]), 20);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, memberNumTxt, allinamebg, [0,allinamebg.height + 5]);
		group.addChild(memberNumTxt);

		let tmpRect =  new egret.Rectangle(0,0,infobg.width - 10, infobg.height - memberNumTxt.y - memberNumTxt.textHeight - 10);
        let scrollList = ComponentManager.getScrollList(CountryWarVsInfoItem, wardata.attendLog, tmpRect);
        scrollList.setEmptyTip(LanguageManager.getlocal(`acPunishNoData`));
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, memberNumTxt, [0,memberNumTxt.textHeight + 10]);
		group.addChild(scrollList);
		scrollList.bounces = false;

		view.setChildIndex(view.closeBtn, 9999);
	}

	protected tick(){
		let view = this;
		view._timeCdTxt.text = LanguageManager.getlocal('CountryWarCountdown_1',[App.DateUtil.getFormatBySecond(view.api.getCountTime())]);
		if(view.api.getCurpeirod() == 3){
			App.CommonUtil.showTip(LanguageManager.getlocal('allianceWarTip2'));
			view.hide();
			return;
		}
		
	}
	protected getBgName():string{
		return 'alliancewarbg2';
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
            this.height = GameConfig.stageHeigth;

            //this.setLayoutPosition(LayoutConst.horizontalCenterbottom, this.viewBg, this);
			// 
            // this.viewBg.height = GameConfig.stageHeigth;
            // let mask = BaseLoadBitmap.create('empvsmask');
            // this.addChild(mask);
			// mask.width = GameConfig.stageWidth;
            // mask.height = GameConfig.stageHeigth;
            this.viewBg.y = 0;//(GameConfig.stageHeigth - 1136)/2;
		}
	}
	
	protected getResourceList():string[]{
		return super.getResourceList().concat([
			'crossservantvsmask1','crossservantvsmask2','awservernamebg1','awservernamebg2','awserverbg1','awserverbg2',
			'countrywarvsleft','countrywarvsright'
        ]);
	}

	protected getRuleInfo():string{
		return null;
	}

	protected getTitleStr():string{
		return `CountryWarVsTitle`;
	}

	protected getTitleParams():string[]{
		return [LanguageManager.getlocal(`CountryWarCityName${this.param.data.cityId}`)];
	}

	public dispose():void{
		let view = this;
		view._timeCdTxt = null;
		super.dispose();
	}
}