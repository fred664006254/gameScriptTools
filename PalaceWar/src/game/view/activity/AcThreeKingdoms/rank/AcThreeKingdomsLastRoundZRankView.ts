/**
 * 上轮阵营排名
 * author qianjun
 */
class AcThreeKingdomsLastRoundZRankView extends CommonView{
	// 滑动列表
	private info = null;

	public constructor(){
		super();
	}
	
	private get cfg() : Config.AcCfg.ThreeKingdomsCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcThreeKingdomsVo{
        return <AcThreeKingdomsVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get code():string{
        return this.param.data.code;
    }

    private get aid():string{
        return this.param.data.aid;
    }

    private get acTivityId():string{
        return `${this.aid}-${this.code}`;
    }

    protected getUiCode():string{
        let code = '';
        switch(Number(this.code)){
            default:
                code = `1`;
                break;
        }
        return code;
    }

	
	protected getResourceList():string[]{
        let code = this.getUiCode();
		return super.getResourceList().concat([

		]);
	}

	// protected getRequestData():{requestType:string,requestData:any}{	
	// 	return {
    //         requestType:NetRequestConst.REQUEST_THREEKINGDOMS_GOVERMENTINFO,
    //         requestData:{
    //             activeId : this.acTivityId
    //         }
    //     };
	// }

	// protected receiveData(data:{ret:boolean,data:any}):void{
    //     if(data.ret){
    //         let rdata = data.data.data;
    //         this.vo.setMeetingInfo(rdata);
    //     }
    // }
    

	public initView():void
	{		
		let view = this;
		view.width = GameConfig.stageWidth;
		view.height = GameConfig.stageHeigth;
		let code = view.getUiCode();

		let juzhou = BaseBitmap.create(App.CommonUtil.getResByCode(`threekingdomsjzhou`, code));
		view.addChild(juzhou);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop,juzhou,view,[0,view.titleBg.height]);

		let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsRanktip1`, code)), 20, TextFieldConst.COLOR_BROWN);
		tipTxt.lineSpacing = 10;
		tipTxt.textAlign= egret.HorizontalAlign.CENTER;
		tipTxt.width = 560;
		view.addChild(tipTxt);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop,tipTxt,juzhou,[0,30]);

		let dateTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsRanktip2`, code), [view.vo.acTimeAndHour]), 20, TextFieldConst.COLOR_BROWN);
		view.addChild(dateTxt);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop,dateTxt,tipTxt,[0,tipTxt.textHeight+10]);
		
		//膜拜背景
		let bottomBg = BaseBitmap.create("arena_bottom");
		bottomBg.height = 135;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottomBg, view, [0,0], true);
		view.addChild(bottomBg);

		//我的阵营
		let myKingdomTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acThreeKingdomsRanktip4-${code}`, [LanguageManager.getlocal(`acThreeKingdomsTeam${view.vo.getMyKingdoms()}-${code}`)]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, myKingdomTxt, bottomBg, [25,35]);
		view.addChild(myKingdomTxt);
		//本轮排名
		let arr = [{kingdomid : 1, value : view.vo.getLastRoundPoint(1)},{kingdomid : 2, value : view.vo.getLastRoundPoint(2)},{kingdomid : 3, value : view.vo.getLastRoundPoint(3)} ];
		arr.sort((a,b)=>{
			return b.value - a.value;
		});

		let rankstr = ``;
		let rankV = 0;
		for(let i = 0; i < arr.length; ++ i){
			if(arr[i].kingdomid == view.vo.getMyKingdoms()){
				rankV = Number(i) + 1;
				break;
			}	
		}

		if(!this.vo.getMyKingdoms()){
			rankstr = LanguageManager.getlocal(`acThreeKingdomsTeam0-${code}`);
		}
		else if(rankV == 0){
			rankstr = LanguageManager.getlocal(`atkracedes4`);
		}
		else{
			rankstr = rankV.toString();
		}
		let color = String(0x21eb39);

		let txt3 = ComponentManager.getTextField(LanguageManager.getlocal(`acThreeKingdomsRanktip15-${code}`, [rankstr]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, txt3, myKingdomTxt, [0,myKingdomTxt.textHeight+20]);
		view.addChild(txt3);

		//排名列表
		let list = ComponentManager.getScrollList(AcThreeKingdomsZrankItem,arr,new egret.Rectangle(0,0,614,bottomBg.y-juzhou.y-juzhou.height-10));
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, list, juzhou, [0,juzhou.height+10]);
		view.addChild(list);
		list.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
	}
	

	// protected getRequestData():{requestType:string,requestData:any}
	// {	
	// 	let view = this;
	// 	return {requestType:NetRequestConst.REQUEST_ACTIVITY_LOCTOMBRANK,requestData:{
	// 		activeId : view.vo.aidAndCode,
	// 	}};
	// }

	// protected receiveData(data:{ret:boolean,data:any}):void
	// {
	// 	let view = this;
	// 	view.vo.setRankInfo(data.data.data);
	// }
	// private userShotCallback(event : egret.Event):void{
    //     if(event.data.ret){
    //         let data = event.data.data.data;
	// 		if(event.data.data.cmd == NetRequestConst.REQUEST_RANKG_USERSHOT)
	// 		{
	// 			data["crossZone"] = 1;
	// 			data['zid'] = Api.mergeServerVoApi.getTrueZid(data.ruid);
	// 		}
	// 		ViewController.getInstance().openView(ViewConst.POPUP.RANKUSERINGOPOPUPVIEW,data);
    //     }
    // }

	protected getTitleStr():string{
		return 'rankViewTitle';
	}

	public dispose():void{
		let view = this;
		view.info = null;
		// App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANKG_USERSHOT),this.userShotCallback,this);
		super.dispose();
	}
}