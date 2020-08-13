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
            case 1:
			case 2:
				code = `1`;
				break;
            default:
                code = this.code;
                break;
        }
        return code;
    }
    
    private _code : string = '';
	protected initItem(index:number,data:any,itemparam:any){	
        let view = this;
        view._code = itemparam;
		// view.width = 165;
		// view.height = 285;
		view._data = data;
		let code = view.getUiCode();

		let cfg = view.cfg.mainLand[data.level - 1];

		let bg = BaseBitmap.create(`mainland_cityitem_bg`);
		view.width = bg.width + 10;
		view.height = bg.height + 10;
		view.addChild(bg);

		let nameStr = '';
		if(data.level > 3){
			nameStr = LanguageManager.getlocal(`acConquerMainLandWarBuild4-${code}`, [data.pos]);
		}
		else{
			nameStr =  LanguageManager.getlocal(`acConquerMainLandWarBuild${data.level}_${data.num}_${data.pos}-${code}`, [data.pos]);
		}
		let nameTxt = ComponentManager.getTextField(`${nameStr}`, 20, TextFieldConst.COLOR_WHITE);
		if(PlatformManager.checkIsViSp()){
			nameTxt.size -= 4;
		}
		view.addChild(nameTxt);
		nameTxt.setPosition(bg.x + bg.width/2 - nameTxt.width/2 , bg.y + 53);

		let num = 0;
		if(data.level == 7){
			num = cfg.getScore[0][0];
		}
		else{
			num = cfg.getScore[data.num - 1][data.pos - 1];
		}
		num = num * view.vo.getTimeBuff();
		let scoretxt = ComponentManager.getTextField(LanguageManager.getlocal(`acConquerMainLandPerScore-${code}`, [num.toString()]), 16, TextFieldConst.COLOR_QUALITY_GREEN_NEW);
		scoretxt.setPosition(bg.x + bg.width/2 - scoretxt.width/2 , nameTxt.y + 27);

		view.addChild(scoretxt);
		if(data.npc){
			let tipbg = BaseBitmap.create("mainland_cityitem_noarmy");
			view.addChild(tipbg);
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipbg, scoretxt, [0, scoretxt.height]);

			let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acConquerMainLandTip27-${code}`), 18, TextFieldConst.COLOR_BLACK);
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, scoretxt, [0, scoretxt.height + 45]);
			view.addChild(tipTxt);

			let init = 0;
			if(view.cfg.mainLand[ data.level - 1] && view.cfg.mainLand[ data.level - 1].initial){
				init = view.cfg.mainLand[ data.level - 1].initial;
			}
			let tipTxt2 = ComponentManager.getTextField(LanguageManager.getlocal(`acConquerMainLandTip28-${code}`, [App.StringUtil.formatStringColor(init,TextFieldConst.COLOR_QUALITY_GREEN_NEW)]), 18, TextFieldConst.COLOR_BLACK);
			tipTxt2.lineSpacing = 5;
			tipTxt2.textAlign = egret.HorizontalAlign.CENTER
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt2, scoretxt, [0, scoretxt.height + 110]);
			view.addChild(tipTxt2);
		}
		else{
			//头像框
			let headContainer = Api.playerVoApi.getPlayerCircleHead(Number(data.pic),(data.ptitleid));
			view.addChild(headContainer);
			headContainer.setScale(0.9);
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, headContainer, scoretxt, [-3.5, scoretxt.height -2]);
			//玩家名
			let pname = data.name +'('+Api.mergeServerVoApi.getAfterMergeSeverName(null, true, data.zid) +')';

			let playernameTxt = ComponentManager.getTextField(pname, 16, TextFieldConst.COLOR_BROWN_NEW);
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, playernameTxt, headContainer, [1.5,headContainer.height-4]);
			view.addChild(playernameTxt);
			playernameTxt.textColor = Number(data.uid) == Api.playerVoApi.getPlayerID() ? TextFieldConst.COLOR_QUALITY_GREEN : TextFieldConst.COLOR_BROWN_NEW;
			//称号
			let titleId = data.titleid;
			let width = 0;
			if(titleId){
				let titleStr = Config.TitleCfg.getTitleIcon3WithLv(titleId,data.titlelv);
				let officerImg = BaseLoadBitmap.create(titleStr);
				officerImg.width = 186;
				officerImg.height = 42;
				officerImg.setScale(0.6);
				App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, officerImg, bg, [0, 72]);
				this.addChild(officerImg);
			}else{
				App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, playernameTxt, headContainer, [1.5,headContainer.height + 13]);

			}
		}

		if(Number(data.uid) == Api.playerVoApi.getPlayerID()){
			let tipTxt = BaseBitmap.create("mlcity_instate-"+this.getUiCode());
			this.addChild(tipTxt);
			//ComponentManager.getTextField(LanguageManager.getlocal(`acConquerMainLandTip36-${code}`), 18, TextFieldConst.COLOR_BROWN);
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, tipTxt, bg, [0, 12]);
			view.addChild(tipTxt);
		}
		else{
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
			btn.setScale(0.7);
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, btn, bg, [0, 10]);
			view.addChild(btn);
		}
	} 

	public getSpaceX(){
        return 0;
    }

	public dispose():void{
		let view = this;
		view._data = null;
		super.dispose();
	}
}