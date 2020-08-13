/**
 * author : qianjun
 * date : 2018.4.14
 * desc : 争夺点信息item
 */
class AcConquerMainLandCityInfoItem  extends ScrollListItem
{
	private _data = null; 
	public constructor(){
		super();
	}

	private get cfg() : Config.AcCfg.ConquerMainLandCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcConquerMainLandVo{
        return <AcConquerMainLandVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
    }

    private get aid() : string{
        return AcConst.AID_CONQUERMAINLAND;
    }

    private get code() : string{
        return this._code;
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

	private getScorePer(data:any,jizhan:boolean=true):any
	{
		let cfg = this.cfg.mainLand[data.level - 1];
		let num = 0;
		if(data.level == 7){
			num = cfg.getScore[0][0];
		}
		else{
			if(cfg.getScore[data.num - 1]){
				num = cfg.getScore[data.num - 1][data.pos - 1];
			}
			else{
				num = cfg.getScore[cfg.getScore.length - 1][data.pos - 1];
			}
		}
		if(jizhan)
		{
			num = num * this.vo.getTimeBuff();
		}
		return num;
	}
    
    private _code : string = '';
	protected initItem(index:number,data:any,itemparam:any){	
        let view = this;
        view._code = itemparam;
		view.width = 165;
		view.height = 285;
		view._data = data;
		let code = view.getUiCode();

		let cfg = view.cfg.mainLand[data.level - 1];

		let bg = BaseBitmap.create(`public_9_bg14`);
		bg.width = view.width;
		bg.height = view.height - 5;
		view.addChild(bg);

		let topbg = BaseBitmap.create(`battledown9bg`);
		topbg.width = 150;
		topbg.height = 35;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topbg, bg, [0,10]);
		view.addChild(topbg);

		let nameStr = '';
		if(data.level > 3){
			nameStr = LanguageManager.getlocal(`acConquerMainLandWarBuild4-${code}`, [data.pos]);
		}
		else{
			nameStr =  LanguageManager.getlocal(`acConquerMainLandWarBuild${data.level}_${data.num}_${data.pos}-${code}`, [data.pos]);
		}
		let nameTxt = ComponentManager.getTextField(`${nameStr}`, 22, TextFieldConst.COLOR_BROWN);
		topbg.width = 150;
		topbg.height = 35;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nameTxt, topbg);
		view.addChild(nameTxt);

		let num = this.getScorePer(data);
		let scoretxt = ComponentManager.getTextField(LanguageManager.getlocal(`acConquerMainLandPerScore-${code}`, [num.toString()]), 18, TextFieldConst.COLOR_WARN_RED2);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scoretxt, topbg, [0, topbg.height + 5]);
		view.addChild(scoretxt);

		let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acConquerMainLandTip36-${code}`), 18, TextFieldConst.COLOR_BROWN);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, tipTxt, bg, [0, 20]);

		let btn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, data.npc ? `acConquerMainLandTip29-${code}` : `acConquerMainLandTip14-${code}`, ()=>{
			//争夺
			if(!view.vo.isCanJoin()){
				App.CommonUtil.showTip(LanguageManager.getlocal(`acConquerMainLandTip23-${view.getUiCode()}`));
				return;
			}
			let score = 0;
			if(data.npc){
				score = view.cfg.mainLand[ data.level - 1].initial;
			}
			else{
				for(let i in data.team){
					score += (data.team[i].dps);
				}
			}
			ViewController.getInstance().openView(ViewConst.COMMON.ACCONQUERMAINLANDSENDFIGHTVIEW,{
				aid : view.aid,
				code : view.code,
				level : data.level, 
				num : data.num, 
				pos : data.pos,
				info : data,
				data : {
					score : score,
					isNpc : data.npc
				},
				uid : data.uid,
			});
		}, view);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, btn, bg, [0, 10]);

		if(data.npc){
			let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acConquerMainLandTip${data.level == 7 ? `41` : `27`}-${code}`), 18, TextFieldConst.COLOR_BLACK);
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, scoretxt, [0, scoretxt.height + 40]);
			view.addChild(tipTxt);

			let init = 0;
			if(view.cfg.mainLand[ data.level - 1] && view.cfg.mainLand[ data.level - 1].initial){
				init = view.cfg.mainLand[ data.level - 1].initial;
			}
			let tipTxt2 = ComponentManager.getTextField(LanguageManager.getlocal(`acConquerMainLandTip28-${code}`, [init.toString()]), 18, TextFieldConst.COLOR_BLACK);
			tipTxt2.lineSpacing = 5;
			tipTxt2.textAlign = egret.HorizontalAlign.CENTER;
			if(this.vo.checkIsJJL)
			{
				App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt2, scoretxt, [0, scoretxt.height + 110]);
			}else
			{
				App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt2, scoretxt, [0, scoretxt.height + 100]);
			}
			view.addChild(tipTxt2);
		}
		else{
			//头像框
			let headContainer = Api.playerVoApi.getPlayerCircleHead(Number(data.pic),(data.ptitleid));
			view.addChild(headContainer);
			headContainer.addTouchTap(()=>{
				NetManager.request(NetRequestConst.REQUEST_RANKG_USERSHOT,{
					ruid:data.uid,
					rzid:Api.mergeServerVoApi.getTrueZid(data.uid)
				});
			},this);
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, headContainer, scoretxt, [5, scoretxt.height + 2]);
			//玩家名
			let playernameTxt = ComponentManager.getTextField(data.name, 18, TextFieldConst.COLOR_BROWN);
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, playernameTxt, headContainer, [-5,headContainer.height]);
			view.addChild(playernameTxt);
			playernameTxt.textColor = Number(data.uid) == Api.playerVoApi.getPlayerID() ? TextFieldConst.COLOR_WARN_YELLOW2 : TextFieldConst.COLOR_BROWN;
			//称号
			// let titleId = data.titleid;
			// let width = 0;
			// if(titleId){
			// 	let titleinfo = App.CommonUtil.getTitleData(titleId);
			// 	if(titleinfo.title != ``){
			// 		let titleImg = App.CommonUtil.getTitlePic(titleinfo);
			// 		titleImg.width = 155;
			// 		titleImg.height = 59;
			// 		titleImg.setScale(0.7);
			// 		width = 155 * 0.7;
			// 		view.setLayoutPosition(LayoutConst.horizontalCentertop, titleImg, playernameTxt, [0,14]);
			// 		view.addChild(titleImg);
			// 	}
			// }
			//军事力量
			let score = 0;
			for(let i in data.team){
				score += (data.team[i].dps);
			}

			let armynumTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsTip29`, code), [App.StringUtil.changeIntToText(score)]), 18, TextFieldConst.COLOR_BROWN);
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, armynumTxt, playernameTxt, [0,playernameTxt.height]);
			view.addChild(armynumTxt);
			armynumTxt.y = playernameTxt.y + playernameTxt.textHeight + (((Number(data.uid) == Api.playerVoApi.getPlayerID() ? tipTxt.y : btn.y) - playernameTxt.y - playernameTxt.textHeight) - armynumTxt.height)/2 
			if(this.vo.checkIsJJL)
			{
				armynumTxt.textColor = TextFieldConst.COLOR_WARN_GREEN2;
				armynumTxt.y = scoretxt.height + 180;
			}
		}

		if(Number(data.uid) == Api.playerVoApi.getPlayerID())
		{
			if(this.vo.checkIsJJL)
			{
				let jjbtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, `acConquerMainLandTip43-${view.getUiCode()}`, ()=>
				{
					//嘉奖
					if(!view.vo.isCanJoin())
					{
						App.CommonUtil.showTip(LanguageManager.getlocal(`acConquerMainLandTip23-${view.getUiCode()}`));
						return;
					}
					if(view.vo.getCurPeriod() == 3)
					{
						App.CommonUtil.showTip(LanguageManager.getlocal(`acConquerMainLandTip48`));
						return
					}					
					if(view.vo.getItemNum() == 0){
						App.CommonUtil.showTip(LanguageManager.getlocal('itemNumNotEnough'));
						return;
					}				
					ViewController.getInstance().openView(ViewConst.POPUP.ACCONQUERMAINLANDITEMUSEPOPUPVIEW,{
						aid:this.aid,
						code:this.code,
						army : data.teamnum,
						scoreper:this.getScorePer(data,false)
					});				
				}, view);
				view.addChild(jjbtn);
				App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, jjbtn, bg, [0, 10]);
			}else
			{
				view.addChild(tipTxt);
			}
		}
		else{
			view.addChild(btn);
		}
	} 

	public getSpaceX(){
        return 5;
    }

	public dispose():void{
		let view = this;
		view._data = null;
		super.dispose();
	}
}