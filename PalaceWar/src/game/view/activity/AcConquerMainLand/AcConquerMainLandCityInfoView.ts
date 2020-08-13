/**
 * 区服活动排名
 * author qianjun
 */
class AcConquerMainLandCityInfoView extends PopupView{
	// 滑动列表

	private _info : any = null;
	private _list : ScrollList = null;
	public constructor(){
		super();
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

    // 背景图名称
	protected getBgName():string{
		return "mlcityinfobg";
    }
    
    protected initBg():void{
        super.initBg();
        this.viewBg.width = this.getShowWidth();
	}
	
	private get cfg() : Config.AcCfg.ConquerMainLandCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcConquerMainLandVo{
        return <AcConquerMainLandVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get code():string{
        return this.param.data.code;
    }

    private get aid():string{
        return this.param.data.aid;
	}

	private get acTivityId() : string{
        return `${this.param.data.aid}-${this.code}`;
    }
	
	protected getResourceList():string[]{
		let code = this.getUiCode();
		let arr = [`countrywarrewardview_itembg`,`battledown9bg`];
		if(this.param.data.cityLevel < 3){
			arr.push(`mainlandtiaofu${code}-`);
			arr.push(`mainlandtitleeji${code}-`);
			arr.push(`mainlandtitleyji${code}-`);
		}
		return super.getResourceList().concat(arr);
	}

	public initView():void
	{		
		let view = this;
        let code = view.getUiCode();
        let level = view.param.data.cityLevel;
        let num = view.param.data.cityNum;

		let contentBg = BaseBitmap.create("public_9_bg44");
		contentBg.width = 515;
		contentBg.height = 480;
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_USESPECIALGIFT),this.useItemCallback,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANKG_USERSHOT),this.userShotCallback,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_MAINLAND_CLOSE,view.hide,view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, contentBg, view.viewBg, [0, 120]);
		view.addChildToContainer(contentBg);

        let titlebg = ``;
        if(level == 1){
            titlebg = `mlcitybg1-${code}`;
        }
        else if(level < 4){
            titlebg = `mlcitybg2-${code}`;
        }
        else if(level < 6){
            titlebg = `mlcitybg3-${code}`;
        }
        else{
            titlebg = `mlcitybg4-${code}`;
        }
        let title = BaseBitmap.create(titlebg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, title, contentBg, [0,- title.height - 10]);
		view.addChildToContainer(title);
		
		let titlename = null;
		if(level < 4){
			titlename = BaseBitmap.create(`mlcitytitle${level}_${num}-${code}`);
		}
		else{
			titlename = ComponentManager.getTextField(view.vo.getCityName(`${level}_${num}`), 30, TextFieldConst.COLOR_LIGHT_YELLOW);
		}
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, titlename, title, [0, level > 3 ? 30 : 0]);
		view.addChildToContainer(titlename);
       
		if(level < 3){
			let flash = ComponentManager.getCustomMovieClip(`mainlandtitleyji${code}-`,15,100);
			flash.width = 430;
			flash.height = 104;
			flash.anchorOffsetX = flash.width / 2;
			flash.anchorOffsetY = flash.height / 2;
			flash.playWithTime(-1);
			if(level == 1){
				let fire = ComponentManager.getCustomMovieClip(`mainlandtitleeji${code}-`,15,100);
				fire.width = 450;
				fire.height = 115;
				fire.anchorOffsetX = fire.width / 2;
				fire.anchorOffsetY = fire.height / 2;
				fire.playWithTime(-1);
				App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, fire, titlename, [0,-33]);
				view.container.addChildAt(fire, view.container.getChildIndex(titlename) - 1);

				let tiaofu = ComponentManager.getCustomMovieClip(`mainlandtiaofu${code}-`,15,100);
				tiaofu.width = 403;
				tiaofu.height = 62;
				tiaofu.anchorOffsetX = tiaofu.width / 2;
				tiaofu.anchorOffsetY = tiaofu.height / 2;
				tiaofu.playWithTime(-1);
				App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tiaofu, titlename, [-1,20]);
				view.container.addChildAt(tiaofu, view.container.getChildIndex(titlename));

				App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, flash, titlename, [12,-19]);
			}
			else{
				App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, flash, titlename, [12,-15]);
			}
			
			view.addChildToContainer(flash);

			// titlename.alpha = 0.8;
			// egret.Tween.get(titlename, {loop : true}).to({alpha : 0}, 750).to({alpha : 0.8}, 750);

			let titelname2 = BaseBitmap.create(`mlcitytitle${level}_${num}-${code}`);
			titelname2.alpha = 0;
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, titelname2, title);
			view.addChildToContainer(titelname2);
			titelname2.blendMode = egret.BlendMode.ADD;
			egret.Tween.get(titelname2, {loop : true}).to({alpha : 0.8}, 750).to({alpha : 0}, 750);
		}

		let bottomBg = BaseBitmap.create("countrywarrewardview_itembg");
        view.addChildToContainer(bottomBg);
        
        let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acConquerMainLandTip13-${code}`), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        bottomBg.width = tipTxt.textWidth + 100;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, bottomBg, contentBg, [0, 8]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tipTxt, bottomBg);
        view.addChildToContainer(tipTxt);

        let arr = [];
        let landinfo = view.cfg.mainLand[level - 1];
        for(let i in view._info){
			let unit = view._info[i];
			arr.push({
				level : level,
				num : num,
				pos : Number(unit.segment),
				pic : Number(unit.pic),
				uid : Number(unit.uid),
				npc : Number(unit.npc) == 1,
				titleid :  unit.title,
				ptitleid : unit.ptitle ,
				name : unit.name,
				team : unit.team,
				teamnum : Number(unit.teamnum),
				zid : Number(unit.zid),
            });
		}
		arr.sort((a,b)=>{
			return a.pos - b.pos;
		});
		let rect2 = egret.Rectangle.create();
		rect2.setTo(0,0,505,425);
        let scrollList = ComponentManager.getScrollList(AcConquerMainLandCityInfoItem,arr,rect2,view.code);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, bottomBg, [5,bottomBg.height+5]);
		view.addChildToContainer(scrollList);
		scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
		view._list = scrollList;
		view.setChildIndex(view.closeBtn, 9999);
	}
	

	protected getRequestData():{requestType:string,requestData:any}{	
		let view = this;
		let level = view.param.data.cityLevel;
        let num = view.param.data.cityNum;
		return {requestType:NetRequestConst.REQUEST_MAINLAND_GETCITYINFO,requestData:{
			activeId : view.vo.aidAndCode,
			mainland : level,
			building : num
		}};
	}

	private freshList():void{
		let view = this;
		if(view._list){
			let arr = [];
			let code = view.getUiCode();
			let level = view.param.data.cityLevel;
			let num = view.param.data.cityNum;
			let landinfo = view.cfg.mainLand[level - 1];
			for(let i in view._info){
				let unit = view._info[i];
				arr.push({
					level : level,
					num : num,
					pos : Number(unit.segment),
					pic : Number(unit.pic),
					uid : Number(unit.uid),
					npc : Number(unit.npc) == 1,
					titleid :  unit.title,
					ptitleid : unit.ptitle ,
					name : unit.name,
					team : unit.team,
					teamnum : Number(unit.teamnum),
					zid : Number(unit.zid),
				});
			}
			arr.sort((a,b)=>{
				return a.pos - b.pos;
			});
			view._list.refreshData(arr, view.code);
		}
	}

	protected receiveData(data:{ret:boolean,data:any}):void{
		let view = this;
		view._info = data.data.data.buildinginfo;
		view.freshList();
	}

	protected resetBgSize():void{
		super.resetBgSize();
		this.closeBtn.x = 551;
		// let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(`loctombranktip-${this.code}`),22,TextFieldConst.COLOR_LIGHT_YELLOW);
		// App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, tipTxt, this.viewBg, [0,this.viewBg.height]);
		// this.addChild(tipTxt);
		// tipTxt.visible = false;
		// this._tipTxt = tipTxt;
	}

	protected getShowWidth():number{
		return 590;
	}

	protected getShowHeight():number{
		return 620;
	}
	
	// 标题背景名称
	protected getTitleBgName():string{
		return null;
	}

	// 标题背景名称
	protected getTitleStr():string{
		return null;
	}


	public hide():void{
		super.hide();
	}

	private userShotCallback(event : egret.Event):void{
        if(event.data.ret){
            let data = event.data.data.data;
			if(event.data.data.cmd == NetRequestConst.REQUEST_RANKG_USERSHOT)
			{
				data["crossZone"] = 1;
				data['zid'] = Api.mergeServerVoApi.getTrueZid(data.ruid);
			}
			ViewController.getInstance().openView(ViewConst.POPUP.RANKUSERINGOPOPUPVIEW,data);
        }
    }
	private useItemCallback(evt : egret.Event):void{
		let view = this;
		let code = view.getUiCode();
		if(evt.data.ret && evt.data.data)
		{
			if(evt.data.data.data.conquerStat && evt.data.data.data.conquerStat==12)
			{
				App.CommonUtil.showTip(LanguageManager.getlocal(this.vo.getThisCn("acConquerMainLandTip47")));
				return;
			}			
			if(evt.data.data.data.allteam)
			{
				this.vo.setMyTeamInfo(evt.data.data.data.allteam);
			}
			if(evt.data.data.data.getScore)
			{
				App.CommonUtil.showTip(LanguageManager.getlocal(`acConquerMainLandTip46-${code}`,[String(evt.data.data.data.getScore)]));
			}
			if(evt.data.data.data.myscore && evt.data.data.data.myscore.score)
			{
				this.vo.setMyScore(evt.data.data.data.myscore.score);
				App.MessageHelper.dispatchNetMessage(MessageConst.MESSAGE_MAINLAND_ZG_FRESH);
			}			
		}
	}
	public dispose():void{
		let view = this;
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_USESPECIALGIFT),this.useItemCallback,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANKG_USERSHOT),this.userShotCallback,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MAINLAND_CLOSE,view.hide,view);
		view._info = null;
		view._list = null;
		super.dispose();
	}
}